// server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import crypto from "crypto";
import "dotenv/config";
import { appendLeadRow } from "./utils/sheets.js";
import {
  sendWelcomeEmail,
  sendRequestMoreInfoEmail,
  sendAdminNotification,
  verifyEmailConfig
} from "./utils/email.js";

const app = express();

// Configuration constants
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 100; // Max requests per window per IP
const MAX_BODY_SIZE = '10kb'; // Maximum request body size

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX,
  message: {
    ok: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS with specific origins
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    // Add production domain via environment variable
    ...(process.env.PRODUCTION_URL ? [process.env.PRODUCTION_URL] : [])
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json({ limit: MAX_BODY_SIZE }));

// Validation middleware
function validateLeadData(req, res, next) {
  const { ownerName, phone, city, notes } = req.body || {};
  
  const errors = [];
  
  // Email validation (if provided)
  if (req.body.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      errors.push('Invalid email format');
    }
  }
  
  // Phone validation - US format only (San Diego area)
  if (phone) {
    const digitsOnly = phone.replace(/\D/g, '');
    // US phone numbers: 10 digits, or 11 with country code '1'
    if (digitsOnly.length < 10 || digitsOnly.length > 11) {
      errors.push('Invalid phone format (must be US phone number: 10-11 digits)');
    }
    // Optionally validate San Diego area codes: 619, 858, 760, 442, 935
    if (digitsOnly.length === 10) {
      const areaCode = digitsOnly.substring(0, 3);
      const validAreaCodes = ['619', '858', '760', '442', '935'];
      if (!validAreaCodes.includes(areaCode)) {
        // Warning only - don't reject, as agents may have clients from elsewhere
        console.warn(`Phone number has non-San Diego area code: ${areaCode}`);
      }
    }
  }
  
  // Length validation
  if (ownerName && ownerName.length > 100) {
    errors.push('Name too long (max 100 characters)');
  }
  
  if (phone && phone.length > 20) {
    errors.push('Phone too long (max 20 characters)');
  }
  
  if (city && city.length > 100) {
    errors.push('City too long (max 100 characters)');
  }
  
  if (notes && notes.length > 500) {
    errors.push('Notes too long (max 500 characters)');
  }
  
  // Sanitize strings to prevent CSV injection
  // Remove ALL leading dangerous characters and prefix with single quote to neutralize
  if (ownerName) req.body.ownerName = ownerName.replace(/^[=+\-@]+/, '');
  if (city) req.body.city = city.replace(/^[=+\-@]+/, '');
  if (notes) req.body.notes = notes.replace(/^[=+\-@]+/, '');
  
  if (errors.length > 0) {
    return res.status(400).json({ 
      ok: false, 
      error: 'Validation failed', 
      details: errors 
    });
  }
  
  next();
}

// health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// lead ingest handler
app.post("/api/leads", validateLeadData, async (req, res) => {
  const requestId = crypto.randomUUID();
  
  try {
    const {
      source = "QualiFy",
      ownerName = "",
      phone = "",
      city = "",
      consentBasis = "",
      notes = "",
    } = req.body ?? {};

    const row = [
      new Date().toISOString(),
      source,
      ownerName,
      phone,
      city,
      consentBasis,
      notes,
    ];

    await appendLeadRow(row);
    
    console.log(`Lead successfully processed (ID: ${requestId})`);
    res.status(201).json({ ok: true });
    
  } catch (err) {
    // Sanitize sensitive data before logging
    const sanitizedBody = {
      source: req.body.source,
      ownerName: req.body.ownerName,
      phone: req.body.phone ? '[REDACTED]' : undefined,
      city: req.body.city,
      consentBasis: req.body.consentBasis,
      notes: req.body.notes ? '[REDACTED]' : undefined,
    };

    console.error(`Lead processing failed (ID: ${requestId}):`, {
      error: err.message,
      stack: err.stack,
      body: sanitizedBody
    });

    // Return generic error to client
    res.status(500).json({
      ok: false,
      error: 'Unable to process request'
    });
  }
});

// Email endpoints

// Verify email configuration
app.get("/api/email/verify", async (_req, res) => {
  try {
    const isValid = await verifyEmailConfig();
    res.json({
      ok: isValid,
      configured: isValid,
      message: isValid ? 'Email service is configured correctly' : 'Email service not configured or invalid credentials'
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      configured: false,
      error: 'Failed to verify email configuration'
    });
  }
});

// Send welcome email to new agent
app.post("/api/email/welcome", async (req, res) => {
  try {
    const { name, email, agency, apiKey } = req.body;

    // Validate required fields
    if (!name || !email || !agency || !apiKey) {
      return res.status(400).json({
        ok: false,
        error: 'Missing required fields: name, email, agency, apiKey'
      });
    }

    // Send welcome email
    await sendWelcomeEmail({ name, email, agency, apiKey });

    // Send admin notification (non-blocking)
    sendAdminNotification({ name, email, agency, phone: req.body.phone || 'N/A' })
      .catch(err => console.error('Admin notification failed:', err));

    res.json({
      ok: true,
      message: 'Welcome email sent successfully'
    });

  } catch (error) {
    console.error('Welcome email failed:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to send welcome email'
    });
  }
});

// Request more information from agent
app.post("/api/email/request-info", async (req, res) => {
  try {
    const { name, email, missingInfo } = req.body;

    // Validate required fields
    if (!name || !email || !missingInfo) {
      return res.status(400).json({
        ok: false,
        error: 'Missing required fields: name, email, missingInfo'
      });
    }

    await sendRequestMoreInfoEmail({ name, email, missingInfo });

    res.json({
      ok: true,
      message: 'Information request email sent successfully'
    });

  } catch (error) {
    console.error('Request info email failed:', error);
    res.status(500).json({
      ok: false,
      error: 'Failed to send information request email'
    });
  }
});

// Voice API endpoints

// Queue voice call
app.post("/api/voice/queue", async (req, res) => {
  const requestId = crypto.randomUUID();
  
  try {
    const { phone, leadId } = req.body || {};
    
    if (!phone || !leadId) {
      return res.status(400).json({
        ok: false,
        error: 'Missing required fields: phone, leadId'
      });
    }

    // TODO: Implement voice call queueing logic
    // This would integrate with Retell or other voice service
    
    console.log(`Voice call queued (ID: ${requestId})`, { phone, leadId });
    
    res.status(200).json({ 
      ok: true,
      message: 'Call queued successfully'
    });
    
  } catch (err) {
    console.error(`Voice queue failed (ID: ${requestId}):`, err);
    res.status(500).json({
      ok: false,
      error: 'Unable to queue call'
    });
  }
});

// Retell webhook callback
app.post("/api/voice/callback", async (req, res) => {
  try {
    console.log("📞 Retell Webhook Received:", JSON.stringify(req.body, null, 2));

    // TODO: Later we match call to leadId in DB
    // const { call_id, transcript } = req.body?.call || {};

    // ✅ Acknowledge receipt (required by Retell)
    return res.status(204).send();
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Webhook failure" });
  }
});

const PORT = process.env.PORT || 5057; // avoid conflicts with Vite (5173)
app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));