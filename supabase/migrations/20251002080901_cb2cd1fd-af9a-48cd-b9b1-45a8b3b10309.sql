-- Create storage policies for student-notes bucket
-- Allow uploads to student-notes bucket
CREATE POLICY "Allow uploads to student-notes"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'student-notes');

-- Allow reading from student-notes bucket
CREATE POLICY "Allow reading from student-notes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'student-notes');

-- Allow deleting from student-notes bucket
CREATE POLICY "Allow deleting from student-notes"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'student-notes');

-- Allow updates to student-notes bucket
CREATE POLICY "Allow updates to student-notes"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'student-notes')
  WITH CHECK (bucket_id = 'student-notes');