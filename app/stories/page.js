import Link from 'next/link';
import Image from 'next/image';
import { client, urlFor, getCategories } from '../../lib/sanityClient';
import groq from 'groq';

// Revalidate every 5 minutes
export const revalidate = 300;

async function getAllStories() {
    try {
        const stories = await client.fetch(
            groq`*[_type == "post" && !(_id in path('drafts.**'))] | order(publishedAt desc)[0...20] {
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
        excerpt
      }`
        );
        return stories || [];
    } catch (error) {
        console.error('Error fetching stories:', error);
        return [];
    }
}

export default async function StoriesPage() {
    const [stories, categories] = await Promise.all([
        getAllStories(),
        getCategories()
    ]);

    // Icon mapping for categories
    const categoryIcons = {
        'Culture & Life': '🌀',
        'The Garden': '🌱',
        'Food': '🍽️',
        'News': '📰',
        'Interviews': '🗣️',
        'Work & Business': '🛠️'
    };

    return (
        <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white">
            {/* Hero */}
            <section className="pt-24 pb-16 px-4 border-b-2 border-black bg-white">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-black mb-6 uppercase tracking-tight">
                        All Stories
                    </h1>
                    <p className="text-xl font-bold text-gray-800 max-w-2xl mx-auto">
                        Explore our complete archive of local stories, community news, and features.
                    </p>
                </div>
            </section>

            {/* Topics Filter */}
            <section className="py-6 md:py-8 border-b-2 border-black bg-brutalYellow">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-3 md:gap-4 justify-start md:justify-center scrollbar-hide px-4">
                        <Link
                            href="/stories"
                            className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 text-xs md:text-base font-bold uppercase tracking-widest whitespace-nowrap transition-all bg-black text-white hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] border-2 border-black"
                        >
                            All Stories
                        </Link>

                        {categories.map((cat) => (
                            <Link
                                key={cat._id}
                                href={`/stories/category/${cat._id}`}
                                className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 text-xs md:text-base font-bold uppercase tracking-widest whitespace-nowrap transition-all bg-white text-black border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none"
                            >
                                <span className="mr-2 md:mr-3 text-base md:text-xl">{categoryIcons[cat.title]}</span>
                                {cat.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stories Grid */}
            <section className="py-16 px-4 bg-brutalBg">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {stories.length > 0 ? (
                            stories.map((story) => (
                                <article key={story._id} className="group flex flex-col h-full bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all duration-300 rounded-2xl overflow-hidden p-6 relative">
                                    {story.mainImage && (
                                        <Link href={`/post/${story.slug.current}`} className="block overflow-hidden rounded-xl border-2 border-black mb-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                            <div className="aspect-[3/2] relative bg-brutalBlue">
                                                <Image
                                                    src={urlFor(story.mainImage).width(600).height(400).url()}
                                                    alt={story.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        </Link>
                                    )}

                                    <div className="flex-1 flex flex-col relative z-10">
                                        <div className="flex items-center gap-3 text-sm font-bold text-gray-800 mb-4 border-b-2 border-black pb-3">
                                            <span className="font-black text-black bg-brutalYellow px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase tracking-wider text-xs">
                                                {story.categories?.[0]?.title || 'News'}
                                            </span>
                                            <span>•</span>
                                            <time className="uppercase tracking-wide">{new Date(story.publishedAt).toLocaleDateString()}</time>
                                        </div>

                                        <h2 className="text-2xl font-black text-black mb-4 group-hover:text-primary transition-colors leading-tight uppercase tracking-tight">
                                            <Link href={`/post/${story.slug.current}`}>
                                                {story.title}
                                            </Link>
                                        </h2>

                                        <p className="text-gray-800 font-bold line-clamp-3 mb-6 flex-1 text-lg">
                                            {story.excerpt}
                                        </p>

                                        <div className="flex items-center gap-3 mt-auto pt-4 border-t-2 border-black bg-gray-50 -mx-6 -mb-6 px-6 pb-6 pt-6">
                                            {story.author?.image && (
                                                <Image
                                                    src={urlFor(story.author.image).width(40).height(40).url()}
                                                    alt={story.author.name}
                                                    width={32}
                                                    height={32}
                                                    className="rounded-full border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                                />
                                            )}
                                            <span className="text-sm font-black text-black uppercase tracking-wider">
                                                {story.author?.name || 'Sunland Staff'}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-gray-500 text-lg">No stories found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export const metadata = {
    title: 'All Stories - Sunland News',
    description: 'Browse all stories from Sunland News. Local news, events, and community features from St. Lucie County.',
};
