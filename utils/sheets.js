import { google } from "googleapis";

// Validate required environment variables at startup
function validateEnvVars() {
  const required = ['GOOGLE_CLIENT_EMAIL', 'GOOGLE_PRIVATE_KEY', 'SHEETS_ID'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Initialize with defensive checks
let auth, sheets;

try {
  validateEnvVars();
  
  auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    ["https://www.googleapis.com/auth/spreadsheets"]
  );
  sheets = google.sheets({ version: "v4", auth });
} catch (error) {
  console.error('Failed to initialize Google Sheets client:', error.message);
  throw error;
}

export async function appendLeadRow(values, retryCount = 0) {
  const maxRetries = 3;
  const timeout = 5000; // 5 seconds

  // Validate input
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error('Values must be a non-empty array');
  }

  // Sanitize values to prevent CSV injection (do this once at the top level)
  const sanitizedValues = values.map(value => {
    if (typeof value === 'string') {
      // Remove ALL leading characters that could be formulas
      return value.replace(/^[=+\-@]+/, '');
    }
    return value;
  });

  try {
    // Create timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    );

    // Create request promise
    const requestPromise = sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEETS_ID,
      range: "A1",
      valueInputOption: "RAW",
      requestBody: { values: [sanitizedValues] },
    });

    // Race between request and timeout
    await Promise.race([requestPromise, timeoutPromise]);

    console.log('Successfully appended lead to Google Sheets');

  } catch (error) {
    console.error(`Google Sheets append failed (attempt ${retryCount + 1}):`, {
      error: error.message,
      retryCount,
      hasAuth: !!auth,
      hasSheets: !!sheets
    });

    // Exponential backoff retry
    if (retryCount < maxRetries) {
      const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
      console.log(`Retrying in ${delay}ms...`);

      await new Promise(resolve => setTimeout(resolve, delay));
      // Pass sanitized values directly (already sanitized above)
      return appendLeadRow(sanitizedValues, retryCount + 1);
    }

    throw new Error(`Failed to append lead after ${maxRetries} attempts: ${error.message}`);
  }
}
