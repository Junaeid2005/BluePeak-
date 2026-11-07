import React from 'react';
import {
  Sliders,
  Smartphone,
  Users,
  MessageSquare,
  CheckCircle2,
  LifeBuoy,
  Award,
} from 'lucide-react';
import { WHY_CHOOSE_DATA } from '../data/agencyData';

export const WhyUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sliders':
        return Sliders;
      case 'Smartphone':
        return Smartphone;
      case 'Users':
        return Users;
      case 'MessageSquare':
        return MessageSquare;
      case 'CheckCircle2':
        return CheckCircle2;
      case 'LifeBuoy':
      default:
        return LifeBuoy;
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-[#0C0910] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#710193] dark:text-[#E2A6F7] mb-3">
            The BluePeak Advantage &bull; Value Proposition
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1D1722] dark:text-white tracking-tight mb-5">
            Why Businesses Choose BluePeak
          </h2>
          <div className="w-12 h-0.5 bg-[#710193] dark:bg-[#9E24C7] mx-auto mb-6 opacity-80" />
          <p className="text-base sm:text-lg md:text-xl text-[#706778] dark:text-[#A69CB0] leading-relaxed">
            We combine creativity, technology, and a business-focused approach
            to deliver digital solutions that matter.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_DATA.map((item) => {
            const Icon = getIcon(item.iconName);
            return (
              <div
                key={item.id}
                className="group relative bg-[#FAF8FC] dark:bg-[#16111D] hover:bg-white dark:hover:bg-[#1D1627] rounded-2xl p-8 border border-[#F3EAF7] dark:border-[#261D2E] hover:border-[#710193]/30 dark:hover:border-[#9E24C7]/40 shadow-xs hover:shadow-xl hover:shadow-[#710193]/5 dark:hover:shadow-[#710193]/15 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#20172B] border border-[#F3EAF7] dark:border-[#2E2338] flex items-center justify-center text-[#710193] dark:text-[#E2A6F7] group-hover:bg-[#710193] group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold font-mono text-[#710193]/60 dark:text-[#E2A6F7]/60">
                    0{item.id}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold text-[#1D1722] dark:text-white mb-3 group-hover:text-[#710193] dark:group-hover:text-[#C553ED] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-[#706778] dark:text-[#A69CB0] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
