'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fbEvents } from '../../lib/fbPixel';

export default function Subscribe() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlEmail = new URLSearchParams(window.location.search).get('email');
      if (urlEmail) {
        setEmail(urlEmail);
      }
    }
  }, []);

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

      // Track newsletter subscription with Meta Pixel
      fbEvents.subscribeSubmit('subscribe_page', {
        content_name: 'Free Newsletter Signup'
      });

      router.push(`/thank-you?email=${encodeURIComponent(email)}`);
    } catch (err) {
      console.error('Error subscribing:', err);
      // Still redirect to thank you page with email for UX flow retention
      router.push(`/thank-you?email=${encodeURIComponent(email)}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 font-sans text-black selection:bg-brutalPink selection:text-white">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 uppercase tracking-tight">Join Sunland News</h1>
        <p className="text-xl font-bold text-gray-800">Choose how you want to be part of our community</p>
      </div>

      {/* Options Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16 relative">
        {/* Connection line between cards on desktop */}
        <div className="hidden md:block absolute top-[20%] left-1/2 w-48 h-2 bg-black -z-10 transform -translate-x-1/2 -translate-y-1/2 border-y-2 border-black" style={{ borderStyle: 'dashed', borderLeft: 'none', borderRight: 'none', borderTop: 'none', background: 'transparent' }}></div>

        {/* Free Newsletter */}
        <div className="bg-white rounded-3xl p-8 border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all duration-300 relative overflow-hidden group">
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Free Newsletter</h2>
            <div className="mt-4">
              <span className="text-5xl font-black text-black">$0</span>
              <span className="text-gray-600 font-bold ml-1 uppercase text-sm">/forever</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8 font-bold text-lg text-gray-800 relative z-10">
            <li className="flex items-center">
              <div className="min-w-6 h-6 mr-3 bg-brutalBlue border-2 border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span>Daily newsletter</span>
            </li>
            <li className="flex items-center">
              <div className="min-w-6 h-6 mr-3 bg-brutalBlue border-2 border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span>Local news & updates</span>
            </li>
            <li className="flex items-center">
              <div className="min-w-6 h-6 mr-3 bg-brutalBlue border-2 border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span>Community updates</span>
            </li>
          </ul>

          {subscribed ? (
            <div className="bg-brutalBg p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-center relative z-10">
              <div className="w-16 h-16 bg-green-400 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold text-xl text-black mb-2 uppercase">You're all set!</h3>
              <p className="text-gray-800 font-bold">Check your inbox for our welcome email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4 relative z-10">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-5 py-4 font-bold text-black placeholder:text-gray-500 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-primary text-white font-bold uppercase tracking-wide border-2 border-black py-4 px-6 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                disabled={submitting}
              >
                {submitting ? "Processing..." : "Send me the news"}
              </button>
            </form>
          )}
        </div>

        {/* People Pass */}
        <div className="bg-brutalYellow rounded-3xl p-8 border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all duration-300 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "16px 16px" }}></div>
          <div className="text-center mb-8 relative z-10">
            <div className="inline-block bg-black text-white px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] font-bold text-sm mb-4 uppercase tracking-[0.2em]">PREMIUM</div>
            <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">People Pass</h2>
            <div className="flex justify-center gap-4 mb-6 mt-4">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${selectedPlan === 'monthly'
                  ? 'bg-primary text-white'
                  : 'bg-white text-black'
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${selectedPlan === 'yearly'
                  ? 'bg-primary text-white'
                  : 'bg-white text-black'
                  }`}
              >
                Yearly
              </button>
            </div>
            <div className="mb-2">
              <span className="text-5xl font-black text-black">{plans[selectedPlan].price}</span>
              <span className="text-gray-800 font-bold uppercase ml-1">/{plans[selectedPlan].period}</span>
            </div>
            {plans[selectedPlan].savings && (
              <div className="text-primary font-black uppercase tracking-wider text-sm mt-2">{plans[selectedPlan].savings}</div>
            )}
          </div>

          <ul className="space-y-4 mb-8 font-bold text-lg text-gray-900 relative z-10">
            <li className="flex items-center">
              <div className="min-w-6 h-6 mr-3 bg-[#ff4365] border-2 border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span>10% off everything Sunland</span>
            </li>
            <li className="flex items-center">
              <div className="min-w-6 h-6 mr-3 bg-[#ff4365] border-2 border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span>Exclusive content & early access</span>
            </li>
            <li className="flex items-center">
              <div className="min-w-6 h-6 mr-3 bg-[#ff4365] border-2 border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span>Monthly politics & crime newsletter</span>
            </li>
            <li className="flex items-center">
              <div className="min-w-6 h-6 mr-3 bg-[#ff4365] border-2 border-black rounded-full shadow-[1px_1px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span>Support local journalism</span>
            </li>
          </ul>

          <a
            href="https://www.patreon.com/SunlandCo"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-8 py-5 bg-primary text-white text-center font-bold text-lg uppercase tracking-wide rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all relative z-10"
          >
            Get People Pass
          </a>
        </div>
      </div>
    </div>
  );
} 