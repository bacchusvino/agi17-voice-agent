# Netlify Deployment Guide for QualiFy

## Quick Deploy to Netlify

### Option 1: Netlify UI (Easiest)
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select `bacchusvino/agi17-voice-agent`
4. **Build settings:**
   - Build command: (leave empty)
   - Publish directory: `.` (root directory)
5. Click "Deploy site"

### Option 2: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy from project root
cd /Users/joschapirtle/Documents/GitHub/aig17-project
netlify deploy --prod
```

## ✅ What Gets Deployed

The following files are deployed as a static site:
- `index.html` - Landing page with lead capture form
- `dashboard.html` - Lead management dashboard
- All assets load directly from HTML (no build step needed)

## 🔧 Configuration

The `netlify.toml` file is configured for:
- Static site deployment (no build process)
- Root directory publishing
- SPA redirect handling (if needed later)

## 🗄️ Database Connection

Both pages connect directly to Supabase:
- **URL:** `https://tyrwkeqavitwkffjcznj.supabase.co`
- **API Key:** Already embedded in HTML files
- **Method:** Direct REST API calls (no backend needed)

## 🚨 Common Issues

### Issue: 404 Error on Form Submit
**Cause:** Old cached version trying to hit `/api/submit-lead`  
**Fix:**
1. Clear Netlify deploy cache: Site settings → Build & deploy → Clear cache
2. Trigger new deploy
3. Hard refresh browser (Cmd+Shift+R)

### Issue: Form Submits But Shows Error
**Check:**
1. Browser console (F12) for actual error
2. Netlify function logs (if you accidentally have functions)
3. Supabase RLS policies are enabled

### Issue: Dashboard Doesn't Load Leads
**Check:**
1. Supabase credentials match in both `index.html` and `dashboard.html`
2. RLS policies allow SELECT for anon role
3. Browser console for CORS or auth errors

## 📋 Deployment Checklist

Before deploying:
- [ ] Test form locally works (http://localhost:8000)
- [ ] Test dashboard shows leads locally
- [ ] Supabase credentials are correct in both HTML files
- [ ] Git commit and push latest changes
- [ ] Deploy to Netlify
- [ ] Test deployed site URL
- [ ] Test form submission on live site
- [ ] Verify dashboard loads on live site

## 🔗 After Deployment

Your site will be available at:
- Auto-generated URL: `https://[random-name].netlify.app`
- Custom domain: Configure in Netlify dashboard

**Test the flow:**
1. Open your Netlify URL
2. Fill out the form
3. Open `[your-url]/dashboard.html`
4. Verify lead appears

## 🎯 Expected Behavior

**Landing Page:**
- Form captures name, email, phone
- Submits directly to Supabase REST API
- Shows success message on completion
- NO backend API needed

**Dashboard:**
- Fetches leads from Supabase
- Shows real-time status
- Updates work via direct REST API
- Auto-refreshes every 30 seconds

---

**Need help?** Check browser console (F12) for errors and compare with working local version.
