import React, { useState, useEffect } from 'react';
import { ForgeLogo } from '../ForgeLogo';
import { ArrowRight, Menu, X, ExternalLink } from 'lucide-react';
import { FORGE_APP_CONFIG, openForgeApp, openForgeSignIn, openForgeStartTraining } from '../../config';

interface LandingNavProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenAppLaunchModal?: () => void;
}

export const LandingNav: React.FC<LandingNavProps> = ({
  onNavigateSection,
  onOpenAppLaunchModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Product', id: 'section-product' },
    { label: 'Evidence', id: 'section-progress' },
    { label: 'Brain', id: 'section-brain' },
    { label: 'Gym Mode', id: 'section-session' },
    { label: 'System', id: 'section-system' },
  ];

  const handleStartTrainingClick = (e: React.MouseEvent) => {
    if (onOpenAppLaunchModal) {
      e.preventDefault();
      onOpenAppLaunchModal();
    } else {
      openForgeStartTraining();
    }
  };

  const handleSignInClick = (e: React.MouseEvent) => {
    openForgeSignIn();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/92 backdrop-blur-md border-b border-white/[0.08] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <ForgeLogo
          size="md"
          className="hover:opacity-90 transition-opacity cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        {/* Center desktop navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-semibold text-[#A3A3A3]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigateSection(link.id)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right action CTAs linked to real FORGE deployment */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            id="nav-signin-link"
            href={FORGE_APP_CONFIG.signInUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleSignInClick}
            className="px-4 py-2 text-xs font-semibold text-[#A3A3A3] hover:text-white transition-colors cursor-pointer"
          >
            Sign In
          </a>

          <a
            id="nav-start-training-btn"
            href={FORGE_APP_CONFIG.startTrainingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleStartTrainingClick}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF7A32] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#FF8847] active:scale-95 shadow-md shadow-[#FF7A32]/30 transition-all cursor-pointer"
          >
            <span>Start Training</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={FORGE_APP_CONFIG.startTrainingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-[#FF7A32] text-black font-extrabold text-[11px] uppercase tracking-wider"
          >
            Start Training
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#A3A3A3] hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0A0A0C] border-b border-white/[0.1] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateSection(link.id);
                }}
                className="text-left text-sm font-semibold tracking-wider text-[#A3A3A3] hover:text-white py-1"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
            <a
              href={FORGE_APP_CONFIG.signInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-bold text-white text-center flex items-center justify-center gap-1.5"
            >
              <span>Sign In</span>
              <ExternalLink className="w-3 h-3 text-[#A3A3A3]" />
            </a>
            <a
              href={FORGE_APP_CONFIG.startTrainingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#FF7A32] text-black font-black text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-lg shadow-[#FF7A32]/25"
            >
              <span>Start Training</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
