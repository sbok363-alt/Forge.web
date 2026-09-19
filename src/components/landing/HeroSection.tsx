import React, { useState } from 'react';
import { ArrowRight, Play, Sparkles, ChevronRight, Activity, Zap } from 'lucide-react';
import { PhoneFrame } from '../PhoneFrame';
import { HomeScreen } from '../screens/HomeScreen';
import { WorkoutsScreen } from '../screens/WorkoutsScreen';
import { StatsScreen } from '../screens/StatsScreen';
import { BrainScreen } from '../screens/BrainScreen';
import { ActiveWorkoutScreen } from '../screens/ActiveWorkoutScreen';
import { LiquidNav } from '../LiquidNav';
import { AppTab } from '../../types';

interface HeroSectionProps {
  onStartTraining: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartTraining,
  onExploreClick,
}) => {
  const [centerTab, setCenterTab] = useState<AppTab>('home');
  const [showActiveSession, setShowActiveSession] = useState(false);

  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden bg-[#050505] flex flex-col justify-between">
      {/* Background Atmosphere: Restrained Orange Radial Glow + Noise */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Core radiant orange atmospheric energy behind device mockup */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[950px] h-[550px] sm:h-[650px] radial-forge-glow-strong opacity-80 blur-2xl" />

        {/* Subtle curved energy line traveling across dark space */}
        <svg
          className="absolute top-1/4 left-0 w-full h-[600px] opacity-25 pointer-events-none"
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
              <stop offset="30%" stopColor="#FF7A32" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#FF9457" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF7A32" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Faint subtle grid texture */}
        <div className="absolute inset-0 grain-overlay opacity-35" />
      </div>

      {/* Microdetails: Left & Right Vertical Typography from Reference */}
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6 backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-[#FF7A32] animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#A3A3A3]">
            Discipline Today. A Stronger Tomorrow.
          </span>
        </div>

        {/* Master Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase max-w-4xl leading-[1.04] mb-6">
          Train with <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5F5F5] to-neutral-400">evidence.</span>
          <br />
          Progress with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9457] via-[#FF7A32] to-[#FF5500]">intent.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="max-w-2xl text-base sm:text-lg text-[#A3A3A3] font-normal leading-relaxed mb-8">
          Every set becomes evidence. FORGE turns your workout history, volume trends, and progressive overload into training decisions you can actually use.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
          <button
            id="hero-primary-cta"
            onClick={onStartTraining}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF7A32] hover:bg-[#FF8847] active:scale-95 text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-[#FF7A32]/35 transition-all cursor-pointer"
          >
            <span>Start Training</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 border border-white/[0.12] text-white font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Explore The System</span>
            <ChevronRight className="w-4 h-4 text-[#A3A3A3]" />
          </button>
        </div>

        {/* Screen Switcher Chips for live interactive showcase */}
        <div className="flex items-center gap-2 p-1.5 bg-[#0C0C0E] border border-white/[0.08] rounded-2xl mb-8 overflow-x-auto max-w-full">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#686868] px-2.5 hidden sm:inline">
            Interactive Showcase:
          </span>
          {[
            { id: 'home', label: 'Home' },
            { id: 'workouts', label: 'Workouts' },
            { id: 'active', label: 'Active Session' },
            { id: 'brain', label: 'Forge Brain' },
            { id: 'stats', label: 'Stats' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'active') {
                  setShowActiveSession(true);
                } else {
                  setShowActiveSession(false);
                  setCenterTab(item.id as AppTab);
                }
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                (item.id === 'active' && showActiveSession) ||
                (!showActiveSession && centerTab === item.id)
                  ? 'bg-[#FF7A32] text-black font-bold shadow-md shadow-[#FF7A32]/40'
                  : 'text-[#A3A3A3] hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 3D / Perspective Multi-Device Showcase */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center pt-4 pb-8">
          {/* Radiant orange aura right behind the hardware */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[650px] h-[450px] rounded-full bg-[#FF7A32]/25 blur-[90px] pointer-events-none" />

          {/* Left Device: WORKOUTS (Partially rotated in perspective, visible on lg screens) */}
          <div className="hidden lg:block absolute -left-12 top-10 transform -rotate-y-12 -rotate-6 scale-90 opacity-60 hover:opacity-90 hover:scale-95 transition-all duration-500 z-10 pointer-events-none sm:pointer-events-auto">
            <div className="w-[320px] pointer-events-none select-none">
              <PhoneFrame glow={false} className="shadow-2xl">
                <WorkoutsScreen onStartWorkout={() => setShowActiveSession(true)} />
                <LiquidNav activeTab="workouts" onTabChange={() => {}} />
              </PhoneFrame>
            </div>
          </div>

          {/* Center Device: MAIN HERO SCREEN (Large, fully interactive) */}
          <div className="relative z-20 w-full max-w-[360px] sm:max-w-[390px] transform hover:scale-[1.01] transition-transform duration-300">
            <PhoneFrame glow={true} className="shadow-[0_25px_70px_rgba(0,0,0,0.95)]">
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
            </PhoneFrame>
          </div>

          {/* Right Device: STATS (Partially rotated in perspective, visible on lg screens) */}
          <div className="hidden lg:block absolute -right-12 top-10 transform rotate-y-12 rotate-6 scale-90 opacity-60 hover:opacity-90 hover:scale-95 transition-all duration-500 z-10 pointer-events-none sm:pointer-events-auto">
            <div className="w-[320px] pointer-events-none select-none">
              <PhoneFrame glow={false} className="shadow-2xl">
                <StatsScreen />
                <LiquidNav activeTab="stats" onTabChange={() => {}} />
              </PhoneFrame>
            </div>
          </div>
        </div>

        {/* Micro subtext under showcase */}
        <p className="text-xs text-[#686868] mt-2 flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF7A32]" />
          <span>Real interactive components. Try toggling sets or switching tabs above.</span>
        </p>
      </div>
    </section>
  );
};
