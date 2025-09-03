import { useState } from 'react';
import { Edit2, Trash2, Check, Target } from 'lucide-react';
import { Habit, toggleHabitCompletion, isHabitCompletedToday, deleteHabit } from '@/lib/habitStorage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HabitCardProps {
  habit: Habit;
  onUpdate: () => void;
  onEdit: (habit: Habit) => void;
}

const HabitCard = ({ habit, onUpdate, onEdit }: HabitCardProps) => {
  const [isCompleted, setIsCompleted] = useState(isHabitCompletedToday(habit.id));
  
  const handleToggleCompletion = () => {
    toggleHabitCompletion(habit.id);
    setIsCompleted(!isCompleted);
    onUpdate();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      deleteHabit(habit.id);
      onUpdate();
    }
  };

  const progressPercentage = habit.completedDates.length > 0 
    ? Math.min(100, (habit.streak / 30) * 100)
    : 0;

  return (
    <div className="habit-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleToggleCompletion}
            variant={isCompleted ? "default" : "outline"}
            size="sm"
            className={`rounded-full w-10 h-10 p-0 ${
              isCompleted 
                ? 'bg-gradient-success hover:bg-gradient-success shadow-success' 
                : 'hover:bg-accent'
            }`}
          >
            {isCompleted ? (
              <Check className="w-5 h-5" />
            ) : (
              <Target className="w-5 h-5" />
            )}
          </Button>
          
          <div>
            <h3 className="font-semibold text-lg text-foreground">{habit.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {habit.frequency}
              </Badge>
              {habit.reminder && (
                <Badge variant="outline" className="text-xs">
                  Reminder On
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button
            onClick={() => onEdit(habit)}
            variant="outline"
            size="sm"
            className="rounded-xl"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleDelete}
            variant="outline"
            size="sm"
            className="rounded-xl text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">Current Streak</span>
          <span className="text-2xl font-bold text-primary">{habit.streak} days</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium text-foreground">{progressPercentage}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        {habit.lastCompleted && (
          <p className="text-xs text-muted-foreground">
            Last completed: {new Date(habit.lastCompleted).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default HabitCard;