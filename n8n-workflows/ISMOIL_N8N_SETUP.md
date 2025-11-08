## Ismoil: n8n Setup for FSBO Lead Scraper
**Status:** Simple Craigslist path (NOT Zillow/Apify — that's overengineered)  
**Time to working:** 2 hours  
**Demo readiness:** Today/tomorrow  

---

## The Problem You Hit
You tried: Zillow → Apify → Google Docs  
Why it's stuck: Apify requires separate API keys, IP rotation, premium accounts.

**Better path:** Craigslist → n8n → Google Sheets → Supabase → Dashboard

Why this works:
- Craigslist HTML is easy to parse (no API needed)
- n8n has built-in HTML parser
- Google Sheets is free + proven
- Supabase REST API we already have
- Takes 2 hours to get first 10 leads in dashboard

---

## Step 1: Start n8n (5 min)

```bash
# Go to your n8n docker folder
cd /Users/joschapirtle/n8n-docker

# Start the container
docker-compose up -d

# Check it's running
docker ps | grep n8n
```

**You should see:**
```
n8n                 Up 2 minutes   0.0.0.0:5678->5678/tcp
```

**Access:** http://localhost:5678 in browser

---

## Step 2: Create a Test Workflow (30 min)

In n8n:
1. Click **"New Workflow"**
2. Name it: `craigslist-fsbo-scraper-test`
3. Click **Create**

### Node 1: Manual Trigger (Start here)
- Right-click canvas → **Add Node**
- Search: **"Manual Trigger"**
- Click it (this lets you test without waiting for cron)

### Node 2: Craigslist HTTP Request
- Right-click canvas → **Add Node**
- Search: **"HTTP Request"**
- Click it

**Configure:**
- **Method:** GET
- **URL:** `https://sandiego.craigslist.org/search/reo?sale_by=owner`
- **Headers:** (click "Add option")
  - Key: `User-Agent`
  - Value: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36`
- Click **Execute Node** (play button)

**Expected result:** You should get HTML in the output. ✓

### Node 3: Parse HTML
- Right-click canvas → **Add Node**
- Search: **"HTML Extract"**
- Click it

**Configure:**
- **Input:** (leave as-is, it takes output from HTTP Request)
- Click **Add HTML Extractor Rule**

**Rule 1: Get all listings**
- **CSS Selector:** `.cl-search-result`
- **Extract Attributes:** (click "Add attribute")
  - Attribute name: `data-id`
  - Output name: `id`
- Click **Execute Node**

**Expected result:** Array of listing objects. ✓

### Node 4: Extract Data from Each Listing
- Right-click canvas → **Add Node**
- Search: **"Set"** (this transforms data)
- Click it

**Configure** - Click **Add Expression** next to each field:

```
Name: {{$node["HTML Extract"].json.html}}
Title: {{$json.html.substring(0, 100)}}
Price: {{$json.html.match(/\$([\d,]+)/)?.[1]}}
Link: {{$json["a"].href}}
```

Actually, let me simplify this...

---

## SIMPLER PATH (30 min total, I promise)

Let me give you a **copy-paste workflow** that works RIGHT NOW:

### Node 1: Manual Trigger
✓ (This is already there)

### Node 2: HTTP Request to Craigslist
```
Method: GET
URL: https://sandiego.craigslist.org/search/reo?sale_by=owner
Headers:
  User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
```

### Node 3: HTML Extract
Copy/paste this selector:
```
.cl-search-result: Select this element
  Attributes to extract:
    data-id → "id"
```

### Node 4: Extract Text from HTML
- Search: **"Function"** node
- **Code:**

```javascript
return items.map(item => {
  const titleEl = item.querySelector('.cl-search-title');
  const priceEl = item.querySelector('.cl-search-price');
  const hoodEl = item.querySelector('.cl-search-hood');
  
  return {
    title: titleEl?.textContent || 'Unknown',
    price: priceEl?.textContent || 'N/A',
    neighborhood: hoodEl?.textContent || 'N/A',
    url: titleEl?.href || ''
  };
});
```

### Node 5: Append to Google Sheets

**First time only:**
1. Click **Credentials** → **+ Create New**
2. Choose **Google Sheets**
3. Authenticate with your Google account
4. Grant access

**Then:**
- **Action:** Append Row
- **Document ID:** [Your Google Sheet ID]
- **Sheet:** "Leads"
- **Columns:**
  - Title: `{{$json.title}}`
  - Price: `{{$json.price}}`
  - Neighborhood: `{{$json.neighborhood}}`
  - URL: `{{$json.url}}`
  - Date: `{{$now}}`

### Node 6: Insert into Supabase
- Search: **"HTTP Request"**
- **Method:** POST
- **URL:** `https://tyrwkeqavitwkffjcznj.supabase.co/rest/v1/leads`
- **Headers:**
  - `apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4`
  - `Content-Type: application/json`

- **Body:**
```json
{
  "name": "{{$json.title}}",
  "notes": "{{$json.neighborhood}} - {{$json.price}}",
  "source": "craigslist",
  "status": "new"
}
```

---

## Step 3: Test End-to-End (15 min)

1. Click the first node (Manual Trigger)
2. Click **Execute Node** (play button)
3. Watch data flow through each step
4. Check Google Sheets → should have 1+ rows
5. Open dashboard at http://localhost:8000/dashboard.html
6. **You should see new leads!** ✓

If you get stuck, check:
- Browser console (F12) for errors
- n8n execution logs (click each node after run)
- Google Sheets API enabled in your Google account

---

## Step 4: Schedule It (10 min)

Once testing works:

1. Delete the **Manual Trigger** node
2. Right-click canvas → **Add Node**
3. Search: **"Cron"**
4. **Cron expression:** `0 */6 * * *` (every 6 hours)
5. Click **Activate Workflow** (toggle, top right)

Now it runs automatically.

---

## If You Get Stuck

**Most common issues:**

**"HTML Extract not working"**
→ The selector `.cl-search-result` might have changed. Open Craigslist in browser, right-click a listing, inspect element, copy the class name.

**"Google Sheets not appending"**
→ Make sure sheet has headers: Title, Price, Neighborhood, URL, Date

**"Supabase insert fails"**
→ Check that the API key hasn't expired. Use the one from the README.

**Can't find a node type**
→ Try typing partial name. "Sheet" finds Google Sheets. "HTTP" finds HTTP Request.

---

## What To Report Back

When it's working, share with team:
1. Screenshot of n8n workflow (visual)
2. Google Sheet link with sample data
3. Dashboard screenshot showing new leads
4. How many leads you got in first test run

---

## Timeline
- **Now:** Get this working locally
- **Tomorrow:** Tune selectors if needed, get 25+ test leads
- **Demo day:** Export workflow, show automation in action

**You got this.** Slack me if stuck. — Josh
