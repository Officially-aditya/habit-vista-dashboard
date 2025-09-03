import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Target, Bell, Calendar } from 'lucide-react';
import { addHabit } from '@/lib/habitStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const AddHabit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'daily' as 'daily' | 'weekly',
    reminder: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a habit name",
        variant: "destructive"
      });
      return;
    }

    try {
      addHabit(formData);
      toast({
        title: "Success!",
        description: "Your new habit has been created",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create habit. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            size="sm"
            className="rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div>
            <h1 className="text-4xl font-bold text-foreground">Create New Habit</h1>
            <p className="text-muted-foreground mt-2">
              Build a new habit that will help you reach your goals
            </p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="bg-gradient-card shadow-medium border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <span>Habit Details</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Habit Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Habit Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g., Read for 30 minutes, Exercise, Meditate..."
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="rounded-xl border-border focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground">
                  Choose a clear, specific name for your habit
                </p>
              </div>

              {/* Frequency */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Frequency</span>
                </Label>
                <Select 
                  value={formData.frequency} 
                  onValueChange={(value: 'daily' | 'weekly') => handleInputChange('frequency', value)}
                >
                  <SelectTrigger className="rounded-xl border-border">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  How often do you want to practice this habit?
                </p>
              </div>

              {/* Reminder Toggle */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>Enable Reminders</span>
                </Label>
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={formData.reminder}
                    onCheckedChange={(checked) => handleInputChange('reminder', checked)}
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.reminder ? 'Reminders enabled' : 'No reminders'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get notified to help you stay consistent with your habit
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button type="submit" className="btn-hero w-full">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Habit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-8 bg-success-light border-success/20">
          <CardHeader>
            <CardTitle className="text-success flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Tips for Success</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid gap-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-success-foreground/80">
                  <strong>Start small:</strong> Begin with a habit that takes 2-5 minutes daily
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-success-foreground/80">
                  <strong>Be specific:</strong> Instead of "exercise", try "walk for 15 minutes"
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-success-foreground/80">
                  <strong>Stack habits:</strong> Pair your new habit with an existing routine
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddHabit;