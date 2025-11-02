# URGENT FIX: QualiFy Dashboard "column leads.created_at does not exist" Error

**Date**: Nov 2, 2025  
**Status**: CRITICAL - Production Dashboard Down  
**Root Cause**: Schema mismatch between code and Supabase database

## The Problem

The QualiFy Dashboard (qualifyrealty.netlify.app) is showing:
```
Error loading leads: column leads.created_at does not exist
```

**Why**: The dashboard code queries the `leads` table and orders by `.created_at`:
- Dashboard HTML line 457: `.order('created_at', { ascending: false })`
- The leads table in Supabase does NOT have the `created_at` column
- This causes all dashboard queries to fail

## What Went Wrong

1. **Migration files exist** - Correct schema with all columns is defined in:
   - `/supabase/migrations/20251006_create_leads_table.sql`
   - `/SIMPLE_MIGRATION.sql`
   - `/create_leads_table.sql`

2. **But not applied to production** - The migration was never run on the live Supabase database

3. **Leads table exists** (partially) - The table was created at some point but only with basic columns:
   - id, name, email, phone, address, city, state, price, property_type, source, status, timeline, motivation, agent_experience, interested_in_agent, call_status, call_recording_url, call_transcript, call_duration, qualification_score, notes
   - **MISSING**: created_at, updated_at, contacted_at, qualified_at, and possibly agent_id

## Immediate Fix

Run this SQL in Supabase SQL Editor (https://app.supabase.co):

```sql
-- Add missing timestamp columns
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS contacted_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS qualified_at TIMESTAMP WITH TIME ZONE;

-- Add performance index
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- Setup trigger for auto-updating timestamps
DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

**File saved**: `/FIX_MISSING_CREATED_AT.sql`

## Action Items

### URGENT (Do Now)
- [ ] Run FIX_MISSING_CREATED_AT.sql in Supabase SQL Editor
- [ ] Refresh dashboard at qualifyrealty.netlify.app
- [ ] Verify metrics load (Total Leads, New Today, Qualified, Contacted)

### SHORT TERM (Today)
- [ ] Review all leads currently in database
- [ ] Check if any existing data needs migration/formatting
- [ ] Test pagination and filtering
- [ ] Verify n8n leads integration is still working

### FOLLOW-UP (This Week)
- [ ] Set up proper migration pipeline for future schema changes
- [ ] Add pre-flight checks to prevent this happening again
- [ ] Document Supabase schema management process
- [ ] Update team on deployment procedures

## Team Context

- **Lead**: Joscha (fix responsibility)
- **Team**: Mandar, Mihir, Ismoil, Zubair
- **Demo**: Nov 23, 2025 (21 days away)
- **Tech Stack**: Supabase (PostgreSQL), Bolt UI, n8n workflows
- **Repo**: ~/Desktop/agi17-voice-agent/
