# ISMOIL HANDOFF — n8n Lead Scraper Integration
**Date**: Nov 2, 2025  
**Status**: ⚠️ REASSIGNED (Ismoil quit)  
**New Owner**: TBD (Mandar or Zubair)  
**Complexity**: Medium (2-4 hours)  
**Deadline**: Nov 8, 2025

---

## What Ismoil Was Building

The n8n workflow automates FSBO lead collection:
- **Trigger**: Manual or cron (every 6 hours)
- **Source**: Craigslist San Diego FSBO listings
- **Transform**: HTML parse → extract title, price, neighborhood
- **Destinations**: Google Sheets + Supabase (dashboard)
- **Goal**: Get leads flowing into dashboard by Nov 8

**Current Status**: Documentation exists (`ISMOIL_N8N_SETUP.md`) but workflow not deployed

---

## What Needs to Happen

### ✅ MUST HAVE for Demo (Nov 23)
- [ ] n8n workflow running (local or cloud)
- [ ] At least 30 test leads in Supabase `leads` table
- [ ] Dashboard shows these leads (will work once FIX_MISSING_CREATED_AT.sql deployed)
- [ ] Can demo automated lead ingestion OR manual backup

### ✅ NICE TO HAVE (if time permits)
- [ ] Scheduled cron to pull new leads every 6 hours
- [ ] Facebook lead ads integration
- [ ] Email notification when new leads arrive

---

## Quickstart (2 Hours)

### Prereq: Get n8n Running

```bash
cd /Users/joschapirtle/n8n-docker
docker-compose up -d
```

Check it's running: http://localhost:5678

### Step 1: Copy Existing Workflow (10 min)
File location: `/n8n-workflows/qualify-craigslist-scraper.json`

In n8n UI:
1. Click **Import** (hamburger menu → Import from File)
2. Select `qualify-craigslist-scraper.json`
3. Click **Create**

### Step 2: Test Workflow (30 min)
1. Click first node **Manual Trigger**
2. Click **Execute Node** (play button)
3. Watch data flow through pipeline
4. Check output at each node (click node, check "Results" tab)

**Expected outcomes:**
- Node 2 (Fetch Craigslist): HTML response ✓
- Node 3 (Parse HTML): Array of listings ✓
- Node 4 (Extract Data): Clean objects with title, price, link ✓
- Node 5 (Google Sheets): Row appears in sheet ✓
- Node 6 (Supabase): New lead row in dashboard ✓

### Step 3: Debug If Needed (30 min)

**Most common issue**: HTML selector broken  
**Fix**: 
1. Open Craigslist in browser: https://sandiego.craigslist.org/search/reo?sale_by=owner
2. Right-click on any listing → Inspect
3. Find the class name (probably still `.cl-search-result`, but may have changed)
4. Update Node 3 selector
5. Re-run test

**Other issues**:
- Google Sheets API not enabled → Go to Google Cloud, enable Google Sheets API
- Supabase API key expired → Grab new one from Supabase → Settings → API Keys
- n8n can't reach URLs → Check network/firewall

### Step 4: Load Test Data (30 min)
Once workflow works:
1. Click **Execute Node** 5-10 times to accumulate leads
2. Check Supabase: https://app.supabase.co → leads table
3. Count rows (should be 10-50+)
4. Screenshot for team

### Step 5: Set to Cron (Optional)
Once confident:
1. Delete **Manual Trigger** node
2. Add **Cron** node → `0 */6 * * *` (every 6 hours)
3. Click **Activate Workflow** (toggle, top right)
4. Workflow now runs automatically

---

## Troubleshooting Quick Ref

| Problem | Solution |
|---------|----------|
| "Can't connect to Craigslist" | Check network. Try curl: `curl -I https://sandiego.craigslist.org` |
| "HTML Extract returns empty" | Selector likely changed. Inspect element on live Craigslist page. Update CSS selector. |
| "Supabase insert fails (401)" | Check API key expiry. Get fresh key from Supabase dashboard. |
| "Google Sheets shows `#REF!`" | Column mismatch. Ensure sheet headers match node field names. |
| "n8n won't start" | Check Docker: `docker ps`. If not running: `docker-compose restart` |

---

## Team Check-in Points

**Nov 3 (Tomorrow)**
- [ ] n8n running locally
- [ ] Workflow imports successfully
- [ ] First test run executes without errors

**Nov 5 (Wednesday)**
- [ ] 30+ test leads in Supabase
- [ ] Dashboard displays leads (post FIX_MISSING_CREATED_AT.sql deploy)
- [ ] Screenshot shared with #aig17 Slack

**Nov 8 (Friday)**
- [ ] Workflow stable and repeatable
- [ ] Cron schedule set (or manual trigger documented)
- [ ] Handoff complete to rest of team

---

## Files You Have

- **Workflow JSON**: `/n8n-workflows/qualify-craigslist-scraper.json` (ready to import)
- **Setup Guide**: `/n8n-workflows/ISMOIL_N8N_SETUP.md` (detailed walkthrough)
- **Backup Plan**: If n8n fails, load `/sample_leads.csv` manually (template: see below)

---

## Backup Plan: Manual Lead Loading

If n8n can't be fixed by Nov 5, use this as fallback:

1. Create CSV file:
```csv
name,email,phone,address,city,state,price,source,status
"John Smith","john@example.com","619-555-0101","123 Main St","San Diego","CA","450000","craigslist","new"
"Jane Doe","jane@example.com","619-555-0102","456 Oak Ave","San Diego","CA","520000","craigslist","new"
```

2. Go to Supabase → leads table → "Insert" button
3. Upload CSV
4. Verify data appears on dashboard

**This is acceptable for demo** (not ideal, but works)

---

## Success Criteria

### Technical
- [ ] Workflow runs without errors
- [ ] Leads appear in Supabase within 60 seconds of trigger
- [ ] Dashboard shows metrics (Total Leads, etc.)
- [ ] Can run test 3x in a row successfully

### Demo-Ready
- [ ] 30+ test leads visible on dashboard
- [ ] Can show workflow running live (or replay recording)
- [ ] Team can explain how automation works to judges

---

## Resources

- **n8n Docs**: https://docs.n8n.io
- **Craigslist FSBO Search**: https://sandiego.craigslist.org/search/reo?sale_by=owner
- **Supabase REST API**: https://supabase.com/docs/reference/javascript/rest
- **n8n Docker Setup**: `/n8n-docker/docker-compose.yml`

---

## Questions?

Check:
1. ISMOIL_N8N_SETUP.md (detailed walkthrough)
2. Slack #aig17 (team)
3. GitHub issues (any known bugs)

**Contact**: Joscha (project lead)

---

**Assigned to**: [NAME]  
**Assigned date**: Nov 2, 2025  
**Due date**: Nov 8, 2025  
**Estimated effort**: 4 hours  
**Status**: 🔴 BLOCKED (waiting for n8n setup)

---

## IMMEDIATE ACTION

1. Read ISMOIL_N8N_SETUP.md completely
2. Confirm you can access n8n at http://localhost:5678
3. Try importing the workflow
4. Slack Joscha with status by EOD Nov 2

**Go.**
