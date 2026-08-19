import dotenv from 'dotenv';
import { createClient } from 'next-sanity';
import slugify from 'slugify';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'oj0fldpz',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const story = {
  title: "Main Squeeze: Fort Pierce is reworking its noise ordinance after nearly 2,000 complaints in one year",
  text: `Fort Pierce received 1,954 noise complaints between April 2025 and April 2026, and city staff came to the commission this week with a detailed proposal to fix the ordinance that has been making enforcement difficult 🔊.

The three main problems with the current ordinance: there are no residential sound limits on Sundays between 1 p.m. and 11 p.m., the language is inconsistent with state statutes, and officers are limited in what they can do when the same location keeps violating within a 24 hour window. Most complaints came in on weekend evenings, particularly Sundays between 10 p.m. and 1 a.m.

What staff is recommending:

⏰ Move the end time from 11 p.m. to 10 p.m., or standardize hours to 7 a.m. to 10 p.m. seven days a week
🚨 Add a no warning required clause for severe violations
📋 Create a chronic violator designation for properties with three or more violations in 30 days
🚗 Add standalone restrictions for vehicle music audible from 25 feet or more
💰 Daily penalties up to $500 for unresolved chronic violations

The commission supported moving forward with the changes 📅.

💬 **What do you think about the proposed noise ordinance changes?** [Tell us right here](https://docs.google.com/forms/d/e/1FAIpQLScL6fqyUvKIRGYpvTucQTC_oXrik3Kr6GOeiOQgWi-s7wnDDA/viewform)`
};

function parseMarkdownToPortableText(text) {
  const paragraphs = text.split('\n\n').map(p => p.trim()).filter(Boolean);
  const blocks = [];

  paragraphs.forEach((para, paraIndex) => {
    const lines = para.split('\n').map(l => l.trim()).filter(Boolean);

    lines.forEach((line, lineIdx) => {
      const markDefs = [];
      const children = [];
      let markKeyIndex = 0;

      // Split by **bold** or [linkText](url)
      const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
      const parts = line.split(regex);

      parts.forEach(part => {
        if (!part) return;

        if (part.startsWith('**') && part.endsWith('**')) {
          const content = part.slice(2, -2);
          children.push({
            _type: 'span',
            text: content,
            marks: ['strong']
          });
        } else if (part.startsWith('[') && part.includes('](')) {
          const closingBracketIdx = part.indexOf(']');
          const linkText = part.slice(1, closingBracketIdx);
          const url = part.slice(closingBracketIdx + 2, -1);

          const markKey = `link_${paraIndex}_${lineIdx}_${markKeyIndex++}`;
          markDefs.push({
            _key: markKey,
            _type: 'link',
            href: url
          });

          children.push({
            _type: 'span',
            text: linkText,
            marks: [markKey]
          });
        } else {
          children.push({
            _type: 'span',
            text: part,
            marks: []
          });
        }
      });

      if (children.length === 0) {
        children.push({
          _type: 'span',
          text: line,
          marks: []
        });
      }

      blocks.push({
        _type: 'block',
        style: 'normal',
        markDefs,
        children
      });
    });
  });

  return blocks;
}

async function postNoiseStory() {
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
    console.log(`🏷️ Using Category ID: ${categoryId}`);

    // 3. Upload image asset (share-sunland.png or sunlandnews-logo.png)
    let imageAssetId = null;
    let imagePath = path.join(__dirname, '..', 'public', 'images', 'share-sunland.png');
    if (!fs.existsSync(imagePath)) {
      imagePath = path.join(__dirname, '..', 'public', 'images', 'sunlandnews-logo.png');
    }

    if (fs.existsSync(imagePath)) {
      console.log(`🖼️ Uploading image asset: ${path.basename(imagePath)}...`);
      const fileStream = fs.createReadStream(imagePath);
      const imageAsset = await client.assets.upload('image', fileStream, {
        filename: path.basename(imagePath),
        contentType: imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg'
      });
      imageAssetId = imageAsset._id;
      console.log(`✅ Image asset uploaded: ${imageAssetId}`);
    }

    const slug = slugify(story.title, { lower: true, strict: true });
    const blocks = parseMarkdownToPortableText(story.text);

    const postDoc = {
      _type: 'post',
      title: story.title,
      slug: { _type: 'slug', current: slug },
      author: authorId ? { _type: 'reference', _ref: authorId } : undefined,
      categories: categoryId ? [{ _type: 'reference', _ref: categoryId }] : [],
      publishedAt: new Date().toISOString(),
      body: blocks,
      excerpt: story.text.split('\n')[0].substring(0, 150) + '...',
      mainImage: imageAssetId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId
        }
      } : undefined,
      featured: true
    };

    console.log(`✨ Creating post: "${story.title}"...`);
    const result = await client.create(postDoc);
    console.log(`✅ Success! Post ID: ${result._id}`);
    console.log(`🔗 Post URL: https://sunlandnews.com/post/${slug}`);

  } catch (error) {
    console.error('❌ Error posting story:', error);
  }
}

postNoiseStory();
