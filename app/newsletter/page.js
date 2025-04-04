'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
            <div className="text-center px-4 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sunland Newsletter</h1>
              <p className="text-xl text-gray-700">Local updates, direct to your inbox</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Description */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Newsletter</h2>
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              The Sunland Newsletter delivers the most important local news and updates directly to your inbox. Stay connected with what's happening in St. Lucie County with our regular updates.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Each edition includes highlights from the community, upcoming events, and stories that matter to local residents.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Editions */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl p-8 mb-16 shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Recent Editions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-4">
                <span className="text-sm text-gray-500">July 15, 2023</span>
                <h3 className="text-xl font-bold mt-1">Summer in St. Lucie County</h3>
              </div>
              <p className="text-gray-700 mb-4">Local beach cleanup initiatives, community events, and summer activities for families throughout the county.</p>
              <div className="text-primary font-medium">Coming soon</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-4">
                <span className="text-sm text-gray-500">July 8, 2023</span>
                <h3 className="text-xl font-bold mt-1">Local Business Spotlight</h3>
              </div>
              <p className="text-gray-700 mb-4">Featuring entrepreneurs and small businesses that are making a difference in our community.</p>
              <div className="text-primary font-medium">Coming soon</div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="mb-4">
                <span className="text-sm text-gray-500">July 1, 2023</span>
                <h3 className="text-xl font-bold mt-1">Independence Day Special</h3>
              </div>
              <p className="text-gray-700 mb-4">Celebration guides, local parade information, and community cookouts happening throughout the county.</p>
              <div className="text-primary font-medium">Coming soon</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-4">Subscribe Now</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          Join our growing community of informed St. Lucie County residents. It's free!
        </p>
        <div className="max-w-md mx-auto">
          {subscribed ? (
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-bold text-lg text-green-800 mb-2">Thanks for subscribing!</h3>
              <p className="text-green-700">Check your inbox for a confirmation email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                className={`bg-primary text-white font-medium px-6 py-3 rounded-lg transition-colors ${
                  submitting ? "bg-gray-400" : "hover:bg-primary/90"
                }`}
                disabled={submitting}
              >
                {submitting ? "Processing..." : "Subscribe"}
              </button>
            </form>
          )}
          <p className="text-gray-500 text-sm mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
} 