# QualiFy - Setup Instructions

## ✅ What's Already Done

1. **Landing Page** (`index.html`) - Complete marketing site with Supabase integration
2. **Dashboard** (`dashboard.html`) - Lead management interface
3. **Database Schema** (`supabase/migrations/20251006_create_leads_table.sql`) - Full leads table with RLS policies

---

## 🚀 Quick Start (Next 30 Minutes)

### Step 1: Run the Supabase Migration

```bash
cd /Users/joschapirtle/agi17-voice-agent

# Make sure Supabase CLI is installed
# If not: brew install supabase/tap/supabase

# Link to your Supabase project
supabase link --project-ref YOUR_PROJECT_REF

# Run the migration
supabase db push
```

This creates the `leads` table with all the fields you need.

---

### Step 2: Get Your Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** (looks like: `https://xxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

---

### Step 3: Update Your Files

**Update `index.html` (line 488):**
```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'eyJxxxYOUR_ACTUAL_KEYxxx';
```

**Update `dashboard.html` (line 267):**
```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'eyJxxxYOUR_ACTUAL_KEYxxx';
```

---

### Step 4: Test It Locally

```bash
# Option 1: Python SimpleHTTPServer
python3 -m http.server 8000

# Option 2: Node.js http-server
npx http-server

# Then open:
# Landing Page: http://localhost:8000/index.html
# Dashboard: http://localhost:8000/dashboard.html
```

**Test the flow:**
1. Fill out the form on the landing page
2. Check the dashboard - your lead should appear!

---

### Step 5: Deploy (Optional)

**Option A: GitHub Pages (Free)**
```bash
# Push to GitHub
git add .
git commit -m "Added Supabase integration"
git push origin main

# Enable GitHub Pages:
# GitHub repo → Settings → Pages → Source: main branch
```

**Option B: Vercel/Netlify (Free)**
- Connect your GitHub repo
- Deploy automatically

---

## 📊 Database Schema

Your `leads` table has these fields:

```
id                  UUID (auto-generated)
name                TEXT
email               TEXT
phone               TEXT
address             TEXT
city                TEXT (default: 'San Diego')
state               TEXT (default: 'CA')
price               DECIMAL
property_type       TEXT
source              TEXT (default: 'landing_page')
status              TEXT (default: 'new')
timeline            TEXT
motivation          TEXT
agent_experience    BOOLEAN
interested_in_agent BOOLEAN
call_status         TEXT
call_recording_url  TEXT
call_transcript     TEXT
call_duration       INTEGER
qualification_score INTEGER
notes               TEXT
created_at          TIMESTAMP
updated_at          TIMESTAMP
contacted_at        TIMESTAMP
qualified_at        TIMESTAMP
```

---

## 🔄 What's Next

### Immediate (This Week):

1. **Get credentials & test** - 30 mins
2. **Add 2-3 test leads manually** in Supabase Studio
3. **Show team the dashboard** - Boom, momentum!

### Soon (Next Week):

1. **Ismoil**: Build N8N workflow to scrape Craigslist → push to this Supabase table
2. **MAG**: Research Vapi.ai or Bland.ai for voice calling
3. **Mihir**: Can help style the dashboard if needed

---

## 🎯 How To Add Leads (For Testing)

### Option 1: Use the Landing Page Form
Just fill it out - it saves directly to Supabase now!

### Option 2: Add Manually in Supabase Studio
1. Go to your Supabase project
2. Click **Table Editor** → `leads`
3. Click **Insert Row**
4. Fill in some test data

### Option 3: Use N8N (Coming Soon)
Ismoil will set up the Craigslist scraper to auto-populate this table.

---

## 🔗 File Links

- **Landing Page**: `/index.html`
- **Dashboard**: `/dashboard.html`
- **Migration**: `/supabase/migrations/20251006_create_leads_table.sql`

---

## ❓ Troubleshooting

**Problem**: "Error loading leads" in dashboard
**Solution**: Check that:
1. Migration ran successfully (`supabase db push`)
2. Supabase credentials are correct in both HTML files
3. RLS policies are enabled (they are in the migration)

**Problem**: "Error saving lead" on form submit
**Solution**: Check browser console (F12) for actual error message

**Problem**: Can't connect to Supabase
**Solution**: Make sure you're using the ANON key, not the SERVICE_ROLE key

---

## 📝 Notes

- The landing page form now saves to Supabase automatically
- The dashboard updates every 30 seconds
- Status badges change color based on lead status
- You can filter/search leads in the dashboard
- All timestamps are automatic

---

## 🎉 You're Ready!

1. Run the migration
2. Add your Supabase credentials
3. Test the form
4. Check the dashboard
5. Show your team

**Questions?** Check the console logs in your browser (F12) for debugging.

---

Built with ❤️ for AIG 17
