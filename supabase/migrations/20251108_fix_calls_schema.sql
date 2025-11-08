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

-- Add columns with type verification
DO $$
DECLARE
  col_exists BOOLEAN;
  col_type TEXT;
BEGIN
  -- Helper function to add column only if it doesn't exist or has wrong type

  -- call_id
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='call_id') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN call_id TEXT;
  ELSE
    SELECT data_type INTO col_type FROM information_schema.columns WHERE table_name='calls' AND column_name='call_id';
    IF col_type != 'text' THEN
      RAISE EXCEPTION 'Column call_id exists but has wrong type: %. Expected: text', col_type;
    END IF;
  END IF;

  -- phone_number
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='phone_number') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN phone_number TEXT;
  END IF;

  -- call_status
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='call_status') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN call_status TEXT DEFAULT 'initiated';
  END IF;

  -- started_at
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='started_at') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN started_at TIMESTAMPTZ DEFAULT NOW();
  END IF;

  -- ended_at
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='ended_at') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN ended_at TIMESTAMPTZ;
  END IF;

  -- duration_seconds
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='duration_seconds') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN duration_seconds INT;
  END IF;

  -- transcript
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='transcript') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN transcript TEXT;
  END IF;

  -- summary
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='summary') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN summary TEXT;
  END IF;

  -- qualified
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='qualified') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN qualified BOOLEAN;
  END IF;

  -- qualification_score
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='qualification_score') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN qualification_score INT;
  END IF;

  -- hot_lead_indicators
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='hot_lead_indicators') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN hot_lead_indicators JSONB;
  END IF;

  -- video_generated
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='video_generated') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN video_generated BOOLEAN DEFAULT FALSE;
  END IF;

  -- video_url
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='video_url') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN video_url TEXT;
  END IF;

  -- video_prompt
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='video_prompt') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN video_prompt TEXT;
  END IF;

  -- heygen_call_id (renamed from heyGen_call_id for consistency)
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='heygen_call_id') INTO col_exists;
  IF NOT col_exists THEN
    -- Check if old camelCase version exists
    SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='heyGen_call_id') INTO col_exists;
    IF col_exists THEN
      ALTER TABLE public.calls RENAME COLUMN "heyGen_call_id" TO heygen_call_id;
    ELSE
      ALTER TABLE public.calls ADD COLUMN heygen_call_id TEXT;
    END IF;
  END IF;

  -- retiliai_webhook_data
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='retiliai_webhook_data') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN retiliai_webhook_data JSONB;
  END IF;

  -- sentiment_analysis
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='sentiment_analysis') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN sentiment_analysis JSONB;
  END IF;

  -- source
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='source') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN source TEXT DEFAULT 'retiliai';
  END IF;

  -- agent_id
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='agent_id') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN agent_id BIGINT;
  END IF;

  -- notes
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='notes') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN notes TEXT;
  END IF;

  -- created_at
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='created_at') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
  END IF;

  -- updated_at
  SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='calls' AND column_name='updated_at') INTO col_exists;
  IF NOT col_exists THEN
    ALTER TABLE public.calls ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
  END IF;

END $$;

-- Only create indexes if they don't already exist from the original migration
-- Note: call_id should have UNIQUE constraint from original migration, which creates index automatically
DO $$
BEGIN
  -- Only create call_id index if no unique constraint exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'calls_call_id_key' OR conname = 'idx_calls_call_id'
  ) THEN
    CREATE UNIQUE INDEX idx_calls_call_id ON public.calls(call_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_calls_lead_id ON public.calls(lead_id);
CREATE INDEX IF NOT EXISTS idx_calls_status ON public.calls(call_status);

COMMIT;
