// Static RSS service with no external dependencies
// This service provides hardcoded data for newsletters to avoid external API failures

// Fallback static data
const staticNewsletterData = {
  title: "Latest Sunland Newsletter",
  description: "Updates from St. Lucie County",
  link: "/newsletter",
  imageUrl: null,
  publishDate: new Date().toISOString(),
  content: `
    <h1>Summer in St. Lucie County</h1>
    <p>Welcome to the latest edition of the Sunland Newsletter!</p>
    <p>This week, we're highlighting local beach cleanup initiatives, community events, and summer activities for families throughout the county.</p>
    <h2>Community Events</h2>
    <p>There are several exciting events happening in our community this month.</p>
    <p>Stay tuned for more updates in our next edition!</p>
  `,
  author: "Sunland News Team"
};

// Sample archive data
const staticArchiveData = {
  title: "Sunland Newsletter Archive",
  description: "Past editions of our newsletter",
  items: [
    {
      title: "Spring Updates from St. Lucie County",
      description: "Community events and local news from March",
      link: "/newsletter/archive/march-2024",
      publishDate: "2024-03-15T12:00:00Z",
      author: "Sunland News Team"
    },
    {
      title: "February Highlights",
      description: "Local stories and upcoming events",
      link: "/newsletter/archive/february-2024",
      publishDate: "2024-02-15T12:00:00Z",
      author: "Sunland News Team"
    }
  ]
};

// Export functions that use the static data
export const fetchLatestNewsletter = async () => {
  try {
    console.log('Fetching latest newsletter (static version)');
    // Simply return the static data instead of making a real API call
    return staticNewsletterData;
  } catch (error) {
    console.error('Error fetching latest newsletter:', error);
    return null;
  }
};

export const fetchNewsletterFeed = async () => {
  try {
    console.log('Fetching newsletter feed (static version)');
    // Return the static archive data
    return staticArchiveData;
  } catch (error) {
    console.error('Error fetching newsletter feed:', error);
    return null;
  }
};

export const parseRssFeed = (feedData) => {
  // No need to parse anymore, just return the static data
  return {
    title: feedData.title,
    description: feedData.description,
    items: feedData.items || []
  };
}; 