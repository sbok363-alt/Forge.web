import React, { useState, useEffect } from 'react';
import { Check, Clock, TrendingUp, RotateCcw, Play, Pause, ChevronRight } from 'lucide-react';

export const SectionA_Memory: React.FC = () => {
  const [sets, setSets] = useState([
    { id: 1, weight: 60, reps: 10, rir: 2, completed: true, previous: '60 kg x 10' },
    { id: 2, weight: 60, reps: 9, rir: 2, completed: true, previous: '60 kg x 9' },
    { id: 3, weight: 60, reps: 8, rir: 1, completed: true, previous: '60 kg x 8' },
    { id: 4, weight: 62.5, reps: 8, rir: 1, completed: false, previous: '60 kg x 8' },
  ]);

  const [restSeconds, setRestSeconds] = useState(74);
  const [isResting, setIsResting] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isResting && restSeconds > 0) {
      timer = setInterval(() => {
        setRestSeconds((s) => (s > 0 ? s - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isResting, restSeconds]);

  const toggleSet = (id: number) => {
    setSets((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = !s.completed;
          if (next) {
            setRestSeconds(120);
            setIsResting(true);
          }
          return { ...s, completed: next };
        }
        return s;
      })
    );
  };

  const formatRest = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const completedVolume = sets
    .filter((s) => s.completed)
    .reduce((acc, s) => acc + s.weight * s.reps, 0);

  return (
    <section id="section-product" className="py-16 sm:py-24 bg-[#070708] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A32]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A3A3A3]">
                Section 01 // Structured Logging
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.08]">
              Your training
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A32] to-[#FF9457]">
                has a memory.
              </span>
            </h2>

            <p className="text-base text-[#A3A3A3] leading-relaxed">
              Every completed set becomes structured, reliable training history. You don&apos;t have to guess what you benched three weeks ago or what your RIR was on your top set.
            </p>

            <div className="space-y-3 pt-2">
              {[
                {
                  title: 'Precise Load & Reps Tracking',
                  desc: 'Input weights in 0.5 kg/lb increments with frictionless steppers built for sweaty thumbs.',
                },
                {
                  title: 'Reps in Reserve (RIR) Protocol',
                  desc: 'Benchmark your proximity to failure on every set to regulate fatigue and maximize stimulus.',
                },
                {
                  title: 'Instant Previous Performance',
                  desc: 'See exactly what you lifted in the last microcycle directly next to your current entry.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-white/[0.05]"
                >
                  <div className="w-5 h-5 rounded-md bg-[#181310] border border-[#FF7A32]/40 flex items-center justify-center text-[#FF7A32] text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-tight">{item.title}</h4>
                    <p className="text-[11px] text-[#8E8E93] leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Tactile Logger Preview */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#0D0D0F] border border-white/[0.1] p-4 sm:p-8 shadow-2xl overflow-hidden">
              {/* Subtle orange accent gradient */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF7A32]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header inside card */}
              <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#FF7A32] uppercase tracking-wider">
                      Live Workout Session
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    1. Barbell Bench Press
                  </h3>
                  <p className="text-xs text-[#8E8E93]">Chest • Triceps • Front Delts</p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-[#8E8E93]">Total Volume</div>
                  <div className="text-lg font-black font-mono text-emerald-400">
                    {completedVolume.toLocaleString()} kg
                  </div>
                </div>
              </div>

              {/* Sets Table */}
              <div className="relative z-10 space-y-2 mb-6">
                <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-[#686868] uppercase tracking-wider px-3 pb-1">
                  <div className="col-span-2">Set</div>
                  <div className="col-span-3 text-center">Weight</div>
                  <div className="col-span-3 text-center">Reps</div>
                  <div className="col-span-2 text-center">RIR</div>
                  <div className="col-span-2 text-right">Status</div>
                </div>

                {sets.map((set) => (
                  <div
                    key={set.id}
                    onClick={() => toggleSet(set.id)}
                    className={`grid grid-cols-12 gap-2 items-center p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                      set.completed
                        ? 'bg-white/[0.03] border-white/[0.1] text-white'
                        : 'bg-black/50 border-white/[0.05] text-[#8E8E93] hover:border-white/[0.15]'
                    }`}
                  >
                    <div className="col-span-2 font-mono font-bold text-sm text-[#A3A3A3]">
                      #{set.id}
                    </div>

                    <div className="col-span-3 text-center font-mono font-bold text-sm text-white">
                      {set.weight} <span className="text-[10px] text-[#686868]">kg</span>
                    </div>

                    <div className="col-span-3 text-center font-mono font-bold text-sm text-white">
                      {set.reps} <span className="text-[10px] text-[#686868]">reps</span>
                    </div>

                    <div className="col-span-2 text-center font-mono text-xs text-[#A3A3A3]">
                      {set.rir} RIR
                    </div>

                    <div className="col-span-2 flex justify-end">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          set.completed
                            ? 'bg-[#FF7A32] text-black shadow-md shadow-[#FF7A32]/40'
                            : 'border border-white/20'
                        }`}
                      >
                        {set.completed && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Previous benchmark comparison bar */}
              <div className="relative z-10 flex items-center justify-between p-3 rounded-xl bg-black/60 border border-white/[0.06] text-xs text-[#8E8E93] mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF7A32] font-mono">📊</span>
                  <span>Previous Session Benchmark:</span>
                  <span className="font-mono font-bold text-white">60 kg x 8 • 4 sets</span>
                </div>
                <span className="text-emerald-400 font-bold">+1 Rep Progress</span>
              </div>

              {/* Live Rest Timer Control Bar */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#141417] border border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsResting(!isResting)}
                    className="w-10 h-10 rounded-full bg-white/[0.08] hover:bg-white/[0.15] flex items-center justify-center text-white cursor-pointer"
                  >
                    {isResting ? (
                      <Pause className="w-4 h-4 text-[#FF7A32]" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </button>

                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#8E8E93] tracking-wider">
                      Rest Interval Timer
                    </div>
                    <div className="text-xl font-mono font-black text-white">
                      {formatRest(restSeconds)}
                    </div>
                  </div>

                  <button
                    onClick={() => setRestSeconds(120)}
                    className="text-[#686868] hover:text-white p-1"
                    title="Reset to 02:00"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right text-xs text-[#8E8E93]">
                  Tap any set to toggle completion status.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
