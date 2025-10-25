# CRITICAL SECURITY REMEDIATION REQUIRED

## Overview

This document outlines critical security issues discovered in the codebase and the immediate actions required to remediate them.

## CRITICAL: Exposed Credentials in Git History

### Issue 1: Google Service Account Private Key Exposed

**File:** `google-credentials.json`
**Commit:** `65fea0c6eae97006a673f25c7f51c9ce264e7f1c` (and possibly others)

The Google service account private key for `qualify-sheets-agent@nth-cumulus-465703-r7.iam.gserviceaccount.com` has been committed to git and is visible in the repository history.

**IMMEDIATE ACTIONS REQUIRED:**

1. **Revoke the exposed service account key:**
   - Go to Google Cloud Console: https://console.cloud.google.com
   - Navigate to: IAM & Admin → Service Accounts
   - Find: `qualify-sheets-agent@nth-cumulus-465703-r7.iam.gserviceaccount.com`
   - Click on the service account
   - Go to the "Keys" tab
   - Delete the key with ID: `84fae77008e6afd50985bd7679861c1b04dec877`

2. **Generate a new service account key:**
   - In the same service account page, click "Add Key" → "Create New Key"
   - Choose JSON format
   - Save the file securely (DO NOT commit to git)

3. **Update environment variables:**
   - Store credentials in environment variables instead of files
   - Update `.env` file (which is already in .gitignore):
     ```
     GOOGLE_CLIENT_EMAIL=qualify-sheets-agent@nth-cumulus-465703-r7.iam.gserviceaccount.com
     GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
     ```

4. **Remove from git history:**
   ```bash
   # Using BFG Repo-Cleaner (recommended)
   bfg --delete-files google-credentials.json

   # OR using git filter-branch (more complex)
   git filter-branch --force --index-filter \
     'git rm --cached --ignore-unmatch google-credentials.json' \
     --prune-empty --tag-name-filter cat -- --all

   # Force push (WARNING: Coordinate with team first)
   git push origin --force --all
   ```

5. **Verify .gitignore is working:**
   - Ensure `google-credentials.json` is in `.gitignore` (already done)
   - Never commit credential files again

### Issue 2: Supabase Credentials Hardcoded

**Files:**
- `js/supabase.js` (lines 5-6)
- `seed-test-agents.js` (lines 12-13)

**Commits:** Multiple commits including `e9190d8`, `eb9790a`, `9fcd055`

The Supabase URL and anon key were hardcoded and committed to git history.

**IMMEDIATE ACTIONS REQUIRED:**

1. **Rotate Supabase anon key:**
   - Go to Supabase Dashboard: https://app.supabase.com
   - Navigate to your project: `tyrwkeqavitwkffjcznj`
   - Go to Settings → API
   - Click "Generate new anon key" (if available) or "Reset" the anon key
   - Update your `.env` file with the new key

2. **Update environment variables:**
   ```
   SUPABASE_URL=https://tyrwkeqavitwkffjcznj.supabase.co
   SUPABASE_ANON_KEY=your_new_anon_key_here
   ```

3. **Frontend configuration:**
   - For browser-based code (`js/supabase.js`), set credentials in your HTML:
     ```html
     <script>
       window.SUPABASE_URL = 'https://tyrwkeqavitwkffjcznj.supabase.co';
       window.SUPABASE_ANON_KEY = 'your_new_anon_key_here';
     </script>
     ```
   - Or use a build-time environment variable injection system

4. **Remove from git history:**
   ```bash
   # Remove hardcoded credentials from history
   git filter-branch --force --tree-filter \
     'sed -i "s/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.*/[REDACTED]/g" js/supabase.js seed-test-agents.js 2>/dev/null || true' \
     --prune-empty --tag-name-filter cat -- --all

   # Force push (WARNING: Coordinate with team first)
   git push origin --force --all
   ```

## Configuration Template

Create a `.env` file in the project root (already in .gitignore):

```bash
# Google Sheets API
GOOGLE_CLIENT_EMAIL=qualify-sheets-agent@nth-cumulus-465703-r7.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_New_Private_Key_Here\n-----END PRIVATE KEY-----\n"
SHEETS_ID=your_google_sheet_id

# Supabase
SUPABASE_URL=https://tyrwkeqavitwkffjcznj.supabase.co
SUPABASE_ANON_KEY=your_new_anon_key_here

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM_NAME=QualiFy
EMAIL_FROM_ADDRESS=your_email@gmail.com
ADMIN_EMAIL=admin@yourcompany.com

# Application
PORT=5057
PRODUCTION_URL=https://your-production-domain.com
APP_URL=https://your-production-domain.com
```

## Post-Remediation Verification

After completing the above steps:

1. Test that all functionality still works with new credentials
2. Monitor logs for any authentication errors
3. Verify that no credentials are committed in new code
4. Consider implementing pre-commit hooks to prevent credential commits:
   ```bash
   # Install git-secrets
   brew install git-secrets  # macOS
   # or
   apt-get install git-secrets  # Linux

   # Configure for repo
   git secrets --install
   git secrets --register-aws
   git secrets --add 'private_key'
   git secrets --add 'BEGIN PRIVATE KEY'
   ```

## Additional Security Improvements Implemented

This code review also fixed several other security issues:

- ✅ Fixed CSV injection protection to remove ALL leading dangerous characters
- ✅ Replaced weak `Math.random()` with `crypto.randomUUID()` for request IDs
- ✅ Added role validation in `ingest-transcript` function
- ✅ Removed placeholder domains from CORS configuration
- ✅ Tightened phone validation for US/San Diego format
- ✅ Sanitized sensitive data (phone, notes) in error logs
- ✅ Fixed bug in retry logic to use sanitized values
- ✅ Fixed substring bug in seed-test-agents.js

## Questions?

If you have questions about any of these remediation steps, please contact your security team or the developer who performed this review.

## Timeline

**CRITICAL:** Steps 1-3 for both Google and Supabase credentials should be completed within 24 hours of discovering this issue.
