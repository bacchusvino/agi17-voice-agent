// Insert 5 sample FSBO call records with leads for testing
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL || 'https://tyrwkeqavitwkffjcznj.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_AVrztDecuuKBPmLmYg2nrQ_w58YX9rK'

const supabase = createClient(supabaseUrl, supabaseKey)

// Sample FSBO leads
const sampleLeads = [
  {
    name: 'Jennifer Martinez',
    email: 'jennifer.m@email.com',
    phone: '+1-619-555-0142',
    source: 'craigslist',
    status: 'contacted',
    property_address: '1234 Ocean View Dr, La Jolla, CA 92037',
    property_type: 'Single Family Home',
    bedrooms: 3,
    bathrooms: 2,
    square_feet: 2100,
    asking_price: 875000,
    notes: 'FSBO listing, 3BR home in La Jolla. Motivated seller.'
  },
  {
    name: 'David Chen',
    email: 'dchen@email.com',
    phone: '+1-858-555-0298',
    source: 'craigslist',
    status: 'contacted',
    property_address: '567 Pacific Beach Blvd, San Diego, CA 92109',
    property_type: 'Condo',
    bedrooms: 2,
    bathrooms: 2,
    square_feet: 1400,
    asking_price: 650000,
    notes: 'FSBO condo with ocean view. Not urgent.'
  },
  {
    name: 'Sarah & Mike Johnson',
    email: 'johnson.family@email.com',
    phone: '+1-619-555-0376',
    source: 'craigslist',
    status: 'hot',
    property_address: '890 Carlsbad Way, Carlsbad, CA 92008',
    property_type: 'Single Family Home',
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2800,
    asking_price: 1200000,
    notes: 'URGENT: Relocating to Austin in 3 weeks. Highly motivated!'
  },
  {
    name: 'Robert Williams',
    email: 'rob.williams@email.com',
    phone: '+1-760-555-0451',
    source: 'craigslist',
    status: 'new',
    property_address: '234 Encinitas Rd, Encinitas, CA 92024',
    property_type: 'Single Family Home',
    bedrooms: 5,
    bathrooms: 4,
    square_feet: 3500,
    asking_price: 1450000,
    notes: 'Downsizing, no rush. Long-term timeline.'
  },
  {
    name: 'Amanda & Chris Taylor',
    email: 'taylor.couple@email.com',
    phone: '+1-858-555-0587',
    source: 'craigslist',
    status: 'qualified',
    property_address: '456 Del Mar Heights Rd, Del Mar, CA 92014',
    property_type: 'Townhouse',
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 1850,
    asking_price: 725000,
    notes: 'Engaged couple, first-time sellers. Need quick sale for down payment.'
  }
]

async function insertSampleData() {
  console.log('🎯 Inserting sample FSBO leads and call records...\n')

  try {
    // First, insert the leads
    console.log('📝 Creating 5 FSBO leads...')
    const { data: leadsData, error: leadsError } = await supabase
      .from('leads')
      .insert(sampleLeads)
      .select()

    if (leadsError) {
      console.error('❌ Error inserting leads:', leadsError)
      throw leadsError
    }

    console.log('✅ Successfully created', leadsData.length, 'leads\n')

    // Now create calls linked to these leads
    const sampleCalls = [
      {
        lead_id: leadsData[0].id,
        call_id: 'call_fsbo_001_' + Date.now(),
        phone_number: leadsData[0].phone,
        transcript: `Agent: Hi, I'm calling about your property listing on Craigslist. Is this still available?
Caller: Yes, we're selling our 3-bedroom home in La Jolla. We just listed it last week.
Agent: Great! What's your timeline for selling?
Caller: We'd like to close within 60 days. We already bought our next home.
Agent: And are you flexible on the price?
Caller: Well, we listed at $875k but we're open to reasonable offers. We just want a quick sale.
Agent: Perfect. I'd love to schedule a showing. Are you working with any agents?
Caller: No, we're doing FSBO to save on commission. But we're open to the right partnership.`,
        summary: 'Motivated FSBO seller in La Jolla, 3BR home, needs quick sale within 60 days. Price flexible, not currently working with agents. Excellent lead.',
        qualification_score: 92,
        qualified: true,
        call_status: 'completed',
        started_at: new Date(Date.now() - 3600000).toISOString(),
        ended_at: new Date(Date.now() - 3300000).toISOString(),
        duration_seconds: 300,
        hot_lead_indicators: {
          ready_to_sell: true,
          timeline: '60 days',
          flexible_price: true,
          motivated: true,
          no_agent: true
        },
        sentiment_analysis: {
          overall: 'positive',
          confidence: 0.89
        },
        source: 'manual'
      },
      {
        lead_id: leadsData[1].id,
        call_id: 'call_fsbo_002_' + Date.now(),
        phone_number: leadsData[1].phone,
        transcript: `Agent: Hi, I saw your FSBO listing for the condo in Pacific Beach.
Caller: Yes, it's a 2-bedroom, 2-bath condo, ocean view.
Agent: Beautiful! When are you looking to sell?
Caller: No rush really, just testing the market. If we get our price we'll sell.
Agent: What price are you targeting?
Caller: We want $650k, firm. It's worth every penny with that view.
Agent: Have you had any showings yet?
Caller: A few, but no serious offers. We're picky about who we sell to.`,
        summary: 'Pacific Beach condo FSBO, 2BR/2BA ocean view. Not motivated - testing market only. Price firm at $650k. Lower priority lead.',
        qualification_score: 68,
        qualified: true,
        call_status: 'completed',
        started_at: new Date(Date.now() - 7200000).toISOString(),
        ended_at: new Date(Date.now() - 6900000).toISOString(),
        duration_seconds: 180,
        hot_lead_indicators: {
          ready_to_sell: false,
          timeline: 'flexible',
          flexible_price: false,
          motivated: false,
          no_agent: true
        },
        sentiment_analysis: {
          overall: 'neutral',
          confidence: 0.72
        },
        source: 'manual'
      },
      {
        lead_id: leadsData[2].id,
        call_id: 'call_fsbo_003_' + Date.now(),
        phone_number: leadsData[2].phone,
        transcript: `Agent: Hello! I'm calling about your 4-bedroom home in Carlsbad.
Caller: Oh yes! We really need to sell this month. My husband got transferred to Austin.
Agent: I understand. When do you need to relocate?
Caller: We leave in 3 weeks. We're desperate to close before then or we'll have to rent it out.
Agent: What's your asking price?
Caller: We listed at $1.2M but honestly, we'll take any reasonable offer at this point.
Agent: Are you open to working with a real estate agent to expedite this?
Caller: Absolutely! We tried FSBO but we're not getting enough traffic. We need professional help.`,
        summary: 'URGENT: Carlsbad 4BR home, owner relocating to Austin in 3 weeks. Highly motivated, price very flexible, actively seeking agent partnership. Top priority lead.',
        qualification_score: 95,
        qualified: true,
        call_status: 'completed',
        started_at: new Date(Date.now() - 10800000).toISOString(),
        ended_at: new Date(Date.now() - 10500000).toISOString(),
        duration_seconds: 420,
        hot_lead_indicators: {
          ready_to_sell: true,
          timeline: '3 weeks',
          flexible_price: true,
          motivated: true,
          no_agent: true,
          urgent: true,
          relocation: true
        },
        sentiment_analysis: {
          overall: 'positive',
          confidence: 0.94
        },
        source: 'manual'
      },
      {
        lead_id: leadsData[3].id,
        call_id: 'call_fsbo_004_' + Date.now(),
        phone_number: leadsData[3].phone,
        transcript: `Agent: Hi, I'm following up on your Encinitas property listing.
Caller: Yeah, we have a 5-bedroom house for sale.
Agent: Great property! What's driving your decision to sell?
Caller: Just downsizing. Kids are grown, don't need all this space.
Agent: When are you hoping to move?
Caller: Sometime next year probably. Maybe spring.
Agent: Are you flexible on pricing?
Caller: Not really. We know what it's worth. We'll wait for the right buyer.`,
        summary: 'Encinitas 5BR home, downsizing but no urgency. Timeline is 6+ months away. Price not flexible. Low priority - long-term nurture opportunity.',
        qualification_score: 61,
        qualified: false,
        call_status: 'completed',
        started_at: new Date(Date.now() - 14400000).toISOString(),
        ended_at: new Date(Date.now() - 14220000).toISOString(),
        duration_seconds: 120,
        hot_lead_indicators: {
          ready_to_sell: false,
          timeline: '6+ months',
          flexible_price: false,
          motivated: false,
          no_agent: true
        },
        sentiment_analysis: {
          overall: 'neutral',
          confidence: 0.65
        },
        source: 'manual'
      },
      {
        lead_id: leadsData[4].id,
        call_id: 'call_fsbo_005_' + Date.now(),
        phone_number: leadsData[4].phone,
        transcript: `Agent: Good afternoon! I'm calling regarding your Del Mar townhouse.
Caller: Yes! We're so excited to sell. Just got engaged and buying our dream home together!
Agent: Congratulations! When is your target close date?
Caller: We need to close in 45 days to get our down payment for the new place.
Agent: And how flexible are you on the $725k asking price?
Caller: We could come down to $700k for a quick, clean offer. We already found a buyer for the new place.
Agent: Perfect. Would you be open to professional representation?
Caller: Yes, we're first-time sellers and a bit overwhelmed. We'd love some help!`,
        summary: 'Del Mar townhouse, engaged couple upgrading. Need to close in 45 days for down payment. Price flexible ($725k down to $700k). Seeking agent help. Strong lead.',
        qualification_score: 88,
        qualified: true,
        call_status: 'completed',
        started_at: new Date(Date.now() - 1800000).toISOString(),
        ended_at: new Date(Date.now() - 1500000).toISOString(),
        duration_seconds: 240,
        hot_lead_indicators: {
          ready_to_sell: true,
          timeline: '45 days',
          flexible_price: true,
          motivated: true,
          no_agent: true,
          first_time_seller: true
        },
        sentiment_analysis: {
          overall: 'very positive',
          confidence: 0.91
        },
        source: 'manual'
      }
    ]

    console.log('📞 Creating 5 call records...')
    const { data: callsData, error: callsError } = await supabase
      .from('calls')
      .insert(sampleCalls)
      .select()

    if (callsError) {
      console.error('❌ Error inserting calls:', callsError)
      throw callsError
    }

    console.log('✅ Successfully inserted', callsData.length, 'call records:\n')

    callsData.forEach((call, index) => {
      console.log(`${index + 1}. ${call.phone_number}`)
      console.log(`   Call ID: ${call.call_id}`)
      console.log(`   Score: ${call.qualification_score}`)
      console.log(`   Qualified: ${call.qualified ? 'YES' : 'NO'}`)
      console.log(`   Status: ${call.call_status}`)
      console.log(`   Duration: ${call.duration_seconds}s`)
      console.log('')
    })

    // Verify counts
    const { count: leadsCount } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })

    const { count: callsCount } = await supabase
      .from('calls')
      .select('*', { count: 'exact', head: true })

    console.log(`\n📊 Database totals:`)
    console.log(`   Leads: ${leadsCount}`)
    console.log(`   Calls: ${callsCount}`)
    console.log('\n✨ Sample data inserted successfully!')

  } catch (error) {
    console.error('Failed to insert sample data:', error)
    process.exit(1)
  }
}

insertSampleData()
