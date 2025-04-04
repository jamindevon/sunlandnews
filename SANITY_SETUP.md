# Setting Up Sanity CMS for Sunland News

This guide will help you set up a Sanity Studio instance that connects to your Sunland News Next.js application.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Sanity.io account (free to sign up at [sanity.io](https://www.sanity.io/))

## Getting Started

1. **Create a Sanity project**

   Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project. Take note of your project ID.

2. **Set up environment variables**

   Copy the `.env.local.example` file to `.env.local`:

   ```bash
   cp .env.local.example .env.local
   ```

   Then update the values in `.env.local` with your Sanity project information:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
   ```

3. **Install dependencies**

   Ensure all necessary dependencies are installed:

   ```bash
   npm install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Your Next.js app should now be connected to your Sanity project.

## Setting up the Sanity Studio

To edit your content in Sanity Studio, you can either:

1. **Use the hosted version** at `https://your-project-id.sanity.studio/`

2. **Run it locally** by initializing a studio in a subdirectory:

   ```bash
   npm create sanity@latest -- --template clean --create-project "Sunland News" --dataset production
   ```

   Follow the prompts and then:

   ```bash
   cd studio
   npm run dev
   ```

   The studio will be available at http://localhost:3333.

## Importing Schemas

The schema files are already created in `lib/sanity/schemas/`. You can either:

1. Copy these files to your Sanity studio project
2. Import them directly in your Sanity studio's schema.js file

## Creating Initial Content

In Sanity Studio, you should create:

1. **Categories**: Create a few categories like "News", "Events", "Community", etc.

2. **Authors**: Create at least one author profile with a name, bio, and image.

3. **Posts**: Create several posts, ensuring they have:
   - Title
   - Slug (auto-generated from title)
   - Main image
   - Category references
   - Author reference
   - Published date
   - Body content
   - Mark at least one as "featured" for the homepage

## Deploying

When deploying your Next.js application, ensure your environment variables are set correctly in your hosting provider's configuration.

## Help and Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js with Sanity Guide](https://www.sanity.io/guides/build-your-first-blog-using-next-js)
- [Sanity Exchange](https://www.sanity.io/exchange) 