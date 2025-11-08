// Test script to verify API setup
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5057';

async function testHealth() {
  try {
    const response = await fetch(`${BASE_URL}/api/health`);
    const data = await response.json();
    console.log('Health check:', data);
    return data.ok === true;
  } catch (error) {
    console.error('Health check failed:', error.message);
    return false;
  }
}

async function testLeads() {
  try {
    const response = await fetch(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: "QualiFy",
        ownerName: "Josh",
        phone: "+15551234567",
        city: "San Diego",
        consentBasis: "Manual Test",
        notes: "Cursor POST test"
      })
    });
    
    const data = await response.json();
    console.log('POST test:', { status: response.status, data });
    return response.status === 201 && data.ok === true;
  } catch (error) {
    console.error('POST test failed:', error.message);
    return false;
  }
}

console.log('Testing API...');
console.log('Note: Make sure to start the server first with: PORT=5057 node server.js');
console.log('Then run this test script in another terminal.');
