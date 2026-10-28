import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { EducationGrid } from './components/EducationGrid.tsx';
import { SkillsMatrix } from './components/SkillsMatrix.tsx';
import { ProjectsFeed } from './components/ProjectsFeed.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { SystemHealthBadge } from './components/SystemHealthBadge.tsx';
import { Footer } from './components/Footer.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { Three3DBackground } from './components/Three3DBackground.tsx';
import { ToastContainer, ToastMessage } from './components/Toast.tsx';

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-blue-500/30 selection:text-blue-200">
      {/* Immersive 3D WebGL Background (Floating Crystals, Lights, Wave Grid) */}
      <Three3DBackground />

      {/* Main Content (Z-indexed above 3D background) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          onContactClick={() => scrollToSection('contact')}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <main className="flex-1">
          {/* Hero Section with Adarsh's Photo & Interactive Systems Terminal */}
          <Hero
            onScrollToProjects={() => scrollToSection('projects')}
            onScrollToContact={() => scrollToSection('contact')}
            onOpenResume={() => setIsResumeOpen(true)}
          />

          {/* Academic Track & AWS Credly Badges */}
          <EducationGrid />

          {/* Technical Skills Core Matrix */}
          <SkillsMatrix />

          {/* Dynamic Portfolio Feed with Architecture Drawers */}
          <ProjectsFeed />

          {/* Live System & Database Diagnostics Bar */}
          <div className="mx-auto max-w-7xl px-6 py-6">
            <SystemHealthBadge />
          </div>

          {/* Multi-Channel Live Contact Engine */}
          <ContactSection
            onShowToast={addToast}
          />

          {/* Minimalist Editorial Footer */}
          <Footer />
        </main>
      </div>

      {/* Modals & Overlays */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Real-time Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
