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
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3EAF7] text-[#710193] text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>The BluePeak Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1D1722] tracking-tight mb-5">
            Why Businesses Choose BluePeak
          </h2>
          <div className="w-16 h-1 bg-[#710193] mx-auto rounded-full mb-6" />
          <p className="text-base sm:text-lg md:text-xl text-[#706778] leading-relaxed">
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
                className="group relative bg-[#FAF8FC] hover:bg-white rounded-2xl p-8 border border-[#F3EAF7] hover:border-[#710193]/30 shadow-xs hover:shadow-xl hover:shadow-[#710193]/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#F3EAF7] flex items-center justify-center text-[#710193] group-hover:bg-[#710193] group-hover:text-white transition-all duration-300 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#710193]/60">
                    0{item.id}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold text-[#1D1722] mb-3 group-hover:text-[#710193] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-[#706778] leading-relaxed">
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
