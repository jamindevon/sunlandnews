import axios from 'axios';

// Fetch posts from WordPress through our API route
export const getPosts = async (page = 1, perPage = 10) => {
  try {
    // Make sure to explicitly request all needed embeds
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      _embed: true // This will embed all available data including featured media and terms
    }).toString();
    
    console.log(`Fetching posts with params: ${params}`);
    const response = await axios.get(`/api/wordpress?endpoint=posts&params=${params}`);
    
    // Log detailed response info for debugging
    console.log(`Received ${response.data?.length || 0} posts from WordPress API`);
    console.log('Headers:', response.headers);
    console.log('Total pages:', response.headers['x-wp-totalpages']);
    console.log('Total posts:', response.headers['x-wp-total']);
    
    // Check if featured media is present in the first post
    if (response.data && response.data.length > 0) {
      const firstPost = response.data[0];
      console.log('First post has featured media?', firstPost._embedded && firstPost._embedded['wp:featuredmedia'] ? 'Yes' : 'No');
      if (firstPost._embedded && firstPost._embedded['wp:featuredmedia'] && firstPost._embedded['wp:featuredmedia'][0]) {
        console.log('Featured media URL:', firstPost._embedded['wp:featuredmedia'][0].source_url);
      }
    }
    
    // Return both the posts and the total pages information
    return {
      posts: response.data || [],
      totalPages: parseInt(response.headers['x-wp-totalpages'] || 1, 10),
      totalPosts: parseInt(response.headers['x-wp-total'] || 0, 10)
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
    // Make sure to explicitly request featured media embedding
    const params = new URLSearchParams({
      _embed: 'wp:featuredmedia'
    }).toString();
    
    console.log(`Fetching post ID ${id} with params: ${params}`);
    const response = await axios.get(`/api/wordpress?endpoint=posts/${id}&params=${params}`);
    
    // Log response for debugging
    console.log('Post fetched successfully');
    console.log('Post has featured media?', response.data._embedded && response.data._embedded['wp:featuredmedia'] ? 'Yes' : 'No');
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    return null;
  }
};

// Fetch categories
export const getCategories = async () => {
  try {
    // Request more categories per page and sort them by name
    const params = new URLSearchParams({
      per_page: '50', // Get up to 50 categories
      orderby: 'name',
      order: 'asc'
    }).toString();
    
    console.log('Fetching categories with params:', params);
    const response = await axios.get(`/api/wordpress?endpoint=categories&params=${params}`);
    
    // Log response for debugging
    console.log(`Received ${response.data?.length || 0} categories from WordPress API`);
    
    // Ensure we always return an array
    if (!response.data || !Array.isArray(response.data)) {
      console.warn('Categories data is not an array:', response.data);
      return [];
    }
    
    // Transform categories to include the post count when available
    const categoriesWithPostCount = response.data.map(category => ({
      ...category,
      postCount: category.count || 0
    }));
    
    // Filter out categories with no posts if needed
    // const categoriesWithPosts = categoriesWithPostCount.filter(cat => cat.postCount > 0);
    
    // Return all categories, even those with no posts
    return categoriesWithPostCount;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Fetch posts by category
export const getPostsByCategory = async (categoryId, page = 1, perPage = 10) => {
  try {
    // Make sure to explicitly request all needed embeds
    const params = new URLSearchParams({
      categories: categoryId.toString(),
      page: page.toString(),
      per_page: perPage.toString(),
      _embed: true // This will embed all available data including featured media and terms
    }).toString();
    
    console.log(`Fetching posts for category ${categoryId} with params: ${params}`);
    const response = await axios.get(`/api/wordpress?endpoint=posts&params=${params}`);
    
    // Log detailed response info for debugging
    console.log(`Received ${response.data?.length || 0} posts for category ${categoryId}`);
    console.log('Headers:', response.headers);
    console.log('Total pages:', response.headers['x-wp-totalpages']);
    console.log('Total posts:', response.headers['x-wp-total']);
    
    // Return both the posts and the total pages information
    return {
      posts: response.data || [],
      totalPages: parseInt(response.headers['x-wp-totalpages'] || 1, 10),
      totalPosts: parseInt(response.headers['x-wp-total'] || 0, 10)
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
    // Make sure to explicitly request featured media embedding
    const params = new URLSearchParams({
      per_page: count.toString(),
      _embed: 'wp:featuredmedia',
      sticky: 'true'
    }).toString();
    
    console.log(`Fetching featured posts with params: ${params}`);
    const response = await axios.get(`/api/wordpress?endpoint=posts&params=${params}`);
    
    // Log response for debugging
    console.log(`Received ${response.data?.length || 0} featured posts from WordPress API`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
} 