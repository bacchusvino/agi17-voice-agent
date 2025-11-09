// Check actual calls table schema
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL || 'https://tyrwkeqavitwkffjcznj.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_AVrztDecuuKBPmLmYg2nrQ_w58YX9rK'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkCallsSchema() {
  // Check if there are any existing calls
  const { data, error } = await supabase
    .from('calls')
    .select('*')
    .limit(1)

  if (error && error.code !== 'PGRST116') {
    console.error('Error:', error)
    return
  }

  if (data && data.length > 0) {
    console.log('Sample call structure:', Object.keys(data[0]))
  } else {
    console.log('No calls found. Trying to insert a minimal record to discover schema...')

    // Try with minimal fields
    const testCall = {
      lead_id: '8a565138-8227-49bb-bab6-df89eeef5955', // Use existing lead ID
      call_id: 'test_' + Date.now(),
      phone: '+1-555-TEST',
      callstatus: 'completed',
      source: 'manual'
    }

    const { data: insertData, error: insertError } = await supabase
      .from('calls')
      .insert([testCall])
      .select()

    if (insertError) {
      console.log('Insert error:', insertError.message)
      console.log('Details:', insertError.details)
    } else {
      console.log('✅ Success! Call structure:', Object.keys(insertData[0]))
      // Clean up
      await supabase.from('calls').delete().eq('call_id', testCall.call_id)
    }
  }
}

checkCallsSchema()
