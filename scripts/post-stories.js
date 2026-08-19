import dotenv from 'dotenv';
import { createClient } from 'next-sanity';
import slugify from 'slugify';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Resolve directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local in the root directory
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'oj0fldpz',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const stories = [
  {
    title: "Lincoln Park Plaza at 13th and Avenue D is officially becoming a municipal park",
    text: `Fort Pierce City Commission voted Monday to designate Lincoln Park Plaza at North 13th Street and Avenue D as a municipal park, bringing official park hours and rules to a corner the city has been talking about tying together for a while now 🌳.

City Manager Richard Chess described it as part of a larger vision for the whole corridor, connecting the Highwaymen Museum, 1230 Avenue D and the plaza into something that could eventually become an entertainment, arts and education destination for the community. The designation also opens up new avenues for grants and development that were not available before.

Not everyone left feeling like this was all good news though. Pastor Pinkie Hendley came to the mic and raised concerns about the unhoused people who currently spend time at that corner. Commissioner Gaines echoed that, saying there needs to be real notice and real services in place before park hours start being enforced, not just people being moved along with nowhere to go. A resident also pointed out during public comment that Fort Pierce still has no intake center, and that services need to come alongside any enforcement.

**What's next:** The city will work on a plan for the corridor and figure out how services for the unhoused get addressed before enforcement kicks in 📅.

💬 **What would you want to see at Lincoln Park Plaza?** [Tell us right here](https://docs.google.com/forms/d/e/1FAIpQLScL6fqyUvKIRGYpvTucQTC_oXrik3Kr6GOeiOQgWi-s7wnDDA/viewform)`
  },
  {
    title: "Moore's Creek is getting a fitness park and Commissioner Johnson made sure you knew about it",
    text: `Fort Pierce City Commission approved $629,711 in federal CDBG funds Monday for a new fit park at Moore's Creek, right at the edge of Lincoln Park and the Peacock Arts District 💪.

Commissioner Johnson pulled this one off the consent agenda specifically so it would not slide through without the public knowing it was happening. The project brings adult and children's exercise equipment, a playground structure and ADA accessible amenities to a spot that already has a walking path and gets regular use from the Moore's Creek Association, especially around the holidays.

It is right next to where the Marine Clean Up Initiative does its creek cleanup work, down the street from the renovated Anastasia Building and just around the corner from where Avenue D is currently being resurfaced. That whole area is moving.

**What's next:** Construction moves forward through the CDBG process 📅.

💬 **Have you spent time at Moore's Creek?** [Tell us right here](https://docs.google.com/forms/d/e/1FAIpQLScL6fqyUvKIRGYpvTucQTC_oXrik3Kr6GOeiOQgWi-s7wnDDA/viewform)`
  },
  {
    title: "Little Jim's has a lot going on and Commissioner Gaines wants a public meeting to clear the air",
    text: `If you have been hearing things about Little Jim's, some of it is probably not true. Commissioner Gaines said so himself Monday night and asked for a dedicated public meeting to lay everything out so the community can hear what is actually happening 🎣.

Here is the background. A citizen named Keene filed a lawsuit against the city over the Little Jim's property. His settlement offer had two conditions. First, that the city resolve all outstanding Florida Department of Environmental Protection violations on the property before any new lease or RFP moves forward. Second, that any future land use decisions involving publicly held waterfront land require a public vote. The commission voted to reject the settlement Monday night. Commissioners said the FDEP issues need to be addressed regardless but the second condition was not something they were willing to agree to.

Commissioner Gaines said he has been hearing rumors that condos are being planned for Little Jim's and that locals are going to be cut off from using the property. He was clear: nobody on the dais agreed to any of that. He said he wants a publicly noticed meeting where everything gets laid out, the FDEP letter, the city's next steps, all of it, so the community is working from facts and not rumors.

**What's next:** Commissioner Gaines is requesting a dedicated public meeting on Little Jim's 📅.

💬 **What do you think should happen with Little Jim's?** [Tell us right here](https://docs.google.com/forms/d/e/1FAIpQLScL6fqyUvKIRGYpvTucQTC_oXrik3Kr6GOeiOQgWi-s7wnDDA/viewform)`
  },
  {
    title: "The waterfront restaurant space at the Fort Pierce City Marina has 60 more days to figure out its next chapter",
    text: `The Fort Pierce City Commission voted Monday to give Winking Starfish LLC, the company behind the former Crabby's waterfront restaurant at the Fort Pierce City Marina, a 60 day extension to bring forward a potential new tenant for the lease 🦀.

Someone has expressed interest in taking over and the city needs time to vet them properly. If nothing comes together in those 60 days the city moves forward with lease termination and figures out what comes next from there.

**What's next:** 60 days on the clock 📅.

💬 **What would you want to see at the Fort Pierce City Marina waterfront restaurant space?** [Tell us right here](https://docs.google.com/forms/d/e/1FAIpQLScL6fqyUvKIRGYpvTucQTC_oXrik3Kr6GOeiOQgWi-s7wnDDA/viewform)`
  }
];

function parseMarkdownToPortableText(text) {
  const paragraphs = text.split('\n\n').map(p => p.trim()).filter(Boolean);
  return paragraphs.map((para, paraIndex) => {
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

    return {
      _type: 'block',
      style: 'normal',
      markDefs,
      children
    };
  });
}

async function postStories() {
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

    // 3. Upload default image if available
    let defaultImageAssetId = null;
    const imagePath = path.join(__dirname, '..', 'public', 'images', 'share-sunland.png');
    if (fs.existsSync(imagePath)) {
      console.log('🖼️ Uploading default image asset...');
      const fileStream = fs.createReadStream(imagePath);
      const imageAsset = await client.assets.upload('image', fileStream, {
        filename: 'share-sunland.png',
        contentType: 'image/png'
      });
      defaultImageAssetId = imageAsset._id;
      console.log(`✅ Default image asset uploaded: ${defaultImageAssetId}`);
    }

    for (const story of stories) {
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
        mainImage: defaultImageAssetId ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: defaultImageAssetId
          }
        } : undefined,
        featured: false
      };

      console.log(`✨ Creating post: "${story.title}"...`);
      const result = await client.create(postDoc);
      console.log(`✅ Success! Post ID: ${result._id}`);
      console.log(`🔗 Post URL: https://sunlandnews.com/post/${slug}\n`);
    }

    console.log('🎉 All stories successfully posted to Sanity!');
  } catch (error) {
    console.error('❌ Error posting stories:', error);
  }
}

postStories();
