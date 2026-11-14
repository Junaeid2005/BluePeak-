import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { EASE_OUT_EXPO, VIEWPORT_CONFIG } from './SectionTransition';

interface CtaSectionProps {
  onStartProject: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartProject }) => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#710193] via-[#5c0177] to-[#4B0065] dark:from-[#550170] dark:via-[#3E0152] dark:to-[#250033] text-white transition-colors duration-300">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L100,100 L0,100 Z" fill="white" />
        </svg>
      </div>

      {/* Subtle ambient glow */}
      <motion.div
        initial={{ opacity: 0.15, scale: 0.9 }}
        whileInView={{ opacity: 0.3, scale: 1.05 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
        aria-hidden="true"
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[280px] rounded-full bg-[#D57CF7]/25 blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={VIEWPORT_CONFIG}
        transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
        className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider mb-6 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Start The Conversation</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-white mb-6 leading-tight">
          Ready to Elevate Your Digital Presence?
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Let's turn your ideas into something meaningful. Tell us about your
          project, and let's build something great together.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            onClick={onStartProject}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#710193] text-base font-bold shadow-xl hover:bg-[#FAF8FC] hover:shadow-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 text-[#710193]" />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};
