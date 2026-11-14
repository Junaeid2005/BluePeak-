import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio, type FeaturedClientProject } from './components/Portfolio';
import { WhyUs } from './components/WhyUs';
import { Process } from './components/Process';
import { CtaSection } from './components/CtaSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { ProjectDetailsModal } from './components/ProjectDetailsModal';
import { SectionBridge, scrollToSectionSmooth } from './components/SectionTransition';
import { testFirestoreConnection } from './lib/firebase';

export default function App() {
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [selectedProject, setSelectedProject] = useState<FeaturedClientProject | null>(null);
  const [contactInitialService, setContactInitialService] = useState<string>('Website Development');

  // Theme state: 'light' (white theme) or 'dark' (black theme)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bluepeak_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    // Sync class on <html>
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('bluepeak_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('bluepeak_theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    // Check connection to Firestore on boot as mandated by Firebase skill
    testFirestoreConnection();
  }, []);

  const scrollToContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      setContactInitialService(serviceTitle);
    }
    scrollToSectionSmooth('contact');
  };

  const scrollToServices = () => {
    scrollToSectionSmooth('services');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FAF8FC] dark:bg-[#0C0910] text-[#1D1722] dark:text-[#FAF8FC] transition-colors duration-300">
        {/* Navigation Bar with Theme Switcher & Scroll Progress */}
        <Navbar
          onOpenContact={() => scrollToContact()}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main Page Sections with Fluid Architectural Section Bridges */}
        <main className="flex-1">
          {/* A. Hero Section */}
          <Hero
            onExploreServices={scrollToServices}
            onWorkTogether={() => scrollToContact()}
          />

          <SectionBridge variant="hero-to-about" />

          {/* B. About Section */}
          <About />

          <SectionBridge variant="seam-light-to-tint" />

          {/* C. Services Section */}
          <Services
            onSelectService={(serviceTitle) => scrollToContact(serviceTitle)}
          />

          <SectionBridge variant="seam-tint-to-light" />

          {/* D. Portfolio Showcase (Featured Project: Rashoi Restaurant) */}
          <Portfolio
            onExploreProject={(project) => setSelectedProject(project)}
          />

          <SectionBridge variant="seam-light-to-tint" />

          {/* E. Why Choose BluePeak */}
          <WhyUs />

          <SectionBridge variant="seam-tint-to-light" />

          {/* F. Working Process */}
          <Process />

          <SectionBridge variant="seam-to-cta" />

          {/* G. Call To Action Banner */}
          <CtaSection onStartProject={() => scrollToContact()} />

          <SectionBridge variant="cta-to-contact" />

          {/* H. Contact Section with Firestore & Server Email Delivery */}
          <Contact initialService={contactInitialService} />
        </main>

        {/* Footer */}
        <Footer
          onOpenPrivacy={() => setLegalModalType('privacy')}
          onOpenTerms={() => setLegalModalType('terms')}
          onSelectService={(serviceTitle) => scrollToContact(serviceTitle)}
        />

        {/* Featured Project Details Modal */}
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onStartProject={() => {
            setSelectedProject(null);
            setTimeout(() => scrollToContact('Website Development'), 180);
          }}
        />

        {/* Privacy Policy / Terms Modal */}
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      </div>
    </MotionConfig>
  );
}
