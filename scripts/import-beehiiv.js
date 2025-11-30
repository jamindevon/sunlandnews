
const Parser = require('rss-parser');
const { createClient } = require('@sanity/client');
const slugify = require('slugify');

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const parser = new Parser();

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID || 'oj0fldpz',
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: '2023-05-03',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

const RSS_URL = 'https://rss.beehiiv.com/feeds/hyCELI0tNT.xml';

async function importStories() {
    try {
        console.log('🔌 Connecting to Sanity...');

        // 1. Get Author (Ja'Min)
        const authorQuery = '*[_type == "author" && name match "Ja\'Min"][0]._id';
        let authorId = await client.fetch(authorQuery);

        if (!authorId) {
            console.log('⚠️ Author "Ja\'Min" not found. Using first available author.');
            const firstAuthor = await client.fetch('*[_type == "author"][0]._id');
            authorId = firstAuthor;
        }
        console.log(`👤 Using Author ID: ${authorId}`);

        // 2. Get Category (News)
        const categoryQuery = '*[_type == "category" && title match "News"][0]._id';
        let categoryId = await client.fetch(categoryQuery);

        if (!categoryId) {
            console.log('⚠️ Category "News" not found. Creating it...');
            const newCat = await client.create({
                _type: 'category',
                title: 'News',
                description: 'Local news and updates'
            });
            categoryId = newCat._id;
        }
        console.log(`wm Using Category ID: ${categoryId}`);

        // 3. Fetch RSS
        console.log(`📡 Fetching RSS feed from ${RSS_URL}...`);
        const feed = await parser.parseURL(RSS_URL);

        console.log(`📝 Found ${feed.items.length} items in feed.`);

        let importedCount = 0;

        // Process items (limit to last 20 to avoid overwhelming)
        for (const item of feed.items.slice(0, 20)) {
            // Look for "Main Squeeze" in content
            // The content in RSS is usually in item.content or item['content:encoded']
            const content = item['content:encoded'] || item.content;

            if (!content) continue;

            // Regex to find the Main Squeeze section
            // Matches: ### [Emoji] Main Squeeze: [Title] ... content ... until next ### or end
            const mainSqueezeRegex = /###\s*(?:.*?)Main Squeeze:\s*(.*?)\n([\s\S]*?)(?=(?:###|$))/i;
            const match = content.match(mainSqueezeRegex);

            if (match) {
                const rawTitle = match[1].trim();
                const rawBody = match[2].trim();

                // Clean up title (remove any trailing emojis or weird chars if needed)
                const title = rawTitle;

                // Generate slug
                const slug = slugify(title, { lower: true, strict: true });

                // Check if exists
                const existing = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });

                if (existing) {
                    console.log(`⏭️  Skipping existing: ${title}`);
                    continue;
                }

                console.log(`✨ Importing: ${title}`);

                // Convert HTML body to Portable Text (Simplified: just wrapping paragraphs)
                // For a robust solution, we'd use a html-to-portable-text library, 
                // but for now, let's try to do a basic split by newlines for paragraphs.
                // Since Sanity expects blocks.

                const blocks = rawBody.split('\n\n').map(para => {
                    // Basic cleanup of markdown links to plain text if needed, 
                    // but let's just make them normal paragraphs for now.
                    // If the content has HTML, we might want to strip tags or use a proper parser.
                    // Beehiiv RSS usually has Markdown-like or HTML. 
                    // Let's assume it's text for now to be safe.
                    return {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: para.replace(/<[^>]*>?/gm, '') }] // Strip HTML tags
                    };
                }).filter(b => b.children[0].text.trim().length > 0);

                // Create Post
                await client.create({
                    _type: 'post',
                    title: title,
                    slug: { _type: 'slug', current: slug },
                    author: { _type: 'reference', _ref: authorId },
                    categories: [{ _type: 'reference', _ref: categoryId }],
                    publishedAt: new Date(item.pubDate).toISOString(),
                    body: blocks,
                    excerpt: blocks[0]?.children[0]?.text.substring(0, 150) + '...',
                    // Use a default image or try to extract one from content? 
                    // For now, leave image blank or use a placeholder if you want.
                });

                importedCount++;
            }
        }

        console.log(`✅ Import complete! Imported ${importedCount} new stories.`);

    } catch (error) {
        console.error('❌ Error importing stories:', error);
    }
}

importStories();
