-- =============================================================================
-- COMPLETE MIGRATION SCRIPT FOR QUALIFY DATABASE
-- Run this script in Supabase SQL Editor to set up all tables and policies
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. CREATE LEADS TABLE
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT DEFAULT 'San Diego',
  state TEXT DEFAULT 'CA',
  price DECIMAL,
  property_type TEXT,
  source TEXT DEFAULT 'landing_page',
  status TEXT DEFAULT 'new',
  timeline TEXT,
  motivation TEXT,
  agent_experience BOOLEAN,
  interested_in_agent BOOLEAN,
  call_status TEXT,
  call_recording_url TEXT,
  call_transcript TEXT,
  call_duration INTEGER,
  qualification_score INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contacted_at TIMESTAMP WITH TIME ZONE,
  qualified_at TIMESTAMP WITH TIME ZONE,
  agent_id UUID
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

COMMENT ON TABLE public.leads IS 'FSBO real estate leads for QualiFy San Diego';

-- -----------------------------------------------------------------------------
-- 2. CREATE AGENTS TABLE
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.agents (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  agency TEXT NOT NULL,
  phone TEXT NOT NULL,
  api_key TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_agents_email ON public.agents(email);
CREATE INDEX IF NOT EXISTS idx_agents_api_key ON public.agents(api_key);
CREATE INDEX IF NOT EXISTS idx_agents_status ON public.agents(status);

CREATE OR REPLACE FUNCTION update_agents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_agents_updated_at ON public.agents;
CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON public.agents
  FOR EACH ROW
  EXECUTE FUNCTION update_agents_updated_at();

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'leads'
    AND column_name = 'agent_id'
  ) THEN
    ALTER TABLE public.leads ADD COLUMN agent_id UUID;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'leads_agent_id_fkey'
    AND table_name = 'leads'
  ) THEN
    ALTER TABLE public.leads ADD CONSTRAINT leads_agent_id_fkey
      FOREIGN KEY (agent_id) REFERENCES public.agents(id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_leads_agent_id ON public.leads(agent_id);

COMMENT ON TABLE public.agents IS 'QualiFy agent profiles and API keys';

-- -----------------------------------------------------------------------------
-- 3. EMAIL NORMALIZATION
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION normalize_email()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS NOT NULL THEN
    NEW.email = LOWER(TRIM(NEW.email));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS normalize_lead_email ON public.leads;
CREATE TRIGGER normalize_lead_email
  BEFORE INSERT OR UPDATE OF email ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION normalize_email();

DROP TRIGGER IF EXISTS normalize_agent_email ON public.agents;
CREATE TRIGGER normalize_agent_email
  BEFORE INSERT OR UPDATE OF email ON public.agents
  FOR EACH ROW
  EXECUTE FUNCTION normalize_email();

UPDATE public.leads SET email = LOWER(TRIM(email)) WHERE email IS NOT NULL;
UPDATE public.agents SET email = LOWER(TRIM(email)) WHERE email IS NOT NULL;

COMMENT ON FUNCTION normalize_email() IS 'Normalizes email addresses to lowercase for case-insensitive comparisons';

-- -----------------------------------------------------------------------------
-- 4. RLS POLICIES FOR LEADS TABLE
-- -----------------------------------------------------------------------------

DROP POLICY IF EXISTS "Allow public insert" ON public.leads;
DROP POLICY IF EXISTS "Allow authenticated select" ON public.leads;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.leads;
DROP POLICY IF EXISTS "anon_insert_leads" ON public.leads;
DROP POLICY IF EXISTS "anon_select_leads" ON public.leads;
DROP POLICY IF EXISTS "anon_update_leads" ON public.leads;
DROP POLICY IF EXISTS "Allow validated public insert" ON public.leads;
DROP POLICY IF EXISTS "secure_anon_insert" ON public.leads;
DROP POLICY IF EXISTS "authenticated_select" ON public.leads;
DROP POLICY IF EXISTS "authenticated_update" ON public.leads;
DROP POLICY IF EXISTS "service_role_full_access" ON public.leads;

CREATE POLICY "secure_anon_insert" ON public.leads
  FOR INSERT TO anon
  WITH CHECK (
    name IS NOT NULL AND
    length(trim(name)) >= 2 AND
    length(trim(name)) <= 100 AND
    length(COALESCE(email, '')) <= 100 AND
    length(COALESCE(phone, '')) <= 20 AND
    length(COALESCE(notes, '')) <= 500
  );

CREATE POLICY "authenticated_select" ON public.leads
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "authenticated_update" ON public.leads
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "service_role_full_access" ON public.leads
  FOR ALL TO service_role
  USING (true);

COMMENT ON POLICY "secure_anon_insert" ON public.leads IS 'Secure anonymous insert with validation. Requires authentication for read/update operations.';

-- -----------------------------------------------------------------------------
-- 5. RLS POLICIES FOR AGENTS TABLE
-- -----------------------------------------------------------------------------

DROP POLICY IF EXISTS "Allow agent signup" ON public.agents;
DROP POLICY IF EXISTS "Allow authenticated agent creation" ON public.agents;
DROP POLICY IF EXISTS "Agents can view own profile" ON public.agents;
DROP POLICY IF EXISTS "Agents can read own profile" ON public.agents;
DROP POLICY IF EXISTS "Agents can update own profile" ON public.agents;

CREATE POLICY "Allow agent signup for anon and authenticated" ON public.agents
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND
    length(trim(name)) >= 2 AND
    length(trim(name)) <= 100 AND
    email IS NOT NULL AND
    length(trim(email)) >= 5 AND
    length(trim(email)) <= 100 AND
    email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' AND
    agency IS NOT NULL AND
    length(trim(agency)) >= 2 AND
    length(trim(agency)) <= 100 AND
    phone IS NOT NULL AND
    length(regexp_replace(phone, '\D', '', 'g')) >= 10 AND
    api_key IS NOT NULL AND
    length(api_key) >= 32 AND
    status IN ('active', 'inactive', 'suspended')
  );

CREATE POLICY "Agents can read own profile" ON public.agents
  FOR SELECT TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Agents can update own profile" ON public.agents
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

COMMENT ON POLICY "Allow agent signup for anon and authenticated" ON public.agents IS 'Allows agent signup from both anonymous and authenticated users with strict validation. This fixes the signup flow where auth.signUp creates a user but does not authenticate immediately.';

-- -----------------------------------------------------------------------------
-- 6. CREATE VIEWS
-- -----------------------------------------------------------------------------

DROP VIEW IF EXISTS public.qualified_leads CASCADE;
CREATE VIEW public.qualified_leads
WITH (security_invoker = true) AS
SELECT *
FROM public.leads
WHERE status = 'qualified'
ORDER BY created_at DESC;

COMMENT ON VIEW public.qualified_leads IS 'Qualified leads only - security invoker view';
