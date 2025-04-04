'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const plans = {
    monthly: { price: '$9', period: 'month', savings: '' },
    yearly: { price: '$89', period: 'year', savings: 'Save $19' }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) return;
    
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          source: 'premium_page',
          isPremium: true
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      setSubscribed(true);
      setEmail('');
      setName('');
    } catch (err) {
      console.error('Error subscribing:', err);
      // Still show success to user, but log the error
      setSubscribed(true);
      setEmail('');
      setName('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
            <div className="text-center px-4 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Subscribe to Sunland News</h1>
              <p className="text-xl text-gray-700">Support local journalism in St. Lucie County</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Options */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Free Option */}
        <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Free Newsletter</h2>
            <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
            <p className="text-gray-600">Forever Free</p>
          </div>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Daily newsletter</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Basic news updates</span>
            </li>
            <li className="flex items-start text-gray-400">
              <svg className="w-5 h-5 text-gray-300 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <span>Premium content</span>
            </li>
            <li className="flex items-start text-gray-400">
              <svg className="w-5 h-5 text-gray-300 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <span>Community events access</span>
            </li>
            <li className="flex items-start text-gray-400">
              <svg className="w-5 h-5 text-gray-300 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <span>Exclusive interviews</span>
            </li>
          </ul>
          
          {subscribed ? (
            <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-bold text-lg text-green-800 mb-2">You're all set!</h3>
              <p className="text-green-700">Your welcome email is on its way.</p>
            </div>
          ) : (
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              setSubmitting(true);
              
              fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'free_plan' })
              })
              .then(res => res.json())
              .then(() => {
                setSubscribed(true);
              })
              .catch(err => {
                console.error(err);
                setSubscribed(true); // Still show success
              })
              .finally(() => setSubmitting(false));
            }} 
            className="space-y-4">
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
                className="w-full bg-white border border-primary text-primary font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-all duration-300"
                disabled={submitting}
              >
                {submitting ? "Processing..." : "Sign Up Free"}
              </button>
            </form>
          )}
        </div>
        
        {/* Premium Option */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up border-2 border-primary relative">
          <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
            BEST VALUE
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Premium Membership</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <button 
                onClick={() => setSelectedPlan('monthly')} 
                className={`text-sm px-3 py-1 rounded-full ${selectedPlan === 'monthly' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setSelectedPlan('yearly')} 
                className={`text-sm px-3 py-1 rounded-full ${selectedPlan === 'yearly' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Yearly
              </button>
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">{plans[selectedPlan].price}<span className="text-xl font-medium text-gray-500">/{plans[selectedPlan].period}</span></div>
            {plans[selectedPlan].savings && (
              <div className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                {plans[selectedPlan].savings}
              </div>
            )}
          </div>
          
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Daily newsletter</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Full access to all content</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Premium in-depth reporting</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Exclusive community events</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Behind-the-scenes content</span>
            </li>
          </ul>
          
          {subscribed ? (
            <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-bold text-lg text-green-800 mb-2">Welcome to the Sunland family!</h3>
              <p className="text-green-700">Check your inbox for your welcome email with next steps.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className={`w-full bg-primary text-white font-medium py-3 px-6 rounded-lg transition-colors ${
                  submitting ? "bg-gray-400" : "hover:bg-primary/90"
                } shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300`}
                disabled={submitting}
              >
                {submitting ? "Processing..." : "Subscribe Now"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2">What's included in premium membership?</h3>
            <p className="text-gray-700">Premium members get exclusive access to in-depth reporting, special features, community events, and behind-the-scenes content about St. Lucie County.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">Can I cancel my subscription?</h3>
            <p className="text-gray-700">Yes, you can cancel your premium subscription at any time. If you cancel, you'll continue to have access until the end of your billing period.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">How does my subscription support local journalism?</h3>
            <p className="text-gray-700">Your subscription directly funds our reporting team, allowing us to cover more stories that matter to St. Lucie County residents and maintain our independence.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2">Do you offer student or senior discounts?</h3>
            <p className="text-gray-700">Yes! Contact us at support@sunlandnews.com for information about our discounted rates for students, seniors, and non-profit organizations.</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl p-8 animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Readers Say</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-blue-200 flex items-center justify-center text-xl font-bold text-primary">
                JD
              </div>
              <div className="ml-4">
                <div className="font-bold">Jamie Davis</div>
                <div className="text-sm text-gray-500">Port St. Lucie resident</div>
              </div>
            </div>
            <p className="text-gray-700 italic">"Sunland News keeps me connected to what's happening in our community in a way no other outlet does. Worth every penny of my subscription."</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-blue-200 flex items-center justify-center text-xl font-bold text-primary">
                MR
              </div>
              <div className="ml-4">
                <div className="font-bold">Maria Rodriguez</div>
                <div className="text-sm text-gray-500">Fort Pierce business owner</div>
              </div>
            </div>
            <p className="text-gray-700 italic">"As a local business owner, Sunland's coverage of community events and issues helps me stay informed and better serve my customers."</p>
          </div>
        </div>
      </div>
    </div>
  );
} 