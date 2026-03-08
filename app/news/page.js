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
    <div className="min-h-screen bg-white font-sans text-black selection:bg-brutalPink selection:text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 border-b-2 border-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 leading-tight tracking-tight">
            Your Daily Guide to<br />
            <span className="inline-block bg-brutalYellow px-4 py-1 mt-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl">St. Lucie County</span>
          </h1>
          <p className="text-lg md:text-xl font-bold text-gray-800 mb-8 max-w-2xl mx-auto leading-relaxed">
            From breaking news to weekend plans, from new restaurants to community events -
            we've got your daily dose of local life covered.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-16">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Main Content - The Garden */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-black">
              <h2 className="text-3xl font-extrabold text-black uppercase tracking-tight">Latest Stories</h2>
              <Link href="/stories" className="text-black font-bold uppercase underline decoration-2 underline-offset-4 decoration-primary hover:text-primary transition-colors">
                View All →
              </Link>
            </div>

            <div className="space-y-12">
              {recentStories.length > 0 ? (
                recentStories.slice(0, 5).map((story) => (
                  <article key={story._id} className="group grid md:grid-cols-12 gap-6 items-start bg-white border-2 border-black p-4 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all">
                    {story.mainImage && (
                      <div className="md:col-span-4">
                        <div className="aspect-[4/3] relative rounded-xl overflow-hidden border-2 border-black bg-gray-100 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
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
                      <div className="flex items-center gap-3 text-sm text-black font-bold mb-3">
                        <span className="bg-brutalBlue text-white px-2 py-0.5 border-2 border-black rounded tracking-wider shadow-[1px_1px_0px_rgba(0,0,0,1)] text-xs uppercase">
                          {story.categories?.[0]?.title || 'News'}
                        </span>
                        <span>•</span>
                        <time className="opacity-80">{new Date(story.publishedAt).toLocaleDateString()}</time>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-black mb-3 group-hover:text-primary transition-colors leading-tight">
                        <Link href={`/post/${story.slug.current}`}>
                          {story.title}
                        </Link>
                      </h3>
                      <p className="text-gray-800 font-medium leading-relaxed line-clamp-2 mb-4">
                        {story.excerpt || 'Read the full story on Sunland News...'}
                      </p>
                      <div className="flex items-center gap-3 mt-auto">
                        {story.author?.image && (
                          <div className="border-2 border-black rounded-full overflow-hidden shadow-[1px_1px_0px_rgba(0,0,0,1)] w-8 h-8">
                            <Image
                              src={urlFor(story.author.image).width(40).height(40).url()}
                              alt={story.author.name}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <span className="text-sm font-bold text-black uppercase">
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
            <div className="bg-brutalBg border-2 border-black rounded-2xl p-8 shadow-[6px_6px_0px_rgba(0,0,0,1)] text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "16px 16px" }}></div>
              <h3 className="text-2xl font-black text-black mb-2 uppercase tracking-tight relative z-10">Daily Newsletter</h3>
              <p className="text-black font-semibold mb-6 text-sm relative z-10">
                Join 10,000+ locals. Get the best of St. Lucie in your inbox every morning.
              </p>
              <Link
                href="/subscribe"
                className="block w-full text-center px-6 py-4 bg-primary text-white font-bold uppercase rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all relative z-10"
              >
                Subscribe Free
              </Link>
              <div className="mt-4 text-center relative z-10">
                <a href="https://newsletter.sunlandnews.com" target="_blank" className="text-sm font-bold text-black hover:text-primary underline decoration-2 underline-offset-4">
                  View Archive
                </a>
              </div>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl font-bold text-black uppercase mb-4 tracking-tight">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 10).map((category) => (
                    <Link
                      key={category._id}
                      href={`/stories/category/${category._id}`}
                      className="px-4 py-2 bg-white border-2 border-black rounded-lg text-sm font-bold text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-brutalYellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase"
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