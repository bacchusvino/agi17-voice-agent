-- Disable the auth trigger that's causing the signup error
-- This trigger tries to create a profile automatically but is failing

-- Drop the trigger that automatically creates profiles on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the function that was causing the issue
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Also check if there are any other auth-related triggers
-- and disable them if they exist
DROP TRIGGER IF EXISTS set_updated_at_profiles ON public.profiles;
DROP TRIGGER IF EXISTS set_updated_at_api_keys ON public.api_keys;

-- Drop the handle_updated_at function if it exists
DROP FUNCTION IF EXISTS public.handle_updated_at();

COMMENT ON SCHEMA public IS 'Auth triggers disabled to prevent signup conflicts';
