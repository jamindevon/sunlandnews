import { getPosts, getCategories } from '../lib/sanityClient';

export default async function sitemap() {
    const baseUrl = 'https://sunlandnews.com';

    // Static pages
    const routes = [
        '',
        '/about',
        '/contact',
        '/stories',
        '/newsletter',
        '/subscribe',
        '/team',
        '/vision',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic posts
    const posts = await getPosts();
    const postRoutes = posts.map((post) => ({
        url: `${baseUrl}/post/${post.slug.current}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    // Dynamic categories
    const categories = await getCategories();
    const categoryRoutes = categories.map((cat) => ({
        url: `${baseUrl}/stories/category/${cat._id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    return [...routes, ...postRoutes, ...categoryRoutes];
}
