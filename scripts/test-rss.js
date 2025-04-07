// Test script to verify that we can fetch and parse the beehiiv RSS feed
// Run with: node scripts/test-rss.js

import RssParser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL of the beehiiv newsletter RSS feed
const RSS_URL = 'https://rss.beehiiv.com/feeds/hyCELI0tNT.xml';

// Create a new RSS parser with custom fields for beehiiv content
const parser = new RssParser({
  customFields: {
    item: [
      ['media:content', 'media'],
      ['content:encoded', 'content'],
      ['description', 'description'],
      ['category', 'category'],
      ['creator', 'creator'],
      ['dc:creator', 'creator'],
    ],
  },
});

async function testRssFeed() {
  console.log(`Fetching RSS feed from ${RSS_URL}...`);
  
  try {
    // Fetch the RSS feed
    const response = await fetch(RSS_URL, {
      headers: {
        'User-Agent': 'Sunland-News-Test-Script/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }
    
    const feedText = await response.text();
    
    // Save the raw RSS feed to a file for inspection
    const rawFeedPath = path.join(__dirname, 'raw-feed.xml');
    fs.writeFileSync(rawFeedPath, feedText);
    console.log(`Raw feed saved to ${rawFeedPath}`);
    
    // Parse the RSS feed
    const feed = await parser.parseString(feedText);
    
    // Check if the feed has items
    if (!feed || !feed.items || feed.items.length === 0) {
      console.error('No items found in the RSS feed');
      return;
    }
    
    console.log('\nFeed information:');
    console.log(`Title: ${feed.title}`);
    console.log(`Description: ${feed.description || 'No description'}`);
    console.log(`Number of items: ${feed.items.length}`);
    
    // Process the latest item
    const latestItem = feed.items[0];
    console.log('\nLatest item:');
    console.log(`Title: ${latestItem.title}`);
    console.log(`Link: ${latestItem.link}`);
    console.log(`Date: ${latestItem.pubDate || latestItem.isoDate}`);
    console.log(`Author: ${latestItem.creator || latestItem.author || 'Unknown'}`);
    
    // Extract image URL
    let imageUrl = null;
    if (latestItem.media && latestItem.media.$ && latestItem.media.$.url) {
      imageUrl = latestItem.media.$.url;
    } else if (latestItem.enclosure && latestItem.enclosure.url) {
      imageUrl = latestItem.enclosure.url;
    } else if (latestItem.content) {
      const imgMatch = latestItem.content.match(/<img[^>]+src="([^">]+)"/i);
      if (imgMatch && imgMatch[1]) {
        imageUrl = imgMatch[1];
      }
    }
    
    console.log(`Image URL: ${imageUrl || 'No image found'}`);
    
    // Save the content to a file for inspection
    if (latestItem.content) {
      const contentPath = path.join(__dirname, 'latest-content.html');
      fs.writeFileSync(contentPath, latestItem.content);
      console.log(`Content saved to ${contentPath}`);
    }
    
    // Save the processed feed to a JSON file
    const processedFeed = {
      title: feed.title,
      description: feed.description || '',
      items: feed.items.map(item => {
        // Get image
        let itemImageUrl = null;
        if (item.media && item.media.$ && item.media.$.url) {
          itemImageUrl = item.media.$.url;
        } else if (item.enclosure && item.enclosure.url) {
          itemImageUrl = item.enclosure.url;
        } else if (item.content) {
          const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/i);
          if (imgMatch && imgMatch[1]) {
            itemImageUrl = imgMatch[1];
          }
        }
        
        // Create text snippet if none exists
        let contentSnippet = item.contentSnippet || item.description;
        if (!contentSnippet && item.content) {
          contentSnippet = item.content
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 200)
            + '...';
        }
        
        return {
          title: item.title || 'Untitled Newsletter',
          link: item.link || RSS_URL,
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          isoDate: item.isoDate || item.pubDate || new Date().toISOString(),
          contentSnippet: contentSnippet,
          guid: item.guid || item.link,
          imageUrl: itemImageUrl,
          creator: item.creator || item.author || 'Sunland News Team',
          author: item.author || item.creator || 'Sunland News Team',
        };
      })
    };
    
    const jsonPath = path.join(__dirname, 'processed-feed.json');
    fs.writeFileSync(jsonPath, JSON.stringify(processedFeed, null, 2));
    console.log(`Processed feed saved to ${jsonPath}`);
    
    console.log('\nTest completed successfully!');
    
  } catch (error) {
    console.error('Error testing RSS feed:', error);
  }
}

// Run the test
testRssFeed(); 