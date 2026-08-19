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
  title: "Main Squeeze: The Sunrise Theatre has a new Executive Director",
  text: `The Sunrise Theatre in downtown Fort Pierce has a new leader. Numa Christopher Saisselin officially stepped into the role of Executive Director on July 20th, brought in by VenuWorks, the national venue management company that took over operations of the 1,200 seat historic theatre on June 1st 🎭.

**Who he is 👤:** Saisselin most recently ran the Florida Theatre in Jacksonville, a 1,865 seat 1927 historic venue.

**What he did there 📋:**
• 📈 Grew the organization from $3.1 million to $14 million in annual business
• 💰 Raised $19.5 million in capital funds
• 🏆 Helped make it one of the top five most attended theatres under 2,000 seats in the country
• 🎭 Presented more than 200 events annually with 205,000 in attendance

Before Jacksonville he led the Count Basie Theatre in New Jersey through a similar turnaround, growing that organization from $1.5 million to $8.5 million.

**What is planned for the Sunrise 🎬:** National touring acts, Broadway style entertainment, Latino and urban programming, comedy, children's theatre, private events, weddings and community gatherings. The city retains full ownership of the building under VenuWorks' contract which runs through September 2031.

The Sunrise has been serving Fort Pierce since 1923 and is listed on the National Register of Historic Places 📅.

💬 **What would you like to see at the Sunrise Theatre?** [Tell us right here](https://docs.google.com/forms/d/e/1FAIpQLScL6fqyUvKIRGYpvTucQTC_oXrik3Kr6GOeiOQgWi-s7wnDDA/viewform)`
};

function parseMarkdownToPortableText(text) {
  const paragraphs = text.split('\n\n').map(p => p.trim()).filter(Boolean);
  const blocks = [];

  paragraphs.forEach((para, paraIndex) => {
    // Check if paragraph consists of bullet points (starts with • or contains multiple lines starting with •)
    const lines = para.split('\n').map(l => l.trim()).filter(Boolean);
    const isBulletList = lines.every(line => line.startsWith('•'));

    if (isBulletList) {
      lines.forEach((line, lineIdx) => {
        const lineText = line.replace(/^•\s*/, '');
        blocks.push({
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          markDefs: [],
          children: [{
            _type: 'span',
            text: lineText,
            marks: []
          }]
        });
      });
      return;
    }

    const markDefs = [];
    const children = [];
    let markKeyIndex = 0;

    // Split by **bold** or [linkText](url)
    const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
    const parts = para.split(regex);

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

        const markKey = `link_${paraIndex}_${markKeyIndex++}`;
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
        text: para,
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

  return blocks;
}

async function postSunriseStory() {
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

    // 3. Upload image asset (sunrise logo or share-sunland.png)
    let imageAssetId = null;
    let imagePath = path.join(__dirname, '..', 'public', 'images', 'sunrise logo.png');
    if (!fs.existsSync(imagePath)) {
      imagePath = path.join(__dirname, '..', 'public', 'images', 'share-sunland.png');
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

postSunriseStory();
