-- ==============================================================================
-- CRITICAL FIX: Add missing created_at column to leads table
-- This fixes the "column leads.created_at does not exist" error
-- ==============================================================================

-- Step 1: Check if column exists and add if missing
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Step 2: Add other missing timestamp columns if they don't exist
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS contacted_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS qualified_at TIMESTAMP WITH TIME ZONE;

-- Step 3: Ensure the index exists for performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- Step 4: Recreate the update trigger for updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Done! The dashboard should now work correctly
COMMENT ON COLUMN public.leads.created_at IS 'Timestamp when the lead was created';
