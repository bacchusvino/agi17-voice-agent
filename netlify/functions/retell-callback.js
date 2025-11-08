import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const handler = async (event) => {
  console.log('ReTiliai webhook received:', event.body);

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    // Validate required fields
    if (!data.call_id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing call_id' }),
      };
    }

    console.log('Inserting call data:', data.call_id);

    // Insert into Supabase calls table
    const { error } = await supabase.from('calls').insert([
      {
        call_id: data.call_id,
        phone_number: data.phone_number || null,
        call_status: data.call_status || 'completed',
        transcript: data.transcript || null,
        duration_seconds: data.duration_seconds || 0,
        qualification_score: data.qualification_score || 0,
        qualified_lead: data.qualified_lead || false,
        sentiment: data.sentiment || null,
        hot_indicators: data.hot_indicators || null,
        summary: data.summary || null,
        webhook_payload: data, // Store full payload for reference
        started_at: data.started_at || new Date().toISOString(),
        ended_at: data.ended_at || new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log('Call data inserted successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        call_id: data.call_id,
        message: 'Call data received and stored',
      }),
    };
  } catch (err) {
    console.error('Error processing webhook:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
        details: 'Failed to process ReTiliai webhook',
      }),
    };
  }
};
