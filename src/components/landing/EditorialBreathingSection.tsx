import React from 'react';

export const EditorialBreathingSection: React.FC = () => {
  return (
    <section className="py-[76px] sm:py-36 bg-[#050505] relative overflow-hidden border-t border-white/[0.05]">
      {/* Restrained subtle dark gradient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#FF7A32]/6 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Subtle label */}
        <div className="inline-flex items-center gap-2 mb-6 sm:mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A32]" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#686868]">
            The Forge Philosophy
          </span>
        </div>

        {/* Large high-impact typographic manifesto */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#737373] uppercase tracking-tight leading-[1.12]">
            No arbitrary scores.
          </p>
          <p className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#A3A3A3] uppercase tracking-tight leading-[1.12]">
            No disconnected logs.
          </p>
          <p className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.12]">
            Just training you can{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9457] via-[#FF7A32] to-[#FF5500]">
              understand.
            </span>
          </p>
        </div>

        {/* Restrained single sentence */}
        <p className="mt-6 sm:mt-10 max-w-xl mx-auto text-sm sm:text-base text-[#8E8E93] leading-relaxed font-normal">
          Real adaptation isn&apos;t produced by gamified badges or black-box algorithms. It is forged across documented volume, verifiable overload, and disciplined execution.
        </p>

        {/* Quiet divider */}
        <div className="mt-8 sm:mt-12 flex justify-center">
          <div className="w-12 h-[1px] bg-white/[0.12]" />
        </div>
      </div>
    </section>
  );
};
