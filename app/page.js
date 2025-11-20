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
      router.push('/thank-you');

    } catch (error) {
      console.error('Error during signup:', error);
      // Still redirect for better UX
      router.push('/thank-you');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Stay in the loop with what's happening in{' '}
            <span className="text-primary">St. Lucie County</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Clean, daily updates on events, food, people, and local culture.<br />
            <strong>No politics. No crime.</strong> Just the stuff that makes this place feel like home.<br />
            <span className="text-primary font-semibold">Always free.</span> Delivered every weekday morning.
          </p>
          
          {/* Email Form */}
          <div className="max-w-lg mx-auto mb-12">
            <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-sm"
              required
            />
            <button
              type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-4 text-lg font-semibold rounded-lg text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 whitespace-nowrap ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-primary hover:bg-primary/90'
                  }`}
            >
                  {isSubmitting ? 'Sending...' : 'Send Me the News'}
            </button>
          </div>
        </form>
          </div>
          
          {/* Benefits Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              '✅ Daily local news without the noise',
              '✅ 30 to 50 handpicked events every Thursday',
              '✅ Stories that actually reflect our community',
              '✅ Trusted by 5,000+ readers across St. Lucie County'
            ].map((benefit, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-100">
                <p className="text-gray-700 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
          </div>
        </section>

      {/* Ja'Min Bio Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <Image
                  src="/images/bio-photo.png"
                  alt="Ja'Min - Founder of Sunland News"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover object-left-top"
                  style={{ transform: 'translateX(-20px)' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-6xl text-gray-400">📸</div>';
                  }}
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Meet Ja'Min
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Hi, I'm Ja'Min, born and raised in St. Lucie County.<br />
                I started Sunland News to share stories that actually reflect this place.<br />
                <strong>No politics, no crime.</strong> Just the people, food, and local life that make it home.
              </p>
            </div>
          </div>
          </div>
        </section>
    </div>
  );
}

 