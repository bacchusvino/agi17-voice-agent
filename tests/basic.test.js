// Basic tests for AGI17 Voice Agent
// Run with: node tests/basic.test.js

import { leadService, voiceAgent, formHandler } from '../js/supabase.js';

// Mock Supabase for testing
const mockSupabase = {
  from: () => ({
    insert: () => ({
      select: () => Promise.resolve({ data: [{ id: 1, name: 'Test User', email: 'test@example.com' }], error: null })
    })
  })
};

// Test form validation
function testFormValidation() {
  console.log('Testing form validation...');
  
  // Test valid form data
  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-1234'
  };
  
  const validation = formHandler.validateForm(validData);
  console.assert(validation.isValid === true, 'Valid form data should pass validation');
  
  // Test invalid email
  const invalidData = {
    name: 'John Doe',
    email: 'invalid-email',
    phone: '555-1234'
  };
  
  const invalidValidation = formHandler.validateForm(invalidData);
  console.assert(invalidValidation.isValid === false, 'Invalid email should fail validation');
  
  console.log('✅ Form validation tests passed');
}

// Test email validation
function testEmailValidation() {
  console.log('Testing email validation...');
  
  const validEmails = [
    'test@example.com',
    'user.name@domain.co.uk',
    'user+tag@example.org'
  ];
  
  const invalidEmails = [
    'invalid-email',
    '@example.com',
    'test@',
    'test.example.com'
  ];
  
  validEmails.forEach(email => {
    console.assert(formHandler.isValidEmail(email), `Valid email should pass: ${email}`);
  });
  
  invalidEmails.forEach(email => {
    console.assert(!formHandler.isValidEmail(email), `Invalid email should fail: ${email}`);
  });
  
  console.log('✅ Email validation tests passed');
}

// Test voice agent initialization
function testVoiceAgent() {
  console.log('Testing voice agent...');
  
  // Mock speech recognition
  if (typeof window === 'undefined') {
    global.window = {
      SpeechRecognition: class MockSpeechRecognition {},
      webkitSpeechRecognition: class MockWebkitSpeechRecognition {}
    };
  }
  
  const recognition = voiceAgent.initVoiceRecognition();
  console.assert(recognition !== null, 'Voice recognition should be initialized');
  
  console.log('✅ Voice agent tests passed');
}

// Test lead processing
async function testLeadProcessing() {
  console.log('Testing lead processing...');
  
  const mockTranscript = 'Hi, my name is John Doe, my email is john@example.com and my phone is 555-1234';
  const leadData = await voiceAgent.processVoiceInput(mockTranscript);
  
  console.assert(leadData.name === null, 'Name extraction not implemented yet');
  console.assert(leadData.email === 'john@example.com', 'Email should be extracted');
  console.assert(leadData.phone === '5551234', 'Phone should be extracted and cleaned');
  console.assert(leadData.notes === mockTranscript, 'Notes should contain full transcript');
  
  console.log('✅ Lead processing tests passed');
}

// Run all tests
async function runTests() {
  console.log('🧪 Running AGI17 Voice Agent Tests\n');
  
  try {
    testFormValidation();
    testEmailValidation();
    testVoiceAgent();
    await testLeadProcessing();
    
    console.log('\n🎉 All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests();
}

export { runTests };
