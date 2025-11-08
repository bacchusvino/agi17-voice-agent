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
  property_type TEXT, -- 'residential', 'commercial', etc.
  
  -- Lead Source & Status
  source TEXT DEFAULT 'landing_page', -- 'craigslist', 'facebook', 'instagram', 'landing_page'
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'not_interested', 'closed'
  
  -- Qualification Data
  timeline TEXT, -- 'immediate', '1-3 months', '3-6 months', '6+ months'
  motivation TEXT, -- Why are they selling?
  agent_experience BOOLEAN, -- Have they worked with an agent before?
  interested_in_agent BOOLEAN, -- Would they consider representation?
  
  -- AI Call Data
  call_status TEXT, -- 'pending', 'completed', 'failed', 'no_answer'
  call_recording_url TEXT,
  call_transcript TEXT,
  call_duration INTEGER, -- seconds
  qualification_score INTEGER, -- 0-100
  
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
