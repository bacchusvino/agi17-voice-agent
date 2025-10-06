# QualiFy Quick Start Guide

**Last Updated:** October 5, 2025  
**Status:** MVP Foundation Complete - Ready for Integration Phase

---

## What Works Right Now

- ✅ Landing page captures leads
- ✅ Supabase database stores everything
- ✅ Dashboard displays leads with filtering
- ✅ All code on GitHub

**Test it:** 
```bash
cd /Users/joschapirtle/agi17-voice-agent
python3 -m http.server 8000
# Open: http://localhost:8000/index.html
```

---

## Team Tasks - Next 2 Weeks

### Ishmael - N8N Scraping (Priority 1)
**Goal:** Scrape Zillow for FSBO listings → Send to Supabase

**API Endpoint for N8N:**
```
POST https://tyrwkeqavitwkffjcznj.supabase.co/rest/v1/leads
```

**Required Headers:**
```
apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4
Authorization: Bearer [SAME_KEY_AS_ABOVE]
Content-Type: application/json
```

**Body Format:**
```json
{
  "name": "John Doe",
  "phone": "619-555-1234",
  "address": "123 Main St, San Diego, CA",
  "price": 500000,
  "source": "craigslist"
}
```

**Deliverable:** 10+ test leads in database by next week

---

### Mandar - Dashboard Enhancement (Priority 2)
**Goal:** Make dashboard look professional for demo

**Options:**
1. **Easy:** Update styling in existing dashboard.html
2. **Better:** Add login page mockup (doesn't need to work, just look good)
3. **Best:** Create visual workflow diagram (what Ishmael described)

**Deliverable:** Visual workflow diagram OR polished dashboard UI

---

### Josh - Voice AI Integration (Priority 3)
**Goal:** Connect voice AI to the system

**Waiting on:** 
- Ishmael to choose platform (Vapi vs Bland.ai vs Twilio)
- Script from team on what AI should say

**Next steps:**
1. Review voice AI platforms from class
2. Test one with simple script
3. Document how to integrate

---

### Mihir - Landing Page Owner
**Status:** Done with landing page  
**Next:** Available for any frontend tweaks if needed

---

## Critical Files

**If you need to understand how it works:**
- `TROUBLESHOOTING.md` - Complete technical documentation
- `ARCHITECTURE.md` - System diagrams
- `TEAM_REFERENCE.md` - Quick reference with all info

**Working code:**
- `index.html` - Landing page (uses direct REST API)
- `dashboard.html` - Dashboard (works but could be prettier)
- `supabase/migrations/` - Database schema

---

## Common Issues - Quick Fixes

**"Form not saving"**
```bash
# Hard refresh browser: Cmd+Shift+R
# Check Supabase isn't paused
```

**"Dashboard not loading"**
```bash
# Check browser console (F12)
# Verify credentials match index.html
```

**"N8N can't connect"**
```bash
# Make sure you have BOTH headers (apikey AND Authorization)
# Test with Postman first
```

---

## Weekly Milestones

**Week 1 (Oct 6-11):**
- Ishmael: N8N scraper working
- Mandar: Workflow diagram OR dashboard polish
- Josh: Voice AI platform selected and tested

**Week 2 (Oct 12-18):**
- Integration: N8N → Voice AI → Dashboard
- First end-to-end test

**Week 3 (Oct 19-25):**
- Demo video creation
- Polish and bug fixes

**Week 4 (Oct 26-Nov 1):**
- Final presentation prep
- Buffer for issues

**Final Demo:** November 15-16

---

## Meeting Schedule

**Before Class (Saturdays):**
- Time: 1 hour before class starts
- Format: Quick standup (15 min) + work session
- Required: Post update in group chat if you can't make it

**Communication:**
- WhatsApp group for quick updates
- GitHub issues for technical problems
- Google Docs for documentation

---

## Demo Day - What We'll Show

**2-3 Minute Video:**
1. Problem: Real estate agents waste 10-15 hours/week finding FSBO leads
2. Solution: QualiFy automates it
3. Demo walkthrough:
   - Show landing page (lead capture)
   - Show N8N scraping Zillow
   - Show Voice AI qualifying a lead
   - Show dashboard with results
4. Team intro + Q&A

**What needs to work:**
- Landing page (already works)
- N8N scraper (Ishmael building)
- Voice AI call (Josh integrating)
- Dashboard (already works, Mandar polishing)

---

## Getting Help

**Stuck on something?**
1. Check `TROUBLESHOOTING.md` first
2. Post in WhatsApp with:
   - What you're trying to do
   - Error message/screenshot
   - What you've tried
3. Tag the person who owns that component

**Component Owners:**
- Backend/Database: Josh
- N8N/Scraping: Ishmael
- Frontend/UI: Mihir (or Mandar helping)
- Voice AI: TBD (Josh coordinating)

---

## Quick Commands

**Start local server:**
```bash
cd /Users/joschapirtle/agi17-voice-agent
python3 -m http.server 8000
```

**Commit changes:**
```bash
git add .
git commit -m "your message"
git push origin main
```

**Test landing page:**
http://localhost:8000/index.html

**Test dashboard:**
http://localhost:8000/dashboard.html

---

## What's NOT Required (Don't Waste Time)

- Real user authentication system
- Fancy animations
- Mobile app
- Actual deployment to production
- Perfect code (focus on working demo)

---

## Success Criteria

**Minimum Viable Demo:**
- [ ] Form captures leads
- [ ] N8N scrapes 10+ FSBO listings
- [ ] Voice AI calls one lead (even if scripted)
- [ ] Dashboard shows results
- [ ] 3-minute video explaining it

**That's it.** Don't overcomplicate.

---

## Resources

**Supabase:**
- Dashboard: https://supabase.com/dashboard/project/tyrwkeqavitwkffjcznj
- Docs: https://supabase.com/docs

**Tools:**
- N8N: https://docs.n8n.io/
- Vapi: https://vapi.ai/docs
- Bland.ai: https://bland.ai/docs

**Our Docs:**
- Full troubleshooting: `TROUBLESHOOTING.md`
- Architecture: `ARCHITECTURE.md`
- Team reference: `TEAM_REFERENCE.md`

---

## Bottom Line

The hard part is done. Database works. Landing page works. Dashboard works.

**All we need now:**
1. Ishmael scrapes leads
2. Someone writes a voice script
3. Josh wires voice AI
4. Record a demo video

**4 weeks is plenty of time.** Stay focused. Communicate. Ship it.

---

**Questions? Check the docs or post in WhatsApp.**

**Let's finish this.**
