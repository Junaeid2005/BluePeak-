import React from 'react';
import {
  Compass,
  Layers,
  PenTool,
  Terminal,
  Rocket,
  GitBranch,
} from 'lucide-react';
import { PROCESS_DATA } from '../data/agencyData';

export const Process: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return Compass;
      case 'Layers':
        return Layers;
      case 'PenTool':
        return PenTool;
      case 'Terminal':
        return Terminal;
      case 'Rocket':
      default:
        return Rocket;
    }
  };

  return (
    <section id="process" className="py-24 bg-white dark:bg-[#0C0910] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#710193] dark:text-[#E2A6F7] mb-3">
            Workflow &bull; Five-Step Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1D1722] dark:text-white tracking-tight mb-5">
            How We Bring Ideas to Life
          </h2>
          <div className="w-12 h-0.5 bg-[#710193] dark:bg-[#9E24C7] mx-auto mb-6 opacity-80" />
          <p className="text-base sm:text-lg md:text-xl text-[#706778] dark:text-[#A69CB0] leading-relaxed">
            A structured, transparent five-step approach engineered to take your
            project from initial vision to measurable digital success.
          </p>
        </div>

        {/* Desktop Horizontal Process Timeline (hidden on mobile/tablet) */}
        <div className="hidden lg:block relative mb-12">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-[#F3EAF7] dark:bg-[#261D2E] -translate-y-12 z-0" />

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {PROCESS_DATA.map((step) => {
              const Icon = getIcon(step.iconName);
              return (
                <div
                  key={step.step}
                  className="group flex flex-col items-center text-center p-4"
                >
                  {/* Step Number & Icon Circle */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#16111D] border-2 border-[#F3EAF7] dark:border-[#2E2338] group-hover:border-[#710193] dark:group-hover:border-[#9E24C7] flex items-center justify-center text-[#710193] dark:text-[#E2A6F7] group-hover:bg-[#710193] group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-[#4B0065] dark:bg-[#710193] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-heading font-bold text-[#1D1722] dark:text-white mb-2 group-hover:text-[#710193] dark:group-hover:text-[#C553ED] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#706778] dark:text-[#A69CB0] leading-relaxed mb-3">
                    {step.description}
                  </p>

                  <div className="p-3 bg-[#FAF8FC] dark:bg-[#16111D] rounded-xl border border-[#F3EAF7] dark:border-[#261D2E] text-[11px] text-[#706778] dark:text-[#A69CB0] leading-normal text-left">
                    {step.details}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline */}
        <div className="lg:hidden relative">
          {/* Vertical line */}
          <div className="absolute top-4 bottom-4 left-6 w-0.5 bg-[#F3EAF7] dark:bg-[#261D2E]" />

          <div className="space-y-8 relative">
            {PROCESS_DATA.map((step) => {
              const Icon = getIcon(step.iconName);
              return (
                <div key={step.step} className="flex items-start gap-4 sm:gap-6">
                  {/* Step circle */}
                  <div className="relative shrink-0 z-10">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#16111D] border-2 border-[#710193] dark:border-[#9E24C7] flex items-center justify-center text-[#710193] dark:text-[#E2A6F7] shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#4B0065] dark:bg-[#710193] text-white text-[10px] font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 bg-[#FAF8FC] dark:bg-[#16111D] p-5 sm:p-6 rounded-2xl border border-[#F3EAF7] dark:border-[#261D2E]">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-heading font-bold text-[#1D1722] dark:text-white">
                        {step.title}
                      </h3>
                      <span className="text-xs font-mono font-semibold text-[#710193] dark:text-[#E2A6F7]">
                        Step {step.step}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[#1D1722]/80 dark:text-[#E2D9E8] mb-2">
                      {step.description}
                    </p>
                    <p className="text-xs text-[#706778] dark:text-[#A69CB0] leading-relaxed">
                      {step.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
