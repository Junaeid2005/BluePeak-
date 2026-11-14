import React from 'react';
import { Target, Eye, Compass, Check } from 'lucide-react';
import { motion } from 'motion/react';
import {
  EASE_OUT_EXPO,
  VIEWPORT_CONFIG,
  sectionHeaderVariants,
  staggerContainerVariants,
  cardItemVariants,
} from './SectionTransition';

export const About: React.FC = () => {
  const pillars = [
    {
      title: 'Our Mission',
      statement:
        'To empower businesses with effective, accessible, and innovative digital solutions.',
      icon: Target,
      tag: 'Core Purpose',
    },
    {
      title: 'Our Vision',
      statement:
        'To become a trusted digital partner for businesses looking to grow and succeed in an increasingly digital world.',
      icon: Eye,
      tag: 'Strategic Aspiration',
    },
    {
      title: 'Our Approach',
      statement:
        'Understanding your goals, creating the right solutions, and delivering experiences that make a difference.',
      icon: Compass,
      tag: 'Intentional Execution',
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-[#0C0910] relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-[#710193] dark:text-[#E2A6F7] mb-3">
            Company Background &bull; BluePeak
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1D1722] dark:text-white tracking-tight mb-5">
            Who We Are
          </h2>
          <div className="w-12 h-0.5 bg-[#710193] dark:bg-[#9E24C7] mx-auto mb-8 opacity-80" />

          {/* Prompt exact text */}
          <p className="text-lg sm:text-xl text-[#1D1722] dark:text-[#FAF8FC] font-medium leading-relaxed mb-5">
            At BluePeak, we believe every business deserves a strong digital presence.
          </p>
          <p className="text-base sm:text-lg text-[#706778] dark:text-[#A69CB0] leading-relaxed mb-4">
            We are a creative digital solutions team focused on helping businesses grow
            through professional web development, thoughtful design, and effective
            digital strategies.
          </p>
          <p className="text-base sm:text-lg text-[#706778] dark:text-[#A69CB0] leading-relaxed">
            Our goal is simple: to turn ideas into meaningful digital experiences that
            help businesses connect with their audience and move forward with
            confidence.
          </p>
        </motion.div>

        {/* Mission, Vision, Approach Cards */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                variants={cardItemVariants}
                whileHover={{ y: -5, transition: { duration: 0.24, ease: EASE_OUT_EXPO } }}
                className="group relative bg-[#FAF8FC] dark:bg-[#16111D] hover:bg-white dark:hover:bg-[#1D1627] rounded-2xl p-8 border border-[#F3EAF7] dark:border-[#261D2E] hover:border-[#710193]/30 dark:hover:border-[#9E24C7]/40 shadow-xs hover:shadow-xl hover:shadow-[#710193]/5 dark:hover:shadow-[#710193]/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#20172B] border border-[#F3EAF7] dark:border-[#2E2338] flex items-center justify-center text-[#710193] dark:text-[#E2A6F7] group-hover:bg-[#710193] group-hover:text-white transition-all duration-300 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold tracking-wider text-[#710193] dark:text-[#E2A6F7]">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-[#1D1722] dark:text-white mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-base text-[#706778] dark:text-[#A69CB0] leading-relaxed">
                    "{pillar.statement}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 dark:border-[#261D2E] flex items-center gap-2 text-xs font-medium text-[#706778] dark:text-[#A69CB0]">
                  <Check className="w-4 h-4 text-[#710193] dark:text-[#C553ED]" />
                  <span>Foundational Principle</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
