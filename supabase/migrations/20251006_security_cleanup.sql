-- Clean up test tables and fix security warnings
-- Run this in Supabase SQL Editor or via migration

-- Option 1: Delete test tables if not needed
DROP TABLE IF EXISTS public.c1_healthcheck CASCADE;
DROP TABLE IF EXISTS public.hello_world CASCADE;

-- If those tables ARE needed, enable RLS instead:
-- ALTER TABLE public.c1_healthcheck ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.hello_world ENABLE ROW LEVEL SECURITY;

-- Fix the qualified_leads view security (optional for demo)
-- The view is fine as-is, but if you want to be strict:
DROP VIEW IF EXISTS public.qualified_leads CASCADE;

CREATE VIEW public.qualified_leads 
WITH (security_invoker = true) AS
SELECT *
FROM public.leads
WHERE status = 'qualified'
ORDER BY created_at DESC;

COMMENT ON VIEW public.qualified_leads IS 'Qualified leads only - security invoker view';
