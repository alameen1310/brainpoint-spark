import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LeaderboardCard from '@/components/student/LeaderboardCard';
import ProgressCard from '@/components/student/ProgressCard';
import AssignmentsCard from '@/components/student/AssignmentsCard';
import AnnouncementsCard from '@/components/student/AnnouncementsCard';
import { CURRENT_USER } from '@/data/dummyData';
import { RankingPeriod } from '@/types/school';
import { LogOut, Trophy, Target, BookOpen, Megaphone, Home } from 'lucide-react';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<RankingPeriod>('weekly');
  const student = CURRENT_USER.student;
  const [schoolName, setSchoolName] = useState<string>('Your School');

  // Fetch school name from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem('schoolName');
    if (storedName && storedName.trim()) {
      setSchoolName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card shadow-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{schoolName}</h1>
                <p className="text-sm text-muted-foreground">Student Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{student.user?.name || 'Student'}</p>
                <p className="text-sm text-muted-foreground">
                  {student.studentClass} • {student.department}
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl font-bold">
              Welcome back, {student.user?.name?.split(' ')[0] || 'Student'}! 👋
            </h2>
            <p className="text-xl text-muted-foreground">
              You're currently ranked #{student.currentRank} with {student.totalPoints} total points
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
              <Card className="hover-lift shadow-card">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-primary">#{student.currentRank}</div>
                  <p className="text-sm text-muted-foreground">Current Rank</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift shadow-card">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-secondary" />
                  <div className="text-2xl font-bold text-secondary">{student.totalPoints}</div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{student.badges?.[0]?.badge?.icon || '🏆'}</div>
                  <div className="text-2xl font-bold text-accent">{student.badges.length}</div>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-2xl font-bold text-success">{student.weeklyPoints}</div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Rankings
              </TabsTrigger>
              <TabsTrigger value="assignments" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Assignments
              </TabsTrigger>
              <TabsTrigger value="announcements" className="flex items-center gap-2">
                <Megaphone className="w-4 h-4" />
                News
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Leaderboard Preview */}
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-accent" />
                          Weekly Leaderboard
                        </span>
                        <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as RankingPeriod)}>
                          <TabsList className="h-8">
                            <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
                            <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
                            <TabsTrigger value="termly" className="text-xs">Termly</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LeaderboardCard
                        period={selectedPeriod}
                        currentStudent={student}
                        limit={5}
                      />
                    </CardContent>
                  </Card>

                  {/* Recent Assignments */}
                  <AssignmentsCard student={student} />
                </div>

                <div className="space-y-6">
                  {/* Progress & Badges */}
                  <ProgressCard student={student} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <div className="flex justify-center">
                <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as RankingPeriod)}>
                  <TabsList>
                    <TabsTrigger value="weekly">Weekly Rankings</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly Rankings</TabsTrigger>
                    <TabsTrigger value="termly">Termly Rankings</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <LeaderboardCard
                    period={selectedPeriod}
                    currentStudent={student}
                    limit={20}
                  />
                </div>
                <div>
                  <ProgressCard student={student} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <AssignmentsCard student={student} />
                </div>
                <div>
                  <ProgressCard student={student} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="announcements" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <AnnouncementsCard student={student} />
                </div>
                <div>
                  <ProgressCard student={student} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}