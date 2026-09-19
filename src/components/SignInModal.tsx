import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, ExternalLink, Smartphone } from 'lucide-react';
import { ForgeLogo } from './ForgeLogo';
import { FORGE_APP_CONFIG, openForgeSignIn, openForgeApp } from '../config';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openForgeSignIn();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#0D0D10] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF7A32]/15 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#8E8E93] hover:text-white hover:bg-white/[0.05] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <ForgeLogo size="md" showTagline={false} className="mb-3" />
          <h3 className="text-xl font-black text-white tracking-tight">Athlete Sign In</h3>
          <p className="text-xs text-[#8E8E93] mt-1">
            Connect to the secure FORGE production app deployment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1.5">
              Athlete Email / Username
            </label>
            <input
              type="email"
              placeholder="athlete@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/[0.1] text-xs text-white placeholder-[#686868] focus:border-[#FF7A32] outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#FF7A32] hover:bg-[#FF8847] active:scale-98 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FF7A32]/30 transition-all cursor-pointer mt-2"
          >
            <span>Proceed to App Deployment</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <a
            href={FORGE_APP_CONFIG.signInUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white/90 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Direct Portal Sign In ({FORGE_APP_CONFIG.appUrl})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </form>

        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-[#686868]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A32]" />
            <span>End-to-end encrypted</span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#A3A3A3]">
            {FORGE_APP_CONFIG.status} • {FORGE_APP_CONFIG.appVersion}
          </span>
        </div>
      </div>
    </div>
  );
};
