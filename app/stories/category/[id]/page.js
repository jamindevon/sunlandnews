import Link from 'next/link';
import Image from 'next/image';
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Enable revalidation
export const revalidate = 60; // Revalidate every 60 seconds

// Define the Sanity configuration
const client = createClient({
  projectId: 'oj0fldpz',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
});

// Set up the image URL builder (need to use a function to avoid 'call' errors in SSR)
const builder = imageUrlBuilder({
  projectId: 'oj0fldpz',
  dataset: 'production',
});

function urlFor(source) {
  return builder.image(source);
}

// Format date for display
function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export async function generateMetadata({ params }) {
  const { id } = params;
  
  // Fetch the category
  let category = null;
  try {
    category = await client.fetch(`*[_type == "category" && _id == $id][0]`, { id });
  } catch (error) {
    console.error('Error fetching category for metadata:', error);
  }
  
  return {
    title: category ? `${category.title} - Sunland Stories` : 'Category - Sunland Stories',
    description: category?.description || 'Stories and updates from St. Lucie County',
  };
}

export default async function CategoryPage({ params }) {
  const { id } = params;
  
  // Fetch the category
  let category = null;
  try {
    category = await client.fetch(`*[_type == "category" && _id == $id][0]`, { id });
  } catch (error) {
    console.error('Error fetching category:', error);
  }
  
  // Fetch posts in this category
  let posts = [];
  try {
    const query = `*[_type == "post" && references($id)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt,
      "categories": categories[]->{ _id, title },
      "author": author->{ name, image }
    }`;
    
    posts = await client.fetch(query, { id });
    console.log(`Fetched ${posts.length} posts for category ${id}`);
  } catch (error) {
    console.error('Error fetching posts for category:', error);
    posts = [];
  }
  
  // Fetch all categories for the filter
  let categories = [];
  try {
    const categoryQuery = `*[_type == "category"] {
      _id,
      title,
      description
    }`;
    
    categories = await client.fetch(categoryQuery);
  } catch (error) {
    console.error('Error fetching categories:', error);
    categories = [];
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {category ? category.title : 'Category'}
              </h1>
              <p className="text-xl text-gray-700">
                {category?.description || 'Stories and updates from St. Lucie County'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="mb-8">
        <h2 className="font-medium text-gray-700 mb-3">Filter by Category:</h2>
        <div className="flex overflow-x-auto pb-2 md:pb-0 md:flex-wrap gap-2 scrollbar-hide">
          <Link
            href="/stories"
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            All Stories
          </Link>
          
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/stories/category/${cat._id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                cat._id === id 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Posts Display */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <Link href={post.slug && post.slug.current ? `/post/${post.slug.current}` : `/post/${post._id}`}>
                <div className="relative h-48 w-full">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(400).url()}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-gray-100 w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
              </Link>
              
              <div className="p-4">
                {post.categories && post.categories.length > 0 && (
                  <div className="mb-2">
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                      {post.categories[0].title}
                    </span>
                  </div>
                )}
                
                <Link href={post.slug && post.slug.current ? `/post/${post.slug.current}` : `/post/${post._id}`}>
                  <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.title}</h2>
                </Link>
                
                <p className="text-gray-600 text-sm mb-4">
                  {formatDate(post.publishedAt)}
                </p>
                
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={post.slug && post.slug.current ? `/post/${post.slug.current}` : `/post/${post._id}`}
                  className="text-primary font-medium hover:underline inline-flex items-center"
                >
                  Read more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-700 mb-2">No stories found in this category</p>
          <p className="text-gray-500 text-sm">Try selecting a different category or check back later</p>
        </div>
      )}
    </div>
  );
}