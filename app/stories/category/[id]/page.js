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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 border-b border-gray-100">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
            {category && categoryIcons[category.title] && <span>{categoryIcons[category.title]}</span>}
            {category ? category.title : 'Category'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {category?.description || 'Stories and updates from St. Lucie County'}
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-4 border-b border-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-2 justify-center scrollbar-hide">
            <Link
              href="/stories"
              className="px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
            >
              All Stories
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/stories/category/${cat._id}`}
                className={`inline-flex items-center px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${cat._id === id
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                  }`}
              >
                {categoryIcons[cat.title] && <span className="mr-2">{categoryIcons[cat.title]}</span>}
                {cat.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Display */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                <article key={post._id} className="group flex flex-col h-full">
                  {post.mainImage && (
                    <Link href={post.slug && post.slug.current ? `/post/${post.slug.current}` : `/post/${post._id}`} className="block overflow-hidden rounded-2xl mb-6">
                      <div className="aspect-[3/2] relative bg-gray-100">
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

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="font-medium text-primary uppercase tracking-wider text-xs">
                        {post.categories?.[0]?.title || 'News'}
                      </span>
                      <span>•</span>
                      <time>{formatDate(post.publishedAt)}</time>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                      <Link href={post.slug && post.slug.current ? `/post/${post.slug.current}` : `/post/${post._id}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-gray-600 line-clamp-3 mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                      {post.author?.image && (
                        <Image
                          src={urlFor(post.author.image).width(40).height(40).url()}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      )}
                      <span className="text-sm font-medium text-gray-900">
                        {post.author?.name || 'Sunland Staff'}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 text-lg mb-2">No stories found in this category.</p>
              <Link href="/stories" className="text-primary font-medium hover:underline">
                View all stories
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}