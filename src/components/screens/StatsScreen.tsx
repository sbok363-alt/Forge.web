import React, { useState } from 'react';
import { BarChart2, TrendingUp, Trophy, Calendar, Info } from 'lucide-react';
import { ForgeLogo } from '../ForgeLogo';
import { TimeFilter } from '../../types';
import {
  USER_PROFILE,
  VOLUME_CHART_DATA_1M,
  VOLUME_CHART_DATA_1W,
  VOLUME_CHART_DATA_3M,
  MUSCLE_DISTRIBUTION,
} from '../../data/mockData';

interface StatsScreenProps {
  onNavigateTab?: (tab: 'home' | 'workouts' | 'brain' | 'stats' | 'profile') => void;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({
  onNavigateTab,
}) => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('1M');
  const [distributionTab, setDistributionTab] = useState<'volume' | 'frequency' | 'sets'>('volume');
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const currentChartData =
    timeFilter === '1W'
      ? VOLUME_CHART_DATA_1W
      : timeFilter === '3M'
      ? VOLUME_CHART_DATA_3M
      : VOLUME_CHART_DATA_1M;

  const maxVolume = Math.max(...currentChartData.map((d) => d.volumeKg), 30000);

  return (
    <div className="flex-1 flex flex-col px-4 pt-2 pb-4 text-[#F5F5F5] font-sans overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between py-2 border-b border-white/[0.06] mb-2 shrink-0">
        <ForgeLogo size="sm" />
        <button
          onClick={() => onNavigateTab?.('profile')}
          className="w-8 h-8 rounded-full overflow-hidden border border-white/20 hover:border-[#FF7A32] transition-colors cursor-pointer"
        >
          <img
            src={USER_PROFILE.avatar}
            alt={USER_PROFILE.name}
            className="w-full h-full object-cover grayscale brightness-95"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>

      {/* Screen Title */}
      <div className="mb-3 shrink-0">
        <h1 className="text-xl font-black tracking-tight text-white">Stats</h1>
        <p className="text-xs text-[#8E8E93]">Track your progress</p>
      </div>

      {/* Time Filter Pills: 1W, 1M, 3M, 1Y, All */}
      <div className="flex items-center gap-1.5 p-1 bg-[#101012] rounded-xl border border-white/[0.06] mb-3 shrink-0">
        {(['1W', '1M', '3M', '1Y', 'All'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setTimeFilter(filter)}
            className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              timeFilter === filter
                ? 'bg-white text-black shadow-sm'
                : 'text-[#8E8E93] hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Training Volume Card with Bar Chart */}
      <div className="bg-[#101012] border border-white/[0.08] rounded-2xl p-4 mb-3">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="text-[10px] font-semibold text-[#8E8E93] uppercase tracking-wider">
              Training Volume
            </div>
            <div className="text-2xl font-black text-white tracking-tight">
              {timeFilter === '1W'
                ? '21,647 kg'
                : timeFilter === '3M'
                ? '236,100 kg'
                : '24,320 kg'}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold mt-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+8.4% vs previous month</span>
            </div>
          </div>
          <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center text-[#8E8E93]">
            <BarChart2 className="w-4 h-4" />
          </div>
        </div>

        {/* Real Product Bar Chart */}
        <div className="relative pt-4 pb-1">
          {/* Y-axis labels background */}
          <div className="absolute right-0 top-1 text-[9px] font-mono text-[#686868] flex flex-col items-end gap-3 pointer-events-none">
            <span>30K</span>
            <span>20K</span>
            <span>10K</span>
            <span>0</span>
          </div>

          {/* Grid lines */}
          <div className="w-full h-28 border-b border-white/[0.1] flex items-end justify-between gap-2 px-1 relative">
            <div className="absolute inset-x-0 top-0 border-b border-white/[0.03]" />
            <div className="absolute inset-x-0 top-1/3 border-b border-white/[0.04]" />
            <div className="absolute inset-x-0 top-2/3 border-b border-white/[0.04]" />

            {currentChartData.map((d, i) => {
              const heightPct = Math.max(12, Math.round((d.volumeKg / maxVolume) * 100));
              const isLast = i === currentChartData.length - 1;
              const isHovered = hoveredBarIndex === i;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredBarIndex(i)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black border border-white/20 text-white text-[9px] font-mono py-0.5 px-1.5 rounded whitespace-nowrap z-20 shadow-lg">
                      {d.volumeKg.toLocaleString()} kg
                    </div>
                  )}

                  <div
                    className={`w-full max-w-[28px] rounded-t-sm transition-all duration-200 ${
                      isLast || isHovered
                        ? 'bg-[#FF7A32] shadow-sm shadow-[#FF7A32]/50'
                        : 'bg-white/20 group-hover:bg-white/40'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="mt-2 text-[9px] text-[#8E8E93] font-medium tracking-tight">
                    {d.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3 Summary metric tiles */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {/* Workouts */}
        <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-2.5 flex flex-col justify-between">
          <div className="text-sm font-black text-white">12</div>
          <div className="text-[10px] text-[#8E8E93] leading-tight">Workouts this month</div>
        </div>

        {/* Strength trend */}
        <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-2.5 flex flex-col justify-between">
          <div className="flex items-center gap-1 text-sm font-black text-emerald-400">
            <span>+6.8%</span>
            <TrendingUp className="w-3 h-3 text-emerald-400" />
          </div>
          <div className="text-[10px] text-[#8E8E93] leading-tight">Strength trend vs prev</div>
        </div>

        {/* PRs */}
        <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-white">5</span>
            <Trophy className="w-3.5 h-3.5 text-[#FF7A32]" />
          </div>
          <div className="text-[10px] text-[#8E8E93] leading-tight">PRs this month</div>
        </div>
      </div>

      {/* Training Distribution Section */}
      <div className="bg-[#101012] border border-white/[0.08] rounded-2xl p-4 mb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-white tracking-tight">
            Training Distribution
          </span>
          <div className="flex items-center gap-1 p-0.5 bg-black/40 rounded-lg border border-white/[0.06]">
            {(['volume', 'frequency', 'sets'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setDistributionTab(tab)}
                className={`px-2 py-0.5 text-[9px] font-semibold rounded capitalize transition-all cursor-pointer ${
                  distributionTab === tab
                    ? 'bg-white text-black'
                    : 'text-[#8E8E93] hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Anatomical muscle map + percentage list */}
        <div className="grid grid-cols-12 gap-3 items-center">
          {/* Anatomical Figure SVG Representation */}
          <div className="col-span-5 relative flex items-center justify-center p-2 rounded-xl bg-black/50 border border-white/[0.06]">
            <svg
              viewBox="0 0 100 160"
              className="w-full h-36 text-neutral-600"
              fill="currentColor"
            >
              {/* Head */}
              <circle cx="50" cy="16" r="10" fill="#2A2A2E" />
              {/* Neck */}
              <rect x="47" y="26" width="6" height="5" fill="#323238" />
              {/* Shoulders (highlighted orange) */}
              <path
                d="M32 32 C35 28, 65 28, 68 32 L76 44 L68 46 L62 36 L38 36 L32 46 L24 44 Z"
                fill="#FF7A32"
                opacity="0.9"
              />
              {/* Chest (highlighted orange) */}
              <path
                d="M37 38 H63 L60 56 C55 60, 45 60, 40 56 Z"
                fill="#FFA875"
                opacity="0.95"
              />
              {/* Abs & Core */}
              <path
                d="M40 58 H60 L58 78 C54 82, 46 82, 42 78 Z"
                fill="#26262B"
              />
              {/* Arms (Biceps & Forearms highlighted) */}
              <path
                d="M23 46 L29 48 L25 80 L19 78 Z"
                fill="#FFBC94"
                opacity="0.85"
              />
              <path
                d="M77 46 L71 48 L75 80 L81 78 Z"
                fill="#FFBC94"
                opacity="0.85"
              />
              {/* Hands */}
              <circle cx="22" cy="85" r="4" fill="#323238" />
              <circle cx="78" cy="85" r="4" fill="#323238" />
              {/* Pelvis */}
              <path d="M41 80 H59 L62 94 H38 Z" fill="#2A2A2E" />
              {/* Upper Legs / Quads (highlighted) */}
              <path
                d="M38 96 H48 L46 128 H36 Z"
                fill="#FF9457"
                opacity="0.9"
              />
              <path
                d="M52 96 H62 L64 128 H54 Z"
                fill="#FF9457"
                opacity="0.9"
              />
              {/* Lower Legs / Calves */}
              <path d="M36 130 H45 L43 156 H37 Z" fill="#383840" />
              <path d="M55 130 H64 L63 156 H57 Z" fill="#383840" />
            </svg>
          </div>

          {/* Muscle Percentage breakdown */}
          <div className="col-span-7 space-y-2">
            {MUSCLE_DISTRIBUTION.map((item, i) => (
              <div key={i} className="text-xs">
                <div className="flex items-center justify-between text-[11px] mb-0.5">
                  <span className="font-semibold text-white">{item.name}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white">{item.percentage}%</span>
                    <span className="text-[10px] text-[#8E8E93]">({item.sets} sets)</span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${item.percentage * 2.5}%`,
                      backgroundColor: item.color || '#FF7A32',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
