import dotenv from 'dotenv';
import { createClient } from 'next-sanity';
import path from 'path';
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

const postId = 'XhVMHwF42u2Zucqd4RjlGj';
const newTitle = "Main Squeeze: The Port of Fort Pierce master plan has big ideas for the waterfront";

const text = `St. Lucie County commissioners reviewed the Port of Fort Pierce's 2026 Master Plan Tuesday and the proposals are ambitious. Mega-yacht marina, spaceport recovery facility, expanded boat ramps, restaurants and an amphitheater 🚢.

Here is what is being proposed:

**⛵ Harbour Pointe expansion:** The centerpiece of the plan is redeveloping Harbour Pointe into the Treasure Coast's largest boat ramp facility. Right now St. Lucie County has roughly 15,000 registered boats competing for just 147 boat trailer parking spaces within three miles of the Fort Pierce Inlet. The expansion would nearly double boat ramp parking capacity and include a marine commercial district with restaurants, an amphitheater and an education center.

**🚀 Spaceport recovery facility:** The plan also proposes turning the port into a recovery hub for commercial space operations launching out of Kennedy Space Center. The idea is that Port Canaveral is running out of room and Fort Pierce's proximity and deepwater access make it a natural alternative. We wrote about this earlier this year when the draft plan first surfaced.

**🛥️ Museum Pointe mega-yacht marina:** The plan calls for redeveloping Museum Pointe waterfront park with a mega-yacht marina and clubhouse. The proposal has drawn public concern about obstructing the waterfront views and picnic area that residents currently enjoy.

**Worth noting:** The Port of Fort Pierce master plan still needs final approval from Fort Pierce city officials, not the county. Commissioner Clasby acknowledged publicly that there is a lot of confusion out there about what this plan is and what it is not 👀.

**What's next:** The plan remains under review 📅.

💬 **What do you think about the Port of Fort Pierce master plan?** [Tell us right here](https://docs.google.com/forms/d/e/1FAIpQLScL6fqyUvKIRGYpvTucQTC_oXrik3Kr6GOeiOQgWi-s7wnDDA/viewform)`;

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

async function updatePortStory() {
  try {
    console.log(`🔌 Fetching post ${postId}...`);
    const doc = await client.getDocument(postId);
    if (!doc) {
      console.error(`❌ Post ${postId} not found!`);
      return;
    }

    console.log(`Current post title: "${doc.title}"`);
    console.log(`Current post slug: "${doc.slug?.current}"`);

    const blocks = parseMarkdownToPortableText(text);

    console.log(`✏️ Updating post ${postId}...`);
    const updatedDoc = await client
      .patch(postId)
      .set({
        title: newTitle,
        body: blocks,
        excerpt: text.split('\n')[0].substring(0, 150) + '...'
      })
      .commit();

    console.log(`✅ Success! Updated post ID: ${updatedDoc._id}`);
    console.log(`🔗 Post URL remains: https://sunlandnews.com/post/${doc.slug?.current}`);

  } catch (error) {
    console.error('❌ Error updating story:', error);
  }
}

updatePortStory();
