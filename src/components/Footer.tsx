import React from 'react';
import { Logo } from './Logo';
import { Phone, Mail, ArrowUp, Globe2, Shield } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/agencyData';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onSelectService: (serviceName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onSelectService,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#1D1722] text-white pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="light" showTagline={true} />
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              {COMPANY_INFO.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-gray-400">
              <Globe2 className="w-4 h-4 text-[#710193]" />
              <span>Global agency supporting UK, Germany & Bangladesh</span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => {
                      onSelectService(service.title);
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors text-left"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white">
              Get In Touch
            </h4>

            {/* Emails */}
            <div className="space-y-1.5 text-xs text-gray-400">
              <div className="font-semibold text-gray-300">Email Addresses:</div>
              {COMPANY_INFO.emails.map((e) => (
                <div key={e.address}>
                  <a
                    href={`mailto:${e.address}`}
                    className="hover:text-[#F3EAF7] transition-colors break-all"
                  >
                    {e.address}
                  </a>
                </div>
              ))}
            </div>

            {/* Phones */}
            <div className="space-y-1.5 text-xs text-gray-400 pt-2">
              <div className="font-semibold text-gray-300">Phone Numbers:</div>
              {COMPANY_INFO.phones.map((p) => (
                <div key={p.country} className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold text-gray-400">
                    {p.code}:
                  </span>
                  <a
                    href={`tel:${p.raw}`}
                    className="hover:text-[#F3EAF7] transition-colors"
                  >
                    {p.number}
                  </a>
                </div>
              ))}
            </div>

            {/* Social Placeholders */}
            <div className="pt-3">
              <div className="text-[11px] font-semibold text-gray-400 mb-2">
                Social Profiles:
              </div>
              <div className="flex flex-wrap gap-2">
                {COMPANY_INFO.socials.map((s) => (
                  <span
                    key={s.name}
                    className="px-2.5 py-1 text-[11px] rounded-md bg-white/5 border border-white/10 text-gray-300"
                    title={`${s.name} Profile`}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            &copy; 2026 BluePeak. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white transition-colors ml-2"
              title="Back to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
