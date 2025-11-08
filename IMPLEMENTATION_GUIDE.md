# Security Implementation Guide

## ✅ Completed Implementations

### Backend Security (server.js)
- ✅ Rate limiting: 10 requests per 15 minutes per IP (express-rate-limit)
- ✅ CORS restriction to specific origins (helmet + cors)
- ✅ Security headers via Helmet middleware
- ✅ Input validation middleware with email & phone regex
- ✅ Body size limit: 10kb maximum
- ✅ CSV injection prevention (strip leading `= + - @`)
- ✅ Error sanitization: generic errors to client, full logs server-side
- ✅ Request ID tracking for debugging

### Google Sheets Integration (utils/sheets.js)
- ✅ Environment variable validation at startup
- ✅ Defensive programming for GOOGLE_PRIVATE_KEY
- ✅ 5-second timeout protection via Promise.race
- ✅ Exponential backoff retry (3 attempts: 1s, 2s, 4s)
- ✅ CSV injection prevention in sanitization
- ✅ Comprehensive error logging

### Frontend Security (index.html)
- ✅ Form validation (email regex, phone length)
- ✅ Input sanitization (length limits)
- ✅ No hardcoded status value (database handles default)
- ✅ Generic error messages to user
- ✅ Merge conflict resolved (voice capture logic)

### Frontend Security (dashboard.html)
- ✅ Event delegation for status buttons (no onclick attributes)
- ✅ Data attributes instead of inline handlers
- ✅ DOMPurify library loaded for XSS prevention
- ✅ User-generated content sanitized in renderLeads()

### Database Security (supabase/migrations/20250109_secure_rls_policies.sql)
- ✅ Secure anonymous insert policy with validation
- ✅ Duplicate prevention (same email within 1 hour)
- ✅ Authenticated users only for read/update
- ✅ Service role access for backend operations
- ✅ Length validation at database level
- ✅ Rate limit check function in PostgreSQL

### Configuration & Gitignore
- ✅ .gitignore properly configured (includes .env, config.js, credentials.json)
- ✅ env.example file with template
- ✅ No real credentials committed to git

---

## 🔑 CRITICAL: Manual Credentials Setup

**DO NOT COMMIT CREDENTIALS TO GITHUB**

### Step 1: Get Your Supabase Credentials
1. Go to: https://supabase.com/dashboard
2. Select your project: `tyrwkeqavitwkffjcznj`
3. Go to Settings → API
4. Copy your credentials:
   - **Project URL** (SUPABASE_URL): `https://tyrwkeqavitwkffjzczj.supabase.co`
   - **Anon Key** (SUPABASE_ANON_KEY): `your-anon-key-here`

### Step 2: Update Frontend Files (Locally Only - DO NOT COMMIT)
Update these files **locally only** with your actual credentials:

**File 1: index.html** (around line 662-663)
```javascript
const SUPABASE_URL = 'https://tyrwkeqavitwkffjczn.supabase.co';
const SUPABASE_ANON_KEY = 'your-actual-anon-key-here';
```

**File 2: dashboard.html** (around line 340-341)
```javascript
const SUPABASE_URL = 'https://tyrwkeqavitwkffjczn.supabase.co';
const SUPABASE_ANON_KEY = 'your-actual-anon-key-here';
```

**File 3: add-sample-data.html** (around line 98-99)
```javascript
const SUPABASE_URL = 'https://tyrwkeqavitwkffjczn.supabase.co';
const SUPABASE_ANON_KEY = 'your-actual-anon-key-here';
```

⚠️ **WARNING**: Never commit these files with real credentials!  
To prevent accidental commits, add to .gitignore if needed or use environment variables in production.

### Step 3: Deploy RLS Migration to Supabase
1. Go to: https://supabase.com/dashboard/project/tyrwkeqavitwkffjczn/sql
2. Click "New Query" and paste content from: `supabase/migrations/20250109_secure_rls_policies.sql`
3. Click "Run"
4. Verify success (no errors)

### Step 4: Set Up Backend Environment Variables
Create `.env` file in project root:
```
SHEETS_ID=your_google_sheet_id_here
GOOGLE_CLIENT_EMAIL=your-service-account@project-name.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
PORT=5057
```

Ensure `.env` is in `.gitignore` (already configured ✅)

---

## 🧪 Testing Checklist

### Backend Tests
- [ ] Start server: `node server.js`
- [ ] Health check: `curl http://localhost:5057/api/health`
- [ ] Submit lead: `curl -X POST http://localhost:5057/api/leads -H "Content-Type: application/json" -d '{"ownerName":"Test","phone":"+16195550100","city":"San Diego"}'`
- [ ] Rate limit test: Submit 11 requests in 15 minutes → 6th+ should fail
- [ ] Invalid input test: Submit invalid email → should return validation error

### Frontend Tests
- [ ] Open index.html locally → form loads
- [ ] Submit form with valid data → success message appears
- [ ] Check Supabase → lead appears in table
- [ ] Submit duplicate email within 1 hour → should be rejected
- [ ] Invalid phone → form validation blocks submission

### Dashboard Tests
- [ ] Open dashboard.html locally → loading appears
- [ ] Check browser console (F12) → no errors
- [ ] If RLS allows anon select, leads appear
- [ ] Click status buttons → lead status updates
- [ ] Search/filter works

### Security Tests
- [ ] Try to access dashboard.html without credentials → should show error (if auth required)
- [ ] Open browser DevTools (F12) → no sensitive credentials in code
- [ ] Submit form with `<script>alert('xss')</script>` in name field → should sanitize
- [ ] Try CSV injection: name starting with `=INDIRECT(...)` → should be stripped

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All .env files created locally (NOT committed)
- [ ] RLS migration deployed to Supabase
- [ ] Rate limiting configured and tested
- [ ] Error handling verified (no sensitive data exposed)
- [ ] All security tests pass
- [ ] No credentials in git history

### Environment Variables
- [ ] `SHEETS_ID` configured
- [ ] `GOOGLE_CLIENT_EMAIL` configured
- [ ] `GOOGLE_PRIVATE_KEY` configured (escaped newlines properly)
- [ ] `PORT` set (default 5057)

### Netlify Deployment (Frontend)
- [ ] Push code to GitHub (credentials NOT included)
- [ ] Connect Netlify to GitHub repo
- [ ] Build command: `npm run build` (or deploy index.html directly)
- [ ] Deploy functions/server separately or use Netlify Functions

### Backend Deployment
- [ ] Deploy server.js to serverless platform (Vercel, Netlify Functions, etc.)
- [ ] Set environment variables in deployment platform
- [ ] Update CORS origins with actual domain
- [ ] Configure rate limiting limits based on traffic

### Post-Deployment
- [ ] Test landing page form submission
- [ ] Monitor server logs for errors
- [ ] Verify rate limiting is working
- [ ] Monitor Supabase logs for unusual activity

---

## 🔐 Security Best Practices

### Never Do This ❌
- ❌ Commit `.env` files to git
- ❌ Hardcode credentials in code
- ❌ Use same credentials for development and production
- ❌ Share credentials in Slack/email
- ❌ Log sensitive data

### Always Do This ✅
- ✅ Use environment variables for credentials
- ✅ Rotate credentials periodically
- ✅ Use .gitignore to prevent accidental commits
- ✅ Store credentials securely (AWS Secrets Manager, Netlify Env Vars, etc.)
- ✅ Review git history: `git log --oneline | head -20`
- ✅ Check for credentials: `git log -p | grep -i "supabase\|api\|key"`

### Files Already Secure ✅
- `.gitignore` - properly configured
- `server.js` - rate limiting, validation, error handling
- `utils/sheets.js` - defensive programming, timeouts, retries
- `supabase/migrations/` - RLS policies configured
- `dashboard.html` - XSS prevention, event delegation
- `index.html` - input sanitization, no hardcoded status

---

## 📞 Troubleshooting

### "Unable to process request" error
- Check server logs for actual error details
- Verify environment variables are set correctly
- Check Supabase RLS policies allow the operation
- Verify rate limiting hasn't blocked the request

### Dashboard shows "Error loading leads"
- Open browser DevTools (F12) → Console tab
- Check if credentials are correct
- Verify RLS policy allows authenticated access
- Check Supabase project status

### Rate limiting too aggressive
- Edit `server.js` line 14-18:
  ```javascript
  windowMs: 15 * 60 * 1000,  // Change 15 to desired minutes
  max: 10,  // Change 10 to desired requests
  ```

### Google Sheets integration failing
- Verify `GOOGLE_PRIVATE_KEY` format (newlines should be actual newlines, not `\\n`)
- Verify `SHEETS_ID` is correct and the sheet exists
- Check server logs for timeout or authentication errors
- Ensure service account has edit permissions on the sheet

---

## Team & Timeline
- **Team:** Joscha (lead), Mandar, Mihir, Ismoil, Zubair
- **Demo:** November 23, 2025
- **Security Status:** ✅ Implemented & Ready for Testing
