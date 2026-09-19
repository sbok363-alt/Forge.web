import { TrainingPlan, WorkoutSession, BrainInsight, BrainChatMessage, VolumeDataPoint, MuscleDistribution } from '../types';

export const INITIAL_ACTIVE_WORKOUT: WorkoutSession = {
  id: 'session-push-today',
  title: 'Push',
  type: 'Hypertrophy',
  date: 'Tue, Sep 16',
  elapsedSeconds: 42,
  estimatedDuration: '~55 min',
  notes: 'Felt strong on the first two sets. Kept tempo controlled on eccentric.',
  exercises: [
    {
      id: 'ex-bench-press',
      name: '1. Barbell Bench Press',
      targetMuscles: 'Chest • Triceps • Front Delts',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&auto=format&fit=crop&q=80',
      previousBenchmark: 'Previous 60 kg x 8 • 4 sets',
      sets: [
        { id: 's1', setNumber: 1, weight: 60, reps: 10, rir: 2, completed: true },
        { id: 's2', setNumber: 2, weight: 60, reps: 9, rir: 2, completed: true },
        { id: 's3', setNumber: 3, weight: 60, reps: 8, rir: 1, completed: true },
        { id: 's4', setNumber: 4, weight: 62.5, reps: 8, rir: 1, completed: false },
      ]
    },
    {
      id: 'ex-incline-db',
      name: '2. Incline DB Press',
      targetMuscles: 'Upper Chest • Triceps • Front Delts',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&auto=format&fit=crop&q=80',
      previousBenchmark: 'Previous 24 kg x 10 • 3 sets',
      sets: [
        { id: 's5', setNumber: 1, weight: 26, reps: 10, rir: 2, completed: false },
        { id: 's6', setNumber: 2, weight: 26, reps: 9, rir: 1, completed: false },
        { id: 's7', setNumber: 3, weight: 26, reps: 8, rir: 0, completed: false },
      ]
    }
  ]
};

export const INITIAL_TRAINING_PLAN: TrainingPlan = {
  id: 'plan-5day-hypertrophy',
  title: '5-Day Hypertrophy',
  status: 'Active',
  subtitle: 'Build muscle. Get stronger. Look better.',
  currentWeek: 4,
  totalWeeks: 8,
  schedule: [
    { day: 'Mon', workout: 'Push' },
    { day: 'Tue', workout: 'Pull' },
    { day: 'Wed', workout: 'Legs' },
    { day: 'Fri', workout: 'Upper' },
    { day: 'Sat', workout: 'Lower' },
  ],
  days: [
    {
      id: 'day-push',
      name: 'Push',
      dayLabel: 'Monday',
      exerciseCount: 5,
      setCount: 15,
      targetMuscles: 'Chest, Shoulders, Triceps',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'day-pull',
      name: 'Pull',
      dayLabel: 'Tuesday',
      exerciseCount: 5,
      setCount: 15,
      targetMuscles: 'Back, Biceps, Rear Delts',
      image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'day-legs',
      name: 'Legs',
      dayLabel: 'Wednesday',
      exerciseCount: 5,
      setCount: 16,
      targetMuscles: 'Quads, Hamstrings, Calves',
      image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'day-upper',
      name: 'Upper',
      dayLabel: 'Friday',
      exerciseCount: 5,
      setCount: 15,
      targetMuscles: 'Full Upper Body',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 'day-lower',
      name: 'Lower',
      dayLabel: 'Saturday',
      exerciseCount: 5,
      setCount: 15,
      targetMuscles: 'Quads, Glutes, Hamstrings',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80'
    }
  ]
};

export const RECENT_SESSIONS = [
  {
    id: 'rec-1',
    title: 'Push',
    date: 'Mon, Sep 16 - 55 min',
    volume: '+8,450 lb',
    volumeKg: '+3,832 kg',
  },
  {
    id: 'rec-2',
    title: 'Pull',
    date: 'Sat, Sep 14 - 60 min',
    volume: '+9,120 lb',
    volumeKg: '+4,136 kg',
  },
  {
    id: 'rec-3',
    title: 'Legs',
    date: 'Thu, Sep 12 - 65 min',
    volume: '+12,300 lb',
    volumeKg: '+5,579 kg',
  }
];

export const INITIAL_BRAIN_INSIGHT: BrainInsight = {
  id: 'insight-bench',
  exercise: 'Bench Press',
  status: 'progressing',
  metric: '+4 reps across 3 sessions',
  detail: 'Your bench press volume has climbed steadily over the last 3 microcycles. 60 kg sets show consistent RIR 1-2 without form breakdown.',
  recommendedAction: 'Stay at 60 kg next session and aim to consolidate 10 reps on sets 2-3 before increasing to 62.5 kg.',
  date: 'Today, 9:41 AM'
};

export const BRAIN_CHAT_SEED: BrainChatMessage[] = [
  {
    id: 'm1',
    sender: 'user',
    text: 'How can I improve my bench press?',
    timestamp: '9:41 AM'
  },
  {
    id: 'm2',
    sender: 'brain',
    text: "Your bench press has improved recently, with +4 total reps across 3 sessions. You're currently working at 60 kg, so I recommend staying at 60 kg next session and aiming for more total reps. This will help build volume and drive continued progress through progressive overload.",
    timestamp: '9:41 AM',
    actionChips: [
      'Show my bench press history',
      'Create a push day variation',
      'Explain progressive overload'
    ]
  }
];

export const BRAIN_PROMPT_SUGGESTIONS = [
  'Review my last workout',
  'What should I improve next?',
  'Adjust today’s workout',
  'Why has my bench stalled?',
  'Show my bench press history',
  'Create a push day variation'
];

export const VOLUME_CHART_DATA_1M: VolumeDataPoint[] = [
  { date: 'Aug 19', volumeKg: 14200, workouts: 3 },
  { date: 'Aug 26', volumeKg: 18400, workouts: 4 },
  { date: 'Sep 2', volumeKg: 20100, workouts: 4 },
  { date: 'Sep 9', volumeKg: 22800, workouts: 4 },
  { date: 'Sep 16', volumeKg: 24320, workouts: 5 },
];

export const VOLUME_CHART_DATA_1W: VolumeDataPoint[] = [
  { date: 'Mon', volumeKg: 3832, workouts: 1 },
  { date: 'Tue', volumeKg: 4136, workouts: 1 },
  { date: 'Wed', volumeKg: 0, workouts: 0 },
  { date: 'Thu', volumeKg: 5579, workouts: 1 },
  { date: 'Fri', volumeKg: 4200, workouts: 1 },
  { date: 'Sat', volumeKg: 3900, workouts: 1 },
  { date: 'Sun', volumeKg: 0, workouts: 0 },
];

export const VOLUME_CHART_DATA_3M: VolumeDataPoint[] = [
  { date: 'Jul', volumeKg: 68400, workouts: 16 },
  { date: 'Aug', volumeKg: 79200, workouts: 18 },
  { date: 'Sep', volumeKg: 88500, workouts: 19 },
];

export const MUSCLE_DISTRIBUTION: MuscleDistribution[] = [
  { name: 'Back', percentage: 28, sets: 48, color: '#FF7A32' },
  { name: 'Legs', percentage: 24, sets: 42, color: '#FF9457' },
  { name: 'Chest', percentage: 18, sets: 32, color: '#FFA875' },
  { name: 'Shoulders', percentage: 16, sets: 28, color: '#FFBC94' },
  { name: 'Arms', percentage: 14, sets: 24, color: '#FFD2B8' },
];

export const USER_PROFILE = {
  name: 'Samuel',
  tagline: 'Keep building.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  workoutsThisMonth: 12,
  consistency: 5,
  consistencyStatus: 'On target',
  bodyWeight: '53.0 kg',
  bodyWeightLocked: true,
  trainingVolumeMonth: '24,320 kg',
  volumeIncrease: '+8.4%',
  strengthTrend: '+6.8%',
  prsThisMonth: 5,
  currentWeek: 4,
  version: '1.0.0'
};
