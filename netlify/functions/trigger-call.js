// Netlify function to trigger HeyGen voice call
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

    // Get HeyGen API key from environment variable (server-side only)
    const apiKey = process.env.HEYGEN_API_KEY;

    if (!apiKey) {
      console.error('HEYGEN_API_KEY not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Call HeyGen API to initiate voice call
    const response = await fetch('https://api.heygen.com/v1/voice_agents', {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        script: "Hi, I'm calling from QualiFy about your FSBO property listing. Do you have a few minutes to talk about connecting with pre-screened agents?",
        webhook_url: `${process.env.URL || 'https://yoursite.com'}/webhook/heygen`
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('HeyGen API error:', errorData);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'HeyGen API error', details: errorData })
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
        callId: data.id,
        leadId: leadId,
        message: 'Call initiated successfully'
      })
    };

  } catch (error) {
    console.error('Error triggering call:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
