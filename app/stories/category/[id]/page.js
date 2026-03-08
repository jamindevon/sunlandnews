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

  // Icon mapping for categories
  const categoryIcons = {
    'Culture & Life': '🌀',
    'The Garden': '🌱',
    'Food': '🍽️',
    'News': '📰',
    'Interviews': '🗣️',
    'Work & Business': '🛠️'
  };

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
    <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 border-b-2 border-black bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-black text-black mb-6 flex items-center justify-center gap-3 uppercase tracking-tight">
            {category && categoryIcons[category.title] && <span>{categoryIcons[category.title]}</span>}
            {category ? category.title : 'Category'}
          </h1>
          <p className="text-xl font-bold text-gray-800 max-w-2xl mx-auto">
            {category?.description || 'Stories and updates from St. Lucie County'}
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 md:py-8 border-b-2 border-black bg-brutalYellow">
        <div className="container mx-auto max-w-6xl">
          <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-3 md:gap-4 justify-start md:justify-center scrollbar-hide px-4">
            <Link
              href="/stories"
              className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 text-xs md:text-base font-bold uppercase tracking-widest whitespace-nowrap transition-all bg-white text-black border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none"
            >
              All Stories
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/stories/category/${cat._id}`}
                className={`inline-flex items-center px-4 py-2 md:px-6 md:py-3 text-xs md:text-base font-bold uppercase tracking-widest whitespace-nowrap transition-all border-2 border-black ${cat._id === id
                  ? 'bg-black text-white shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none'
                  }`}
              >
                {categoryIcons[cat.title] && <span className="mr-2 md:mr-3 text-base md:text-xl">{categoryIcons[cat.title]}</span>}
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Display */}
      <section className="py-16 px-4 bg-brutalBg">
        <div className="container mx-auto max-w-6xl">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                <article key={post._id} className="group flex flex-col h-full bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all duration-300 rounded-2xl overflow-hidden p-6 relative">
                  {post.mainImage && (
                    <Link href={post.slug && post.slug.current ? `/post/${post.slug.current}` : `/post/${post._id}`} className="block overflow-hidden rounded-xl border-2 border-black mb-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                      <div className="aspect-[3/2] relative bg-brutalBlue">
                        <Image
                          src={urlFor(post.mainImage).width(600).height(400).url()}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  )}

                  <div className="flex-1 flex flex-col relative z-10">
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-800 mb-4 border-b-2 border-black pb-3">
                      <span className="font-black text-black bg-brutalYellow px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase tracking-wider text-xs">
                        {post.categories?.[0]?.title || 'News'}
                      </span>
                      <span>•</span>
                      <time className="uppercase tracking-wide">{formatDate(post.publishedAt)}</time>
                    </div>

                    <h2 className="text-2xl font-black text-black mb-4 group-hover:text-primary transition-colors leading-tight uppercase tracking-tight">
                      <Link href={post.slug && post.slug.current ? `/post/${post.slug.current}` : `/post/${post._id}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-gray-800 font-bold line-clamp-3 mb-6 flex-1 text-lg">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-3 mt-auto pt-4 border-t-2 border-black bg-gray-50 -mx-6 -mb-6 px-6 pb-6 pt-6">
                      {post.author?.image && (
                        <Image
                          src={urlFor(post.author.image).width(40).height(40).url()}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="rounded-full border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        />
                      )}
                      <span className="text-sm font-black text-black uppercase tracking-wider">
                        {post.author?.name || 'Sunland Staff'}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border-4 border-black border-dashed rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)]">
              <p className="text-black font-black uppercase tracking-widest text-xl mb-4">No stories found in this category.</p>
              <Link href="/stories" className="inline-flex items-center px-6 py-3 font-bold uppercase tracking-wide whitespace-nowrap transition-all bg-brutalBlue text-white hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] border-2 border-black active:translate-y-[2px] active:translate-x-[2px] active:shadow-none">
                View all stories
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}