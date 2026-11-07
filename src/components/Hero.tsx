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
      className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#FAF8FC] via-white to-[#FAF8FC] dark:from-[#0C0910] dark:via-[#110D17] dark:to-[#0C0910] transition-colors duration-300"
    >
      {/* Eye-soothing subtle background ambient gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#F3EAF7]/80 to-transparent dark:from-[#2E123B]/60 rounded-full blur-3xl opacity-80" />
        <div className="absolute top-1/4 -right-32 w-[420px] h-[420px] bg-[#710193]/4 dark:bg-[#710193]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-[400px] h-[400px] bg-[#710193]/3 dark:bg-[#710193]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Top Editorial Headline Block */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-14">
          {/* Subtle Editorial Kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#710193] dark:text-[#E2A6F7] uppercase mb-4 px-3.5 py-1 rounded-full bg-[#F3EAF7] dark:bg-[#251532] border border-[#710193]/15 dark:border-[#710193]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Agency &bull; Build. Elevate. Grow.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-[#1D1722] dark:text-white leading-[1.08] mb-6">
            Build. <span className="text-[#710193] dark:text-[#C553ED]">Elevate.</span> Grow.
          </h1>

          {/* Supporting Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-[#1D1722]/90 dark:text-[#EAE3F0] max-w-3xl mx-auto mb-6 leading-relaxed">
            We Build Digital Experiences That Move Businesses Forward.
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#706778] dark:text-[#A69CB0] max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            BluePeak helps businesses establish a powerful digital presence
            through modern websites, creative design, smart marketing, and
            reliable digital solutions.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreServices}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#710193] text-white text-sm font-semibold shadow-md shadow-[#710193]/20 hover:bg-[#4B0065] dark:hover:bg-[#8602AE] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#710193] focus:ring-offset-2"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onWorkTogether}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#16111D] text-[#1D1722] dark:text-white text-sm font-semibold border border-gray-200 dark:border-[#2E2338] hover:border-[#710193] dark:hover:border-[#9E24C7] hover:text-[#710193] dark:hover:text-[#C553ED] transition-all duration-200 shadow-xs hover:bg-[#FAF8FC] dark:hover:bg-[#1F1728] focus:outline-none focus:ring-2 focus:ring-[#710193]"
            >
              <span>Let's Work Together</span>
            </button>
          </div>
        </div>

        {/* Eye-Soothing Hero Banner Image Showcase */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#F3EAF7] dark:border-[#2E2338] shadow-2xl shadow-[#710193]/10 dark:shadow-[#710193]/25 bg-white dark:bg-[#16111D] group">
            {/* The Cinematic Architectural Mountain Pavilion Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#FAF8FC] dark:bg-[#110D17]">
              <img
                src="/src/assets/images/bluepeak_hero_banner_1793990760936.jpg"
                alt="BluePeak - Serene architectural design studio overlooking mountain peaks at sunrise, symbolizing growth and digital elevation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Gentle soothing gradient vignette on bottom edge for natural contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1D1722]/70 dark:from-[#0C0910]/85 via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Glass brand badge in lower left */}
              <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8 bg-white/85 dark:bg-[#120E18]/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/60 dark:border-white/10 shadow-lg max-w-xs sm:max-w-md">
                <div className="flex items-center gap-2 text-xs font-bold text-[#710193] dark:text-[#C553ED] uppercase tracking-wider mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>BluePeak Studio &bull; Zenith Architecture</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-[#1D1722] dark:text-white leading-snug">
                  Where visionary creative direction meets resilient, high-speed digital engineering.
                </p>
              </div>

              {/* Floating elevation indicator in upper right */}
              <div className="hidden sm:flex absolute top-6 right-6 items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-xs font-medium border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Elevating Global Brands</span>
              </div>
            </div>
          </div>
        </div>

        {/* Classic 3-Column Trust Strip */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/80 dark:bg-[#16111D]/80 backdrop-blur-xs p-6 rounded-2xl border border-[#F3EAF7] dark:border-[#261D2E] hover:border-[#710193]/20 dark:hover:border-[#9E24C7]/30 transition-all">
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

            <div className="bg-white/80 dark:bg-[#16111D]/80 backdrop-blur-xs p-6 rounded-2xl border border-[#F3EAF7] dark:border-[#261D2E] hover:border-[#710193]/20 dark:hover:border-[#9E24C7]/30 transition-all">
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

            <div className="bg-white/80 dark:bg-[#16111D]/80 backdrop-blur-xs p-6 rounded-2xl border border-[#F3EAF7] dark:border-[#261D2E] hover:border-[#710193]/20 dark:hover:border-[#9E24C7]/30 transition-all">
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
            className="inline-flex items-center gap-1.5 text-xs text-[#706778] dark:text-[#A69CB0] hover:text-[#710193] dark:hover:text-[#C553ED] transition-colors"
          >
            <span>Explore our story</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#710193] dark:text-[#C553ED]" />
          </a>
        </div>
      </div>
    </section>
  );
};
