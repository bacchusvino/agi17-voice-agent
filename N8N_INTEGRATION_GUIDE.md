# N8N Integration Guide for QualiFy
## Ismoil's Task: FSBO Lead Scraper → Google Sheets → Supabase

**Status:** 🟡 In Progress (Ismoil tinkering with n8n)  
**Priority:** HIGH  
**Timeline:** 3-5 days  
**Demo Day:** November 23, 2025 (43 days away)

---

## 🎯 Goal

Build an automated workflow that:
1. **Scrapes** FSBO listings from Craigslist San Diego
2. **Extracts** lead data (name, phone, address, price)
3. **Writes** to Google Sheets for review
4. **Syncs** to Supabase for dashboard display

---

## 🏗️ Architecture Overview

```
Craigslist FSBO Listings (San Diego)
          ↓
    [n8n Workflow]
    - HTTP Request (GET)
    - HTML Parser
    - Data Extraction
          ↓
   Google Sheets API
    (Append Row)
          ↓
   Supabase REST API
    (Insert Lead)
          ↓
  QualiFy Dashboard
   (Live Display)
```

---

## 🚀 Quick Start - n8n Setup

### 1. Start n8n Docker Container

```bash
cd /Users/joschapirtle/n8n-docker
docker-compose up -d
```

**Access n8n:** http://localhost:5678

### 2. First-Time Setup
- Create admin account
- Set up credentials (Google, Supabase)
- Import workflow template (when ready)

### 3. Stop n8n
```bash
docker-compose down
```

---

## 📋 Workflow Steps (Detailed)

### Step 1: Craigslist HTTP Request
**Node Type:** HTTP Request  
**Method:** GET  
**URL:** `https://sandiego.craigslist.org/search/reo?sale_by=owner`

**Response Format:** HTML page with listings

### Step 2: Parse HTML
**Node Type:** HTML Extract  
**Selectors:**
- `.result-row` - Each listing container
- `.result-title` - Property address/title
- `.result-price` - Asking price
- `.result-hood` - Neighborhood
- `.result-meta` - Posting date

**Output:** Array of listing objects

### Step 3: Extract Contact Info
**Node Type:** Function or Code  
**Goal:** Parse listing page for phone/email

**Pseudo-code:**
```javascript
// For each listing URL
const listingPage = await fetch(listingUrl);
const html = await listingPage.text();

// Extract phone pattern
const phoneRegex = /(\d{3}[-.]?\d{3}[-.]?\d{4})/;
const phone = html.match(phoneRegex)?.[0];

// Extract email pattern
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
const email = html.match(emailRegex)?.[0];

return {
  name: extractedName,
  phone: phone,
  email: email,
  address: listingAddress,
  price: listingPrice,
  url: listingUrl,
  source: 'craigslist',
  city: 'San Diego'
};
```

### Step 4: Append to Google Sheets
**Node Type:** Google Sheets  
**Action:** Append Row  
**Sheet ID:** `[YOUR_SHEET_ID]`  
**Sheet Name:** "Leads"

**Columns:**
| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Name | Phone | Email | Address | Price | Source | City | URL | Date |

**Mapping:**
```
A: {{$node["Extract"].json["name"]}}
B: {{$node["Extract"].json["phone"]}}
C: {{$node["Extract"].json["email"]}}
D: {{$node["Extract"].json["address"]}}
E: {{$node["Extract"].json["price"]}}
F: craigslist
G: San Diego
H: {{$node["Extract"].json["url"]}}
I: {{$now}}
```

### Step 5: Insert into Supabase
**Node Type:** HTTP Request  
**Method:** POST  
**URL:** `https://tyrwkeqavitwkffjcznj.supabase.co/rest/v1/leads`

**Headers:**
```json
{
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4",
  "Content-Type": "application/json",
  "Prefer": "return=representation"
}
```

**Body:**
```json
{
  "name": "{{$node["Extract"].json["name"]}}",
  "phone": "{{$node["Extract"].json["phone"]}}",
  "email": "{{$node["Extract"].json["email"]}}",
  "notes": "{{$node["Extract"].json["address"]}} - ${{$node["Extract"].json["price"]}}",
  "source": "craigslist",
  "status": "new"
}
```

### Step 6: Schedule Execution
**Node Type:** Cron  
**Schedule:** Every 6 hours  
**Cron Expression:** `0 */6 * * *`

**Or Manual Trigger for Testing:**
**Node Type:** Manual Trigger

---

## 🧪 Testing Checklist

- [ ] n8n Docker container running (`docker ps`)
- [ ] Can access http://localhost:5678
- [ ] Google Sheets API credentials added
- [ ] Test HTTP request to Craigslist (returns HTML)
- [ ] Test HTML parsing (extracts at least 5 listings)
- [ ] Test Google Sheets append (1 row added successfully)
- [ ] Test Supabase insert (lead appears in dashboard)
- [ ] Test full workflow end-to-end
- [ ] Verify no duplicates in Supabase
- [ ] Schedule workflow for automatic runs

---

## 🔐 Required Credentials

### Google Sheets API
1. Go to Google Cloud Console
2. Create/select project
3. Enable Google Sheets API
4. Create Service Account
5. Download JSON key
6. Share Google Sheet with service account email
7. Add credentials to n8n

### Supabase API
**Already configured!**
- URL: `https://tyrwkeqavitwkffjcznj.supabase.co`
- Anon Key: (see Headers above)

---

## 📊 Success Metrics

**MVP Goals:**
- [ ] 25+ FSBO leads scraped by end of week
- [ ] All leads visible in Google Sheet
- [ ] All leads synced to Supabase dashboard
- [ ] Workflow runs automatically every 6 hours
- [ ] No crashes or errors in n8n logs

**Demo Day Goals:**
- [ ] 100+ leads collected
- [ ] Deduplication logic working
- [ ] Error handling robust
- [ ] Workflow exported and documented

---

## 🐛 Troubleshooting

### Issue: n8n won't start
**Solution:**
```bash
# Check if port 5678 is already in use
lsof -i :5678

# Stop any conflicting process
kill -9 [PID]

# Restart n8n
docker-compose down && docker-compose up -d
```

### Issue: Craigslist blocks requests
**Solutions:**
1. Add User-Agent header:
   ```
   Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
   ```
2. Add delay between requests (2-5 seconds)
3. Use rotating proxies (advanced)
4. Consider alternative sources (Zillow, FSBO.com)

### Issue: Can't find phone numbers
**Workaround:**
- Skip phone extraction for now
- Focus on getting name, address, price
- Voice AI can request phone during qualification call

### Issue: Supabase insert fails
**Check:**
1. API key is correct
2. Table name is `leads` (lowercase)
3. Required fields are present (name, email optional)
4. Check Supabase logs for error details

---

## 📁 Files to Export

When workflow is complete, export these for the team:

1. **n8n Workflow JSON**
   - Path: Export → Download
   - Name: `qualify-craigslist-scraper.json`
   - Location: `/agi17-voice-agent/n8n-workflows/`

2. **Google Sheets Template**
   - Share link with team
   - Document column headers
   - Add example data

3. **Documentation**
   - This file (updated with final workflow)
   - Screenshots of workflow
   - Video demo (optional)

---

## 🤝 Coordination with Team

### Ismoil (You) - n8n Workflow
**Deliverables:**
- Working n8n workflow
- Exported workflow JSON
- Documentation of any issues

### Josh - Integration & Dashboard
**Needs from Ismoil:**
- Supabase table structure confirmation
- Sample lead data format
- Frequency of scraping

### MAG - Voice AI Script
**Needs from Ismoil:**
- Lead data structure
- Which fields are required vs optional

---

## 📅 Timeline

**Day 1 (Oct 12 - Today):**
- ✅ n8n Docker setup
- ✅ Access n8n UI
- [ ] Test Craigslist HTTP request
- [ ] Parse HTML successfully

**Day 2 (Oct 13):**
- [ ] Extract listing data
- [ ] Google Sheets integration
- [ ] First successful Sheet append

**Day 3 (Oct 14):**
- [ ] Supabase integration
- [ ] End-to-end test
- [ ] First leads in dashboard

**Day 4 (Oct 15):**
- [ ] Add scheduling (cron)
- [ ] Error handling
- [ ] Deduplication logic

**Day 5 (Oct 16):**
- [ ] Documentation
- [ ] Export workflow
- [ ] Demo to team

---

## 💡 Pro Tips

1. **Start Simple:** Get ONE listing scraped first
2. **Test in Stages:** Don't build entire workflow before testing
3. **Use Manual Trigger:** Test without waiting for cron
4. **Check Logs:** n8n has excellent execution logs
5. **Save Often:** Export workflow after major changes

---

## 🎬 Demo Script (When Ready)

"Here's our automated lead generation system:
1. Every 6 hours, n8n scrapes Craigslist for San Diego FSBO listings
2. Extracts name, address, and price
3. Saves to Google Sheets for review
4. Syncs to Supabase automatically
5. Appears in dashboard within seconds
6. Ready for voice AI qualification

This week we collected [X] leads with zero manual work!"

---

## 📞 Need Help?

**Josh:** Slack DM or team channel  
**n8n Docs:** https://docs.n8n.io  
**n8n Community:** https://community.n8n.io

---

**Last Updated:** October 12, 2025  
**Next Review:** After Day 3 testing  
**Status:** 🟡 Ismoil tinkering with n8n implementation
