import { ActivityFeedItem, ExerciseItem, HydrationLog, MealItem } from '../types';

export const APP_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1XXVlccAtkky6TZjth262XJob5uGETq22o9FpYzmjbF0KZJDjE6cNlHE24rSDFHUKAmgeApsQv-DHM8oyV-Gf9u8Cri8hqQmKu7Bf9bfVvpTB30-VuyInvsaAvShT_pb5MqAFOqca2nZRi_hooObVdq_9VZpbcVAz1sJ58ufYl8oaxI3d2QTg7uhdUfTbdfhhXcKfWtdEqXdlhWMYdY_aZ0lcVcKGHJTCYm6FtZpgt95O6XzDUBBAYj-gM';

export const INITIAL_EXERCISES: ExerciseItem[] = [
  {
    id: 'ex-1',
    name: 'Barbell Bench Press',
    target: 'Chest',
    subtitle: 'Chest • 4 sets x 10 reps @ 185 lbs',
    sets: [
      { id: 's1', setNumber: 1, lbs: 185, reps: 10, done: true },
      { id: 's2', setNumber: 2, lbs: 185, reps: 10, done: true },
      { id: 's3', setNumber: 3, lbs: 185, reps: 10, done: false },
      { id: 's4', setNumber: 4, lbs: 185, reps: 8, done: false },
    ],
  },
  {
    id: 'ex-2',
    name: 'Incline Dumbbell Press',
    target: 'Upper Chest',
    subtitle: 'Upper Chest • 3 sets x 12 reps @ 65 lbs',
    sets: [
      { id: 's5', setNumber: 1, lbs: 65, reps: 12, done: true },
      { id: 's6', setNumber: 2, lbs: 65, reps: 12, done: true },
      { id: 's7', setNumber: 3, lbs: 65, reps: 10, done: false },
    ],
  },
];

export const INITIAL_MEALS: MealItem[] = [
  {
    id: 'meal-1',
    type: 'Breakfast',
    name: 'Oatmeal & Berries',
    calories: 420,
    protein: 18,
    carbs: 68,
    fats: 8,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4lrKEL7BJLdSkpM4n2ybZfxILanAL1Zoz7bC9bTnMO2lQnvPKiDliQI_f9pKMxCDKRkh70TnqsJ5CaIAyP8UAacl3iPwGYELCOQn3RIlqR7syIj9of-rxA6lUNlE_JrDnbLpWkOXVjCLTwxGxEQXx43B3X-2CuVBD1F8bsFVaqvACZbWxgqShHWJxSJI2d2ky_FekStr25lZ33eg4gGXzWRKqBP8DjFW3HrNax9po-TUEWzLsXjS2',
    logged: true,
  },
  {
    id: 'meal-2',
    type: 'Lunch',
    name: 'Grilled Chicken Salad',
    calories: 550,
    protein: 48,
    carbs: 32,
    fats: 22,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQQBQ99nfj3zk33NkNPqlPgX227w9518VuT-QwMRq5B9XcZzwrTHLGnFJNc1BAxxLNaxstFcG6jqShznzM-Pe35P_hy7ZAycLUxjL5dOM3DuukovV8aeu4buBbaGbtJFC97bVkiRXeGn_peb6OOoUzFzyOIxMWwvW30YBZlfUunh8UltqWzfbpTGVujG5oBQok3zSgs1JS0RQdTZ6rsHKX73QKR2JVQ8pFvp2dcawvWc-wpekIKUsG',
    logged: true,
  },
  {
    id: 'meal-3',
    type: 'Dinner',
    name: 'Not logged yet',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    logged: false,
  },
  {
    id: 'meal-4',
    type: 'Snacks',
    name: 'Greek Yogurt & Almonds',
    calories: 280,
    protein: 22,
    carbs: 18,
    fats: 14,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9pQ3z9oBJI0fJaqP9DFuQ9xsH-0qxpousBadpbyJ2Gcmev6WahkpPJQm3skun_Q895BZ0uuiY6BhLh8QvTkKAqRNzztxeBFBU393h45aafbJOo3__i4n9-2GcQq3w_EdyArawBtXw5jsmxoAtTg5mgyvvIX05STFCwY0QpU0G6MLj_BxNgSxSGdJEsuuPr_GD2ncsEkXdqMB9mRnrzgV6y3ZSV52R2u9ibUDyUkPd91cryKQc8di4',
    logged: true,
  },
];

export const INITIAL_HYDRATION_LOGS: HydrationLog[] = [
  {
    id: 'water-1',
    title: 'Morning Refresh',
    time: '08:30 AM',
    description: 'Pure mineral water',
    amount: 500,
    icon: 'water_drop',
  },
  {
    id: 'water-2',
    title: 'Post Workout',
    time: '11:15 AM',
    description: 'Electrolyte infused',
    amount: 750,
    icon: 'local_drink',
  },
  {
    id: 'water-3',
    title: 'Lunch Pairing',
    time: '01:45 PM',
    description: 'Sparkling lemon water',
    amount: 500,
    icon: 'coffee',
  },
  {
    id: 'water-4',
    title: 'Afternoon Boost',
    time: '04:00 PM',
    description: 'Cold filtered water',
    amount: 500,
    icon: 'water_drop',
  },
];

export const RECENT_ACTIVITIES: ActivityFeedItem[] = [
  {
    id: 'act-1',
    title: 'Morning Run',
    timeSubtitle: 'Today, 7:15 AM • 5.2 km',
    metric: '312 kcal',
    secondaryMetric: '28m 42s',
    icon: 'directions_run',
    colorType: 'primary',
  },
  {
    id: 'act-2',
    title: 'Post-Workout Meal',
    timeSubtitle: 'Today, 1:00 PM • High Protein',
    metric: '650 kcal',
    secondaryMetric: '45g P / 60g C',
    icon: 'restaurant',
    colorType: 'secondary',
  },
  {
    id: 'act-3',
    title: 'Water Intake Log',
    timeSubtitle: 'Today, 11:30 AM',
    metric: '+500 ml',
    secondaryMetric: '2,250 / 3,000 ml',
    icon: 'water_drop',
    colorType: 'tertiary',
  },
];
