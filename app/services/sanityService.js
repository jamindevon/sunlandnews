import axios from 'axios';
import { urlFor } from '../lib/sanity-image';

// Fetch posts from Sanity through our API route
export const getPosts = async (page = 1, perPage = 10) => {
  try {
    console.log(`Fetching posts with page: ${page}, perPage: ${perPage}`);
    const response = await axios.get(`/api/sanity?endpoint=posts&page=${page}&pageSize=${perPage}`);
    
    // Log detailed response info for debugging
    console.log(`Received ${response.data?.length || 0} posts from Sanity API`);
    console.log('Headers:', response.headers);
    console.log('Total pages:', response.headers['x-total-pages']);
    console.log('Total posts:', response.headers['x-total-count']);
    
    // Process the data to transform Sanity-specific structures
    const processedPosts = response.data.map(post => ({
      ...post,
      title: { rendered: post.title },
      excerpt: { rendered: post.excerpt },
      date: post.publishedAt,
      // Keep the mainImage object as is for urlFor
      _embedded: {
        'wp:term': [post.categories || []]
      }
    }));
    
    // Return both the posts and the total pages information
    return {
      posts: processedPosts,
      totalPages: parseInt(response.headers['x-total-pages'] || 1, 10),
      totalPosts: parseInt(response.headers['x-total-count'] || 0, 10)
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    return { posts: [], totalPages: 0, totalPosts: 0 };
  }
};

// Fetch a single post by ID
export const getPostById = async (id) => {
  try {
    console.log(`Fetching post ID ${id}`);
    const response = await axios.get(`/api/sanity?endpoint=post&id=${id}`);
    
    // Process the data to maintain compatibility with previous WordPress structure
    const processedPost = {
      ...response.data,
      title: { rendered: response.data.title },
      excerpt: { rendered: response.data.excerpt },
      // Keep the body as is for PortableText to render
      body: response.data.body,
      date: response.data.publishedAt,
      // Keep the mainImage object as is for urlFor
      _embedded: {
        'wp:term': [response.data.categories || []]
      }
    };
    
    // Log response for debugging
    console.log('Post fetched successfully');
    
    return processedPost;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    return null;
  }
};

// Fetch categories
export const getCategories = async () => {
  try {
    console.log('Fetching categories');
    const response = await axios.get(`/api/sanity?endpoint=categories`);
    
    // Process the data to maintain compatibility with previous WordPress structure
    const processedCategories = response.data.map(category => ({
      id: category._id,
      name: category.title,
      count: category.count || 0
    }));
    
    // Log response for debugging
    console.log(`Received ${processedCategories.length || 0} categories from Sanity API`);
    
    return processedCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Fetch posts by category
export const getPostsByCategory = async (categoryId, page = 1, perPage = 10) => {
  try {
    console.log(`Fetching posts for category ${categoryId} with page: ${page}, perPage: ${perPage}`);
    const response = await axios.get(`/api/sanity?endpoint=posts&categoryId=${categoryId}&page=${page}&pageSize=${perPage}`);
    
    // Process the data to transform Sanity-specific structures
    const processedPosts = response.data.map(post => ({
      ...post,
      title: { rendered: post.title },
      excerpt: { rendered: post.excerpt },
      date: post.publishedAt,
      // Keep the mainImage object as is for urlFor
      _embedded: {
        'wp:term': [post.categories || []]
      }
    }));
    
    // Log detailed response info for debugging
    console.log(`Received ${processedPosts.length || 0} posts for category ${categoryId}`);
    console.log('Headers:', response.headers);
    console.log('Total pages:', response.headers['x-total-pages']);
    console.log('Total posts:', response.headers['x-total-count']);
    
    // Return both the posts and the total pages information
    return {
      posts: processedPosts,
      totalPages: parseInt(response.headers['x-total-pages'] || 1, 10),
      totalPosts: parseInt(response.headers['x-total-count'] || 0, 10)
    };
  } catch (error) {
    console.error(`Error fetching posts for category ${categoryId}:`, error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    return { posts: [], totalPages: 0, totalPosts: 0 };
  }
};

export async function fetchFeaturedPosts(count = 1) {
  try {
    console.log(`Fetching featured posts, count: ${count}`);
    const response = await axios.get(`/api/sanity?endpoint=featured&count=${count}`);
    
    // Process the data to transform Sanity-specific structures
    const processedPosts = response.data.map(post => ({
      ...post,
      title: { rendered: post.title },
      excerpt: { rendered: post.excerpt },
      date: post.publishedAt,
      // Keep the mainImage object as is for the urlFor function
      _embedded: {
        'wp:term': [post.categories || []]
      }
    }));
    
    // Log response for debugging
    console.log(`Received ${processedPosts.length || 0} featured posts from Sanity API`);
    
    return processedPosts;
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
} 