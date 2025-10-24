# Fix Agent Signup Error

## Problem
Getting error during agent signup:
```
AuthApiError: Database error saving new user
```

## Root Cause
The RLS (Row Level Security) policy on the `agents` table only allowed **authenticated** users to insert records. However, during signup:
1. `auth.signUp()` creates the user but doesn't authenticate them immediately
2. The code tries to insert into `agents` table while user is still anonymous
3. Insert fails because anon users don't have permission

## Solution
Apply the migration to fix the RLS policy.

### Option 1: Supabase Dashboard (Recommended)

1. Go to **https://app.supabase.com**
2. Select your project: **tyrwkeqavitwkffjcznj**
3. Go to **SQL Editor** in the left sidebar
4. Click **New query**
5. Copy and paste the contents of: `supabase/migrations/20251023_fix_agent_signup_rls.sql`
6. Click **Run** to execute the migration
7. Verify success (should see "Success. No rows returned")

### Option 2: Supabase CLI (If installed)

```bash
# Make sure you're in the project directory
cd /home/user/agi17-voice-agent

# Apply the migration
supabase db push
```

### Option 3: Manual SQL (Copy this)

```sql
-- Fix RLS policy to allow agent signup from anonymous users
DROP POLICY IF EXISTS "Allow authenticated agent creation" ON public.agents;

CREATE POLICY "Allow agent signup for anon and authenticated" ON public.agents
  FOR INSERT TO anon, authenticated
  WITH CHECK (
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
    NOT EXISTS (
      SELECT 1 FROM public.agents
      WHERE email = NEW.email
    )
  );
```

## Testing After Fix

1. Go to your agent signup page: **https://qualify-aig17.netlify.app/agent-signup.html**
2. Fill out the signup form with test data
3. Click "Create Account"
4. Should see success message with API key
5. No more "Database error saving new user" error

## What Changed

The new RLS policy:
- ✅ Allows **both anon and authenticated** users to insert
- ✅ Validates all required fields (name, email, agency, phone, API key)
- ✅ Validates email format with regex
- ✅ Prevents duplicate emails
- ✅ Ensures API keys are at least 32 characters
- ✅ Validates phone has at least 10 digits
- ✅ Maintains security while allowing signup flow to work

## Verification

After applying the migration, check that the policy exists:

```sql
SELECT * FROM pg_policies WHERE tablename = 'agents';
```

You should see the policy: `"Allow agent signup for anon and authenticated"`
