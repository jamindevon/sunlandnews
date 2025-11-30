import Link from 'next/link';
import Image from 'next/image';
import { client, urlFor, getCategories } from '../../lib/sanityClient';
import groq from 'groq';

// Revalidate every 5 minutes
export const revalidate = 300;

async function getAllStories() {
    try {
        const stories = await client.fetch(
            groq`*[_type == "post"] | order(publishedAt desc)[0...20] {
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
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="pt-24 pb-16 px-4 border-b border-gray-100">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        All Stories
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our complete archive of local stories, community news, and features.
                    </p>
                </div>
            </section>

            {/* Topics Filter */}
            <section className="py-8 px-4 border-b border-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-2 justify-center scrollbar-hide">
                        <Link
                            href="/stories"
                            className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all bg-primary text-white border border-primary shadow-md shadow-primary/20"
                        >
                            All Stories
                        </Link>

                        {categories.map((cat) => (
                            <Link
                                key={cat._id}
                                href={`/stories/category/${cat._id}`}
                                className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                            >
                                <span className="mr-2">{categoryIcons[cat.title]}</span>
                                {cat.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stories Grid */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {stories.length > 0 ? (
                            stories.map((story) => (
                                <article key={story._id} className="group flex flex-col h-full">
                                    {story.mainImage && (
                                        <Link href={`/post/${story.slug.current}`} className="block overflow-hidden rounded-2xl mb-6">
                                            <div className="aspect-[3/2] relative bg-gray-100">
                                                <Image
                                                    src={urlFor(story.mainImage).width(600).height(400).url()}
                                                    alt={story.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        </Link>
                                    )}

                                    <div className="flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                                            <span className="font-medium text-primary uppercase tracking-wider text-xs">
                                                {story.categories?.[0]?.title || 'News'}
                                            </span>
                                            <span>•</span>
                                            <time>{new Date(story.publishedAt).toLocaleDateString()}</time>
                                        </div>

                                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                                            <Link href={`/post/${story.slug.current}`}>
                                                {story.title}
                                            </Link>
                                        </h2>

                                        <p className="text-gray-600 line-clamp-3 mb-4 flex-1">
                                            {story.excerpt}
                                        </p>

                                        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
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
