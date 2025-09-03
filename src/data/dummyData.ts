import { 
  School, User, Student, Teacher, Principal, Badge, StudentBadge, 
  Assignment, Announcement, Note, PointTransaction
} from '@/types/school';

// Schools
export const DUMMY_SCHOOLS: School[] = [
  {
    id: 'school-1',
    name: 'BrainPoint College',
    address: 'Lagos State, Nigeria',
    phone: '+234-801-234-5678',
    email: 'info@brainpoint.edu.ng',
    logoUrl: '/api/placeholder/100/100',
    createdAt: new Date('2020-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'school-2', 
    name: 'Excellence Academy',
    address: 'Abuja, Nigeria',
    phone: '+234-802-345-6789',
    email: 'admin@excellence.edu.ng',
    logoUrl: '/api/placeholder/100/100',
    createdAt: new Date('2018-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'school-3',
    name: 'Future Leaders College',
    address: 'Port Harcourt, Nigeria', 
    phone: '+234-803-456-7890',
    email: 'contact@futureleaders.edu.ng',
    logoUrl: '/api/placeholder/100/100',
    createdAt: new Date('2019-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Badges
export const DUMMY_BADGES: Badge[] = [
  {
    id: 'badge-1',
    name: 'First Steps',
    description: 'Earned your first 50 points',
    icon: '🥉',
    type: 'bronze',
    pointsRequired: 50,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'badge-2', 
    name: 'Rising Star',
    description: 'Reached 100 points milestone',
    icon: '🌟',
    type: 'bronze',
    pointsRequired: 100,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'badge-3',
    name: 'Achiever',
    description: 'Accumulated 250 points',
    icon: '🥈',
    type: 'silver',
    pointsRequired: 250,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'badge-4',
    name: 'Excellence',
    description: 'Reached 500 points',
    icon: '🥇',
    type: 'gold',
    pointsRequired: 500,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'badge-5',
    name: 'Champion',
    description: 'Earned 1000+ points',
    icon: '💎',
    type: 'diamond',
    pointsRequired: 1000,
    createdAt: new Date('2024-01-01')
  }
];

// Users
export const DUMMY_USERS: User[] = [
  // BrainPoint College Users
  // Principal
  {
    id: 'user-1',
    schoolId: 'school-1',
    userId: 'BP/ADMIN/001',
    name: 'Dr. Adebayo Ogundimu',
    email: 'principal@brainpoint.edu.ng',
    role: 'principal',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  // Teachers
  {
    id: 'user-2',
    schoolId: 'school-1',
    userId: 'BP/STAFF/001',
    name: 'Mrs. Chioma Okafor',
    email: 'c.okafor@brainpoint.edu.ng',
    role: 'teacher',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-3',
    schoolId: 'school-1',
    userId: 'BP/STAFF/002',
    name: 'Mr. Tunde Adebayo',
    email: 't.adebayo@brainpoint.edu.ng',
    role: 'teacher',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-4',
    schoolId: 'school-1',
    userId: 'BP/STAFF/003',
    name: 'Miss Fatima Hassan',
    email: 'f.hassan@brainpoint.edu.ng',
    role: 'teacher',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  // Students
  {
    id: 'user-5',
    schoolId: 'school-1',
    userId: 'BP/2024/001',
    name: 'Emeka Nwankwo',
    email: 'emeka.nwankwo@student.brainpoint.edu.ng',
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-6',
    schoolId: 'school-1',
    userId: 'BP/2024/002',
    name: 'Aisha Mohammed',
    email: 'aisha.mohammed@student.brainpoint.edu.ng',
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-7',
    schoolId: 'school-1',
    userId: 'BP/2024/003',
    name: 'Kemi Adeyemi',
    email: 'kemi.adeyemi@student.brainpoint.edu.ng',
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-8',
    schoolId: 'school-1',
    userId: 'BP/2024/004',
    name: 'David Okoye',
    email: 'david.okoye@student.brainpoint.edu.ng',
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-9',
    schoolId: 'school-1',
    userId: 'BP/2024/005',
    name: 'Grace Okoro',
    email: 'grace.okoro@student.brainpoint.edu.ng',
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  // More students for BrainPoint...
  {
    id: 'user-10',
    schoolId: 'school-1',
    userId: 'BP/2024/006',
    name: 'Ibrahim Yusuf',
    email: 'ibrahim.yusuf@student.brainpoint.edu.ng',
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-11',
    schoolId: 'school-1',
    userId: 'BP/2024/007',
    name: 'Blessing Eze',
    email: 'blessing.eze@student.brainpoint.edu.ng',
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-12',
    schoolId: 'school-1',
    userId: 'BP/2024/008',
    name: 'Samuel Adepoju',
    email: 'samuel.adepoju@student.brainpoint.edu.ng',
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-13',
    schoolId: 'school-1',
    userId: 'BP/2024/009',
    name: 'Halima Bello',
    email: 'halima.bello@student.brainpoint.edu.ng',
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-14',
    schoolId: 'school-1',
    userId: 'BP/2024/010',
    name: 'Victor Osagie',
    email: 'victor.osagie@student.brainpoint.edu.ng',
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Teachers
export const DUMMY_TEACHERS: Teacher[] = [
  {
    id: 'teacher-1',
    userId: 'user-2',
    schoolId: 'school-1',
    subjects: ['Mathematics', 'Physics'],
    classesAssigned: ['SS1A', 'SS1B', 'SS2A'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-2')
  },
  {
    id: 'teacher-2',
    userId: 'user-3',
    schoolId: 'school-1',
    subjects: ['Chemistry', 'Biology'],
    classesAssigned: ['SS1A', 'SS1C', 'SS2B'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-3')
  },
  {
    id: 'teacher-3',
    userId: 'user-4',
    schoolId: 'school-1',
    subjects: ['English', 'Literature'],
    classesAssigned: ['JSS1A', 'JSS2A', 'JSS3A'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-4')
  }
];

// Principals
export const DUMMY_PRINCIPALS: Principal[] = [
  {
    id: 'principal-1',
    userId: 'user-1',
    schoolId: 'school-1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-1')
  }
];

// Students
export const DUMMY_STUDENTS: Student[] = [
  {
    id: 'student-1',
    userId: 'user-5',
    schoolId: 'school-1',
    studentClass: 'SS1A',
    department: 'Science',
    totalPoints: 485,
    currentRank: 1,
    weeklyPoints: 85,
    monthlyPoints: 320,
    termlyPoints: 485,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-5')
  },
  {
    id: 'student-2',
    userId: 'user-6',
    schoolId: 'school-1',
    studentClass: 'SS1A',
    department: 'Science',
    totalPoints: 420,
    currentRank: 2,
    weeklyPoints: 75,
    monthlyPoints: 290,
    termlyPoints: 420,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-6')
  },
  {
    id: 'student-3',
    userId: 'user-7',
    schoolId: 'school-1',
    studentClass: 'SS1B',
    department: 'Art',
    totalPoints: 380,
    currentRank: 3,
    weeklyPoints: 65,
    monthlyPoints: 250,
    termlyPoints: 380,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-7')
  },
  {
    id: 'student-4',
    userId: 'user-8',
    schoolId: 'school-1',
    studentClass: 'SS2A',
    department: 'Commercial',
    totalPoints: 350,
    currentRank: 4,
    weeklyPoints: 60,
    monthlyPoints: 240,
    termlyPoints: 350,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-8')
  },
  {
    id: 'student-5',
    userId: 'user-9',
    schoolId: 'school-1',
    studentClass: 'SS1A',
    department: 'Science',
    totalPoints: 320,
    currentRank: 5,
    weeklyPoints: 55,
    monthlyPoints: 220,
    termlyPoints: 320,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-9')
  },
  {
    id: 'student-6',
    userId: 'user-10',
    schoolId: 'school-1',
    studentClass: 'JSS3A',
    department: 'Science',
    totalPoints: 295,
    currentRank: 6,
    weeklyPoints: 50,
    monthlyPoints: 200,
    termlyPoints: 295,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-10')
  },
  {
    id: 'student-7',
    userId: 'user-11',
    schoolId: 'school-1',
    studentClass: 'SS1B',
    department: 'Art',
    totalPoints: 270,
    currentRank: 7,
    weeklyPoints: 45,
    monthlyPoints: 180,
    termlyPoints: 270,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-11')
  },
  {
    id: 'student-8',
    userId: 'user-12',
    schoolId: 'school-1',
    studentClass: 'SS2B',
    department: 'Commercial',
    totalPoints: 245,
    currentRank: 8,
    weeklyPoints: 40,
    monthlyPoints: 160,
    termlyPoints: 245,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-12')
  },
  {
    id: 'student-9',
    userId: 'user-13',
    schoolId: 'school-1',
    studentClass: 'JSS2A',
    department: 'Science',
    totalPoints: 220,
    currentRank: 9,
    weeklyPoints: 35,
    monthlyPoints: 140,
    termlyPoints: 220,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-13')
  },
  {
    id: 'student-10',
    userId: 'user-14',
    schoolId: 'school-1',
    studentClass: 'SS1C',
    department: 'Science',
    totalPoints: 195,
    currentRank: 10,
    weeklyPoints: 30,
    monthlyPoints: 120,
    termlyPoints: 195,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-14')
  }
];

// Student Badges
export const DUMMY_STUDENT_BADGES: StudentBadge[] = [
  // Emeka's badges
  { id: 'sb-1', studentId: 'student-1', badgeId: 'badge-1', dateEarned: new Date('2024-01-15'), badge: DUMMY_BADGES[0] },
  { id: 'sb-2', studentId: 'student-1', badgeId: 'badge-2', dateEarned: new Date('2024-02-01'), badge: DUMMY_BADGES[1] },
  { id: 'sb-3', studentId: 'student-1', badgeId: 'badge-3', dateEarned: new Date('2024-03-01'), badge: DUMMY_BADGES[2] },
  { id: 'sb-4', studentId: 'student-1', badgeId: 'badge-4', dateEarned: new Date('2024-04-01'), badge: DUMMY_BADGES[3] },
  
  // Aisha's badges
  { id: 'sb-5', studentId: 'student-2', badgeId: 'badge-1', dateEarned: new Date('2024-01-20'), badge: DUMMY_BADGES[0] },
  { id: 'sb-6', studentId: 'student-2', badgeId: 'badge-2', dateEarned: new Date('2024-02-05'), badge: DUMMY_BADGES[1] },
  { id: 'sb-7', studentId: 'student-2', badgeId: 'badge-3', dateEarned: new Date('2024-03-10'), badge: DUMMY_BADGES[2] },
  
  // Kemi's badges
  { id: 'sb-8', studentId: 'student-3', badgeId: 'badge-1', dateEarned: new Date('2024-01-25'), badge: DUMMY_BADGES[0] },
  { id: 'sb-9', studentId: 'student-3', badgeId: 'badge-2', dateEarned: new Date('2024-02-10'), badge: DUMMY_BADGES[1] },
  { id: 'sb-10', studentId: 'student-3', badgeId: 'badge-3', dateEarned: new Date('2024-03-15'), badge: DUMMY_BADGES[2] }
];

// Update students to include badges
DUMMY_STUDENTS.forEach(student => {
  student.badges = DUMMY_STUDENT_BADGES.filter(sb => sb.studentId === student.id);
});

// Assignments
export const DUMMY_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assignment-1',
    schoolId: 'school-1',
    teacherId: 'teacher-1',
    title: 'Quadratic Equations Quiz',
    description: 'Solve problems on quadratic equations and factorization',
    type: 'google_form',
    externalLink: 'https://forms.google.com/quadratic-equations',
    pointsReward: 30,
    earlySubmissionBonus: 10,
    dueDate: new Date('2024-12-20'),
    targetClasses: ['SS1A', 'SS1B'],
    isActive: true,
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
    teacher: DUMMY_TEACHERS[0]
  },
  {
    id: 'assignment-2',
    schoolId: 'school-1',
    teacherId: 'teacher-2',
    title: 'Organic Chemistry Test',
    description: 'Test on alkanes, alkenes, and functional groups',
    type: 'edulastic',
    externalLink: 'https://edulastic.com/chemistry-test',
    pointsReward: 25,
    earlySubmissionBonus: 5,
    dueDate: new Date('2024-12-18'),
    targetClasses: ['SS2A', 'SS2B'],
    isActive: true,
    createdAt: new Date('2024-12-02'),
    updatedAt: new Date('2024-12-02'),
    teacher: DUMMY_TEACHERS[1]
  },
  {
    id: 'assignment-3',
    schoolId: 'school-1',
    teacherId: 'teacher-3',
    title: 'Essay Writing Exercise',
    description: 'Write a 500-word essay on "The Importance of Education"',
    type: 'manual',
    pointsReward: 20,
    earlySubmissionBonus: 5,
    dueDate: new Date('2024-12-22'),
    targetClasses: ['JSS1A', 'JSS2A', 'JSS3A'],
    isActive: true,
    createdAt: new Date('2024-12-03'),
    updatedAt: new Date('2024-12-03'),
    teacher: DUMMY_TEACHERS[2]
  }
];

// Announcements
export const DUMMY_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'announcement-1',
    schoolId: 'school-1',
    authorId: 'user-1',
    title: 'Mid-Term Examinations',
    content: 'Mid-term examinations will commence on December 15th, 2024. All students are advised to prepare adequately.',
    priority: 'high',
    targetAudience: 'all',
    targetClasses: [],
    isActive: true,
    expiresAt: new Date('2024-12-30'),
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
    author: DUMMY_USERS[0]
  },
  {
    id: 'announcement-2',
    schoolId: 'school-1',
    authorId: 'user-2',
    title: 'Mathematics Competition',
    content: 'Registration is now open for the inter-class mathematics competition. Prizes await the winners!',
    priority: 'medium',
    targetAudience: 'students',
    targetClasses: ['SS1A', 'SS1B', 'SS1C'],
    isActive: true,
    expiresAt: new Date('2024-12-25'),
    createdAt: new Date('2024-12-02'),
    updatedAt: new Date('2024-12-02'),
    author: DUMMY_USERS[1]
  },
  {
    id: 'announcement-3',
    schoolId: 'school-1',
    authorId: 'user-4',
    title: 'Library Hours Extended',
    content: 'The school library will now be open from 7:00 AM to 6:00 PM to help students with their studies.',
    priority: 'low',
    targetAudience: 'all',
    targetClasses: [],
    isActive: true,
    expiresAt: new Date('2024-12-31'),
    createdAt: new Date('2024-12-03'),
    updatedAt: new Date('2024-12-03'),
    author: DUMMY_USERS[3]
  }
];

// Notes
export const DUMMY_NOTES: Note[] = [
  {
    id: 'note-1',
    schoolId: 'school-1',
    teacherId: 'teacher-1',
    title: 'Physics Formula Sheet',
    description: 'Complete formula sheet for SS1 Physics topics',
    fileUrl: '/api/placeholder/document/physics-formulas.pdf',
    targetClasses: ['SS1A', 'SS1B', 'SS1C'],
    isActive: true,
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2024-12-01'),
    teacher: DUMMY_TEACHERS[0]
  },
  {
    id: 'note-2',
    schoolId: 'school-1',
    teacherId: 'teacher-2',
    title: 'Chemistry Lab Safety Rules',
    description: 'Important safety guidelines for chemistry practical sessions',
    externalLink: 'https://drive.google.com/chemistry-safety-rules',
    targetClasses: ['SS1A', 'SS2A', 'SS2B'],
    isActive: true,
    createdAt: new Date('2024-12-02'),
    updatedAt: new Date('2024-12-02'),
    teacher: DUMMY_TEACHERS[1]
  }
];

// Point Transactions
export const DUMMY_POINT_TRANSACTIONS: PointTransaction[] = [
  {
    id: 'pt-1',
    schoolId: 'school-1',
    studentId: 'student-1',
    teacherId: 'teacher-1',
    points: 25,
    reason: 'Excellent participation in mathematics class',
    source: 'participation',
    createdAt: new Date('2024-12-01'),
    teacher: DUMMY_TEACHERS[0],
    student: DUMMY_STUDENTS[0]
  },
  {
    id: 'pt-2',
    schoolId: 'school-1',
    studentId: 'student-2',
    teacherId: 'teacher-2',
    points: 30,
    reason: 'Outstanding chemistry assignment submission',
    source: 'assignment',
    assignmentId: 'assignment-2',
    createdAt: new Date('2024-12-02'),
    teacher: DUMMY_TEACHERS[1],
    student: DUMMY_STUDENTS[1]
  },
  {
    id: 'pt-3',
    schoolId: 'school-1',
    studentId: 'student-3',
    teacherId: 'teacher-3',
    points: 15,
    reason: 'Good behavior and discipline',
    source: 'behavior',
    createdAt: new Date('2024-12-03'),
    teacher: DUMMY_TEACHERS[2],
    student: DUMMY_STUDENTS[2]
  }
];

// Export badges for compatibility
export const AVAILABLE_BADGES = DUMMY_BADGES;

// Current User Context
export const CURRENT_USER = {
  user: DUMMY_USERS[0], // Dr. Adebayo (Principal)
  student: null,
  teacher: null,
  principal: DUMMY_PRINCIPALS[0] // Principal record
};

// Login credentials for testing
export const LOGIN_CREDENTIALS = [
  { userId: 'BP/2024/001', password: 'demo123', role: 'student' },
  { userId: 'BP/STAFF/001', password: 'demo123', role: 'teacher' },
  { userId: 'BP/ADMIN/001', password: 'demo123', role: 'principal' }
];