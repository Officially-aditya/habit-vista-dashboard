import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Target, Award } from 'lucide-react';
import { getHabits, Habit, getHabitProgress } from '@/lib/habitStorage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Reports = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    setHabits(getHabits());
  }, []);

  const getHabitStats = (habit: Habit, days: number) => {
    const progress = getHabitProgress(habit.id, days);
    const completedDays = habit.completedDates.filter(dateStr => {
      const date = new Date(dateStr);
      const today = new Date();
      const daysAgo = new Date();
      daysAgo.setDate(today.getDate() - days);
      return date >= daysAgo && date <= today;
    }).length;
    
    return { progress, completedDays };
  };

  const totalHabits = habits.length;
  const weeklyDays = 7;
  const monthlyDays = 30;
  
  const weeklyStats = habits.map(habit => ({
    ...habit,
    ...getHabitStats(habit, weeklyDays)
  }));
  
  const monthlyStats = habits.map(habit => ({
    ...habit,
    ...getHabitStats(habit, monthlyDays)
  }));

  const currentStats = selectedPeriod === 'weekly' ? weeklyStats : monthlyStats;
  const currentDays = selectedPeriod === 'weekly' ? weeklyDays : monthlyDays;
  
  const avgProgress = currentStats.length > 0 
    ? Math.round(currentStats.reduce((sum, habit) => sum + habit.progress, 0) / currentStats.length)
    : 0;
    
  const totalCompletedDays = currentStats.reduce((sum, habit) => sum + habit.completedDays, 0);
  const perfectHabits = currentStats.filter(habit => habit.progress === 100).length;

  if (habits.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 opacity-50">
              <TrendingUp className="w-12 h-12 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              No data to report yet
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Start tracking some habits to see your progress and insights here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Progress Reports</h1>
          <p className="text-xl text-muted-foreground">
            Track your habit consistency and celebrate your wins
          </p>
        </div>

        {/* Time Period Tabs */}
        <Tabs value={selectedPeriod} onValueChange={(value: 'weekly' | 'monthly') => setSelectedPeriod(value)} className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Weekly Stats Cards */}
              <Card className="bg-gradient-card shadow-medium border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Weekly Average
                  </CardTitle>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{avgProgress}%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    across all habits
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-medium border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Days Completed
                  </CardTitle>
                  <Calendar className="h-5 w-5 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">{totalCompletedDays}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    out of {totalHabits * weeklyDays} possible
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-medium border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Perfect Habits
                  </CardTitle>
                  <Award className="h-5 w-5 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">{perfectHabits}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    100% completion rate
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-medium border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Habits
                  </CardTitle>
                  <Target className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{totalHabits}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    being tracked
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Monthly Stats Cards */}
              <Card className="bg-gradient-card shadow-medium border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Monthly Average
                  </CardTitle>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{avgProgress}%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    across all habits
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-medium border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Days Completed
                  </CardTitle>
                  <Calendar className="h-5 w-5 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">{totalCompletedDays}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    out of {totalHabits * monthlyDays} possible
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-medium border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Perfect Habits
                  </CardTitle>
                  <Award className="h-5 w-5 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">{perfectHabits}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    100% completion rate
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-medium border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Habits
                  </CardTitle>
                  <Target className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{totalHabits}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    being tracked
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Individual Habit Progress */}
        <Card className="bg-gradient-card shadow-medium border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <span>Individual Habit Progress ({selectedPeriod})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {currentStats.map((habit) => (
                <div key={habit.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{habit.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {habit.completedDays} of {currentDays} days completed
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{habit.progress}%</div>
                      <div className="text-sm text-muted-foreground">
                        {habit.streak} day streak
                      </div>
                    </div>
                  </div>
                  <Progress value={habit.progress} className="h-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;