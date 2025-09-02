// Multi-School System - Type Definitions

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
export type AssignmentType = 'google_form' | 'edulastic' | 'manual';
export type PointSource = 'assignment' | 'quiz' | 'behavior' | 'participation' | 'manual';

// Core Entities
export interface School {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  logoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  schoolId: string;
  userId: string; // Login ID (e.g., BP/2024/001)
  name: string;
  email?: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  userId: string;
  schoolId: string;
  studentClass: StudentClass;
  department: Department;
  totalPoints: number;
  currentRank: number;
  weeklyPoints: number;
  monthlyPoints: number;
  termlyPoints: number;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  badges?: StudentBadge[];
}

export interface Teacher {
  id: string;
  userId: string;
  schoolId: string;
  subjects: string[];
  classesAssigned: StudentClass[];
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface Principal {
  id: string;
  userId: string;
  schoolId: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: BadgeType;
  pointsRequired: number;
  createdAt: Date;
}

export interface StudentBadge {
  id: string;
  studentId: string;
  badgeId: string;
  dateEarned: Date;
  badge?: Badge;
}

export interface Assignment {
  id: string;
  schoolId: string;
  teacherId: string;
  title: string;
  description?: string;
  type: AssignmentType;
  externalLink?: string;
  pointsReward: number;
  earlySubmissionBonus: number;
  dueDate?: Date;
  targetClasses: StudentClass[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  teacher?: Teacher;
}

export interface Announcement {
  id: string;
  schoolId: string;
  authorId: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  targetAudience: string;
  targetClasses: StudentClass[];
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
}

export interface Note {
  id: string;
  schoolId: string;
  teacherId: string;
  title: string;
  description?: string;
  fileUrl?: string;
  externalLink?: string;
  targetClasses: StudentClass[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  teacher?: Teacher;
}

export interface PointTransaction {
  id: string;
  schoolId: string;
  studentId: string;
  teacherId?: string;
  points: number;
  reason: string;
  source: PointSource;
  assignmentId?: string;
  createdAt: Date;
  teacher?: Teacher;
  student?: Student;
  assignment?: Assignment;
}

// UI Types
export interface LeaderboardEntry {
  rank: number;
  student: Student;
  points: number;
  previousRank?: number;
  trend: 'up' | 'down' | 'same' | 'new';
}

export interface SchoolStats {
  totalStudents: number;
  averagePoints: number;
  topPerformer?: Student;
  totalPoints: number;
}

export interface SchoolComparison {
  school: School;
  stats: SchoolStats;
  rank: number;
}