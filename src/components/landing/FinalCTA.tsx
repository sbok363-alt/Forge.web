import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ForgeLogo } from '../ForgeLogo';
import { FORGE_APP_CONFIG } from '../../config';

interface FinalCTAProps {
  onStartTraining?: () => void;
  onSignIn?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onSignIn,
}) => {
  return (
    <section className="py-16 sm:py-28 bg-[#050505] relative overflow-hidden text-center border-t border-white/[0.06]">
      {/* Restrained Forge Orange Glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[650px] h-[300px] sm:h-[400px] bg-[#FF7A32]/12 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        {/* Emblem */}
        <div className="mb-4 sm:mb-6">
          <ForgeLogo size="lg" showTagline={true} />
        </div>

        {/* Master Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.06] mb-4 sm:mb-6">
          Your Next Session
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9457] via-[#FF7A32] to-[#FF5500]">
            Starts Here.
          </span>
        </h2>

        {/* Subtext */}
        <p className="max-w-xl text-sm sm:text-lg text-[#A3A3A3] mb-6 sm:mb-10 leading-relaxed font-normal px-2">
          Turn your training into something you can measure, understand, and improve. Every set logged today establishes the baseline for progressive overload tomorrow.
        </p>

        {/* CTAs (Clean semantic links without duplicate window.open triggers) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full justify-center max-w-md">
          <a
            href={FORGE_APP_CONFIG.startTrainingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#FF7A32] hover:bg-[#FF8847] active:scale-95 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-[#FF7A32]/25 transition-colors cursor-pointer"
          >
            <span>Start Training</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </a>

          <a
            href={FORGE_APP_CONFIG.signInUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (onSignIn) {
                e.preventDefault();
                onSignIn();
              }
            }}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 border border-white/[0.12] text-white font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Sign In to FORGE</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8E8E93]" />
          </a>
        </div>

        {/* Micro detail badge */}
        <div className="mt-12 flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.25em] text-[#686868]">
          <span>DATA</span>
          <span>•</span>
          <span>INSIGHTS</span>
          <span>•</span>
          <span>PROGRESS</span>
          <span>•</span>
          <span className="text-[#A3A3A3]">RESULTS</span>
        </div>
      </div>
    </section>
  );
};
