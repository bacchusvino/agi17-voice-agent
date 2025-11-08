# Security Setup Instructions

## 🚨 CRITICAL: Deploy Security Fixes

### **Step 1: Deploy RLS Migration**

1. **Go to Supabase Dashboard:**
   - Open: https://supabase.com/dashboard/project/tyrwkeqavitwkffjcznj/sql

2. **Run the security migration:**
   - Copy the content from: `supabase/migrations/20250109_secure_rls_policies.sql`
   - Paste into SQL Editor
   - Click "Run"

3. **Verify it worked:**
   - Check that new policies exist
   - Verify RLS is enabled

### **Step 2: Rotate API Keys (URGENT)**

**Your API keys were exposed in git history. You MUST rotate them:**

1. **Go to Supabase Dashboard → Settings → API**
2. **Generate new anon key:**
   - Click "Generate new anon key"
   - Copy the new key
   - Save it securely

3. **Update your application files:**
   - Replace `YOUR_PROJECT_REF` with: `tyrwkeqavitwkffjcznj`
   - Replace `YOUR_ANON_KEY_HERE` with your new anon key

### **Step 3: Update Application Files**

**Files to update with your new credentials:**

1. **index.html** (line 662-663):
   ```javascript
   const SUPABASE_URL = 'https://tyrwkeqavitwkffjcznj.supabase.co';
   const SUPABASE_ANON_KEY = 'your-new-anon-key-here';
   ```

2. **dashboard.html** (line 341-342):
   ```javascript
   const SUPABASE_URL = 'https://tyrwkeqavitwkffjzczj.supabase.co';
   const SUPABASE_ANON_KEY = 'your-new-anon-key-here';
   ```

3. **add-sample-data.html** (line 99-100):
   ```javascript
   const SUPABASE_URL = 'https://tyrwkeqavitwkffjzczj.supabase.co';
   const SUPABASE_ANON_KEY = 'your-new-anon-key-here';
   ```

### **Step 4: Test the Secure System**

**Test 1: Landing Page (Should Work)**
```bash
# Start server
python3 -m http.server 8000

# Open: http://localhost:8000/index.html
# Fill form and submit
# Should get success message
```

**Test 2: Dashboard (Should Require Auth)**
```bash
# Open: http://localhost:8000/dashboard.html
# Should show authentication required
# Should NOT show leads data
```

### **Step 5: Set Up Authentication (Optional)**

**For now, you can temporarily allow anonymous dashboard access:**

1. **Go to Supabase SQL Editor**
2. **Run this temporary fix:**
   ```sql
   -- TEMPORARY: Allow anonymous dashboard access
   -- Remove this after setting up proper authentication
   CREATE POLICY "temp_anon_select" ON public.leads
     FOR SELECT TO anon
     USING (true);
   ```

3. **Test dashboard again:**
   - Should now show leads
   - Status updates should work

### **Step 6: Production Deployment**

**When ready for production:**

1. **Set up proper authentication:**
   - Configure Supabase Auth
   - Add login to dashboard
   - Remove temporary anon policy

2. **Deploy to hosting:**
   - Use environment variables
   - Never commit real credentials
   - Set up monitoring

---

## ✅ COMPLETED SECURITY FIXES (from SECURITY_FIXES_SUMMARY.md)

### Backend Security Implementations

**Rate Limiting:**
- ✅ 10 requests per 15 minutes per IP enforced via `express-rate-limit`
- Located in: `server.js`

**Input Validation & Sanitization:**
- ✅ Email regex validation
- ✅ Phone number E.164 format validation
- ✅ Length limits on all fields
- ✅ CSV injection prevention (strip leading `= + - @` characters)
- Located in: `server.js`

**CORS & Security Headers:**
- ✅ CORS restricted to specific origins via `helmet`
- ✅ Security headers implemented
- ✅ Body size limit set to 10kb
- Located in: `server.js`

**Error Handling:**
- ✅ Generic errors returned to client (`{ ok: false, error: 'Unable to process request' }`)
- ✅ Full errors logged server-side with request IDs
- ✅ Request ID tracking for debugging
- Located in: `server.js`

### Database Security Implementations

**RLS Policies:**
- ✅ Input validation with length limits
- ✅ Required fields enforcement
- ✅ Duplicate prevention (same email/phone within 1 hour)
- ✅ Better error messages for validation failures
- Located in: `supabase/migrations/20250109_secure_rls_policies.sql`

### Frontend Security Implementations

**XSS Prevention:**
- ✅ Dashboard: Removed onclick attributes
- ✅ Dashboard: Implemented event delegation with `addEventListener`
- ✅ Prevents attribute injection/XSS attacks
- Located in: `dashboard.html`

**Data Model Integrity:**
- ✅ Removed hardcoded `status: 'new'` from client
- ✅ Backend database handles default status value
- Located in: `index.html`

### Google Sheets Integration Security

**Defensive Programming:**
- ✅ Added null check for `GOOGLE_PRIVATE_KEY` environment variable
- ✅ Proper newline replacement for private key format
- Located in: `utils/sheets.js`

**Error Handling & Resilience:**
- ✅ Try-catch blocks with detailed logging
- ✅ 5-second timeout protection via `Promise.race`
- ✅ Exponential backoff retry logic (3 attempts)
- ✅ Input validation and sanitization
- ✅ CSV injection prevention
- Located in: `utils/sheets.js`

### Dependencies Added
- ✅ `express-rate-limit`: Rate limiting middleware
- ✅ `helmet`: Security headers middleware
- Located in: `package.json`

---

## 📋 Complete Security Checklist

### Initial Setup
- [ ] RLS migration deployed to Supabase
- [ ] API keys rotated (new anon key generated)
- [ ] Application files updated with new credentials
- [ ] No hardcoded credentials remain in code
- [ ] .gitignore verified (config.js is excluded)

### Backend Verification
- [ ] Rate limiting middleware active in server.js
- [ ] Input validation working (test with invalid email, phone, length)
- [ ] Error messages are generic to client, full logs on server
- [ ] Request ID tracking visible in server logs
- [ ] CORS headers properly set

### Database Verification
- [ ] RLS policies enabled on leads table
- [ ] Duplicate submission prevention working (test same email twice)
- [ ] Validation errors returned with clear messages
- [ ] Status defaults correctly in database

### Frontend Verification
- [ ] Landing page (index.html) accepts form submissions
- [ ] Dashboard (dashboard.html) requires authentication
- [ ] Dashboard event handlers work without onclick attributes
- [ ] No console errors related to security

### Google Sheets Integration
- [ ] Environment variables properly set (GOOGLE_PRIVATE_KEY, etc.)
- [ ] Credentials validated at server startup
- [ ] Timeout protection active (5 seconds)
- [ ] Retry logic functioning with exponential backoff
- [ ] CSV injection prevention active

### Functional Testing
- [ ] Landing page works (anonymous access)
  - [ ] Submit valid form data
  - [ ] Receive success message
  - [ ] Data appears in Supabase
- [ ] Dashboard works (with auth or temporary policy)
  - [ ] Retrieve and display leads
  - [ ] Update lead status
  - [ ] Changes persist in database
- [ ] Rate limiting enforced
  - [ ] Submit 11 requests in 15 minutes → 6th+ should be blocked
- [ ] Duplicate prevention
  - [ ] Submit same email twice within 1 hour → should be prevented

### Production Readiness
- [ ] Environment variables configured (never committed to git)
- [ ] Monitoring/logging set up
- [ ] Error tracking configured
- [ ] Backup keys secured (old rotated keys)
- [ ] Team has access to secure credential storage

---

## 🚀 Next Steps After Security Setup

1. **Verify all checks pass** using the checklist above
2. **Test the secure system** thoroughly before demo (Nov 23, 2025)
3. **Set up proper authentication** for dashboard (currently using temp policy)
4. **Deploy to Netlify** with environment variables
5. **Monitor for security issues** in production
6. **Schedule security review** post-launch

---

## 🆘 Troubleshooting

**Landing page not working:**
- Check browser console (F12) for errors
- Verify new API key is correct and active
- Check Supabase logs for permission errors

**Dashboard not working:**
- Apply temporary anon policy (Step 5 above)
- Or set up proper authentication first
- Verify RLS policies are enabled

**Rate limiting issues:**
- Check server logs for rate limit hits
- Adjust limits in `server.js` if needed
- Verify IP is being tracked correctly

**Google Sheets integration failing:**
- Verify `GOOGLE_PRIVATE_KEY` is set correctly
- Check server logs for timeout or retry messages
- Ensure credentials.json path is correct

**Need help?**
- Check browser console (F12)
- Review server logs with request IDs
- Check Supabase logs and RLS policy status
- Reference SECURITY_FIXES_SUMMARY.md for detailed explanations

---

## 📚 Reference Documents

- **SECURITY_FIXES_SUMMARY.md** - Detailed explanations of all fixes implemented
- **SETUP.md** - General setup instructions
- **README.md** - Project overview

**Team:** Joscha (lead), Mandar, Mihir, Ismoil, Zubair  
**Demo Date:** November 23, 2025  
**Last Updated:** October 16, 2025
