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
   const SUPABASE_URL = 'https://tyrwkeqavitwkffjcznj.supabase.co';
   const SUPABASE_ANON_KEY = 'your-new-anon-key-here';
   ```

3. **add-sample-data.html** (line 99-100):
   ```javascript
   const SUPABASE_URL = 'https://tyrwkeqavitwkffjcznj.supabase.co';
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

### **Security Checklist**

- [ ] RLS migration deployed
- [ ] API keys rotated
- [ ] Application files updated
- [ ] Landing page works (anonymous)
- [ ] Dashboard requires auth (or temp fix applied)
- [ ] No hardcoded credentials in git
- [ ] Rate limiting active
- [ ] Duplicate prevention working

### **If Something Breaks**

**Landing page not working:**
- Check browser console for errors
- Verify new API key is correct
- Check Supabase logs

**Dashboard not working:**
- Apply temporary anon policy (Step 5)
- Or set up proper authentication

**Need help?**
- Check browser console (F12)
- Check Supabase logs
- Review this guide

---

**Next Steps After Security:**
1. Test the secure system
2. Set up authentication properly
3. Deploy to production
4. Monitor for security issues

**Remember:** Your system is now secure, but you need to update the credentials in your files!

