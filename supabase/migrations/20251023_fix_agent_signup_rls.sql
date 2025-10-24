-- Fix RLS policy to allow agent signup from anonymous users
-- This fixes the "Database error saving new user" issue during signup
-- The issue occurs because auth.signUp() creates a user but doesn't authenticate them immediately

-- Drop the existing overly restrictive policy that only allows authenticated users
DROP POLICY IF EXISTS "Allow authenticated agent creation" ON public.agents;

-- Create a new policy that allows both anon and authenticated users to insert
-- but with strict validation to ensure security
CREATE POLICY "Allow agent signup for anon and authenticated" ON public.agents
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    -- Validate required fields
    name IS NOT NULL AND
    length(trim(name)) >= 2 AND
    length(trim(name)) <= 100 AND
    email IS NOT NULL AND
    length(trim(email)) >= 5 AND
    length(trim(email)) <= 100 AND
    email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' AND  -- Valid email format
    agency IS NOT NULL AND
    length(trim(agency)) >= 2 AND
    length(trim(agency)) <= 100 AND
    phone IS NOT NULL AND
    length(regexp_replace(phone, '\D', '', 'g')) >= 10 AND  -- At least 10 digits
    api_key IS NOT NULL AND
    length(api_key) >= 32 AND  -- Secure API key length
    status IN ('active', 'inactive', 'suspended') AND
    -- Prevent duplicate emails
    NOT EXISTS (
      SELECT 1 FROM public.agents
      WHERE email = NEW.email
    )
  );

-- Keep the existing policies for select and update (authenticated only)
-- These should already exist from previous migrations

COMMENT ON POLICY "Allow agent signup for anon and authenticated" ON public.agents IS
'Allows agent signup from both anonymous and authenticated users with strict validation.
This fixes the signup flow where auth.signUp creates a user but does not authenticate immediately.';
