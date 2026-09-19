import React, { useState, useEffect } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { WorkoutsScreen } from './screens/WorkoutsScreen';
import { BrainScreen } from './screens/BrainScreen';
import { StatsScreen } from './screens/StatsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ActiveWorkoutScreen } from './screens/ActiveWorkoutScreen';
import { LiquidNav } from './LiquidNav';
import { PhoneFrame } from './PhoneFrame';
import { AppTab, WorkoutSession } from '../types';
import { INITIAL_ACTIVE_WORKOUT } from '../data/mockData';
import { ArrowLeft, Maximize2, Minimize2, Sparkles, Smartphone, Monitor } from 'lucide-react';
import { ForgeLogo } from './ForgeLogo';

interface AppShellProps {
  initialTab?: AppTab;
  onExitToLanding: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  initialTab = 'home',
  onExitToLanding,
}) => {
  const [activeTab, setActiveTab] = useState<AppTab>(initialTab);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [activeWorkoutData, setActiveWorkoutData] = useState<WorkoutSession>(INITIAL_ACTIVE_WORKOUT);
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  // Persistence in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('forge_active_workout');
    if (saved) {
      try {
        setActiveWorkoutData(JSON.parse(saved));
      } catch (e) {
        // ignore parse error
      }
    }
  }, []);

  const handleStartWorkout = (workoutName?: string) => {
    if (workoutName) {
      setActiveWorkoutData((prev) => ({
        ...prev,
        title: workoutName,
        elapsedSeconds: 0,
      }));
    }
    setIsWorkoutActive(true);
  };

  const handleFinishWorkout = (completed: WorkoutSession) => {
    localStorage.setItem('forge_last_completed_workout', JSON.stringify(completed));
    setIsWorkoutActive(false);
    setActiveTab('stats');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] flex flex-col font-sans">
      {/* Top Application Bar with Navigation back to Landing & View Mode Switcher */}
      <div className="bg-[#08080A] border-b border-white/[0.08] px-4 py-2.5 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitToLanding}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-[#A3A3A3] hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit to Landing Page</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/[0.1]">
            <ForgeLogo size="sm" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF7A32] bg-[#FF7A32]/10 px-2 py-0.5 rounded-full border border-[#FF7A32]/20">
              Live Product Environment
            </span>
          </div>
        </div>

        {/* View Mode Switcher for Desktop */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceFrameMode(!deviceFrameMode)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-xs text-[#A3A3A3] hover:text-white transition-colors cursor-pointer"
            title="Toggle Device Frame"
          >
            {deviceFrameMode ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span>Full Width</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Phone Shell</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleStartWorkout('Push')}
            className="px-3 py-1 rounded-full bg-[#FF7A32] text-black text-xs font-bold hover:bg-[#FF8847] transition-all cursor-pointer"
          >
            Quick Gym Log
          </button>
        </div>
      </div>

      {/* App Workspace Body */}
      <div className="flex-1 flex items-center justify-center p-0 sm:p-6 bg-[#050505] relative overflow-hidden">
        {/* Subtle orange background aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] radial-forge-glow opacity-60 pointer-events-none" />

        {deviceFrameMode ? (
          /* Phone Frame Container */
          <div className="w-full max-w-[390px] py-4">
            <PhoneFrame glow={true} className="h-[760px]">
              {isWorkoutActive ? (
                <ActiveWorkoutScreen
                  onBack={() => setIsWorkoutActive(false)}
                  onFinish={handleFinishWorkout}
                />
              ) : (
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                  <div className="flex-1 flex flex-col overflow-y-auto">
                    {activeTab === 'home' && (
                      <HomeScreen
                        onStartWorkout={() => handleStartWorkout('Push')}
                        onNavigateTab={(tab) => setActiveTab(tab)}
                      />
                    )}
                    {activeTab === 'workouts' && (
                      <WorkoutsScreen
                        onStartWorkout={(name) => handleStartWorkout(name)}
                        onNavigateTab={(tab) => setActiveTab(tab)}
                      />
                    )}
                    {activeTab === 'brain' && (
                      <BrainScreen onNavigateTab={(tab) => setActiveTab(tab)} />
                    )}
                    {activeTab === 'stats' && (
                      <StatsScreen onNavigateTab={(tab) => setActiveTab(tab)} />
                    )}
                    {activeTab === 'profile' && (
                      <ProfileScreen
                        onSignOut={onExitToLanding}
                        onNavigateTab={(tab) => setActiveTab(tab)}
                      />
                    )}
                  </div>

                  <LiquidNav
                    activeTab={activeTab}
                    onTabChange={(tab) => setActiveTab(tab)}
                  />
                </div>
              )}
            </PhoneFrame>
          </div>
        ) : (
          /* Responsive Full Width Container */
          <div className="w-full max-w-xl h-[800px] bg-[#0A0A0C] border border-white/[0.1] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            {isWorkoutActive ? (
              <ActiveWorkoutScreen
                onBack={() => setIsWorkoutActive(false)}
                onFinish={handleFinishWorkout}
              />
            ) : (
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="flex-1 flex flex-col overflow-y-auto">
                  {activeTab === 'home' && (
                    <HomeScreen
                      onStartWorkout={() => handleStartWorkout('Push')}
                      onNavigateTab={(tab) => setActiveTab(tab)}
                    />
                  )}
                  {activeTab === 'workouts' && (
                    <WorkoutsScreen
                      onStartWorkout={(name) => handleStartWorkout(name)}
                      onNavigateTab={(tab) => setActiveTab(tab)}
                    />
                  )}
                  {activeTab === 'brain' && (
                    <BrainScreen onNavigateTab={(tab) => setActiveTab(tab)} />
                  )}
                  {activeTab === 'stats' && (
                    <StatsScreen onNavigateTab={(tab) => setActiveTab(tab)} />
                  )}
                  {activeTab === 'profile' && (
                    <ProfileScreen
                      onSignOut={onExitToLanding}
                      onNavigateTab={(tab) => setActiveTab(tab)}
                    />
                  )}
                </div>

                <LiquidNav
                  activeTab={activeTab}
                  onTabChange={(tab) => setActiveTab(tab)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
