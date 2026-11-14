import React, { useRef } from 'react';
import { ArrowRight, ChevronDown, Sparkles, Compass, ShieldCheck, Globe } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { EASE_OUT_EXPO, scrollToSectionSmooth } from './SectionTransition';

interface HeroProps {
  onExploreServices: () => void;
  onWorkTogether: () => void;
}

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_OUT_EXPO,
    },
  },
};

const trustCards = [
  {
    icon: Compass,
    title: 'Tailored Engineering',
    description:
      'Bespoke websites, e-commerce, and web applications built from scratch with modern technologies.',
  },
  {
    icon: Globe,
    title: 'Multi-Region Support',
    description:
      'Direct advisory lines and dedicated customer service spanning UK, Germany, and Bangladesh.',
  },
  {
    icon: ShieldCheck,
    title: 'End-to-End Delivery',
    description:
      'From discovery and UX prototyping to high-speed deployment, SEO, and ongoing care.',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onWorkTogether,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Smooth depth & parallax transition as user scrolls from Hero to About
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.01, 1.09]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '36px']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.78, 1], [1, 0.92, 0.35]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#0C0910] text-white transition-colors duration-300"
    >
      {/* Full-Bleed Futuristic Digital Canvas Background Image with Scroll Parallax */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <motion.img
          src="/assets/aistudio/image_3f3768db.png"
          alt="Futuristic digital data horizon representing innovation and growth at BluePeak"
          style={{ y: bgY, scale: bgScale }}
          className="w-full h-full object-cover object-center opacity-70 will-change-transform"
          loading="eager"
          referrerPolicy="no-referrer"
        />

        {/* Measured dark-plum & obsidian scrim for strong text contrast while preserving artwork depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0915]/75 via-[#150D20]/65 to-[#0C0910]/95" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 38%, rgba(15, 9, 22, 0.55) 0%, rgba(12, 9, 16, 0.2) 65%)',
          }}
        />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full"
      >
        {/* Top Editorial Headline Block */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto mb-14 sm:mb-16"
        >
          {/* Subtle Editorial Kicker */}
          <motion.div
            variants={heroItemVariants}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#E2A6F7] uppercase mb-5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D57CF7]" />
            <span>Digital Agency &bull; Build. Elevate. Grow.</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={heroItemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-white leading-[1.08] mb-6 drop-shadow-sm"
          >
            Build. <span className="text-[#D57CF7]">Elevate.</span> Grow.
          </motion.h1>

          {/* Supporting Headline */}
          <motion.h2
            variants={heroItemVariants}
            className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-white/90 max-w-3xl mx-auto mb-6 leading-relaxed"
          >
            We Build Digital Experiences That Move Businesses Forward.
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={heroItemVariants}
            className="text-base sm:text-lg text-[#D6CFE0] max-w-2xl mx-auto mb-9 leading-relaxed font-normal"
          >
            BluePeak helps businesses establish a powerful digital presence
            through modern websites, creative design, smart marketing, and
            reliable digital solutions.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            variants={heroItemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
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
          </motion.div>
        </motion.div>

        {/* Classic 3-Column Trust Strip */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {trustCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={heroItemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.22, ease: EASE_OUT_EXPO } }}
                  className="bg-white/95 dark:bg-[#16111D]/90 backdrop-blur-md p-6 rounded-2xl border border-white/60 dark:border-[#261D2E] hover:border-[#710193]/40 dark:hover:border-[#9E24C7]/40 transition-colors shadow-lg"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F3EAF7] dark:bg-[#251532] text-[#710193] dark:text-[#C553ED] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#1D1722] dark:text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#706778] dark:text-[#A69CB0] leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Subtle scroll down indicator */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: EASE_OUT_EXPO }}
          className="mt-14 flex justify-center"
        >
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSectionSmooth('#about');
            }}
            className="inline-flex items-center gap-1.5 text-xs text-white/75 hover:text-white transition-colors"
          >
            <span>Explore our story</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#D57CF7]" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
