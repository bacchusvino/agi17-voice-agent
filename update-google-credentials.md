# Google Service Account Key Rotation

## Steps to Update Google Credentials

### 1. Delete Old Key
- Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=nth-cumulus-465703-r7
- Find key ID: `84fae77008e6afd50985bd7679861c1b04dec877`
- Delete the old key

### 2. Generate New Key
- In Google Cloud Console → Service Accounts
- Click "Add Key" → "Create new key"
- Select "JSON" format
- Download the new JSON file

### 3. Update .env File
Replace these values in your `.env` file:

```bash
# From the new JSON file, copy:
GOOGLE_CLIENT_EMAIL=your-new-service-account@nth-cumulus-465703-r7.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_NEW_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

### 4. Test the Connection
After updating, restart your server and test:
```bash
npm run api
```

### 5. Verify in Logs
Check that Google Sheets integration works without authentication errors.

## Security Notes
- Never commit the .env file to git
- Keep the JSON key file secure
- Rotate keys regularly for security
