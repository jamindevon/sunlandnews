import { NextResponse } from 'next/server';
import https from 'https';

// WordPress API URL from environment variables
const WP_API_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://admin.sunlandnews.com/wp-json/wp/v2';
const API_TIMEOUT = 8000; // 8 seconds timeout

// Cache responses to reduce redundant API calls
const responseCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache time

// Helper function to fetch with timeout
async function fetchWithTimeout(url, options, timeout) {
  const controller = new AbortController();
  const { signal } = controller;
  
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    // Create a custom HTTPS agent to ignore SSL certificate errors
    // Only do this in development!
    let fetchOptions = { ...options, signal };
    
    if (process.env.NODE_ENV === 'development') {
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false
      });
      fetchOptions.agent = httpsAgent;
    }
    
    const response = await fetch(url, fetchOptions);
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint') || '';
  const params = searchParams.get('params') || '';
  
  // Parse the params to check if they contain category filtering
  const paramsObj = new URLSearchParams(params);
  const categoryParam = paramsObj.get('categories');
  if (categoryParam) {
    console.log(`Request includes category filter: ${categoryParam}`);
  }
  
  // Ensure proper embedding of all relevant data
  let finalParams = params;
  if (!finalParams.includes('_embed=')) {
    finalParams = finalParams ? `${finalParams}&_embed=true` : '_embed=true';
  }
  
  const apiUrl = `${WP_API_BASE}/${endpoint}${finalParams ? `?${finalParams}` : ''}`;
  
  // Check if we have a cached response that's still valid
  const cacheKey = apiUrl;
  const cachedResponse = responseCache.get(cacheKey);
  if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_TTL) {
    console.log(`Using cached response for: ${apiUrl}`);
    return cachedResponse.response;
  }
  
  console.log('WordPress API request URL:', apiUrl);
  
  try {
    const response = await fetchWithTimeout(
      apiUrl, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 }, // 5 minutes stale-while-revalidate
      }, 
      API_TIMEOUT
    );
    
    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);
      // If we get a 404 with categories filter, it might mean no posts exist in that category
      if (response.status === 404 && categoryParam) {
        console.log(`No posts found for category ${categoryParam}`);
        // Return an empty array with headers
        const emptyResponse = NextResponse.json([]);
        emptyResponse.headers.set('x-wp-totalpages', '0');
        emptyResponse.headers.set('x-wp-total', '0');
        return emptyResponse;
      }
      
      const errorResponse = NextResponse.json(
        { error: `WordPress API returned ${response.status}: ${response.statusText}` }, 
        { status: response.status }
      );
      return errorResponse;
    }
    
    const data = await response.json();
    
    // Log more detailed information for debugging
    if (Array.isArray(data)) {
      console.log(`Received ${data.length} items from WordPress API`);
      if (categoryParam) {
        console.log(`Results for category ${categoryParam}: ${data.length} posts`);
      }
      // Check the first item to ensure it has the expected properties
      if (data.length > 0) {
        console.log('First item ID:', data[0].id);
        console.log('Has _embedded?', data[0]._embedded ? 'Yes' : 'No');
        if (data[0]._embedded) {
          console.log('Has wp:featuredmedia?', data[0]._embedded['wp:featuredmedia'] ? 'Yes' : 'No');
          console.log('Has wp:term?', data[0]._embedded['wp:term'] ? 'Yes' : 'No');
        }
      } else if (categoryParam) {
        console.log(`No posts found for category ${categoryParam}`);
      }
    } else if (data) {
      console.log('Received a single item from WordPress API');
      console.log('Item ID:', data.id);
    } else {
      console.log('Received empty or invalid response from WordPress API');
    }
    
    // Create a response with the data and preserve the WordPress headers
    const nextResponse = NextResponse.json(data);
    
    // Copy important WordPress headers if they exist
    const wpTotalPages = response.headers.get('x-wp-totalpages');
    const wpTotal = response.headers.get('x-wp-total');
    
    if (wpTotalPages) {
      nextResponse.headers.set('x-wp-totalpages', wpTotalPages);
    }
    
    if (wpTotal) {
      nextResponse.headers.set('x-wp-total', wpTotal);
    }
    
    // Cache the successful response
    responseCache.set(cacheKey, {
      response: nextResponse.clone(),
      timestamp: Date.now()
    });
    
    return nextResponse;
  } catch (error) {
    console.error('WordPress API error:', error);
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'WordPress API request timed out. Please try again later.' }, 
        { status: 504 }
      );
    }
    
    // If we have a stale cache, return it as fallback
    if (cachedResponse) {
      console.log(`Returning stale cached response for: ${apiUrl}`);
      return cachedResponse.response;
    }
    
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
} 