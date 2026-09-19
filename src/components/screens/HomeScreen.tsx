import React from 'react';
import { Play, TrendingUp, Target, ChevronRight, Brain, Clock, ChevronDown } from 'lucide-react';
import { ForgeLogo } from '../ForgeLogo';
import { USER_PROFILE, INITIAL_BRAIN_INSIGHT } from '../../data/mockData';

interface HomeScreenProps {
  onStartWorkout: () => void;
  onNavigateTab?: (tab: 'home' | 'workouts' | 'brain' | 'stats' | 'profile') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartWorkout,
  onNavigateTab,
}) => {
  return (
    <div className="flex-1 flex flex-col px-4 pt-2 pb-4 text-[#F5F5F5] font-sans overflow-y-auto">
      {/* App Header */}
      <div className="flex items-center justify-between py-2 border-b border-white/[0.06] mb-3 shrink-0">
        <ForgeLogo size="sm" />
        <button
          onClick={() => onNavigateTab?.('profile')}
          className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 hover:border-[#FF7A32] transition-colors cursor-pointer"
          title="User Profile"
        >
          <img
            src={USER_PROFILE.avatar}
            alt={USER_PROFILE.name}
            className="w-full h-full object-cover grayscale brightness-95"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>

      {/* Date and Week row */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-xl font-black tracking-tight text-white">Today</h1>
          <p className="text-xs text-[#A3A3A3] font-medium">Tue, Sep 16</p>
        </div>
        <button
          onClick={() => onNavigateTab?.('workouts')}
          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/[0.07] border border-white/[0.1] text-white/90 hover:bg-white/[0.12] transition-colors cursor-pointer font-medium"
        >
          <span>Week 4</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#FF7A32]" />
        </button>
      </div>

      {/* Today's Workout Hero Card */}
      <div
        className="relative rounded-2xl overflow-hidden bg-[#101012] border border-white/[0.12] p-4 mb-3 group"
        style={{
          boxShadow: '0 12px 30px -8px rgba(0,0,0,0.8), 0 0 25px -10px rgba(255,122,50,0.2)',
        }}
      >
        {/* Background dark barbell plate image with fade */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden pointer-events-none opacity-45">
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80"
            alt="Workout barbell"
            className="w-full h-full object-cover grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101012] via-[#101012]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col">
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="text-2xl font-black text-white tracking-tight">Push</h2>
          </div>
          <p className="text-xs text-[#A3A3A3] mb-2 font-medium">
            Hypertrophy • 5 exercises
          </p>

          <div className="flex items-center gap-1.5 text-xs text-[#A3A3A3] mb-4">
            <Clock className="w-3.5 h-3.5 text-white/70" />
            <span>~55 min</span>
          </div>

          <button
            id="home-start-workout-btn"
            onClick={onStartWorkout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 active:scale-95 transition-all shadow-md cursor-pointer self-start"
          >
            <Play className="w-3 h-3 fill-black text-black" />
            <span>Start Workout</span>
          </button>
        </div>
      </div>

      {/* Motivational Subtext */}
      <div className="mb-3 px-1">
        <p className="text-[11px] text-[#A3A3A3] font-medium tracking-tight">
          Discipline today progress tomorrow.
        </p>
      </div>

      {/* Summary Metrics (3 columns) */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {/* Metric 1 */}
        <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-lg font-black text-white tracking-tight">12</span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
          <span className="text-[10px] text-[#8E8E93] leading-tight">Workouts this month</span>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-black text-emerald-400 tracking-tight">+8.4%</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-[10px] text-[#8E8E93] leading-tight">Training Volume vs prev</span>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-lg font-black text-white tracking-tight">5</span>
            <Target className="w-3.5 h-3.5 text-[#FF7A32]" />
          </div>
          <span className="text-[10px] text-[#8E8E93] leading-tight">Consistency On target</span>
        </div>
      </div>

      {/* Forge Brain Insight Card */}
      <div
        onClick={() => onNavigateTab?.('brain')}
        className="bg-[#121215] border border-white/[0.12] rounded-xl p-3 mb-3 flex items-center justify-between hover:border-[#FF7A32]/40 transition-colors cursor-pointer"
        style={{
          boxShadow: '0 4px 20px -5px rgba(255, 122, 50, 0.15)',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Orange Brain rounded icon */}
          <div className="w-9 h-9 rounded-xl bg-[#1C1714] border border-[#FF7A32]/40 flex items-center justify-center shrink-0">
            <Brain className="w-5 h-5 text-[#FF7A32]" />
          </div>
          <div>
            <div className="text-[9px] font-bold text-[#FF7A32] tracking-wider uppercase">
              FORGE BRAIN
            </div>
            <div className="text-xs font-bold text-white tracking-tight">
              {INITIAL_BRAIN_INSIGHT.exercise} is {INITIAL_BRAIN_INSIGHT.status}
            </div>
            <div className="text-[10px] text-[#A3A3A3]">
              {INITIAL_BRAIN_INSIGHT.metric}
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-[#A3A3A3] shrink-0" />
      </div>

      {/* Up Next Card */}
      <div className="mb-2">
        <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-1.5 px-0.5">
          Up Next
        </div>
        <div
          onClick={() => onNavigateTab?.('workouts')}
          className="bg-[#101012] border border-white/[0.08] rounded-xl p-2.5 flex items-center justify-between hover:border-white/20 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/60 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=200&auto=format&fit=crop&q=80"
                alt="Pull workout"
                className="w-full h-full object-cover grayscale opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Pull</div>
              <div className="text-[10px] text-[#8E8E93]">Tomorrow</div>
            </div>
          </div>
          <div className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center">
            <ChevronRight className="w-3.5 h-3.5 text-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
};
