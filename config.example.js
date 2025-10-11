// Configuration file for AGI17 Voice Agent
// Copy this to config.js and update with your actual values

export const config = {
  // Supabase Configuration
  supabase: {
    url: process.env.SUPABASE_URL || 'https://your-project-ref.supabase.co',
    anonKey: process.env.SUPABASE_ANON_KEY || 'your-anon-key',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key'
  },

  // Voice Agent Configuration
  voiceAgent: {
    enabled: process.env.VOICE_AGENT_ENABLED === 'true' || true,
    language: process.env.VOICE_AGENT_LANGUAGE || 'en-US',
    continuous: false,
    interimResults: false
  },

  // Application Settings
  app: {
    name: 'QualiFy',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000
  },

  // Lead Management
  leads: {
    defaultSource: 'landing_page',
    defaultStatus: 'new',
    autoFollowUp: true,
    followUpDelay: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  }
};

export default config;
