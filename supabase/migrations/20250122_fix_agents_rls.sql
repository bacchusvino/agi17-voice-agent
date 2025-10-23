-- Fix RLS policy for agents table to allow authenticated inserts
-- This allows authenticated users to create their own agent profile

-- Drop the overly restrictive policy
DROP POLICY IF EXISTS "Allow agent signup" ON public.agents;

-- Create a more permissive policy that allows any authenticated user to insert
CREATE POLICY "Allow authenticated agent creation" ON public.agents
  FOR INSERT TO authenticated
  WITH CHECK (id = auth.uid());

-- Also ensure agents can read their own data
DROP POLICY IF EXISTS "Agents can view own profile" ON public.agents;
CREATE POLICY "Agents can read own profile" ON public.agents
  FOR SELECT TO authenticated
  USING (id = auth.uid());

-- Allow agents to update their own profile
DROP POLICY IF EXISTS "Agents can update own profile" ON public.agents;
CREATE POLICY "Agents can update own profile" ON public.agents
  FOR UPDATE TO authenticated
  USING (id = auth.uid() AND id = auth.uid());
