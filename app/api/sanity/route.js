import { NextResponse } from 'next/server';
import * as sanityClient from '../../../lib/sanityClient';

// Cache responses to reduce redundant API calls
const responseCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache time

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint') || '';
  const id = searchParams.get('id') || '';
  const slug = searchParams.get('slug') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const categoryId = searchParams.get('categoryId') || '';
  const featured = searchParams.get('featured') === 'true';
  const count = parseInt(searchParams.get('count') || '1', 10);
  
  // Create a cache key based on the request parameters
  const cacheKey = `${endpoint}-${id}-${slug}-${page}-${pageSize}-${categoryId}-${featured}-${count}`;
  
  // Check if we have a cached response that's still valid
  const cachedResponse = responseCache.get(cacheKey);
  if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_TTL) {
    console.log(`Using cached response for: ${cacheKey}`);
    return cachedResponse.response;
  }
  
  try {
    let data;
    let totalPages = 1;
    let totalItems = 0;
    
    switch (endpoint) {
      case 'posts':
        if (categoryId) {
          data = await sanityClient.getPostsByCategory(categoryId);
          totalItems = data.length || 0;
          totalPages = Math.ceil(totalItems / pageSize) || 1;
        } else {
          data = await sanityClient.getPosts();
          totalItems = data.length || 0;
          totalPages = Math.ceil(totalItems / pageSize) || 1;
        }
        break;
        
      case 'post':
        if (id) {
          // Add a custom query to get a post by ID
          data = await sanityClient.client.fetch(
            `*[_type == "post" && _id == $id][0]{
              _id,
              title,
              slug,
              mainImage,
              categories[]->{
                _id,
                title
              },
              publishedAt,
              author->{
                name,
                image,
                bio
              },
              body,
              excerpt,
              "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
            }`,
            { id }
          );
        } else if (slug) {
          data = await sanityClient.getPost(slug);
        }
        break;
        
      case 'categories':
        data = await sanityClient.getCategories();
        break;
        
      case 'featured':
        data = await sanityClient.getFeaturedPosts();
        break;
        
      default:
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }
    
    if (!data) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    // Create response with the data
    const nextResponse = NextResponse.json(data);
    
    // Add pagination headers if applicable
    if (totalPages > 0) {
      nextResponse.headers.set('x-total-pages', totalPages.toString());
      nextResponse.headers.set('x-total-count', totalItems.toString());
    }
    
    // Cache the successful response
    responseCache.set(cacheKey, {
      response: nextResponse.clone(),
      timestamp: Date.now()
    });
    
    return nextResponse;
  } catch (error) {
    console.error('Sanity API error:', error);
    
    // If we have a stale cache, return it as fallback
    if (cachedResponse) {
      console.log(`Returning stale cached response for: ${cacheKey}`);
      return cachedResponse.response;
    }
    
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
} 