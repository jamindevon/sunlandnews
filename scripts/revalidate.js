#!/usr/bin/env node
/**
 * Simple script to manually trigger revalidation of all pages
 * Run with: node scripts/revalidate.js
 */

const https = require('https');

// This should match the secret in your revalidate API route
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'your-webhook-secret';

// Configure this to point to your deployed site or localhost during development
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const revalidateData = {
  secret: REVALIDATE_SECRET,
  type: 'all'
};

const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create the request URL (handles both http and https)
const apiUrl = `${BASE_URL}/api/revalidate`;
console.log(`Sending revalidation request to: ${apiUrl}`);

// Create request object based on protocol
const req = apiUrl.startsWith('https:') 
  ? https.request(apiUrl, requestOptions)
  : require('http').request(apiUrl, requestOptions);

// Handle response
req.on('response', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (response.success) {
        console.log('✅ Revalidation successful!');
        console.log(response);
      } else {
        console.error('❌ Revalidation failed:', response.message || 'Unknown error');
      }
    } catch (error) {
      console.error('❌ Error parsing response:', error);
      console.log('Raw response:', data);
    }
  });
});

// Handle errors
req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
});

// Send the revalidation data
req.write(JSON.stringify(revalidateData));
req.end();

console.log('Revalidation request sent...'); 