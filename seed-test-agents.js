#!/usr/bin/env node
/**
 * Seed test agent accounts in Supabase for demo purposes
 * Usage: node seed-test-agents.js
 * 
 * Creates test agents with credentials that can be used immediately
 */

import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Load from environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('CRITICAL: Missing required environment variables: SUPABASE_URL and/or SUPABASE_ANON_KEY');
  console.error('Please set these in your .env file');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Test agent data
const testAgents = [
  {
    name: 'Sarah Johnson',
    email: 'sarah@demo.qualify.local',
    password: 'DemoPass123!',
    agency: 'Coastal Realty SD',
    phone: '619-555-0101',
  },
  {
    name: 'Michael Chen',
    email: 'michael@demo.qualify.local',
    password: 'DemoPass456!',
    agency: 'Urban Properties',
    phone: '619-555-0102',
  },
  {
    name: 'Jessica Martinez',
    email: 'jessica@demo.qualify.local',
    password: 'DemoPass789!',
    agency: 'Beachfront Homes',
    phone: '619-555-0103',
  },
];

async function seedAgents() {
  console.log('🚀 Starting test agent seed...\n');

  for (const agent of testAgents) {
    try {
      console.log(`Creating agent: ${agent.name}`);

      // Sign up the agent
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: agent.email,
        password: agent.password,
        options: {
          data: {
            name: agent.name,
            agency: agent.agency,
            phone: agent.phone,
          },
        },
      });

      if (authError) {
        // If user already exists, that's okay for demo purposes
        if (authError.message.includes('already registered')) {
          console.log(`  ⚠️  User already exists (skipping): ${agent.email}`);
          continue;
        }
        throw authError;
      }

      if (!authData.user) {
        console.log(`  ❌ No user returned for ${agent.email}`);
        continue;
      }

      // Generate secure API key
      const apiKey = generateSecureApiKey();

      // Create agent profile in agents table
      const { data: profileData, error: profileError } = await supabase
        .from('agents')
        .insert([
          {
            id: authData.user.id,
            name: agent.name,
            email: agent.email,
            agency: agent.agency,
            phone: agent.phone,
            api_key: apiKey,
            status: 'active',
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (profileError) throw profileError;

      console.log(`  ✅ Agent created successfully`);
      console.log(`     Email: ${agent.email}`);
      console.log(`     Password: ${agent.password}`);
      console.log(`     API Key: ${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 8)}`);
      console.log(`\n`);

    } catch (error) {
      console.error(`  ❌ Error creating ${agent.name}:`, error.message);
    }
  }

  console.log('✨ Seed complete!\n');
  console.log('Test agents ready for demo:');
  testAgents.forEach(agent => {
    console.log(`  • ${agent.email} / ${agent.password}`);
  });
}

function generateSecureApiKey() {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr, x => x.toString(16).padStart(2, '0')).join('');
}

seedAgents().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
