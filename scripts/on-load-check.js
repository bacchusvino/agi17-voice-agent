#!/usr/bin/env node

/**
 * AIG-17 On-Load Health Check System
 * Validates: Repo → Notion → Drive → ClickUp → Netlify
 * Returns 5-bullet summary on each run
 * 
 * Run with: npm run check
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const CHECK_RESULTS = {
  repo: null,
  notion: null,
  drive: null,
  clickup: null,
  netlify: null,
};

// ===== 1. REPO CHECK =====
async function checkRepo() {
  try {
    // Check critical files exist
    const requiredFiles = [
      'package.json',
      'server.js',
      'index.html',
      '.env',
      'utils/sheets.js',
      'utils/email.js',
    ];

    const missing = [];
    for (const file of requiredFiles) {
      const filePath = path.join(rootDir, file);
      if (!fs.existsSync(filePath)) {
        missing.push(file);
      }
    }

    if (missing.length > 0) {
      return {
        status: 'WARN',
        message: `Missing files: ${missing.join(', ')}`,
        details: { missing },
      };
    }

    // Check .env has required vars
    const envPath = path.join(rootDir, '.env');
    if (!fs.existsSync(envPath)) {
      return {
        status: 'WARN',
        message: '.env not found - copy from .env.example and fill in credentials',
      };
    }

    const envContent = fs.readFileSync(envPath, 'utf-8');
    const requiredEnvVars = [
      'SUPABASE_URL',
      'SUPABASE_ANON_KEY',
    ];

    const missingEnvVars = requiredEnvVars.filter(
      (v) => !envContent.includes(v) || envContent.includes(`${v}=REPLACE`)
    );

    if (missingEnvVars.length > 0) {
      return {
        status: 'WARN',
        message: `Incomplete .env: ${missingEnvVars.join(', ')}`,
        details: { missingEnvVars },
      };
    }

    // Check package.json scripts
    const pkgPath = path.join(rootDir, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

    if (!pkg.scripts || !pkg.scripts.dev || !pkg.scripts.api) {
      return {
        status: 'WARN',
        message: 'Missing scripts: dev or api',
      };
    }

    return {
      status: 'OK',
      message: 'Repo structure valid',
      details: {
        mainFiles: requiredFiles.length,
        envVars: requiredEnvVars.length,
        scripts: Object.keys(pkg.scripts).length,
      },
    };
  } catch (error) {
    return {
      status: 'ERROR',
      message: `Repo check failed: ${error.message}`,
      error: error.message,
    };
  }
}

// ===== 2. NOTION CHECK =====
async function checkNotion() {
  try {
    const notionToken = process.env.NOTION_API_KEY;
    const notionDbId = process.env.NOTION_DATABASE_ID;

    if (!notionToken || !notionDbId) {
      return {
        status: 'SKIP',
        message: 'Notion integration not configured',
      };
    }

    const response = await fetch(
      `https://api.notion.com/v1/databases/${notionDbId}`,
      {
        headers: {
          'Authorization': `Bearer ${notionToken}`,
          'Notion-Version': '2022-06-28',
        },
      }
    );

    if (!response.ok) {
      return {
        status: 'ERROR',
        message: `Notion API error: ${response.status}`,
        httpStatus: response.status,
      };
    }

    const data = await response.json();
    return {
      status: 'OK',
      message: 'Connected to Notion database',
      details: {
        title: data.title?.[0]?.plain_text || 'Unknown',
        properties: Object.keys(data.properties || {}).length,
      },
    };
  } catch (error) {
    return {
      status: 'ERROR',
      message: `Notion check failed: ${error.message}`,
      error: error.message,
    };
  }
}

// ===== 3. GOOGLE DRIVE CHECK =====
async function checkDrive() {
  try {
    const sheetsId = process.env.SHEETS_ID;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

    if (!sheetsId || !clientEmail) {
      return {
        status: 'SKIP',
        message: 'Google Drive/Sheets not configured',
      };
    }

    // Check if Google credentials are available
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (!privateKey) {
      return {
        status: 'WARN',
        message: 'Google credentials incomplete (missing GOOGLE_PRIVATE_KEY)',
      };
    }

    return {
      status: 'OK',
      message: 'Google Sheets configured',
      details: {
        sheetsId: sheetsId.substring(0, 12) + '...',
        clientEmail,
      },
    };
  } catch (error) {
    return {
      status: 'ERROR',
      message: `Drive check failed: ${error.message}`,
      error: error.message,
    };
  }
}

// ===== 4. CLICKUP CHECK =====
async function checkClickUp() {
  try {
    const clickupToken = process.env.CLICKUP_API_KEY;

    if (!clickupToken) {
      return {
        status: 'SKIP',
        message: 'ClickUp integration not configured',
      };
    }

    const response = await fetch('https://api.clickup.com/api/v2/team', {
      headers: { Authorization: clickupToken },
    });

    if (!response.ok) {
      return {
        status: 'ERROR',
        message: `ClickUp API error: ${response.status}`,
        httpStatus: response.status,
      };
    }

    const data = await response.json();
    return {
      status: 'OK',
      message: 'Connected to ClickUp',
      details: {
        teams: data.teams?.length || 0,
      },
    };
  } catch (error) {
    return {
      status: 'ERROR',
      message: `ClickUp check failed: ${error.message}`,
      error: error.message,
    };
  }
}

// ===== 5. NETLIFY CHECK =====
async function checkNetlify() {
  try {
    const netlifyToken = process.env.NETLIFY_AUTH_TOKEN;
    const netlifyId = process.env.NETLIFY_SITE_ID;

    if (!netlifyToken || !netlifyId) {
      return {
        status: 'SKIP',
        message: 'Netlify integration not configured',
      };
    }

    const response = await fetch(
      `https://api.netlify.com/api/v1/sites/${netlifyId}`,
      {
        headers: { Authorization: `Bearer ${netlifyToken}` },
      }
    );

    if (!response.ok) {
      return {
        status: 'ERROR',
        message: `Netlify API error: ${response.status}`,
        httpStatus: response.status,
      };
    }

    const data = await response.json();
    return {
      status: 'OK',
      message: 'Connected to Netlify',
      details: {
        siteName: data.name,
        url: data.url,
        deployState: data.published_deploy?.state || 'unknown',
      },
    };
  } catch (error) {
    return {
      status: 'ERROR',
      message: `Netlify check failed: ${error.message}`,
      error: error.message,
    };
  }
}

// ===== FORMAT & OUTPUT =====
function formatCheckResults() {
  const timestamp = new Date().toISOString();
  const bullets = [];

  // Get status counts
  const statuses = Object.values(CHECK_RESULTS).reduce((acc, r) => {
    if (!r) return acc;
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  // Bullet 1: Overall status
  const okCount = statuses.OK || 0;
  const totalConfigured = okCount + (statuses.WARN || 0) + (statuses.ERROR || 0);
  const configured = Object.entries(CHECK_RESULTS)
    .filter(([_, r]) => r?.status === 'OK')
    .map(([k]) => k.toUpperCase())
    .join(', ');

  bullets.push(
    `✅ ${okCount}/${totalConfigured} systems ready${configured ? ': ' + configured : ''}`
  );

  // Bullet 2: Repo status
  if (CHECK_RESULTS.repo?.status === 'OK') {
    bullets.push(`✅ REPO: Structure valid (${CHECK_RESULTS.repo?.details?.scripts} scripts)`);
  } else if (CHECK_RESULTS.repo?.status === 'WARN') {
    bullets.push(`⚠️  REPO: ${CHECK_RESULTS.repo?.message}`);
  } else {
    bullets.push(`❌ REPO: ${CHECK_RESULTS.repo?.message || 'Check failed'}`);
  }

  // Bullet 3: Data integrations
  const dataIntegrations = ['notion', 'drive', 'clickup'];
  const dataOk = dataIntegrations.filter((k) => CHECK_RESULTS[k]?.status === 'OK');
  if (dataOk.length > 0) {
    bullets.push(`✅ DATA: ${dataOk.map((k) => k.toUpperCase()).join(', ')}`);
  } else {
    bullets.push(`ℹ️  DATA: Integrations not yet configured`);
  }

  // Bullet 4: Deploy integration
  if (CHECK_RESULTS.netlify?.status === 'OK') {
    bullets.push(`✅ DEPLOY: Netlify live (${CHECK_RESULTS.netlify?.details?.siteName})`);
  } else {
    bullets.push(`ℹ️  DEPLOY: ${CHECK_RESULTS.netlify?.message || 'Not configured'}`);
  }

  // Bullet 5: Next action
  const errors = Object.entries(CHECK_RESULTS)
    .filter(([_, r]) => r?.status === 'ERROR')
    .map(([k]) => k.toUpperCase());

  if (errors.length > 0) {
    bullets.push(`🔴 ACTION: Fix ${errors.join(', ')} before deploy`);
  } else if (Object.values(CHECK_RESULTS).some(r => r?.status === 'WARN')) {
    bullets.push(`🟡 ACTION: Complete .env configuration`);
  } else {
    bullets.push(`🟢 READY: All systems operational`);
  }

  console.log('\n' + '='.repeat(70));
  console.log(`  AIG-17 SYSTEM STATUS CHECK - ${timestamp}`);
  console.log('='.repeat(70) + '\n');

  bullets.forEach((bullet, i) => {
    console.log(`  ${i + 1}. ${bullet}`);
  });

  console.log('\n' + '='.repeat(70) + '\n');

  return {
    timestamp,
    bullets,
    detailed: CHECK_RESULTS,
  };
}

// ===== MAIN =====
async function main() {
  console.log('🔍 Running AIG-17 on-load checks...\n');

  CHECK_RESULTS.repo = await checkRepo();
  CHECK_RESULTS.notion = await checkNotion();
  CHECK_RESULTS.drive = await checkDrive();
  CHECK_RESULTS.clickup = await checkClickUp();
  CHECK_RESULTS.netlify = await checkNetlify();

  const summary = formatCheckResults();

  // Save last check to file
  const logsDir = path.join(rootDir, 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  const logFile = path.join(logsDir, `check-${Date.now()}.json`);
  fs.writeFileSync(logFile, JSON.stringify(summary, null, 2));
  console.log(`📝 Check saved to: logs/check-${Date.now()}.json\n`);

  // Return exit code based on severity
  const hasErrors = Object.values(CHECK_RESULTS).some((r) => r?.status === 'ERROR');
  process.exit(hasErrors ? 1 : 0);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
