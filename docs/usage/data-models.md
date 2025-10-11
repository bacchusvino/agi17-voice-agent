# Data Models

The app expects these tables in your Supabase project.

## leads
Minimal fields used by the UI:
- id: uuid (primary key)
- name: text
- email: text
- phone: text
- address: text (optional)
- city: text (optional)
- state: text (optional)
- price: numeric (optional)
- property_type: text (optional)
- source: text (e.g., 'landing_page', 'facebook')
- status: text (e.g., 'new', 'contacted', 'qualified', 'not_interested')
- created_at: timestamp with time zone (default now())
- updated_at: timestamp with time zone

## profiles
Used by the `login-sync` Edge Function:
- id: uuid (matches auth user id)
- email: text
- google_sub: text (optional)
- updated_at: timestamp with time zone

## messages
Used by the `ingest-transcript` Edge Function:
- id: uuid (primary key)
- user_id: uuid
- role: text ('user' | ...)
- content: text
- created_at: timestamp with time zone