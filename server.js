// server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import "dotenv/config";
import { appendLeadRow } from "./utils/sheets.js";
import {
  sendWelcomeEmail,
  sendRequestMoreInfoEmail,
  sendAdminNotification,
  verifyEmailConfig
} from "./utils/email.js";

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs (increased from 10 for demo traffic)
  message: {
    ok: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS with specific origins (update with your actual domains)
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'https://your-domain.com', // Replace with your actual domain
    'https://qualify.com', // Replace with actual production domain
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(limiter);
app.use(express.json({ limit: '10kb' })); // Limit body size

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
  
  // Phone validation (E.164 format)
  if (phone) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      errors.push('Invalid phone format');
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
  if (ownerName) req.body.ownerName = ownerName.replace(/^[=+\-@]/, '');
  if (city) req.body.city = city.replace(/^[=+\-@]/, '');
  if (notes) req.body.notes = notes.replace(/^[=+\-@]/, '');
  
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
  const requestId = Math.random().toString(36).substr(2, 9);
  
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
    console.error(`Lead processing failed (ID: ${requestId}):`, {
      error: err.message,
      stack: err.stack,
      body: req.body
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

const PORT = process.env.PORT || 5057; // avoid conflicts with Vite (5173)
app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));