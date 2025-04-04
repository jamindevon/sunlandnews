import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import groq from 'groq';
import { client, urlFor } from '../../../lib/sanityClient';

// Custom components for the PortableText renderer
const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Article image'}
            width={800}
            height={500}
            className="rounded-lg mx-auto"
          />
          {value.caption && (
            <p className="text-gray-500 text-sm text-center mt-2">{value.caption}</p>
          )}
        </div>
      );
    }
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-5">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold my-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold my-3">{children}</h3>,
    normal: ({ children }) => <p className="my-4 text-gray-800">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          target={rel === 'noreferrer noopener' ? '_blank' : undefined}
          className="text-primary underline"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-8 my-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-8 my-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

// Format date for display
function formatDate(dateString) {
  if (!dateString) return '';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export async function generateStaticParams() {
  const slugs = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  
  const post = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt
    }`,
    { slug }
  );
  
  return {
    title: post?.title || 'Post',
    description: post?.excerpt || 'Post details',
  };
}

// This query includes projections for author and categories
const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "authorImage": author->image,
  "categories": categories[]->title,
  publishedAt,
  mainImage,
  body
}`;

export default async function Post({ params }) {
  const { slug } = params;
  const post = await client.fetch(query, { slug });
  
  if (!post) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-gray-800">Post not found</h1>
        <p className="mt-4 mb-8">The post you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/stories"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Back to all stories
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      
      {/* Author and Date */}
      <div className="flex items-center mb-6">
        {post.authorImage && (
          <div className="mr-3">
            <Image
              src={urlFor(post.authorImage).width(60).height(60).url()}
              alt={post.name || 'Author'}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        )}
        <div>
          <p className="font-medium">By {post.name || 'Unknown Author'}</p>
          <p className="text-sm text-gray-500">{formatDate(post.publishedAt)}</p>
        </div>
      </div>
      
      {/* Categories */}
      {post.categories && post.categories.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Posted in:
            <span className="flex space-x-2 mt-1">
              {post.categories.map((category) => (
                <span key={category} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {category}
                </span>
              ))}
            </span>
          </p>
        </div>
      )}
      
      {/* Main Image */}
      {post.mainImage && (
        <div className="mb-8">
          <Image
            src={urlFor(post.mainImage).width(1200).url()}
            alt={post.title}
            width={800}
            height={450}
            className="rounded-lg w-full"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="prose max-w-none">
        <PortableText value={post.body} components={ptComponents} />
      </div>
      
      {/* Navigation */}
      <div className="mt-12 border-t pt-6">
        <Link 
          href="/stories"
          className="text-blue-500 hover:underline flex items-center"
        >
          ← Back to all stories
        </Link>
      </div>
    </article>
  );
} 