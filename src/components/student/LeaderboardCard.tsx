import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Student, RankingPeriod } from '@/types/school';
import { Trophy, TrendingUp, TrendingDown, Medal, Crown } from 'lucide-react';
import { DUMMY_STUDENTS } from '@/data/dummyData';

interface LeaderboardCardProps {
  period: RankingPeriod;
  currentStudent?: Student;
  limit?: number;
}

export default function LeaderboardCard({ period, currentStudent, limit = 10 }: LeaderboardCardProps) {
  // Sort students by points for the selected period
  const getPointsForPeriod = (student: Student, period: RankingPeriod) => {
    switch (period) {
      case 'weekly':
        return student.weeklyPoints;
      case 'monthly':
        return student.monthlyPoints;
      case 'termly':
        return student.termlyPoints;
      default:
        return student.totalPoints;
    }
  };

  const sortedStudents = [...DUMMY_STUDENTS]
    .sort((a, b) => getPointsForPeriod(b, period) - getPointsForPeriod(a, period))
    .slice(0, limit);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-gold" />;
      case 2:
        return <Medal className="w-5 h-5 text-silver" />;
      case 3:
        return <Medal className="w-5 h-5 text-bronze" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankCardClass = (rank: number) => {
    switch (rank) {
      case 1:
        return "rank-card-gold";
      case 2:
        return "rank-card-silver";
      case 3:
        return "rank-card-bronze";
      default:
        return "bg-card hover:bg-surface";
    }
  };

  const getTrendIcon = (student: Student) => {
    // Simulate trend based on total points vs weekly points ratio
    const ratio = student.weeklyPoints / (student.totalPoints / 52); // Approximate weekly average
    if (ratio > 1.2) return <TrendingUp className="w-4 h-4 text-success" />;
    if (ratio < 0.8) return <TrendingDown className="w-4 h-4 text-destructive" />;
    return null;
  };

  const periodTitle = {
    weekly: 'Weekly Rankings',
    monthly: 'Monthly Rankings', 
    termly: 'Termly Rankings'
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          {periodTitle[period]}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedStudents.map((student, index) => {
          const rank = index + 1;
          const points = getPointsForPeriod(student, period);
          const isCurrentUser = currentStudent?.id === student.id;
          
          return (
            <div
              key={student.id}
              className={`p-4 rounded-lg transition-all duration-200 hover-lift ${getRankCardClass(rank)} ${
                isCurrentUser ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center">
                    {getRankIcon(rank)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`font-semibold ${isCurrentUser ? 'text-primary' : ''}`}>
                        {student.user?.name || 'Unknown Student'}
                      </p>
                      {isCurrentUser && (
                        <Badge variant="secondary" className="text-xs">
                          You
                        </Badge>
                      )}
                      {getTrendIcon(student)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{student.studentClass}</span>
                      <span>•</span>
                      <span>{student.department}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-lg">{points}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
              
              {rank <= 3 && (
                <div className="mt-2 pt-2 border-t border-border/50">
                  <div className="flex items-center gap-2 text-xs">
                    {student.badges?.slice(0, 3).map((badge, i) => (
                      <span key={i} className="opacity-60">
                        {badge.badge?.icon || '🏆'}
                      </span>
                    ))}
                    {student.badges.length > 3 && (
                      <span className="text-muted-foreground">
                        +{student.badges.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        {currentStudent && !sortedStudents.find(s => s.id === currentStudent.id) && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="p-4 rounded-lg bg-muted/50 border-2 border-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">
                    #{currentStudent.currentRank}
                  </span>
                  <div>
                    <p className="font-semibold text-primary">{currentStudent.user?.name || 'Unknown'}</p>
                    <p className="text-sm text-muted-foreground">Your Position</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{getPointsForPeriod(currentStudent, period)}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}