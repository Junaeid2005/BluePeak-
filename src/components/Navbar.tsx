import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { scrollToSectionSmooth, EASE_OUT_EXPO } from './SectionTransition';

interface NavbarProps {
  onOpenContact: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'portfolio', label: 'Our Work', href: '#portfolio' },
  { id: 'process', label: 'Process', href: '#process' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy for smooth active-section pill transitions
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.id);
    const updateActiveFromScroll = () => {
      const scrollMarker = window.scrollY + window.innerHeight * 0.32;
      let current = 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMarker) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveFromScroll);
  }, []);

  const handleLinkClick = (href: string, id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    scrollToSectionSmooth(href);
  };

  const isDark = theme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#0C0910]/90 backdrop-blur-md shadow-sm border-b border-[#F3EAF7] dark:border-[#261D2E] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#home', 'home');
            }}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#710193] rounded-lg"
            aria-label="BluePeak Home"
          >
            <Logo variant={!isScrolled ? 'light' : 'auto'} showTagline={false} />
          </a>

          {/* Desktop Nav Links with gliding layoutId highlight */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-white/75 dark:bg-[#16111D]/85 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-[#F3EAF7] dark:border-[#2E2338] shadow-xs">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href, link.id);
                  }}
                  className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full ${
                    isActive
                      ? 'text-white'
                      : 'text-[#706778] dark:text-[#A69CB0] hover:text-[#710193] dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#710193] shadow-sm shadow-[#710193]/25 -z-0"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle (Black / White) */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full border border-gray-200 dark:border-[#2E2338] bg-white dark:bg-[#16111D] text-[#706778] dark:text-[#A69CB0] hover:text-[#710193] dark:hover:text-white hover:border-[#710193] dark:hover:border-[#9E24C7] transition-all shadow-xs"
              title={isDark ? 'Switch to White Theme' : 'Switch to Black Theme'}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#710193]" />
              )}
            </button>

            {/* Let's Talk CTA */}
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-[#710193] text-white shadow-md shadow-[#710193]/20 hover:bg-[#4B0065] dark:hover:bg-[#8602AE] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#710193] focus:ring-offset-2"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onToggleTheme}
              className="p-2 text-xs font-semibold text-[#706778] dark:text-[#A69CB0] bg-white dark:bg-[#16111D] border border-gray-200 dark:border-[#2E2338] rounded-full"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#710193]" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#710193] ${
                isScrolled
                  ? 'text-[#1D1722] dark:text-white hover:bg-[#F3EAF7] dark:hover:bg-[#251A30]'
                  : 'text-white hover:bg-white/15'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Smooth scroll-progress hairline at the bottom edge of header */}
      <motion.div
        style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#710193] via-[#C553ED] to-[#710193] transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
            className="sm:hidden bg-white dark:bg-[#120E18] border-b border-[#F3EAF7] dark:border-[#261D2E] shadow-xl px-5 pt-3 pb-6"
          >
            <nav className="flex flex-col gap-1 mb-5">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href, link.id);
                    }}
                    className={`px-4 py-2.5 text-base font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#710193] text-white'
                        : 'text-[#1D1722] dark:text-white hover:text-[#710193] dark:hover:text-[#C553ED] hover:bg-[#F3EAF7] dark:hover:bg-[#20172B]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex flex-col gap-2.5 pt-3 border-t border-gray-100 dark:border-[#261D2E]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-[#710193] rounded-xl shadow-md shadow-[#710193]/20"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
