// This script can be used to populate sample posts in your Sanity studio
// Run it with: npm run seed

// Since we're using ES modules, we need a package.json in the scripts folder
// or use the --experimental-json-modules flag when running the script

import { createClient } from 'next-sanity';

// Configure the client manually here to avoid issues with ES modules
const client = createClient({
  projectId: 'oj0fldpz',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Sample posts data
const samplePosts = [
  {
    _type: 'post',
    title: 'The Future of Solar Energy in Urban Settings',
    slug: {
      _type: 'slug',
      current: 'future-of-solar-urban-settings'
    },
    excerpt: 'Exploring how solar energy solutions are being integrated into city infrastructure and urban planning for a sustainable future.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'As cities continue to grow and energy demands rise, solar energy offers a clean, sustainable solution to urban energy needs. This article explores the innovative ways solar is being integrated into city life.',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'h2',
        _key: 'heading1',
        children: [
          {
            _type: 'span',
            _key: 'heading1-span',
            text: 'Building-Integrated Photovoltaics',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        _key: 'paragraph1',
        children: [
          {
            _type: 'span',
            _key: 'paragraph1-span',
            text: 'One of the most exciting developments in urban solar is building-integrated photovoltaics (BIPV). These systems incorporate solar cells directly into building materials, from windows to facades, generating electricity while serving their traditional functions.',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'h2',
        _key: 'heading2',
        children: [
          {
            _type: 'span',
            _key: 'heading2-span',
            text: 'Community Solar Projects',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        _key: 'paragraph2',
        children: [
          {
            _type: 'span',
            _key: 'paragraph2-span',
            text: 'Community solar projects allow urban residents who cannot install their own solar panels to participate in renewable energy. These shared systems provide clean energy and cost savings to multiple households or businesses.',
            marks: []
          }
        ],
        markDefs: []
      }
    ],
    publishedAt: new Date().toISOString(),
    featured: true
  },
  {
    _type: 'post',
    title: 'Understanding Solar Panel Efficiency',
    slug: {
      _type: 'slug',
      current: 'understanding-solar-panel-efficiency'
    },
    excerpt: 'A deep dive into what makes solar panels efficient and how technological advances are improving energy production.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'Solar panel efficiency is a critical factor in determining how much electricity your system will generate. This article explains what affects efficiency and how recent innovations are pushing the boundaries.',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'h2',
        _key: 'heading1',
        children: [
          {
            _type: 'span',
            _key: 'heading1-span',
            text: 'What Determines Efficiency?',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        _key: 'paragraph1',
        children: [
          {
            _type: 'span',
            _key: 'paragraph1-span',
            text: 'Solar panel efficiency is measured by how much sunlight a panel can convert into usable electricity. Factors affecting efficiency include the type of solar cells used, panel design, installation angle, and environmental conditions like temperature and shading.',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'h2',
        _key: 'heading2',
        children: [
          {
            _type: 'span',
            _key: 'heading2-span',
            text: 'Breakthrough Technologies',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        _key: 'paragraph2',
        children: [
          {
            _type: 'span',
            _key: 'paragraph2-span',
            text: 'Recent advances in solar technology, such as perovskite cells, bifacial panels, and multi-junction cells, are significantly increasing conversion rates. These innovations promise to make solar energy even more competitive with traditional power sources.',
            marks: []
          }
        ],
        markDefs: []
      }
    ],
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    featured: false
  },
  {
    _type: 'post',
    title: 'Solar Incentives and Tax Credits: What Homeowners Need to Know',
    slug: {
      _type: 'slug',
      current: 'solar-incentives-tax-credits'
    },
    excerpt: 'Navigate the financial benefits of going solar with this comprehensive guide to available incentives, rebates, and tax credits.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro',
        children: [
          {
            _type: 'span',
            _key: 'intro-span',
            text: 'Going solar isn\'t just good for the environment—it can be great for your finances too. This guide breaks down the various incentives available to homeowners considering solar installation.',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'h2',
        _key: 'heading1',
        children: [
          {
            _type: 'span',
            _key: 'heading1-span',
            text: 'Federal Tax Credits',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        _key: 'paragraph1',
        children: [
          {
            _type: 'span',
            _key: 'paragraph1-span',
            text: 'The federal solar investment tax credit (ITC) allows homeowners to deduct a significant percentage of their solar costs from their taxes. Currently, the ITC offers a 30% credit for systems installed before the end of 2032.',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'h2',
        _key: 'heading2',
        children: [
          {
            _type: 'span',
            _key: 'heading2-span',
            text: 'State and Local Incentives',
            marks: []
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        _key: 'paragraph2',
        children: [
          {
            _type: 'span',
            _key: 'paragraph2-span',
            text: 'Beyond federal incentives, many states, counties, and utilities offer additional rebates, tax exemptions, and performance-based incentives. These can significantly reduce the upfront costs and improve the return on investment for solar systems.',
            marks: []
          }
        ],
        markDefs: []
      }
    ],
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    featured: true
  }
];

// Function to create a category
async function createCategory(title, description) {
  return client.create({
    _type: 'category',
    title,
    description
  });
}

// Function to create a new author
async function createAuthor() {
  return client.create({
    _type: 'author',
    name: 'John Smith',
    bio: 'Solar energy enthusiast and technical writer with 10+ years of experience in the renewable energy sector.',
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-595ee82eada31ee3f52bbe2e06513e49e0f57e92-1200x800-jpg'
      }
    }
  });
}

// Main function to populate data
async function populateSampleData() {
  try {
    console.log('Creating sample data in Sanity...');
    
    // Create categories
    console.log('Creating categories...');
    const solarNewsCategory = await createCategory('Solar News', 'Latest updates in the solar industry');
    const sustainabilityCategory = await createCategory('Sustainability', 'Topics on sustainable living and renewable energy');
    const technologyCategory = await createCategory('Technology', 'Innovations and technology in the solar sector');
    
    console.log('Categories created successfully.');
    
    // Create author
    console.log('Creating sample author...');
    const author = await createAuthor();
    console.log('Author created successfully.');
    
    // Create posts
    console.log('Creating sample posts...');
    for (const post of samplePosts) {
      // Add author and categories references
      post.author = {
        _type: 'reference',
        _ref: author._id
      };
      
      // Assign categories
      post.categories = [
        {
          _type: 'reference',
          _ref: solarNewsCategory._id
        }
      ];
      
      // Add technology category to the efficiency post
      if (post.slug.current === 'understanding-solar-panel-efficiency') {
        post.categories.push({
          _type: 'reference',
          _ref: technologyCategory._id
        });
      }
      
      // Add sustainability category to the incentives post
      if (post.slug.current === 'solar-incentives-tax-credits') {
        post.categories.push({
          _type: 'reference',
          _ref: sustainabilityCategory._id
        });
      }
      
      // Create the post in Sanity
      await client.create(post);
      console.log(`Created post: ${post.title}`);
    }
    
    console.log('Sample data population completed successfully!');
    
  } catch (error) {
    console.error('Error populating sample data:', error);
  }
}

// Execute the population function
populateSampleData(); 