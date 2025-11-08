# QualiFy Team Quick Reference Card

## 🔑 Credentials & URLs

**Supabase Project**
- URL: `https://tyrwkeqavitwkffjcznj.supabase.co`
- Anon Key: `eyJhbG...Nc4` (see code files)
- Dashboard: https://supabase.com/dashboard/project/tyrwkeqavitwkffjcznj

**GitHub**
- Repo: https://github.com/bacchusvino/agi17-voice-agent
- Clone: `git clone https://github.com/bacchusvino/agi17-voice-agent.git`

**Local Testing**
- Landing Page: http://localhost:8000/index.html
- Dashboard: http://localhost:8000/dashboard.html

---

## 🎯 Who Does What

### Ismoil - N8N Scraper Lead
**Task:** Craigslist → Supabase pipeline  
**Timeline:** 3 days (Oct 6-8)  
**Endpoint:** POST to Supabase REST API (see below)  
**Target:** 25+ FSBO leads captured by Friday

### MAG - Voice AI Lead  
**Task:** Write qualification script + choose platform  
**Timeline:** 2 days (Oct 6-7)  
**Deliverable:** Script document + Bland.ai vs Vapi.ai comparison  
**Output:** Qualification criteria (what makes a hot lead)

### Mihir - Dashboard Owner
**Task:** Dashboard is done! Help with UI tweaks if needed  
**Status:** ✅ Complete

### Josh - Backend & Integration Lead
**Task:** Wire voice AI to dashboard  
**Timeline:** 2 days (Oct 8-9)  
**Depends on:** MAG's platform choice  
**Output:** Working "Qualify Lead" button

---

## 📡 Supabase REST API (For Ismoil's N8N)

**Base URL:** `https://tyrwkeqavitwkffjcznj.supabase.co/rest/v1`

**Headers (all requests):**
```
apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4
Content-Type: application/json
```

**Insert Lead (POST):**
```json
POST /leads

{
  "name": "John Doe",
  "phone": "619-555-1234",
  "address": "123 Main St, San Diego, CA",
  "price": 500000,
  "source": "craigslist",
  "city": "San Diego"
}
```

**Get All Leads (GET):**
```
GET /leads?select=*
```

**Update Lead (PATCH):**
```json
PATCH /leads?id=eq.{LEAD_ID}

{
  "status": "qualified",
  "call_status": "completed"
}
```

---

## 🗓️ Daily Standup (10:00 AM)

**Format (15 minutes max):**
1. What did you finish yesterday?
2. What are you working on today?
3. Any blockers?

**Share in:** Team Slack/Discord channel

---

## 📋 Database Schema (leads table)

```sql
-- Core fields your N8N needs to populate:
name TEXT
phone TEXT  
email TEXT
address TEXT
city TEXT (default: 'San Diego')
price DECIMAL
source TEXT (use: 'craigslist', 'facebook', 'landing_page')
status TEXT (default: 'new')

-- Optional fields (can be null):
property_type TEXT
timeline TEXT
motivation TEXT
notes TEXT

-- Auto-generated:
id UUID (don't set this)
created_at TIMESTAMP (auto)
updated_at TIMESTAMP (auto)
```

---

## 🎤 Voice AI Qualification Questions (MAG)

**Required Questions:**
1. Confirm FSBO (selling without agent?)
2. Timeline (when do they want to close?)
3. Price flexibility (willing to negotiate?)
4. Previous agent experience?
5. Open to working with an agent?

**Scoring Logic:**
- **Hot (80-100):** Selling within 3 months, open to agent, flexible
- **Warm (50-79):** Selling 3-6 months, maybe agent
- **Cold (0-49):** Not ready, not interested, or bad timing

---

## 🚨 Troubleshooting

**N8N can't connect to Supabase:**
- Check API key is correct (no extra spaces!)
- Verify headers include both `apikey` and `Content-Type`
- Test endpoint with Postman first

**Dashboard shows no leads:**
- Check browser console (F12) for errors
- Verify you're using http://localhost:8000 (not file://)
- Check Supabase project isn't paused

**Form submission fails:**
- Check browser console for CORS errors
- Verify anon key is correct in index.html
- Try clearing browser cache

**Need immediate help?**
1. Check #agi17 channel
2. Tag @josh with screenshot + error message
3. Check STATUS.md for common issues

---

## 📊 Success Metrics (Friday Demo)

**Minimum Viable Demo:**
- ✅ 25+ leads in database (from Craigslist scraper)
- ✅ Dashboard displays all leads with filtering
- ✅ Status updates work (Qualified, Contacted buttons)
- ✅ Voice AI script written and documented
- ✅ End-to-end flow demonstrated

**Stretch Goals:**
- 🎯 At least 1 actual voice AI call completed
- 🎯 Webhook receiving call results
- 🎯 Full automated flow: Scrape → Call → Qualify → Deliver

---

## 🔗 Quick Links

- **Project Docs:** Google Drive (AIG 17 folder)
- **Action Plan:** See `aig17-action-plan.md` in repo
- **Status:** See `STATUS.md` in repo
- **Supabase Dashboard:** https://supabase.com/dashboard
- **N8N Docs:** https://docs.n8n.io
- **Bland.ai:** https://bland.ai/docs
- **Vapi.ai:** https://vapi.ai/docs

---

## 💪 Team Mindset

**We're ahead of schedule!** The hardest parts (database, UI, security) are DONE.

**What's left is straightforward:**
- Ismoil: Parse HTML, POST to API (standard N8N stuff)
- MAG: Write a script (just questions and logic)
- Josh: Connect APIs (webhook → database update)

**We got this! 🚀**

---

*Print this or keep it open during standups*  
*Last updated: October 5, 2025*
