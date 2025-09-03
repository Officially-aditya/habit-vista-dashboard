import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Target, TrendingUp, Calendar } from 'lucide-react';
import { getHabits, Habit } from '@/lib/habitStorage';
import HabitCard from '@/components/HabitCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = () => {
    setHabits(getHabits());
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    // In a real app, this would open a modal or navigate to edit page
    // For now, we'll just log it
    console.log('Edit habit:', habit);
  };

  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => 
    habit.completedDates.includes(new Date().toDateString())
  ).length;
  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  const averageProgress = totalHabits > 0 
    ? Math.round(habits.reduce((sum, habit) => sum + (habit.streak / 30 * 100), 0) / totalHabits)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              Keep up the great work! Here's your progress overview.
            </p>
          </div>
          
          <Link to="/add-habit">
            <Button className="btn-hero mt-4 sm:mt-0">
              <Plus className="w-5 h-5 mr-2" />
              Add New Habit
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card shadow-medium border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Habits
              </CardTitle>
              <Target className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalHabits}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Today
              </CardTitle>
              <Calendar className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{completedToday}</div>
              <p className="text-xs text-muted-foreground mt-1">
                of {totalHabits} habits
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Streak Days
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{totalStreak}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-medium border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Progress
              </CardTitle>
              <Target className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{averageProgress}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Habits List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Your Habits</h2>
            {habits.length > 0 && (
              <Link to="/reports">
                <Button variant="outline" className="rounded-xl">
                  View Reports
                </Button>
              </Link>
            )}
          </div>

          {habits.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 opacity-50">
                <Target className="w-12 h-12 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No habits yet
              </h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start building better habits today. Create your first habit to begin your journey.
              </p>
              <Link to="/add-habit">
                <Button className="btn-hero">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Habit
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onUpdate={loadHabits}
                  onEdit={handleEditHabit}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;