import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import groq from 'groq';
import { client, urlFor } from '../../../lib/sanityClient';

// Newsletter subscription component for article pages (client component)
import NewsletterPrompt from './NewsletterPrompt';

// Social sharing component
function ShareButton({ platform, url, title }) {
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  };

  const platformStyles = {
    facebook: 'bg-blue-600 hover:bg-blue-700 text-white',
    twitter: 'bg-sky-500 hover:bg-sky-600 text-white',
    linkedin: 'bg-blue-700 hover:bg-blue-800 text-white',
    reddit: 'bg-orange-600 hover:bg-orange-700 text-white',
  };

  const platformIcons = {
    facebook: 'f',
    twitter: '🐦',
    linkedin: 'in',
    reddit: 'r',
  };

  return (
    <a
      href={shareUrls[platform]}
      target="_blank"
      rel="noopener noreferrer"
      className={`${platformStyles[platform]} px-4 py-2 rounded-lg font-medium text-sm transition-colors inline-flex items-center gap-2`}
    >
      <span className="font-bold">{platformIcons[platform]}</span>
      {platform.charAt(0).toUpperCase() + platform.slice(1)}
    </a>
  );
}

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

// Component to render article content with newsletter prompt injected
function ArticleContent({ body }) {
  // Count paragraphs to determine when to show newsletter prompt
  const paragraphCount = body?.filter(block => block._type === 'block' && block.style === 'normal')?.length || 0;
  const midPoint = Math.floor(paragraphCount / 2);
  let currentParagraph = 0;
  
  const componentsWithPrompt = {
    ...ptComponents,
    block: {
      ...ptComponents.block,
      normal: ({ children }) => {
        currentParagraph++;
        const shouldShowPrompt = currentParagraph === midPoint && paragraphCount > 3;
        
        return (
          <>
            <p className="my-4 text-gray-800">{children}</p>
            {shouldShowPrompt && <NewsletterPrompt />}
          </>
        );
      },
    },
  };
  
  return (
    <div className="prose max-w-none">
      <PortableText value={body} components={componentsWithPrompt} />
    </div>
  );
}

// Format date for display
function formatDate(dateString) {
  if (!dateString) return '';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Enable more frequent revalidation for post content
export const revalidate = 30; // Revalidate every 30 seconds

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
      excerpt,
      mainImage,
      publishedAt,
      "authorName": author->name
    }`,
    { slug }
  );
  
  if (!post) {
    return {
      title: 'Post Not Found - Sunland News',
      description: 'The requested story could not be found.',
    };
  }

  const title = `${post.title} - Sunland News`;
  const description = post.excerpt || `Read this story from Sunland News about ${post.title}`;
  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : 'https://sunlandnews.com/images/share-sunland.png'; // fallback image
  const url = `https://sunlandnews.com/post/${slug}`;
  
  return {
    title,
    description,
    authors: post.authorName ? [{ name: post.authorName }] : undefined,
    publishedTime: post.publishedAt,
    
    // Open Graph tags for Facebook, LinkedIn, etc.
    openGraph: {
      title,
      description,
      url,
      siteName: 'Sunland News',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.authorName ? [post.authorName] : undefined,
    },
    
    // Twitter Card tags
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@sunlandnews', // Update with your actual Twitter handle
      site: '@sunlandnews',
    },
    
    // Additional meta tags
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
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
          <p className="text-sm text-gray-600 mb-1">
            Posted in:
          </p>
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span key={category} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                {category}
              </span>
            ))}
          </div>
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
      <ArticleContent body={post.body} />
      
      {/* Social Sharing */}
      <div className="mt-12 border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Share this story</h3>
        <div className="flex flex-wrap gap-3 mb-6">
          <ShareButton
            platform="facebook"
            url={`https://sunlandnews.com/post/${slug}`}
            title={post.title}
          />
          <ShareButton
            platform="twitter"
            url={`https://sunlandnews.com/post/${slug}`}
            title={post.title}
          />
          <ShareButton
            platform="linkedin"
            url={`https://sunlandnews.com/post/${slug}`}
            title={post.title}
          />
          <ShareButton
            platform="reddit"
            url={`https://sunlandnews.com/post/${slug}`}
            title={post.title}
          />
        </div>
        
        {/* Navigation */}
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