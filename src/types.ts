export type TabType = 'home' | 'workout' | 'diet' | 'water' | 'health';

export interface ExerciseSet {
  id: string;
  setNumber: number;
  lbs: number;
  reps: number;
  done: boolean;
}

export interface ExerciseItem {
  id: string;
  name: string;
  target: string;
  subtitle: string;
  sets: ExerciseSet[];
}

export interface MealItem {
  id: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  imageUrl?: string;
  logged: boolean;
}

export interface HydrationLog {
  id: string;
  title: string;
  time: string;
  description: string;
  amount: number;
  icon: string;
}

export interface ActivityFeedItem {
  id: string;
  title: string;
  timeSubtitle: string;
  metric: string;
  secondaryMetric: string;
  icon: string;
  colorType: 'primary' | 'secondary' | 'tertiary';
}
