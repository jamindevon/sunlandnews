'use client';

import { useState, useEffect } from 'react';
import { fetchLatestNewsletter } from '../../services/rssService';
import { cleanNewsletterContent } from '../../../lib/utils/contentUtils';
import Image from 'next/image';
import Link from 'next/link';

export default function LatestNewsletter() {
  const [newsletter, setNewsletter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchLatestNewsletter();
        
        if (data) {
          // Clean the content before setting it
          data.content = cleanNewsletterContent(data.content);
          setNewsletter(data);
        } else {
          setError('Failed to load the newsletter. Please try again later.');
        }
      } catch (err) {
        console.error('Error loading newsletter:', err);
        setError('An error occurred while loading the newsletter. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (error || !newsletter) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-red-50 rounded-lg p-6 shadow-md border border-red-100">
          <h2 className="text-xl font-bold text-red-700 mb-2">Newsletter Unavailable</h2>
          <p className="text-red-600 mb-4">{error || 'Unable to load the newsletter at this time.'}</p>
          <Link href="/" className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      {/* Header section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-6">
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {newsletter.title}
          </h1>
          {newsletter.publishDate && (
            <p className="text-gray-600 mt-2">
              {formatDate(newsletter.publishDate)}
            </p>
          )}
        </div>
        
        <div className="mt-6 sm:mt-0 space-y-2 sm:space-y-4">
          <Link 
            href="/newsletter/archive" 
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
            Newsletter Archive
          </Link>
          
          <Link 
            href="/newsletter" 
            className="block text-primary hover:underline font-medium"
          >
            Subscribe
          </Link>
        </div>
      </div>

      {/* Newsletter content */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
        {newsletter.imageUrl && (
          <div className="relative w-full h-64 lg:h-80">
            <img 
              src={newsletter.imageUrl} 
              alt={newsletter.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6 lg:p-8">
          <article className="prose max-w-none newsletter-content">
            <div dangerouslySetInnerHTML={{ __html: newsletter.content }} />
          </article>
        </div>
      </div>

      {/* Footer section */}
      <div className="rounded-xl bg-gradient-to-r from-primary/10 to-orange-100 p-8 text-center mb-10 shadow-md border border-orange-100">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Get the latest news and updates from St. Lucie County delivered directly to your inbox.
        </p>
        <Link 
          href="/newsletter" 
          className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md"
        >
          Subscribe Now
        </Link>
      </div>
    </div>
  );
} 