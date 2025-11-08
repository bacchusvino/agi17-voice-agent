-- Fix calls table schema
-- Renames leadid -> lead_id, adds missing columns
-- Nov 8, 2025

BEGIN;
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'calls' AND column_name = 'leadid'
  ) THEN
    ALTER TABLE public.calls RENAME COLUMN leadid TO lead_id;
  END IF;
END
$$;

ALTER TABLE public.calls
  ADD COLUMN IF NOT EXISTS call_id TEXT,
  ADD COLUMN IF NOT EXISTS phone_number TEXT,
  ADD COLUMN IF NOT EXISTS call_status TEXT DEFAULT 'initiated',
  ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS ended_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS duration_seconds INT,
  ADD COLUMN IF NOT EXISTS transcript TEXT,
  ADD COLUMN IF NOT EXISTS summary TEXT,
  ADD COLUMN IF NOT EXISTS qualified BOOLEAN,
  ADD COLUMN IF NOT EXISTS qualification_score INT,
  ADD COLUMN IF NOT EXISTS hot_lead_indicators JSONB,
  ADD COLUMN IF NOT EXISTS video_generated BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS video_url TEXT,
  ADD COLUMN IF NOT EXISTS video_prompt TEXT,
  ADD COLUMN IF NOT EXISTS heyGen_call_id TEXT,
  ADD COLUMN IF NOT EXISTS retiliai_webhook_data JSONB,
  ADD COLUMN IF NOT EXISTS sentiment_analysis JSONB,
  ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'retiliai',
  ADD COLUMN IF NOT EXISTS agent_id BIGINT,
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

CREATE UNIQUE INDEX IF NOT EXISTS idx_calls_call_id ON public.calls(call_id);
CREATE INDEX IF NOT EXISTS idx_calls_lead_id ON public.calls(lead_id);
CREATE INDEX IF NOT EXISTS idx_calls_status ON public.calls(call_status);

COMMIT;
