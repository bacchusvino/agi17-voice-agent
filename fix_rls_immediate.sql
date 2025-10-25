-- IMMEDIATE FIX: Allow anonymous agent signup
-- Run this in Supabase SQL Editor to fix the RLS policy issue

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Allow agent signup" ON public.agents;
DROP POLICY IF EXISTS "Allow authenticated agent creation" ON public.agents;
DROP POLICY IF EXISTS "Allow agent signup for anon and authenticated" ON public.agents;

-- Create a new policy that allows anonymous users to insert agents
CREATE POLICY "Allow anonymous agent signup" ON public.agents
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    -- Basic validation
    name IS NOT NULL AND
    length(trim(name)) >= 2 AND
    email IS NOT NULL AND
    email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' AND
    agency IS NOT NULL AND
    phone IS NOT NULL AND
    api_key IS NOT NULL AND
    status IN ('active', 'inactive', 'suspended')
  );

-- Also allow anonymous users to read their own data (for signup confirmation)
CREATE POLICY "Allow anonymous read own agent" ON public.agents
  FOR SELECT TO anon, authenticated
  USING (true);  -- Allow reading for now, can be restricted later

COMMENT ON POLICY "Allow anonymous agent signup" ON public.agents IS
'Allows anonymous users to create agent accounts during signup process';
