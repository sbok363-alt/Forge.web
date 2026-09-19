export interface WorkoutSet {
  id: string;
  setNumber: number;
  weight: number;
  reps: number;
  rir: number;
  completed: boolean;
  previous?: string;
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscles: string;
  image?: string;
  sets: WorkoutSet[];
  previousBenchmark?: string;
}

export interface WorkoutSession {
  id: string;
  title: string;
  type: string;
  date: string;
  elapsedSeconds: number;
  estimatedDuration: string;
  exercises: Exercise[];
  notes?: string;
  isCompleted?: boolean;
}

export interface WorkoutPlanDay {
  id: string;
  name: string;
  dayLabel: string;
  exerciseCount: number;
  setCount: number;
  targetMuscles: string;
  image?: string;
}

export interface TrainingPlan {
  id: string;
  title: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  subtitle: string;
  currentWeek: number;
  totalWeeks: number;
  days: WorkoutPlanDay[];
  schedule: { day: string; workout: string }[];
}

export interface BrainInsight {
  id: string;
  exercise: string;
  status: string;
  metric: string;
  detail: string;
  recommendedAction: string;
  date: string;
}

export interface BrainChatMessage {
  id: string;
  sender: 'user' | 'brain';
  text: string;
  timestamp: string;
  actionChips?: string[];
}

export interface VolumeDataPoint {
  date: string;
  volumeKg: number;
  workouts: number;
}

export interface MuscleDistribution {
  name: string;
  percentage: number;
  sets: number;
  color?: string;
}

export type AppTab = 'home' | 'workouts' | 'brain' | 'stats' | 'profile';
export type TimeFilter = '1W' | '1M' | '3M' | '1Y' | 'All';
