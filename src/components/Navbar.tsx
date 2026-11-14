import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight, User, ShieldCheck, Sun, Moon } from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';
import { isUserAdmin } from '../lib/firebase';

interface NavbarProps {
  currentUser: FirebaseUser | null;
  onOpenAuthPortal: () => void;
  onOpenContact: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAuthPortal,
  onOpenContact,
  theme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isAdmin = isUserAdmin(currentUser);
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
              handleLinkClick('#home');
            }}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#710193] rounded-lg"
            aria-label="BluePeak Home"
          >
            <Logo variant={!isScrolled ? 'light' : 'auto'} showTagline={false} />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/70 dark:bg-[#16111D]/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#F3EAF7] dark:border-[#2E2338] shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-3.5 py-1.5 text-sm font-medium text-[#706778] dark:text-[#A69CB0] hover:text-[#710193] dark:hover:text-white transition-colors rounded-full hover:bg-[#F3EAF7]/60 dark:hover:bg-[#251A30]"
              >
                {link.label}
              </a>
            ))}
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

            {/* Auth / Client Portal button */}
            <button
              onClick={onOpenAuthPortal}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-full border transition-all ${
                currentUser
                  ? 'bg-[#F3EAF7] dark:bg-[#291636] text-[#710193] dark:text-[#E2A6F7] border-[#710193]/30 dark:border-[#710193]/50 hover:bg-[#710193] hover:text-white'
                  : 'bg-white dark:bg-[#16111D] text-[#706778] dark:text-[#A69CB0] border-gray-200 dark:border-[#2E2338] hover:border-[#710193] dark:hover:border-[#9E24C7] hover:text-[#710193] dark:hover:text-white'
              }`}
              title={currentUser ? `Signed in as ${currentUser.email}` : 'Client & Admin Portal'}
            >
              {currentUser?.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : isAdmin ? (
                <ShieldCheck className="w-4 h-4 text-[#710193] dark:text-[#C553ED]" />
              ) : (
                <User className="w-4 h-4 text-[#706778] dark:text-[#A69CB0]" />
              )}
              <span>
                {currentUser
                  ? isAdmin
                    ? 'Admin Portal'
                    : 'My Inquiries'
                  : 'Client Portal'}
              </span>
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
              onClick={onOpenAuthPortal}
              className="p-2 text-xs font-semibold text-[#710193] dark:text-[#C553ED] bg-[#F3EAF7] dark:bg-[#251633] rounded-full"
              aria-label="User Portal"
            >
              <User className="w-4 h-4" />
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-[#120E18] border-b border-[#F3EAF7] dark:border-[#261D2E] shadow-xl px-5 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1 mb-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-4 py-2.5 text-base font-medium text-[#1D1722] dark:text-white hover:text-[#710193] dark:hover:text-[#C553ED] hover:bg-[#F3EAF7] dark:hover:bg-[#20172B] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5 pt-3 border-t border-gray-100 dark:border-[#261D2E]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthPortal();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-[#710193] dark:text-[#E2A6F7] bg-[#F3EAF7] dark:bg-[#251633] rounded-xl hover:bg-[#710193] hover:text-white transition-colors"
            >
              <User className="w-4 h-4" />
              <span>
                {currentUser
                  ? isAdmin
                    ? 'Admin Portal'
                    : 'My Inquiries'
                  : 'Client / Admin Portal'}
              </span>
            </button>

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
        </div>
      )}
    </header>
  );
};
