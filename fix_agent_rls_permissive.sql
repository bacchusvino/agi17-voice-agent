-- Temporarily make agents table INSERT policy completely permissive for debugging
-- This will help us identify if RLS is the issue

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Allow agent signup for anon and authenticated" ON public.agents;

-- Create a very permissive policy for testing
CREATE POLICY "Allow all inserts temporarily" ON public.agents
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Keep the existing SELECT and UPDATE policies
-- These should already exist from previous migration
