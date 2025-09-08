import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { CURRENT_USER, DUMMY_STUDENTS, DUMMY_TEACHERS, DUMMY_ASSIGNMENTS, LOGIN_CREDENTIALS } from '@/data/dummyData';
import { LogOut, Shield, Users, BookOpen, Trophy, TrendingUp, School, Target, Settings, UserPlus, UserMinus } from 'lucide-react';
import AddTeacherForm from '@/components/principal/AddTeacherForm';
import AddStudentForm from '@/components/principal/AddStudentForm';
import RemoveUserForm from '@/components/principal/RemoveUserForm';

export default function PrincipalDashboard() {
  const navigate = useNavigate();
  const principal = CURRENT_USER.principal;
  const [activeManageForm, setActiveManageForm] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleAddTeacher = (teacherData: any) => {
    // In a real app, this would make an API call
    console.log('Adding teacher:', teacherData);
    toast({
      title: "Teacher Added Successfully",
      description: `${teacherData.name} has been added with username: ${teacherData.userId}`,
    });
    setActiveManageForm(null);
  };

  const handleAddStudent = (studentData: any) => {
    // In a real app, this would make an API call
    console.log('Adding student:', studentData);
    toast({
      title: "Student Added Successfully", 
      description: `${studentData.name} has been added with username: ${studentData.userId}`,
    });
    setActiveManageForm(null);
  };

  const handleRemoveUser = (userId: string) => {
    // In a real app, this would make an API call
    console.log('Removing user:', userId);
    const user = LOGIN_CREDENTIALS.find(u => u.username === userId);
    toast({
      title: "User Removed Successfully",
      description: `${user?.name || 'User'} has been removed from the system.`,
    });
    setActiveManageForm(null);
  };

  if (!principal) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  // Calculate school statistics
  const totalStudents = DUMMY_STUDENTS.length;
  const totalTeachers = DUMMY_TEACHERS.length;
  const totalAssignments = DUMMY_ASSIGNMENTS.length;
  const averagePoints = Math.round(DUMMY_STUDENTS.reduce((sum, s) => sum + s.totalPoints, 0) / totalStudents);

  // Department statistics
  const departmentStats = {
    Science: DUMMY_STUDENTS.filter(s => s.department === 'Science').length,
    Art: DUMMY_STUDENTS.filter(s => s.department === 'Art').length,
    Commercial: DUMMY_STUDENTS.filter(s => s.department === 'Commercial').length,
  };

  // Class distribution
  const classStats = DUMMY_STUDENTS.reduce((acc, student) => {
    acc[student.studentClass] = (acc[student.studentClass] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-card shadow-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shadow-glow">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">BrainPoint College</h1>
                <p className="text-sm text-muted-foreground">Principal Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{principal.user?.name || 'Principal'}</p>
                <p className="text-sm text-muted-foreground">School Principal</p>
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
              Welcome, {principal.user?.name?.split(' ')[1] || 'Principal'}! 👨‍💼
            </h2>
            <p className="text-xl text-muted-foreground">
              Overseeing excellence across {totalStudents} students and {totalTeachers} teachers
            </p>
            
            {/* School Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
              <Card className="hover-lift shadow-card">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-primary">{totalStudents}</div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift shadow-card">
                <CardContent className="p-4 text-center">
                  <School className="w-8 h-8 mx-auto mb-2 text-secondary" />
                  <div className="text-2xl font-bold text-secondary">{totalTeachers}</div>
                  <p className="text-sm text-muted-foreground">Teaching Staff</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift shadow-card">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-2xl font-bold text-accent">{totalAssignments}</div>
                  <p className="text-sm text-muted-foreground">Active Assignments</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift shadow-card">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-success" />
                  <div className="text-2xl font-bold text-success">{averagePoints}</div>
                  <p className="text-sm text-muted-foreground">Avg Points</p>
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
            <TabsList className="grid w-full grid-cols-6 max-w-4xl mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="leaderboard">Rankings</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="manage">Manage Users</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* School Leaderboard */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-accent" />
                      School Leaderboard (Top 10)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {DUMMY_STUDENTS
                        .sort((a, b) => b.totalPoints - a.totalPoints)
                        .slice(0, 10)
                        .map((student, index) => (
                        <div key={student.id} className={`flex items-center justify-between p-3 rounded-lg ${
                          index < 3 ? 'bg-accent/10 border border-accent/20' : 'bg-surface'
                        }`}>
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full text-white text-sm flex items-center justify-center ${
                              index === 0 ? 'bg-gold' : index === 1 ? 'bg-silver' : index === 2 ? 'bg-bronze' : 'bg-primary'
                            }`}>
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-semibold">{student.user?.name || 'Student'}</p>
                              <p className="text-sm text-muted-foreground">
                                {student.studentClass} • {student.department}
                              </p>
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

                {/* Department Performance */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Department Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(departmentStats).map(([dept, count]) => {
                      const deptStudents = DUMMY_STUDENTS.filter(s => s.department === dept);
                      const avgPoints = Math.round(deptStudents.reduce((sum, s) => sum + s.totalPoints, 0) / count);
                      
                      return (
                        <div key={dept} className="p-4 rounded-lg bg-surface">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{dept} Department</h4>
                            <Badge variant="outline">{count} students</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Average Points</p>
                              <p className="font-semibold text-primary">{avgPoints}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Top Performer</p>
                              <p className="font-semibold">{deptStudents[0]?.user?.name?.split(' ')[0] || 'N/A'}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-accent" />
                    Complete School Rankings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {DUMMY_STUDENTS
                      .sort((a, b) => b.totalPoints - a.totalPoints)
                      .map((student, index) => (
                      <div key={student.id} className={`flex items-center justify-between p-3 rounded-lg hover-lift ${
                        index < 3 ? 'bg-accent/10 border border-accent/20' : 'bg-surface'
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full text-white text-sm flex items-center justify-center ${
                            index === 0 ? 'bg-gold' : index === 1 ? 'bg-silver' : index === 2 ? 'bg-bronze' : 'bg-muted-foreground'
                          }`}>
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-semibold">{student.user?.name || 'Student'}</p>
                            <p className="text-sm text-muted-foreground">
                              {student.studentClass} • {student.department}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-bold text-lg">{student.totalPoints}</p>
                            <p className="text-xs text-muted-foreground">total points</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-success">{student.weeklyPoints}</p>
                            <p className="text-xs text-muted-foreground">this week</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <div className="grid gap-4">
                {Object.entries(classStats).map(([className, count]) => {
                  const classStudents = DUMMY_STUDENTS.filter(s => s.studentClass === className);
                  return (
                    <Card key={className} className="shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{className}</span>
                          <Badge variant="outline">{count} students</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {classStudents
                            .sort((a, b) => b.totalPoints - a.totalPoints)
                            .map((student) => (
                            <div key={student.id} className="p-3 rounded-lg bg-surface hover-lift">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold">{student.user?.name || 'Student'}</p>
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

            <TabsContent value="teachers" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {DUMMY_TEACHERS.map((teacher) => (
                  <Card key={teacher.id} className="shadow-card hover-lift">
                    <CardHeader>
                      <CardTitle>{teacher.user?.name || 'Teacher'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Subjects</p>
                          <p className="font-semibold">{teacher.subjects.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Classes Assigned</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {teacher.classesAssigned.map((className) => (
                              <Badge key={className} variant="outline" className="text-xs">
                                {className}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Students Under Care</p>
                          <p className="font-semibold">
                            {DUMMY_STUDENTS.filter(s => teacher.classesAssigned.includes(s.studentClass)).length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="manage" className="space-y-6">
              {!activeManageForm ? (
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Teachers Management */}
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <School className="w-5 h-5 text-secondary" />
                        Teachers Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg bg-surface">
                        <p className="text-sm text-muted-foreground mb-4">
                          Add new teachers to your school or remove existing ones.
                        </p>
                        <div className="flex gap-3">
                          <Button 
                            onClick={() => setActiveManageForm('add-teacher')}
                            className="flex-1"
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Add Teacher
                          </Button>
                          <Button 
                            onClick={() => setActiveManageForm('remove-teacher')}
                            variant="outline"
                            className="flex-1"
                          >
                            <UserMinus className="w-4 h-4 mr-2" />
                            Remove Teacher
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                        <h4 className="font-semibold mb-2">Current Teachers</h4>
                        <p className="text-2xl font-bold text-primary">{DUMMY_TEACHERS.filter(t => t.schoolId === principal?.schoolId).length}</p>
                        <p className="text-sm text-muted-foreground">Active teaching staff</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Students Management */}
                  <Card className="shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Students Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg bg-surface">
                        <p className="text-sm text-muted-foreground mb-4">
                          Enroll new students or remove existing ones from your school.
                        </p>
                        <div className="flex gap-3">
                          <Button 
                            onClick={() => setActiveManageForm('add-student')}
                            className="flex-1"
                          >
                            <UserPlus className="w-4 h-4 mr-2" />
                            Add Student
                          </Button>
                          <Button 
                            onClick={() => setActiveManageForm('remove-student')}
                            variant="outline"
                            className="flex-1"
                          >
                            <UserMinus className="w-4 h-4 mr-2" />
                            Remove Student
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                        <h4 className="font-semibold mb-2">Current Students</h4>
                        <p className="text-2xl font-bold text-primary">{DUMMY_STUDENTS.filter(s => s.schoolId === principal?.schoolId).length}</p>
                        <p className="text-sm text-muted-foreground">Enrolled students</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">
                  {activeManageForm === 'add-teacher' && (
                    <AddTeacherForm
                      schoolId={principal?.schoolId || 'school-1'}
                      onSubmit={handleAddTeacher}
                      onCancel={() => setActiveManageForm(null)}
                    />
                  )}
                  {activeManageForm === 'add-student' && (
                    <AddStudentForm
                      schoolId={principal?.schoolId || 'school-1'}
                      onSubmit={handleAddStudent}
                      onCancel={() => setActiveManageForm(null)}
                    />
                  )}
                  {activeManageForm === 'remove-teacher' && (
                    <RemoveUserForm
                      schoolId={principal?.schoolId || 'school-1'}
                      userType="teacher"
                      onSubmit={handleRemoveUser}
                      onCancel={() => setActiveManageForm(null)}
                    />
                  )}
                  {activeManageForm === 'remove-student' && (
                    <RemoveUserForm
                      schoolId={principal?.schoolId || 'school-1'}
                      userType="student"
                      onSubmit={handleRemoveUser}
                      onCancel={() => setActiveManageForm(null)}
                    />
                  )}
                </div>
              )}

              {/* Login Credentials Display */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-accent" />
                    Test Login Credentials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-primary">Students</h4>
                      <div className="space-y-1 text-sm">
                        {LOGIN_CREDENTIALS.filter(c => c.role === 'student' && c.username.startsWith(principal?.schoolId === 'school-1' ? 'BP' : principal?.schoolId === 'school-2' ? 'BC' : 'KA')).slice(0, 3).map(cred => (
                          <div key={cred.username} className="p-2 rounded bg-surface">
                            <p className="font-mono">{cred.username}</p>
                            <p className="text-muted-foreground">{cred.password}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-secondary">Teachers</h4>
                      <div className="space-y-1 text-sm">
                        {LOGIN_CREDENTIALS.filter(c => c.role === 'teacher' && c.username.startsWith(principal?.schoolId === 'school-1' ? 'BP' : principal?.schoolId === 'school-2' ? 'BC' : 'KA')).slice(0, 3).map(cred => (
                          <div key={cred.username} className="p-2 rounded bg-surface">
                            <p className="font-mono">{cred.username}</p>
                            <p className="text-muted-foreground">{cred.password}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-accent">Principal</h4>
                      <div className="space-y-1 text-sm">
                        {LOGIN_CREDENTIALS.filter(c => c.role === 'principal' && c.username.startsWith(principal?.schoolId === 'school-1' ? 'BP' : principal?.schoolId === 'school-2' ? 'BC' : 'KA')).map(cred => (
                          <div key={cred.username} className="p-2 rounded bg-surface">
                            <p className="font-mono">{cred.username}</p>
                            <p className="text-muted-foreground">{cred.password}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-success" />
                      Performance Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                      <p>Detailed performance analytics and insights</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>System Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button className="w-full" variant="outline">
                        Reset Weekly Rankings
                      </Button>
                      <Button className="w-full" variant="outline">
                        Send School Announcement
                      </Button>
                      <Button className="w-full" variant="outline">
                        Export Reports
                      </Button>
                      <Button className="w-full" variant="outline">
                        Manage Point Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}