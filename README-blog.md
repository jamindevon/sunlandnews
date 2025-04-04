# Sunland Solar Blog Implementation

This README explains how the blog functionality is implemented in the Sunland Solar website using Next.js and Sanity.

## Overview

The blog system consists of:

1. A stories listing page (`/stories`) that displays all blog posts
2. Individual blog post pages using dynamic routes (`/post/[slug]`)
3. Category filtering pages (`/stories/category/[id]`)
4. A redirect from `/stories/[slug]` to `/post/[slug]` for URL consistency
5. Sanity Studio for content management

## File Structure

- `/app/stories/page.jsx` - The stories listing page
- `/app/post/[slug]/page.jsx` - Dynamic page for individual blog posts
- `/app/stories/category/[id]/page.js` - Category filtering page
- `/app/stories/[slug]/page.js` - Redirect to the post URL pattern
- `/lib/sanityClient.js` - Sanity client configuration and helper functions
- `/app/lib/sanity-image.js` - Utility for handling Sanity image URLs
- `/scripts/populate-sample-posts.js` - Script to seed sample blog posts

## URL Structure

- `/stories` - Main blog listing page
- `/post/[slug]` - Individual blog post pages (primary URL pattern)
- `/stories/category/[id]` - Category-filtered blog posts
- `/stories/[slug]` - Redirects to `/post/[slug]` for backward compatibility

## Features

- Responsive grid layout for stories listing
- Dynamic routing for individual posts
- Static generation for improved performance
- Featured image display
- Author information
- Categories
- Rich text content with Portable Text
- Metadata for SEO

## How to Use

### Setting up Sanity Studio

1. Make sure Sanity Studio is configured correctly
2. Configure your schema to include `post`, `author`, and `category` types
3. Set up your environment variables for Sanity connection

### Populating Sample Data

Run the seed script to populate sample blog posts:

```bash
npm run seed
```

Note: This requires a `SANITY_API_TOKEN` environment variable with write permissions.

### Viewing the Blog

1. Start the development server:

```bash
npm run dev
```

2. Access the blog listing at `/stories`
3. Click on any blog post to view the full content at `/post/[slug]`

## Customization

### Styling

- The blog uses Tailwind CSS for styling
- Modify the classes in the JSX files to customize the appearance

### Content Structure

If you need to modify the content structure:

1. Update the Sanity schemas
2. Update the GROQ queries in the page components
3. Update the PortableText components to handle new content types

## Troubleshooting

- If images aren't displaying correctly, check the image URL configuration in `lib/sanityClient.js` or `app/lib/sanity-image.js`
- For issues with content retrieval, check the GROQ queries and make sure they match your schema
- For 404 errors on blog posts, ensure the slug routes are correctly set up in Sanity 