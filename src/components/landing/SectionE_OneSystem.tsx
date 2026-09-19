import React, { useState } from 'react';
import { Home, Dumbbell, Brain, BarChart2, User, ArrowRight, ExternalLink } from 'lucide-react';
import { AppTab } from '../../types';
import { FORGE_APP_CONFIG, openForgeApp } from '../../config';
import { PhoneFrame } from '../PhoneFrame';
import { HomeScreen } from '../screens/HomeScreen';
import { WorkoutsScreen } from '../screens/WorkoutsScreen';
import { BrainScreen } from '../screens/BrainScreen';
import { StatsScreen } from '../screens/StatsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

interface SectionE_OneSystemProps {
  onLaunchTab?: (tab: AppTab) => void;
}

export const SectionE_OneSystem: React.FC<SectionE_OneSystemProps> = ({
  onLaunchTab,
}) => {
  const [activeTab, setActiveTab] = useState<AppTab>('home');

  const destinations: {
    id: AppTab;
    label: string;
    icon: React.ReactNode;
    subtitle: string;
    role: string;
    details: string[];
  }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
      subtitle: 'Daily Orientation & Active Briefing',
      role: 'Answers "What am I doing today?", "Am I progressing?", and highlights urgent overload cues.',
      details: [
        'Immediate Start Workout trigger for today’s session',
        'Current training week and consistency trackers',
        'Forge Brain top insight preview',
        'Up Next session queue',
      ],
    },
    {
      id: 'workouts',
      label: 'Workouts',
      icon: <Dumbbell className="w-5 h-5" />,
      subtitle: 'Plans, Exercises & Custom Templates',
      role: 'Structured microcycle and mesocycle blueprints with split schedules and exercise databases.',
      details: [
        '5-Day Hypertrophy active plan view',
        'Exercise library with target muscle groups',
        'Custom workout day builder with instant set allocation',
        'Complete historical session archives',
      ],
    },
    {
      id: 'brain',
      label: 'Brain',
      icon: <Brain className="w-5 h-5" />,
      subtitle: 'Evidence-Based Training Intelligence',
      role: 'An intelligence layer that reads real workout history and recommends adjustments.',
      details: [
        'Progressive overload verification on main compound lifts',
        'Session trend reviews and stall diagnostics',
        'Grounded fatigue proposals with user confirmation',
        'Natural training dialogue grounded in user numbers',
      ],
    },
    {
      id: 'stats',
      label: 'Stats',
      icon: <BarChart2 className="w-5 h-5" />,
      subtitle: 'Objective Adaptation Analytics',
      role: 'The scientific proof layer: tracking progressive volume, strength trend, and volume distribution.',
      details: [
        '1W, 1M, 3M, 1Y mesocycle volume trajectories',
        'Anatomical muscle training distribution',
        'Strength trend velocity and personal record count',
        'Filtered set counts per target muscular group',
      ],
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
      subtitle: 'Athlete Configuration & Data Export',
      role: 'Complete sovereignty over your logs: units (kg/lbs), hardware equipment, and JSON data export.',
      details: [
        'Unit toggles for international gym travel',
        'One-click JSON raw data export for spreadsheet backup',
        'Hardware and equipment constraints',
        'Privacy and security preferences',
      ],
    },
  ];

  const current = destinations.find((d) => d.id === activeTab) || destinations[0];

  return (
    <section id="section-system" className="py-24 bg-[#080809] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A32]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A3A3A3]">
              Section 05 // Complete Architecture
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.08] mb-4">
            One{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A32] to-[#FF9457]">
              System.
            </span>
          </h2>

          <p className="text-base text-[#A3A3A3] leading-relaxed">
            Five unified destinations working as a cohesive loop. Your logged workout immediately informs your Stats, updates Forge Brain intelligence, and sets up tomorrow&apos;s session.
          </p>
        </div>

        {/* 5 Destination Navigation Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-10">
          {destinations.map((d) => {
            const isSelected = activeTab === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setActiveTab(d.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#141418] border-[#FF7A32] shadow-lg shadow-[#FF7A32]/20'
                    : 'bg-[#0D0D10] border-white/[0.06] hover:border-white/[0.15]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#FF7A32] text-black shadow-md shadow-[#FF7A32]/40'
                        : 'bg-white/[0.05] text-[#8E8E93]'
                    }`}
                  >
                    {d.icon}
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#FF7A32] animate-pulse" />
                  )}
                </div>

                <div>
                  <div
                    className={`text-sm font-bold ${
                      isSelected ? 'text-white font-extrabold' : 'text-[#A3A3A3]'
                    }`}
                  >
                    {d.label}
                  </div>
                  <div className="text-[10px] text-[#686868] line-clamp-1 mt-0.5">
                    {d.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Deep Dive Detail Card */}
        <div className="bg-[#0D0D10] border border-white/[0.1] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FF7A32]">
                <span>System Role // {current.label}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {current.subtitle}
              </h3>

              <p className="text-sm text-[#A3A3A3] leading-relaxed">
                {current.role}
              </p>

              <div className="space-y-2 pt-2">
                {current.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A32] shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={`${FORGE_APP_CONFIG.appUrl}/${current.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (onLaunchTab) {
                      onLaunchTab(current.id);
                    } else {
                      openForgeApp(current.id);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF7A32] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#FF8847] transition-all shadow-md shadow-[#FF7A32]/25 cursor-pointer"
                >
                  <span>Launch {current.label} on App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="text-[11px] text-[#686868] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Interactive product preview loaded</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Live Screen Preview Frame */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-[320px] rounded-3xl overflow-hidden border border-white/[0.12] bg-[#0A0A0D] shadow-2xl relative">
                {/* Header preview pill */}
                <div className="px-4 py-2 bg-black/70 border-b border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#8E8E93]">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A32]" />
                    FORGE // {current.label.toUpperCase()}
                  </span>
                  <span>PREVIEW</span>
                </div>

                {/* Scaled view of the real screen component */}
                <div className="h-[430px] overflow-y-auto overflow-x-hidden p-2 text-left select-none pointer-events-none sm:pointer-events-auto">
                  {activeTab === 'home' && <HomeScreen onStartWorkout={() => {}} />}
                  {activeTab === 'workouts' && <WorkoutsScreen onStartWorkout={() => {}} />}
                  {activeTab === 'brain' && <BrainScreen />}
                  {activeTab === 'stats' && <StatsScreen />}
                  {activeTab === 'profile' && <ProfileScreen onSignOut={() => {}} />}
                </div>

                {/* Bottom preview footer bar */}
                <div className="p-2.5 bg-black/80 border-t border-white/[0.08] flex items-center justify-between text-[10px] text-[#8E8E93]">
                  <span>Local-first encrypted state</span>
                  <span className="text-[#FF7A32] font-bold font-mono">v2.4.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
