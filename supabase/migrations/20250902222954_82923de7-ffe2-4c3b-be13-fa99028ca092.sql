-- Fix security warnings by updating functions with proper search_path

-- Update the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update the update_student_rankings function
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;