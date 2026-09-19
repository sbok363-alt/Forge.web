import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  activeScreenName?: string;
  showStatusBar?: boolean;
  screenHeightClass?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  className = '',
  glow = true,
  showStatusBar = true,
  screenHeightClass = 'h-[580px] sm:h-[660px] lg:h-[700px]',
}) => {
  return (
    <div
      className={`relative mx-auto w-full max-w-[340px] xs:max-w-[360px] sm:max-w-[380px] rounded-[44px] sm:rounded-[48px] p-[7px] sm:p-[9px] bg-gradient-to-b from-[#24242A] via-[#141417] to-[#0C0C0E] border border-white/[0.14] transition-all duration-300 select-none ${className}`}
      style={{
        boxShadow: glow
          ? '0 30px 80px -15px rgba(0,0,0,0.96), 0 0 40px -10px rgba(255, 122, 50, 0.18), inset 0 1px 0 rgba(255,255,255,0.18)'
          : '0 30px 80px -15px rgba(0,0,0,0.96), 0 10px 25px -5px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)',
      }}
    >
      {/* Outer Chassis Hardware Buttons */}
      {/* Volume Up */}
      <div className="hidden sm:block absolute -left-[3px] top-24 w-[3px] h-8 rounded-l-xs bg-[#222227] border-l border-y border-white/[0.15]" />
      {/* Volume Down */}
      <div className="hidden sm:block absolute -left-[3px] top-36 w-[3px] h-8 rounded-l-xs bg-[#222227] border-l border-y border-white/[0.15]" />
      {/* Power/Lock Button */}
      <div className="hidden sm:block absolute -right-[3px] top-28 w-[3px] h-12 rounded-r-xs bg-[#222227] border-r border-y border-white/[0.15]" />

      {/* Subtle restrained orange rim light accent along the curved chamfer */}
      {glow && (
        <div className="absolute inset-0 rounded-[44px] sm:rounded-[48px] pointer-events-none ring-1 ring-[#FF7A32]/20" />
      )}

      {/* Inner chamfer precision bezel */}
      <div className="relative w-full rounded-[37px] sm:rounded-[40px] overflow-hidden bg-[#050505] border border-black/90 flex flex-col text-[#F5F5F5]">
        {/* Subtle glass reflection across top corner */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.035] pointer-events-none z-40" />

        {/* Status Bar & Dynamic Island */}
        {showStatusBar && (
          <div className="relative z-30 flex items-center justify-between px-5 sm:px-6 pt-3 pb-1 text-xs text-[#F5F5F5] shrink-0 font-medium">
            <span className="font-semibold text-[12px] sm:text-[13px] tracking-tight text-white/90 font-mono">
              9:41
            </span>

            {/* Dynamic Island Pill with hardware lens reflection */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-22 sm:w-24 h-4.5 sm:h-5 bg-black rounded-full border border-white/[0.09] flex items-center justify-between px-2.5 shadow-inner">
              {/* Mic/Sensor indicator */}
              <div className="w-1 h-1 rounded-full bg-[#111] opacity-70" />
              {/* Camera glint with deep sapphire reflection */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#0d1117] border border-white/[0.12] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#050914] ring-1 ring-blue-900/40" />
              </div>
            </div>

            {/* Signal & Battery */}
            <div className="flex items-center gap-1 sm:gap-1.5 text-white/80">
              <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 17h3v4H2v-4zm6-5h3v9H8v-9zm6-4h3v13h-3V8zm6-5h3v18h-3V3z" />
              </svg>
              <Wifi className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <Battery className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </div>
          </div>
        )}

        {/* Screen Content */}
        <div
          className={`relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-none ${screenHeightClass}`}
        >
          {children}
        </div>

        {/* Bottom Physical Home Indicator Bar */}
        <div className="relative z-30 w-full pt-1.5 pb-2 flex justify-center bg-[#050505]/95 backdrop-blur-xs shrink-0">
          <div className="w-28 sm:w-32 h-1 bg-white/25 rounded-full" />
        </div>
      </div>
    </div>
  );
};
