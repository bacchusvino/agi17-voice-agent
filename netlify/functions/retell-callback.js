export const handler = async (event) => {
  console.log('Webhook received:', event.body);

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    console.log('Call data:', data);

    // For now, just log and return success
    // We'll connect to Supabase in the next step
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Webhook received',
        call_id: data.call_id,
      }),
    };
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
