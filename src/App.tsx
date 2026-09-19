import React, { useState } from 'react';
import { LandingNav } from './components/landing/LandingNav';
import { HeroSection } from './components/landing/HeroSection';
import { SectionA_Memory } from './components/landing/SectionA_Memory';
import { SectionB_Evidence } from './components/landing/SectionB_Evidence';
import { SectionC_Brain } from './components/landing/SectionC_Brain';
import { SectionD_Session } from './components/landing/SectionD_Session';
import { SectionE_OneSystem } from './components/landing/SectionE_OneSystem';
import { FinalCTA } from './components/landing/FinalCTA';
import { LandingFooter } from './components/landing/LandingFooter';
import { SignInModal } from './components/SignInModal';
import { FORGE_APP_CONFIG, openForgeStartTraining, openForgeApp } from './config';

export default function App() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  // Smooth scroll handler for landing page anchors
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-[#FF7A32] selection:text-black">
      {/* Top Floating Navigation */}
      <LandingNav
        onOpenAppLaunchModal={() => openForgeStartTraining()}
        onNavigateSection={handleScrollToSection}
      />

      {/* Hero Section with Live Interactive Showcase */}
      <HeroSection
        onStartTraining={() => openForgeStartTraining()}
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
      <SectionE_OneSystem onLaunchTab={(tab) => openForgeApp(tab)} />

      {/* Final Cinematic Call to Action */}
      <FinalCTA
        onStartTraining={() => openForgeStartTraining()}
        onSignIn={() => setIsSignInOpen(true)}
      />

      {/* Minimal Premium Footer */}
      <LandingFooter
        onNavigateSection={handleScrollToSection}
        onOpenApp={() => openForgeApp()}
      />

      {/* Sign In / Athlete Modal linking to actual FORGE app deployment */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </div>
  );
}
