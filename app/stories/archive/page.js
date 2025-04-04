'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchNewsletterFeed } from '../../services/rssService';

export default function StoriesArchive() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const feed = await fetchNewsletterFeed();
        
        if (feed.items.length > 0) {
          setNewsletters(feed.items);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching newsletters:', err);
        setError('Failed to load the newsletter archive. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getNewsletterSlug = (title) => {
    return encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase());
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl text-center py-20">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
        <Link href="/" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <Link href="/stories" className="inline-flex items-center text-gray-600 hover:text-primary mb-4 text-sm">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to latest story
        </Link>
        <h1 className="text-3xl font-bold border-b border-gray-200 pb-4">Sunland Stories Archive</h1>
      </div>

      {newsletters.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No stories found. Check back soon for updates!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {newsletters.map((newsletter, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-sm font-medium text-gray-500">
                    {formatDate(newsletter.pubDate)}
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                    Issue #{newsletters.length - index}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold mb-4">
                  {newsletter.title}
                </h2>
                
                <div className="flex items-center justify-between">
                  <Link
                    href={`/stories/${getNewsletterSlug(newsletter.title)}`}
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    Read Full Story
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                  
                  <a 
                    href={newsletter.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    View Original
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-orange-100 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">Never Miss a Story</h3>
        <p className="text-gray-700 mb-4">Subscribe to receive Sunland Stories directly in your inbox</p>
        <Link 
          href="/stories" 
          className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
        >
          Subscribe Now
        </Link>
      </div>
    </div>
  );
} 