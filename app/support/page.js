'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const supportOptions = [
  {
    title: 'People Pass',
    emoji: '🎟️',
    price: '$9',
    subtitle: '/month',
    description: 'The best way to support the newsletter. Get exclusive podcasts, 20% off all future merch, and help keep Sunland News free forever.',
    color: 'from-purple-500 to-purple-600',
    ctaText: 'Become a Member',
    href: 'https://buymeacoffee.com/sunland/membership',
    available: true
  },
  {
    title: 'Sunland Brand Shirts',
    emoji: '👕',
    price: '',
    subtitle: '',
    description: 'Rep your local pride with Sunland Brand apparel. Comfy, stylish shirts that show where you\'re from.',
    color: 'from-blue-500 to-blue-600',
    ctaText: 'Shop Shirts',
    href: 'https://sunlandbrand.com',
    available: true
  },
  {
    title: 'Buy Me a Coffee',
    emoji: '☕',
    price: 'Any Amount',
    subtitle: '',
    description: 'Just want to say thanks? Buy us a coffee and help fuel the next story.',
    color: 'from-amber-500 to-amber-600',
    ctaText: 'Send Coffee',
    href: 'https://www.buymeacoffee.com/sunland',
    available: true
  }
];

export default function SupportPage() {
  // Track page view for monetization options
  useEffect(() => {
    const trackPageView = async () => {
      try {
        if (typeof window !== 'undefined') {
          const ReactPixel = (await import('react-facebook-pixel')).default;
          ReactPixel.track('ViewContent', {
            content_name: 'Support Options',
            content_category: 'Monetization',
            content_ids: ['people_pass_membership', 'food_discount_card']
          });
        }
      } catch (error) {
        console.warn('Failed to track pixel event:', error);
      }
    };
    trackPageView();
  }, []);

  // Track clicks on support options
  const handleSupportClick = async (optionTitle, price, href) => {
    // Track as InitiateCheckout for paid options
    if (price) {
      try {
        if (typeof window !== 'undefined') {
          const ReactPixel = (await import('react-facebook-pixel')).default;
          ReactPixel.track('InitiateCheckout', {
            content_name: optionTitle,
            content_category: 'Support Option',
            value: parseFloat(price.replace(/[^0-9.]/g, '')),
            currency: 'USD'
          });
        }
      } catch (error) {
        console.warn('Failed to track pixel event:', error);
      }
    }

    // Open link if available
    if (href && href !== '#') {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Buy Me a Coffee Widget */}
      <Script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="sunland"
        data-description="Support me on Buy me a coffee!"
        data-message=""
        data-color="#FF813F"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
        strategy="lazyOnload"
      />

      <div className="container mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Support Sunland News
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            The newsletter is <strong>free forever and always</strong>. But if you want to support local journalism and get some perks, here's how:
          </p>
        </div>

        {/* Support Options Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {supportOptions.map((option, index) => (
            <div
              key={option.title}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Card Header with Gradient */}
              <div className={`bg-gradient-to-r ${option.color} p-6 text-white text-center`}>
                <div className="text-4xl mb-3">{option.emoji}</div>
                <h3 className="text-2xl font-bold mb-1">{option.title}</h3>
                <div className="text-3xl font-bold">
                  {option.price}
                  {option.subtitle && (
                    <span className="text-lg font-normal opacity-90 ml-1">
                      {option.subtitle}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-gray-700 text-center mb-6 leading-relaxed">
                  {option.description}
                </p>

                {option.available ? (
                  <button
                    onClick={() => handleSupportClick(option.title, option.price, option.href)}
                    className={`block w-full bg-gradient-to-r ${option.color} text-white text-center py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg`}
                  >
                    {option.ctaText}
                  </button>
                ) : (
                  <button
                    disabled
                    className="block w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white text-center py-4 px-6 rounded-lg font-semibold cursor-not-allowed opacity-60"
                  >
                    {option.ctaText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* People Pass Benefits */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg p-8 md:p-12 text-white mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            What You Get with People Pass
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎙️</span>
              </div>
              <h3 className="font-bold mb-2">Exclusive Podcasts</h3>
              <p className="text-sm opacity-90">
                Sunland News podcasts are exclusively for People Pass members
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👕</span>
              </div>
              <h3 className="font-bold mb-2">20% Off Merch</h3>
              <p className="text-sm opacity-90">
                Get 20% off all future merchandise
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📰</span>
              </div>
              <h3 className="font-bold mb-2">Support Local News</h3>
              <p className="text-sm opacity-90">
                Help keep Sunland News free forever
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Why Your Support Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📰</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Independent Journalism</h3>
              <p className="text-gray-600 text-sm">
                We're not beholden to big media companies or advertisers. Your support keeps us independent.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Local Focus</h3>
              <p className="text-gray-600 text-sm">
                Every dollar helps us cover more local stories that actually matter to your daily life.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Community Building</h3>
              <p className="text-gray-600 text-sm">
                Supporting Sunland News means supporting a stronger, more connected St. Lucie County.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Not ready to support yet? No worries! The newsletter is <strong>free forever and always</strong>.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Questions about supporting Sunland News? Email us at{' '}
            <a href="mailto:hello@sunlandnews.com" className="text-primary hover:underline">
              hello@sunlandnews.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
