-- Create storage bucket for student PDF notes
INSERT INTO storage.buckets (id, name, public) 
VALUES ('student-notes', 'student-notes', false);

-- Storage policies for student notes
CREATE POLICY "Students can upload their own notes"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'student-notes' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Students can view their own notes"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'student-notes' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Students can delete their own notes"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'student-notes' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create student_notes table (separate from teacher notes)
CREATE TABLE public.student_notes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  student_id TEXT NOT NULL,
  school_id TEXT NOT NULL,
  title TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  processing_status TEXT NOT NULL DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.student_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own notes"
ON public.student_notes FOR SELECT
USING (auth.uid()::text IN (SELECT user_id FROM public.students WHERE id = student_id));

CREATE POLICY "Students can create their own notes"
ON public.student_notes FOR INSERT
WITH CHECK (auth.uid()::text IN (SELECT user_id FROM public.students WHERE id = student_id));

CREATE POLICY "Students can delete their own notes"
ON public.student_notes FOR DELETE
USING (auth.uid()::text IN (SELECT user_id FROM public.students WHERE id = student_id));

-- Create flashcards table
CREATE TABLE public.flashcards (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  note_id TEXT NOT NULL,
  student_id TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own flashcards"
ON public.flashcards FOR SELECT
USING (auth.uid()::text IN (SELECT user_id FROM public.students WHERE id = student_id));

-- Create quizzes table
CREATE TABLE public.quizzes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  note_id TEXT NOT NULL,
  student_id TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own quizzes"
ON public.quizzes FOR SELECT
USING (auth.uid()::text IN (SELECT user_id FROM public.students WHERE id = student_id));

-- Create quiz_questions table
CREATE TABLE public.quiz_questions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  quiz_id TEXT NOT NULL,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view quiz questions for their quizzes"
ON public.quiz_questions FOR SELECT
USING (
  quiz_id IN (
    SELECT id FROM public.quizzes 
    WHERE student_id IN (
      SELECT id FROM public.students WHERE user_id = auth.uid()::text
    )
  )
);

-- Add triggers for updated_at
CREATE TRIGGER update_student_notes_updated_at
BEFORE UPDATE ON public.student_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();