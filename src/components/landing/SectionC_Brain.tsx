import React, { useState } from 'react';
import { Brain, ArrowRight, CheckCircle2, ShieldAlert, Sparkles, Sliders, Database, FileText } from 'lucide-react';

export const SectionC_Brain: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<number>(0);

  const scenarios = [
    {
      title: 'Progressive Overload Recommendation',
      query: 'Should I increase weight on Barbell Bench Press?',
      evidence: 'Completed 60 kg x 10, 9, 8 at RIR 2, 2, 1 across 3 sessions (+4 total reps delta).',
      recommendation:
        'Maintain 60 kg for 1 more session to consolidate 10 reps on sets 2 and 3 before progressing to 62.5 kg. This solidifies your strength base before advancing load.',
      action: 'Keep load at 60 kg for Set 1-3',
    },
    {
      title: 'Stall Detection & Recovery Protocol',
      query: 'Why did my overhead press stall on week 3?',
      evidence: 'Overhead Press load has remained at 50 kg for 3 weeks; previous day chest volume was 18 sets.',
      recommendation:
        "Previous-day push volume may be contributing to accumulated fatigue in your triceps and front delts. Consider shifting Overhead Press to an upper day following a dedicated rest day.",
      action: 'Reschedule OHP to Friday Upper Day',
    },
    {
      title: 'Volume Deload Assessment',
      query: 'Am I accumulating excessive systemic fatigue?',
      evidence: 'Average RIR dropped from 2.2 to 0.6 across compound sets over the last 4 sessions as perceived exertion rose.',
      recommendation:
        "Logged sets show declining RIR alongside rising perceived exertion across recent sessions. A planned volume reduction on secondary movements may help manage accumulated fatigue.",
      action: 'Apply Deload Microcycle',
    },
  ];

  const current = scenarios[selectedScenario];

  return (
    <section id="section-brain" className="py-16 sm:py-24 bg-[#080809] border-t border-white/[0.06] relative overflow-hidden">
      {/* Restrained Forge Brain Orange Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[400px] sm:h-[500px] bg-[#FF7A32]/12 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1714] border border-[#FF7A32]/40 mb-4">
            <Brain className="w-3.5 h-3.5 text-[#FF7A32]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF7A32]">
              Training Intelligence
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.08] mb-4">
            Your training{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A32] via-[#FF9457] to-[#FFA875]">
              intelligence.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#A3A3A3] leading-relaxed">
            Forge Brain is not a novelty chatbot. It is an analytical intelligence layer operating strictly on your verified training history, detecting progressive patterns, fatigue spikes, and load adjustments.
          </p>
        </div>

        {/* The 5-Stage Evidence Pipeline Graphic */}
        <div className="mb-10 sm:mb-14 p-4 sm:p-8 rounded-3xl bg-[#0D0D10] border border-white/[0.1] shadow-2xl">
          <div className="text-xs font-bold uppercase tracking-widest text-[#8E8E93] mb-6 text-center sm:text-left">
            Evidence-Based Decision Architecture
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            {[
              { step: '01', title: 'FORGE DATA', desc: 'Sets, reps, loads, RIR, cadence', icon: <Database className="w-4 h-4 text-white" /> },
              { step: '02', title: 'EVIDENCE', desc: 'Multi-week progression delta', icon: <FileText className="w-4 h-4 text-white" /> },
              { step: '03', title: 'FORGE BRAIN', desc: 'Training trend analysis', icon: <Brain className="w-4 h-4 text-[#FF7A32]" /> },
              { step: '04', title: 'RECOMMENDATION', desc: 'Actionable load & set proposals', icon: <Sparkles className="w-4 h-4 text-[#FF9457]" /> },
              { step: '05', title: 'USER APPROVAL', desc: 'Athlete stays in total control', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
            ].map((node, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                  i === 2
                    ? 'bg-[#181310] border-[#FF7A32]/60 shadow-lg shadow-[#FF7A32]/20'
                    : 'bg-black/50 border-white/[0.07]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-[#8E8E93]">{node.step}</span>
                    {node.icon}
                  </div>
                  <h4 className="text-xs font-black text-white tracking-wider uppercase mb-1">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-[#A3A3A3] leading-tight">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Scenario Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Scenario Selector Tabs */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] mb-2 px-1">
              Test Realistic Inquiries:
            </div>
            {scenarios.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedScenario(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedScenario === idx
                    ? 'bg-[#181310] border-[#FF7A32] text-white shadow-md'
                    : 'bg-[#0E0E10] border-white/[0.06] text-[#A3A3A3] hover:border-white/20'
                }`}
              >
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF7A32] mb-1">
                  Scenario {idx + 1}
                </div>
                <div className="text-xs font-bold text-white mb-1">{sc.title}</div>
                <div className="text-[11px] text-[#8E8E93] line-clamp-1">&quot;{sc.query}&quot;</div>
              </button>
            ))}

            <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.05] mt-4">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                <ShieldAlert className="w-4 h-4 text-[#FF7A32]" />
                <span>Transparent Proposal Safeguard</span>
              </div>
              <p className="text-[11px] text-[#8E8E93] leading-relaxed">
                Forge Brain acts strictly as an advisory intelligence layer. It never silently alters your recorded numbers, overwrites workout logs, or adjusts weights without your explicit confirmation.
              </p>
            </div>
          </div>

          {/* Interactive Evidence Breakdown Card */}
          <div className="lg:col-span-8 bg-[#0D0D10] border border-[#FF7A32]/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7A32]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Question Query Box */}
              <div className="p-4 rounded-2xl bg-black/70 border border-white/[0.08] flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold shrink-0 text-white">
                  Q
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8E8E93] uppercase tracking-wider">
                    Athlete Query
                  </div>
                  <div className="text-sm font-bold text-white tracking-tight mt-0.5">
                    &quot;{current.query}&quot;
                  </div>
                </div>
              </div>

              {/* Verified Evidence Box */}
              <div className="p-4 rounded-2xl bg-[#121215] border border-white/[0.08]">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#FF7A32] mb-1.5 font-bold">
                  <Database className="w-3.5 h-3.5" />
                  <span>Ground Truth Training Evidence Found</span>
                </div>
                <div className="text-xs font-mono text-white/90 bg-black/60 p-3 rounded-xl border border-white/[0.05]">
                  {current.evidence}
                </div>
              </div>

              {/* Brain Recommendation Bubble */}
              <div className="p-5 rounded-2xl bg-[#1C1714] border border-[#FF7A32]/50 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-[#FF7A32] flex items-center justify-center text-black font-black text-xs">
                    <Brain className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-white">
                    Forge Brain Recommendation
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#F5F5F5] leading-relaxed">
                  {current.recommendation}
                </p>

                <div className="pt-2 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-[#A3A3A3]">
                    Proposed Action: <span className="text-white font-bold">{current.action}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer">
                      Approve Adjustment
                    </button>
                    <button className="px-3 py-1.5 rounded-full bg-white/[0.08] text-white font-semibold text-xs hover:bg-white/[0.15] transition-colors cursor-pointer">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
