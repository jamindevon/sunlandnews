'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function ThankYouPage() {
  // Track conversion on thank you page
  useEffect(() => {
    const trackConversion = async () => {
      try {
        if (typeof window !== 'undefined') {
          const ReactPixel = (await import('react-facebook-pixel')).default;
          ReactPixel.track('CompleteRegistration', {
            content_name: 'Newsletter Signup Complete',
            content_category: 'Email Subscription',
            status: 'completed'
          });
        }
      } catch (error) {
        console.warn('Failed to track pixel event:', error);
      }
    };
    trackConversion();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            You're in! 🎉
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Thanks for signing up.
          </p>
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            {/* YouTube Video Embed */}
            <div className="aspect-video mb-8 rounded-lg overflow-hidden shadow-lg">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/Rss_K3v__Wc" 
                title="Welcome to Sunland News"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Before we start sending you local news, take this 45-second quiz. 
                It'll help us send you the right stuff — not random stuff.
              </p>
              
              <Link 
                href="/quiz"
                className="inline-flex items-center px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300"
              >
                Take the Quick Quiz
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Additional Context */}
        <div className="text-center">
          <p className="text-gray-600">
            This will only take a minute and helps us personalize your experience.
          </p>
        </div>
      </div>
    </div>
  );
} 