import { Link } from 'react-router-dom';
import { ArrowRight, Target, TrendingUp, Calendar, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className="animate-float mb-8">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto shadow-glow">
                <Target className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Build Better Habits
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Everyday
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your life one habit at a time. Track progress, build streaks, 
              and stay motivated on your journey to becoming your best self.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="btn-hero group">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/add-habit">
                <Button 
                  variant="outline" 
                  className="px-8 py-4 rounded-xl font-semibold transition-smooth hover:scale-105 transform"
                >
                  Create Your First Habit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything you need to build lasting habits
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple, powerful tools to help you stay consistent and motivated
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: 'Goal Tracking',
                description: 'Set meaningful goals and track your daily progress with beautiful visualizations'
              },
              {
                icon: TrendingUp,
                title: 'Streak Counter',
                description: 'Build momentum with streak tracking that motivates you to keep going'
              },
              {
                icon: Calendar,
                title: 'Progress Reports',
                description: 'Analyze your habits with detailed weekly and monthly progress reports'
              },
              {
                icon: Bell,
                title: 'Smart Reminders',
                description: 'Never miss a habit with customizable reminders that fit your schedule'
              }
            ].map((feature, index) => (
              <div key={index} className="habit-card text-center group">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse-glow">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to transform your life?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join thousands of people who are building better habits and achieving their goals.
          </p>
          
          <Link to="/dashboard">
            <Button className="btn-hero group text-lg px-12 py-6">
              Start Your Journey
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;