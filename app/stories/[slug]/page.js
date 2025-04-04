import Link from 'next/link';
import Image from 'next/image';
import { createClient } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';
import { redirect } from 'next/navigation';

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
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Custom components for the PortableText renderer
const components = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value)?.width(800).url();
      if (!imageUrl) return null;
      
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
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

export async function generateMetadata({ params }) {
  const { slug } = params;
  
  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        excerpt
      }`,
      { slug }
    );
    
    return {
      title: post?.title ? `${post.title} - Sunland News` : 'Sunland News',
      description: post?.excerpt || 'Read the latest stories from Sunland News',
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Sunland News',
      description: 'Read the latest stories from Sunland News',
    };
  }
}

export default function StoryRedirect({ params }) {
  // Redirect to the post slug URL pattern
  redirect(`/post/${params.slug}`);
}

export async function generateStaticParams() {
  // Return an empty array since this is just a redirect
  return [];
} 