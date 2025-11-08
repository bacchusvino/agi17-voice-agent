# QualiFy System Architecture

## 🏗️ How Everything Connects

```
┌─────────────────────────────────────────────────────────────┐
│                    QualiFy MVP System                        │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  LEAD SOURCES    │      │   SUPABASE DB    │      │   INTERFACES     │
│                  │      │                  │      │                  │
│  1. Landing Page │─────▶│   leads table    │◀─────│  1. Dashboard    │
│     (Done ✅)    │      │                  │      │     (Done ✅)    │
│                  │      │  - id            │      │                  │
│  2. Craigslist   │      │  - name          │      │  2. Voice AI     │
│     (Ismoil)     │─────▶│  - phone         │      │     (MAG/Josh)   │
│                  │      │  - email         │      │                  │
│  3. Facebook     │      │  - address       │      │  3. Webhooks     │
│     (Future)     │      │  - price         │      │     (Josh)       │
│                  │      │  - source        │      │                  │
│  4. Instagram    │      │  - status        │      │                  │
│     (Future)     │      │  - call_data     │      │                  │
└──────────────────┘      └──────────────────┘      └──────────────────┘
```

---

## 📊 Data Flow (End-to-End)

### Current Flow (Working Now ✅)

```
1. User visits landing page
   ↓
2. Fills form (name, email)
   ↓
3. JavaScript POSTs to Supabase
   ↓
4. Lead saved in database
   ↓
5. Dashboard auto-refreshes (30sec)
   ↓
6. Agent sees new lead
   ↓
7. Agent clicks status button
   ↓
8. Status updates in database
   ↓
9. Dashboard refreshes
```

### Target Flow (By Friday 🎯)

```
1. N8N scrapes Craigslist (every 6 hours)
   ↓
2. Parses FSBO listings
   ↓
3. POSTs to Supabase REST API
   ↓
4. Lead appears in dashboard
   ↓
5. Agent clicks "Qualify Lead" button
   ↓
6. Voice AI (Bland/Vapi) calls seller
   ↓
7. AI asks qualification questions
   ↓
8. Call ends, AI sends results to webhook
   ↓
9. Webhook updates lead in Supabase
   ↓
10. Dashboard shows "Qualified" or "Not Interested"
    ↓
11. Agent follows up with hot leads
```

---

## 🔌 Integration Points

### 1. N8N → Supabase (Ismoil's Work)

**Workflow Steps:**
```
[Schedule: Every 6 hours]
    ↓
[HTTP Request: GET Craigslist]
    ↓
[HTML Parser: Extract data]
    ↓
[Filter: Only FSBO keywords]
    ↓
[Transform: Clean/format data]
    ↓
[HTTP Request: POST to Supabase]
    ↓
[Log: Success/Errors]
```

**API Endpoint:**
```
POST https://tyrwkeqavitwkffjcznj.supabase.co/rest/v1/leads

Headers:
  apikey: [ANON_KEY]
  Content-Type: application/json

Body:
{
  "name": "...",
  "phone": "...",
  "address": "...",
  "price": ...,
  "source": "craigslist"
}
```

### 2. Dashboard → Voice AI (Josh's Work)

**Flow:**
```
[Agent clicks "Qualify Lead"]
    ↓
[JavaScript function triggered]
    ↓
[POST to Bland.ai/Vapi.ai API]
    ↓
[AI calls the phone number]
    ↓
[Update lead.call_status = "pending"]
    ↓
[Show "Calling..." in dashboard]
```

### 3. Voice AI → Supabase (Josh's Work)

**Webhook Flow:**
```
[Voice AI finishes call]
    ↓
[Sends results to webhook URL]
    ↓
[Webhook receives: score, transcript, duration]
    ↓
[PATCH to Supabase to update lead]
    ↓
[Dashboard auto-refreshes]
    ↓
[Shows updated status]
```

**Webhook Endpoint (to build):**
```
POST https://your-webhook-url.com/voice-results

Body:
{
  "lead_id": "...",
  "call_status": "completed",
  "qualification_score": 85,
  "transcript": "...",
  "interested_in_agent": true
}

Action:
  Update lead in Supabase
  Set status to "qualified" or "not_interested"
```

---

## 🗂️ Database Schema (Visual)

```
┌─────────────────────────────────────────────────────────┐
│                     leads table                          │
├─────────────────────────────────────────────────────────┤
│ id                 UUID (Primary Key)                    │
│ ────────────────────────────────────────────────────────│
│ CONTACT INFO                                             │
│ ├─ name            TEXT                                  │
│ ├─ email           TEXT                                  │
│ └─ phone           TEXT                                  │
│ ────────────────────────────────────────────────────────│
│ PROPERTY INFO                                            │
│ ├─ address         TEXT                                  │
│ ├─ city            TEXT (default: 'San Diego')          │
│ ├─ state           TEXT (default: 'CA')                 │
│ ├─ price           DECIMAL                               │
│ └─ property_type   TEXT                                  │
│ ────────────────────────────────────────────────────────│
│ LEAD TRACKING                                            │
│ ├─ source          TEXT ('craigslist', 'landing_page')  │
│ └─ status          TEXT ('new', 'qualified', etc.)      │
│ ────────────────────────────────────────────────────────│
│ VOICE AI DATA                                            │
│ ├─ call_status     TEXT ('pending', 'completed')        │
│ ├─ call_recording  TEXT (URL)                           │
│ ├─ call_transcript TEXT                                  │
│ ├─ call_duration   INTEGER (seconds)                     │
│ └─ qualification   INTEGER (0-100 score)                 │
│     _score                                                │
│ ────────────────────────────────────────────────────────│
│ TIMESTAMPS                                               │
│ ├─ created_at      TIMESTAMP (auto)                     │
│ ├─ updated_at      TIMESTAMP (auto)                     │
│ ├─ contacted_at    TIMESTAMP                             │
│ └─ qualified_at    TIMESTAMP                             │
└─────────────────────────────────────────────────────────┘

Indexes:
  - idx_leads_status (for filtering)
  - idx_leads_source (for reporting)
  - idx_leads_created_at (for sorting)

RLS Policies:
  ✅ Anyone can INSERT (anon)
  ✅ Authenticated users can SELECT all
  ✅ Authenticated users can UPDATE all
```

---

## 🔐 Security Architecture

```
┌────────────────────────────────────────────────────┐
│              SUPABASE SECURITY                     │
├────────────────────────────────────────────────────┤
│                                                    │
│  PUBLIC ACCESS (anon key)                          │
│  ├─ Landing page form submissions ✅               │
│  ├─ N8N workflow inserts ✅                        │
│  └─ Limited to INSERT only                         │
│                                                    │
│  AUTHENTICATED ACCESS (user logged in)             │
│  ├─ Dashboard views all leads ✅                   │
│  ├─ Status updates ✅                              │
│  └─ Full SELECT, UPDATE permissions                │
│                                                    │
│  SERVICE ROLE (backend only)                       │
│  ├─ Voice AI webhooks                              │
│  ├─ Batch operations                               │
│  └─ Admin functions                                │
│                                                    │
│  ROW LEVEL SECURITY (RLS)                          │
│  ├─ Enabled on all tables ✅                       │
│  ├─ Policies defined per role                      │
│  └─ No data leakage possible                       │
└────────────────────────────────────────────────────┘
```

---

## 🎯 Component Responsibilities

### Frontend (HTML/JavaScript)

**index.html (Landing Page)**
- Capture lead info
- Validate form inputs
- POST to Supabase
- Show success/error messages

**dashboard.html**
- Display all leads
- Filter/search functionality
- Status update buttons
- Auto-refresh every 30s
- Trigger voice AI calls (future)

### Backend (Supabase)

**Database**
- Store all lead data
- Enforce RLS policies
- Auto-update timestamps
- Indexed for fast queries

**Edge Functions (future)**
- Process webhooks
- Complex business logic
- Third-party integrations

### Automation (N8N)

**Craigslist Scraper**
- Schedule: every 6 hours
- Parse HTML listings
- Extract: name, phone, address, price
- POST to Supabase REST API
- Error handling & logging

### Voice AI (Bland.ai or Vapi.ai)

**Call Engine**
- Make outbound calls
- Ask qualification questions
- Score responses (0-100)
- Record conversation
- Send results to webhook

---

## 🔄 State Machine (Lead Status Flow)

```
   [New]
     ↓
     │ Agent reviews
     ↓
   [Contacted]
     ↓
     │ Voice AI calls
     ↓
   ┌─────────────┐
   │             │
[Qualified]   [Not Interested]
   │             │
   ↓             ↓
[Closed Won]  [Closed Lost]
```

**Status Options:**
- `new` - Just captured, not contacted yet
- `contacted` - Agent reached out or AI called
- `qualified` - Hot lead, ready for follow-up
- `not_interested` - Not a good fit
- `closed` - Deal done (or permanently lost)

---

## 📱 User Journeys

### Journey 1: FSBO Seller (Craigslist)

```
1. Posts house on Craigslist
   ↓
2. N8N scrapes and adds to database
   ↓
3. Voice AI calls them (automated)
   ↓
4. Answers questions, scored as "qualified"
   ↓
5. Lead appears in dashboard as hot
   ↓
6. Real estate agent calls within 1 hour
   ↓
7. Books appointment
   ↓
8. Status → Closed Won 🎉
```

### Journey 2: Landing Page Visitor

```
1. Finds QualiFy site
   ↓
2. Fills out "Join Pilot" form
   ↓
3. Lead saved to database immediately
   ↓
4. Agent sees in dashboard
   ↓
5. Agent manually calls (or triggers voice AI)
   ↓
6. Follow-up based on interest
```

---

## 🎨 Tech Stack Summary

```
┌─────────────────────────────────────────┐
│           TECHNOLOGY STACK              │
├─────────────────────────────────────────┤
│ Frontend:                               │
│ ├─ HTML5 + CSS3                         │
│ ├─ Vanilla JavaScript                   │
│ └─ Supabase JS Client                   │
│                                         │
│ Backend:                                │
│ ├─ Supabase (BaaS)                      │
│ ├─ PostgreSQL (Database)                │
│ ├─ Row Level Security (RLS)             │
│ └─ REST API                             │
│                                         │
│ Automation:                             │
│ ├─ N8N (Workflow automation)            │
│ └─ Craigslist scraper                   │
│                                         │
│ Voice AI:                               │
│ ├─ Bland.ai OR Vapi.ai (TBD)           │
│ └─ Webhooks for results                 │
│                                         │
│ DevOps:                                 │
│ ├─ GitHub (Version control)             │
│ ├─ GitHub Actions (CI/CD)               │
│ └─ Local testing (Python server)        │
└─────────────────────────────────────────┘
```

---

## 🚀 Deployment Architecture

```
┌────────────────────────────────────────────────┐
│              PRODUCTION SETUP                  │
├────────────────────────────────────────────────┤
│                                                │
│  FRONTEND (Static hosting)                     │
│  ├─ Vercel / Netlify / GitHub Pages            │
│  ├─ index.html (landing page)                  │
│  └─ dashboard.html                             │
│                                                │
│  BACKEND (Supabase Cloud)                      │
│  ├─ Database hosted by Supabase                │
│  ├─ Auth handled by Supabase                   │
│  └─ Edge Functions (serverless)                │
│                                                │
│  AUTOMATION (N8N Cloud or self-hosted)         │
│  ├─ Runs on schedule                           │
│  └─ Always-on worker                           │
│                                                │
│  VOICE AI (Third-party SaaS)                   │
│  ├─ Bland.ai or Vapi.ai                        │
│  └─ API-based integration                      │
└────────────────────────────────────────────────┘

Cost Estimate (MVP):
- Supabase: $0 (free tier)
- N8N: $0 (self-hosted) or $20/mo (cloud)
- Voice AI: ~$0.10-0.25 per call
- Hosting: $0 (Vercel/Netlify free tier)

Total: ~$20-50/month for MVP
```

---

## 📊 Monitoring & Analytics (Future)

```
Key Metrics to Track:
├─ Lead Volume
│  ├─ Total leads captured
│  ├─ Leads per source (Craigslist, Landing, etc.)
│  └─ Daily/Weekly trends
│
├─ Conversion Rates
│  ├─ Contact rate (% reached)
│  ├─ Qualification rate (% hot leads)
│  └─ Close rate (% deals won)
│
├─ Voice AI Performance
│  ├─ Call connection rate
│  ├─ Average call duration
│  ├─ Qualification accuracy
│  └─ Cost per qualified lead
│
└─ Agent Activity
   ├─ Response time to new leads
   ├─ Follow-up rate
   └─ Close time (lead → deal)
```

---

**This is the complete system architecture!**  
Share this with the team so everyone understands how their piece fits in.

*Last updated: October 5, 2025*
