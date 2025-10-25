# Google Service Account Key Rotation Guide

## Critical Action Required: Rotate Google Service Account Key

The current Google Service Account key needs to be rotated for security reasons.

### Step 1: Delete the Old Key
1. Go to [Google Cloud Console - Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts?project=nth-cumulus-465703-r7)
2. Find the service account that has the key ending in `84fae77008e6afd50985bd7679861c1b04dec877`
3. Click on the service account name
4. Go to the "Keys" tab
5. Find the key with ID `84fae77008e6afd50985bd7679861c1b04dec877`
6. Click the trash/delete icon to delete this key

### Step 2: Generate a New Key
1. In the same "Keys" tab, click "Add Key" → "Create new key"
2. Choose "JSON" format
3. Click "Create"
4. The new key file will download automatically

### Step 3: Update the .env File
1. Open the downloaded JSON file
2. Copy the following values:
   - `client_email` (this becomes `GOOGLE_CLIENT_EMAIL`)
   - `private_key` (this becomes `GOOGLE_PRIVATE_KEY`)

3. Update your `.env` file with these new values:
```bash
# Google Sheets Integration
SHEETS_ID=your_actual_google_sheet_id_here
GOOGLE_CLIENT_EMAIL=your-new-service-account@nth-cumulus-465703-r7.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_NEW_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

### Step 4: Test the New Credentials
After updating the `.env` file, test the connection:
```bash
curl -s http://localhost:5057/api/email/verify
```

### Step 5: Update Production (if applicable)
If you have a production deployment, update the environment variables there as well.

## Security Notes
- The old key should be deleted immediately after generating the new one
- Store the new key securely
- Never commit the `.env` file to version control
- The new key will have different permissions - ensure it has the same access as the old one

## Troubleshooting
If you encounter issues:
1. Verify the service account has the necessary permissions for Google Sheets
2. Check that the private key format is correct (including newlines)
3. Ensure the client email matches the service account email
4. Test the connection with the verification endpoint
