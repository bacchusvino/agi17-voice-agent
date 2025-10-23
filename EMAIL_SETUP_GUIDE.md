# Email System Setup Guide

## Overview

QualiFy now includes a complete email notification system that automatically sends welcome emails to new agents and allows you to request additional information when needed.

## Features

- **Welcome Emails**: Automatically sent when agents register
- **Request More Info**: Send follow-up emails asking for additional details
- **Admin Notifications**: Get notified when new agents sign up
- **Professional Templates**: Beautiful, branded HTML email templates
- **Multiple Provider Support**: Works with Gmail, SendGrid, or any SMTP server

---

## Quick Start

### 1. Install Dependencies (Already Done)

The required `nodemailer` package has been installed.

```bash
npm install nodemailer
```

### 2. Configure Email Settings

Copy the `.env.example` file to `.env` and configure your email settings:

```bash
cp env.example .env
```

Edit `.env` and add your email configuration:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
EMAIL_FROM_NAME=QualiFy
EMAIL_FROM_ADDRESS=noreply@qualify.com
ADMIN_EMAIL=admin@yourcompany.com
```

### 3. Choose Your Email Provider

#### Option A: Gmail (Recommended for Testing)

1. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
2. Generate a new app password for "Mail"
3. Use this configuration:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

#### Option B: SendGrid

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key
3. Use this configuration:

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

#### Option C: Custom SMTP

Use your own SMTP server:

```env
EMAIL_HOST=smtp.yourprovider.com
EMAIL_PORT=587
EMAIL_SECURE=false  # Set to true for port 465
EMAIL_USER=your-username
EMAIL_PASSWORD=your-password
```

### 4. Start the Server

```bash
npm run api
```

The server will start on `http://localhost:5057`

### 5. Verify Email Configuration

Test your email configuration:

```bash
curl http://localhost:5057/api/email/verify
```

Expected response:
```json
{
  "ok": true,
  "configured": true,
  "message": "Email service is configured correctly"
}
```

---

## How It Works

### Automatic Welcome Emails

When an agent registers via `agent-signup.html`, the system automatically:

1. Creates the agent account in Supabase
2. Sends a welcome email with their API key
3. Sends an admin notification (if configured)

The email includes:
- Personalized greeting
- Their unique API key (displayed securely)
- Link to agent dashboard
- Getting started instructions
- Support contact information

### Request More Information

You can manually trigger emails asking for additional information:

```javascript
// Example: Request more info from an agent
fetch('http://localhost:5057/api/email/request-info', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    missingInfo: [
      'Real estate license number',
      'Years of experience',
      'Preferred contact hours'
    ]
  })
});
```

---

## API Endpoints

### GET `/api/email/verify`

Verify email configuration is valid.

**Response:**
```json
{
  "ok": true,
  "configured": true,
  "message": "Email service is configured correctly"
}
```

### POST `/api/email/welcome`

Send welcome email to a new agent.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "agency": "Doe Realty",
  "phone": "555-123-4567",
  "apiKey": "abc123..."
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Welcome email sent successfully"
}
```

### POST `/api/email/request-info`

Request additional information from an agent.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "missingInfo": [
    "License number",
    "Years of experience"
  ]
}
```

**Response:**
```json
{
  "ok": true,
  "message": "Information request email sent successfully"
}
```

---

## Email Templates

### Welcome Email Features

- Responsive design works on all devices
- Professional gradient header
- Secure API key display with warning
- Call-to-action button to dashboard
- Useful resource links
- Company branding

### Request Info Email Features

- Clear list of requested information
- Professional formatting
- Easy reply option
- Link to complete profile online

### Admin Notification Features

- Summary table of new agent details
- Direct links to contact agent
- Registration timestamp
- Suggested next steps

---

## Troubleshooting

### Email Configuration Not Working

**Problem:** `curl http://localhost:5057/api/email/verify` returns `configured: false`

**Solutions:**

1. **Check environment variables are loaded:**
   ```bash
   node -e "require('dotenv').config(); console.log(process.env.EMAIL_HOST)"
   ```

2. **Verify .env file exists:**
   ```bash
   ls -la .env
   ```

3. **Check for typos in variable names** (must match exactly)

4. **Gmail users:** Make sure you're using an App Password, not your regular password

### Emails Not Sending

**Problem:** API returns success but no email received

**Solutions:**

1. **Check spam folder**

2. **Verify sender email:**
   - Gmail: Must use the same email as EMAIL_USER
   - Other: Can use any email in EMAIL_FROM_ADDRESS

3. **Check server logs:**
   ```bash
   npm run api
   # Look for error messages
   ```

4. **Test with curl:**
   ```bash
   curl -X POST http://localhost:5057/api/email/welcome \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "your-test-email@gmail.com",
       "agency": "Test Agency",
       "apiKey": "test123"
     }'
   ```

### Gmail "Less Secure App" Error

**Problem:** Gmail blocks login attempts

**Solution:** Use App Passwords (see Gmail setup above). Do NOT enable "Less secure app access" - it's deprecated.

### Port Conflicts

**Problem:** Server won't start - port 5057 in use

**Solution:**
```bash
# Find process using port 5057
lsof -i :5057

# Kill the process
kill -9 <PID>

# Or use a different port in .env
PORT=5058
```

---

## Security Best Practices

### Never Commit Credentials

Add to `.gitignore`:
```
.env
*.env
.env.*
!.env.example
```

### Use App Passwords

- Gmail: Use App Passwords, not your main password
- SendGrid: Use restricted API keys
- Custom SMTP: Use dedicated credentials

### Protect API Keys in Emails

The welcome email displays API keys. Ensure:
- Emails are sent via secure connections (TLS)
- Recipients are verified before sending
- Keys are displayed with security warnings

### Rate Limiting

The server includes rate limiting (100 requests per 15 minutes). Adjust in `server.js` if needed:

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
```

---

## Customization

### Modify Email Templates

Edit templates in `utils/email.js`:

```javascript
// Change welcome email subject
const subject = 'Welcome to QualiFy - Your Account is Ready!';

// Modify HTML template
const html = `
  <!DOCTYPE html>
  <html>
  ...
  </html>
`;
```

### Add Custom Email Types

Create new functions in `utils/email.js`:

```javascript
export async function sendPasswordResetEmail({ name, email, resetToken }) {
  const subject = 'Reset Your QualiFy Password';
  const html = `...`;
  return sendEmail({ to: email, subject, html });
}
```

Add corresponding endpoint in `server.js`:

```javascript
app.post("/api/email/reset-password", async (req, res) => {
  const { name, email, resetToken } = req.body;
  await sendPasswordResetEmail({ name, email, resetToken });
  res.json({ ok: true });
});
```

### Change Email Branding

Update these variables in `.env`:

```env
EMAIL_FROM_NAME=Your Company Name
EMAIL_FROM_ADDRESS=noreply@yourcompany.com
ADMIN_EMAIL=admin@yourcompany.com
APP_URL=https://yourcompany.com
```

---

## Production Deployment

### Update API URL

In `agent-signup.html`, update the production API URL:

```javascript
const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5057'
  : 'https://api.yourcompany.com'; // Update this!
```

### Update CORS

In `server.js`, add your production domains:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://yourcompany.com',
    'https://www.yourcompany.com',
  ],
  credentials: true,
};
```

### Environment Variables

Ensure your production server has all required environment variables:

```bash
# Check on production server
env | grep EMAIL
```

### SSL/TLS

For production, use:
- EMAIL_PORT=465 with EMAIL_SECURE=true (SSL)
- Or EMAIL_PORT=587 with EMAIL_SECURE=false (TLS)

### Monitoring

Log all email operations:

```javascript
// Already implemented in utils/email.js
console.log(`📧 Email sent: ${info.messageId} to ${to}`);
console.error('❌ Email send failed:', error);
```

---

## Testing

### Test Welcome Email

```bash
curl -X POST http://localhost:5057/api/email/welcome \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Agent",
    "email": "your-email@example.com",
    "agency": "Test Realty",
    "phone": "555-0100",
    "apiKey": "test_key_12345"
  }'
```

### Test Request Info Email

```bash
curl -X POST http://localhost:5057/api/email/request-info \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Agent",
    "email": "your-email@example.com",
    "missingInfo": ["License number", "Years of experience"]
  }'
```

### Test Full Registration Flow

1. Start the server: `npm run api`
2. Open `agent-signup.html` in a browser
3. Fill out the registration form
4. Submit and check your email
5. Check server logs for confirmation

---

## Support

### Need Help?

- Check the troubleshooting section above
- Review server logs: `npm run api`
- Test with curl commands
- Verify environment variables

### Email Not Arriving?

1. Check spam/junk folder
2. Verify email address is correct
3. Check server logs for errors
4. Test with /api/email/verify endpoint

### Common Issues

| Issue | Solution |
|-------|----------|
| "Email service not configured" | Add EMAIL_* variables to .env |
| "Authentication failed" | Check EMAIL_USER and EMAIL_PASSWORD |
| "Connection timeout" | Check EMAIL_HOST and EMAIL_PORT |
| "CORS error" | Add your domain to corsOptions in server.js |
| No email received | Check spam, verify configuration |

---

## Next Steps

1. ✅ Configure `.env` with your email provider
2. ✅ Test with `curl` commands
3. ✅ Test full registration flow
4. ✅ Customize email templates (optional)
5. ✅ Update production API URL
6. ✅ Deploy and monitor

---

## File Reference

- **Email Service**: `utils/email.js`
- **Server Endpoints**: `server.js` (lines 149-230)
- **Frontend Integration**: `agent-signup.html` (lines 509-567)
- **Environment Config**: `env.example` (lines 18-30)
- **Documentation**: `EMAIL_SETUP_GUIDE.md`

---

## Questions?

For technical support or questions about the email system, contact the development team or refer to the Nodemailer documentation: https://nodemailer.com/
