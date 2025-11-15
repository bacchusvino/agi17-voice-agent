-- Add UNIQUE constraint to prevent duplicate leads
-- This ensures that the same email+phone combination cannot be submitted multiple times

-- First, check if there are any existing duplicates and clean them up
-- Keep only the earliest submission for each email+phone pair
DELETE FROM public.leads a
USING public.leads b
WHERE a.id > b.id
  AND a.email IS NOT NULL
  AND b.email IS NOT NULL
  AND a.email = b.email
  AND a.phone IS NOT NULL
  AND b.phone IS NOT NULL
  AND a.phone = b.phone;

-- Create unique index on (email, phone) combination
-- This prevents duplicate submissions with the same contact info
CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_unique_email_phone
ON public.leads (email, phone)
WHERE email IS NOT NULL AND phone IS NOT NULL;

-- Drop the old duplicate check trigger since we now have a stronger constraint
DROP TRIGGER IF EXISTS prevent_duplicate_submissions ON public.leads;
DROP FUNCTION IF EXISTS check_duplicate_submission();

-- Add comment explaining the constraint
COMMENT ON INDEX idx_leads_unique_email_phone IS
'Prevents duplicate lead submissions with the same email and phone number.
This is a stronger constraint than the time-based duplicate check.';
