-- Create agents table for QualiFy agent profiles
CREATE TABLE IF NOT EXISTS public.agents (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Agent Info
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  agency TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- API & Status
  api_key TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active', -- 'active', 'inactive', 'suspended'
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

-- Allow agents to view their own profile
CREATE POLICY "Agents can view own profile" ON public.agents
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- Allow agents to update their own profile
CREATE POLICY "Agents can update own profile" ON public.agents
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- Allow system to insert new agents (for signup)
CREATE POLICY "Allow agent signup" ON public.agents
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create index for faster queries
CREATE INDEX idx_agents_email ON public.agents(email);
CREATE INDEX idx_agents_api_key ON public.agents(api_key);
CREATE INDEX idx_agents_status ON public.agents(status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_agents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON public.agents
  FOR EACH ROW
  EXECUTE FUNCTION update_agents_updated_at();

-- Update leads table to reference agents
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS agent_id UUID REFERENCES public.agents(id);

-- Update RLS policies for leads to include agent access
DROP POLICY IF EXISTS "Allow authenticated select" ON public.leads;
CREATE POLICY "Allow authenticated select" ON public.leads
  FOR SELECT TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM public.agents WHERE id = auth.uid()
    )
  );

COMMENT ON TABLE public.agents IS 'QualiFy agent profiles and API keys';
