// BrainPoint College - Dummy Data for Testing

import { 
  Student, Teacher, Principal, Badge, Assignment, 
  Announcement, PointTransaction, StudentAssignment,
  Department, StudentClass, BadgeType, UserRole
} from '@/types/school';

// Badge definitions
export const AVAILABLE_BADGES: Badge[] = [
  {
    id: 'bronze-starter',
    type: 'bronze',
    name: 'Getting Started',
    description: 'Earned your first 100 points',
    icon: '🥉',
    pointsRequired: 100
  },
  {
    id: 'silver-achiever',
    type: 'silver', 
    name: 'Rising Star',
    description: 'Reached 500 points',
    icon: '🥈',
    pointsRequired: 500
  },
  {
    id: 'gold-scholar',
    type: 'gold',
    name: 'Academic Scholar',
    description: 'Achieved 1000 points',
    icon: '🥇',
    pointsRequired: 1000
  },
  {
    id: 'diamond-legend',
    type: 'diamond',
    name: 'BrainPoint Legend',
    description: 'Reached 2000 points',
    icon: '💎',
    pointsRequired: 2000
  },
  {
    id: 'early-bird',
    type: 'gold',
    name: 'Early Bird',
    description: 'Submitted 10 assignments early',
    icon: '🐦',
    pointsRequired: 0
  },
  {
    id: 'quiz-master',
    type: 'silver',
    name: 'Quiz Master',
    description: 'Completed 20 practice quizzes',
    icon: '🧠',
    pointsRequired: 0
  }
];

// Dummy Students (20+ students across different classes and departments)
export const DUMMY_STUDENTS: Student[] = [
  {
    id: 'st001',
    schoolId: 'BP/2024/001',
    name: 'Adebayo Olamide',
    email: 'olamide.adebayo@brainpoint.edu.ng',
    role: 'student',
    studentClass: 'SS3A',
    department: 'Science',
    totalPoints: 2150,
    currentRank: 1,
    weeklyPoints: 180,
    monthlyPoints: 520,
    termlyPoints: 1350,
    badges: [
      { ...AVAILABLE_BADGES[0], dateEarned: new Date('2024-01-15') },
      { ...AVAILABLE_BADGES[1], dateEarned: new Date('2024-02-20') },
      { ...AVAILABLE_BADGES[2], dateEarned: new Date('2024-04-10') },
      { ...AVAILABLE_BADGES[3], dateEarned: new Date('2024-07-25') },
    ],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'st002',
    schoolId: 'BP/2024/002',
    name: 'Fatima Ibrahim',
    email: 'fatima.ibrahim@brainpoint.edu.ng',
    role: 'student',
    studentClass: 'SS3A',
    department: 'Science',
    totalPoints: 1980,
    currentRank: 2,
    weeklyPoints: 165,
    monthlyPoints: 490,
    termlyPoints: 1280,
    badges: [
      { ...AVAILABLE_BADGES[0], dateEarned: new Date('2024-01-18') },
      { ...AVAILABLE_BADGES[1], dateEarned: new Date('2024-02-25') },
      { ...AVAILABLE_BADGES[2], dateEarned: new Date('2024-04-15') },
    ],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'st003',
    schoolId: 'BP/2024/003',
    name: 'Chukwuma Emeka',
    email: 'chukwuma.emeka@brainpoint.edu.ng',
    role: 'student',
    studentClass: 'SS3B',
    department: 'Science',
    totalPoints: 1850,
    currentRank: 3,
    weeklyPoints: 140,
    monthlyPoints: 420,
    termlyPoints: 1150,
    badges: [
      { ...AVAILABLE_BADGES[0], dateEarned: new Date('2024-01-20') },
      { ...AVAILABLE_BADGES[1], dateEarned: new Date('2024-03-01') },
      { ...AVAILABLE_BADGES[2], dateEarned: new Date('2024-05-05') },
    ],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'st004',
    schoolId: 'BP/2024/004',
    name: 'Aisha Abdullahi',
    email: 'aisha.abdullahi@brainpoint.edu.ng',
    role: 'student',
    studentClass: 'SS2A',
    department: 'Art',
    totalPoints: 1720,
    currentRank: 4,
    weeklyPoints: 125,
    monthlyPoints: 380,
    termlyPoints: 1050,
    badges: [
      { ...AVAILABLE_BADGES[0], dateEarned: new Date('2024-01-25') },
      { ...AVAILABLE_BADGES[1], dateEarned: new Date('2024-03-10') },
      { ...AVAILABLE_BADGES[2], dateEarned: new Date('2024-06-01') },
    ],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'st005',
    schoolId: 'BP/2024/005',
    name: 'Oluwaseun Ayodeji',
    email: 'oluwaseun.ayodeji@brainpoint.edu.ng',
    role: 'student',
    studentClass: 'SS2B',
    department: 'Commercial',
    totalPoints: 1650,
    currentRank: 5,
    weeklyPoints: 115,
    monthlyPoints: 350,
    termlyPoints: 980,
    badges: [
      { ...AVAILABLE_BADGES[0], dateEarned: new Date('2024-02-01') },
      { ...AVAILABLE_BADGES[1], dateEarned: new Date('2024-03-15') },
      { ...AVAILABLE_BADGES[2], dateEarned: new Date('2024-06-10') },
    ],
    createdAt: new Date('2024-01-01'),
  },
  // Add more students...
  {
    id: 'st006',
    schoolId: 'BP/2024/006',
    name: 'Blessing Okoro',
    email: 'blessing.okoro@brainpoint.edu.ng',
    role: 'student',
    studentClass: 'SS1A',
    department: 'Science',
    totalPoints: 1520,
    currentRank: 6,
    weeklyPoints: 95,
    monthlyPoints: 310,
    termlyPoints: 890,
    badges: [
      { ...AVAILABLE_BADGES[0], dateEarned: new Date('2024-02-05') },
      { ...AVAILABLE_BADGES[1], dateEarned: new Date('2024-04-01') },
      { ...AVAILABLE_BADGES[2], dateEarned: new Date('2024-07-01') },
    ],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'st007',
    schoolId: 'BP/2024/007',
    name: 'Abdulrahman Sani',
    email: 'abdulrahman.sani@brainpoint.edu.ng',
    role: 'student',
    studentClass: 'JSS3A',
    department: 'Science',
    totalPoints: 1420,
    currentRank: 7,
    weeklyPoints: 88,
    monthlyPoints: 290,
    termlyPoints: 820,
    badges: [
      { ...AVAILABLE_BADGES[0], dateEarned: new Date('2024-02-10') },
      { ...AVAILABLE_BADGES[1], dateEarned: new Date('2024-04-15') },
      { ...AVAILABLE_BADGES[2], dateEarned: new Date('2024-07-15') },
    ],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'st008',
    schoolId: 'BP/2024/008',
    name: 'Chioma Nnadi',
    email: 'chioma.nnadi@brainpoint.edu.ng',
    role: 'student',
    studentClass: 'SS1B',
    department: 'Art',
    totalPoints: 1350,
    currentRank: 8,
    weeklyPoints: 82,
    monthlyPoints: 275,
    termlyPoints: 780,
    badges: [
      { ...AVAILABLE_BADGES[0], dateEarned: new Date('2024-02-15') },
      { ...AVAILABLE_BADGES[1], dateEarned: new Date('2024-04-20') },
      { ...AVAILABLE_BADGES[2], dateEarned: new Date('2024-07-20') },
    ],
    createdAt: new Date('2024-01-01'),
  },
  // Continue with more students to reach 20+
  {
    id: 'st009',
    schoolId: 'BP/2024/009',
    name: 'Ibrahim Musa',
    email: 'ibrahim.musa@brainpoint.edu.ng',
    role: 'student',
    studentClass: 'SS2C',
    department: 'Commercial',
    totalPoints: 1280,
    currentRank: 9,
    weeklyPoints: 75,
    monthlyPoints: 260,
    termlyPoints: 720,
    badges: [
      { ...AVAILABLE_BADGES[0], dateEarned: new Date('2024-02-20') },
      { ...AVAILABLE_BADGES[1], dateEarned: new Date('2024-05-01') },
      { ...AVAILABLE_BADGES[2], dateEarned: new Date('2024-08-01') },
    ],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'st010',
    schoolId: 'BP/2024/010',
    name: 'Grace Nwosu',
    email: 'grace.nwosu@brainpoint.edu.ng',
    role: 'student',
    studentClass: 'JSS2A',
    department: 'Science',
    totalPoints: 1180,
    currentRank: 10,
    weeklyPoints: 68,
    monthlyPoints: 240,
    termlyPoints: 650,
    badges: [
      { ...AVAILABLE_BADGES[0], dateEarned: new Date('2024-03-01') },
      { ...AVAILABLE_BADGES[1], dateEarned: new Date('2024-05-10') },
      { ...AVAILABLE_BADGES[2], dateEarned: new Date('2024-08-10') },
    ],
    createdAt: new Date('2024-01-01'),
  },
];

// Add 10 more students to reach 20 total
const additionalStudents: Student[] = Array.from({ length: 10 }, (_, i) => {
  const studentNumber = i + 11;
  const names = [
    'Khadijah Yusuf', 'Victor Okafor', 'Zainab Ahmed', 'Daniel Adeniyi',
    'Aminat Lawal', 'Emmanuel Eze', 'Hauwa Garba', 'Tunde Adebola',
    'Maryam Bello', 'Joseph Okello'
  ];
  const classes: StudentClass[] = ['JSS1A', 'JSS1B', 'JSS2A', 'JSS2B', 'JSS3A', 'JSS3B', 'SS1A', 'SS1B', 'SS2A', 'SS2B'];
  const departments: Department[] = ['Science', 'Art', 'Commercial'];
  
  return {
    id: `st${studentNumber.toString().padStart(3, '0')}`,
    schoolId: `BP/2024/${studentNumber.toString().padStart(3, '0')}`,
    name: names[i],
    email: `${names[i].toLowerCase().replace(' ', '.')}@brainpoint.edu.ng`,
    role: 'student',
    studentClass: classes[i],
    department: departments[i % 3],
    totalPoints: 1100 - (i * 50),
    currentRank: 10 + i + 1,
    weeklyPoints: 60 - (i * 5),
    monthlyPoints: 220 - (i * 15),
    termlyPoints: 580 - (i * 40),
    badges: i < 5 ? [
      { ...AVAILABLE_BADGES[0], dateEarned: new Date('2024-03-01') },
      { ...AVAILABLE_BADGES[1], dateEarned: new Date('2024-06-01') },
    ] : [
      { ...AVAILABLE_BADGES[0], dateEarned: new Date('2024-04-01') },
    ],
    createdAt: new Date('2024-01-01'),
  };
});

DUMMY_STUDENTS.push(...additionalStudents);

// Dummy Teachers
export const DUMMY_TEACHERS: Teacher[] = [
  {
    id: 'tc001',
    schoolId: 'BP/STAFF/001',
    name: 'Mrs. Adunni Ogundimu',
    email: 'adunni.ogundimu@brainpoint.edu.ng',
    role: 'teacher',
    subjects: ['Mathematics', 'Further Mathematics'],
    classesAssigned: ['SS3A', 'SS3B', 'SS2A'],
    createdAt: new Date('2023-09-01'),
  },
  {
    id: 'tc002',
    schoolId: 'BP/STAFF/002',
    name: 'Mr. Chijioke Nnamdi',
    email: 'chijioke.nnamdi@brainpoint.edu.ng',
    role: 'teacher',
    subjects: ['Physics', 'Chemistry'],
    classesAssigned: ['SS3A', 'SS3B', 'SS2A', 'SS2B'],
    createdAt: new Date('2023-09-01'),
  },
  {
    id: 'tc003',
    schoolId: 'BP/STAFF/003',
    name: 'Miss Fatima Abubakar',
    email: 'fatima.abubakar@brainpoint.edu.ng',
    role: 'teacher',
    subjects: ['English Language', 'Literature'],
    classesAssigned: ['SS1A', 'SS1B', 'JSS3A', 'JSS3B'],
    createdAt: new Date('2023-09-01'),
  },
  {
    id: 'tc004',
    schoolId: 'BP/STAFF/004',
    name: 'Mr. Emeka Okafor',
    email: 'emeka.okafor@brainpoint.edu.ng',
    role: 'teacher',
    subjects: ['Economics', 'Business Studies'],
    classesAssigned: ['SS2C', 'SS1C', 'JSS2A', 'JSS2B'],
    createdAt: new Date('2023-09-01'),
  },
  {
    id: 'tc005',
    schoolId: 'BP/STAFF/005',
    name: 'Mrs. Kemi Adebayo',
    email: 'kemi.adebayo@brainpoint.edu.ng',
    role: 'teacher',
    subjects: ['Government', 'History'],
    classesAssigned: ['SS3A', 'SS2A', 'SS1A', 'JSS3A'],
    createdAt: new Date('2023-09-01'),
  },
];

// Dummy Principal
export const DUMMY_PRINCIPAL: Principal = {
  id: 'pr001',
  schoolId: 'BP/ADMIN/001',
  name: 'Dr. Olusegun Adeyemi',
  email: 'principal@brainpoint.edu.ng',
  role: 'principal',
  createdAt: new Date('2020-01-01'),
};

// Dummy Assignments
export const DUMMY_ASSIGNMENTS: Assignment[] = [
  {
    id: 'as001',
    title: 'Quadratic Equations Practice',
    description: 'Solve 20 quadratic equations and show your workings',
    teacherId: 'tc001',
    teacherName: 'Mrs. Adunni Ogundimu',
    targetClasses: ['SS3A', 'SS3B'],
    pointsReward: 50,
    earlySubmissionBonus: 10,
    dueDate: new Date('2024-09-15'),
    isActive: true,
    type: 'assignment',
    createdAt: new Date('2024-09-01'),
  },
  {
    id: 'as002',
    title: 'Physics Lab Report - Motion',
    description: 'Complete the lab report on projectile motion experiment',
    teacherId: 'tc002',
    teacherName: 'Mr. Chijioke Nnamdi',
    targetClasses: ['SS3A', 'SS3B'],
    pointsReward: 75,
    earlySubmissionBonus: 15,
    dueDate: new Date('2024-09-20'),
    isActive: true,
    type: 'assignment',
    createdAt: new Date('2024-09-05'),
  },
  {
    id: 'as003',
    title: 'English Literature Quiz',
    description: 'Online quiz on "Things Fall Apart" by Chinua Achebe',
    teacherId: 'tc003',
    teacherName: 'Miss Fatima Abubakar',
    targetClasses: ['SS1A', 'SS1B'],
    pointsReward: 30,
    earlySubmissionBonus: 5,
    dueDate: new Date('2024-09-18'),
    isActive: true,
    type: 'quiz',
    externalLink: 'https://forms.google.com/example-quiz-link',
    createdAt: new Date('2024-09-03'),
  },
  {
    id: 'as004',
    title: 'Holiday Challenge - Economics',
    description: 'Special holiday practice questions on market structures',
    teacherId: 'tc004',
    teacherName: 'Mr. Emeka Okafor',
    targetClasses: ['SS2C', 'SS1C'],
    pointsReward: 40,
    earlySubmissionBonus: 8,
    dueDate: new Date('2024-09-30'),
    isActive: true,
    type: 'holiday_challenge',
    createdAt: new Date('2024-09-01'),
  },
];

// Dummy Announcements
export const DUMMY_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'an001',
    title: 'New Semester Begins!',
    content: 'Welcome back to BrainPoint College! The new semester starts with exciting opportunities to earn points and climb the leaderboard. Remember, early assignment submissions earn bonus points!',
    authorId: 'pr001',
    authorName: 'Dr. Olusegun Adeyemi',
    authorRole: 'principal',
    targetAudience: 'all',
    priority: 'high',
    isActive: true,
    createdAt: new Date('2024-09-01'),
    expiresAt: new Date('2024-09-30'),
  },
  {
    id: 'an002',
    title: 'Leaderboard Competition Update',
    content: 'Congratulations to Adebayo Olamide for maintaining the #1 position! The weekly leaderboard resets every Monday. Keep up the great work everyone!',
    authorId: 'tc001',
    authorName: 'Mrs. Adunni Ogundimu',
    authorRole: 'teacher',
    targetAudience: 'students',
    priority: 'medium',
    isActive: true,
    createdAt: new Date('2024-09-02'),
  },
  {
    id: 'an003',
    title: 'Parent-Teacher Conference',
    content: 'Parent-Teacher conferences are scheduled for September 25-27. Parents can review their child\'s point progress and academic performance.',
    authorId: 'pr001',
    authorName: 'Dr. Olusegun Adeyemi',
    authorRole: 'principal',
    targetAudience: 'all',
    priority: 'medium',
    isActive: true,
    createdAt: new Date('2024-09-03'),
    expiresAt: new Date('2024-09-28'),
  },
];

// Current user context (for demo purposes)
export const CURRENT_USER = {
  student: DUMMY_STUDENTS[0], // Adebayo Olamide - Top performer
  teacher: DUMMY_TEACHERS[0], // Mrs. Adunni Ogundimu
  principal: DUMMY_PRINCIPAL,
};