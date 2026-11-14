import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 'some' as const,
};

export const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASE_OUT_EXPO,
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

export const cardItemVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.58,
      ease: EASE_OUT_EXPO,
    },
  },
};

interface SectionBridgeProps {
  variant?: 'hero-to-about' | 'seam-light-to-tint' | 'seam-tint-to-light' | 'seam-to-cta' | 'cta-to-contact';
}

/**
 * Architectural section-to-section bridge that creates fluid visual continuity
 * as the user scrolls from one band into the next.
 */
export const SectionBridge: React.FC<SectionBridgeProps> = ({ variant = 'seam-light-to-tint' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 1, 0.6]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.85, 0.3]);

  if (variant === 'hero-to-about') {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className="relative h-16 sm:h-20 bg-gradient-to-b from-[#0C0910] via-[#261436]/90 to-white dark:from-[#0C0910] dark:via-[#140C1D] dark:to-[#0C0910] overflow-hidden"
      >
        <motion.div
          style={{ scaleX: lineScaleX, opacity: glowOpacity }}
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#710193]/55 to-transparent origin-center"
        />
      </div>
    );
  }

  if (variant === 'seam-to-cta') {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className="relative h-10 bg-gradient-to-b from-white to-[#710193]/15 dark:from-[#0C0910] dark:to-[#4B0065]/30 overflow-hidden"
      >
        <motion.div
          style={{ scaleX: lineScaleX, opacity: glowOpacity }}
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C553ED]/50 to-transparent origin-center"
        />
      </div>
    );
  }

  if (variant === 'cta-to-contact') {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className="relative h-10 bg-gradient-to-b from-[#4B0065]/20 to-white dark:from-[#250033]/50 dark:to-[#0C0910] overflow-hidden"
      >
        <motion.div
          style={{ scaleX: lineScaleX, opacity: glowOpacity }}
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent origin-center"
        />
      </div>
    );
  }

  const bgClasses =
    variant === 'seam-light-to-tint'
      ? 'from-white to-[#FAF8FC] dark:from-[#0C0910] dark:to-[#0D0A11]'
      : 'from-[#FAF8FC] to-white dark:from-[#0D0A11] dark:to-[#0C0910]';

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative h-12 bg-gradient-to-b ${bgClasses} flex items-center justify-center overflow-hidden`}
    >
      <motion.div
        style={{ scaleX: lineScaleX, opacity: glowOpacity }}
        className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#710193]/25 dark:via-[#C553ED]/30 to-transparent origin-center"
      />
      <motion.span
        style={{ opacity: glowOpacity }}
        className="absolute w-1.5 h-1.5 rounded-full bg-[#710193]/45 dark:bg-[#C553ED]/60 ring-4 ring-[#710193]/10 dark:ring-[#C553ED]/15"
      />
    </div>
  );
};

/**
 * Custom smooth scroll utility with gentle cubic easing and fixed-navbar compensation.
 */
export function scrollToSectionSmooth(sectionId: string) {
  const cleanId = sectionId.replace(/^#/, '');
  const target = document.getElementById(cleanId);
  if (!target) return;

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const navOffset = cleanId === 'home' ? 0 : 72;
  const targetTop = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - navOffset
  );

  if (prefersReduced) {
    window.scrollTo(0, targetTop);
    return;
  }

  const startY = window.scrollY;
  const distance = targetTop - startY;
  const duration = Math.min(900, Math.max(480, Math.abs(distance) * 0.45));
  let startTime: number | null = null;

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}
