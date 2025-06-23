import Link from 'next/link';
import Image from 'next/image';
import { client, urlFor } from '../../lib/sanityClient';
import groq from 'groq';

async function getRecentStories() {
  try {
    // Fetch directly from Sanity client instead of API route
    const stories = await client.fetch(
      groq`*[_type == "post"] | order(publishedAt desc)[0...6] {
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
          image
        },
        excerpt,
        "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
      }`
    );
    return stories || [];
  } catch (error) {
    console.error('Error fetching recent stories:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const categories = await client.fetch(
      groq`*[_type == "category"] | order(title asc) {
        _id,
        title,
        description
      }`
    );
    return categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Enable revalidation
export const revalidate = 300; // 5 minutes

export default async function NewsPage() {
  const [recentStories, categories] = await Promise.all([
    getRecentStories(),
    getCategories()
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-200 via-primary/30 to-blue-100 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Daily Guide to<br />
            <span className="text-primary">St. Lucie County</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            From breaking news to weekend plans, from new restaurants to community events - 
            we've got your daily dose of local life covered.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-16">


        <div className="grid md:grid-cols-2 gap-16">
          {/* The Garden - Longform Stories */}
          <section>
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">The Garden</h2>
              <div className="ml-4 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                Longform
              </div>
            </div>
            
            <div className="space-y-6">
              {recentStories.length > 0 ? (
                recentStories.slice(0, 3).map((story, index) => (
                  <article key={story._id} className="group">
                    <div className="flex gap-4">
                      {story.mainImage && (
                        <div className="flex-shrink-0">
                          <Image
                            src={urlFor(story.mainImage).width(120).height(80).url()}
                            alt={story.title}
                            width={120}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 mb-1">
                          {new Date(story.publishedAt).toLocaleDateString()}
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          <Link href={`/post/${story.slug.current}`}>
                            {story.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {story.excerpt || 'Read this story from Sunland News'}
                        </p>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading stories...</p>
                </div>
              )}
            </div>
            
            <div className="mt-8">
              <Link 
                href="/stories"
                className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
              >
                View All Stories
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>

          {/* Newsletter Archive */}
          <section>
            <div className="flex items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Newsletter Archive</h2>
              <div className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                Archive
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Browse Past Newsletters</h3>
              <p className="text-gray-600 mb-6">
                Access our complete archive of daily newsletters covering St. Lucie County news, events, and community stories.
              </p>
              <a 
                href="https://newsletter.sunlandnews.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors"
              >
                View Archive
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </section>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {categories.slice(0, 8).map((category, index) => {
                // Assign colors dynamically based on index
                const colors = [
                  'bg-blue-100 text-blue-700',
                  'bg-orange-100 text-orange-700', 
                  'bg-purple-100 text-purple-700',
                  'bg-green-100 text-green-700',
                  'bg-red-100 text-red-700',
                  'bg-yellow-100 text-yellow-700',
                  'bg-pink-100 text-pink-700',
                  'bg-indigo-100 text-indigo-700'
                ];
                
                // Assign icons based on category title
                const getIcon = (title) => {
                  const titleLower = title.toLowerCase();
                  if (titleLower.includes('news')) return '📰';
                  if (titleLower.includes('food') || titleLower.includes('dining')) return '🍽️';
                  if (titleLower.includes('event')) return '🎉';
                  if (titleLower.includes('community')) return '🏘️';
                  if (titleLower.includes('garden')) return '🌱';
                  if (titleLower.includes('work') || titleLower.includes('business')) return '🛠️';
                  if (titleLower.includes('culture') || titleLower.includes('life')) return '🌀';
                  if (titleLower.includes('interview')) return '🗣️';
                  return '📋'; // Default icon
                };
                
                return (
                  <Link key={category._id} href={`/stories/category/${category._id}`}>
                    <div className={`${colors[index % colors.length]} rounded-2xl p-6 text-center hover:scale-105 transition-transform group cursor-pointer`}>
                      <div className="text-3xl mb-3">{getIcon(category.title)}</div>
                      <h3 className="font-semibold group-hover:underline">{category.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-r from-primary/10 to-blue-100 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Never Miss an Edition</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Join 7,500+ locals who start their day with Sunland News. Get the latest stories, 
            events, and everything happening in St. Lucie County delivered to your inbox.
          </p>
          <Link 
            href="/subscribe"
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors text-lg"
          >
            Subscribe Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'News - Sunland News',
  description: 'Your daily guide to St. Lucie County. Today\'s edition, past newsletters, longform stories, and everything happening in your local community.',
}; 