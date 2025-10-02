-- Update RLS policies for custom auth system
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Students can create their own notes" ON student_notes;
DROP POLICY IF EXISTS "Students can delete their own notes" ON student_notes;
DROP POLICY IF EXISTS "Students can view their own notes" ON student_notes;
DROP POLICY IF EXISTS "Students can view their own flashcards" ON flashcards;
DROP POLICY IF EXISTS "Students can view their own quizzes" ON quizzes;
DROP POLICY IF EXISTS "Students can view quiz questions for their quizzes" ON quiz_questions;

-- Create permissive policies since app uses custom auth
CREATE POLICY "Allow all operations on student_notes"
  ON student_notes FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on flashcards"
  ON flashcards FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on quizzes"
  ON quizzes FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on quiz_questions"
  ON quiz_questions FOR ALL
  USING (true)
  WITH CHECK (true);