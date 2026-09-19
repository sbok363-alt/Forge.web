import React from 'react';

interface ForgeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ForgeLogo: React.FC<ForgeLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  onClick,
}) => {
  const iconSize =
    size === 'sm'
      ? 'w-5 h-4'
      : size === 'lg'
      ? 'w-8 h-6'
      : size === 'hero'
      ? 'w-10 h-8'
      : 'w-6 h-5';

  const textSize =
    size === 'sm'
      ? 'text-base font-extrabold tracking-wider'
      : size === 'lg'
      ? 'text-2xl font-black tracking-widest'
      : size === 'hero'
      ? 'text-3xl sm:text-4xl font-black tracking-[0.2em]'
      : 'text-lg font-extrabold tracking-wider';

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      id="forge-logo-wrapper"
    >
      <div className="flex items-center gap-2.5">
        {/* Athletic stepped anvil / progressive energy emblem */}
        <svg
          className={`${iconSize} shrink-0 text-[#FF7A32]`}
          viewBox="0 0 32 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top angled bar */}
          <path
            d="M8 2H28L24 7H4L8 2Z"
            fill="url(#forge-grad-1)"
          />
          {/* Middle angled bar */}
          <path
            d="M6 9.5H22L18.5 14.5H2.5L6 9.5Z"
            fill="url(#forge-grad-2)"
          />
          {/* Bottom base anvil bar */}
          <path
            d="M4 17H16L13 22H1L4 17Z"
            fill="url(#forge-grad-3)"
          />
          <defs>
            <linearGradient id="forge-grad-1" x1="4" y1="2" x2="28" y2="7" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF9457" />
              <stop offset="1" stopColor="#FF7A32" />
            </linearGradient>
            <linearGradient id="forge-grad-2" x1="2.5" y1="9.5" x2="22" y2="14.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7A32" />
              <stop offset="1" stopColor="#FF5A12" />
            </linearGradient>
            <linearGradient id="forge-grad-3" x1="1" y1="17" x2="16" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF6A1C" />
              <stop offset="1" stopColor="#D94B05" />
            </linearGradient>
          </defs>
        </svg>

        <span className={`${textSize} text-[#F5F5F5] uppercase leading-none font-sans`}>
          FORGE
        </span>
      </div>

      {showTagline && (
        <span className="mt-1 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#A3A3A3] font-medium text-center">
          Discipline today. A stronger tomorrow.
        </span>
      )}
    </div>
  );
};
