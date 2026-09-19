import React, { useEffect, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { ForgeLogo } from './ForgeLogo';
import { FORGE_APP_CONFIG } from '../config';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus primary CTA button inside modal
      setTimeout(() => {
        primaryBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }

        // Basic focus trap within modal
        if (e.key === 'Tab' && modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-200"
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signin-modal-title"
        aria-describedby="signin-modal-desc"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#0D0D10] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Restrained subtle orange ambient rim */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF7A32]/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-full text-[#8E8E93] hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <ForgeLogo size="md" showTagline={false} className="mb-3" />
          <h2 id="signin-modal-title" className="text-xl font-extrabold text-white tracking-tight">
            Sign In to FORGE
          </h2>
          <p id="signin-modal-desc" className="text-xs text-[#A3A3A3] mt-2 leading-relaxed">
            Authentication happens directly on the live FORGE application. Continue below to access your workout history and athlete profile.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <a
            ref={primaryBtnRef}
            href={FORGE_APP_CONFIG.signInUrl || '#'}
            target={FORGE_APP_CONFIG.signInUrl ? '_blank' : undefined}
            rel={FORGE_APP_CONFIG.signInUrl ? 'noopener noreferrer' : undefined}
            onClick={onClose}
            className="w-full py-3.5 rounded-full bg-[#FF7A32] hover:bg-[#FF8847] active:scale-[0.98] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FF7A32]/25 transition-colors cursor-pointer"
          >
            <span>Continue to Sign In</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] border border-white/[0.08] text-xs font-semibold text-[#A3A3A3] hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
