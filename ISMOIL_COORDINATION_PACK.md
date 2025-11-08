# 🔗 Ismoil's Coordination Pack - All Links & Resources

**Status:** Ready for n8n implementation  
**Priority:** HIGH  
**Your Task:** Build automated Craigslist → Google Sheets → Supabase pipeline  
**Timeline:** 5 days (Oct 12-16)

---

## 🎯 QUICK START - 3 Critical Links

1. **N8N Integration Guide** (READ THIS FIRST!)
   - GitHub: https://github.com/bacchusvino/agi17-voice-agent/blob/main/N8N_INTEGRATION_GUIDE.md
   - Local: `/Users/joschapirtle/agi17-voice-agent/N8N_INTEGRATION_GUIDE.md`
   - Has EVERYTHING: workflow steps, code examples, troubleshooting

2. **Live Dashboard** (Where your leads will appear)
   - https://qualify-aig17.netlify.app/dashboard.html
   - Test credentials: (ask Josh if protected)

3. **GitHub Repo** (Main codebase)
   - https://github.com/bacchusvino/agi17-voice-agent
   - Clone: `git clone https://github.com/bacchusvino/agi17-voice-agent.git`

---

## 🐳 N8N Setup (Local)

**Your n8n Docker Location:**
```bash
cd /Users/joschapirtle/n8n-docker
docker-compose up -d
```

**Access n8n UI:**
- http://localhost:5678

**Check if running:**
```bash
docker ps | grep n8n
```

**Stop n8n:**
```bash
cd /Users/joschapirtle/n8n-docker
docker-compose down
```

---

## 🔑 API Credentials & Endpoints

### Supabase REST API

**Base URL:**
```
https://tyrwkeqavitwkffjcznj.supabase.co/rest/v1
```

**API Key (Anon Key):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4
```

**Insert Lead (POST /leads):**
```bash
curl -X POST 'https://tyrwkeqavitwkffjcznj.supabase.co/rest/v1/leads' \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "name": "Test Lead",
    "phone": "619-555-1234",
    "email": "test@example.com",
    "notes": "123 Main St, San Diego - $500,000",
    "source": "craigslist",
    "status": "new"
  }'
```

**Required Headers for ALL requests:**
```json
{
  "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4",
  "Content-Type": "application/json",
  "Prefer": "return=representation"
}
```

### Google Sheets API

**You'll need to:**
1. Create Google Cloud project
2. Enable Google Sheets API
3. Create Service Account
4. Download JSON credentials
5. Share your Google Sheet with service account email
6. Add credentials to n8n

**Josh can help with this if needed!**

---

## 🎯 Target: Craigslist San Diego FSBO

**Search URL:**
```
https://sandiego.craigslist.org/search/reo?sale_by=owner
```

**What to Extract:**
- Property address/title
- Price
- Neighborhood
- Posting URL (for full details)
- Contact info (phone/email if available)

**Expected Output Format:**
```json
{
  "name": "Seller Name or Address",
  "phone": "619-555-1234",
  "email": "seller@example.com",
  "notes": "123 Main St, San Diego - $500,000 - 3bed/2bath",
  "source": "craigslist",
  "status": "new"
}
```

---

## 📊 Database Schema (leads table)

**Required Fields:**
- `name` (TEXT) - Can be address if seller name unavailable
- `source` (TEXT) - Always "craigslist" for your scraper

**Optional But Recommended:**
- `phone` (TEXT)
- `email` (TEXT)
- `notes` (TEXT) - Put full address, price, description here

**Auto-Generated (DON'T SET):**
- `id` (UUID)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**Auto-Defaults:**
- `status` → "new"

---

## 🔄 Workflow Architecture

```
Step 1: HTTP Request → Craigslist
   ↓
Step 2: HTML Extract → Parse listings
   ↓
Step 3: Function Node → Extract data
   ↓
Step 4: Google Sheets → Append row (optional)
   ↓
Step 5: HTTP Request → POST to Supabase
   ↓
Step 6: Cron Trigger → Run every 6 hours
```

**Full detailed workflow:** See N8N_INTEGRATION_GUIDE.md

---

## 🧪 Testing Checklist

Copy this to your notes and check off as you go:

```
[ ] n8n Docker container running (docker ps)
[ ] Can access http://localhost:5678
[ ] Created n8n admin account
[ ] Test HTTP request to Craigslist (get HTML)
[ ] Parse HTML (extract at least 1 listing)
[ ] Test Supabase POST with curl (command above)
[ ] Test Supabase POST from n8n (see lead in dashboard)
[ ] (Optional) Google Sheets append working
[ ] Full workflow end-to-end test
[ ] Schedule workflow (cron every 6 hours)
[ ] Monitor for 24 hours (check for errors)
```

---

## 📞 Communication Channels

**Slack/Discord:**
- Main channel: #aig17 or #outskill-c3-aig17
- Direct: @josh for urgent questions

**GitHub Issues:**
- Create issue if you find bugs
- Tag with `n8n` label

**Notion:**
- AIG 17 project notes: https://www.notion.so/277b511a8abe8052a100c9d49e15b6ce

**Documentation:**
- All guides in `/agi17-voice-agent/` repo
- Check `STATUS.md` for known issues

---

## 🎬 Demo Day Goals (Nov 23)

**Your Success Metrics:**
- 100+ FSBO leads collected automatically
- Workflow running smoothly every 6 hours
- Zero manual intervention needed
- Deduplication working (no duplicate leads)
- Error handling robust (doesn't crash)

**For Friday Demo (Oct 16):**
- 25+ leads minimum
- Workflow demonstrated live
- Can show n8n execution logs

---

## 💡 Pro Tips from Josh

1. **Start with ONE listing** - Get the full flow working first
2. **Use Manual Trigger** - Don't wait for cron during testing
3. **Check n8n logs** - They're excellent for debugging
4. **Test Supabase with curl FIRST** - Before building n8n workflow
5. **Save workflow often** - Export JSON after each major change
6. **Ask early** - Don't struggle alone! Tag Josh in Slack

---

## 🐛 Common Issues & Solutions

### "Craigslist blocks my requests"
**Solution:** Add User-Agent header:
```
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36
```

### "Supabase returns 401 Unauthorized"
**Solution:** Check API key has no extra spaces/newlines

### "Can't find phone numbers"
**Workaround:** Skip phone for now, focus on name/address/price

### "n8n won't start"
**Solution:**
```bash
lsof -i :5678  # Check if port in use
docker-compose down && docker-compose up -d
```

---

## 📁 Files to Create/Export

**When workflow is complete, export:**

1. **Workflow JSON**
   - n8n → Export → Download
   - Name: `qualify-craigslist-scraper.json`
   - Save to: `/agi17-voice-agent/n8n-workflows/`

2. **Documentation**
   - Update N8N_INTEGRATION_GUIDE.md with any changes
   - Add screenshots of workflow
   - Document any issues you encountered

3. **Test Results**
   - Sample of leads collected
   - Execution logs
   - Error handling examples

---

## 📅 5-Day Timeline

**Day 1 (Oct 12 - Today):**
- [ ] Read N8N_INTEGRATION_GUIDE.md
- [ ] Start n8n Docker
- [ ] Test Craigslist HTTP request
- [ ] Test Supabase API with curl

**Day 2 (Oct 13):**
- [ ] Build HTML parser in n8n
- [ ] Extract first listing successfully
- [ ] Test Google Sheets append (optional)

**Day 3 (Oct 14):**
- [ ] Complete Supabase integration
- [ ] End-to-end test
- [ ] First leads appear in dashboard

**Day 4 (Oct 15):**
- [ ] Add cron scheduling
- [ ] Error handling
- [ ] Deduplication logic

**Day 5 (Oct 16):**
- [ ] Export workflow
- [ ] Documentation
- [ ] Demo to team

---

## 🤝 Coordination with Team

**Daily Standup (Share in Slack):**
```
Yesterday: [What you completed]
Today: [What you're working on]
Blockers: [Any issues]
```

**When You Need Help:**
1. Check N8N_INTEGRATION_GUIDE.md troubleshooting section
2. Search n8n community: https://community.n8n.io
3. Tag @josh in Slack with:
   - What you're trying to do
   - What's happening (screenshot/error)
   - What you've already tried

**What Josh Needs from You:**
- Updates every 1-2 days
- Lead data format confirmation
- Any issues with Supabase API
- Workflow export when complete

---

## 🎯 Bottom Line

You have EVERYTHING you need to succeed:
- ✅ Complete workflow guide
- ✅ All API credentials
- ✅ Docker setup ready
- ✅ Testing checklist
- ✅ Team support available

**Your workflow = Team's automated lead generation**

The platform (dashboard, database, security) is DONE.  
Your n8n workflow completes the automation.  
This is the missing piece! 🧩

---

## 🚀 Next Step: READ THE GUIDE!

**Go here NOW:**
https://github.com/bacchusvino/agi17-voice-agent/blob/main/N8N_INTEGRATION_GUIDE.md

Then ping Josh in Slack when you've:
1. Read the guide
2. Started n8n Docker
3. Tested the Supabase curl command

**Let's build this! 💪**

---

*Created: October 12, 2025*  
*Contact: @josh (Slack)*  
*Team: AIG-17 QualiFy*
