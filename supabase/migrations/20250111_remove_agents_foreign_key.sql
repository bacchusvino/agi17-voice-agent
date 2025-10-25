-- Remove foreign key constraint from agents table
-- This allows agents to be created without requiring auth.users entry first
ALTER TABLE public.agents DROP CONSTRAINT IF EXISTS agents_id_fkey;

-- Update the agents table to remove the foreign key reference
-- The id column will remain as UUID PRIMARY KEY but without the foreign key constraint
ALTER TABLE public.agents ALTER COLUMN id DROP NOT NULL;

-- Add a comment explaining the change
COMMENT ON COLUMN public.agents.id IS 'Unique agent identifier (no longer requires auth.users entry)';
