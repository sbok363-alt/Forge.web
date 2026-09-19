import React from 'react';
import { Home, Dumbbell, Brain, BarChart2, User } from 'lucide-react';
import { AppTab } from '../types';

interface LiquidNavProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  className?: string;
}

export const LiquidNav: React.FC<LiquidNavProps> = ({
  activeTab,
  onTabChange,
  className = '',
}) => {
  const tabs: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'workouts',
      label: 'Workouts',
      icon: <Dumbbell className="w-5 h-5" />,
    },
    {
      id: 'brain',
      label: 'Brain',
      icon: <Brain className="w-5 h-5" />,
    },
    {
      id: 'stats',
      label: 'Stats',
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <nav
      className={`relative z-20 w-full bg-[#080809]/95 backdrop-blur-md border-t border-white/[0.08] px-3 py-2 flex items-center justify-around shrink-0 ${className}`}
      id="forge-app-liquid-nav"
      aria-label="App Navigation"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            id={`nav-tab-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex flex-col items-center justify-center py-1 px-3 transition-all duration-200 outline-none group cursor-pointer`}
          >
            {/* Active glowing liquid orange pill indicator */}
            {isActive ? (
              <div className="relative flex flex-col items-center">
                {/* Radiant halo background glow */}
                <div className="absolute -inset-1.5 bg-[#FF7A32]/40 rounded-full blur-sm pointer-events-none" />

                {/* Orange liquid pill */}
                <div className="relative z-10 w-9 h-7 rounded-full bg-[#FF7A32] flex items-center justify-center text-black shadow-lg shadow-[#FF7A32]/50">
                  {tab.icon}
                </div>

                <span className="mt-1 text-[10px] font-semibold text-[#FF7A32] tracking-tight">
                  {tab.label}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="w-9 h-7 flex items-center justify-center text-[#A3A3A3] group-hover:text-white transition-colors">
                  {tab.icon}
                </div>
                <span className="mt-1 text-[10px] font-medium text-[#8E8E93] group-hover:text-white transition-colors">
                  {tab.label}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </nav>
  );
};
