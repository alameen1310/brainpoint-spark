import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoginCard from '@/components/auth/LoginCard';
import { UserRole } from '@/types/school';
import { Trophy, Star, Zap, Target, Users, Award } from 'lucide-react';

export default function Landing() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();

  const handleLogin = (role: UserRole, credentials: { schoolId: string; password: string }) => {
    // In a real app, this would authenticate with backend
    // For demo, we'll just navigate to the appropriate dashboard
    localStorage.setItem('currentUser', JSON.stringify({ role, ...credentials }));
    
    switch (role) {
      case 'student':
        navigate('/student');
        break;
      case 'teacher':
        navigate('/teacher');
        break;
      case 'principal':
        navigate('/principal');
        break;
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const goBack = () => {
    setSelectedRole(null);
  };

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button
            variant="outline"
            onClick={goBack}
            className="mb-6 hover-lift"
          >
            ← Back to Role Selection
          </Button>
          <LoginCard role={selectedRole} onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                BrainPoint College
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Excellence in Education • Gamified Learning • Student Success
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <Card className="hover-lift shadow-card">
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-semibold mb-2">Leaderboard System</h3>
                  <p className="text-sm text-muted-foreground">
                    Compete with classmates and climb the rankings through academic excellence
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift shadow-card">
                <CardContent className="p-6 text-center">
                  <Star className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-semibold mb-2">Points & Badges</h3>
                  <p className="text-sm text-muted-foreground">
                    Earn points for assignments, participation, and good behavior
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift shadow-card">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-semibold mb-2">Real-time Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Instant notifications and live ranking updates
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Portal</h2>
            <p className="text-lg text-muted-foreground">
              Select your role to access your personalized dashboard
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Student Portal */}
            <Card 
              className="hover-lift shadow-card cursor-pointer transition-all duration-300 hover:shadow-glow"
              onClick={() => handleRoleSelect('student')}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-blue-500 rounded-2xl flex items-center justify-center shadow-glow">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Student Portal</h3>
                <p className="text-muted-foreground mb-6">
                  View your rank, earn points, complete assignments, and track your academic progress
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span>Personal Dashboard</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span>Leaderboard Rankings</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <span>Badges & Achievements</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teacher Portal */}
            <Card 
              className="hover-lift shadow-card cursor-pointer transition-all duration-300 hover:shadow-glow"
              onClick={() => handleRoleSelect('teacher')}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-2xl flex items-center justify-center shadow-glow">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Teacher Portal</h3>
                <p className="text-muted-foreground mb-6">
                  Create assignments, award points, monitor class progress, and engage students
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <span>Assignment Management</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-green-500" />
                    <span>Point Awards</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span>Class Analytics</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Principal Portal */}
            <Card 
              className="hover-lift shadow-card cursor-pointer transition-all duration-300 hover:shadow-glow"
              onClick={() => handleRoleSelect('principal')}
            >
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-glow">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Principal Portal</h3>
                <p className="text-muted-foreground mb-6">
                  School-wide administration, analytics, user management, and system oversight
                </p>
                  <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span>School Analytics</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4 text-yellow-400" />
                    <span>User Management</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>System Administration</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 BrainPoint College. Empowering minds, shaping futures.
          </p>
        </div>
      </footer>
    </div>
  );
}