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
  title: "🟠 Main Squeeze: A conversation with Numa Saisselin, the new Executive Director of the Sunrise Theatre",
  text: `🎥 **Watch the full video interview on Patreon:** [Sunrise Theatre Executive Director Numa Saisselin Interview](https://www.patreon.com/SunlandCo/posts/sunrise-theatre-167008657?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=postshare_creator&utm_content=join_link)

Numa Saisselin started work at the Sunrise Theatre on July 20th. By the time we sat down to talk it was his third week on the job. He was a little dazed, he admitted, but also excited. This is his fifth organisation and his fourth historic theatre 🎭.

He grew up on the north shore of Long Island in Huntington, a town he describes as unusually cultural for its size. There was a symphony. An equity theatre. An outdoor amphitheatre with a summer concert series where he worked during college. He did not realise until he left that not everyone grows up with that. He went to the University of South Florida, spent time in New Jersey running the Count Basie Theatre and then 13 years in Jacksonville running the Florida Theatre, where he grew the organisation from $3.1 million to $14 million in annual business. When this job came across his radar he was looking for his next chapter and hoping it would be another historic theatre.

**Why historic theatres:** He made a distinction that stayed with me. "It's a historic theatre, but it's not a historic site. George Washington didn't sleep here. What's important here and what brings people here is what's on our stage. And that changes all the time." He pointed out that the Sunrise opened in 1923 during the silent film era, built with a full stage that now accommodates modern jazz, hip hop, rock and roll and musical theatre. A hundred years of evolution and the building still works. He expects that will be true a hundred years from now for things that do not exist yet.

**What he found when he arrived:** The building has infrastructure. It has staff. It has history on the walls. What it has been missing for the last two years while the city went through the process of selecting a management company is someone pressing the accelerator. "We are now going to actively be going out seeking talent, crunching numbers, making deals and bringing people to Fort Pierce to perform for us."

**The programming vision:** His formula from Jacksonville was simple and he plans to bring it here. Great programming, marketed aggressively, delivered with great customer service. He wants a more diverse calendar that serves all corners of the community, whether you live on the island or the west side or you are driving down from Daytona to see your favourite act. He referenced Ali Siddiq selling out two nights at the Sunrise Theatre as an example of what this room can do. Expect more of that calibre and more variety.

**On where the Sunrise Theatre fits geographically:** He was direct. The Kravis Center is an hour south. The King Center is an hour north. The Lyric in Stuart is nearby but smaller. For a 1,200 seat show, this is the room on the Treasure Coast. "If you want to see Taylor Swift you are going to Orlando. If you want to see a 1,200 seat act, you can come here."

**The Black Box Theatre:** He is excited about the flexibility of a 300 seat configurable space that opens the building up to a much wider universe of users than the main stage alone. He wants more jazz, more comedy, modern dance up close. And he broke news during our conversation: a Halloween haunted house is coming to the Black Box Theatre the last week of October, using local actors, with the hope of making it an annual tradition.

**On being part of the community, not just asking from it:** One of the things he said that I found most interesting was his take on how arts organisations often approach the business community. He described a common pattern of showing up with a hand out, and said he wants to flip that. "We are a business in the downtown economy. We are not here just to ask for help. We are here to provide help." If you have a charity fundraiser and need tickets to raffle, he will provide them. If you need signed memorabilia for an auction, he will get it. He sees it as a two way street.

**On Ticketmaster:** When VenuWorks was hired, Ticketmaster came with it. He was clear about what that means practically. Ticketmaster is a platform, essentially a modern version of the old ticket printer. The fees are real and unavoidable anywhere you buy tickets online these days. But if you want to avoid them, the box office on Second Street is still open. Walk up, talk to someone, pick your seat. He also flagged something worth knowing: if you Google an act and Fort Pierce, the first results are often fraudulent resale sites. Go directly to [sunrisetheatre.com](https://sunrisetheatre.com/) and buy from there.

**What is coming:** The new season was announced August 10th starting with members and then rolling out publicly via email. New show announcements will drop every Monday. The Sunrise Theatre is moving toward a 12 month calendar, no more going dark in summer. Get on the email list at [sunrisetheatre.com](https://sunrisetheatre.com/) and stay tuned.

💬 **What would you like to see come to the Sunrise Theatre?** [Tell us right here](https://docs.google.com/forms/d/e/1FAIpQLScL6fqyUvKIRGYpvTucQTC_oXrik3Kr6GOeiOQgWi-s7wnDDA/viewform)`
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

async function postSunriseInterviewStory() {
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

    // 3. Upload thumbnail image asset requested by user
    let imageAssetId = null;
    const imagePath = path.join(__dirname, '..', 'public', 'images', 'sunrise-thumbnail.png');

    if (fs.existsSync(imagePath)) {
      console.log(`🖼️ Uploading image asset: ${path.basename(imagePath)}...`);
      const fileStream = fs.createReadStream(imagePath);
      const imageAsset = await client.assets.upload('image', fileStream, {
        filename: path.basename(imagePath),
        contentType: 'image/png'
      });
      imageAssetId = imageAsset._id;
      console.log(`✅ Image asset uploaded: ${imageAssetId}`);
    } else {
      console.log(`⚠️ Warning: ${imagePath} not found!`);
    }

    const slug = slugify(story.title.replace(/[^a-zA-Z0-9\s-]/g, ''), { lower: true, strict: true });
    const blocks = parseMarkdownToPortableText(story.text);

    // Extract excerpt
    const lines = story.text.split('\n\n').filter(l => !l.startsWith('🎥'));
    const excerptText = (lines[0] || '').substring(0, 150) + '...';

    // Check for existing post by slug
    const existingPostId = await client.fetch('*[_type == "post" && slug.current == $slug][0]._id', { slug });

    const postDoc = {
      _type: 'post',
      title: story.title,
      slug: { _type: 'slug', current: slug },
      author: authorId ? { _type: 'reference', _ref: authorId } : undefined,
      categories: categoryId ? [{ _type: 'reference', _ref: categoryId }] : [],
      publishedAt: new Date().toISOString(),
      body: blocks,
      excerpt: excerptText,
      mainImage: imageAssetId ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId
        }
      } : undefined,
      featured: true
    };

    if (existingPostId) {
      console.log(`🔄 Updating existing post (ID: ${existingPostId})...`);
      await client.patch(existingPostId).set(postDoc).commit();
      console.log(`✅ Success! Updated post ID: ${existingPostId}`);
    } else {
      console.log(`✨ Creating post: "${story.title}"...`);
      const result = await client.create(postDoc);
      console.log(`✅ Success! Post ID: ${result._id}`);
    }
    console.log(`🔗 Post URL: https://sunlandnews.com/post/${slug}`);

  } catch (error) {
    console.error('❌ Error posting story:', error);
  }
}

postSunriseInterviewStory();
