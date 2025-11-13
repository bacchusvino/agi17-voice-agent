// Secure configuration for QualiFy application
// DO NOT commit real credentials to git

const CONFIG = {
  supabase: {
    // Use environment variables in production
    url: process?.env?.SUPABASE_URL || 'https://YOUR_PROJECT_REF.supabase.co',
    anonKey: process?.env?.SUPABASE_ANON_KEY || 'YOUR_ANON_KEY_HERE'
  },
  
  // Security settings
  security: {
    // Rate limiting
    maxRequestsPerMinute: 10,
    maxRequestsPerHour: 100,
    
    // Input validation
    maxNameLength: 100,
    maxEmailLength: 100,
    maxPhoneLength: 20,
    maxNotesLength: 500,
    
    // CORS settings
    allowedOrigins: [
      'http://localhost:8000',
      'http://localhost:3000',
      'https://yourdomain.com' // Add your production domain
    ]
  },
  
  // Feature flags
  features: {
    voiceAgent: true,
    rateLimiting: true,
    inputValidation: true,
    duplicatePrevention: true
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}

