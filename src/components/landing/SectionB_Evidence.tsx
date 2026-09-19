import React, { useState } from 'react';
import { TrendingUp, BarChart2, Award, Calendar, ChevronRight } from 'lucide-react';
import { MUSCLE_DISTRIBUTION } from '../../data/mockData';

export const SectionB_Evidence: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'1W' | '1M' | '3M' | '1Y'>('1M');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('Back');

  const chartPoints = [
    { label: 'Aug 19', value: 14200, pct: 45 },
    { label: 'Aug 26', value: 18400, pct: 60 },
    { label: 'Sep 02', value: 20100, pct: 72 },
    { label: 'Sep 09', value: 22800, pct: 85 },
    { label: 'Sep 16', value: 24320, pct: 95 },
  ];

  return (
    <section id="section-progress" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background glow element */}
      <div className="absolute right-1/4 bottom-10 w-96 h-96 bg-[#FF7A32]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A32]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A3A3A3]">
              Progress Evidence
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.08] mb-4">
            Progress you can{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A32] to-[#FF9457]">
              prove.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A3A3A3] leading-relaxed">
            No vanity scores or arbitrary gamification. FORGE isolates the metrics that directly reflect strength and hypertrophy progress: progressive volume, estimated 1RM trajectory, and set consistency.
          </p>
        </div>

        {/* Real Product UI Grid Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Volume Chart Card (8 cols) */}
          <div className="lg:col-span-7 bg-[#0C0C0E] border border-white/[0.08] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            {/* Header + Time Filter */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] mb-6">
                <div>
                  <div className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">
                    Total Mesocycle Volume
                  </div>
                  <div className="text-3xl font-extrabold text-white tracking-tight mt-1 flex items-baseline gap-2">
                    <span>24,320 kg</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +8.4% vs prev
                    </span>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1 p-1 bg-black/60 rounded-xl border border-white/[0.08] self-start sm:self-auto">
                  {(['1W', '1M', '3M', '1Y'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        activeFilter === filter
                          ? 'bg-white text-black shadow-sm font-bold'
                          : 'text-[#8E8E93] hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bar Graph Visual */}
              <div className="h-56 pt-6 pb-2 flex items-end justify-between gap-3 px-2 border-b border-white/[0.08] relative">
                {/* Horizontal guide lines */}
                <div className="absolute inset-x-0 top-6 border-b border-white/[0.03]" />
                <div className="absolute inset-x-0 top-1/2 border-b border-white/[0.04]" />

                {chartPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    {/* Tooltip value */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/20 text-[10px] font-mono py-0.5 px-2 rounded mb-2 whitespace-nowrap shadow-lg">
                      {pt.value.toLocaleString()} kg
                    </div>

                    <div
                      className={`w-full max-w-[36px] rounded-t-sm transition-all duration-300 ${
                        idx === chartPoints.length - 1
                          ? 'bg-[#FF7A32] shadow-lg shadow-[#FF7A32]/50'
                          : 'bg-white/20 group-hover:bg-white/40'
                      }`}
                      style={{ height: `${pt.pct}%` }}
                    />
                    <span className="mt-3 text-[10px] font-mono text-[#8E8E93] group-hover:text-white transition-colors">
                      {pt.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom summary metrics row */}
            <div className="grid grid-cols-3 gap-3 pt-6 mt-2">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.05]">
                <div className="text-lg font-extrabold text-white">12</div>
                <div className="text-[11px] text-[#8E8E93]">Workouts completed</div>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.05]">
                <div className="text-lg font-extrabold text-emerald-400">+6.8%</div>
                <div className="text-[11px] text-[#8E8E93]">Strength trend velocity</div>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.05]">
                <div className="text-lg font-extrabold text-[#FF7A32]">5 PRs</div>
                <div className="text-[11px] text-[#8E8E93]">Personal records logged</div>
              </div>
            </div>
          </div>

          {/* Muscle Distribution & Anatomical Evidence (5 cols) */}
          <div className="lg:col-span-5 bg-[#0C0C0E] border border-white/[0.08] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Muscle Distribution
                  </h3>
                  <p className="text-xs text-[#8E8E93]">Hypertrophy volume by group</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#FF7A32] px-2 py-0.5 rounded-full bg-[#FF7A32]/10 border border-[#FF7A32]/20">
                  174 Hard Sets
                </span>
              </div>

              {/* Distribution bars */}
              <div className="space-y-3.5 my-4">
                {MUSCLE_DISTRIBUTION.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedMuscle(item.name)}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      selectedMuscle === item.name
                        ? 'bg-white/[0.05] border border-white/10'
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-white">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white">{item.percentage}%</span>
                        <span className="text-[10px] text-[#8E8E93]">({item.sets} sets)</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${item.percentage * 2.8}%`,
                          backgroundColor: item.color || '#FF7A32',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/[0.06] text-xs text-[#8E8E93] flex items-center justify-between">
              <span>Balanced Push-to-Pull volume ratio</span>
              <span className="font-mono font-bold text-emerald-400">1 : 1.15 (Optimal)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
