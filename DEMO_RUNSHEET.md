# DEMO RUNSHEET - Nov 23, 2025

## ⏰ Timeline: 15 minutes

---

## SETUP (5 min before demo)

### Terminal 1: Start API
```bash
cd /Users/joschapirtle/agi17-voice-agent
npm run api
```
Expected output:
```
✅ API running on http://localhost:5057
```

### Terminal 2: Start web server
```bash
cd /Users/joschapirtle/agi17-voice-agent
python3 -m http.server 8000
```
Expected output:
```
Serving HTTP on 0.0.0.0 port 8000
```

### Browser Tab 1: Dashboard
```
http://localhost:8000/dashboard-voice.html
```
Should show: "Loading leads..."

---

## DEMO SCRIPT (10 min)

### INTRO (1 min)
"QualiFy is an AI system that automates lead qualification for real estate agents. Three parts:
1. Lead capture (Craigslist, forms, etc.)
2. AI qualification calls
3. Dashboard to manage results

Today I'll show the qualification flow."

### PART 1: Show Landing Page (2 min)
Open: `http://localhost:8000/index.html`

Script:
"This is where FSBO sellers and interested buyers enter. They fill in their info and hit 'Join the Pilot.' Leads go straight to Supabase database."

Click around. Don't submit yet.

### PART 2: Create a Test Lead (1 min)
Go back to dashboard tab.
Open browser console (F12).

Paste:
```javascript
const { data, error } = await supabaseClient
  .from('leads')
  .insert([{
    name: 'Sarah Martinez',
    phone: '619-555-1234',
    email: 'sarah@example.com',
    source: 'demo',
    status: 'new'
  }]);
console.log('Lead created:', data);
```

Press Enter. Should see lead appear in dashboard immediately.

Script:
"The lead appears instantly. Real-time sync from Supabase."

### PART 3: Click "Call AI" (4 min)
In dashboard, click the "📞 Call AI" button on the lead.

Script:
"Now watch. I'm clicking 'Call AI'. The system is:
1. Validating the phone number
2. Initiating a voice AI call
3. Marking the lead as 'Contacted'
4. Logging the call ID for tracking"

Wait for lead status to change to "Contacted".

Console should show:
```
[VOICE] Qualification initiated for lead {id}
[VOICE] Running in stub mode
```

Script:
"In stub mode, the call auto-completes after a few seconds. In production, we'd use Bland.ai or Vapi to make real calls to the seller.

The AI asks:
- Are you still selling?
- What's your timeline?
- What's your asking price?
- Would you work with an agent?

Then scores them: Hot, Warm, or Cold."

Wait 5 seconds.

Script:
"Results would flow back, and the dashboard updates automatically with qualification score, transcript, and recommendation.

Then the agent can see: 'This is a hot lead, ready to book.' And they click 'Qualified' to move to next stage."

Click the green "✓" (Qualified) button.

### PART 4: Show N8N Scraper (2 min)
Script:
"Behind the scenes, our N8N workflow is running every 6 hours, scraping FSBO listings from Craigslist San Diego:
- ~200+ listings per scrape
- Parses name, phone, price, address
- Posts directly to Supabase
- So agents always have fresh leads"

Open file explorer to show:
`/Users/joschapirtle/Desktop/agi17-voice-agent/n8n-workflows/Qualify Scrapper with webhook.json`

Script:
"Each node:
1. Fetch Craigslist HTML
2. Parse with CSS selectors
3. Extract structured data
4. POST to Supabase REST API
5. Done.

So an agent in the pilot goes from 0 leads to 50+ hot leads each week, all automatically qualified by AI."

---

## DEMO CHECKLIST

Before you start, verify:
- [ ] .env file exists with SUPABASE_ANON_KEY
- [ ] API server running on 5057
- [ ] Web server running on 8000
- [ ] Dashboard loads without errors
- [ ] Console is open (F12)
- [ ] You have a test lead ready to create

During demo:
- [ ] Landing page shows
- [ ] Lead appears in dashboard after creation
- [ ] "Call AI" button works
- [ ] Status changes to "Contacted"
- [ ] Console shows [VOICE] logs
- [ ] You can mark as "Qualified"

---

## TROUBLESHOOTING ON THE FLY

**Dashboard won't load:**
```
Check: Browser console (F12) for errors
Fix: Close and reopen, or hard refresh (Cmd+Shift+R)
```

**"Call AI" does nothing:**
```
Check: Is API running? (should see requests in Terminal 1)
Fix: Restart API: npm run api
```

**Lead won't appear:**
```
Check: Is Supabase key correct in .env?
Fix: Get new key from Supabase dashboard, update .env, restart API
```

**Console shows CORS error:**
```
This is normal if you haven't set PRODUCTION_URL
Fix: It works anyway, just ignore the error message
```

---

## BACKUP PLAN (if something breaks)

If the demo fails:
1. Explain the architecture using the whiteboard
2. Show code in editor (server.js, dashboard-voice.html)
3. Show N8N workflow screenshot
4. Explain what it does conceptually

Still a good demo—just skip the live click-through.

---

## TALKING POINTS

If asked questions:

**"How much does this cost?"**
> Free during pilot. Later: $99/mo for unlimited leads.

**"What if the AI calls a wrong number?"**
> We only call verified FSBO listings from public sources. All calls log the attempt and number for compliance.

**"Can I customize the script?"**
> Absolutely. Voice prompt, qualification criteria, and follow-up messaging are all editable.

**"How do I get my leads?"**
> They appear in your Supabase dashboard in real-time. Export to Sheets, CRM, or calendar integration.

**"What if I already use Zillow?"**
> This is specifically for FSBO (For Sale By Owner) sellers—different audience. No conflict.

---

## END OF DEMO

Final words:
"That's QualiFy. Leads in, qualified appointments out. All automated. Ready to close more deals. Any questions?"

Good luck! 🚀
