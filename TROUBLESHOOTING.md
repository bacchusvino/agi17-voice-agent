# QualiFy MVP - Troubleshooting Documentation
## What We Fixed Today (October 5, 2025)

**Status:** System is now fully operational with RLS security enabled.

---

## Problem Summary

The landing page form was failing to save leads to Supabase with a 401 "Unauthorized" error. After extensive troubleshooting, we identified and resolved multiple issues.

---

## Root Causes Identified

### 1. Supabase JS Client Library Issue
**Problem:** The Supabase JavaScript client library (loaded via CDN) was not properly sending the API key in request headers, resulting in "No API key found in request" errors.

**Solution:** Switched from using the Supabase JS client to direct REST API calls with explicit header configuration.

### 2. Row-Level Security (RLS) Policy Configuration
**Problem:** RLS policies existed but were not correctly configured to allow anonymous (anon) users to insert leads.

**Solution:** Dropped and recreated RLS policies with correct syntax and targeting the anon role explicitly.

---

## Technical Changes Made

### index.html - Form Submission Code

**Old approach (not working):**
```javascript
const { data, error } = await supabaseClient
  .from('leads')
  .insert([{ name, email, source: 'landing_page', status: 'new' }])
  .select();
```

**New approach (working):**
```javascript
const response = await fetch('https://tyrwkeqavitwkffjcznj.supabase.co/rest/v1/leads', {
  method: 'POST',
  headers: {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  },
  body: JSON.stringify({
    name: name,
    email: email,
    source: 'landing_page',
    status: 'new'
  })
});
```

**Key differences:**
- Direct fetch() call instead of Supabase client
- Explicit apikey header
- Explicit Authorization header with Bearer token
- Both headers are required for the Supabase REST API

---

## Supabase Configuration Changes

### RLS Policies Created

Run in Supabase SQL Editor:

```sql
-- Enable RLS on leads table
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (for landing page form)
CREATE POLICY "anon_insert_leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anonymous users to SELECT (for dashboard)
CREATE POLICY "anon_select_leads"
ON public.leads
FOR SELECT
TO anon
USING (true);

-- Allow anonymous users to UPDATE (for status buttons)
CREATE POLICY "anon_update_leads"
ON public.leads
FOR UPDATE
TO anon
USING (true);
```

**Why this works:**
- `TO anon` explicitly targets the anonymous role (used by the anon API key)
- `WITH CHECK (true)` allows all inserts to pass
- `USING (true)` allows all reads/updates to pass
- These policies give the anon key permission to operate on the leads table

---

## Testing Checklist

### Landing Page Test
1. Start local server: `python3 -m http.server 8000`
2. Open: http://localhost:8000/index.html
3. Fill form with test data
4. Submit
5. **Expected:** Green success message appears, form clears
6. **Browser console should show:** "Lead created: [{...}]"

### Dashboard Test
1. Open: http://localhost:8000/dashboard.html
2. **Expected:** See all submitted leads in table
3. Stats should show correct counts (Total Leads, New Today, etc.)
4. Action buttons should be visible (green check, phone, red X)

### Database Test
1. Go to Supabase → Table Editor → leads
2. **Expected:** See all test leads with correct data
3. Verify fields: name, email, source, status, created_at

---

## Current System Architecture

```
Landing Page (index.html)
    ↓
    Direct REST API POST with headers
    ↓
Supabase REST API (/rest/v1/leads)
    ↓
RLS Policy Check (anon_insert_leads)
    ↓
PostgreSQL leads table
    ↓
Dashboard (dashboard.html) via REST API GET
```

---

## Known Issues & Limitations

### Dashboard Still Uses Supabase Client
The dashboard.html file still uses the Supabase JS client for fetching data. This currently works because we added RLS policies for SELECT. However, for consistency, you may want to update dashboard.html to use direct REST API calls like index.html.

**If you see 401 errors in dashboard:**
Update the fetch code in dashboard.html to use the same pattern as index.html (direct REST API with explicit headers).

### Security Considerations
The current RLS policies allow any anonymous user to read/write all leads. This is acceptable for MVP but should be refined for production:

- Consider restricting SELECT to only authenticated users
- Add field-level security if needed
- Consider adding policies based on user ownership

---

## API Endpoint Reference (For Ismoil's N8N Workflow)

### Insert a Lead (POST)

**Endpoint:**
```
POST https://tyrwkeqavitwkffjcznj.supabase.co/rest/v1/leads
```

**Headers:**
```
apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4
Content-Type: application/json
Prefer: return=representation
```

**Body (JSON):**
```json
{
  "name": "John Doe",
  "phone": "619-555-1234",
  "email": "john@example.com",
  "address": "123 Main St, San Diego, CA",
  "price": 500000,
  "source": "craigslist",
  "status": "new"
}
```

**Response (Success - 201):**
```json
[
  {
    "id": "uuid-here",
    "name": "John Doe",
    "phone": "619-555-1234",
    "email": "john@example.com",
    "address": "123 Main St, San Diego, CA",
    "price": 500000,
    "source": "craigslist",
    "status": "new",
    "created_at": "2025-10-05T20:15:00.000Z",
    ...
  }
]
```

---

## N8N Workflow Notes (For Ismoil)

### Workflow Structure
1. **Schedule Trigger** - Every 6 hours
2. **HTTP Request Node** - GET Craigslist HTML
3. **HTML Extract Node** - Parse listing data
4. **Function Node** - Clean and format data
5. **HTTP Request Node** - POST to Supabase (use endpoint above)
6. **Error Handler** - Log failures

### Required Headers in N8N HTTP Request Node
- Add all 4 headers listed above
- Use "Header Auth" or "Custom Headers" option
- Test with one record before running full workflow

### Data Mapping
Make sure your N8N output matches the JSON body format above. Required fields:
- name (TEXT)
- source (TEXT) - set to "craigslist"
- status (TEXT) - set to "new"

Optional but recommended:
- phone (TEXT)
- email (TEXT)
- address (TEXT)
- price (DECIMAL)

---

## Troubleshooting Guide

### Error: "No API key found in request"
**Cause:** Missing apikey or Authorization header  
**Fix:** Ensure both headers are present in the request

### Error: "new row violates row-level security policy"
**Cause:** RLS policies not configured correctly  
**Fix:** Run the SQL commands in the "Supabase Configuration Changes" section above

### Error: 404 Not Found
**Cause:** Wrong endpoint URL or table name  
**Fix:** Verify table name is exactly "leads" (lowercase) and URL is correct

### Form submits but shows error message
**Cause:** Browser console will have details  
**Fix:** Open console (F12), look for red errors, check network tab for response

### Dashboard shows "Loading leads..." forever
**Cause:** Either RLS blocking SELECT or dashboard.html credentials wrong  
**Fix:** 
1. Verify RLS SELECT policy exists (anon_select_leads)
2. Check browser console for errors
3. Verify SUPABASE_URL and SUPABASE_ANON_KEY in dashboard.html match index.html

---

## What's Next

### Immediate Tasks (This Week)
1. **Ismoil:** Build N8N Craigslist scraper using API endpoint above
2. **MAG:** Write voice AI qualification script
3. **Josh:** Prepare voice AI integration (webhook receiver)

### Testing Checklist Before Friday Demo
- [ ] Landing page form works (manual test)
- [ ] N8N scraper adds leads to database (automated test)
- [ ] Dashboard displays all leads from both sources
- [ ] Voice AI script is documented
- [ ] Team can run full demo flow

### Future Improvements (Post-MVP)
- Update dashboard.html to use direct REST API calls
- Add authentication for dashboard (not public)
- Refine RLS policies for better security
- Add error logging/monitoring
- Deploy to production hosting (Vercel/Netlify)

---

## Files Modified

All changes committed to GitHub (main branch):

**Updated files:**
- `index.html` - Changed to direct REST API calls
- `dashboard.html` - Already working with Supabase client

**New files created:**
- `STATUS.md` - Project status
- `TEAM_REFERENCE.md` - Quick reference
- `ARCHITECTURE.md` - System diagrams
- `JOSH_SUMMARY.md` - Summary for Josh
- `test_system.sh` - Test script
- This file: `TROUBLESHOOTING.md`

---

## Quick Commands Reference

**Start local server:**
```bash
cd /Users/joschapirtle/agi17-voice-agent
python3 -m http.server 8000
```

**Test endpoints:**
- Landing page: http://localhost:8000/index.html
- Dashboard: http://localhost:8000/dashboard.html

**Supabase SQL Editor:**
https://supabase.com/dashboard/project/tyrwkeqavitwkffjcznj/sql

**Supabase Table Editor:**
https://supabase.com/dashboard/project/tyrwkeqavitwkffjcznj/editor

---

## Contact

If you encounter issues not covered in this document:
1. Check browser console for error messages
2. Check Supabase logs in dashboard
3. Review this troubleshooting guide
4. Ask in team channel with screenshots

---

**Document created:** October 5, 2025  
**Last tested:** October 5, 2025 8:20 PM  
**Status:** System fully operational
