-- Create schools table
CREATE TABLE public.schools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  address TEXT,
  phone TEXT,
  email TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create users table for authentication
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL UNIQUE, -- This will be the login ID (e.g., BP/2024/001)
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'principal')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  student_class TEXT NOT NULL,
  department TEXT NOT NULL CHECK (department IN ('Science', 'Art', 'Commercial')),
  total_points INTEGER NOT NULL DEFAULT 0,
  current_rank INTEGER NOT NULL DEFAULT 1,
  weekly_points INTEGER NOT NULL DEFAULT 0,
  monthly_points INTEGER NOT NULL DEFAULT 0,
  termly_points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create teachers table
CREATE TABLE public.teachers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  classes_assigned TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create principals table
CREATE TABLE public.principals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create assignments table
CREATE TABLE public.assignments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('google_form', 'edulastic', 'manual')),
  external_link TEXT,
  points_reward INTEGER NOT NULL DEFAULT 0,
  early_submission_bonus INTEGER NOT NULL DEFAULT 0,
  due_date TIMESTAMP WITH TIME ZONE,
  target_classes TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create announcements table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  target_audience TEXT NOT NULL DEFAULT 'all',
  target_classes TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notes table
CREATE TABLE public.notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES public.teachers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  external_link TEXT,
  target_classes TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create point transactions table
CREATE TABLE public.point_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('assignment', 'quiz', 'behavior', 'participation', 'manual')),
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create badges table
CREATE TABLE public.badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bronze', 'silver', 'gold', 'diamond')),
  points_required INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create student badges junction table
CREATE TABLE public.student_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  date_earned TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(student_id, badge_id)
);

-- Enable Row Level Security
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.principals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_badges ENABLE ROW LEVEL SECURITY;

-- Create policies for schools (readable by all authenticated users)
CREATE POLICY "Schools are viewable by all authenticated users" 
ON public.schools FOR SELECT 
TO authenticated 
USING (true);

-- Create policies for users
CREATE POLICY "Users can view users from their school" 
ON public.users FOR SELECT 
TO authenticated 
USING (school_id IN (
  SELECT school_id FROM public.users WHERE id = auth.uid()
));

-- Create policies for students
CREATE POLICY "Students can view students from their school" 
ON public.students FOR SELECT 
TO authenticated 
USING (school_id IN (
  SELECT school_id FROM public.users WHERE id = auth.uid()
));

-- Create policies for teachers
CREATE POLICY "Teachers can view teachers from their school" 
ON public.teachers FOR SELECT 
TO authenticated 
USING (school_id IN (
  SELECT school_id FROM public.users WHERE id = auth.uid()
));

-- Create policies for principals
CREATE POLICY "Principals can view principals from their school" 
ON public.principals FOR SELECT 
TO authenticated 
USING (school_id IN (
  SELECT school_id FROM public.users WHERE id = auth.uid()
));

-- Create policies for assignments
CREATE POLICY "Users can view assignments from their school" 
ON public.assignments FOR SELECT 
TO authenticated 
USING (school_id IN (
  SELECT school_id FROM public.users WHERE id = auth.uid()
));

CREATE POLICY "Teachers can insert assignments for their school" 
ON public.assignments FOR INSERT 
TO authenticated 
WITH CHECK (school_id IN (
  SELECT school_id FROM public.users WHERE id = auth.uid() AND role = 'teacher'
));

CREATE POLICY "Teachers can update their own assignments" 
ON public.assignments FOR UPDATE 
TO authenticated 
USING (teacher_id IN (
  SELECT t.id FROM public.teachers t 
  JOIN public.users u ON t.user_id = u.id 
  WHERE u.id = auth.uid()
));

-- Create policies for announcements
CREATE POLICY "Users can view announcements from their school" 
ON public.announcements FOR SELECT 
TO authenticated 
USING (school_id IN (
  SELECT school_id FROM public.users WHERE id = auth.uid()
));

CREATE POLICY "Teachers and principals can insert announcements for their school" 
ON public.announcements FOR INSERT 
TO authenticated 
WITH CHECK (school_id IN (
  SELECT school_id FROM public.users WHERE id = auth.uid() AND role IN ('teacher', 'principal')
));

-- Create policies for notes
CREATE POLICY "Users can view notes from their school" 
ON public.notes FOR SELECT 
TO authenticated 
USING (school_id IN (
  SELECT school_id FROM public.users WHERE id = auth.uid()
));

CREATE POLICY "Teachers can insert notes for their school" 
ON public.notes FOR INSERT 
TO authenticated 
WITH CHECK (school_id IN (
  SELECT school_id FROM public.users WHERE id = auth.uid() AND role = 'teacher'
));

-- Create policies for point transactions
CREATE POLICY "Users can view point transactions from their school" 
ON public.point_transactions FOR SELECT 
TO authenticated 
USING (school_id IN (
  SELECT school_id FROM public.users WHERE id = auth.uid()
));

CREATE POLICY "Teachers can insert point transactions for their school" 
ON public.point_transactions FOR INSERT 
TO authenticated 
WITH CHECK (school_id IN (
  SELECT school_id FROM public.users WHERE id = auth.uid() AND role = 'teacher'
));

-- Create policies for badges
CREATE POLICY "Badges are viewable by all authenticated users" 
ON public.badges FOR SELECT 
TO authenticated 
USING (true);

-- Create policies for student badges
CREATE POLICY "Users can view student badges from their school" 
ON public.student_badges FOR SELECT 
TO authenticated 
USING (student_id IN (
  SELECT s.id FROM public.students s 
  JOIN public.users u ON s.user_id = u.id 
  WHERE u.school_id IN (
    SELECT school_id FROM public.users WHERE id = auth.uid()
  )
));

-- Create triggers for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON public.schools FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_principals_updated_at BEFORE UPDATE ON public.principals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON public.assignments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON public.notes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update student rankings after point changes
CREATE OR REPLACE FUNCTION public.update_student_rankings()
RETURNS TRIGGER AS $$
BEGIN
    -- Update rankings for students in the same school
    WITH ranked_students AS (
        SELECT 
            id,
            ROW_NUMBER() OVER (ORDER BY total_points DESC, created_at ASC) as new_rank
        FROM public.students 
        WHERE school_id = NEW.school_id
    )
    UPDATE public.students 
    SET current_rank = ranked_students.new_rank
    FROM ranked_students 
    WHERE students.id = ranked_students.id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rankings_after_points_change 
    AFTER UPDATE OF total_points ON public.students 
    FOR EACH ROW EXECUTE FUNCTION public.update_student_rankings();