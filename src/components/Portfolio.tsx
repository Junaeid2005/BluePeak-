import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import {
  EASE_OUT_EXPO,
  VIEWPORT_CONFIG,
  sectionHeaderVariants,
} from './SectionTransition';

export interface FeaturedClientProject {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  liveUrl: string;
  screenshots: {
    src: string;
    label: string;
    alt: string;
  }[];
}

export const RASHOI_PROJECT: FeaturedClientProject = {
  id: 'rashoi-restaurant',
  name: 'Rashoi Restaurant',
  category: 'Restaurant Website',
  shortDescription:
    'A modern restaurant website designed to simplify online food ordering and table reservations while creating a better customer experience.',
  liveUrl: '#', // Replace with the deployed Rashoi Restaurant live URL when ready
  screenshots: [
    {
      src: '/assets/aistudio/image_65387d47.png',
      label: 'Homepage',
      alt: 'Rashoi Restaurant website hero showcasing authentic Indian cuisine and table booking',
    },
    {
      src: '/assets/aistudio/image_2af538da.png',
      label: 'Digital Menu',
      alt: 'Rashoi Restaurant interactive digital menu with categories and pricing',
    },
    {
      src: '/assets/aistudio/image_6e29ebfe.png',
      label: 'Online Ordering',
      alt: 'Rashoi Restaurant takeaway order cart drawer with automatic discount calculation',
    },
    {
      src: '/assets/aistudio/image_6b996919.png',
      label: 'Order Confirmation',
      alt: 'Rashoi Restaurant live order confirmation modal sent to kitchen',
    },
    {
      src: '/assets/aistudio/image_07bfe7c8.png',
      label: 'Table Reservations',
      alt: 'Rashoi Restaurant online table reservation booking form',
    },
  ],
};

interface PortfolioProps {
  onExploreProject: (project: FeaturedClientProject) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onExploreProject }) => {
  const heroShot = RASHOI_PROJECT.screenshots[0];

  return (
    <section
      id="portfolio"
      className="py-24 bg-white dark:bg-[#0C0910] relative transition-colors duration-300"
    >
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
            Our Work &bull; Featured Project
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1D1722] dark:text-white tracking-tight mb-5">
            Client Showcase
          </h2>
          <div className="w-12 h-0.5 bg-[#710193] dark:bg-[#9E24C7] mx-auto mb-6 opacity-80" />
          <p className="text-base sm:text-lg md:text-xl text-[#706778] dark:text-[#A69CB0] leading-relaxed">
            Real digital solutions crafted to elevate customer experiences and simplify everyday business operations.
          </p>
        </motion.div>

        {/* Featured Project Card: Rashoi Restaurant */}
        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          className="group relative rounded-3xl overflow-hidden bg-[#FAF8FC] dark:bg-[#16111D] border border-[#F3EAF7] dark:border-[#261D2E] hover:border-[#710193]/35 dark:hover:border-[#9E24C7]/45 shadow-sm hover:shadow-2xl hover:shadow-[#710193]/10 dark:hover:shadow-[#710193]/20 transition-all duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Large Attractive Website Screenshot (7 cols) */}
            <div
              onClick={() => onExploreProject(RASHOI_PROJECT)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onExploreProject(RASHOI_PROJECT);
                }
              }}
              aria-label={`Preview ${RASHOI_PROJECT.name}`}
              className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden bg-[#140E18] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#710193]"
            >
              <img
                src={heroShot.src}
                alt={heroShot.alt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Clean Project Overview (5 cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#710193] dark:text-[#E2A6F7] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{RASHOI_PROJECT.category}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#1D1722] dark:text-white tracking-tight mb-4">
                {RASHOI_PROJECT.name}
              </h3>

              <p className="text-sm sm:text-base text-[#706778] dark:text-[#A69CB0] leading-relaxed mb-8">
                {RASHOI_PROJECT.shortDescription}
              </p>

              <div>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                  onClick={() => onExploreProject(RASHOI_PROJECT)}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#710193] text-white text-sm font-semibold shadow-lg shadow-[#710193]/25 hover:bg-[#4B0065] dark:hover:bg-[#8602AE] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#710193] focus:ring-offset-2"
                >
                  <span>Explore Project</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
};
