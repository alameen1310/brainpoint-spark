import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Student, BadgeType } from '@/types/school';
import { AVAILABLE_BADGES } from '@/data/dummyData';
import { Star, Target, TrendingUp } from 'lucide-react';

interface ProgressCardProps {
  student: Student;
}

export default function ProgressCard({ student }: ProgressCardProps) {
  // Find next badge to earn
  const nextBadge = AVAILABLE_BADGES
    .filter(badge => badge.pointsRequired > student.totalPoints)
    .sort((a, b) => a.pointsRequired - b.pointsRequired)[0];

  const progressToNextBadge = nextBadge 
    ? (student.totalPoints / nextBadge.pointsRequired) * 100
    : 100;

  const pointsNeeded = nextBadge 
    ? nextBadge.pointsRequired - student.totalPoints
    : 0;

  // Calculate rank progression
  const getRankTier = (points: number): { name: string; color: string; nextTier: string; nextPoints: number } => {
    if (points >= 2000) return { name: 'Diamond', color: 'text-diamond', nextTier: 'Diamond Elite', nextPoints: 3000 };
    if (points >= 1000) return { name: 'Gold', color: 'text-gold', nextTier: 'Diamond', nextPoints: 2000 };
    if (points >= 500) return { name: 'Silver', color: 'text-silver', nextTier: 'Gold', nextPoints: 1000 };
    return { name: 'Bronze', color: 'text-bronze', nextTier: 'Silver', nextPoints: 500 };
  };

  const currentTier = getRankTier(student.totalPoints);
  const tierProgress = ((student.totalPoints % 1000) / 1000) * 100;

  return (
    <div className="space-y-6">
      {/* Current Rank & Progress */}
      <Card className="shadow-card hover-lift">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Your Rank Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-primary">#{student.currentRank}</div>
            <p className="text-muted-foreground">Current Position</p>
            <Badge variant="secondary" className={`${currentTier.color} font-semibold`}>
              {currentTier.name} Tier
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to {currentTier.nextTier}</span>
              <span>{student.totalPoints} / {currentTier.nextPoints} pts</span>
            </div>
            <div className="relative">
              <Progress value={tierProgress} className="h-3" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-full"></div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {currentTier.nextPoints - student.totalPoints} points until {currentTier.nextTier} tier
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Badge Progress */}
      {nextBadge && (
        <Card className="shadow-card hover-lift">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              Next Badge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="text-4xl">{nextBadge.icon}</div>
              <h3 className="font-semibold">{nextBadge.name}</h3>
              <p className="text-sm text-muted-foreground">{nextBadge.description}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{student.totalPoints} / {nextBadge.pointsRequired} pts</span>
              </div>
              <div className="relative">
                <Progress value={progressToNextBadge} className="h-3 progress-glow" />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {pointsNeeded} more points to unlock
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Performance */}
      <Card className="shadow-card hover-lift">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" />
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{student.weeklyPoints}</div>
              <p className="text-xs text-muted-foreground">Weekly Points</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">{student.badges.length}</div>
              <p className="text-xs text-muted-foreground">Total Badges</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">{student.currentRank}</div>
              <p className="text-xs text-muted-foreground">Current Rank</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earned Badges */}
      <Card className="shadow-card hover-lift">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            Your Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          {student.badges.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {student.badges.map((badge, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-surface border text-center hover-lift cursor-pointer"
                >
                  <div className="text-2xl mb-1">{badge.badge?.icon || '🏆'}</div>
                  <p className="font-medium text-sm">{badge.badge?.name || 'Badge'}</p>
                  <p className="text-xs text-muted-foreground">{badge.badge?.description || 'Achievement unlocked'}</p>
                  {badge.dateEarned && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Earned {badge.dateEarned.toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">
              Complete assignments and participate to earn your first badge!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}