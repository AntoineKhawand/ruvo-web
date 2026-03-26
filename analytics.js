import { v4 as uuidv4 } from 'uuid';
import Conf from 'conf';

// Use native fetch if available (Node.js 18+), otherwise fall back to node-fetch
const fetch = typeof globalThis.fetch === 'function' ? globalThis.fetch : require('node-fetch');

const config = new Conf({ projectName: 'my-react-cli' });

// Load GA4 credentials from environment variables for better security and flexibility
const MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'; // Replace with your actual Measurement ID
const API_SECRET = process.env.GA_API_SECRET || '_j3_ztfgSTyb4H0ZpYinQQ'; // Replace with your actual API secret

// Get or create a persistent Client ID for this specific machine
function getClientId() {
  let clientId = config.get('clientId');
  if (!clientId) {
    clientId = uuidv4();
    config.set('clientId', clientId);
  }
  return clientId;
}

export async function trackEvent(eventName, params = {}) {
  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;
  
  const payload = {
    client_id: getClientId(),
    events: [{
      name: eventName,
      params: params
    }]
  };

  try {
    // Fire and forget - we don't need to await the response for the CLI to keep working
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    // Fail silently so analytics issues don't crash the user's terminal
    // console.error('Failed to send analytics', error);
  }
}