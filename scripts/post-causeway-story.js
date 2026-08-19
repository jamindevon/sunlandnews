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
  title: "Main Squeeze: Causeway Cove, Part One: Setting the stage on the biggest development story in Fort Pierce",
  text: `I have been hesitant to write about this one because I want to get it right. Causeway Cove is a big deal and this is the first in what will be a longer series of reporting on exactly what is happening, what has happened and what the city's options are going forward. Consider this the primer 🏗️.

**What is Causeway Cove:** A proposed development at 601 Seaway Drive on Fort Pierce's barrier island. Five buildings, one reaching 17 stories. 913 residential units, two hotels totaling 407 rooms, 72,000 square feet of retail and 218 marina slips. It is moving forward under the [Live Local Act](https://flhousing.org/live-local-act/), a [state law passed in 2023](https://www.flsenate.gov/Session/Bill/2023/102) that allows developers to bypass local zoning when at least 40 percent of units are designated affordable housing. That means the Fort Pierce City Commission does not get a vote on whether this happens.

**What happened August 3rd:** State Representative Dana Trabulsy showed up to the Fort Pierce City Commission meeting to give her legislative update and then turned her attention directly to Causeway Cove. Before we get into what she said, something has to be stated clearly. [Representative Trabulsy voted yes on the Live Local Act in 2023](https://www.flsenate.gov/Session/Bill/2023/102). The bill passed the House 103 to 6.

With that stated, here is what she said. After reviewing the project against the city's land development regulations, comprehensive plan and the Live Local Act itself, Trabulsy told commissioners she believes Causeway Cove is not in compliance. Her argument centers on a specific and significant detail: the site contains approximately 18 acres of uplands and 24 acres of submerged land. The city's zoning map shows the entire 42 acre parcel coded as C-5 Tourist Commercial. But the submerged lands, she argued, are still in the A-2 Aquatic Development zoning district and therefore not covered by the Live Local Act. If that is correct, the density calculation the developer is using would be significantly limited.

She called it a scrivener's error on the city's GIS map and made a direct recommendation: the city should either administratively rescind the project approval or bring an appeal, and should hire outside legal counsel with expertise specifically in land use law and the Live Local Act to represent the city's interests.

"I'm not against this project," she said. "I'm only against the size of this project."

Commissioner Dzadovsky echoed concerns from his own research, pointing out that the median income calculation used to determine affordability is shared across the Port St. Lucie MSA, meaning Fort Pierce, where average rents run $1,200 to $1,900, is being lumped in with Port St. Lucie where they run $2,600 or higher. Under that calculation a unit could qualify as affordable in the MSA while being completely out of reach for most Fort Pierce residents.

[At Monday's meeting Commissioner Gaines spoke to the tension between state statute and local control, while Commissioner Broderick spoke to the will of the people.](https://www.facebook.com/share/v/1GaCVGzeTv/) Both reflect where much of this commission is on the project.

**What's next:** A special meeting has been set for September 14th where the commission will take up Causeway Cove, hear public comment and make decisions about next steps 📅.

There is a lot more to this story. We are just getting started.

💬 **What do you think about Causeway Cove?** [Tell us right here](https://docs.google.com/forms/d/e/1FAIpQLScL6fqyUvKIRGYpvTucQTC_oXrik3Kr6GOeiOQgWi-s7wnDDA/viewform)`
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

async function postCausewayStory() {
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

postCausewayStory();
