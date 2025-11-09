// Run Supabase migration to add address column
const https = require('https');

const SUPABASE_URL = 'https://tyrwkeqavitwkffjcznj.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable not set');
  console.log('\nPlease run this script with:');
  console.log('SUPABASE_SERVICE_ROLE_KEY=your_service_role_key node run-migration.js');
  process.exit(1);
}

const migration = `ALTER TABLE leads ADD COLUMN IF NOT EXISTS address TEXT;`;

const data = JSON.stringify({ query: migration });

const options = {
  hostname: 'tyrwkeqavitwkffjcznj.supabase.co',
  port: 443,
  path: '/rest/v1/rpc/exec_sql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Length': data.length
  }
};

console.log('Attempting to add address column to leads table...\n');

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('✅ SUCCESS: Address column added to leads table');
    } else {
      console.log(`❌ ERROR: Status ${res.statusCode}`);
      console.log('Response:', responseData);
      console.log('\n⚠️  Alternative: Run this SQL in Supabase SQL Editor:');
      console.log(migration);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
  console.log('\n⚠️  Alternative: Run this SQL in Supabase SQL Editor:');
  console.log(migration);
  console.log('\nOr visit: https://supabase.com/dashboard/project/tyrwkeqavitwkffjcznj/sql/new');
});

req.write(data);
req.end();
