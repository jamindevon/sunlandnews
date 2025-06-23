'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const plans = {
    monthly: { price: '$9', period: 'month', savings: '' },
    yearly: { price: '$79', period: 'year', savings: 'Save $29' }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'subscribe_page',
          isPremium: false
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error('Error subscribing:', err);
      // Still show success to user, but log the error
      setSubscribed(true);
      setEmail('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Join Sunland News</h1>
        <p className="text-xl text-gray-700">Choose how you want to be part of our community</p>
      </div>

      {/* Options Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Free Newsletter */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Free Newsletter</h2>
            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">$0</span>
              <span className="text-gray-500 ml-1">/forever</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Daily newsletter</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Local news & updates</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Community updates</span>
            </li>
          </ul>

          {subscribed ? (
            <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-bold text-lg text-green-800 mb-2">You're all set!</h3>
              <p className="text-green-700">Check your inbox for our welcome email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4">
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
                className="w-full bg-white border-2 border-primary text-primary font-medium py-3 px-6 rounded-lg hover:bg-primary/5 transition-colors"
                disabled={submitting}
              >
                {submitting ? "Processing..." : "Subscribe Free"}
              </button>
            </form>
          )}
        </div>

        {/* People Pass */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-medium text-sm mb-2">PREMIUM</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">People Pass</h2>
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPlan === 'monthly' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedPlan === 'yearly' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yearly
              </button>
            </div>
            <div className="mb-2">
              <span className="text-4xl font-bold text-gray-900">{plans[selectedPlan].price}</span>
              <span className="text-gray-500">/{plans[selectedPlan].period}</span>
            </div>
            {plans[selectedPlan].savings && (
              <div className="text-primary font-medium text-sm">{plans[selectedPlan].savings}</div>
            )}
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>10% off everything Sunland</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Exclusive content & early access</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Monthly politics & crime newsletter</span>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Support local journalism</span>
            </li>
          </ul>

          <a
            href="https://buymeacoffee.com/sunland/membership"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-8 py-4 bg-primary text-white text-center font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Get People Pass
          </a>
        </div>
      </div>
    </div>
  );
} 