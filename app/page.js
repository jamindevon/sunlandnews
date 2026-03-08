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

      // Always redirect to thank you page with email for segmentation
      router.push(`/thank-you?email=${encodeURIComponent(email)}`);

    } catch (error) {
      console.error('Error during signup:', error);
      // Still redirect for better UX
      router.push(`/thank-you?email=${encodeURIComponent(email)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-brutalPink selection:text-white">
      {/* Hero Section */}
      <section className="pt-6 md:pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 leading-tight tracking-tight">
            St. Lucie in 5 minutes <br className="hidden md:block" />
            <span className="inline-block bg-brutalYellow px-3 py-1 mt-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl">every weekday at 7am.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-800 font-medium mb-12 max-w-2xl mx-auto leading-relaxed px-2 md:px-0">
            Events, new openings, date-night ideas, and neighborhood news. <br className="hidden md:block" />
            <strong className="bg-[#ff4365] text-white px-2 py-0.5 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] inline-block mt-2 mb-1">No politics. No crime.</strong><br aria-hidden="true" />
            <span className="mt-1 inline-block">Just the good stuff that makes this place feel like home.</span> <span className="font-bold underline decoration-4 underline-offset-4 decoration-primary inline-block">Always free.</span>
          </p>

          {/* Email Form */}
          <div className="max-w-md mx-auto mb-16 px-4 md:px-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-5 py-3 text-base bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400 font-bold"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 text-lg font-bold uppercase text-white border-2 border-black rounded-xl transition-all ${isSubmitting
                  ? 'bg-gray-400 shadow-[2px_2px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px] cursor-not-allowed'
                  : 'bg-primary shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
                  }`}
              >
                {isSubmitting ? 'Joining...' : 'Send me the news'}
              </button>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Join 10,000+ locals • 1-tap unsubscribe • Zero spam
              </p>
            </form>
          </div>

          {/* Benefits - Clean Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left max-w-3xl mx-auto pt-8 px-4 md:px-0">
            {[
              { icon: '☀️', title: 'Daily Updates', desc: 'News without the noise', color: 'bg-brutalBlue' },
              { icon: '📅', title: 'Weekly Events', desc: '30+ things to do every Thursday', color: 'bg-[#ff4365]' },
              { icon: '🌴', title: 'Local Stories', desc: 'Celebrating our community', color: 'bg-brutalYellow text-black' },
              { icon: '✌️', title: 'No Politics', desc: 'Just the good stuff', color: 'bg-primary' }
            ].map((item, index) => (
              <div key={index} className="flex gap-4 items-start bg-white border-2 border-black p-5 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-2xl hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all cursor-default">
                <span className={`text-2xl w-12 h-12 flex items-center justify-center border-2 border-black rounded-xl shadow-[2px_2px_0px_rgba(0,0,0,1)] flex-shrink-0 text-white ${item.color}`}>{item.icon}</span>
                <div>
                  <h3 className="font-bold text-black text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ja'Min Bio Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-10 bg-white border-2 border-black p-8 md:p-12 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-[2rem] relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brutalBlue rounded-full border-2 border-black opacity-20"></div>

            <div className="flex-shrink-0 z-10">
              <div className="w-32 h-32 md:w-48 md:h-48 overflow-hidden border-2 border-black bg-[#ff4365] rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <Image
                  src="/images/bio-photo.png"
                  alt="Ja'Min - Founder of Sunland News"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover object-left"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full bg-[#ff4365] flex items-center justify-center text-4xl font-bold text-white">JD</div>';
                  }}
                />
              </div>
            </div>
            <div className="text-center md:text-left z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
                Meet Ja'Min
              </h2>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">
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
