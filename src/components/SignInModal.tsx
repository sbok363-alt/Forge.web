import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck } from 'lucide-react';
import { ForgeLogo } from './ForgeLogo';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState('athlete@forge.fit');
  const [password, setPassword] = useState('••••••••••••');

  if (!isOpen) return null;

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
            Access your encrypted training evidence and Forge Brain memory.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSuccess();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1.5">
              Athlete Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/[0.1] text-xs text-white placeholder-[#686868] focus:border-[#FF7A32] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3] mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/[0.1] text-xs text-white placeholder-[#686868] focus:border-[#FF7A32] outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#FF7A32] hover:bg-[#FF8847] active:scale-98 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FF7A32]/30 transition-all cursor-pointer mt-2"
          >
            <span>Sign In to FORGE</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onSuccess}
            className="w-full py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white/90 transition-colors cursor-pointer"
          >
            Continue as Guest Athlete
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-center gap-2 text-[10px] text-[#686868]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF7A32]" />
          <span>Local-first encrypted session storage</span>
        </div>
      </div>
    </div>
  );
};
