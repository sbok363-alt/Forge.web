import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  activeScreenName?: string;
  showStatusBar?: boolean;
  scale?: number;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  children,
  className = '',
  glow = true,
  showStatusBar = true,
}) => {
  return (
    <div
      className={`relative mx-auto w-full max-w-[360px] sm:max-w-[380px] rounded-[48px] p-[10px] bg-[#0c0c0d] border border-white/12 shadow-2xl transition-all duration-300 ${
        glow ? 'forge-glow-orange' : ''
      } ${className}`}
      style={{
        boxShadow: glow
          ? '0 25px 60px -15px rgba(0,0,0,0.9), 0 0 50px -10px rgba(255, 122, 50, 0.28)'
          : '0 25px 60px -15px rgba(0,0,0,0.9)',
      }}
    >
      {/* Outer rim metal highlight */}
      <div className="absolute inset-0 rounded-[48px] pointer-events-none border border-white/[0.07]" />

      {/* Screen container */}
      <div className="relative w-full h-[720px] bg-[#050505] rounded-[38px] overflow-hidden flex flex-col text-[#F5F5F5] select-none border border-black/80">
        {/* Status Bar */}
        {showStatusBar && (
          <div className="relative z-30 flex items-center justify-between px-6 pt-3 pb-1 text-xs text-[#F5F5F5] shrink-0 font-medium">
            <span className="font-semibold text-[13px] tracking-tight text-white/90">9:41</span>

            {/* Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-24 h-5 bg-black rounded-full border border-white/10 flex items-center justify-end px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#141416] border border-white/10 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#050505]" />
              </div>
            </div>

            {/* Signal & Battery */}
            <div className="flex items-center gap-1.5 text-white/80">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 17h3v4H2v-4zm6-5h3v9H8v-9zm6-4h3v13h-3V8zm6-5h3v18h-3V3z" />
              </svg>
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Screen Content */}
        <div className="relative flex-1 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-none">
          {children}
        </div>

        {/* Bottom Home Indicator */}
        <div className="relative z-30 w-full pt-1.5 pb-2 flex justify-center bg-[#050505]/95 backdrop-blur-xs shrink-0">
          <div className="w-32 h-1 bg-white/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};
