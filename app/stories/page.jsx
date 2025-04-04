import Image from 'next/image';
import Link from 'next/link';
import groq from 'groq';
import { client, urlFor } from '../../lib/sanityClient';

// Format date for display
function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export const metadata = {
  title: 'Stories | Sunland News',
  description: 'The freshest stories from St. Lucie County',
};

// Query to get all posts ordered by published date
const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->name,
  "categories": categories[]->{ _id, title }
}`;

// Query to get all categories
const categoriesQuery = groq`*[_type == "category"] {
  _id,
  title,
  description
}`;

export default async function Stories() {
  // Fetch posts and categories in parallel
  const [posts, categories] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(categoriesQuery)
  ]);

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center">
          {/* Hero Section */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Sunland Stories
                </h1>
                <p className="text-xl text-gray-700">
                  Stories and updates from St. Lucie County
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-8">The freshest stories from St. Lucie County</p>
          <p className="text-gray-600">No stories found. Check back soon for new content!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Sunland Stories
              </h1>
              <p className="text-xl text-gray-700">
                Stories and updates from St. Lucie County
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
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all bg-primary text-white shadow-md"
          >
            All Stories
          </Link>
          
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/stories/category/${cat._id}`}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Posts Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Link href={`/post/${post.slug.current}`}>
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
              
              <Link href={`/post/${post.slug.current}`}>
                <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{post.title}</h2>
              </Link>
              
              <p className="text-gray-600 text-sm mb-4">
                {formatDate(post.publishedAt)}
              </p>
              
              <p className="text-gray-700 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <Link 
                href={`/post/${post.slug.current}`}
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
    </div>
  );
} 