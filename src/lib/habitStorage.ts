export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  reminder: boolean;
  createdAt: string;
  streak: number;
  completedDates: string[];
  lastCompleted?: string;
}

export interface HabitCompletion {
  habitId: string;
  date: string;
  completed: boolean;
}

const HABITS_KEY = 'habits';
const COMPLETIONS_KEY = 'habit_completions';

// Get all habits from localStorage
export const getHabits = (): Habit[] => {
  try {
    const habits = localStorage.getItem(HABITS_KEY);
    return habits ? JSON.parse(habits) : [];
  } catch (error) {
    console.error('Error loading habits:', error);
    return [];
  }
};

// Save habits to localStorage
export const saveHabits = (habits: Habit[]): void => {
  try {
    localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error('Error saving habits:', error);
  }
};

// Add a new habit
export const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'streak' | 'completedDates'>): Habit => {
  const newHabit: Habit = {
    ...habitData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    streak: 0,
    completedDates: []
  };
  
  const habits = getHabits();
  habits.push(newHabit);
  saveHabits(habits);
  
  return newHabit;
};

// Update an existing habit
export const updateHabit = (id: string, updates: Partial<Habit>): void => {
  const habits = getHabits();
  const index = habits.findIndex(h => h.id === id);
  
  if (index !== -1) {
    habits[index] = { ...habits[index], ...updates };
    saveHabits(habits);
  }
};

// Delete a habit
export const deleteHabit = (id: string): void => {
  const habits = getHabits().filter(h => h.id !== id);
  saveHabits(habits);
};

// Toggle habit completion for today
export const toggleHabitCompletion = (habitId: string): void => {
  const today = new Date().toDateString();
  const habits = getHabits();
  const habit = habits.find(h => h.id === habitId);
  
  if (!habit) return;
  
  const isCompletedToday = habit.completedDates.includes(today);
  
  if (isCompletedToday) {
    // Remove completion
    habit.completedDates = habit.completedDates.filter(date => date !== today);
    habit.streak = Math.max(0, habit.streak - 1);
  } else {
    // Add completion
    habit.completedDates.push(today);
    habit.lastCompleted = today;
    
    // Calculate streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const wasCompletedYesterday = habit.completedDates.includes(yesterday.toDateString());
    
    if (habit.streak === 0 || wasCompletedYesterday) {
      habit.streak += 1;
    } else {
      habit.streak = 1;
    }
  }
  
  saveHabits(habits);
};

// Get habit completion percentage for a date range
export const getHabitProgress = (habitId: string, days: number = 7): number => {
  const habit = getHabits().find(h => h.id === habitId);
  if (!habit) return 0;
  
  const completedInRange = habit.completedDates.filter(dateStr => {
    const date = new Date(dateStr);
    const today = new Date();
    const daysAgo = new Date();
    daysAgo.setDate(today.getDate() - days);
    
    return date >= daysAgo && date <= today;
  }).length;
  
  return Math.round((completedInRange / days) * 100);
};

// Check if habit is completed today
export const isHabitCompletedToday = (habitId: string): boolean => {
  const habit = getHabits().find(h => h.id === habitId);
  if (!habit) return false;
  
  const today = new Date().toDateString();
  return habit.completedDates.includes(today);
};