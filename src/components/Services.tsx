import React from 'react';
import {
  Code,
  ShieldCheck,
  Search,
  Share2,
  Palette,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/agencyData';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return Code;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Search':
        return Search;
      case 'Share2':
        return Share2;
      case 'Palette':
        return Palette;
      case 'Sparkles':
      default:
        return Sparkles;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#FAF8FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#710193] mb-3">
            Core Capabilities &bull; What We Offer
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#1D1722] tracking-tight mb-5">
            What We Do
          </h2>
          <div className="w-12 h-0.5 bg-[#710193] mx-auto mb-6 opacity-80" />
          <p className="text-base sm:text-lg md:text-xl text-[#706778] leading-relaxed">
            From building your online presence to growing your brand, we provide
            digital solutions designed to help your business move forward.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = getIcon(service.iconName);
            const isFeatured = index === 0;

            return (
              <div
                key={service.id}
                className={`group relative rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between border ${
                  isFeatured
                    ? 'bg-white border-[#710193]/30 shadow-md shadow-[#710193]/5 ring-1 ring-[#710193]/15'
                    : 'bg-white border-[#F3EAF7] hover:border-[#710193]/35 shadow-xs hover:shadow-xl hover:shadow-[#710193]/5'
                }`}
              >
                <div>
                  {/* Top Bar: Icon and Clean Unboxed Kicker */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#F3EAF7] text-[#710193] flex items-center justify-center group-hover:bg-[#710193] group-hover:text-white transition-all duration-300 shadow-xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold tracking-wider text-[#710193]">
                      {service.tag}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-2xl font-heading font-bold text-[#1D1722] mb-3 group-hover:text-[#710193] transition-colors">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-sm sm:text-base text-[#706778] leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Sub-services list */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#1D1722]/70 mb-3">
                      Scope includes:
                    </div>
                    <ul className="space-y-2">
                      {service.subServices.map((subItem) => (
                        <li
                          key={subItem}
                          className="flex items-center gap-2 text-xs sm:text-sm text-[#706778]"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-[#710193] shrink-0" />
                          <span>{subItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-6 mt-6 border-t border-gray-100">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full inline-flex items-center justify-between text-xs sm:text-sm font-semibold text-[#710193] hover:text-[#4B0065] transition-colors py-1 group/btn"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
