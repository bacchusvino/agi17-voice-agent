// Insert 5 sample FSBO call records using existing leads
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL || 'https://tyrwkeqavitwkffjcznj.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_AVrztDecuuKBPmLmYg2nrQ_w58YX9rK'

const supabase = createClient(supabaseUrl, supabaseKey)

async function insertSampleCalls() {
  console.log('🎯 Inserting 5 sample FSBO call records...\n')

  try {
    // Get 5 existing leads from San Diego area
    console.log('📋 Fetching existing San Diego leads...')
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .ilike('location', '%san diego%')
      .limit(5)

    if (leadsError) throw leadsError

    if (!leads || leads.length < 5) {
      // Get any 5 leads if not enough San Diego ones
      const { data: anyLeads } = await supabase
        .from('leads')
        .select('*')
        .limit(5)
      if (anyLeads && anyLeads.length > 0) {
        leads.length = 0
        leads.push(...anyLeads)
      }
    }

    console.log(`✅ Found ${leads.length} leads to use\n`)

    // Generate realistic FSBO call data
    const sampleCalls = [
      {
        lead_id: leads[0].id,
        call_id: 'call_fsbo_lajolla_' + Date.now(),
        phone: '+1-619-555-0142',
        phone_number: '+1-619-555-0142',
        callstatus: 'completed',
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
        started_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
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
        lead_id: leads[1].id,
        call_id: 'call_fsbo_pacificbeach_' + Date.now(),
        phone: '+1-858-555-0298',
        phone_number: '+1-858-555-0298',
        callstatus: 'completed',
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
        started_at: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
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
        lead_id: leads[2].id,
        call_id: 'call_fsbo_carlsbad_' + Date.now(),
        phone: '+1-619-555-0376',
        phone_number: '+1-619-555-0376',
        callstatus: 'completed',
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
        started_at: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
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
        lead_id: leads[3].id,
        call_id: 'call_fsbo_encinitas_' + Date.now(),
        phone: '+1-760-555-0451',
        phone_number: '+1-760-555-0451',
        callstatus: 'completed',
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
        started_at: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
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
        lead_id: leads[4].id,
        call_id: 'call_fsbo_delmar_' + Date.now(),
        phone: '+1-858-555-0587',
        phone_number: '+1-858-555-0587',
        callstatus: 'completed',
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
        started_at: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
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

    console.log('📞 Inserting call records...')
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
      console.log(`   Lead ID: ${call.lead_id}`)
      console.log(`   Score: ${call.qualification_score}`)
      console.log(`   Qualified: ${call.qualified ? 'YES' : 'NO'}`)
      console.log(`   Status: ${call.call_status}`)
      console.log(`   Duration: ${call.duration_seconds}s`)
      console.log('')
    })

    // Verify total count
    const { count } = await supabase
      .from('calls')
      .select('*', { count: 'exact', head: true })

    console.log(`\n📊 Total calls in database: ${count}`)
    console.log('\n✨ Sample FSBO call data inserted successfully!')

  } catch (error) {
    console.error('Failed to insert sample calls:', error)
    process.exit(1)
  }
}

insertSampleCalls()
