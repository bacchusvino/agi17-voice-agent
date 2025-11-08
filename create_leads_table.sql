-- Create leads table for FSBO real estate leads
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Contact Info
  name TEXT,
  email TEXT,
  phone TEXT,
  
  -- Property Info
  address TEXT,
  city TEXT DEFAULT 'San Diego',
  state TEXT DEFAULT 'CA',
  price DECIMAL,
  property_type TEXT,
  
  -- Lead Source & Status
  source TEXT DEFAULT 'landing_page',
  status TEXT DEFAULT 'new',
  
  -- Qualification Data
  timeline TEXT,
  motivation TEXT,
  agent_experience BOOLEAN,
  interested_in_agent BOOLEAN,
  
  -- AI Call Data
  call_status TEXT,
  call_recording_url TEXT,
  call_transcript TEXT,
  call_duration INTEGER,
  qualification_score INTEGER,
  
  -- Notes & Metadata
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contacted_at TIMESTAMP WITH TIME ZONE,
  qualified_at TIMESTAMP WITH TIME ZONE
);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for form submissions)
CREATE POLICY "Allow public insert" ON public.leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all leads
CREATE POLICY "Allow authenticated select" ON public.leads
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to update leads
CREATE POLICY "Allow authenticated update" ON public.leads
  FOR UPDATE TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_source ON public.leads(source);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create a view for qualified leads only
CREATE OR REPLACE VIEW public.qualified_leads AS
SELECT *
FROM public.leads
WHERE status = 'qualified'
ORDER BY created_at DESC;

COMMENT ON TABLE public.leads IS 'FSBO real estate leads for QualiFy San Diego';
