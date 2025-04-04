# Sunland News - Next.js Frontend

A modern, responsive frontend for the Sunland News website built with Next.js and Tailwind CSS, using Sanity as a headless CMS.

## Features

- Modern and minimal design with responsive layouts
- Integration with Sanity as a headless CMS
- Server-side rendering for improved SEO
- Fast page loads with optimized images
- Mobile-friendly user interface
- Blog functionality with categories and pagination
- Newsletter subscription forms

## Prerequisites

- Node.js 18.x or higher
- A Sanity.io account (free tier available)

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd sunland-news-nextjs
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Sanity CMS by following the instructions in [SANITY_SETUP.md](SANITY_SETUP.md)

4. Create a `.env.local` file in the root directory with the following content:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Build and Deployment

To build the application for production:

```
npm run build
```

To start the production server:

```
npm start
```

## Project Structure

```
/app                    # Next.js app router
  /api                  # API routes
    /sanity             # Sanity API routes
  /blog                 # Blog page and components
  /post                 # Individual post display
  /components           # Reusable components (Header, Footer, etc.)
  /services             # API services
  page.js               # Homepage
  layout.js             # Root layout with header and footer
/lib                    # Library code
  /sanity               # Sanity configuration and schemas
    /schemas            # Content schemas for Sanity
  sanityClient.js       # Sanity client and helper functions
```

## Sanity CMS Integration

This application connects to Sanity CMS using the Sanity client. The integration is implemented in the following files:

- `lib/sanityClient.js` - Sanity client configuration and helper functions
- `lib/sanity/schemas/` - Sanity content schemas
- `app/api/sanity/route.js` - API route to proxy Sanity API requests

For more detailed instructions on setting up and using Sanity, refer to [SANITY_SETUP.md](SANITY_SETUP.md).

## Customization

### Primary Color

The primary color (orange: #f88600) can be modified in the `tailwind.config.js` file:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#f88600", // Change this value to update the primary color
      },
    },
  },
};
```

## Improvements Over Previous Version

- Migrated from WordPress to Sanity CMS for better content management
- Server-side rendering for better SEO
- API routes to handle data fetching
- Better image optimization
- Improved routing with Next.js App Router
- Better handling of dynamic routes
- Cleaner code organization 