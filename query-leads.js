// Query existing leads
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL || 'https://tyrwkeqavitwkffjcznj.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_AVrztDecuuKBPmLmYg2nrQ_w58YX9rK'

const supabase = createClient(supabaseUrl, supabaseKey)

async function queryLeads() {
  const { data, error, count } = await supabase
    .from('leads')
    .select('*', { count: 'exact' })
    .limit(10)

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log(`Total leads: ${count}`)
  console.log('\nFirst 10 leads:')
  data.forEach((lead, i) => {
    console.log(`\n${i + 1}. ID: ${lead.id}`)
    console.log(`   Location: ${lead.location}`)
    console.log(`   Price: ${lead.price}`)
    console.log(`   Status: ${lead.status}`)
  })
}

queryLeads()
