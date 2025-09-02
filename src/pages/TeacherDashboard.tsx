import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CURRENT_USER, DUMMY_STUDENTS, DUMMY_ASSIGNMENTS } from '@/data/dummyData';
import { LogOut, BookOpen, Users, Award, Plus, Star, Trophy } from 'lucide-react';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const teacher = CURRENT_USER.teacher;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  // Get students in teacher's classes
  const teacherStudents = DUMMY_STUDENTS.filter(student =>
    teacher.classesAssigned.includes(student.studentClass)
  );

  // Get teacher's assignments
  const teacherAssignments = DUMMY_ASSIGNMENTS.filter(assignment =>
    assignment.teacherId === teacher.id
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card shadow-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center shadow-gold">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">BrainPoint College</h1>
                <p className="text-sm text-muted-foreground">Teacher Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{teacher.name}</p>
                <p className="text-sm text-muted-foreground">
                  {teacher.subjects.join(' • ')}
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
              Welcome, {teacher.name.split(' ')[1]}! 👩‍🏫
            </h2>
            <p className="text-xl text-muted-foreground">
              Managing {teacher.classesAssigned.length} classes • {teacherStudents.length} students
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
              <Card className="hover-lift shadow-card">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-primary">{teacherStudents.length}</div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift shadow-card">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-secondary" />
                  <div className="text-2xl font-bold text-secondary">{teacherAssignments.length}</div>
                  <p className="text-sm text-muted-foreground">Assignments</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift shadow-card">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-accent">{teacher.classesAssigned.length}</div>
                  <p className="text-sm text-muted-foreground">Classes</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift shadow-card">
                <CardContent className="p-4 text-center">
                  <Star className="w-8 h-8 mx-auto mb-2 text-success" />
                  <div className="text-2xl font-bold text-success">4.8</div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="points">Award Points</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Top Performing Students
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {teacherStudents
                        .sort((a, b) => b.totalPoints - a.totalPoints)
                        .slice(0, 5)
                        .map((student, index) => (
                        <div key={student.id} className="flex items-center justify-between p-3 rounded-lg bg-surface">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center">
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-semibold">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.studentClass}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{student.totalPoints}</p>
                            <p className="text-xs text-muted-foreground">points</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-secondary" />
                      Recent Assignments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {teacherAssignments.slice(0, 5).map((assignment) => (
                        <div key={assignment.id} className="p-3 rounded-lg bg-surface">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{assignment.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {assignment.targetClasses.join(', ')}
                              </p>
                            </div>
                            <Badge variant="outline">
                              {assignment.pointsReward} pts
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Assignment Management</h3>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Assignment
                </Button>
              </div>
              
              <div className="grid gap-4">
                {teacherAssignments.map((assignment) => (
                  <Card key={assignment.id} className="shadow-card hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{assignment.title}</h4>
                          <p className="text-muted-foreground mb-2">{assignment.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="outline">{assignment.type}</Badge>
                            <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
                            <span>Classes: {assignment.targetClasses.join(', ')}</span>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <div className="text-2xl font-bold text-accent">{assignment.pointsReward}</div>
                          <p className="text-xs text-muted-foreground">points reward</p>
                          {assignment.earlySubmissionBonus > 0 && (
                            <div className="text-sm text-success">
                              +{assignment.earlySubmissionBonus} early bonus
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <div className="grid gap-4">
                {teacher.classesAssigned.map((className) => {
                  const classStudents = teacherStudents.filter(s => s.studentClass === className);
                  return (
                    <Card key={className} className="shadow-card">
                      <CardHeader>
                        <CardTitle>{className} - {classStudents.length} Students</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {classStudents.map((student) => (
                            <div key={student.id} className="p-3 rounded-lg bg-surface hover-lift">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold">{student.name}</p>
                                  <p className="text-sm text-muted-foreground">{student.department}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-primary">{student.totalPoints}</p>
                                  <p className="text-xs text-muted-foreground">Rank #{student.currentRank}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="points" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-accent" />
                    Award Points to Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Award className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">Point Award System</h3>
                    <p>Award points for excellent behavior, participation, or special achievements</p>
                    <Button className="mt-4">
                      Award Points
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}