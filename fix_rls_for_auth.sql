-- Fix RLS policies to work with auth.signUp() flow
-- This allows authenticated users (created via auth.signUp) to insert agents

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anonymous agent signup" ON public.agents;
DROP POLICY IF EXISTS "Allow anonymous read own agent" ON public.agents;
DROP POLICY IF EXISTS "Allow agent signup for anon and authenticated" ON public.agents;

-- Create policy that allows authenticated users to insert their own agent record
CREATE POLICY "Allow authenticated agent creation" ON public.agents
  FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

-- Allow agents to read their own profile
CREATE POLICY "Allow agents to read own profile" ON public.agents
  FOR SELECT TO authenticated
  USING (id = auth.uid());

-- Allow agents to update their own profile
CREATE POLICY "Allow agents to update own profile" ON public.agents
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

COMMENT ON POLICY "Allow authenticated agent creation" ON public.agents IS
'Allows authenticated users to create their own agent profile during signup';
