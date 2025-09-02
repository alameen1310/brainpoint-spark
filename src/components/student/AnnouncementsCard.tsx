import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Announcement, Student } from '@/types/school';
import { DUMMY_ANNOUNCEMENTS } from '@/data/dummyData';
import { Megaphone, AlertCircle, Info, Calendar } from 'lucide-react';

interface AnnouncementsCardProps {
  student: Student;
}

export default function AnnouncementsCard({ student }: AnnouncementsCardProps) {
  // Filter announcements relevant to the student
  const relevantAnnouncements = DUMMY_ANNOUNCEMENTS.filter(announcement => {
    if (!announcement.isActive) return false;
    
    if (announcement.targetAudience === 'all' || announcement.targetAudience === 'students') {
      return true;
    }
    
    if (Array.isArray(announcement.targetAudience)) {
      return announcement.targetAudience.includes(student.studentClass);
    }
    
    return false;
  }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const getPriorityIcon = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'medium':
        return <Info className="w-4 h-4 text-warning" />;
      case 'low':
        return <Info className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Info className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-muted/10 text-muted-foreground border-muted/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const getRoleIcon = (role: Announcement['authorRole']) => {
    switch (role) {
      case 'principal':
        return '👨‍💼';
      case 'teacher':
        return '👩‍🏫';
      default:
        return '📢';
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-primary" />
          Announcements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {relevantAnnouncements.length > 0 ? (
          relevantAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover-lift ${getPriorityColor(announcement.priority)}`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getPriorityIcon(announcement.priority)}
                      <h4 className="font-semibold">{announcement.title}</h4>
                      {announcement.priority === 'high' && (
                        <Badge variant="destructive" className="text-xs">
                          Important
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm mb-3">{announcement.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{getRoleIcon(announcement.authorRole)}</span>
                        <span>{announcement.authorName}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{getTimeAgo(announcement.createdAt)}</span>
                        </div>
                      </div>
                      
                      {announcement.expiresAt && (
                        <div className="text-xs text-muted-foreground">
                          Expires {announcement.expiresAt.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Megaphone className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No announcements</p>
            <p className="text-sm">You're all caught up!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}