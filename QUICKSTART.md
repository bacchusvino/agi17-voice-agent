🚀 Quick Start - AIG17 Voice Agent
5-Minute Team Onboarding
Last Updated: October 5, 2025
 
✅ What's Working Right Now
•	Landing Page → Captures real estate seller leads
•	Supabase Database → Stores leads with RLS security
•	Dashboard → Shows leads in real-time, updates status
•	Full Pipeline → Lead form → Database → Dashboard (all working!)
What's NOT working yet:
•	Craigslist scraper (Ismoil's task)
•	Voice AI integration (waiting on script from MAG)
 
🧪 Test It Yourself (2 minutes)
# 1. Clone the repo (if you haven't)
git clone https://github.com/your-repo/agi17-voice-agent.git
cd agi17-voice-agent

# 2. Start local server
python3 -m http.server 8000

# 3. Open in browser
# Landing page: http://localhost:8000/index.html
# Dashboard: http://localhost:8000/dashboard.html

# 4. Test the flow
# - Fill out landing page form
# - Submit it
# - Switch to dashboard tab
# - Your lead appears in 2 seconds!
# - Click ✓ to mark as qualified
Expected result: Lead shows up on dashboard immediately. Status updates when you click buttons.
 
📋 Your Task (What YOU Need To Do)
Ismoil - Craigslist Scraper
Task: Build N8N workflow that scrapes Craigslist and sends leads to our database.
API Endpoint (copy this into N8N):
POST https://nqqafqglmrytjchkfvvj.supabase.co/rest/v1/leads
Headers:
  apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcWFmcWdsbXJ5dGpjaGtmdnZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxNjk3NTIsImV4cCI6MjA0Mzc0NTc1Mn0.vVWLMxZ2_hkJTgfZfIx5_8cnGm2a9YdnZ0H3h2AcqCM
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xcWFmcWdsbXJ5dGpjaGtmdnZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxNjk3NTIsImV4cCI6MjA0Mzc0NTc1Mn0.vVWLMxZ2_hkJTgfZfIx5_8cnGm2a9YdnZ0H3h2AcqCM
  Content-Type: application/json

Body:
{
  "name": "Seller Name",
  "phone": "5551234567",
  "address": "123 Main St, City, ST 12345",
  "source": "craigslist",
  "status": "new"
}
Reference: See TROUBLESHOOTING.md → "API Endpoint for N8N" section for examples.
 
MAG (Mandar) - Voice AI Script
Task: Write the conversation script for the voice AI.
Questions to answer:
1.	What should the AI ask sellers? (e.g., "Why are you selling?")
2.	What responses qualify a lead? (motivated seller vs tire-kicker)
3.	How do we score them? (1-10 scale? Yes/no qualified?)
Format: Simple bullet list or flowchart is fine.
Reference: Check STATUS.md → "Voice AI Integration (Pending)" for context.
 
Mihir - Dashboard Polish
Task: Dashboard is done! If you see UI improvements, make them.
Current features:
•	Real-time lead display
•	Status buttons (New/Contacted/Qualified)
•	Auto-refresh every 5 seconds
Nice-to-haves:
•	Filter by status
•	Search by name/phone
•	Export to CSV
Reference: dashboard.html has all the code.
 
Josh - Voice AI Integration
Task: Connect Twilio voice AI once MAG delivers the script.
Status: Waiting on script from MAG.
Reference: TROUBLESHOOTING.md → "Next Steps" section.
 
🔗 Full Documentation
Need more detail? Check these files:
File	What It Covers
STATUS.md	Full project status, what's done, what's next
ARCHITECTURE.md	System diagrams, how everything connects
TROUBLESHOOTING.md	Bug fixes, API docs, detailed testing
TEAM_REFERENCE.md	Complete team guide with all context
 
🆘 Stuck? Common Issues
"I can't see my lead in the dashboard"
•	Check browser console (F12) for errors
•	Verify you're using the correct Supabase URL
•	See TROUBLESHOOTING.md → "Common Errors"
"RLS policy error when inserting"
•	Make sure RLS policies are set up in Supabase
•	See TROUBLESHOOTING.md → "RLS Policy Configuration"
"Git push rejected"
•	Pull first: git pull origin main
•	Then push: git push origin your-branch-name
"Python server won't start"
•	Try port 8080: python3 -m http.server 8080
•	Or use any local server (Live Server in VS Code works too)
 
📅 Timeline
•	Today (Oct 5): Everyone tests local setup
•	Monday-Tuesday: Ismoil builds scraper, MAG writes script
•	Wednesday-Thursday: Josh integrates voice AI
•	Friday: Full system demo
 
💬 Questions?
1.	Check the docs first (links above)
2.	Ask in team Slack/WhatsApp
3.	Tag Josh if urgent
Let's ship this! 🚀

