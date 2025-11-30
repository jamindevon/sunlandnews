'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ThankYouPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        alert('Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Confirmation Header */}
      <div className="bg-green-50 border-b border-green-100 px-4 py-4 text-center">
        <p className="text-green-800 font-medium flex items-center justify-center gap-2">
          <span className="text-xl">✅</span>
          You're on the list! Your welcome email is on its way.
        </p>
      </div>

      {/* Hero Section */}
      <section className="pt-16 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-primary text-sm font-bold mb-6 tracking-wide uppercase">
            Founder Offer
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Plan your week in St. Lucie — $39/year
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Take a 2-minute quiz, tap one link, and only the events you care about show up in your calendar—every week. <span className="font-semibold text-gray-800">Fort Pierce • Port St. Lucie • St. Lucie County.</span>
          </p>

          {/* Bullets */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-10 max-w-3xl mx-auto">
            <span className="flex items-center">✨ Your picks (food • live music • family • outdoors)</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center">📅 Works with Apple/Google/Outlook</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center">🚫 No politics by default</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center">🛡️ 7-day refund</span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold text-lg rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Get my calendar — $39'}
            </button>
            <p className="text-sm text-gray-400">
              Join 10,000+ locals • Built by Sunland News (St. Lucie County)
            </p>
          </div>
        </div>
      </section>

      {/* Visual How it Works */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 text-center">How it works</h3>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line (Desktop only) */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 -z-10 transform -translate-y-1/2"></div>

              {/* Step 1 */}
              <div className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
                  <span className="text-3xl">📝</span>
                </div>
                <div className="absolute top-0 right-0 bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold -mt-3 -mr-3 border-4 border-white">1</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Pick Your Interests</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tell us what you love—Food, Music, Family, Outdoors. We filter out the noise.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
                  <span className="text-3xl">🔗</span>
                </div>
                <div className="absolute top-0 right-0 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold -mt-3 -mr-3 border-4 border-white">2</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Get Magic Link</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We generate a unique, secure calendar link just for you. No app download needed.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center transform hover:-translate-y-1 transition-all duration-300">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
                  <span className="text-3xl">📱</span>
                </div>
                <div className="absolute top-0 right-0 bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold -mt-3 -mr-3 border-4 border-white">3</div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">Auto-Sync Forever</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Events magically appear in your phone's calendar. Updated weekly.
                </p>
              </div>
            </div>

            {/* Visual Calendar Preview */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="font-bold text-gray-600 text-sm">Your Phone Calendar</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start space-x-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="text-center min-w-[60px]">
                      <div className="text-xs font-bold text-blue-500 uppercase">Sat</div>
                      <div className="text-xl font-bold text-gray-900">14</div>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900">Farmers Market 🥬</h5>
                      <p className="text-sm text-gray-600">9:00 AM • Downtown Fort Pierce</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <div className="text-center min-w-[60px]">
                      <div className="text-xs font-bold text-purple-500 uppercase">Sat</div>
                      <div className="text-xl font-bold text-gray-900">14</div>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900">Jazz on the Water 🎷</h5>
                      <p className="text-sm text-gray-600">7:00 PM • Melody Lane</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                    <div className="text-center min-w-[60px]">
                      <div className="text-xs font-bold text-orange-500 uppercase">Sun</div>
                      <div className="text-xl font-bold text-gray-900">15</div>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900">Brunch & Art Walk 🎨</h5>
                      <p className="text-sm text-gray-600">11:00 AM • Peacock Arts District</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-400 text-sm mt-4">
                (This is exactly how it looks on your phone!)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* No Thanks Link */}
      <div className="text-center pb-16">
        <Link href="/quiz" className="text-gray-400 hover:text-gray-600 text-sm underline transition-colors">
          No thanks, take me to the quiz to personalize my news experience
        </Link>
      </div>
    </div>
  );
}
