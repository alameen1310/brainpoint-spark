// BrainPoint College - Type Definitions

export type UserRole = 'student' | 'teacher' | 'principal';

export type Department = 'Science' | 'Art' | 'Commercial';

export type StudentClass = 
  | 'JSS1A' | 'JSS1B' | 'JSS1C'
  | 'JSS2A' | 'JSS2B' | 'JSS2C'  
  | 'JSS3A' | 'JSS3B' | 'JSS3C'
  | 'SS1A' | 'SS1B' | 'SS1C'
  | 'SS2A' | 'SS2B' | 'SS2C'
  | 'SS3A' | 'SS3B' | 'SS3C';

export type BadgeType = 'bronze' | 'silver' | 'gold' | 'diamond';

export type RankingPeriod = 'weekly' | 'monthly' | 'termly';

export interface User {
  id: string;
  schoolId: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface Student extends User {
  role: 'student';
  studentClass: StudentClass;
  department: Department;
  totalPoints: number;
  currentRank: number;
  badges: Badge[];
  weeklyPoints: number;
  monthlyPoints: number;
  termlyPoints: number;
}

export interface Teacher extends User {
  role: 'teacher';
  subjects: string[];
  classesAssigned: StudentClass[];
}

export interface Principal extends User {
  role: 'principal';
}

export interface Badge {
  id: string;
  type: BadgeType;
  name: string;
  description: string;
  icon: string;
  pointsRequired: number;
  dateEarned?: Date;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  targetClasses: StudentClass[];
  pointsReward: number;
  earlySubmissionBonus: number;
  dueDate: Date;
  isActive: boolean;
  type: 'quiz' | 'assignment' | 'practice' | 'holiday_challenge';
  externalLink?: string; // For Google Forms, Edulastic, etc.
  createdAt: Date;
}

export interface StudentAssignment {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt?: Date;
  pointsEarned: number;
  isEarlySubmission: boolean;
  status: 'pending' | 'submitted' | 'graded';
}

export interface PointTransaction {
  id: string;
  studentId: string;
  points: number;
  source: 'assignment' | 'quiz' | 'behavior' | 'participation' | 'manual';
  description: string;
  assignmentId?: string;
  teacherId?: string;
  createdAt: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  targetAudience: 'all' | 'students' | 'teachers' | StudentClass[];
  priority: 'low' | 'medium' | 'high';
  isActive: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

export interface LeaderboardEntry {
  rank: number;
  student: Student;
  points: number;
  previousRank?: number;
  trend: 'up' | 'down' | 'same' | 'new';
}

export interface RankingStats {
  period: RankingPeriod;
  totalStudents: number;
  averagePoints: number;
  topPerformer: Student;
  classLeaders: { class: StudentClass; leader: Student }[];
  departmentLeaders: { department: Department; leader: Student }[];
}