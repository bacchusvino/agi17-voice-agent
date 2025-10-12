-- Improve RLS security for leads table
-- This migration adds rate limiting and better security to the leads table

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Allow public insert" ON public.leads;

-- Create a more restrictive insert policy with basic validation
CREATE POLICY "Allow validated public insert" ON public.leads
  FOR INSERT TO anon
  WITH CHECK (
    -- Basic validation to prevent spam
    name IS NOT NULL AND 
    length(name) > 0 AND 
    length(name) <= 100 AND
    length(COALESCE(email, '')) <= 100 AND
    length(COALESCE(phone, '')) <= 20 AND
    length(COALESCE(notes, '')) <= 500
  );

-- Add a function to check for duplicate submissions (same email/phone within 1 hour)
CREATE OR REPLACE FUNCTION check_duplicate_submission()
RETURNS TRIGGER AS $$
BEGIN
  -- Check for recent submissions with same email or phone
  IF EXISTS (
    SELECT 1 FROM public.leads 
    WHERE (
      (email IS NOT NULL AND email = NEW.email AND email != '') OR
      (phone IS NOT NULL AND phone = NEW.phone AND phone != '')
    )
    AND created_at > NOW() - INTERVAL '1 hour'
  ) THEN
    RAISE EXCEPTION 'Duplicate submission detected. Please wait before submitting again.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to prevent duplicate submissions
CREATE TRIGGER prevent_duplicate_submissions
  BEFORE INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION check_duplicate_submission();

-- Add comment explaining the security improvements
COMMENT ON POLICY "Allow validated public insert" ON public.leads IS 
'Allows anonymous inserts with basic validation and duplicate prevention. 
Application-level rate limiting should also be implemented.';
