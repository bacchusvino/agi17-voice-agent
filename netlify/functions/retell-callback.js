// Netlify function to handle RetilAI webhook callbacks
// Updates lead qualification status based on call analysis
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  console.log('RetilAI webhook received');

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const callData = JSON.parse(event.body);
    console.log('RetilAI call data:', JSON.stringify(callData, null, 2));

    // Initialize Supabase client (use service role key for server-side operations)
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Extract metadata
    const leadId = callData.metadata?.leadId;
    const callId = callData.call_id;
    const callStatus = callData.call_status; // completed, failed, no_answer, etc.

    if (!leadId) {
      console.error('No leadId in webhook metadata');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No leadId in metadata' }),
      };
    }

    // Determine qualification based on RetilAI analysis
    let qualificationStatus = 'contacted'; // Default: call was made
    let qualificationNotes = `AI call completed: ${callStatus}`;
    let isQualified = false;

    // Parse RetilAI transcript or analysis (structure depends on RetilAI response)
    if (callData.call_analysis) {
      const analysis = callData.call_analysis;
      
      // Check if RetilAI determined the lead is qualified
      // Adapt these checks based on actual RetilAI response structure
      if (analysis.qualified === true || analysis.qualification_score >= 0.7) {
        qualificationStatus = 'qualified';
        isQualified = true;
        qualificationNotes = `✓ AI Qualified - Score: ${analysis.qualification_score || 'N/A'}`;
      }
      
      if (analysis.not_interested === true) {
        qualificationStatus = 'not_interested';
        qualificationNotes = `✗ Prospect not interested (AI assessment)`;
      }

      // Include any additional analysis
      if (analysis.notes) {
        qualificationNotes += ` | ${analysis.notes}`;
      }
    }

    // Update lead in Supabase
    const { data, error } = await supabase
      .from('leads')
      .update({
        status: qualificationStatus,
        is_qualified: isQualified,
        notes: qualificationNotes,
        last_call_id: callId,
        last_call_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', leadId)
      .select();

    if (error) {
      console.error('Supabase update error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Database update failed', details: error.message }),
      };
    }

    console.log(`Lead ${leadId} updated: ${qualificationStatus}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Lead qualification updated',
        leadId: leadId,
        callId: callId,
        status: qualificationStatus,
        data: data
      }),
    };

  } catch (err) {
    console.error('Webhook error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
