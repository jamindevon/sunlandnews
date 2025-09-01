'use client';

import { useEffect } from 'react';

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
            content_ids: ['772_eats_guide', 'people_pass_membership', 'sunland_tshirt']
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
    if (price && price !== 'Coming Soon') {
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

  const supportOptions = [
    {
      emoji: '🍊',
      title: '772 Eats Guide',
      price: '$9.95',
      subtitle: '(one-time)',
      description: '350+ hidden gem restaurants and food spots that locals actually love.',
      ctaText: 'Grab the Guide',
      href: 'https://www.772eats.com/',
      color: 'from-orange-400 to-red-500',
      available: true
    },
    {
      emoji: '👕',
      title: 'Sunland T-Shirt',
      price: '$29',
      subtitle: '',
      description: 'Rep the movement with our official tee.',
      ctaText: 'Coming Soon',
      href: '#',
      color: 'from-blue-400 to-purple-500',
      available: false
    },
    {
      emoji: '🌱',
      title: 'People Pass Membership',
      price: '$9/mo',
      subtitle: '',
      description: 'Become a core supporter of Sunland News.',
      ctaText: 'Join People Pass',
      href: 'https://buymeacoffee.com/sunland/membership',
      color: 'from-green-400 to-emerald-500',
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose How You Support Sunland
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Thanks for being down to ride. Here's how you can help keep local news local:
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
            Not ready to support yet? No worries! You'll still get our free daily newsletter.
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