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
  title: "Main Squeeze: The Port of Fort Pierce master plan has big ideas for the waterfront and not everyone is on board",
  text: `St. Lucie County commissioners reviewed the Port of Fort Pierce's 2026 Master Plan Tuesday and the proposals are ambitious. Mega-yacht marina, spaceport recovery facility, expanded boat ramps, restaurants and an amphitheater 🚢.

Here is what is being proposed:

**⛵ Harbour Pointe expansion:** The centerpiece of the plan is redeveloping Harbour Pointe into the Treasure Coast's largest boat ramp facility. Right now St. Lucie County has roughly 15,000 registered boats competing for just 147 boat trailer parking spaces within three miles of the Fort Pierce Inlet. The expansion would nearly double boat ramp parking capacity and include a marine commercial district with restaurants, an amphitheater and an education center.

**🚀 Spaceport recovery facility:** The plan also proposes turning the port into a recovery hub for commercial space operations launching out of Kennedy Space Center. The idea is that Port Canaveral is running out of room and Fort Pierce's proximity and deepwater access make it a natural alternative. We wrote about this earlier this year when the draft plan first surfaced.

**🛥️ Museum Pointe mega-yacht marina:** This is where residents pushed back Tuesday. The plan calls for redeveloping Museum Pointe waterfront park with a mega-yacht marina and clubhouse. Fort Pierce resident Sean DeRosa showed up to say it plainly: "There's many places to put marinas, but to block and obstruct that water view, that picnic area, I don't think that's the right spot."

**Worth noting:** The Port of Fort Pierce master plan still needs final approval from Fort Pierce city officials, not the county. Commissioner Clasby acknowledged publicly that there is a lot of confusion out there about what this plan is and what it is not 👀.

**What's next:** The plan remains under review 📅.

💬 **What do you think about the Port of Fort Pierce master plan?** [Tell us right here](https://docs.google.com/forms/d/e/1FAIpQLScL6fqyUvKIRGYpvTucQTC_oXrik3Kr6GOeiOQgWi-s7wnDDA/viewform)`
};

function parseMarkdownToPortableText(text) {
  const paragraphs = text.split('\n\n').map(p => p.trim()).filter(Boolean);
  const blocks = [];

  paragraphs.forEach((para, paraIndex) => {
    const lines = para.split('\n').map(l => l.trim()).filter(Boolean);
    const isBulletList = lines.every(line => line.startsWith('•'));

    if (isBulletList) {
      lines.forEach((line) => {
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

async function postPortStory() {
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

postPortStory();
