import React, { useState, useEffect } from 'react';
import { LandingNav } from './components/landing/LandingNav';
import { HeroSection } from './components/landing/HeroSection';
import { SectionA_Memory } from './components/landing/SectionA_Memory';
import { SectionB_Evidence } from './components/landing/SectionB_Evidence';
import { SectionC_Brain } from './components/landing/SectionC_Brain';
import { SectionD_Session } from './components/landing/SectionD_Session';
import { SectionE_OneSystem } from './components/landing/SectionE_OneSystem';
import { FinalCTA } from './components/landing/FinalCTA';
import { LandingFooter } from './components/landing/LandingFooter';
import { AppShell } from './components/AppShell';
import { SignInModal } from './components/SignInModal';
import { AppTab } from './types';

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [targetAppTab, setTargetAppTab] = useState<AppTab>('home');
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  // Smooth scroll handler for landing page anchors
  const handleScrollToSection = (sectionId: string) => {
    if (viewMode !== 'landing') {
      setViewMode('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLaunchApp = (tab: AppTab = 'home') => {
    setTargetAppTab(tab);
    setViewMode('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'app') {
    return (
      <AppShell
        initialTab={targetAppTab}
        onExitToLanding={() => {
          setViewMode('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-[#FF7A32] selection:text-black">
      {/* Top Floating Navigation */}
      <LandingNav
        onOpenApp={() => handleLaunchApp('home')}
        onSignIn={() => setIsSignInOpen(true)}
        onNavigateSection={handleScrollToSection}
      />

      {/* Hero Section */}
      <HeroSection
        onStartTraining={() => handleLaunchApp('home')}
        onExploreClick={() => handleScrollToSection('section-product')}
      />

      {/* Product Story: Section A - Training Memory & Active Logger */}
      <SectionA_Memory />

      {/* Product Story: Section B - Progress You Can Prove (Stats & Charts) */}
      <SectionB_Evidence />

      {/* Product Story: Section C - Forge Brain Intelligence & Evidence Pipeline */}
      <SectionC_Brain />

      {/* Product Story: Section D - Built for the Session (Tactile Controls) */}
      <SectionD_Session />

      {/* Product Story: Section E - One System (Home, Workouts, Brain, Stats, Profile) */}
      <SectionE_OneSystem onLaunchTab={(tab) => handleLaunchApp(tab)} />

      {/* Final Cinematic Call to Action */}
      <FinalCTA
        onStartTraining={() => handleLaunchApp('home')}
        onSignIn={() => setIsSignInOpen(true)}
      />

      {/* Minimal Premium Footer */}
      <LandingFooter
        onNavigateSection={handleScrollToSection}
        onOpenApp={() => handleLaunchApp('home')}
      />

      {/* Sign In / Athlete Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSuccess={() => {
          setIsSignInOpen(false);
          handleLaunchApp('home');
        }}
      />
    </div>
  );
}
