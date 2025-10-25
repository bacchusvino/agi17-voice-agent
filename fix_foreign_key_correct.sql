-- Fix foreign key constraint issue - correct approach
-- This removes the foreign key constraint without breaking the primary key

-- First, drop the foreign key constraint
ALTER TABLE public.agents DROP CONSTRAINT IF EXISTS agents_id_fkey;

-- The id column remains as UUID PRIMARY KEY but without foreign key reference
-- We don't need to alter the column since it's still the primary key

-- Add a comment explaining the change
COMMENT ON COLUMN public.agents.id IS 'Unique agent identifier (no longer requires auth.users entry)';

-- Also update the RLS policies to work with the new flow
DROP POLICY IF EXISTS "Allow agent signup" ON public.agents;
DROP POLICY IF EXISTS "Allow authenticated agent creation" ON public.agents;
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
