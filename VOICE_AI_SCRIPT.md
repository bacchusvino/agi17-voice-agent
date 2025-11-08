# Voice AI Qualification Script
## For QualiFy FSBO Lead Qualification

### **Overview**
The AI voice agent calls FSBO (For Sale By Owner) leads to qualify them for real estate agents. The goal is to determine if they're a good fit for agent representation and schedule a meeting if qualified.

---

## **Call Flow Structure**

### **1. Introduction (15 seconds)**
```
"Hi [NAME], this is QualiFy calling about your property listing. 
I saw you're selling at [ADDRESS] and wanted to see if I could help. 
Do you have 2 minutes to answer a few quick questions?"

[Wait for response]
- If YES → Continue to Qualification
- If NO/NOT INTERESTED → "No problem! Would you prefer I call back later?" 
  → If still no, mark as "not_interested" and end call politely
```

**Tone:** Friendly, conversational, not salesy. Like a helpful neighbor.

---

### **2. Qualification Questions (90 seconds)**

#### **Q1: Timeline**
```
"Great! First, when are you hoping to have the property sold?"
```
**Capture:** 
- Immediate (within 1 month) ✅ HIGH PRIORITY
- 1-3 months ✅ QUALIFIED
- 3-6 months ⚠️ MEDIUM
- 6+ months ❌ LOW PRIORITY

---

#### **Q2: Motivation**
```
"What's driving the sale? Are you relocating, upgrading, or something else?"
```
**Listen for:**
- ✅ Job relocation (motivated)
- ✅ Downsizing (motivated)
- ✅ Financial need (very motivated)
- ⚠️ "Just testing the market" (less motivated)
- ⚠️ Investment property (less emotional urgency)

**Capture in notes:** Their exact reason

---

#### **Q3: Agent Experience**
```
"Have you worked with a real estate agent before on a sale?"
```
**Capture:**
- YES → "What was your experience like?" (Listen for negative experiences - opportunity!)
- NO → "Any particular reason you decided to go FSBO this time?"

---

#### **Q4: Open to Representation**
```
"I work with some great local agents who specialize in [CITY] and can help you get top dollar. 
They don't charge upfront and only take a commission when the house sells. 
Would you be open to a quick 15-minute intro call to see if they can help?"
```

**Capture:**
- YES ✅ → Proceed to booking
- MAYBE ⚠️ → "What concerns do you have about working with an agent?" (Address objections)
- NO ❌ → "No problem! Can I follow up in a few weeks to see how things are going?"

---

#### **Q5: Current Status**
```
"Last question - how many showings have you had so far?"
```
**Listen for:**
- ✅ "None" or "Very few" → Property isn't moving, they need help
- ⚠️ "Some interest" → Monitor, maybe follow up later
- ❌ "Lots of interest" → They're doing fine on their own

---

### **3. Booking/Next Steps (30 seconds)**

#### **If QUALIFIED (Yes to working with agent + motivated timeline):**
```
"Perfect! Let me connect you with [AGENT NAME]. They can jump on a quick Zoom this week. 
What day works better for you - Tuesday or Thursday?"

[Get availability]

"Great! You'll get a calendar invite in the next hour. They'll send a personalized video intro 
so you know who you're meeting with. Sound good?"
```

**Action:** 
- Mark lead as "qualified"
- Set `qualification_score` = 85-100
- Save call transcript and recording
- Trigger booking workflow

---

#### **If MAYBE/NEEDS NURTURE:**
```
"No pressure at all! I'll send you some helpful resources about maximizing your FSBO sale. 
Can I check back in with you in 2-3 weeks to see how it's going?"
```

**Action:**
- Mark as "contacted"
- Set `qualification_score` = 50-75
- Schedule follow-up task
- Send nurture email

---

#### **If NOT INTERESTED:**
```
"Totally understand! Best of luck with your sale. If anything changes, feel free to reach out."
```

**Action:**
- Mark as "not_interested"
- Set `qualification_score` = 0-25
- No follow-up

---

## **Qualification Scoring Formula**

```
Base Score = 50

Timeline:
  + 30 points if "Immediate" (within 1 month)
  + 20 points if "1-3 months"
  + 10 points if "3-6 months"
  + 0 points if "6+ months"

Motivation:
  + 15 points if relocating/financial need
  + 10 points if upgrading/downsizing
  + 5 points if "testing market"

Agent Experience:
  + 10 points if had BAD experience (opportunity to fix)
  + 5 points if never worked with agent (education opportunity)
  + 0 points if had GOOD experience (harder sell)

Current Status:
  + 10 points if no showings (needs help)
  + 5 points if few showings
  + 0 points if lots of showings

Open to Agent:
  + 20 points if YES
  + 10 points if MAYBE
  + 0 points if NO

MAX SCORE: 100
MIN SCORE: 50
```

**Qualification Threshold:**
- **85-100:** HOT LEAD - Book immediately
- **70-84:** WARM - Schedule call
- **50-69:** NURTURE - Follow up in 2-3 weeks
- **Below 50:** NOT QUALIFIED - No follow-up

---

## **Objection Handling**

### **Objection: "I don't want to pay 6% commission"**
**Response:**
```
"I totally get that! Most agents are flexible on commission, especially for motivated sellers. 
Plus, they often get you 10-15% more than FSBO sales, which covers the commission and then some. 
Would you be open to hearing how they structure their fees?"
```

---

### **Objection: "I'm already working with someone"**
**Response:**
```
"That's great! Are you happy with the results so far?"
[If NO] → "Would you be open to a second opinion? No obligation."
[If YES] → "Awesome! Best of luck with your sale."
```

---

### **Objection: "I'm not interested in phone calls"**
**Response:**
```
"No problem! Would you prefer a quick text message intro instead? 
Or I can just send you some helpful FSBO tips via email."
```

---

## **Technical Requirements for MAG**

### **Data to Capture:**
After each call, the AI should update the Supabase `leads` table with:

```javascript
{
  call_status: 'completed',
  call_duration: [seconds],
  call_recording_url: [URL from Twilio/Bland/Vapi],
  call_transcript: [full transcript],
  qualification_score: [0-100],
  timeline: ['immediate'|'1-3 months'|'3-6 months'|'6+ months'],
  motivation: [text],
  agent_experience: [true|false],
  interested_in_agent: [true|false],
  notes: [key insights from call],
  contacted_at: [timestamp],
  status: ['qualified'|'contacted'|'not_interested']
}
```

---

### **Voice Agent Platform Options:**
1. **Vapi.ai** (Recommended)
   - Easy to set up
   - Good voice quality
   - Built-in call recording
   - Webhooks for Supabase integration

2. **Bland.ai**
   - Very natural voice
   - Simple API
   - Good for conversational AI

3. **Twilio + OpenAI**
   - More control
   - More setup required
   - Custom voice prompts

---

### **Integration Flow:**
```
1. N8N workflow triggers when new lead arrives
   ↓
2. Voice AI platform receives webhook with lead data
   ↓
3. AI places outbound call using script above
   ↓
4. Call completes, transcript + recording generated
   ↓
5. Webhook sends results back to Supabase
   ↓
6. Dashboard updates automatically
```

---

## **Success Metrics**

**Target KPIs:**
- **Contact Rate:** 60%+ (actually reach the person)
- **Qualification Rate:** 30%+ (move to "qualified" status)
- **Booking Rate:** 20%+ (of contacted leads)
- **Avg Call Duration:** 2-3 minutes

---

## **Testing the Script**

### **Test Scenarios:**
1. **Hot Lead:** Immediate timeline, motivated, open to agent
   - Expected: Score 90+, status "qualified"

2. **Warm Lead:** 3-month timeline, not urgent, maybe open
   - Expected: Score 65-75, status "contacted"

3. **Cold Lead:** No timeline, just testing, not interested
   - Expected: Score <50, status "not_interested"

---

## **Next Steps for MAG**

1. Choose voice AI platform (recommend Vapi.ai)
2. Set up account and get API keys
3. Create voice agent with this script
4. Test with Josh's phone number first
5. Configure webhook to update Supabase
6. Run 3 test calls with different scenarios
7. Deploy to production

**Estimated time:** 4-6 hours for initial setup

---

## **Questions?**

Post in WhatsApp with:
- Which platform you chose
- Any issues setting up
- Test call results

Let's get this working! 🚀
