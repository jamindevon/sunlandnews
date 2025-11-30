'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createSignup } from '../lib/supabase';
import { fbEvents } from '../lib/fbPixel';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 1. Store email in Supabase for our funnel tracking
      const supabaseResult = await createSignup(email);

      // Always store email for quiz flow
      localStorage.setItem('signupEmail', email);

      // Only store signup_id if it's valid
      if (supabaseResult.success && supabaseResult.data?.id) {
        localStorage.setItem('signupId', supabaseResult.data.id);
        console.log('Stored valid signup ID:', supabaseResult.data.id);
      } else {
        console.log('Supabase signup failed, but continuing with flow');
        localStorage.removeItem('signupId'); // Clear any invalid ID
      }

      // 2. Also subscribe to Beehiiv newsletter (existing integration)
      const beehiivResponse = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'funnel-homepage',
        }),
      });

      const beehiivData = await beehiivResponse.json();
      if (beehiivData.success) {
        console.log('Successfully subscribed to newsletter');
      } else {
        console.error('Beehiiv subscription failed:', beehiivData.error);
      }

      // Track email signup with Meta Pixel
      fbEvents.subscribeSubmit('funnel-homepage');

      // Always redirect to thank you page (even if some services fail)
      router.push('/thank-you-original');

    } catch (error) {
      console.error('Error during signup:', error);
      // Still redirect for better UX
      router.push('/thank-you-original');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            St. Lucie in 5 minutes — every weekday at 7am.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Events, new openings, date-night ideas, and neighborhood news. <strong>No politics. No crime.</strong> Just the good stuff that makes this place feel like home. <span className="text-primary font-semibold">Always free.</span>
          </p>

          {/* Email Form */}
          <div className="max-w-md mx-auto mb-16">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 text-lg bg-gray-50 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 text-lg font-bold rounded-xl text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30'
                  }`}
              >
                {isSubmitting ? 'Joining...' : 'Send me the news'}
              </button>
              <p className="text-sm text-gray-400 mt-2">
                Join 10,000+ locals • 1-tap unsubscribe • Zero spam
              </p>
            </form>
          </div>

          {/* Benefits - Clean Grid */}
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 text-left max-w-2xl mx-auto border-t border-gray-100 pt-12">
            {[
              { icon: '✅', title: 'Daily Updates', desc: 'News without the noise' },
              { icon: '📅', title: 'Weekly Events', desc: '30+ things to do every Thursday' },
              { icon: '🧡', title: 'Local Stories', desc: 'Celebrating our community' },
              { icon: '🚫', title: 'No Politics', desc: 'Just the good stuff' }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <span className="text-2xl bg-orange-50 w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ja'Min Bio Section - Simplified */}
      <section className="py-20 px-4 bg-gray-50/50">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0 relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                <Image
                  src="/images/bio-photo.png"
                  alt="Ja'Min - Founder of Sunland News"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover object-left"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-200 flex items-center justify-center text-4xl">👋</div>';
                  }}
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Meet Ja'Min
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Hi, I'm Ja'Min, born and raised in St. Lucie County. I started Sunland News to share stories that actually reflect this place. <strong>No politics, no crime.</strong> Just the people, food, and local life that make it home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsMediaOrganization',
            name: 'Sunland News',
            url: 'https://sunlandnews.com',
            logo: 'https://sunlandnews.com/images/sunlandnews-logo.png',
            sameAs: [
              'https://www.facebook.com/thesunlandnews',
              'https://www.instagram.com/sunlandnews'
            ],
            foundingDate: '2024',
            founder: {
              '@type': 'Person',
              name: "Ja'Min Devon"
            },
            description: 'A hyper-local email newsletter covering Saint Lucie County. Food, News, Events, and People.'
          })
        }}
      />
    </div>
  );
}

