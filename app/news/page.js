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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 border-b border-gray-100">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Daily Guide to<br />
            <span className="text-primary">St. Lucie County</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            From breaking news to weekend plans, from new restaurants to community events -
            we've got your daily dose of local life covered.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Main Content - The Garden */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Latest Stories</h2>
              <Link href="/stories" className="text-primary font-medium hover:text-primary/80">
                View All →
              </Link>
            </div>

            <div className="space-y-12">
              {recentStories.length > 0 ? (
                recentStories.slice(0, 5).map((story) => (
                  <article key={story._id} className="group grid md:grid-cols-12 gap-6 items-start">
                    {story.mainImage && (
                      <div className="md:col-span-4">
                        <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-gray-100">
                          <Image
                            src={urlFor(story.mainImage).width(400).height(300).url()}
                            alt={story.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      </div>
                    )}
                    <div className={story.mainImage ? "md:col-span-8" : "col-span-12"}>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                        <span className="font-medium text-primary uppercase tracking-wider text-xs">
                          {story.categories?.[0]?.title || 'News'}
                        </span>
                        <span>•</span>
                        <time>{new Date(story.publishedAt).toLocaleDateString()}</time>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                        <Link href={`/post/${story.slug.current}`}>
                          {story.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 leading-relaxed line-clamp-2 mb-4">
                        {story.excerpt || 'Read the full story on Sunland News...'}
                      </p>
                      <div className="flex items-center gap-3">
                        {story.author?.image && (
                          <Image
                            src={urlFor(story.author.image).width(40).height(40).url()}
                            alt={story.author.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        )}
                        <span className="text-sm font-medium text-gray-900">
                          {story.author?.name || 'Sunland Staff'}
                        </span>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <p className="text-gray-500">Loading stories...</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            {/* Newsletter Box */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Daily Newsletter</h3>
              <p className="text-gray-600 mb-6 text-sm">
                Join 10,000+ locals. Get the best of St. Lucie in your inbox every morning.
              </p>
              <Link
                href="/subscribe"
                className="block w-full text-center px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                Subscribe Free
              </Link>
              <div className="mt-4 text-center">
                <a href="https://newsletter.sunlandnews.com" target="_blank" className="text-sm text-gray-500 hover:text-gray-900 underline">
                  View Archive
                </a>
              </div>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 10).map((category) => (
                    <Link
                      key={category._id}
                      href={`/stories/category/${category._id}`}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'News - Sunland News',
  description: 'Your daily guide to St. Lucie County. Today\'s edition, past newsletters, longform stories, and everything happening in your local community.',
}; 