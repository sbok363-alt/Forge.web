import React, { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { PhoneFrame } from '../PhoneFrame';
import { HomeScreen } from '../screens/HomeScreen';
import { WorkoutsScreen } from '../screens/WorkoutsScreen';
import { StatsScreen } from '../screens/StatsScreen';
import { BrainScreen } from '../screens/BrainScreen';
import { ActiveWorkoutScreen } from '../screens/ActiveWorkoutScreen';
import { LiquidNav } from '../LiquidNav';
import { AppTab } from '../../types';
import { FORGE_APP_CONFIG } from '../../config';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  onStartTraining?: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
}) => {
  const [centerTab, setCenterTab] = useState<AppTab>('home');
  const [showActiveSession, setShowActiveSession] = useState(false);

  const screens = [
    { id: 'home', label: 'Home' },
    { id: 'workouts', label: 'Workouts' },
    { id: 'active', label: 'Active Session' },
    { id: 'brain', label: 'Brain' },
    { id: 'stats', label: 'Stats' },
  ];

  const currentActiveId = showActiveSession ? 'active' : centerTab;

  return (
    <section className="relative min-h-screen pt-20 sm:pt-28 pb-10 sm:pb-16 overflow-hidden bg-[#050505] flex flex-col justify-between">
      {/* Background Atmosphere: Restrained Orange Radial Glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[450px] sm:h-[550px] radial-forge-glow opacity-60 blur-3xl" />

        {/* Subtle curved energy line traveling across dark space */}
        <svg
          className="absolute top-1/4 left-0 w-full h-[600px] opacity-20 pointer-events-none"
          viewBox="0 0 1440 600"
          fill="none"
        >
          <path
            d="M-100 450 C 350 150, 700 500, 1100 220 C 1300 80, 1500 250, 1600 300"
            stroke="url(#hero-energy-grad)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <defs>
            <linearGradient id="hero-energy-grad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF7A32" stopOpacity="0" />
              <stop offset="30%" stopColor="#FF7A32" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#FF9457" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF7A32" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Faint subtle grid texture */}
        <div className="absolute inset-0 grain-overlay opacity-30" />
      </div>

      {/* Vertical Side Accents */}
      <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 flex-col items-start gap-3 pointer-events-none select-none text-[10px] font-bold tracking-[0.3em] uppercase text-[#686868]">
        <span className="w-4 h-[1px] bg-[#FF7A32]/60" />
        <span className="writing-vertical-lr rotate-180">BUILT</span>
        <span className="writing-vertical-lr rotate-180">FOR A</span>
        <span className="writing-vertical-lr rotate-180 text-[#A3A3A3]">STRONGER</span>
        <span className="writing-vertical-lr rotate-180 text-white">YOU</span>
      </div>

      <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 flex-col items-end gap-3 pointer-events-none select-none text-[10px] font-bold tracking-[0.3em] uppercase text-[#686868]">
        <span className="w-4 h-[1px] bg-[#FF7A32]/60" />
        <span className="writing-vertical-lr rotate-180 text-white">TRAIN</span>
        <span className="writing-vertical-lr rotate-180 text-[#A3A3A3]">TRACK</span>
        <span className="writing-vertical-lr rotate-180">IMPROVE</span>
        <span className="writing-vertical-lr rotate-180">REPEAT</span>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        {/* Pill Tagline */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-3.5 sm:mb-6 backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A32]" />
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-[#A3A3A3]">
            Discipline Today. A Stronger Tomorrow.
          </span>
        </div>

        {/* Master Headline */}
        <h1 className="text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-7xl font-extrabold text-white -tracking-[0.02em] uppercase max-w-4xl mb-3.5 sm:mb-6">
          Train with <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F5F5] to-neutral-400">evidence.</span>
          <br />
          Progress with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9457] via-[#FF7A32] to-[#FF5500]">intent.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="max-w-2xl text-xs sm:text-base lg:text-lg text-[#A3A3A3] font-normal leading-relaxed mb-4 sm:mb-7 px-2">
          Every set becomes evidence. FORGE connects workout logging, progressive overload, and training intelligence into one system built for serious lifters.
        </p>

        {/* Primary Action Buttons (pure semantic links, no duplicate window.open calls) */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 mb-5 sm:mb-8 w-full sm:w-auto px-2 sm:px-0">
          <a
            id="hero-primary-cta"
            href={FORGE_APP_CONFIG.startTrainingUrl || '#'}
            target={FORGE_APP_CONFIG.startTrainingUrl ? '_blank' : undefined}
            rel={FORGE_APP_CONFIG.startTrainingUrl ? 'noopener noreferrer' : undefined}
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#FF7A32] hover:bg-[#FF8847] active:scale-95 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 sm:gap-2.5 shadow-xl shadow-[#FF7A32]/25 transition-colors cursor-pointer"
          >
            <span>Start Training</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </a>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 border border-white/[0.12] text-white font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span>Explore The System</span>
            <ChevronRight className="w-4 h-4 text-[#A3A3A3]" />
          </button>
        </div>

        {/* Segmented Screen Remote Switcher - quiet, restrained, accessible */}
        <div
          role="tablist"
          aria-label="Product screens"
          className="flex items-center gap-1 p-1 bg-[#0A0A0C] border border-white/[0.08] rounded-2xl mb-4 sm:mb-6 overflow-x-auto max-w-full relative shadow-inner"
        >
          {screens.map((item) => {
            const isSelected = item.id === currentActiveId;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  if (item.id === 'active') {
                    setShowActiveSession(true);
                  } else {
                    setShowActiveSession(false);
                    setCenterTab(item.id as AppTab);
                  }
                }}
                className={`relative px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-xl cursor-pointer whitespace-nowrap transition-colors duration-200 z-10 ${
                  isSelected ? 'text-black font-bold' : 'text-[#8E8E93] hover:text-white'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="hero-segmented-active"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-[#FF7A32] rounded-xl shadow-md shadow-[#FF7A32]/30 -z-10"
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Multi-Device Physical Perspective Showcase */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center pt-2 sm:pt-4 pb-4">
          {/* Subtle radiant orange rim aura behind the hardware */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[560px] h-[350px] sm:h-[420px] rounded-full bg-[#FF7A32]/14 blur-[80px] pointer-events-none" />

          {/* Left Device: WORKOUTS (Visible on lg screens) */}
          <div className="hidden lg:block absolute -left-12 top-10 transform -rotate-y-12 -rotate-6 scale-90 opacity-45 hover:opacity-75 transition-opacity duration-300 z-10 pointer-events-none">
            <div className="w-[320px] pointer-events-none select-none">
              <PhoneFrame glow={false} className="shadow-2xl">
                <WorkoutsScreen onStartWorkout={() => setShowActiveSession(true)} />
                <LiquidNav activeTab="workouts" onTabChange={() => {}} />
              </PhoneFrame>
            </div>
          </div>

          {/* Center Device: MAIN HERO SCREEN (Stationary physical hardware frame, smooth screen crossfade inside) */}
          <div className="relative z-20 w-full max-w-[340px] xs:max-w-[360px] sm:max-w-[380px]">
            <PhoneFrame glow={true} className="shadow-[0_25px_70px_rgba(0,0,0,0.95)]">
              <div className="relative w-full h-full min-h-[580px] flex flex-col justify-between overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentActiveId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full flex-1 flex flex-col"
                  >
                    {showActiveSession ? (
                      <ActiveWorkoutScreen
                        onBack={() => setShowActiveSession(false)}
                        onFinish={() => {
                          setShowActiveSession(false);
                          setCenterTab('stats');
                        }}
                      />
                    ) : centerTab === 'home' ? (
                      <>
                        <HomeScreen
                          onStartWorkout={() => setShowActiveSession(true)}
                          onNavigateTab={(tab) => setCenterTab(tab)}
                        />
                        <LiquidNav
                          activeTab="home"
                          onTabChange={(tab) => setCenterTab(tab)}
                        />
                      </>
                    ) : centerTab === 'workouts' ? (
                      <>
                        <WorkoutsScreen
                          onStartWorkout={() => setShowActiveSession(true)}
                          onNavigateTab={(tab) => setCenterTab(tab)}
                        />
                        <LiquidNav
                          activeTab="workouts"
                          onTabChange={(tab) => setCenterTab(tab)}
                        />
                      </>
                    ) : centerTab === 'brain' ? (
                      <>
                        <BrainScreen onNavigateTab={(tab) => setCenterTab(tab)} />
                        <LiquidNav
                          activeTab="brain"
                          onTabChange={(tab) => setCenterTab(tab)}
                        />
                      </>
                    ) : (
                      <>
                        <StatsScreen onNavigateTab={(tab) => setCenterTab(tab)} />
                        <LiquidNav
                          activeTab="stats"
                          onTabChange={(tab) => setCenterTab(tab)}
                        />
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </PhoneFrame>
          </div>

          {/* Right Device: STATS (Visible on lg screens) */}
          <div className="hidden lg:block absolute -right-12 top-10 transform rotate-y-12 rotate-6 scale-90 opacity-45 hover:opacity-75 transition-opacity duration-300 z-10 pointer-events-none">
            <div className="w-[320px] pointer-events-none select-none">
              <PhoneFrame glow={false} className="shadow-2xl">
                <StatsScreen />
                <LiquidNav activeTab="stats" onTabChange={() => {}} />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
