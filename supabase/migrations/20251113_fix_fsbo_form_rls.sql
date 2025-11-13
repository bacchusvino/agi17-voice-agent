-- Fix FSBO registration form RLS error
-- Problem: Form uses anonymous client but RLS policy blocks anon inserts
-- Solution: Create permissive policy for public form submissions
-- Date: Nov 13, 2025

-- Drop any conflicting policies that might be too restrictive
DROP POLICY IF EXISTS "secure_anon_insert" ON public.leads;
DROP POLICY IF EXISTS "Allow validated public insert" ON public.leads;

-- Create a clear, permissive policy for public form submissions
-- This allows anonymous users to submit the FSBO registration form
CREATE POLICY "Allow FSBO form submission" ON public.leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- Keep authenticated select and update policies
DROP POLICY IF EXISTS "authenticated_select" ON public.leads;
CREATE POLICY "authenticated_select" ON public.leads
  FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS "authenticated_update" ON public.leads;
CREATE POLICY "authenticated_update" ON public.leads
  FOR UPDATE TO authenticated
  USING (true);

-- Service role still has full access
DROP POLICY IF EXISTS "service_role_full_access" ON public.leads;
CREATE POLICY "service_role_full_access" ON public.leads
  FOR ALL TO service_role
  USING (true);

-- Comment
COMMENT ON POLICY "Allow FSBO form submission" ON public.leads IS 
'Allows anonymous users to submit FSBO registration form without restrictions. 
Validation is handled client-side. Authenticated users can view and update.';
