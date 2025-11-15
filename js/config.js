/**
 * QualiFy Configuration
 *
 * This file centralizes configuration for the application.
 * Environment variables can be injected at build time via Netlify.
 *
 * To override in production:
 * 1. Set SUPABASE_URL and SUPABASE_ANON_KEY in Netlify environment variables
 * 2. Use Netlify's snippet injection or build plugin to inject values
 *
 * Note: SUPABASE_ANON_KEY is safe to expose in frontend code (it's the public anon key).
 * Never expose SUPABASE_SERVICE_ROLE_KEY in frontend code.
 */

(function(window) {
  'use strict';

  // Configuration object
  window.QualifyConfig = {
    // Supabase configuration
    // Can be overridden via window._env_ for Netlify deployments
    supabase: {
      url: window._env_?.SUPABASE_URL || 'https://tyrwkeqavitwkffjcznj.supabase.co',
      anonKey: window._env_?.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4'
    },

    // Application settings
    app: {
      name: 'QualiFy',
      redirectDelay: 3000 // milliseconds to show success before redirect
    }
  };

  // Freeze config to prevent modification
  Object.freeze(window.QualifyConfig);
  Object.freeze(window.QualifyConfig.supabase);
  Object.freeze(window.QualifyConfig.app);

})(window);
