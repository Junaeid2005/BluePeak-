import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  ExternalLink,
  BookOpen,
  ShoppingBag,
  CalendarCheck,
  LayoutDashboard,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { FeaturedClientProject } from './Portfolio';
import { EASE_OUT_EXPO } from './SectionTransition';

interface ProjectDetailsModalProps {
  project: FeaturedClientProject | null;
  onClose: () => void;
  onStartProject: () => void;
}

const KEY_FEATURES = [
  {
    label: 'Digital Menu',
    icon: BookOpen,
  },
  {
    label: 'Online Food Ordering',
    icon: ShoppingBag,
  },
  {
    label: 'Table Reservations',
    icon: CalendarCheck,
  },
  {
    label: 'Restaurant Admin Dashboard',
    icon: LayoutDashboard,
  },
];

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  onStartProject,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [liveHintVisible, setLiveHintVisible] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setLiveHintVisible(false);
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % project.screenshots.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          (prev - 1 + project.screenshots.length) % project.screenshots.length
        );
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const hasExternalLiveUrl = Boolean(
    project?.liveUrl && project.liveUrl.startsWith('http')
  );

  const handleVisitLiveClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hasExternalLiveUrl) {
      e.preventDefault();
      setLiveHintVisible(true);
    }
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#0C0910]/80 backdrop-blur-md p-4 sm:p-6 lg:p-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-details-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl my-auto rounded-3xl bg-white dark:bg-[#120E18] border border-[#F3EAF7] dark:border-[#261D2E] shadow-2xl overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#F3EAF7] dark:border-[#261D2E] bg-[#FAF8FC] dark:bg-[#16111D]">
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#706778] dark:text-[#A69CB0] hover:text-[#710193] dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Portfolio</span>
              </button>

              <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-widest text-[#710193] dark:text-[#E2A6F7]">
                {project.category}
              </span>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#706778] dark:text-[#A69CB0] hover:text-[#1D1722] dark:hover:text-white hover:bg-[#F3EAF7] dark:hover:bg-[#251A30] transition-colors"
                aria-label="Close project details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-10">
              {/* Header + Description + Visit Live Website */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="sm:hidden text-xs font-semibold uppercase tracking-widest text-[#710193] dark:text-[#E2A6F7] mb-2">
                    {project.category}
                  </div>
                  <h2
                    id="project-details-title"
                    className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1D1722] dark:text-white tracking-tight mb-3"
                  >
                    {project.name}
                  </h2>
                  <p className="text-base sm:text-lg text-[#706778] dark:text-[#A69CB0] leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
                  <a
                    href={project.liveUrl}
                    target={hasExternalLiveUrl ? '_blank' : undefined}
                    rel={hasExternalLiveUrl ? 'noopener noreferrer' : undefined}
                    onClick={handleVisitLiveClick}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#710193] text-white text-sm font-semibold shadow-lg shadow-[#710193]/25 hover:bg-[#4B0065] dark:hover:bg-[#8602AE] transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#710193] focus:ring-offset-2"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  {liveHintVisible && !hasExternalLiveUrl && (
                    <span className="text-xs text-[#710193] dark:text-[#E2A6F7] font-medium">
                      Live link ready — connect your live Rashoi URL to launch externally.
                    </span>
                  )}
                </div>
              </div>

              {/* 1. Large Website Preview Stage */}
              <div className="space-y-4">
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#140E18] border border-[#F3EAF7] dark:border-[#2E2338] shadow-lg">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={project.screenshots[activeIndex].src}
                      src={project.screenshots[activeIndex].src}
                      alt={project.screenshots[activeIndex].alt}
                      initial={{ opacity: 0.4, scale: 1.01 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.4 }}
                      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </AnimatePresence>

                  {/* Previous / Next Controls */}
                  {project.screenshots.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveIndex(
                            (prev) =>
                              (prev - 1 + project.screenshots.length) %
                              project.screenshots.length
                          )
                        }
                        aria-label="Previous screenshot"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0C0910]/65 hover:bg-[#710193] text-white backdrop-blur-md flex items-center justify-center transition-colors border border-white/15"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveIndex(
                            (prev) => (prev + 1) % project.screenshots.length
                          )
                        }
                        aria-label="Next screenshot"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0C0910]/65 hover:bg-[#710193] text-white backdrop-blur-md flex items-center justify-center transition-colors border border-white/15"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Screenshot Thumbnail Selector */}
                <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
                  {project.screenshots.map((shot, idx) => {
                    const isSelected = idx === activeIndex;
                    return (
                      <button
                        key={shot.src}
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={`group text-left rounded-xl overflow-hidden border transition-all ${
                          isSelected
                            ? 'border-[#710193] dark:border-[#C553ED] ring-2 ring-[#710193]/25 dark:ring-[#C553ED]/30'
                            : 'border-[#F3EAF7] dark:border-[#261D2E] opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="aspect-[16/9] w-full bg-[#140E18] overflow-hidden">
                          <img
                            src={shot.src}
                            alt={shot.label}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="hidden sm:block px-2 py-1.5 bg-[#FAF8FC] dark:bg-[#16111D] text-[11px] font-semibold truncate text-[#1D1722] dark:text-white">
                          {shot.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Four Key Features with Simple Icons */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#706778] dark:text-[#A69CB0] mb-4">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {KEY_FEATURES.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={feature.label}
                        className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#FAF8FC] dark:bg-[#16111D] border border-[#F3EAF7] dark:border-[#261D2E]"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#F3EAF7] dark:bg-[#251532] text-[#710193] dark:text-[#E2A6F7] flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-heading font-bold text-[#1D1722] dark:text-white leading-snug">
                          {feature.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5. Final CTA */}
              <div className="rounded-2xl p-8 sm:p-10 bg-gradient-to-br from-[#710193] via-[#5c0177] to-[#4B0065] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight mb-2">
                    Have a Restaurant Business?
                  </h3>
                  <p className="text-sm sm:text-base text-white/90">
                    Let's build something amazing together.
                  </p>
                </div>

                <button
                  onClick={onStartProject}
                  className="shrink-0 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#710193] text-sm font-bold shadow-lg hover:bg-[#FAF8FC] transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 text-[#710193]" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
