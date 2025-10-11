# Lead Capture Page (index.html)

The landing page provides a lead form and optional voice capture.

## Supabase Setup
Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` within the page or load from a secure runtime for production builds.

## Lead Submission
- On form submit, the page inserts a row into `leads` with fields: `name`, `email`, `phone`, `notes`, `source='landing_page'`, `status='new'`.

## Voice Capture
- Toggle via the "Start Voice Capture" button.
- Uses Web Speech API when supported.
- Appends interim/final transcripts to the `notes` textarea.

## Accessibility
- Buttons include `aria-pressed` state.
- Color contrast improves readability in the hero section.