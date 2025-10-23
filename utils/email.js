// utils/email.js
import nodemailer from 'nodemailer';
import 'dotenv/config';

/**
 * Email service for sending transactional emails
 * Supports Gmail and generic SMTP configurations
 */

// Create reusable transporter
let transporter = null;

/**
 * Initialize email transporter with environment configuration
 */
function getTransporter() {
  if (transporter) return transporter;

  // Validate required environment variables
  const required = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASSWORD'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.warn(`⚠️  Email service not configured. Missing: ${missing.join(', ')}`);
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  console.log('✅ Email transporter initialized');
  return transporter;
}

/**
 * Send an email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML email body
 * @param {string} [options.text] - Plain text email body (optional)
 * @returns {Promise<Object>} Send result
 */
export async function sendEmail({ to, subject, html, text }) {
  const transport = getTransporter();

  if (!transport) {
    throw new Error('Email service not configured. Check environment variables.');
  }

  try {
    const info = await transport.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'QualiFy'}" <${process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_USER}>`,
      to,
      subject,
      text: text || stripHtml(html), // Fallback to stripped HTML if no text provided
      html,
    });

    console.log(`📧 Email sent: ${info.messageId} to ${to}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email send failed:', error);
    throw error;
  }
}

/**
 * Send welcome email to new agent
 * @param {Object} agent - Agent details
 * @param {string} agent.name - Agent's name
 * @param {string} agent.email - Agent's email
 * @param {string} agent.agency - Agent's agency
 * @param {string} agent.apiKey - Agent's API key
 */
export async function sendWelcomeEmail({ name, email, agency, apiKey }) {
  const subject = 'Welcome to QualiFy - Your Account is Ready!';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .api-key-box { background: #fff; border: 2px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 5px; font-family: monospace; word-break: break-all; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Welcome to QualiFy!</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${name}</strong>,</p>

          <p>Congratulations! Your QualiFy account has been successfully created for <strong>${agency}</strong>.</p>

          <p>You're now part of San Diego's premier real estate lead automation platform, powered by AI voice agents that qualify FSBO leads for you.</p>

          <h3>🔑 Your API Key</h3>
          <p>Here's your unique API key for accessing the QualiFy platform:</p>
          <div class="api-key-box">
            ${apiKey}
          </div>

          <div class="warning">
            <strong>⚠️ Important:</strong> Keep this API key secure! It provides access to your account and lead data. Never share it publicly or commit it to version control.
          </div>

          <h3>🚀 Next Steps</h3>
          <ol>
            <li><strong>Log in to your dashboard:</strong> Access your leads and configure your preferences</li>
            <li><strong>Set up your voice agent:</strong> Customize the AI agent to match your brand</li>
            <li><strong>Connect your CRM:</strong> Integrate with your existing tools</li>
            <li><strong>Start receiving qualified leads:</strong> Let the AI do the heavy lifting!</li>
          </ol>

          <a href="${process.env.APP_URL || 'https://qualify.com'}/agent-dashboard.html" class="button">
            Access Your Dashboard →
          </a>

          <h3>📚 Resources</h3>
          <ul>
            <li><a href="#">Getting Started Guide</a></li>
            <li><a href="#">API Documentation</a></li>
            <li><a href="#">Voice Agent Training</a></li>
            <li><a href="#">Best Practices</a></li>
          </ul>

          <p>Need help? Reply to this email or contact our support team at <a href="mailto:${process.env.ADMIN_EMAIL || 'support@qualify.com'}">${process.env.ADMIN_EMAIL || 'support@qualify.com'}</a></p>

          <p>Happy selling!<br>
          <strong>The QualiFy Team</strong></p>
        </div>
        <div class="footer">
          <p>&copy; 2025 QualiFy. All rights reserved.<br>
          San Diego's #1 Real Estate Lead Automation Platform</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: email, subject, html });
}

/**
 * Send request for more information email
 * @param {Object} options - Email options
 * @param {string} options.name - Agent's name
 * @param {string} options.email - Agent's email
 * @param {string} options.missingInfo - What information is needed
 */
export async function sendRequestMoreInfoEmail({ name, email, missingInfo = [] }) {
  const subject = 'QualiFy - We Need a Bit More Information';

  const infoList = Array.isArray(missingInfo) ? missingInfo : [missingInfo];
  const infoListHtml = infoList.map(item => `<li>${item}</li>`).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-box { background: #fff; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        ul { line-height: 2; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 Additional Information Needed</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${name}</strong>,</p>

          <p>Thank you for signing up with QualiFy! We're excited to have you on board.</p>

          <p>To complete your account setup and provide you with the best possible experience, we need a bit more information from you:</p>

          <div class="info-box">
            <h3>Please provide:</h3>
            <ul>
              ${infoListHtml}
            </ul>
          </div>

          <p>This information will help us:</p>
          <ul>
            <li>✅ Customize your voice agent to match your brand</li>
            <li>✅ Set up proper lead routing</li>
            <li>✅ Optimize your lead qualification criteria</li>
            <li>✅ Ensure compliance with local regulations</li>
          </ul>

          <a href="${process.env.APP_URL || 'https://qualify.com'}/complete-profile.html" class="button">
            Complete Your Profile →
          </a>

          <p>Alternatively, you can reply directly to this email with the requested information, and our team will update your profile manually.</p>

          <p>If you have any questions, don't hesitate to reach out!</p>

          <p>Best regards,<br>
          <strong>The QualiFy Team</strong></p>
        </div>
        <div class="footer">
          <p>&copy; 2025 QualiFy. All rights reserved.<br>
          Questions? Email us at <a href="mailto:${process.env.ADMIN_EMAIL || 'support@qualify.com'}">${process.env.ADMIN_EMAIL || 'support@qualify.com'}</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: email, subject, html });
}

/**
 * Send admin notification when new agent registers
 * @param {Object} agent - Agent details
 */
export async function sendAdminNotification({ name, email, agency, phone }) {
  if (!process.env.ADMIN_EMAIL) {
    console.warn('⚠️  ADMIN_EMAIL not configured, skipping admin notification');
    return;
  }

  const subject = `New Agent Registration: ${name} from ${agency}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #667eea; color: white; }
        .alert { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>🎯 New Agent Registration</h2>

        <div class="alert">
          <strong>Action Required:</strong> A new agent has registered on QualiFy.
        </div>

        <table>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td><strong>Name</strong></td>
            <td>${name}</td>
          </tr>
          <tr>
            <td><strong>Email</strong></td>
            <td><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td><strong>Agency</strong></td>
            <td>${agency}</td>
          </tr>
          <tr>
            <td><strong>Phone</strong></td>
            <td><a href="tel:${phone}">${phone}</a></td>
          </tr>
          <tr>
            <td><strong>Registration Time</strong></td>
            <td>${new Date().toLocaleString()}</td>
          </tr>
        </table>

        <p><strong>Next Steps:</strong></p>
        <ul>
          <li>Review agent profile for completeness</li>
          <li>Welcome call/email if needed</li>
          <li>Verify agency credentials</li>
          <li>Set up onboarding call</li>
        </ul>

        <p><em>This is an automated notification from the QualiFy system.</em></p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: process.env.ADMIN_EMAIL, subject, html });
}

/**
 * Strip HTML tags for plain text fallback
 * @param {string} html - HTML string
 * @returns {string} Plain text
 */
function stripHtml(html) {
  return html
    .replace(/<style[^>]*>.*<\/style>/gm, '')
    .replace(/<[^>]+>/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Verify email configuration is valid
 * @returns {Promise<boolean>} True if configuration is valid
 */
export async function verifyEmailConfig() {
  const transport = getTransporter();

  if (!transport) {
    return false;
  }

  try {
    await transport.verify();
    console.log('✅ Email configuration verified successfully');
    return true;
  } catch (error) {
    console.error('❌ Email configuration verification failed:', error.message);
    return false;
  }
}
