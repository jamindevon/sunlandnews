'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fbEvents } from '../../../lib/fbPixel';

// Newsletter subscription component for article pages
export default function NewsletterPrompt() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'article_page',
          isPremium: false
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      // Track newsletter subscription with Meta Pixel
      fbEvents.subscribeSubmit('article_inline', {
        content_name: 'Article Inline Newsletter Signup'
      });

      // Redirect with email for segmentation
      router.push(`/thank-you?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error('Error subscribing:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border-4 border-black p-8 md:p-10 shadow-[8px_8px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto my-16 rounded-2xl relative overflow-hidden group hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brutalPink rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity transform translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 text-center">
        <h3 className="text-3xl font-black text-black mb-4 uppercase tracking-tight">Enjoying this story?</h3>
        <p className="font-bold text-gray-800 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
          Get stories like this delivered to your inbox every weekday morning. Join 10,000+ locals who start their day with Sunland News.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="YOUR EMAIL"
            className="w-full px-5 py-4 bg-white border-2 border-black font-bold placeholder:text-gray-400 placeholder:font-black shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all rounded-xl"
            required
            value={email}
            disabled={isSubmitting}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className={`w-full px-5 py-4 font-black uppercase text-xl text-white rounded-xl border-2 border-black transition-all ${isSubmitting
              ? 'bg-gray-400 translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-not-allowed'
              : 'bg-primary shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none'
              }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'SENDING...' : 'SEND ME THE NEWS'}
          </button>

          {error && <p className="text-red-500 font-bold text-center mt-2 bg-white border-2 border-red-500 p-2 inline-block rounded-lg">{error}</p>}
        </form>
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-6">
          Free • No spam • Unsubscribe anytime
        </p>
      </div>
    </div>
  );
} 