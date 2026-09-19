import React, { useState } from 'react';
import {
  Target,
  Dumbbell,
  Brain,
  Scale,
  Download,
  Moon,
  User,
  Shield,
  Lock,
  ChevronRight,
  Check,
} from 'lucide-react';
import { ForgeLogo } from '../ForgeLogo';
import { USER_PROFILE, INITIAL_TRAINING_PLAN, RECENT_SESSIONS } from '../../data/mockData';

interface ProfileScreenProps {
  onSignOut?: () => void;
  onNavigateTab?: (tab: 'home' | 'workouts' | 'brain' | 'stats' | 'profile') => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onSignOut,
}) => {
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Real JSON export of training data
  const handleExportData = () => {
    const exportData = {
      user: USER_PROFILE,
      plan: INITIAL_TRAINING_PLAN,
      sessions: RECENT_SESSIONS,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forge-training-export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const menuItems = [
    { icon: <Target className="w-4 h-4 text-white/80" />, label: 'Goals & Training' },
    { icon: <Dumbbell className="w-4 h-4 text-white/80" />, label: 'Equipment' },
    { icon: <Brain className="w-4 h-4 text-[#FF7A32]" />, label: 'Brain & AI' },
    {
      icon: <Scale className="w-4 h-4 text-white/80" />,
      label: 'Units',
      customAction: () => setUnit(unit === 'kg' ? 'lbs' : 'kg'),
      valueLabel: unit.toUpperCase(),
    },
    {
      icon: downloadSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4 text-white/80" />,
      label: downloadSuccess ? 'Data Exported!' : 'Export Data',
      customAction: handleExportData,
    },
    { icon: <Moon className="w-4 h-4 text-white/80" />, label: 'Appearance', valueLabel: 'OLED Black' },
    { icon: <User className="w-4 h-4 text-white/80" />, label: 'Account' },
    { icon: <Shield className="w-4 h-4 text-white/80" />, label: 'Privacy & Data' },
  ];

  return (
    <div className="flex-1 flex flex-col px-4 pt-2 pb-4 text-[#F5F5F5] font-sans overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between py-2 border-b border-white/[0.06] mb-3 shrink-0">
        <ForgeLogo size="sm" />
      </div>

      <div className="mb-2">
        <h1 className="text-xl font-black tracking-tight text-white">Profile</h1>
      </div>

      {/* User Card */}
      <div className="flex flex-col items-center justify-center py-3 mb-3">
        <div className="relative mb-2">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 p-0.5">
            <img
              src={USER_PROFILE.avatar}
              alt={USER_PROFILE.name}
              className="w-full h-full object-cover rounded-full grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <h2 className="text-base font-bold text-white tracking-tight">{USER_PROFILE.name}</h2>
        <p className="text-xs text-[#8E8E93]">{USER_PROFILE.tagline}</p>
      </div>

      {/* 3 Summary metrics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Metric 1 */}
        <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-2.5 flex flex-col justify-between text-center">
          <div className="text-base font-black text-white">{USER_PROFILE.workoutsThisMonth}</div>
          <div className="text-[10px] text-[#8E8E93] mt-1">Workouts</div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-2.5 flex flex-col justify-between text-center">
          <div className="text-base font-black text-white">{USER_PROFILE.consistency}</div>
          <div className="text-[10px] text-[#8E8E93] mt-1">Consistency On target</div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#101012] border border-white/[0.08] rounded-xl p-2.5 flex flex-col justify-between text-center">
          <div className="flex items-center justify-center gap-1 text-base font-black text-white">
            <span>{unit === 'kg' ? '53.0 kg' : '116.8 lbs'}</span>
            <Lock className="w-3 h-3 text-[#8E8E93]" />
          </div>
          <div className="text-[10px] text-[#8E8E93] mt-1">Body Weight Last recorded</div>
        </div>
      </div>

      {/* Menu List */}
      <div className="space-y-1 mb-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.customAction}
            className="w-full bg-[#101012] border border-white/[0.06] hover:border-white/[0.15] rounded-xl px-3 py-2.5 flex items-center justify-between transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center">{item.icon}</div>
              <span className="text-xs font-semibold text-white/90">{item.label}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#8E8E93]">
              {item.valueLabel && <span className="text-[11px] font-mono text-[#FF7A32]">{item.valueLabel}</span>}
              <ChevronRight className="w-3.5 h-3.5 text-[#686868]" />
            </div>
          </button>
        ))}
      </div>

      {/* Version and Sign Out */}
      <div className="flex items-center justify-between text-xs text-[#686868] px-1 pt-2 border-t border-white/[0.06]">
        <span>Version {USER_PROFILE.version}</span>
        <button
          onClick={onSignOut}
          className="text-[#FF7A32] hover:underline font-semibold cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
