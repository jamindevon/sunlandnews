'use client';

import { useState } from 'react';

// Newsletter subscription component for article pages
export default function NewsletterPrompt() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

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

      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error('Error subscribing:', err);
      // Still show success to user, but log the error
      setIsSubscribed(true);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="my-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome to Sunland News!</h3>
          <p className="text-gray-600">Check your email for our welcome message and tomorrow's newsletter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-12 bg-gradient-to-r from-primary/10 to-blue-100 rounded-2xl p-8 text-center">
      <div className="max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-3">Enjoying this story?</h3>
        <p className="text-gray-600 mb-6">
          Get stories like this delivered to your inbox every weekday morning.
          Join 10,000+ locals who start their day with Sunland News.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send me the news"}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-3">
          Free • No spam • Unsubscribe anytime
        </p>
      </div>
    </div>
  );
} 