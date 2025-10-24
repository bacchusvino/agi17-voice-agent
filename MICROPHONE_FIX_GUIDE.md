# Microphone/Voice Capture Fix Guide for mydroneshots.com

## Problem
The microphone button shows "Voice capture not supported in this browser" or doesn't work on mydroneshots.com.

## Root Causes & Solutions

### 1. HTTPS Requirement (Most Common Issue)

**Problem**: Web Speech API requires HTTPS (secure connection). If your site is served over HTTP, the microphone will not work.

**Check**:
- Visit your site and look at the URL bar
- If it shows `http://mydroneshots.com` → **This is the problem**
- It should show `https://mydroneshots.com` with a padlock icon

**Solutions**:

#### If Using Netlify (Recommended):
Netlify automatically provides HTTPS. You just need to ensure:

1. **Check Domain Settings in Netlify**:
   - Log into https://app.netlify.com
   - Go to your site → Domain settings
   - Under "HTTPS", ensure "Force HTTPS" is enabled
   - If disabled, click "Force HTTPS" to redirect all HTTP traffic to HTTPS

2. **Custom Domain Setup**:
   ```
   If using mydroneshots.com:
   - Netlify Dashboard → Domain management → Add custom domain
   - Add "mydroneshots.com"
   - Update your DNS provider (GoDaddy, Namecheap, etc.):
     - Type: A Record
     - Name: @
     - Value: 75.2.60.5 (Netlify's load balancer IP)

     AND/OR

     - Type: CNAME
     - Name: www
     - Value: [your-site].netlify.app
   ```

3. **Wait for SSL Certificate**:
   - Netlify automatically provisions SSL certificates (takes 1-5 minutes)
   - Once ready, your site will be accessible via HTTPS

#### If Using Different Hosting:
- **Apache**: Install SSL certificate and enable mod_ssl
- **Nginx**: Configure SSL certificate and update server blocks
- **Shared Hosting**: Enable SSL/HTTPS in cPanel or contact support

### 2. Browser Compatibility

**Supported Browsers**:
- ✅ Chrome/Chromium (Desktop & Android) - Full support
- ✅ Microsoft Edge - Full support
- ⚠️ Safari (Mac/iOS) - Limited/experimental support
- ⚠️ Firefox - Limited support
- ❌ Older browsers - No support

**Solution**: Test on Chrome first. If it works on Chrome but not Safari, it's a browser limitation.

### 3. Microphone Permissions

**Problem**: User hasn't granted microphone permission.

**Solution**:
1. Click the microphone button
2. Browser will show a popup asking for microphone permission
3. Click "Allow"
4. If accidentally clicked "Block", fix it:
   - Chrome: Click the camera/microphone icon in address bar → Allow
   - Safari: Safari → Settings for this Website → Microphone → Allow

### 4. Mixed Content Issues

**Problem**: HTTPS page loading HTTP resources blocks microphone access.

**Check**: Open browser console (F12) and look for:
```
Mixed Content: The page at 'https://...' was loaded over HTTPS, but requested an insecure resource 'http://...'. This request has been blocked.
```

**Solution**: Ensure all resources (scripts, stylesheets, images) use HTTPS or relative URLs.

### 5. Voice Capture Code Issues

The voice capture code is in `/index.html` lines 794-866. Key points:

**Current Implementation**:
```javascript
function supported() {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}
```

**Troubleshooting Steps**:

1. **Test Browser Support**:
   Open browser console (F12) on your site and type:
   ```javascript
   console.log('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
   ```
   - If `true`: Browser supports it
   - If `false`: Browser doesn't support Web Speech API

2. **Test HTTPS**:
   ```javascript
   console.log('HTTPS:', window.location.protocol === 'https:');
   ```
   - Should return `true`

3. **Test Permissions**:
   ```javascript
   navigator.permissions.query({name: 'microphone'}).then(result => {
     console.log('Microphone permission:', result.state);
   });
   ```
   - Should return: `granted`, `prompt`, or `denied`

## Quick Fix Checklist

1. ✅ **Force HTTPS in Netlify**:
   - Netlify Dashboard → Domain settings → Force HTTPS → Enable

2. ✅ **Test on Chrome**:
   - Use Chrome browser (best support)
   - Ensure URL starts with `https://`

3. ✅ **Grant Permissions**:
   - Click microphone button
   - Allow microphone access when prompted

4. ✅ **Clear Cache**:
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

5. ✅ **Check Console**:
   - Open browser console (F12)
   - Look for any red errors
   - Share errors for further debugging

## Testing After Fix

1. Visit `https://mydroneshots.com` (ensure https://)
2. Click the "🎤 Start Voice Capture" button
3. Grant microphone permission when prompted
4. Button should change to "⏹ Stop Voice Capture"
5. Speak clearly: "My email is john@example.com and my phone is 858-555-1234"
6. Check if text appears in the notes field
7. Check if email/phone fields are auto-populated

## Still Not Working?

If you've tried all the above and it still doesn't work:

1. **Share these details**:
   - Exact URL you're visiting
   - Browser name and version
   - Screenshot of any error messages
   - Browser console output (F12 → Console tab)

2. **Temporary Workaround**:
   - Users can manually type information into the form
   - Voice capture is optional, not required

3. **Alternative**:
   - Consider using a different voice API service
   - Or remove voice capture feature if not essential

## Files to Update

If you need to deploy changes:

```bash
# Upload these files to Netlify:
- index.html (contains voice capture code)
- agent-signup.html
- dashboard.html
- js/supabase.js

# Or use git deployment:
git add .
git commit -m "Fix voice capture HTTPS issue"
git push
# Netlify will auto-deploy
```

## Code Reference

Voice capture implementation: `index.html:794-866`
Browser support check: `index.html:802-804`
Error handling: `index.html:842-845`
