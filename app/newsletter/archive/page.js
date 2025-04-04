'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchNewsletterFeed } from '../../services/rssService';
import Image from 'next/image';

export default function NewsletterArchive() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const feed = await fetchNewsletterFeed();
        
        if (feed.items && feed.items.length > 0) {
          setNewsletters(feed.items);
        } else {
          setError('No newsletters found. Please try again later.');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching newsletters:', err);
        setError('Failed to load newsletters. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    } catch (e) {
      console.error('Date formatting error:', e);
      return dateString;
    }
  };

  const getMonthYear = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } catch (e) {
      return '';
    }
  };

  // Group newsletters by month
  const groupNewslettersByMonth = (items) => {
    const grouped = {};
    
    items.forEach(item => {
      const monthYear = getMonthYear(item.pubDate);
      if (!monthYear) return;
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      
      grouped[monthYear].push(item);
    });
    
    return grouped;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl text-center py-20">
        <div className="bg-red-50 text-red-700 p-6 rounded-lg mb-8 shadow-md border border-red-100">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-xl font-bold mb-2">Unable to Load Newsletters</h2>
          <p className="text-red-600">{error}</p>
        </div>
        <Link href="/" className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-opacity-90 shadow-md transition-all">
          Return to Homepage
        </Link>
      </div>
    );
  }

  const groupedNewsletters = groupNewslettersByMonth(newsletters);
  const monthGroups = Object.keys(groupedNewsletters).sort().reverse();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-6">
          <div>
            <div className="flex items-center mb-4">
              <Image 
                src="/images/sunland-news-logo.png" 
                alt="Sunland News Logo" 
                width={160} 
                height={45} 
                className="h-auto"
                priority
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Newsletter Archive</h1>
            <p className="text-gray-600 mt-2 text-lg">
              Browse all past newsletters from Sunland News
            </p>
          </div>
          <Link 
            href="/newsletter" 
            className="mt-4 sm:mt-0 inline-flex items-center text-primary hover:underline font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Latest Newsletter
          </Link>
        </div>
      </div>

      {newsletters.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg shadow-md">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
          <p className="text-gray-500 text-lg">No newsletters found. Check back soon for updates!</p>
        </div>
      ) : (
        <div className="space-y-10">
          {monthGroups.map((monthYear) => (
            <div key={monthYear} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-2">{monthYear}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groupedNewsletters[monthYear].map((newsletter, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                    {newsletter.imageUrl && (
                      <div className="relative w-full h-40 overflow-hidden">
                        <img 
                          src={newsletter.imageUrl} 
                          alt={newsletter.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20"></div>
                      </div>
                    )}
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="text-sm font-medium text-gray-500">
                          {formatDate(newsletter.pubDate)}
                        </div>
                        <div className="bg-primary/10 px-3 py-1 rounded-full text-xs font-medium text-primary">
                          Issue #{newsletters.length - newsletters.indexOf(newsletter)}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 text-gray-900 line-clamp-2">
                        {newsletter.title}
                      </h3>
                      
                      {newsletter.preview && (
                        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{newsletter.preview}</p>
                      )}
                    </div>
                    <div className="p-6 pt-0 mt-auto">
                      <a 
                        href={newsletter.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center text-primary font-medium hover:underline"
                      >
                        Read Newsletter
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Visible on mobile only */}
      <div className="mt-10 text-center block sm:hidden">
        <Link 
          href="/newsletter" 
          className="inline-flex items-center px-5 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 shadow-md"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Latest Newsletter
        </Link>
      </div>

      <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-orange-100 rounded-xl text-center shadow-md border border-orange-100">
        <div className="mx-auto mb-4 w-32">
          <Image 
            src="/images/sunland-news-logo.png" 
            alt="Sunland News Logo" 
            width={128} 
            height={35} 
            className="h-auto"
          />
        </div>
        <h3 className="text-2xl font-bold mb-3">Never Miss a Newsletter</h3>
        <p className="text-gray-700 mb-6 max-w-lg mx-auto">Subscribe to receive Sunland News directly in your inbox, delivered daily.</p>
        <Link 
          href="/newsletter" 
          className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors shadow-md"
        >
          Subscribe Now
        </Link>
      </div>
    </div>
  );
} 