import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'auto',
  showTagline = false,
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Abstract Mountain Peak / B Symbol */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#710193] to-[#4B0065] text-white shadow-md shadow-[#710193]/20 transition-transform duration-300 hover:scale-105 shrink-0">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          {/* Back peak */}
          <path
            d="M12 28L20 14L28 28H12Z"
            fill="white"
            fillOpacity="0.25"
          />
          {/* Main ascending peak & abstract 'B' fold */}
          <path
            d="M16 28L24 10L32 28H26L24 23L22 28H16Z"
            fill="white"
          />
          {/* Zenith accent dot representing elevation */}
          <circle cx="24" cy="8" r="1.75" fill="#FAF8FC" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center tracking-tight font-heading font-extrabold text-xl leading-none">
          <span
            className={
              isLight
                ? 'text-white'
                : 'text-[#1D1722] dark:text-white'
            }
          >
            Blue
          </span>
          <span className="text-[#710193] dark:text-[#C553ED]">
            Peak
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[10px] uppercase font-semibold tracking-widest mt-1 ${
              isLight ? 'text-white/70' : 'text-[#706778] dark:text-[#A69CB0]'
            }`}
          >
            Build. Elevate. Grow.
          </span>
        )}
      </div>
    </div>
  );
};
