import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Student, Teacher, Principal, UserRole, StudentClass, Department } from '@/types/school';
import { supabase } from '@/integrations/supabase/client';

interface AuthUser {
  user: User;
  student?: Student;
  teacher?: Teacher;
  principal?: Principal;
}

interface AuthContextType {
  currentUser: AuthUser | null;
  login: (userId: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (userId: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      
      // For demo purposes, we'll use hardcoded credentials
      // In a real app, this would authenticate against Supabase
      if (password !== 'demo123') {
        return { success: false, error: 'Invalid credentials' };
      }

      // Fetch user data from Supabase
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (userError || !userData) {
        return { success: false, error: 'User not found' };
      }

      const user: User = {
        id: userData.id,
        schoolId: userData.school_id,
        userId: userData.user_id,
        name: userData.name,
        email: userData.email,
        role: userData.role as UserRole,
        avatarUrl: userData.avatar_url,
        createdAt: new Date(userData.created_at),
        updatedAt: new Date(userData.updated_at)
      };

      let authUser: AuthUser = { user };

      // Fetch role-specific data
      if (user.role === 'student') {
        const { data: studentData } = await supabase
          .from('students')
          .select(`
            *,
            student_badges (
              *,
              badges (*)
            )
          `)
          .eq('user_id', user.id)
          .single();

        if (studentData) {
          authUser.student = {
            id: studentData.id,
            userId: studentData.user_id,
            schoolId: studentData.school_id,
            studentClass: studentData.student_class as StudentClass,
            department: studentData.department as Department,
            totalPoints: studentData.total_points,
            currentRank: studentData.current_rank,
            weeklyPoints: studentData.weekly_points,
            monthlyPoints: studentData.monthly_points,
            termlyPoints: studentData.termly_points,
            createdAt: new Date(studentData.created_at),
            updatedAt: new Date(studentData.updated_at),
            user,
            badges: studentData.student_badges?.map((sb: any) => ({
              id: sb.id,
              studentId: sb.student_id,
              badgeId: sb.badge_id,
              dateEarned: new Date(sb.date_earned),
              badge: sb.badges
            })) || []
          };
        }
      } else if (user.role === 'teacher') {
        const { data: teacherData } = await supabase
          .from('teachers')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (teacherData) {
          authUser.teacher = {
            id: teacherData.id,
            userId: teacherData.user_id,
            schoolId: teacherData.school_id,
            subjects: teacherData.subjects,
            classesAssigned: teacherData.classes_assigned as StudentClass[],
            createdAt: new Date(teacherData.created_at),
            updatedAt: new Date(teacherData.updated_at),
            user
          };
        }
      } else if (user.role === 'principal') {
        const { data: principalData } = await supabase
          .from('principals')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (principalData) {
          authUser.principal = {
            id: principalData.id,
            userId: principalData.user_id,
            schoolId: principalData.school_id,
            createdAt: new Date(principalData.created_at),
            updatedAt: new Date(principalData.updated_at),
            user
          };
        }
      }

      setCurrentUser(authUser);
      localStorage.setItem('currentUser', JSON.stringify(authUser));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}