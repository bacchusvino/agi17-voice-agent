# AGI17 Voice Agent — Supabase CI

**Status:** [![Supabase CI](https://github.com/bacchusvino/agi17-voice-agent/actions/workflows/supabase-ci.yml/badge.svg?branch=main)](https://github.com/bacchusvino/agi17-voice-agent/actions/workflows/supabase-ci.yml)

**Proof of deploy**
- Auto-deployed migration: `supabase/migrations/20250927_init.sql`
- Creates table: `public.ci_healthcheck`
- Row inserted in Studio: `note = "pipeline ok"`

**How it works**
- Pushes and PRs to `main` run the Supabase CLI.
- Workflow file: `.github/workflows/supabase-ci.yml`
