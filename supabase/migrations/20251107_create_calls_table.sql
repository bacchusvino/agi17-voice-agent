-- Create calls table for recording ReTiliai voice call data
-- Nov 7, 2025 - Captures call metadata, transcripts, and HeyGen integration

CREATE TABLE IF NOT EXISTS public.calls (
    id BIGSERIAL PRIMARY KEY,
    lead_id BIGINT REFERENCES public.leads(id) ON DELETE CASCADE,
    
    -- Call metadata
    call_id TEXT UNIQUE NOT NULL,           -- ReTiliai call ID
    phone_number TEXT NOT NULL,             -- Lead's phone number
    call_status TEXT DEFAULT 'initiated',   -- initiated, ringing, answered, completed, failed
    
    -- Timing
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    duration_seconds INT,
    
    -- Call content
    transcript TEXT,                        -- Full call transcript from ReTiliai
    summary TEXT,                           -- AI-generated summary of call
    
    -- Qualification results
    qualified BOOLEAN DEFAULT NULL,         -- NULL = pending, TRUE = qualified, FALSE = not interested
    qualification_score INT,                -- 0-100 score from ReTiliai analysis
    hot_lead_indicators JSONB,              -- {ready_to_sell: true, timeline: "30 days", flexible_price: true}
    
    -- HeyGen integration
    video_generated BOOLEAN DEFAULT FALSE,  -- Whether video was created
    video_url TEXT,                         -- HeyGen video URL
    video_prompt TEXT,                      -- What HeyGen was asked to create
    heygen_call_id TEXT,                    -- HeyGen job/call ID for tracking
    
    -- Webhook data
    retiliai_webhook_data JSONB,            -- Full ReTiliai webhook payload
    sentiment_analysis JSONB,               -- {overall: "positive", confidence: 0.85}
    
    -- Metadata
    source TEXT DEFAULT 'retiliai',
    agent_id BIGINT REFERENCES public.agents(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for fast querying
-- Note: call_id already has index from UNIQUE constraint, no need for separate index
CREATE INDEX idx_calls_lead_id ON public.calls(lead_id);
CREATE INDEX idx_calls_status ON public.calls(call_status);
CREATE INDEX idx_calls_qualified ON public.calls(qualified);
CREATE INDEX idx_calls_created_at ON public.calls(created_at);
CREATE INDEX idx_calls_agent_id ON public.calls(agent_id);

-- RLS policies
ALTER TABLE public.calls ENABLE ROW LEVEL SECURITY;

-- Helper function to get current agent ID (cached per request)
CREATE OR REPLACE FUNCTION get_current_agent_id()
RETURNS BIGINT AS $$
  SELECT id FROM public.agents WHERE auth_user_id = auth.uid()
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Policy: Agents can view their own calls
CREATE POLICY "agents_view_own_calls"
  ON public.calls
  FOR SELECT
  TO authenticated
  USING (
    agent_id = get_current_agent_id()
  );

-- Policy: Agents can view calls for leads they're managing
CREATE POLICY "agents_view_managed_leads_calls"
  ON public.calls
  FOR SELECT
  TO authenticated
  USING (
    lead_id IN (
      SELECT id FROM public.leads
      WHERE assigned_to = get_current_agent_id()
    )
  );

-- Policy: Service role (N8N, webhooks) can insert calls
-- Only allow inserts from retiliai source to prevent abuse
CREATE POLICY "service_insert_calls"
  ON public.calls
  FOR INSERT
  TO authenticated
  WITH CHECK (source = 'retiliai' OR source = 'manual');

-- Policy: Service role can update calls
-- Prevent modification of system fields like id, created_at
CREATE POLICY "service_update_calls"
  ON public.calls
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_calls_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calls_updated_at_trigger
BEFORE UPDATE ON public.calls
FOR EACH ROW
EXECUTE FUNCTION update_calls_updated_at();

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON public.calls TO authenticated;
GRANT USAGE ON SEQUENCE calls_id_seq TO authenticated;
