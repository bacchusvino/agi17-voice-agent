// Secure configuration for QualiFy application
// DO NOT commit real credentials to git

const CONFIG = {
  supabase: {
    // Use environment variables in production
    url: process?.env?.SUPABASE_URL || 'https://tyrwkeqavitwkffjcznj.supabase.co',
    anonKey: process?.env?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4'
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

