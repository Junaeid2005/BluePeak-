import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Portfolio } from './components/Portfolio';
import { Process } from './components/Process';
import { CtaSection } from './components/CtaSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { InquiriesModal } from './components/InquiriesModal';
import { ProjectModal } from './components/ProjectModal';
import { LegalModal } from './components/LegalModal';
import {
  auth,
  onAuthStateChanged,
  testFirestoreConnection,
} from './lib/firebase';
import type { User } from 'firebase/auth';
import type { ProjectItem } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authPortalOpen, setAuthPortalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [contactInitialService, setContactInitialService] = useState<string>('Website Development');

  useEffect(() => {
    // 1. Check connection to Firestore on boot as mandated by Firebase skill
    testFirestoreConnection();

    // 2. Track authentication status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const scrollToContact = (serviceTitle?: string) => {
    if (serviceTitle) {
      setContactInitialService(serviceTitle);
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FC] text-[#1D1722]">
      {/* Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        onOpenAuthPortal={() => setAuthPortalOpen(true)}
        onOpenContact={() => scrollToContact()}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* A. Hero Section */}
        <Hero
          onExploreServices={scrollToServices}
          onWorkTogether={() => scrollToContact()}
        />

        {/* B. About Section */}
        <About />

        {/* C. Services Section */}
        <Services
          onSelectService={(serviceTitle) => scrollToContact(serviceTitle)}
        />

        {/* D. Why Choose BluePeak */}
        <WhyUs />

        {/* E. Selected Projects / Portfolio */}
        <Portfolio
          onOpenProjectModal={(project) => setSelectedProject(project)}
        />

        {/* F. Working Process */}
        <Process />

        {/* G. Call To Action Banner */}
        <CtaSection onStartProject={() => scrollToContact()} />

        {/* H. Contact Section with Real Firestore Persistence */}
        <Contact
          initialService={contactInitialService}
          onInquirySubmitted={() => {
            // Can optionally prompt or open inquiries portal
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onSelectService={(serviceTitle) => scrollToContact(serviceTitle)}
      />

      {/* Client & Admin Inquiries Portal Modal (Firebase Auth & Firestore) */}
      <InquiriesModal
        isOpen={authPortalOpen}
        onClose={() => setAuthPortalOpen(false)}
        currentUser={currentUser}
      />

      {/* Case Study Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireSimilar={(category) => scrollToContact(category)}
      />

      {/* Privacy Policy / Terms Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
