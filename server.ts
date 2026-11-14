import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const RECIPIENT_EMAIL =
  process.env.INQUIRY_RECIPIENT_EMAIL?.trim() || 'bluepeakzone2005@gmail.com';

const ALLOWED_SERVICES = new Set([
  'Website Development',
  'Website Maintenance',
  'Search Engine Optimization (SEO)',
  'Social Media Marketing',
  'Graphic Design',
  'Additional Digital Services',
]);

// Basic sliding-window IP rate limiter (5 inquiries per 15 minutes per IP)
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const ipRequests = new Map<string, number[]>();

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (ipRequests.get(ip) || []).filter((ts) => ts > windowStart);

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipRequests.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  ipRequests.set(ip, timestamps);

  // Prune stale IPs occasionally to keep memory bounded
  if (ipRequests.size > 1000) {
    for (const [key, list] of ipRequests.entries()) {
      const fresh = list.filter((ts) => ts > windowStart);
      if (fresh.length === 0) ipRequests.delete(key);
      else ipRequests.set(key, fresh);
    }
  }

  return false;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface InquiryPayload {
  fullName?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  budget?: unknown;
  message?: unknown;
  inquiryId?: unknown;
  website?: unknown;
  formLoadedAt?: unknown;
}

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '32kb' }));

  // Health check endpoint (never exposes secrets)
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      ok: true,
      emailConfigured: Boolean(process.env.RESEND_API_KEY?.trim()),
    });
  });

  // Secure server-side inquiry validation, spam protection & Resend delivery
  app.post('/api/inquiries', async (req: Request, res: Response) => {
    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      res.status(429).json({
        ok: false,
        error: 'Too many inquiries sent from your connection. Please wait a few minutes and try again.',
      });
      return;
    }

    const body = (req.body || {}) as InquiryPayload;

    // 1. Honeypot spam check
    if (typeof body.website === 'string' && body.website.trim().length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Unable to process your submission.',
      });
      return;
    }

    // 2. Minimum form fill-time check (blocks instant bot POSTs under 1.5s)
    if (typeof body.formLoadedAt === 'number') {
      const elapsed = Date.now() - body.formLoadedAt;
      if (elapsed < 1500 || elapsed > 24 * 60 * 60 * 1000) {
        res.status(400).json({
          ok: false,
          error: 'Please review the form details and submit again.',
        });
        return;
      }
    }

    // 3. Strict server-side field validation
    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const company = typeof body.company === 'string' ? body.company.trim() : '';
    const service = typeof body.service === 'string' ? body.service.trim() : '';
    const budget = typeof body.budget === 'string' ? body.budget.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const inquiryId = typeof body.inquiryId === 'string' ? body.inquiryId.trim() : '';

    if (fullName.length < 2 || fullName.length > 100) {
      res.status(400).json({
        ok: false,
        error: 'Full Name must be between 2 and 100 characters.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 120) {
      res.status(400).json({
        ok: false,
        error: 'Please provide a valid Email Address.',
      });
      return;
    }

    if (company.length > 120) {
      res.status(400).json({
        ok: false,
        error: 'Business Name must be 120 characters or fewer.',
      });
      return;
    }

    if (!ALLOWED_SERVICES.has(service)) {
      res.status(400).json({
        ok: false,
        error: 'Please select a valid service from the list.',
      });
      return;
    }

    if (budget.length > 60) {
      res.status(400).json({
        ok: false,
        error: 'Estimated Budget must be 60 characters or fewer.',
      });
      return;
    }

    if (message.length < 10 || message.length > 2000) {
      res.status(400).json({
        ok: false,
        error: 'Project Details must be between 10 and 2000 characters.',
      });
      return;
    }

    // Excessive URL spam guard
    const urlMatches = message.match(/https?:\/\//gi);
    if (urlMatches && urlMatches.length > 4) {
      res.status(400).json({
        ok: false,
        error: 'Too many links included in Project Details.',
      });
      return;
    }

    if (inquiryId && (inquiryId.length > 128 || !/^[a-zA-Z0-9_-]+$/.test(inquiryId))) {
      res.status(400).json({
        ok: false,
        error: 'Invalid inquiry reference format.',
      });
      return;
    }

    // 4. Verify Resend configuration
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (!resendApiKey) {
      res.status(503).json({
        ok: false,
        code: 'EMAIL_NOT_CONFIGURED',
        error:
          'Email delivery is not configured on the server yet (missing RESEND_API_KEY).',
      });
      return;
    }

    const fromAddress =
      process.env.RESEND_FROM_EMAIL?.trim() ||
      'BluePeak Inquiries <onboarding@resend.dev>';

    const safeName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || 'Not specified');
    const safeService = escapeHtml(service);
    const safeBudget = escapeHtml(budget || 'Not specified');
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
    const safeRef = escapeHtml(inquiryId || 'N/A');

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; color: #1D1722; background: #FAF8FC; padding: 28px; border-radius: 16px; border: 1px solid #EBDDF2;">
        <div style="border-bottom: 2px solid #710193; padding-bottom: 16px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #710193; font-weight: 700;">BluePeak Digital Agency</p>
          <h1 style="margin: 6px 0 0; font-size: 22px; color: #1D1722;">New Project Inquiry</h1>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background: #FFFFFF; border-radius: 12px; overflow: hidden;">
          <tr><td style="padding: 12px 16px; border-bottom: 1px solid #F3EAF7; font-size: 12px; font-weight: 700; color: #706778; width: 170px;">Full Name</td><td style="padding: 12px 16px; border-bottom: 1px solid #F3EAF7; font-size: 14px; font-weight: 600;">${safeName}</td></tr>
          <tr><td style="padding: 12px 16px; border-bottom: 1px solid #F3EAF7; font-size: 12px; font-weight: 700; color: #706778;">Email Address</td><td style="padding: 12px 16px; border-bottom: 1px solid #F3EAF7; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #710193; font-weight: 600;">${safeEmail}</a></td></tr>
          <tr><td style="padding: 12px 16px; border-bottom: 1px solid #F3EAF7; font-size: 12px; font-weight: 700; color: #706778;">Business Name</td><td style="padding: 12px 16px; border-bottom: 1px solid #F3EAF7; font-size: 14px;">${safeCompany}</td></tr>
          <tr><td style="padding: 12px 16px; border-bottom: 1px solid #F3EAF7; font-size: 12px; font-weight: 700; color: #706778;">Service Interested In</td><td style="padding: 12px 16px; border-bottom: 1px solid #F3EAF7; font-size: 14px; font-weight: 600; color: #710193;">${safeService}</td></tr>
          <tr><td style="padding: 12px 16px; border-bottom: 1px solid #F3EAF7; font-size: 12px; font-weight: 700; color: #706778;">Estimated Budget</td><td style="padding: 12px 16px; border-bottom: 1px solid #F3EAF7; font-size: 14px;">${safeBudget}</td></tr>
          <tr><td style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #706778;">Firestore Ref ID</td><td style="padding: 12px 16px; font-size: 12px; font-family: monospace; color: #706778;">${safeRef}</td></tr>
        </table>
        <div style="background: #FFFFFF; padding: 18px; border-radius: 12px; border: 1px solid #F3EAF7;">
          <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; color: #706778;">Project Details</p>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1D1722;">${safeMessage}</p>
        </div>
        <p style="margin: 20px 0 0; font-size: 12px; color: #706778;">Reply directly to this email to respond to <strong>${safeName}</strong> (${safeEmail}).</p>
      </div>
    `;

    const textBody = [
      'New Project Inquiry — BluePeak',
      '================================',
      `Full Name: ${fullName}`,
      `Email Address: ${email}`,
      `Business Name: ${company || 'Not specified'}`,
      `Service Interested In: ${service}`,
      `Estimated Budget: ${budget || 'Not specified'}`,
      `Firestore Ref ID: ${inquiryId || 'N/A'}`,
      '',
      'Project Details:',
      message,
    ].join('\n');

    try {
      const resend = new Resend(resendApiKey);
      const { data, error } = await resend.emails.send({
        from: fromAddress,
        to: [RECIPIENT_EMAIL],
        replyTo: email,
        subject: `New BluePeak Inquiry: ${service} — ${fullName}`,
        html: htmlBody,
        text: textBody,
      });

      if (error) {
        console.error('Resend API error:', error);
        const safeDetail =
          typeof error.message === 'string' && !error.message.includes('re_')
            ? error.message
            : 'Email provider rejected the request.';
        res.status(502).json({
          ok: false,
          error: `Email delivery failed: ${safeDetail}`,
          providerCode: error.name || 'resend_error',
        });
        return;
      }

      res.status(200).json({
        ok: true,
        emailId: data?.id || null,
      });
    } catch (err) {
      console.error('Unexpected email delivery error:', err);
      res.status(500).json({
        ok: false,
        error: 'An unexpected error occurred while delivering your inquiry.',
      });
    }
  });

  // Serve Vite middleware in development or static dist/ in production
  if (process.env.NODE_ENV === 'production') {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BluePeak server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
