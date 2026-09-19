import React, { useState } from 'react';
import { Plus, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ForgeLogo } from '../ForgeLogo';
import { INITIAL_TRAINING_PLAN, RECENT_SESSIONS } from '../../data/mockData';

interface WorkoutsScreenProps {
  onStartWorkout: (workoutName?: string) => void;
  onNavigateTab?: (tab: 'home' | 'workouts' | 'brain' | 'stats' | 'profile') => void;
}

export const WorkoutsScreen: React.FC<WorkoutsScreenProps> = ({
  onStartWorkout,
}) => {
  const [subTab, setSubTab] = useState<'plans' | 'exercises' | 'templates'>('plans');
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex-1 flex flex-col px-4 pt-2 pb-4 text-[#F5F5F5] font-sans overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between py-2 border-b border-white/[0.06] mb-3 shrink-0">
        <ForgeLogo size="sm" />
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.1] flex items-center justify-center text-white transition-colors cursor-pointer"
          title="Create New Plan or Workout"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="mb-2">
        <h1 className="text-xl font-black tracking-tight text-white">Workouts</h1>
      </div>

      {/* Sub-nav pills: Plans, Exercises, Templates */}
      <div className="flex items-center gap-1.5 p-1 bg-[#101012] rounded-xl border border-white/[0.06] mb-3 shrink-0">
        {(['plans', 'exercises', 'templates'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
              subTab === tab
                ? 'bg-white text-black shadow-sm'
                : 'text-[#8E8E93] hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {subTab === 'plans' && (
        <>
          {/* Active Plan Card */}
          <div className="relative rounded-2xl overflow-hidden bg-[#101012] border border-white/[0.12] p-4 mb-3">
            <div className="absolute right-0 top-0 bottom-0 w-3/5 overflow-hidden pointer-events-none opacity-40">
              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80"
                alt="Muscular back pullup"
                className="w-full h-full object-cover grayscale contrast-125"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#101012] via-[#101012]/85 to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wide">
                    Active
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#A3A3A3] px-2 py-0.5 rounded-full bg-white/[0.06]">
                  Week 4 &gt;
                </span>
              </div>

              <h2 className="text-xl font-black text-white tracking-tight mb-1">
                {INITIAL_TRAINING_PLAN.title}
              </h2>
              <p className="text-[11px] text-[#A3A3A3] mb-3 max-w-[200px]">
                {INITIAL_TRAINING_PLAN.subtitle}
              </p>

              {/* Weekly schedule pills */}
              <div className="grid grid-cols-5 gap-1 pt-2 border-t border-white/[0.08]">
                {INITIAL_TRAINING_PLAN.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center py-1 px-0.5 rounded-lg bg-black/40 border border-white/[0.05]"
                  >
                    <span className="text-[9px] font-medium text-[#8E8E93]">{item.day}</span>
                    <span className="text-[10px] font-bold text-white tracking-tight">{item.workout}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Workout Days List */}
          <div className="mb-4">
            <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider mb-2 px-0.5">
              Workout Days
            </div>
            <div className="space-y-1.5">
              {INITIAL_TRAINING_PLAN.days.map((day) => (
                <div
                  key={day.id}
                  onClick={() => onStartWorkout(day.name)}
                  className="bg-[#101012] border border-white/[0.07] rounded-xl p-2.5 flex items-center justify-between hover:border-[#FF7A32]/40 hover:bg-[#141416] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/60 shrink-0">
                      <img
                        src={day.image}
                        alt={day.name}
                        className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform opacity-75"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-[#FF7A32] transition-colors">
                        {day.name}
                      </div>
                      <div className="text-[10px] text-[#8E8E93]">
                        {day.exerciseCount} exercises • {day.setCount} sets
                      </div>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/[0.05] group-hover:bg-[#FF7A32] group-hover:text-black flex items-center justify-center transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-white/70 group-hover:text-black" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2 px-0.5">
              <span className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                Recent Sessions
              </span>
              <button className="text-[10px] font-medium text-[#FF7A32] hover:underline cursor-pointer">
                View All &gt;
              </button>
            </div>
            <div className="space-y-1.5">
              {RECENT_SESSIONS.map((session) => (
                <div
                  key={session.id}
                  className="bg-[#101012] border border-white/[0.06] rounded-xl p-2.5 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{session.title}</div>
                    <div className="text-[10px] text-[#8E8E93]">{session.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-400">{session.volume}</div>
                    <div className="text-[9px] text-[#8E8E93]">Total Volume</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {subTab === 'exercises' && (
        <div className="space-y-2">
          <div className="text-xs text-[#8E8E93] mb-1">Comprehensive exercise database:</div>
          {[
            { name: 'Barbell Bench Press', muscle: 'Chest, Triceps', pr: '100 kg' },
            { name: 'Incline Dumbbell Press', muscle: 'Upper Chest', pr: '36 kg' },
            { name: 'Barbell Back Squat', muscle: 'Quads, Glutes', pr: '140 kg' },
            { name: 'Deadlift (Conventional)', muscle: 'Posterior Chain', pr: '180 kg' },
            { name: 'Overhead Barbell Press', muscle: 'Shoulders, Triceps', pr: '70 kg' },
            { name: 'Weighted Pull-Ups', muscle: 'Lats, Biceps', pr: '+30 kg' },
          ].map((ex, i) => (
            <div
              key={i}
              className="bg-[#101012] border border-white/[0.07] rounded-xl p-3 flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-bold text-white">{ex.name}</div>
                <div className="text-[10px] text-[#8E8E93]">{ex.muscle}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#FF7A32] font-semibold">PR: {ex.pr}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {subTab === 'templates' && (
        <div className="space-y-2">
          {[
            { name: 'Hypertrophy Upper/Lower 4-Day', creator: 'FORGE Standard' },
            { name: 'Push / Pull / Legs (PPL) 6-Day', creator: 'FORGE Standard' },
            { name: 'Strength Peak 3-Day', creator: 'FORGE Standard' },
          ].map((tpl, i) => (
            <div
              key={i}
              className="bg-[#101012] border border-white/[0.07] rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-[#FF7A32]/40"
            >
              <div>
                <div className="text-xs font-bold text-white">{tpl.name}</div>
                <div className="text-[10px] text-[#8E8E93]">{tpl.creator}</div>
              </div>
              <button
                onClick={() => onStartWorkout(tpl.name)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.08] hover:bg-[#FF7A32] hover:text-black font-semibold text-white transition-colors cursor-pointer"
              >
                Use
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Quick create modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#101012] border border-white/20 rounded-2xl p-4 w-full max-w-xs text-white">
            <h3 className="text-sm font-bold mb-2">Create New Workout</h3>
            <input
              type="text"
              placeholder="e.g. Arms & Calves"
              className="w-full px-3 py-2 rounded-xl bg-black border border-white/20 text-xs text-white mb-3 outline-none focus:border-[#FF7A32]"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-1.5 text-xs text-neutral-400 bg-white/5 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  onStartWorkout('Custom Session');
                }}
                className="flex-1 py-1.5 text-xs font-bold bg-[#FF7A32] text-black rounded-xl cursor-pointer"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
