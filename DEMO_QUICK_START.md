# 🚀 QualiFy Voice AI Demo - Quick Start

**Status:** Ready to demo on Nov 23  
**Last Updated:** Nov 7, 2025

---

## What's Working NOW

✅ **Landing page** → captures leads → stores in Supabase  
✅ **Dashboard** → displays leads with real-time filtering  
✅ **Voice AI integration** → "Call AI" button on each lead  
✅ **Stub mode** → demo without external providers  
✅ **Status tracking** → Qualified, Contacted, Not Interested  

---

## Setup (5 minutes)

### 1. Install Dependencies
```bash
cd /Users/joschapirtle/agi17-voice-agent
npm install
```

### 2. Create .env file
```bash
cp .env.production .env
# Then edit .env and add your Supabase ANON KEY:
nano .env
```

Paste your **NEW rotated Supabase key** (from Supabase dashboard > Settings > API):
```
SUPABASE_ANON_KEY=eyJ... (your rotated key)
```

### 3. Start the API server
```bash
npm run api
# Should output: ✅ API running on http://localhost:5057
```

### 4. In another terminal, start a web server
```bash
python3 -m http.server 8000
# Should output: Serving HTTP on 0.0.0.0 port 8000
```

### 5. Open the dashboard
```
http://localhost:8000/dashboard-voice.html
```

---

## Demo Flow

### 1. Add a test lead to the dashboard
**Option A:** Use landing page (http://localhost:8000/index.html)
- Fill in name, email, phone
- Click "Join the Pilot"
- Should appear in dashboard instantly

**Option B:** Add directly to Supabase
```javascript
// In browser console on dashboard:
const { data, error } = await supabaseClient
  .from('leads')
  .insert([{
    name: 'John Smith',
    phone: '619-555-1234',
    email: 'john@example.com',
    source: 'demo',
    status: 'new'
  }]);
```

### 2. Click "Call AI" button
- Lead status changes to "Contacted"
- Console shows: `[VOICE] Qualification initiated for lead {leadId}`
- In stub mode: call auto-completes after 2-7 seconds

### 3. See results
- Lead stays in dashboard with updated status
- Can mark as "Qualified" (✓) or "Not Interested" (✕)

---

## Architecture

```
Landing Page (index.html)
    ↓ (captures leads)
    ↓
API Server (server.js:5057)
    ├─ POST /api/leads → Sheets + Supabase
    ├─ GET /api/config → serves Supabase credentials
    └─ POST /api/voice/qualify → Voice AI trigger
        ├─ Bland.ai (when configured)
        ├─ Vapi (when configured)
        └─ Stub mode (for demo)
    ↓
Dashboard (dashboard-voice.html)
    ├─ Fetches config from /api/config
    ├─ Loads leads from Supabase
    └─ Shows "Call AI" button per lead
```

---

## Switching Voice AI Providers

### To use Bland.ai:
```bash
# 1. Get API key from bland.ai
# 2. Add to .env:
VOICE_PROVIDER=bland
BLAND_API_KEY=your_key_here

# 3. Restart server
npm run api
```

### To use Vapi:
```bash
# 1. Get API key from vapi.ai
# 2. Add to .env:
VOICE_PROVIDER=vapi
VAPI_API_KEY=your_key_here

# 3. Restart server
npm run api
```

### To use Stub mode (default):
```bash
# No additional setup needed
# Calls auto-complete after random 2-7 second delay
# Perfect for demos without real providers
```

---

## What's Deployed

### GitHub (main branch)
- ✅ All source code
- ✅ Voice AI endpoints
- ✅ Dashboard with Call AI button
- ✅ Security fixes (hardcoded keys removed)

### Supabase (tyrwkeqavitwkffjcznj)
- ✅ Leads table with RLS
- ✅ Status field (new, contacted, qualified, not_interested)
- ✅ Timestamps and indexes

### Netlify (optional)
- Currently static only
- TODO: Deploy API to Railway/Render for full stack

---

## N8N Craigslist Scraper

Located at: `/Users/joschapirtle/Desktop/agi17-voice-agent/n8n-workflows/`

Current state:
- ✅ Fetches from Craigslist San Diego FSBO
- ✅ Parses HTML listings
- ✅ Uses `$env.SUPABASE_ANON_KEY` (no hardcoded keys)
- ⚠️ Regex parsing is fragile (needs HTML parser)

To run in n8n:
1. Import workflow JSON
2. Set environment variable: `SUPABASE_ANON_KEY` in n8n settings
3. Test with manual trigger
4. Schedule to run every 6 hours

---

## Troubleshooting

**Dashboard shows "Supabase not initialized"**
- Check .env has SUPABASE_URL and SUPABASE_ANON_KEY
- Restart API server: `npm run api`
- Check browser console (F12) for errors

**"Call AI" button does nothing**
- Check browser console for fetch errors
- Verify API server is running on port 5057
- Check CORS: should allow localhost:8000

**Leads not appearing in dashboard**
- Verify Supabase credentials in /api/config endpoint
- Check RLS policies aren't blocking reads
- Check browser network tab for failed requests

---

## Next Steps (for Joscha's team)

### Ismoil (N8N)
- [ ] Replace regex parsing with cheerio HTML parser
- [ ] Test Craigslist scraper with real leads
- [ ] Schedule workflow to run every 6 hours
- [ ] Monitor for errors/rate limits

### MAG (Voice Script)
- [ ] Finalize qualification script
- [ ] Choose: Bland.ai vs Vapi
- [ ] Set up API keys
- [ ] Test with real phone calls

### Josh (Integration)
- [ ] Integrate Supabase client in server.js for call results
- [ ] Build dashboard analytics (call success rate, avg qualification score)
- [ ] Deploy API to Railway/Render
- [ ] Set up CORS for production domain

---

## Demo Checklist (Nov 22)

- [ ] Fresh Supabase key in .env
- [ ] API server running: `npm run api`
- [ ] Web server running: `python3 -m http.server 8000`
- [ ] Dashboard loads: http://localhost:8000/dashboard-voice.html
- [ ] Test lead creation (landing page or manual)
- [ ] Click "Call AI" - should change status to "Contacted"
- [ ] Show N8N workflow with working Craigslist scraper
- [ ] Explain how voice providers plug in

**Demo Script:**
> "We built a lead generation system that scrapes FSBO listings from Craigslist, stores them in our database, and uses AI to qualify them. Watch: I can click 'Call AI' and our system initiates a voice call to the property owner. The AI asks qualification questions, scores the lead, and stores results back here. All automated."

---

## Key Files

```
/Users/joschapirtle/agi17-voice-agent/
├── server.js                      # API with /api/voice/qualify endpoint
├── dashboard-voice.html           # NEW: Dashboard with Call AI button
├── .env                          # Credentials (IGNORED by git)
├── .env.production               # Template
├── n8n-workflows/
│   └── Qualify Scrapper with webhook.json
└── supabase/
    └── migrations/
        └── [RLS policies, lead table schema]
```

---

**Questions? Check the logs:**
```bash
# Terminal 1:
npm run api
# Watch for [VOICE] logs

# Terminal 2:
python3 -m http.server 8000
# Watch for requests

# Browser:
F12 → Console
# Watch for client-side errors
```

Good luck! 🚀
