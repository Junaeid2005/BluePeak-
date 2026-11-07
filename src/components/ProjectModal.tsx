import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Monitor,
  Tablet,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import type { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquireSimilar: (category: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInquireSimilar,
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>(
    'desktop'
  );

  if (!project) return null;

  const deviceWidthClasses = {
    desktop: 'w-full',
    tablet: 'max-w-xl mx-auto',
    mobile: 'max-w-sm mx-auto',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-white dark:bg-[#16111D] rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col border border-[#F3EAF7] dark:border-[#2E2338] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 dark:border-[#261D2E] flex items-center justify-between bg-[#FAF8FC] dark:bg-[#120E18]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#F3EAF7] dark:bg-[#251532] text-[#710193] dark:text-[#E2A6F7] text-[10px] font-bold uppercase tracking-wider mb-1">
              <span>{project.category}</span>
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-[#1D1722] dark:text-white">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#20172B] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Device Mockup Toolbar */}
          <div className="bg-[#FAF8FC] dark:bg-[#120E18] p-4 rounded-2xl border border-gray-100 dark:border-[#261D2E] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#706778] dark:text-[#A69CB0]">
              <span>Simulated Device Viewport:</span>
            </div>

            <div className="flex items-center gap-1.5 bg-white dark:bg-[#1C1525] p-1 rounded-xl border border-gray-200 dark:border-[#2E2338]">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  deviceView === 'desktop'
                    ? 'bg-[#710193] text-white shadow-xs'
                    : 'text-[#706778] dark:text-[#A69CB0] hover:text-[#1D1722] dark:hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop (1440px)</span>
              </button>

              <button
                onClick={() => setDeviceView('tablet')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  deviceView === 'tablet'
                    ? 'bg-[#710193] text-white shadow-xs'
                    : 'text-[#706778] dark:text-[#A69CB0] hover:text-[#1D1722] dark:hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet (768px)</span>
              </button>

              <button
                onClick={() => setDeviceView('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  deviceView === 'mobile'
                    ? 'bg-[#710193] text-white shadow-xs'
                    : 'text-[#706778] dark:text-[#A69CB0] hover:text-[#1D1722] dark:hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile (375px)</span>
              </button>
            </div>
          </div>

          {/* Device Frame Simulation */}
          <div className="p-4 bg-gray-900 rounded-2xl overflow-hidden transition-all duration-300">
            <div className="flex items-center gap-1.5 mb-3 px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-[11px] text-gray-400 font-mono ml-2 truncate">
                https://demo.bluepeak.agency/projects/{project.id}
              </span>
            </div>

            <div className={`transition-all duration-300 ${deviceWidthClasses[deviceView]}`}>
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-800">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Overview & Challenge / Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-lg text-[#1D1722] dark:text-white flex items-center gap-2">
                <span>The Challenge</span>
              </h4>
              <p className="text-sm text-[#706778] dark:text-[#A69CB0] leading-relaxed bg-[#FAF8FC] dark:bg-[#120E18] p-4 rounded-xl border border-gray-100 dark:border-[#261D2E]">
                {project.challenge}
              </p>

              <h4 className="font-heading font-bold text-lg text-[#1D1722] dark:text-white flex items-center gap-2 pt-2">
                <span>Our Solution</span>
              </h4>
              <p className="text-sm text-[#706778] dark:text-[#A69CB0] leading-relaxed bg-[#FAF8FC] dark:bg-[#120E18] p-4 rounded-xl border border-gray-100 dark:border-[#261D2E]">
                {project.solution}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-heading font-bold text-lg text-[#1D1722] dark:text-white mb-3">
                  Key Deliverables
                </h4>
                <ul className="space-y-2.5">
                  {project.results.map((result, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1D1722] dark:text-white"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#710193] dark:text-[#C553ED] shrink-0 mt-0.5" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#706778] dark:text-[#A69CB0] mb-3">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-[#F3EAF7] dark:bg-[#251532] text-[#710193] dark:text-[#E2A6F7] text-xs font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 border-t border-gray-100 dark:border-[#261D2E] bg-[#FAF8FC] dark:bg-[#120E18] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#706778] dark:text-[#A69CB0] text-center sm:text-left">
            Interested in a comparable digital experience for your organization?
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1C1525] border border-gray-200 dark:border-[#2E2338] rounded-xl hover:bg-gray-50 dark:hover:bg-[#241B30] transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onInquireSimilar(project.category);
              }}
              className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 text-xs font-semibold text-white bg-[#710193] rounded-xl shadow-md hover:bg-[#4B0065] dark:hover:bg-[#8602AE] transition-colors"
            >
              <span>Inquire For This</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
