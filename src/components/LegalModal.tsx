import React from 'react';
import { X, Shield, FileCheck } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-[#16111D] rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col border border-[#F3EAF7] dark:border-[#2E2338] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-[#261D2E] flex items-center justify-between bg-[#FAF8FC] dark:bg-[#120E18]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F3EAF7] dark:bg-[#251532] text-[#710193] dark:text-[#E2A6F7] flex items-center justify-center">
              {isPrivacy ? (
                <Shield className="w-5 h-5" />
              ) : (
                <FileCheck className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-[#1D1722] dark:text-white">
                {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
              </h3>
              <p className="text-xs text-[#706778] dark:text-[#A69CB0]">
                BluePeak Digital Agency &bull; Last updated November 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#20172B] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-[#1D1722]/85 dark:text-[#EAE3F0] leading-relaxed">
          {isPrivacy ? (
            <>
              <section className="space-y-2">
                <h4 className="font-heading font-bold text-base text-[#1D1722] dark:text-white">
                  1. Information We Collect
                </h4>
                <p className="text-[#706778] dark:text-[#A69CB0]">
                  When you submit an inquiry through BluePeak’s contact form or
                  sign in through our portal, we collect the details you
                  expressly provide, including your full name, email address,
                  company name, service preferences, and project descriptions.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-heading font-bold text-base text-[#1D1722] dark:text-white">
                  2. Purpose of Processing
                </h4>
                <p className="text-[#706778] dark:text-[#A69CB0]">
                  We use your information exclusively to respond to your project
                  inquiries, prepare tailored service proposals, communicate
                  project status, and provide client support. We do not sell or
                  rent your contact information to third parties.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-heading font-bold text-base text-[#1D1722] dark:text-white">
                  3. Data Security & Storage
                </h4>
                <p className="text-[#706778] dark:text-[#A69CB0]">
                  Inquiries and communications are securely stored using Google
                  Cloud Firestore and Firebase Authentication with strict
                  attribute-based access controls and encrypted transmission (SSL/TLS).
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-heading font-bold text-base text-[#1D1722] dark:text-white">
                  4. Contact & Inquiries
                </h4>
                <p className="text-[#706778] dark:text-[#A69CB0]">
                  For questions regarding data privacy or to request removal of
                  your inquiry records, email us directly at{' '}
                  <span className="font-semibold text-[#710193] dark:text-[#E2A6F7]">
                    junaeidshohan@gmail.com
                  </span>
                  .
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h4 className="font-heading font-bold text-base text-[#1D1722] dark:text-white">
                  1. Engagement & Scope of Services
                </h4>
                <p className="text-[#706778] dark:text-[#A69CB0]">
                  BluePeak provides digital solutions including website
                  development, maintenance, search engine optimization, social
                  media marketing, and graphic design under specific Statements
                  of Work (SOW) agreed with each client.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-heading font-bold text-base text-[#1D1722] dark:text-white">
                  2. Intellectual Property & Ownership
                </h4>
                <p className="text-[#706778] dark:text-[#A69CB0]">
                  Upon full payment of agreed project invoices, all custom code,
                  visual assets, and branding created specifically for the
                  client become the exclusive property of the client, subject
                  to open-source library licenses.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-heading font-bold text-base text-[#1D1722] dark:text-white">
                  3. Client Responsibilities
                </h4>
                <p className="text-[#706778] dark:text-[#A69CB0]">
                  Clients agree to provide necessary assets, domain
                  authorizations, and timely feedback required to meet agreed
                  delivery milestones.
                </p>
              </section>

              <section className="space-y-2">
                <h4 className="font-heading font-bold text-base text-[#1D1722] dark:text-white">
                  4. Maintenance & Support
                </h4>
                <p className="text-[#706778] dark:text-[#A69CB0]">
                  Ongoing maintenance, security updates, and enhancements are
                  provided according to our active retainer agreements or
                  on-demand maintenance packages.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-[#261D2E] bg-[#FAF8FC] dark:bg-[#120E18] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#710193] rounded-xl hover:bg-[#4B0065] dark:hover:bg-[#8602AE] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
