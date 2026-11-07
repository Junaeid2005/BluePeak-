import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { PROJECTS_DATA } from '../data/agencyData';
import type { ProjectItem } from '../types';

interface PortfolioProps {
  onOpenProjectModal: (project: ProjectItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenProjectModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Business Websites',
    'Restaurant Websites',
    'E-commerce',
    'Landing Pages',
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 bg-[#FAF8FC] dark:bg-[#0D0A11] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#710193] dark:text-[#E2A6F7] mb-3">
            Selected Work &bull; Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1D1722] dark:text-white tracking-tight mb-5">
            Selected Projects
          </h2>
          <div className="w-12 h-0.5 bg-[#710193] dark:bg-[#9E24C7] mx-auto mb-6 opacity-80" />
          <p className="text-base sm:text-lg md:text-xl text-[#706778] dark:text-[#A69CB0] leading-relaxed">
            Explore some of the digital experiences we create.
          </p>
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-14 p-1.5 max-w-2xl mx-auto bg-white/70 dark:bg-[#16111D]/80 backdrop-blur-xs rounded-2xl border border-[#F3EAF7] dark:border-[#261D2E]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#710193] text-white shadow-xs'
                  : 'text-[#706778] dark:text-[#A69CB0] hover:text-[#1D1722] dark:hover:text-white hover:bg-[#FAF8FC] dark:hover:bg-[#20172B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-[#16111D] rounded-2xl overflow-hidden border border-[#F3EAF7] dark:border-[#261D2E] hover:border-[#710193]/35 dark:hover:border-[#9E24C7]/40 shadow-xs hover:shadow-xl hover:shadow-[#710193]/8 dark:hover:shadow-[#710193]/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} - ${project.category}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button
                      onClick={() => onOpenProjectModal(project)}
                      className="px-4 py-2 bg-white dark:bg-[#1C1525] text-[#1D1722] dark:text-white text-xs font-semibold rounded-lg shadow-md hover:bg-[#F3EAF7] dark:hover:bg-[#2B1B3D] hover:text-[#710193] dark:hover:text-[#E2A6F7] transition-colors flex items-center gap-1.5"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {/* Category subtle label */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-[#120E18]/90 backdrop-blur-sm text-[11px] font-semibold text-[#710193] dark:text-[#E2A6F7] rounded-lg border border-white/40 dark:border-white/10">
                    {project.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-[#1D1722] dark:text-white mb-2 group-hover:text-[#710193] dark:group-hover:text-[#C553ED] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#706778] dark:text-[#A69CB0] leading-relaxed mb-5">
                    {project.shortDescription}
                  </p>

                  {/* Technologies tags */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#706778] dark:text-[#A69CB0]">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <React.Fragment key={tech}>
                        {i > 0 && <span className="text-gray-300 dark:text-gray-600">&bull;</span>}
                        <span>{tech}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-gray-100 dark:border-[#261D2E]">
                <button
                  onClick={() => onOpenProjectModal(project)}
                  className="text-xs font-bold text-[#710193] dark:text-[#C553ED] hover:text-[#4B0065] dark:hover:text-[#E2A6F7] flex items-center gap-1 group/btn"
                >
                  <span>View Project Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onOpenProjectModal(project)}
                  className="p-1.5 rounded-lg text-[#706778] dark:text-[#A69CB0] hover:text-[#710193] dark:hover:text-[#C553ED] hover:bg-[#F3EAF7] dark:hover:bg-[#251A30] transition-colors"
                  title="Open live preview modal"
                  aria-label={`Preview ${project.title}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
