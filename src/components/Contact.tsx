import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/agencyData';
import { submitInquiry } from '../lib/firebase';
import {
  EASE_OUT_EXPO,
  VIEWPORT_CONFIG,
  sectionHeaderVariants,
} from './SectionTransition';

interface ContactProps {
  initialService?: string;
  onInquirySubmitted?: (inquiryId: string) => void;
}

export const Contact: React.FC<ContactProps> = ({
  initialService = '',
  onInquirySubmitted,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(initialService || 'Website Development');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  const budgetOptions = [
    'Select a budget range (Optional)',
    'Under $1,500',
    '$1,500 - $3,500',
    '$3,500 - $7,500',
    '$7,500 - $15,000',
    '$15,000+',
    'Flexible / Undetermined',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please provide your full name (minimum 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage('Please enter a message of at least 10 characters.');
      return;
    }

    try {
      setLoading(true);
      const newId = await submitInquiry({
        name: fullName,
        email,
        company: company || undefined,
        service,
        budget: budget && budget !== budgetOptions[0] ? budget : undefined,
        message,
      });

      setSuccessId(newId);
      if (onInquirySubmitted) onInquirySubmitted(newId);

      // Reset form
      setFullName('');
      setEmail('');
      setCompany('');
      setBudget('');
      setMessage('');
    } catch (err: unknown) {
      console.error('Submission failed:', err);
      setErrorMessage(
        'Unable to send your inquiry at this moment. Please reach out directly to junaeidshohan@gmail.com or call one of our phone lines.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-[#0C0910] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-[#710193] dark:text-[#E2A6F7] mb-3">
            Direct Communication &bull; Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1D1722] dark:text-white tracking-tight mb-5">
            Let's Talk About Your Project
          </h2>
          <div className="w-12 h-0.5 bg-[#710193] dark:bg-[#9E24C7] mx-auto mb-6 opacity-80" />
          <p className="text-base sm:text-lg md:text-xl text-[#706778] dark:text-[#A69CB0] leading-relaxed">
            Have an idea, a project, or simply want to explore how we can help
            your business? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-[#FAF8FC] dark:bg-[#16111D] p-8 rounded-3xl border border-[#F3EAF7] dark:border-[#261D2E]">
              <h3 className="text-xl font-heading font-bold text-[#1D1722] dark:text-white mb-6 flex items-center gap-2">
                <span>International Contact Lines</span>
              </h3>

              {/* Phone Numbers */}
              <div className="space-y-4 mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-[#706778] dark:text-[#A69CB0] flex items-center gap-1.5 mb-2">
                  <Phone className="w-3.5 h-3.5 text-[#710193] dark:text-[#C553ED]" />
                  <span>Direct Phone / WhatsApp</span>
                </div>

                {COMPANY_INFO.phones.map((phone) => (
                  <div
                    key={phone.country}
                    className="p-3.5 bg-white dark:bg-[#1C1525] rounded-xl border border-gray-100 dark:border-[#2E2338] hover:border-[#710193]/30 dark:hover:border-[#9E24C7]/40 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-bold text-[#710193] dark:text-[#E2A6F7] uppercase tracking-wider">
                        {phone.country} ({phone.code})
                      </div>
                      <a
                        href={`tel:${phone.raw}`}
                        className="text-base font-semibold text-[#1D1722] dark:text-white hover:text-[#710193] dark:hover:text-[#C553ED] transition-colors"
                      >
                        {phone.number}
                      </a>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3EAF7] dark:bg-[#251532] text-[#710193] dark:text-[#E2A6F7] font-semibold">
                      Click to Call
                    </span>
                  </div>
                ))}
              </div>

              {/* Email Addresses */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#706778] dark:text-[#A69CB0] flex items-center gap-1.5 mb-2">
                  <Mail className="w-3.5 h-3.5 text-[#710193] dark:text-[#C553ED]" />
                  <span>Email Inquiries</span>
                </div>

                {COMPANY_INFO.emails.map((emailItem) => (
                  <div
                    key={emailItem.address}
                    className="p-3.5 bg-white dark:bg-[#1C1525] rounded-xl border border-gray-100 dark:border-[#2E2338] hover:border-[#710193]/30 dark:hover:border-[#9E24C7]/40 transition-colors"
                  >
                    <div className="text-[11px] font-bold text-[#710193] dark:text-[#E2A6F7] uppercase tracking-wider">
                      {emailItem.label}
                    </div>
                    <a
                      href={`mailto:${emailItem.address}`}
                      className="text-base font-semibold text-[#1D1722] dark:text-white hover:text-[#710193] dark:hover:text-[#C553ED] transition-colors break-all"
                    >
                      {emailItem.address}
                    </a>
                  </div>
                ))}
              </div>

              {/* Response Promise */}
              <div className="mt-8 pt-6 border-t border-gray-200/70 dark:border-[#261D2E] flex items-center gap-3 text-xs text-[#706778] dark:text-[#A69CB0]">
                <Clock className="w-4 h-4 text-[#710193] dark:text-[#C553ED] shrink-0" />
                <span>We typically respond to inquiries within 24 hours.</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: 0.08 }}
            className="lg:col-span-7"
          >
            <div className="bg-white dark:bg-[#16111D] p-8 sm:p-10 rounded-3xl border border-[#F3EAF7] dark:border-[#261D2E] shadow-xl shadow-[#710193]/5 dark:shadow-[#710193]/15">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-[#261D2E]">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-[#1D1722] dark:text-white">
                    Send a Project Inquiry
                  </h3>
                  <p className="text-xs text-[#706778] dark:text-[#A69CB0] mt-1">
                    Fill out the details below and we will prepare a tailored proposal.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#F3EAF7] dark:bg-[#251532] text-[#710193] dark:text-[#E2A6F7] text-xs font-semibold rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Free Initial Consult</span>
                </div>
              </div>

              {/* Success Notification */}
              {successId && (
                <div className="mb-8 p-6 bg-[#F3EAF7] dark:bg-[#251532] border border-[#710193]/20 dark:border-[#710193]/40 rounded-2xl animate-in fade-in duration-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#710193] dark:text-[#C553ED] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-heading font-bold text-base text-[#1D1722] dark:text-white">
                        Inquiry Received!
                      </h4>
                      <p className="text-xs sm:text-sm text-[#706778] dark:text-[#A69CB0] mt-1">
                        Thank you for reaching out to BluePeak. Your project inquiry has been securely saved to our database (Reference ID: <span className="font-mono font-semibold text-[#710193] dark:text-[#C553ED]">{successId.slice(0, 8)}...</span>). We will review your requirements and respond promptly.
                      </p>
                      <button
                        onClick={() => setSuccessId(null)}
                        className="mt-3 text-xs font-bold text-[#710193] dark:text-[#C553ED] hover:underline"
                      >
                        Send another inquiry
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl flex items-start gap-2.5 text-xs text-red-800 dark:text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1D1722] dark:text-[#FAF8FC] mb-2"
                    >
                      Full Name <span className="text-[#710193] dark:text-[#C553ED]">*</span>
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2E2338] bg-[#FAF8FC] dark:bg-[#120E18] text-sm text-[#1D1722] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#710193] dark:focus:border-[#9E24C7] focus:ring-2 focus:ring-[#710193]/20 transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email-address"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1D1722] dark:text-[#FAF8FC] mb-2"
                    >
                      Email Address <span className="text-[#710193] dark:text-[#C553ED]">*</span>
                    </label>
                    <input
                      id="email-address"
                      type="email"
                      required
                      placeholder="e.g. eleanor@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2E2338] bg-[#FAF8FC] dark:bg-[#120E18] text-sm text-[#1D1722] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#710193] dark:focus:border-[#9E24C7] focus:ring-2 focus:ring-[#710193]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Company Name (Optional) */}
                  <div>
                    <label
                      htmlFor="company-name"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1D1722] dark:text-[#FAF8FC] mb-2"
                    >
                      Company Name <span className="text-gray-400 dark:text-gray-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="company-name"
                      type="text"
                      placeholder="e.g. Vantage Labs Ltd."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2E2338] bg-[#FAF8FC] dark:bg-[#120E18] text-sm text-[#1D1722] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#710193] dark:focus:border-[#9E24C7] focus:ring-2 focus:ring-[#710193]/20 transition-all"
                    />
                  </div>

                  {/* Service Interested In */}
                  <div>
                    <label
                      htmlFor="service-select"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1D1722] dark:text-[#FAF8FC] mb-2"
                    >
                      Service Interested In <span className="text-[#710193] dark:text-[#C553ED]">*</span>
                    </label>
                    <select
                      id="service-select"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2E2338] bg-[#FAF8FC] dark:bg-[#120E18] text-sm text-[#1D1722] dark:text-white focus:outline-none focus:border-[#710193] dark:focus:border-[#9E24C7] focus:ring-2 focus:ring-[#710193]/20 transition-all"
                    >
                      {SERVICES_DATA.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Budget (Optional) */}
                <div>
                  <label
                    htmlFor="budget-select"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1D1722] dark:text-[#FAF8FC] mb-2"
                  >
                    Project Budget <span className="text-gray-400 dark:text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <select
                    id="budget-select"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2E2338] bg-[#FAF8FC] dark:bg-[#120E18] text-sm text-[#1D1722] dark:text-white focus:outline-none focus:border-[#710193] dark:focus:border-[#9E24C7] focus:ring-2 focus:ring-[#710193]/20 transition-all"
                  >
                    {budgetOptions.map((opt, i) => (
                      <option key={opt} value={i === 0 ? '' : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="project-message"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1D1722] dark:text-[#FAF8FC] mb-2"
                  >
                    Message <span className="text-[#710193] dark:text-[#C553ED]">*</span>
                  </label>
                  <textarea
                    id="project-message"
                    required
                    rows={5}
                    placeholder="Tell us about your project, goals, key milestones, or specific requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2E2338] bg-[#FAF8FC] dark:bg-[#120E18] text-sm text-[#1D1722] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#710193] dark:focus:border-[#9E24C7] focus:ring-2 focus:ring-[#710193]/20 transition-all resize-none"
                  />
                  <div className="flex justify-between text-[11px] text-[#706778] dark:text-[#A69CB0] mt-1.5">
                    <span>Minimum 10 characters</span>
                    <span>{message.length} / 2000</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#710193] text-white text-base font-semibold shadow-lg shadow-[#710193]/20 hover:bg-[#4B0065] dark:hover:bg-[#8602AE] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#710193] focus:ring-offset-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
