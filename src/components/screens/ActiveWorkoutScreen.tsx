import React, { useState, useEffect } from 'react';
import { ChevronLeft, MoreHorizontal, Plus, Check, Play, Pause, RotateCcw } from 'lucide-react';
import { WorkoutSession, WorkoutSet } from '../../types';
import { INITIAL_ACTIVE_WORKOUT } from '../../data/mockData';

interface ActiveWorkoutScreenProps {
  onBack: () => void;
  onFinish: (workout: WorkoutSession) => void;
}

export const ActiveWorkoutScreen: React.FC<ActiveWorkoutScreenProps> = ({
  onBack,
  onFinish,
}) => {
  const [workout, setWorkout] = useState<WorkoutSession>(INITIAL_ACTIVE_WORKOUT);
  const [activeTab, setActiveTab] = useState<'workout' | 'notes'>('workout');
  const [elapsed, setElapsed] = useState(42);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Rest Timer state
  const [restSeconds, setRestSeconds] = useState(120); // 02:00
  const [isRestRunning, setIsRestRunning] = useState(false);

  // Elapsed workout timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Rest countdown timer
  useEffect(() => {
    let restInterval: NodeJS.Timeout;
    if (isRestRunning && restSeconds > 0) {
      restInterval = setInterval(() => {
        setRestSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(restInterval);
  }, [isRestRunning, restSeconds]);

  const formatElapsed = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatRest = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Toggle set completion
  const handleToggleSet = (exerciseId: string, setId: string) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets: ex.sets.map((set) => {
            if (set.id !== setId) return set;
            const newCompleted = !set.completed;
            if (newCompleted) {
              // start rest timer
              setRestSeconds(120);
              setIsRestRunning(true);
            }
            return { ...set, completed: newCompleted };
          }),
        };
      }),
    }));
  };

  // Change weight or reps
  const handleUpdateSetValue = (
    exerciseId: string,
    setId: string,
    field: 'weight' | 'reps' | 'rir',
    value: number
  ) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        return {
          ...ex,
          sets: ex.sets.map((set) => {
            if (set.id !== setId) return set;
            return { ...set, [field]: value };
          }),
        };
      }),
    }));
  };

  // Add Set to exercise
  const handleAddSet = (exerciseId: string) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        const lastSet = ex.sets[ex.sets.length - 1];
        const newSet: WorkoutSet = {
          id: `set-${Date.now()}`,
          setNumber: ex.sets.length + 1,
          weight: lastSet ? lastSet.weight : 60,
          reps: lastSet ? lastSet.reps : 8,
          rir: 1,
          completed: false,
        };
        return {
          ...ex,
          sets: [...ex.sets, newSet],
        };
      }),
    }));
  };

  // Log next available set
  const handleLogNextSet = () => {
    let logged = false;
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex) => {
        if (logged) return ex;
        const uncompleted = ex.sets.find((s) => !s.completed);
        if (uncompleted) {
          logged = true;
          setRestSeconds(120);
          setIsRestRunning(true);
          return {
            ...ex,
            sets: ex.sets.map((s) => (s.id === uncompleted.id ? { ...s, completed: true } : s)),
          };
        }
        return ex;
      }),
    }));
  };

  return (
    <div className="flex-1 flex flex-col bg-[#050505] text-[#F5F5F5] font-sans h-full overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.08] bg-[#0A0A0B] shrink-0">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:bg-white/[0.08] cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-sm font-black text-white leading-tight flex items-center gap-1">
              {workout.title}
            </div>
            <div className="text-[10px] text-[#8E8E93]">
              Today • {workout.type}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Workout elapsed timer */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.07] border border-white/[0.1] text-xs font-mono font-medium text-white/90">
            <span className="w-2 h-2 rounded-full bg-[#FF7A32] animate-pulse" />
            <span>{formatElapsed(elapsed)}</span>
          </div>

          <button
            onClick={() => onFinish(workout)}
            className="px-3 py-1 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Finish
          </button>
        </div>
      </div>

      {/* Workout / Notes sub tabs */}
      <div className="flex px-4 pt-2.5 pb-2 bg-[#080809] border-b border-white/[0.05] shrink-0">
        <div className="flex p-1 bg-[#121214] rounded-xl border border-white/[0.07] w-full">
          <button
            onClick={() => setActiveTab('workout')}
            className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'workout'
                ? 'bg-white text-black shadow-sm'
                : 'text-[#8E8E93] hover:text-white'
            }`}
          >
            Workout
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-white text-black shadow-sm'
                : 'text-[#8E8E93] hover:text-white'
            }`}
          >
            Notes
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-4">
        {activeTab === 'workout' ? (
          <>
            {workout.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-[#101012] border border-white/[0.08] rounded-2xl p-3.5"
              >
                {/* Exercise Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    {exercise.image && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/50 shrink-0">
                        <img
                          src={exercise.image}
                          alt={exercise.name}
                          className="w-full h-full object-cover grayscale brightness-90"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-tight leading-tight">
                        {exercise.name}
                      </h3>
                      <p className="text-[10px] text-[#8E8E93]">
                        {exercise.targetMuscles}
                      </p>
                    </div>
                  </div>
                  <button className="text-[#8E8E93] hover:text-white p-1 cursor-pointer">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Sets Table Header */}
                <div className="grid grid-cols-12 gap-1 text-[10px] font-semibold text-[#8E8E93] uppercase tracking-wider pb-1.5 border-b border-white/[0.06] text-center">
                  <div className="col-span-2 text-left pl-1">Set</div>
                  <div className="col-span-3">Weight (kg)</div>
                  <div className="col-span-3">Reps</div>
                  <div className="col-span-2">RIR</div>
                  <div className="col-span-2 text-right pr-1">Done</div>
                </div>

                {/* Sets Rows */}
                <div className="space-y-1.5 pt-2">
                  {exercise.sets.map((set) => (
                    <div
                      key={set.id}
                      className={`grid grid-cols-12 gap-1 items-center py-1.5 px-1 rounded-xl text-xs transition-colors ${
                        set.completed
                          ? 'bg-white/[0.03] text-white/90'
                          : 'bg-transparent text-white'
                      }`}
                    >
                      {/* Set Number */}
                      <div className="col-span-2 font-mono font-bold text-left pl-1 text-[#8E8E93]">
                        {set.setNumber}
                      </div>

                      {/* Weight */}
                      <div className="col-span-3 text-center">
                        <input
                          type="number"
                          value={set.weight}
                          onChange={(e) =>
                            handleUpdateSetValue(
                              exercise.id,
                              set.id,
                              'weight',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-14 py-1 text-center font-mono font-semibold bg-black/40 border border-white/[0.1] rounded-lg text-white focus:border-[#FF7A32] outline-none"
                        />
                      </div>

                      {/* Reps */}
                      <div className="col-span-3 text-center">
                        <input
                          type="number"
                          value={set.reps}
                          onChange={(e) =>
                            handleUpdateSetValue(
                              exercise.id,
                              set.id,
                              'reps',
                              parseInt(e.target.value, 10) || 0
                            )
                          }
                          className="w-12 py-1 text-center font-mono font-semibold bg-black/40 border border-white/[0.1] rounded-lg text-white focus:border-[#FF7A32] outline-none"
                        />
                      </div>

                      {/* RIR */}
                      <div className="col-span-2 text-center">
                        <input
                          type="number"
                          value={set.rir}
                          onChange={(e) =>
                            handleUpdateSetValue(
                              exercise.id,
                              set.id,
                              'rir',
                              parseInt(e.target.value, 10) || 0
                            )
                          }
                          className="w-10 py-1 text-center font-mono text-[#A3A3A3] bg-black/40 border border-white/[0.08] rounded-lg text-white focus:border-[#FF7A32] outline-none"
                        />
                      </div>

                      {/* Completed Toggle */}
                      <div className="col-span-2 flex justify-end pr-1">
                        <button
                          onClick={() => handleToggleSet(exercise.id, set.id)}
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                            set.completed
                              ? 'bg-[#FF7A32] text-black shadow-sm shadow-[#FF7A32]/50'
                              : 'border border-white/25 hover:border-white/50 bg-black/30'
                          }`}
                        >
                          {set.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Set Button */}
                <button
                  onClick={() => handleAddSet(exercise.id)}
                  className="w-full mt-2.5 py-1.5 rounded-xl border border-dashed border-white/[0.15] hover:border-white/[0.3] text-xs font-semibold text-[#A3A3A3] hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Set</span>
                </button>

                {/* Previous Benchmark comparison box */}
                {exercise.previousBenchmark && (
                  <div className="mt-2.5 px-3 py-2 rounded-xl bg-black/50 border border-white/[0.06] flex items-center justify-between text-[11px] text-[#8E8E93]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#FF7A32] font-mono">📊</span>
                      <span>{exercise.previousBenchmark}</span>
                    </div>
                    <span className="text-[#A3A3A3]">&gt;</span>
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          /* Notes Tab */
          <div className="bg-[#101012] border border-white/[0.08] rounded-2xl p-4">
            <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">
              Session Notes
            </h4>
            <textarea
              value={workout.notes || ''}
              onChange={(e) => setWorkout((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Record form cues, fatigue levels, caffeine intake..."
              rows={6}
              className="w-full p-3 rounded-xl bg-black/60 border border-white/[0.1] text-xs text-white placeholder-[#686868] focus:border-[#FF7A32] outline-none resize-none font-sans"
            />
          </div>
        )}
      </div>

      {/* Bottom Gym Bar: Rest Timer & Log Set */}
      <div className="p-3 bg-[#0A0A0B] border-t border-white/[0.1] flex items-center justify-between gap-3 shrink-0">
        {/* Rest Timer display */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#141416] border border-white/[0.08]">
          <button
            onClick={() => setIsRestRunning(!isRestRunning)}
            className="w-6 h-6 rounded-full bg-white/[0.08] hover:bg-white/[0.15] flex items-center justify-center text-white cursor-pointer"
          >
            {isRestRunning ? (
              <Pause className="w-3 h-3 text-[#FF7A32]" />
            ) : (
              <Play className="w-3 h-3 ml-0.5" />
            )}
          </button>
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-wider text-[#8E8E93]">
              Rest Timer
            </div>
            <div className="text-xs font-mono font-bold text-white">
              {formatRest(restSeconds)}
            </div>
          </div>
          <button
            onClick={() => {
              setRestSeconds(120);
              setIsRestRunning(false);
            }}
            className="text-[#686868] hover:text-white ml-1 cursor-pointer"
            title="Reset Rest Timer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Big Orange Log Set Button */}
        <button
          onClick={handleLogNextSet}
          className="flex-1 py-3 px-4 rounded-2xl bg-[#FF7A32] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#FF8847] active:scale-[0.98] shadow-lg shadow-[#FF7A32]/40 transition-all cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Log Set</span>
        </button>
      </div>
    </div>
  );
};
