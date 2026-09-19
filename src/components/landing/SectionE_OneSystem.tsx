import React, { useState } from 'react';
import { Home, Dumbbell, Brain, BarChart2, User, ExternalLink } from 'lucide-react';
import { AppTab } from '../../types';
import { FORGE_APP_CONFIG } from '../../config';
import { PhoneFrame } from '../PhoneFrame';
import { HomeScreen } from '../screens/HomeScreen';
import { WorkoutsScreen } from '../screens/WorkoutsScreen';
import { BrainScreen } from '../screens/BrainScreen';
import { StatsScreen } from '../screens/StatsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { motion, AnimatePresence } from 'motion/react';

interface SectionE_OneSystemProps {
  onLaunchTab?: (tab: AppTab) => void;
}

export const SectionE_OneSystem: React.FC<SectionE_OneSystemProps> = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');

  const destinations: {
    id: AppTab;
    label: string;
    icon: React.ReactNode;
    headline: string;
    description: string;
    highlights: string[];
  }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-4 h-4" />,
      headline: 'Daily Orientation & Active Plan',
      description: 'Instant overview of today’s scheduled session, your current training streak, and key overload cues.',
      highlights: [
        'Single-tap workout launch for today’s session',
        'Consistency tracker and weekly adherence overview',
        'Direct highlights from your previous performance',
      ],
    },
    {
      id: 'workouts',
      label: 'Workouts',
      icon: <Dumbbell className="w-4 h-4" />,
      headline: 'Routines & Exercise Database',
      description: 'Structured training splits, customizable templates, and an indexed exercise library with history.',
      highlights: [
        'Custom workout split templates with target sets',
        'Searchable exercise library with targeted muscles',
        'Complete chronological training archive',
      ],
    },
    {
      id: 'brain',
      label: 'Brain',
      icon: <Brain className="w-4 h-4" />,
      headline: 'Training Intelligence',
      description: 'Analyzes your logged sets to detect overload opportunities and suggest grounded adjustments.',
      highlights: [
        'Progressive overload verification across compound lifts',
        'Fatigue diagnostic proposals requiring your confirmation',
        'Natural training dialogue grounded in your personal logs',
      ],
    },
    {
      id: 'stats',
      label: 'Stats',
      icon: <BarChart2 className="w-4 h-4" />,
      headline: 'Volume & Strength Trends',
      description: 'Empirical proof of progress across time: tonnage trajectories, personal records, and set counts.',
      highlights: [
        'Mesocycle volume progression (1W, 1M, 3M, 1Y)',
        'Estimated 1RM trajectories and logged PR count',
        'Muscle group distribution across training blocks',
      ],
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-4 h-4" />,
      headline: 'Athlete Settings & Data Export',
      description: 'Full control over your training records with unit toggles, gym equipment settings, and JSON export.',
      highlights: [
        'Instant kg and lbs unit toggling',
        'One-click JSON export of your complete training logs',
        'Custom equipment and gym configuration',
      ],
    },
  ];

  const current = destinations.find((d) => d.id === activeTab) || destinations[0];

  return (
    <section id="section-system" className="py-20 sm:py-28 bg-[#080809] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A32]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A3A3A3]">
              Unified Architecture
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.08] mb-4">
            One{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A32] to-[#FF9457]">
              System.
            </span>
          </h2>

          <p className="text-base text-[#A3A3A3] leading-relaxed">
            Five core areas designed as a single continuous feedback loop. Logging a session automatically updates your volume stats, informs Brain recommendations, and prepares your next workout.
          </p>
        </div>

        {/* Destination Selector Tabs */}
        <div
          role="tablist"
          aria-label="System destinations"
          className="flex items-center justify-center gap-1.5 sm:gap-2 mb-10 overflow-x-auto p-1.5 bg-[#0C0C0F] border border-white/[0.07] rounded-2xl max-w-2xl mx-auto"
        >
          {destinations.map((d) => {
            const isSelected = activeTab === d.id;
            return (
              <button
                key={d.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(d.id)}
                className={`relative px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors duration-200 cursor-pointer whitespace-nowrap z-10 ${
                  isSelected ? 'text-black font-extrabold' : 'text-[#8E8E93] hover:text-white'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="onesystem-tab-active"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-[#FF7A32] rounded-xl shadow-md shadow-[#FF7A32]/25 -z-10"
                  />
                )}
                {d.icon}
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>

        {/* Focused 2-Column Presentation: Text Information + Large Stationary Phone Preview */}
        <div className="bg-[#0D0D10] border border-white/[0.08] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Description */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#FF7A32] font-semibold">
                  {current.label} Overview
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                  {current.headline}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-2.5 pt-2">
                {current.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A32] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3">
                <a
                  href={`${FORGE_APP_CONFIG.appUrl}/${current.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF7A32] hover:bg-[#FF8847] text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md shadow-[#FF7A32]/20 cursor-pointer"
                >
                  <span>Open in FORGE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Phone Frame Preview */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[320px] xs:max-w-[340px]">
                <PhoneFrame glow={true} className="shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
                  <div className="relative w-full h-[520px] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full overflow-y-auto scrollbar-none"
                      >
                        {activeTab === 'home' && <HomeScreen onStartWorkout={() => {}} />}
                        {activeTab === 'workouts' && <WorkoutsScreen onStartWorkout={() => {}} />}
                        {activeTab === 'brain' && <BrainScreen />}
                        {activeTab === 'stats' && <StatsScreen />}
                        {activeTab === 'profile' && <ProfileScreen onSignOut={() => {}} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
