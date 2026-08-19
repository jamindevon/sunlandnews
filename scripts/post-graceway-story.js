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
  title: "Main Squeeze: Fort Pierce just approved a family shelter community on Hartman Road",
  text: `The Fort Pierce City Commission voted unanimously August 3rd to approve GraceWay Village's plan to build a 36 unit temporary housing community on Hartman Road, right next to the nonprofit's existing cafe and clothing boutique 🏘️.

**What is being built:**
🏠 36 temporary dwelling units across three phases on 7.84 acres
📐 Each unit roughly 990 square feet
🌳 73% of the site left as open space
🏗️ Phase 1 starts with 10 units and support facilities

**How it works:** GraceWay Village CEO Chrystal Netherton described it plainly at the Planning Board meeting last month. "The first day of coming to GraceWay Village, we are talking about your exit strategy to get into your own permanent housing. This really is an opportunity for this family to be self-sufficient. Many of them might only need a three-month stay with us."

**Worth noting:** The Planning Board recommended approval unanimously on July 13th. No member of the public came forward to oppose it at either meeting. Commissioner Broderick put it simply: "If it was our job to just sit up here and rate the application based on need in the community, this would receive 110 percent approval."

**What's next:** Construction moves forward in three phases 📅.

💬 **What do you think about GraceWay Village expanding in Fort Pierce?** [Tell us right here](https://docs.google.com/forms/d/e/1FAIpQLScL6fqyUvKIRGYpvTucQTC_oXrik3Kr6GOeiOQgWi-s7wnDDA.viewform)`
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

async function postGraceWayStory() {
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

    // 3. Upload default image asset
    let imageAssetId = null;
    const imagePath = path.join(__dirname, '..', 'public', 'images', 'share-sunland.png');

    if (fs.existsSync(imagePath)) {
      console.log(`🖼️ Uploading image asset: ${path.basename(imagePath)}...`);
      const fileStream = fs.createReadStream(imagePath);
      const imageAsset = await client.assets.upload('image', fileStream, {
        filename: path.basename(imagePath),
        contentType: 'image/png'
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

postGraceWayStory();
