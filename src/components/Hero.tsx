import React from 'react';
import { ArrowRight, ChevronDown, Sparkles, Compass, ShieldCheck, Globe } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onWorkTogether: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onWorkTogether,
}) => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#0C0910] text-white transition-colors duration-300"
    >
      {/* Full-Bleed Keyboard Background Image */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <img
          src="/assets/aistudio/image_ce3a8133.png"
          alt="Sleek backlit keyboard representing precision digital craftsmanship at BluePeak"
          className="w-full h-full object-cover object-center opacity-55 scale-[1.01]"
          loading="eager"
          referrerPolicy="no-referrer"
        />

        {/* Measured dark-violet gradient scrim for optimal readability & calm depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0910]/80 via-[#140B1C]/65 to-[#0C0910]/95" />

        {/* Subtle violet ambient glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[780px] h-[420px] bg-[#710193]/25 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        {/* Top Editorial Headline Block */}
        <div className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
          {/* Subtle Editorial Kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#E2A6F7] uppercase mb-5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
            <Sparkles className="w-3.5 h-3.5 text-[#D57CF7]" />
            <span>Digital Agency &bull; Build. Elevate. Grow.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-white leading-[1.08] mb-6 drop-shadow-sm">
            Build. <span className="text-[#D57CF7]">Elevate.</span> Grow.
          </h1>

          {/* Supporting Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-white/90 max-w-3xl mx-auto mb-6 leading-relaxed">
            We Build Digital Experiences That Move Businesses Forward.
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#D6CFE0] max-w-2xl mx-auto mb-9 leading-relaxed font-normal">
            BluePeak helps businesses establish a powerful digital presence
            through modern websites, creative design, smart marketing, and
            reliable digital solutions.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreServices}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#710193] text-white text-sm font-semibold shadow-lg shadow-[#710193]/35 hover:bg-[#8A04B3] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#D57CF7] focus:ring-offset-2 focus:ring-offset-[#0C0910]"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onWorkTogether}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-semibold border border-white/25 hover:bg-white hover:text-[#1D1722] hover:border-white transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span>Let's Work Together</span>
            </button>
          </div>
        </div>

        {/* Classic 3-Column Trust Strip */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/95 dark:bg-[#16111D]/90 backdrop-blur-md p-6 rounded-2xl border border-white/60 dark:border-[#261D2E] hover:border-[#710193]/40 dark:hover:border-[#9E24C7]/40 transition-all shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#F3EAF7] dark:bg-[#251532] text-[#710193] dark:text-[#C553ED] flex items-center justify-center mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#1D1722] dark:text-white mb-1">
                Tailored Engineering
              </h3>
              <p className="text-xs sm:text-sm text-[#706778] dark:text-[#A69CB0] leading-relaxed">
                Bespoke websites, e-commerce, and web applications built from scratch with modern technologies.
              </p>
            </div>

            <div className="bg-white/95 dark:bg-[#16111D]/90 backdrop-blur-md p-6 rounded-2xl border border-white/60 dark:border-[#261D2E] hover:border-[#710193]/40 dark:hover:border-[#9E24C7]/40 transition-all shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#F3EAF7] dark:bg-[#251532] text-[#710193] dark:text-[#C553ED] flex items-center justify-center mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#1D1722] dark:text-white mb-1">
                Multi-Region Support
              </h3>
              <p className="text-xs sm:text-sm text-[#706778] dark:text-[#A69CB0] leading-relaxed">
                Direct advisory lines and dedicated customer service spanning UK, Germany, and Bangladesh.
              </p>
            </div>

            <div className="bg-white/95 dark:bg-[#16111D]/90 backdrop-blur-md p-6 rounded-2xl border border-white/60 dark:border-[#261D2E] hover:border-[#710193]/40 dark:hover:border-[#9E24C7]/40 transition-all shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#F3EAF7] dark:bg-[#251532] text-[#710193] dark:text-[#C553ED] flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#1D1722] dark:text-white mb-1">
                End-to-End Delivery
              </h3>
              <p className="text-xs sm:text-sm text-[#706778] dark:text-[#A69CB0] leading-relaxed">
                From discovery and UX prototyping to high-speed deployment, SEO, and ongoing care.
              </p>
            </div>
          </div>
        </div>

        {/* Subtle scroll down indicator */}
        <div className="mt-14 flex justify-center">
          <a
            href="#about"
            className="inline-flex items-center gap-1.5 text-xs text-white/75 hover:text-white transition-colors"
          >
            <span>Explore our story</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#D57CF7]" />
          </a>
        </div>
      </div>
    </section>
  );
};
