// Environment-based configuration for QualiFy
// This file centralizes Supabase credentials and app settings

// Detect environment based on hostname
const ENV = window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1' 
            ? 'development' 
            : 'production';

// Configuration object
const CONFIG = {
  development: {
    SUPABASE_URL: 'https://tyrwkeqavitwkffjcznj.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4'
  },
  production: {
    SUPABASE_URL: 'https://tyrwkeqavitwkffjcznj.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4'
  }
};

// App configuration
const APP_CONFIG = {
  name: 'QualiFy',
  version: '1.0.0',
  environment: ENV,
  
  // Lead management defaults
  leads: {
    defaultSource: 'landing_page',
    defaultStatus: 'new'
  },
  
  // Voice capture settings
  voice: {
    language: 'en-US',
    continuous: false,
    interimResults: false,
    maxAlternatives: 1
  }
};

// Export current environment config
export default CONFIG[ENV];
export { APP_CONFIG };
