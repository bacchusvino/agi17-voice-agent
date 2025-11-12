// Netlify function to trigger RetilAI voice call
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { leadId, phoneNumber } = JSON.parse(event.body);

    if (!phoneNumber) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Phone number is required' })
      };
    }

    // Get RetilAI API key from environment variable (server-side only)
    const apiKey = process.env.RETELL_API_KEY;

    if (!apiKey) {
      console.error('RETELL_API_KEY not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error: RETELL_API_KEY missing' })
      };
    }

    // Call RetilAI API to initiate voice call
    const response = await fetch('https://api.retellai.com/v2/create-phone-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from_number: process.env.RETELL_FROM_NUMBER || '+1234567890', // Your RetilAI number
        to_number: phoneNumber,
        agent_id: process.env.RETELL_AGENT_ID, // Pre-configured FSBO qualification agent
        metadata: {
          leadId: leadId,
          source: 'qualify_dashboard'
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('RetilAI API error:', errorData);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'RetilAI API error', details: errorData })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        callId: data.call_id,
        leadId: leadId,
        message: 'RetilAI voice call initiated successfully'
      })
    };

  } catch (error) {
    console.error('Error triggering RetilAI call:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
