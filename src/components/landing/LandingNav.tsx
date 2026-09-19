import React, { useState, useEffect, useRef } from 'react';
import { ForgeLogo } from '../ForgeLogo';
import { ArrowRight, Menu, X, ExternalLink } from 'lucide-react';
import { FORGE_APP_CONFIG } from '../../config';
import { AnimatePresence, motion } from 'motion/react';

interface LandingNavProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenAppLaunchModal?: () => void;
}

export const LandingNav: React.FC<LandingNavProps> = ({
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Escape key and outside click handling for mobile menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuTriggerRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuTriggerRef.current &&
        !menuTriggerRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Product', id: 'section-product' },
    { label: 'Evidence', id: 'section-progress' },
    { label: 'Brain', id: 'section-brain' },
    { label: 'Gym Mode', id: 'section-session' },
    { label: 'System', id: 'section-system' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#050505]/92 backdrop-blur-md border-b border-white/[0.08] py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <ForgeLogo
          size="md"
          className="hover:opacity-90 transition-opacity cursor-pointer"
          onClick={() => {
            const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
          }}
        />

        {/* Center desktop navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-semibold text-[#A3A3A3]"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigateSection(link.id)}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right action CTAs linked to real FORGE deployment (semantic anchors only, no duplicate window.open) */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            id="nav-signin-link"
            href={FORGE_APP_CONFIG.signInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold text-[#A3A3A3] hover:text-white transition-colors cursor-pointer"
          >
            Sign In
          </a>

          <a
            id="nav-start-training-btn"
            href={FORGE_APP_CONFIG.startTrainingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF7A32] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#FF8847] active:scale-95 shadow-md shadow-[#FF7A32]/25 transition-colors cursor-pointer"
          >
            <span>Start Training</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform duration-200" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={FORGE_APP_CONFIG.startTrainingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-[#FF7A32] text-black font-extrabold text-[11px] uppercase tracking-wider shadow-sm shadow-[#FF7A32]/20"
          >
            Start Training
          </a>
          <button
            ref={menuTriggerRef}
            id="mobile-nav-trigger"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 text-[#A3A3A3] hover:text-white transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Anchored Material Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Scrim overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden fixed inset-0 top-[60px] bg-black/60 backdrop-blur-xs z-40"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Anchored Material Card */}
            <motion.div
              ref={menuRef}
              id="mobile-nav-menu"
              role="region"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="sm:hidden absolute top-full right-4 left-4 mt-2 p-5 bg-[#0C0C0F]/95 backdrop-blur-xl border border-white/[0.12] rounded-2xl shadow-2xl z-50 origin-top"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateSection(link.id);
                    }}
                    className="text-left text-sm font-semibold tracking-wider text-[#A3A3A3] hover:text-white py-2 px-3 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="pt-4 mt-3 border-t border-white/[0.08] flex flex-col gap-2.5">
                <a
                  href={FORGE_APP_CONFIG.signInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl border border-white/10 text-xs font-bold text-white text-center flex items-center justify-center gap-1.5 hover:bg-white/[0.05] transition-colors"
                >
                  <span>Sign In to FORGE</span>
                  <ExternalLink className="w-3 h-3 text-[#A3A3A3]" />
                </a>
                <a
                  href={FORGE_APP_CONFIG.startTrainingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#FF7A32] hover:bg-[#FF8847] text-black font-extrabold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-md shadow-[#FF7A32]/25 transition-colors"
                >
                  <span>Start Training</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
