-- Fix schema mismatch in calls table
-- Issue: lead_id and agent_id are BIGINT but should be UUID to match leads.id and agents.id

-- Drop dependent objects first
DROP POLICY IF EXISTS "agents_view_own_calls" ON public.calls;
DROP POLICY IF EXISTS "agents_view_managed_leads_calls" ON public.calls;
DROP FUNCTION IF EXISTS get_current_agent_id();

-- Drop foreign key constraints
ALTER TABLE public.calls DROP CONSTRAINT IF EXISTS calls_lead_id_fkey;
ALTER TABLE public.calls DROP CONSTRAINT IF EXISTS calls_agent_id_fkey;

-- Change column types from BIGINT to UUID
ALTER TABLE public.calls ALTER COLUMN lead_id TYPE UUID USING lead_id::text::uuid;
ALTER TABLE public.calls ALTER COLUMN agent_id TYPE UUID USING agent_id::text::uuid;

-- Recreate foreign key constraints with correct types
ALTER TABLE public.calls
  ADD CONSTRAINT calls_lead_id_fkey
  FOREIGN KEY (lead_id)
  REFERENCES public.leads(id)
  ON DELETE CASCADE;

ALTER TABLE public.calls
  ADD CONSTRAINT calls_agent_id_fkey
  FOREIGN KEY (agent_id)
  REFERENCES public.agents(id)
  ON DELETE SET NULL;

-- Recreate helper function with correct return type
CREATE OR REPLACE FUNCTION get_current_agent_id()
RETURNS UUID AS $$
  SELECT id FROM public.agents WHERE id = auth.uid()
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Recreate RLS policies
CREATE POLICY "agents_view_own_calls"
  ON public.calls
  FOR SELECT
  TO authenticated
  USING (
    agent_id = get_current_agent_id()
  );

CREATE POLICY "agents_view_managed_leads_calls"
  ON public.calls
  FOR SELECT
  TO authenticated
  USING (
    lead_id IN (
      SELECT id FROM public.leads
      WHERE agent_id = get_current_agent_id()
    )
  );

COMMENT ON COLUMN public.calls.lead_id IS 'UUID reference to leads table (fixed from BIGINT)';
COMMENT ON COLUMN public.calls.agent_id IS 'UUID reference to agents table (fixed from BIGINT)';
