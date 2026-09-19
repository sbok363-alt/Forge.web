import React, { useState, useEffect } from 'react';
import { ForgeLogo } from '../ForgeLogo';
import { Smartphone, ArrowRight, Menu, X } from 'lucide-react';

interface LandingNavProps {
  onOpenApp: () => void;
  onSignIn?: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const LandingNav: React.FC<LandingNavProps> = ({
  onOpenApp,
  onSignIn,
  onNavigateSection,
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
    { label: 'Brain', id: 'section-brain' },
    { label: 'Progress', id: 'section-progress' },
    { label: 'Workouts', id: 'section-session' },
    { label: 'System', id: 'section-system' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/[0.08] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <ForgeLogo
          size="md"
          className="hover:opacity-90 transition-opacity"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        {/* Center / Right desktop links */}
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

        {/* Right action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onSignIn}
            className="px-4 py-2 text-xs font-semibold text-[#A3A3A3] hover:text-white transition-colors cursor-pointer"
          >
            Sign In
          </button>

          <button
            id="nav-start-training-btn"
            onClick={onOpenApp}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF7A32] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#FF8847] active:scale-95 shadow-md shadow-[#FF7A32]/30 transition-all cursor-pointer"
          >
            <span>Start Training</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenApp}
            className="px-3 py-1.5 rounded-full bg-[#FF7A32] text-black font-bold text-xs"
          >
            Launch
          </button>
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
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onSignIn?.();
              }}
              className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-bold text-white text-center"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApp();
              }}
              className="w-full py-2.5 rounded-xl bg-[#FF7A32] text-black font-black text-xs uppercase tracking-wider text-center"
            >
              Start Training
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
