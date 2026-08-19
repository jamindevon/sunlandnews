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
  title: "Main Squeeze: St. Lucie County is putting the half cent sales tax renewal on the November ballot",
  text: `After weeks of back and forth, St. Lucie County commissioners voted Tuesday to move forward with placing the half cent infrastructure sales tax renewal on the November ballot, one day before the August 5th deadline to do so 🗳️.

[We covered this story closely last week](https://www.sunlandnews.com/) when the county and Port St. Lucie were publicly at odds over the timing. The county had previously split evenly on the question, with some commissioners worried that putting a sales tax question on the same ballot as statewide property tax reform could hurt its chances with voters.

Commissioner Clasby stuck to his concerns Tuesday. "It makes no sense at all that we'd have so many tax items on one ballot. The discussions I've had since our previous meeting, everybody basically has said I don't care what it's going to fund, I'm going to vote against it." He added that if it fails he has no interest in running it again in 2028.

Commissioner Townsend pushed back on that. "Two chances are better than one. If we put it out for 2026 and it doesn't pass, we have another opportunity." She pointed to how the original 2018 tax passed on a second attempt after the county reworked the language and did more public education.

Commissioner Leet, who was absent at the previous meeting that caused the split, said he shares Clasby's doubts about its chances this year but voted to put it on the ballot anyway. "There's two years in the meantime, and we have two years to educate the public to realize what this potential loss is if this doesn't pass."

Worth noting: if the measure fails in November the county attorney confirmed it can go back on the ballot in 2028 but would have to be presented as a new tax rather than a renewal 👀.

The half cent sales tax has funded road resurfacing, sidewalks, drainage improvements and major corridor projects across the county since voters approved it in 2018. It is set to expire in 2028.

**What's next:** The measure goes before voters November 3rd and only needs 50% plus one to pass 📅.

💬 **Will you vote yes on the half cent sales tax renewal?** [Tell us right here](https://docs.google.com/forms/d/e/1FAIpQLScL6fqyUvKIRGYpvTucQTC_oXrik3Kr6GOeiOQgWi-s7wnDDA/viewform)`
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

async function postTaxStory() {
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

postTaxStory();
