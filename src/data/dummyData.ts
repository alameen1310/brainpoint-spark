import { 
  School, User, Student, Teacher, Principal, Badge, StudentBadge, 
  Assignment, Announcement, Note, PointTransaction, StudentClass, Department
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
    name: 'Branded College',
    address: 'Abuja, Nigeria',
    phone: '+234-802-345-6789',
    email: 'admin@branded.edu.ng',
    logoUrl: '/api/placeholder/100/100',
    createdAt: new Date('2018-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'school-3',
    name: 'Kingsway Academy',
    address: 'Port Harcourt, Nigeria', 
    phone: '+234-803-456-7890',
    email: 'contact@kingsway.edu.ng',
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

// Users - Creating comprehensive data for all 3 schools
export const DUMMY_USERS: User[] = [
  // BrainPoint College Users
  // Principal
  {
    id: 'user-1',
    schoolId: 'school-1',
    userId: 'BP/ADMIN/001',
    name: 'Mr. Johnson',
    email: 'principal@brainpoint.edu.ng',
    role: 'principal',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  // Teachers - BrainPoint
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
  {
    id: 'user-5',
    schoolId: 'school-1',
    userId: 'BP/STAFF/004',
    name: 'Dr. Adunni Kolade',
    email: 'a.kolade@brainpoint.edu.ng',
    role: 'teacher',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // Branded College Users
  // Principal
  {
    id: 'user-51',
    schoolId: 'school-2',
    userId: 'BC/ADMIN/001',
    name: 'Mrs. Smith',
    email: 'principal@branded.edu.ng',
    role: 'principal',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  // Teachers - Branded
  {
    id: 'user-52',
    schoolId: 'school-2',
    userId: 'BC/STAFF/001',
    name: 'Mr. James Okoye',
    email: 'j.okoye@branded.edu.ng',
    role: 'teacher',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-53',
    schoolId: 'school-2',
    userId: 'BC/STAFF/002',
    name: 'Mrs. Grace Emeka',
    email: 'g.emeka@branded.edu.ng',
    role: 'teacher',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-54',
    schoolId: 'school-2',
    userId: 'BC/STAFF/003',
    name: 'Mr. Paul Ibrahim',
    email: 'p.ibrahim@branded.edu.ng',
    role: 'teacher',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-55',
    schoolId: 'school-2',
    userId: 'BC/STAFF/004',
    name: 'Miss Sarah Adamu',
    email: 's.adamu@branded.edu.ng',
    role: 'teacher',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // Kingsway Academy Users
  // Principal
  {
    id: 'user-101',
    schoolId: 'school-3',
    userId: 'KA/ADMIN/001',
    name: 'Dr. Ade',
    email: 'principal@kingsway.edu.ng',
    role: 'principal',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  // Teachers - Kingsway
  {
    id: 'user-102',
    schoolId: 'school-3',
    userId: 'KA/STAFF/001',
    name: 'Mrs. Blessing Nkomo',
    email: 'b.nkomo@kingsway.edu.ng',
    role: 'teacher',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-103',
    schoolId: 'school-3',
    userId: 'KA/STAFF/002',
    name: 'Mr. Victor Chukwu',
    email: 'v.chukwu@kingsway.edu.ng',
    role: 'teacher',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-104',
    schoolId: 'school-3',
    userId: 'KA/STAFF/003',
    name: 'Dr. Amina Usman',
    email: 'a.usman@kingsway.edu.ng',
    role: 'teacher',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-105',
    schoolId: 'school-3',
    userId: 'KA/STAFF/004',
    name: 'Mr. Daniel Ojo',
    email: 'd.ojo@kingsway.edu.ng',
    role: 'teacher',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user-106',
    schoolId: 'school-3',
    userId: 'KA/STAFF/005',
    name: 'Mrs. Rachael Odoh',
    email: 'r.odoh@kingsway.edu.ng',
    role: 'teacher',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },

  // Students - BrainPoint College (15 students for each teacher)
  {
    id: 'user-6',
    schoolId: 'school-1',
    userId: 'BP/2024/001',
    name: 'Emeka Nwankwo',
    email: 'emeka.nwankwo@student.brainpoint.edu.ng',
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// Generate more students programmatically to reach 60 students for BrainPoint (15 per teacher)
const bpStudentNames = [
  'Aisha Mohammed', 'Kemi Adeyemi', 'David Okoye', 'Grace Okoro', 'Ibrahim Yusuf',
  'Blessing Eze', 'Samuel Adepoju', 'Halima Bello', 'Victor Osagie', 'Chioma Nnaji',
  'Usman Garba', 'Patience Nkem', 'Ifeanyi Okwu', 'Zainab Aliyu', 'Joseph Okoro',
  'Mary Chukwu', 'Ahmed Hassan', 'Blessing Uche', 'Emmanuel Ogar', 'Fatima Yaro',
  'Chinedu Eze', 'Aisha Bala', 'Precious Nkem', 'Godwin Udoh', 'Hauwa Sadiq',
  'Michael Okafor', 'Charity Nwosu', 'Yakubu Musa', 'Joy Arinze', 'Sunday Okoli',
  'Blessing Obi', 'Rasheed Lawal', 'Promise Nkomo', 'Chika Onwuka', 'Habiba Umar',
  'Francis Igwe', 'Mercy Okwu', 'Bashir Sani', 'Faith Nkem', 'Collins Agu',
  'Deborah Idris', 'Sadiq Garba', 'Peace Nwogu', 'Emeka Eze', 'Hadiza Bello',
  'Thomas Okonkwo', 'Ruth Okafor', 'Naziru Hassan', 'Goodness Okoro', 'Peter Chukwu',
  'Amina Yusuf', 'Prince Udoh', 'Christiana Eze', 'Ibrahim Musa', 'Gloria Nkem',
  'Abdul Lawal', 'Rose Okwu', 'Yakubu Bello', 'Joy Nwosu'
];

// Add more BrainPoint students
for (let i = 0; i < bpStudentNames.length; i++) {
  DUMMY_USERS.push({
    id: `user-${7 + i}`,
    schoolId: 'school-1',
    userId: `BP/2024/${String(i + 2).padStart(3, '0')}`,
    name: bpStudentNames[i],
    email: `${bpStudentNames[i].toLowerCase().replace(' ', '.')}@student.brainpoint.edu.ng`,
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  });
}

// Generate students for Branded College (60 students - 15 per teacher)
const bcStudentNames = [
  'Chidi Okafor', 'Amina Bello', 'Tunde Adebayo', 'Gift Okoro', 'Musa Ibrahim',
  'Chiamaka Eze', 'Hassan Yusuf', 'Peace Nkem', 'Kelechi Ogu', 'Hadiya Garba',
  'Emmanuel Udoh', 'Mercy Chukwu', 'Bashir Lawal', 'Joy Nwosu', 'Collins Eze',
  'Fatima Sani', 'Chinedu Okoro', 'Blessing Idris', 'Yakubu Musa', 'Faith Okafor',
  'Sadiq Hassan', 'Chioma Nkem', 'Victor Onwuka', 'Aisha Bala', 'Francis Agu',
  'Deborah Yaro', 'Usman Garba', 'Promise Okwu', 'Godwin Okoli', 'Hauwa Aliyu',
  'Michael Eze', 'Charity Nwogu', 'Ibrahim Bello', 'Ruth Udoh', 'Naziru Lawal',
  'Gloria Okonkwo', 'Bashir Yusuf', 'Peace Chukwu', 'Emeka Okoro', 'Hadiza Sani',
  'Thomas Idris', 'Mercy Nkem', 'Abdul Hassan', 'Joy Okafor', 'Peter Eze',
  'Amina Garba', 'Prince Okwu', 'Christiana Bello', 'Yakubu Aliyu', 'Rose Nwosu',
  'Sadiq Musa', 'Blessing Udoh', 'Collins Yaro', 'Faith Onwuka', 'Emmanuel Agu',
  'Deborah Okoro', 'Usman Lawal', 'Promise Chukwu', 'Godwin Okoro', 'Hauwa Eze'
];

for (let i = 0; i < bcStudentNames.length; i++) {
  DUMMY_USERS.push({
    id: `user-${200 + i}`,
    schoolId: 'school-2',
    userId: `BC/2024/${String(i + 1).padStart(3, '0')}`,
    name: bcStudentNames[i],
    email: `${bcStudentNames[i].toLowerCase().replace(' ', '.')}@student.branded.edu.ng`,
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  });
}

// Generate students for Kingsway Academy (75 students - 15 per teacher, 5 teachers)
const kaStudentNames = [
  'Adaeze Okafor', 'Muhammad Bello', 'Chinonso Eze', 'Aisha Yusuf', 'Emeka Udoh',
  'Hauwa Garba', 'Chukwuma Okoro', 'Fatima Hassan', 'Victor Nkem', 'Blessing Aliyu',
  'Ibrahim Chukwu', 'Joy Okonkwo', 'Bashir Idris', 'Peace Nwosu', 'Collins Agu',
  'Hadiza Lawal', 'Kelechi Okwu', 'Amina Sani', 'Francis Okoli', 'Charity Bello',
  'Yakubu Eze', 'Ruth Udoh', 'Naziru Yaro', 'Gloria Onwuka', 'Sadiq Okafor',
  'Chioma Hassan', 'Emmanuel Nkem', 'Deborah Garba', 'Usman Chukwu', 'Promise Aliyu',
  'Godwin Okoro', 'Mercy Idris', 'Thomas Nwosu', 'Faith Agu', 'Abdul Lawal',
  'Rose Okwu', 'Peter Bello', 'Amina Eze', 'Prince Udoh', 'Christiana Yaro',
  'Ibrahim Onwuka', 'Joy Okafor', 'Yakubu Hassan', 'Blessing Nkem', 'Collins Garba',
  'Hadiya Chukwu', 'Emeka Aliyu', 'Peace Okoro', 'Bashir Idris', 'Charity Nwosu',
  'Kelechi Agu', 'Fatima Lawal', 'Victor Okwu', 'Aisha Bello', 'Francis Eze',
  'Deborah Udoh', 'Usman Yaro', 'Promise Onwuka', 'Godwin Okoro', 'Hauwa Hassan',
  'Michael Nkem', 'Ruth Garba', 'Naziru Chukwu', 'Gloria Aliyu', 'Sadiq Okoro',
  'Chioma Idris', 'Emmanuel Nwosu', 'Mercy Agu', 'Thomas Lawal', 'Faith Okwu',
  'Abdul Bello', 'Rose Eze', 'Peter Udoh', 'Amina Yaro', 'Prince Onwuka'
];

for (let i = 0; i < kaStudentNames.length; i++) {
  DUMMY_USERS.push({
    id: `user-${300 + i}`,
    schoolId: 'school-3',
    userId: `KA/2024/${String(i + 1).padStart(3, '0')}`,
    name: kaStudentNames[i],
    email: `${kaStudentNames[i].toLowerCase().replace(' ', '.')}@student.kingsway.edu.ng`,
    role: 'student',
    avatarUrl: '/api/placeholder/150/150',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  });
}

// Teachers
export const DUMMY_TEACHERS: Teacher[] = [
  // BrainPoint College Teachers
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
  },
  {
    id: 'teacher-4',
    userId: 'user-5',
    schoolId: 'school-1',
    subjects: ['Economics', 'Government'],
    classesAssigned: ['SS2A', 'SS2B', 'SS3A'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-5')
  },

  // Branded College Teachers
  {
    id: 'teacher-5',
    userId: 'user-52',
    schoolId: 'school-2',
    subjects: ['Mathematics', 'Further Mathematics'],
    classesAssigned: ['SS1A', 'SS2A', 'SS3A'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-52')
  },
  {
    id: 'teacher-6',
    userId: 'user-53',
    schoolId: 'school-2',
    subjects: ['Chemistry', 'Physics'],
    classesAssigned: ['SS1B', 'SS2B', 'SS3B'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-53')
  },
  {
    id: 'teacher-7',
    userId: 'user-54',
    schoolId: 'school-2',
    subjects: ['English', 'CRS'],
    classesAssigned: ['JSS1A', 'JSS2A', 'JSS3A'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-54')
  },
  {
    id: 'teacher-8',
    userId: 'user-55',
    schoolId: 'school-2',
    subjects: ['Geography', 'Economics'],
    classesAssigned: ['SS1C', 'SS2C', 'SS3C'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-55')
  },

  // Kingsway Academy Teachers
  {
    id: 'teacher-9',
    userId: 'user-102',
    schoolId: 'school-3',
    subjects: ['Mathematics', 'Computer Science'],
    classesAssigned: ['SS1A', 'SS2A', 'SS3A'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-102')
  },
  {
    id: 'teacher-10',
    userId: 'user-103',
    schoolId: 'school-3',
    subjects: ['Physics', 'Chemistry'],
    classesAssigned: ['SS1B', 'SS2B', 'SS3B'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-103')
  },
  {
    id: 'teacher-11',
    userId: 'user-104',
    schoolId: 'school-3',
    subjects: ['Biology', 'Agricultural Science'],
    classesAssigned: ['SS1C', 'SS2C', 'SS3C'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-104')
  },
  {
    id: 'teacher-12',
    userId: 'user-105',
    schoolId: 'school-3',
    subjects: ['English', 'Literature'],
    classesAssigned: ['JSS1A', 'JSS2A', 'JSS3A'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-105')
  },
  {
    id: 'teacher-13',
    userId: 'user-106',
    schoolId: 'school-3',
    subjects: ['History', 'Government'],
    classesAssigned: ['JSS1B', 'JSS2B', 'JSS3B'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-106')
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
  },
  {
    id: 'principal-2',
    userId: 'user-51',
    schoolId: 'school-2',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-51')
  },
  {
    id: 'principal-3',
    userId: 'user-101',
    schoolId: 'school-3',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    user: DUMMY_USERS.find(u => u.id === 'user-101')
  }
];

// Generate Students with proper distribution
export const DUMMY_STUDENTS: Student[] = [];

// Helper function to generate student records
function generateStudents(startUserId: number, schoolId: string, prefix: string, count: number) {
  const classes: StudentClass[] = ['JSS1A', 'JSS1B', 'JSS2A', 'JSS2B', 'JSS3A', 'JSS3B', 'SS1A', 'SS1B', 'SS1C', 'SS2A', 'SS2B', 'SS2C', 'SS3A', 'SS3B', 'SS3C'];
  const departments: Department[] = ['Science', 'Art', 'Commercial'];
  
  for (let i = 0; i < count; i++) {
    const studentClass = classes[i % classes.length];
    const department = departments[i % departments.length];
    const points = Math.floor(Math.random() * 400) + 100; // Random points between 100-500
    
    DUMMY_STUDENTS.push({
      id: `student-${startUserId + i}`,
      userId: `user-${startUserId + i}`,
      schoolId: schoolId,
      studentClass: studentClass,
      department: department,
      totalPoints: points,
      currentRank: i + 1,
      weeklyPoints: Math.floor(points * 0.2),
      monthlyPoints: Math.floor(points * 0.6),
      termlyPoints: points,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      user: DUMMY_USERS.find(u => u.id === `user-${startUserId + i}`)
    });
  }
}

// Generate students for all schools
generateStudents(6, 'school-1', 'BP', 60); // BrainPoint: user-6 to user-65
generateStudents(200, 'school-2', 'BC', 60); // Branded: user-200 to user-259
generateStudents(300, 'school-3', 'KA', 75); // Kingsway: user-300 to user-374

// Student Badges - sample for top students
export const DUMMY_STUDENT_BADGES: StudentBadge[] = [
  // Top student from each school gets badges
  { id: 'sb-1', studentId: 'student-6', badgeId: 'badge-1', dateEarned: new Date('2024-01-15'), badge: DUMMY_BADGES[0] },
  { id: 'sb-2', studentId: 'student-6', badgeId: 'badge-2', dateEarned: new Date('2024-02-01'), badge: DUMMY_BADGES[1] },
  { id: 'sb-3', studentId: 'student-6', badgeId: 'badge-3', dateEarned: new Date('2024-03-01'), badge: DUMMY_BADGES[2] },
  
  { id: 'sb-4', studentId: 'student-200', badgeId: 'badge-1', dateEarned: new Date('2024-01-20'), badge: DUMMY_BADGES[0] },
  { id: 'sb-5', studentId: 'student-200', badgeId: 'badge-2', dateEarned: new Date('2024-02-05'), badge: DUMMY_BADGES[1] },
  
  { id: 'sb-6', studentId: 'student-300', badgeId: 'badge-1', dateEarned: new Date('2024-01-25'), badge: DUMMY_BADGES[0] },
  { id: 'sb-7', studentId: 'student-300', badgeId: 'badge-2', dateEarned: new Date('2024-02-10'), badge: DUMMY_BADGES[1] },
  { id: 'sb-8', studentId: 'student-300', badgeId: 'badge-3', dateEarned: new Date('2024-03-15'), badge: DUMMY_BADGES[2] }
];

// Update students to include badges
DUMMY_STUDENTS.forEach(student => {
  student.badges = DUMMY_STUDENT_BADGES.filter(sb => sb.studentId === student.id);
});

// Sample assignments, announcements, etc. for each school
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
  }
];

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
  }
];

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
  }
];

export const DUMMY_POINT_TRANSACTIONS: PointTransaction[] = [
  {
    id: 'pt-1',
    schoolId: 'school-1',
    studentId: 'student-6',
    teacherId: 'teacher-1',
    points: 25,
    reason: 'Excellent participation in mathematics class',
    source: 'participation',
    createdAt: new Date('2024-12-01'),
    teacher: DUMMY_TEACHERS[0],
    student: DUMMY_STUDENTS[0]
  }
];

// Export badges for compatibility
export const AVAILABLE_BADGES = DUMMY_BADGES;

// Current User Context (switches based on login) - Default to principal
export const CURRENT_USER = {
  user: DUMMY_USERS[0], // Mr. Johnson (Principal)
  student: null,
  teacher: null,
  principal: DUMMY_PRINCIPALS[0] // Principal record
};

// Login credentials for testing
export const LOGIN_CREDENTIALS = [
  { userId: 'BP/2024/001', password: 'demo123', role: 'student' },
  { userId: 'BP/STAFF/001', password: 'demo123', role: 'teacher' },
  { userId: 'BP/ADMIN/001', password: 'demo123', role: 'principal' },
  { userId: 'BC/ADMIN/001', password: 'demo123', role: 'principal' },
  { userId: 'KA/ADMIN/001', password: 'demo123', role: 'principal' }
];
