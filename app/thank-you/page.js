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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 md:mb-6 shadow-lg">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 md:mb-8 px-4">
            You're In! 🎉
          </h1>

          {/* Two-Step Process */}
          <div className="max-w-2xl mx-auto mb-4 px-4">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 text-left">
              <div className="flex items-start mb-3">
                <span className="text-green-500 font-bold text-lg mr-3">✅</span>
                <p className="text-base md:text-lg text-gray-800">
                  <strong>Step 1:</strong> Check your inbox for a confirmation email
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-green-500 font-bold text-lg mr-3">✅</span>
                <p className="text-base md:text-lg text-gray-800">
                  <strong>Step 2:</strong> While you're here, check this out…
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Offer */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 md:mb-6 leading-tight">
            Want to know where to eat in St. Lucie County?
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-800 mb-4 font-semibold">
            I've got something just for you.
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-4 md:mb-6 leading-relaxed">
            I put together a guide with over 450 local spots — no chains, just the best food trucks, mom-and-pop restaurants, hidden gems, and late-night eats in St. Lucie County.
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-4 md:mb-6 leading-relaxed">
            It's updated quarterly. It comes with a built-in food journal. And you get lifetime access.
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-4 md:mb-6 leading-relaxed">
            It's just <strong>$29</strong>. One-time payment.
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-0 leading-relaxed">
            If you don't like it, I'll refund you within 30 days. No questions asked.
          </p>
        </div>

        {/* YouTube Video Section */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
            Why I Built This + What's Inside the Guide
          </h3>
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ldEskn9MiaE?autoplay=1&mute=1"
              title="772 Eats Food Guide"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Checkout */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-6 lg:p-8 mb-8">
          <iframe
            src="https://772eats.com/embed-checkout"
            style={{
              width: '100%',
              maxWidth: '650px',
              height: '920px',
              border: 'none',
              margin: '0 auto',
              display: 'block',
              overflow: 'hidden'
            }}
            title="772 Eats Checkout"
            loading="eager"
            scrolling="no"
          />

          {/* Guarantee & Mission */}
          <div className="mt-6 md:mt-8 text-center max-w-xl mx-auto px-4">
            <p className="text-base md:text-lg font-semibold text-gray-800 mb-2 md:mb-3">
              30-day money-back guarantee
            </p>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Instant access — one-time payment — no strings
            </p>
            <div className="border-t border-gray-200 pt-4 md:pt-6 mt-4 md:mt-6">
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Every purchase helps keep Sunland News free and independent for our entire community.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm md:text-base px-4">
          <p className="mb-2">Have questions? Just reply to any Sunland email — <a href="mailto:hello@sunland.news" className="text-primary hover:underline font-semibold">hello@sunland.news</a></p>
          <p className="text-xs md:text-sm text-gray-500">I'm here for you.</p>
        </div>
      </div>
    </div>
  );
} 