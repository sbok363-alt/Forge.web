import React, { useState } from 'react';
import { Check, Dumbbell, Shield, WifiOff, Zap, Plus, Minus, RotateCcw } from 'lucide-react';

export const SectionD_Session: React.FC = () => {
  const [testWeight, setTestWeight] = useState(62.5);
  const [testReps, setTestReps] = useState(8);
  const [testRir, setTestRir] = useState(1);
  const [isDone, setIsDone] = useState(false);

  return (
    <section id="section-session" className="py-24 bg-[#050505] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text / Gym Principles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A32]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A3A3A3]">
                Section 04 // Gym Floor Optimization
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.08]">
              Built for the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A32] to-[#FF9457]">
                session.
              </span>
            </h2>

            <p className="text-base text-[#A3A3A3] leading-relaxed">
              When your heart rate is 165 BPM and chalk is on your hands, you don&apos;t want multi-step nested modals. FORGE is engineered for instant, high-contrast logging with maximum tactile precision.
            </p>

            <div className="space-y-4 pt-2">
              {[
                {
                  icon: <WifiOff className="w-4 h-4 text-[#FF7A32]" />,
                  title: 'Local-First Offline Resilience',
                  desc: 'Basement gym with zero cellular signal? Everything logs instantly to device memory and synchronizes when you reconnect.',
                },
                {
                  icon: <Zap className="w-4 h-4 text-[#FF7A32]" />,
                  title: 'One-Tap Quick Increment Controls',
                  desc: 'Microload by 0.5kg or 2.5lb with zero keystrokes. Fast adjusters designed for high-stress fatigue states.',
                },
                {
                  icon: <Dumbbell className="w-4 h-4 text-[#FF7A32]" />,
                  title: 'Warmup & Drop Set Categorization',
                  desc: 'Distinguish working sets from ramp-ups so volume algorithms only count true adaptation drivers.',
                },
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#141417] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">{feat.title}</h4>
                    <p className="text-xs text-[#8E8E93] leading-normal">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Gym Console Simulation */}
          <div className="lg:col-span-7">
            <div className="bg-[#0D0D10] border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#FF7A32] font-bold">
                    Tactile Rapid Input Simulator
                  </div>
                  <h3 className="text-lg font-black text-white">Barbell Bench Press — Set #4</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-mono text-white/90">
                  Target: 8 Reps @ RIR 1
                </div>
              </div>

              {/* Stepper Controls Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {/* Weight Stepper */}
                <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.07] flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-[#8E8E93] mb-2 tracking-wider">
                    Weight (kg)
                  </span>
                  <div className="text-3xl font-mono font-black text-white mb-3">
                    {testWeight}
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <button
                      onClick={() => setTestWeight((w) => Math.max(0, w - 2.5))}
                      className="flex-1 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setTestWeight((w) => w + 2.5)}
                      className="flex-1 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Reps Stepper */}
                <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.07] flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-[#8E8E93] mb-2 tracking-wider">
                    Reps Logged
                  </span>
                  <div className="text-3xl font-mono font-black text-white mb-3">
                    {testReps}
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <button
                      onClick={() => setTestReps((r) => Math.max(1, r - 1))}
                      className="flex-1 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setTestReps((r) => r + 1)}
                      className="flex-1 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* RIR Stepper */}
                <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.07] flex flex-col items-center">
                  <span className="text-[10px] uppercase font-bold text-[#8E8E93] mb-2 tracking-wider">
                    Reps in Reserve
                  </span>
                  <div className="text-3xl font-mono font-black text-[#FF7A32] mb-3">
                    {testRir}
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <button
                      onClick={() => setTestRir((rir) => Math.max(0, rir - 1))}
                      className="flex-1 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setTestRir((rir) => Math.min(5, rir + 1))}
                      className="flex-1 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Big Action Button */}
              <button
                onClick={() => setIsDone(!isDone)}
                className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all shadow-xl cursor-pointer ${
                  isDone
                    ? 'bg-emerald-500 text-black shadow-emerald-500/30'
                    : 'bg-[#FF7A32] hover:bg-[#FF8847] active:scale-[0.98] text-black shadow-[#FF7A32]/40'
                }`}
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>{isDone ? 'Set Logged (Tap to Undo)' : 'Log Completed Set'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
