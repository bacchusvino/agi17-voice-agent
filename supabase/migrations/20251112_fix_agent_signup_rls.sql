-- Fix RLS policy to allow agent signup from anonymous users
-- This resolves "Database error saving new user" on signup page
-- Run this in Supabase SQL Editor: https://app.supabase.com/project/tyrwkeqavitwkffjcznj/sql/new

DROP POLICY IF EXISTS "Allow authenticated agent creation" ON public.agents;

CREATE POLICY "Allow agent signup for anon and authenticated" ON public.agents
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    -- Validate required fields
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
    status IN ('active', 'inactive', 'suspended') AND
    -- Prevent duplicate emails
    NOT EXISTS (
      SELECT 1 FROM public.agents
      WHERE email = NEW.email
    )
  );
