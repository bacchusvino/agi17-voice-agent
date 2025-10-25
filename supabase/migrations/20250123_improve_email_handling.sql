-- Improve email handling for case-insensitivity and add missing agent_id foreign key
-- This migration ensures email comparisons are case-insensitive

-- Add agent_id column if it doesn't exist (for future agent-lead relationships)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'leads'
    AND column_name = 'agent_id'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN agent_id UUID REFERENCES public.agents(id);
    CREATE INDEX IF NOT EXISTS idx_leads_agent_id ON public.leads(agent_id);
  END IF;
END $$;

-- Create a function to normalize email to lowercase
CREATE OR REPLACE FUNCTION normalize_email()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS NOT NULL THEN
    NEW.email = LOWER(TRIM(NEW.email));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to normalize emails on insert/update for leads table
DROP TRIGGER IF EXISTS normalize_lead_email ON public.leads;
CREATE TRIGGER normalize_lead_email
  BEFORE INSERT OR UPDATE OF email ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION normalize_email();

-- Add trigger to normalize emails on insert/update for agents table
DROP TRIGGER IF EXISTS normalize_agent_email ON public.agents;
CREATE TRIGGER normalize_agent_email
  BEFORE INSERT OR UPDATE OF email ON public.agents
  FOR EACH ROW
  EXECUTE FUNCTION normalize_email();

-- Update existing emails to lowercase (safe operation)
UPDATE public.leads SET email = LOWER(TRIM(email)) WHERE email IS NOT NULL;
UPDATE public.agents SET email = LOWER(TRIM(email)) WHERE email IS NOT NULL;

COMMENT ON FUNCTION normalize_email() IS 'Normalizes email addresses to lowercase for case-insensitive comparisons';
