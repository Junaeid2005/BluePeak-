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
    <section id="process" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3EAF7] text-[#710193] text-xs font-bold uppercase tracking-wider mb-4">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Workflow & Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1D1722] tracking-tight mb-5">
            How We Bring Ideas to Life
          </h2>
          <div className="w-16 h-1 bg-[#710193] mx-auto rounded-full mb-6" />
          <p className="text-base sm:text-lg md:text-xl text-[#706778] leading-relaxed">
            A structured, transparent five-step approach engineered to take your
            project from initial vision to measurable digital success.
          </p>
        </div>

        {/* Desktop Horizontal Process Timeline (hidden on mobile/tablet) */}
        <div className="hidden lg:block relative mb-12">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-[#F3EAF7] -translate-y-12 z-0" />

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
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#F3EAF7] group-hover:border-[#710193] flex items-center justify-center text-[#710193] group-hover:bg-[#710193] group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-[#4B0065] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                      {step.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-heading font-bold text-[#1D1722] mb-2 group-hover:text-[#710193] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#706778] leading-relaxed mb-3">
                    {step.description}
                  </p>

                  <div className="p-3 bg-[#FAF8FC] rounded-xl border border-[#F3EAF7] text-[11px] text-[#706778] leading-normal text-left">
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
          <div className="absolute top-4 bottom-4 left-6 w-0.5 bg-[#F3EAF7]" />

          <div className="space-y-8 relative">
            {PROCESS_DATA.map((step) => {
              const Icon = getIcon(step.iconName);
              return (
                <div key={step.step} className="flex items-start gap-4 sm:gap-6">
                  {/* Step circle */}
                  <div className="relative shrink-0 z-10">
                    <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#710193] flex items-center justify-center text-[#710193] shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#4B0065] text-white text-[10px] font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 bg-[#FAF8FC] p-5 sm:p-6 rounded-2xl border border-[#F3EAF7]">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-heading font-bold text-[#1D1722]">
                        {step.title}
                      </h3>
                      <span className="text-xs font-mono font-semibold text-[#710193]">
                        Step {step.step}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[#1D1722]/80 mb-2">
                      {step.description}
                    </p>
                    <p className="text-xs text-[#706778] leading-relaxed">
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
