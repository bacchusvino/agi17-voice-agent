// Check actual table schema in database
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL || 'https://tyrwkeqavitwkffjcznj.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_AVrztDecuuKBPmLmYg2nrQ_w58YX9rK'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSchema() {
  console.log('🔍 Checking database schema...\n')

  // Check if calls table allows null lead_id by trying to insert a minimal record
  try {
    console.log('Testing calls table schema...')
    const testCall = {
      call_id: 'test_' + Date.now(),
      phone_number: '+1-555-TEST',
      call_status: 'completed',
      source: 'manual'
    }

    const { data, error } = await supabase
      .from('calls')
      .insert([testCall])
      .select()

    if (error) {
      console.log('❌ Cannot insert call without lead_id:', error.message)
      console.log('\nLead_id is required. Checking leads table...\n')

      // Check leads table structure
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .limit(1)

      if (leadsError) {
        console.log('Error querying leads:', leadsError)
      } else {
        if (leadsData && leadsData.length > 0) {
          console.log('Sample lead structure:', Object.keys(leadsData[0]))
          console.log('Lead ID type:', typeof leadsData[0].id)
        } else {
          console.log('No leads found in database')
        }
      }
    } else {
      console.log('✅ Successfully inserted test call:', data[0].id)
      // Clean up
      await supabase.from('calls').delete().eq('call_id', testCall.call_id)
      console.log('Test record cleaned up')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

checkSchema()
