import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Assignment, Student } from '@/types/school';
import { DUMMY_ASSIGNMENTS } from '@/data/dummyData';
import { BookOpen, Clock, ExternalLink, Calendar, Star } from 'lucide-react';

interface AssignmentsCardProps {
  student: Student;
}

export default function AssignmentsCard({ student }: AssignmentsCardProps) {
  // Filter assignments for student's class
  const relevantAssignments = DUMMY_ASSIGNMENTS.filter(assignment =>
    assignment.targetClasses.includes(student.studentClass) && assignment.isActive
  );

  const getAssignmentTypeIcon = (type: Assignment['type']) => {
    switch (type) {
      case 'google_form':
        return <Star className="w-4 h-4" />;
      case 'edulastic':
        return <BookOpen className="w-4 h-4" />;
      case 'manual':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: Assignment['type']) => {
    switch (type) {
      case 'google_form':
        return 'bg-accent/10 text-accent';
      case 'edulastic':
        return 'bg-primary/10 text-primary';
      case 'manual':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-muted';
    }
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const now = new Date();
    const timeDiff = dueDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const getUrgencyColor = (daysLeft: number) => {
    if (daysLeft <= 1) return 'text-destructive';
    if (daysLeft <= 3) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Active Assignments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {relevantAssignments.length > 0 ? (
          relevantAssignments.map((assignment) => {
            const daysLeft = getDaysUntilDue(assignment.dueDate);
            const isUrgent = daysLeft <= 3;
            
            return (
              <div
                key={assignment.id}
                className={`p-4 rounded-lg border hover-lift transition-all duration-200 ${
                  isUrgent ? 'border-warning/50 bg-warning/5' : 'border-border bg-card'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`text-xs ${getTypeColor(assignment.type)}`}>
                          <span className="flex items-center gap-1">
                            {getAssignmentTypeIcon(assignment.type)}
                            {assignment.type.replace('_', ' ')}
                          </span>
                        </Badge>
                        {assignment.type === 'google_form' && (
                          <Badge variant="outline" className="text-xs">
                            📝 Form
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-semibold mb-1">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {assignment.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        By {assignment.teacher?.user?.name || 'Teacher'}
                      </p>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-1 text-sm font-semibold text-accent">
                        <Star className="w-3 h-3" />
                        {assignment.pointsReward} pts
                      </div>
                      {assignment.earlySubmissionBonus > 0 && (
                        <div className="text-xs text-success">
                          +{assignment.earlySubmissionBonus} early bonus
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className={getUrgencyColor(daysLeft)}>
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Due today'}
                      </span>
                      {isUrgent && (
                        <Clock className="w-4 h-4 text-warning animate-pulse" />
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {assignment.externalLink && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-8"
                          onClick={() => window.open(assignment.externalLink, '_blank')}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Open
                        </Button>
                      )}
                      <Button size="sm" className="text-xs h-8">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No active assignments for your class</p>
            <p className="text-sm">Check back later for new assignments</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}