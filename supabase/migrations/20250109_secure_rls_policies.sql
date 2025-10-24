-- Secure RLS policies for production
-- This migration implements proper security for the leads table

-- First, drop all existing overly permissive policies
DROP POLICY IF EXISTS "anon_insert_leads" ON public.leads;
DROP POLICY IF EXISTS "anon_select_leads" ON public.leads;
DROP POLICY IF EXISTS "anon_update_leads" ON public.leads;
DROP POLICY IF EXISTS "Allow validated public insert" ON public.leads;

-- Create a secure insert policy for anonymous users (landing page)
-- Only allows basic lead creation with validation
CREATE POLICY "secure_anon_insert" ON public.leads
  FOR INSERT TO anon
  WITH CHECK (
    -- Basic validation
    name IS NOT NULL AND 
    length(trim(name)) >= 2 AND 
    length(trim(name)) <= 100 AND
    length(COALESCE(email, '')) <= 100 AND
    length(COALESCE(phone, '')) <= 20 AND
    length(COALESCE(notes, '')) <= 500 AND
    -- Prevent spam: no duplicate emails within 5 minutes
    NOT EXISTS (
      SELECT 1 FROM public.leads
      WHERE email = NEW.email
      AND email IS NOT NULL
      AND email != ''
      AND created_at > NOW() - INTERVAL '5 minutes'
    )
  );

-- Create a secure select policy for authenticated users only
-- Dashboard should require authentication
CREATE POLICY "authenticated_select" ON public.leads
  FOR SELECT TO authenticated
  USING (true);

-- Create a secure update policy for authenticated users only
CREATE POLICY "authenticated_update" ON public.leads
  FOR UPDATE TO authenticated
  USING (true);

-- Create a service role policy for backend operations
CREATE POLICY "service_role_full_access" ON public.leads
  FOR ALL TO service_role
  USING (true);

-- Add comment explaining security model
COMMENT ON POLICY "secure_anon_insert" ON public.leads IS 
'Secure anonymous insert with validation and duplicate prevention. 
Requires authentication for read/update operations.';

COMMENT ON POLICY "authenticated_select" ON public.leads IS 
'Only authenticated users can read leads data. Dashboard requires login.';

COMMENT ON POLICY "authenticated_update" ON public.leads IS 
'Only authenticated users can update lead status. Dashboard requires login.';

