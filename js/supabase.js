// Supabase configuration and utilities
import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js@2'

// Initialize Supabase client
const supabaseUrl = 'https://tyrwkeqavitw4fjfcnj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndrZXFhdml0d2tmZmpjem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA5MzcsImV4cCI6MjA3NDU2NjkzN30.XlP3j-5SQjje7nfv2jvtccQMJtlbSI22vqQtfEj7Nc4'

// For development, you can use these placeholder values
// In production, replace with your actual Supabase project URL and anon key
const supabase = createClient(supabaseUrl, supabaseKey)

// Lead management functions
export const leadService = {
  // Create a new lead
  async createLead(leadData) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          name: leadData.name,
          email: leadData.email,
          phone: leadData.phone || null,
          source: leadData.source || 'landing_page',
          status: 'new',
          notes: leadData.notes || null
        }])
        .select()

      if (error) {
        console.error('Error creating lead:', error)
        throw error
      }

      return { success: true, data: data[0] }
    } catch (error) {
      console.error('Lead creation failed:', error)
      return { success: false, error: error.message }
    }
  },

  // Get all leads (for admin dashboard)
  async getLeads() {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching leads:', error)
        throw error
      }

      return { success: true, data }
    } catch (error) {
      console.error('Lead fetch failed:', error)
      return { success: false, error: error.message }
    }
  },

  // Update lead status
  async updateLeadStatus(leadId, status, notes = null) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .update({ 
          status: status,
          notes: notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId)
        .select()

      if (error) {
        console.error('Error updating lead:', error)
        throw error
      }

      return { success: true, data: data[0] }
    } catch (error) {
      console.error('Lead update failed:', error)
      return { success: false, error: error.message }
    }
  }
}

// Voice agent functionality
export const voiceAgent = {
  // Initialize voice recognition
  initVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech recognition not supported in this browser')
      return null
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    return recognition
  },

  // Start voice recording for lead capture
  async startVoiceCapture() {
    const recognition = this.initVoiceRecognition()
    if (!recognition) return null

    return new Promise((resolve, reject) => {
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        resolve(transcript)
      }

      recognition.onerror = (event) => {
        reject(new Error(`Speech recognition error: ${event.error}`))
      }

      recognition.start()
    })
  },

  // Process voice input and extract lead information
  async processVoiceInput(transcript) {
    // This is a simplified version - in production, you'd use a more sophisticated NLP service
    const leadData = {
      name: null,
      email: null,
      phone: null,
      notes: transcript
    }

    // Basic email extraction
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    const emailMatch = transcript.match(emailRegex)
    if (emailMatch) {
      leadData.email = emailMatch[0]
    }

    // Basic phone extraction
    const phoneRegex = /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/
    const phoneMatch = transcript.match(phoneRegex)
    if (phoneMatch) {
      leadData.phone = phoneMatch[0].replace(/\D/g, '')
    }

    return leadData
  }
}

// Form handling utilities
export const formHandler = {
  // Validate form data
  validateForm(formData) {
    const errors = []

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long')
    }

    if (!formData.email || !this.isValidEmail(formData.email)) {
      errors.push('Please enter a valid email address')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // Email validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  // Show success/error messages
  showMessage(message, type = 'success') {
    const messageElement = document.getElementById('successMessage')
    if (messageElement) {
      messageElement.textContent = message
      messageElement.className = `success-message ${type === 'error' ? 'error' : 'show'}`
      
      setTimeout(() => {
        messageElement.classList.remove('show', 'error')
      }, 5000)
    }
  }
}
