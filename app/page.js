'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [latestNewsletter, setLatestNewsletter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLatestNewsletter() {
      try {
        const response = await fetch('/api/wordpress?endpoint=newsletter&count=1');
        if (response.ok) {
          const data = await response.json();
          setLatestNewsletter(data.items?.[0] || null);
        }
      } catch (err) {
        console.error('Error fetching newsletter:', err);
      } finally {
        setLoading(false);
      }
    }

    loadLatestNewsletter();
  }, []);

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
          source: 'homepage',
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
      setSubscribed(true);
      setEmail('');
    } finally {
      setSubmitting(false);
    }
  };

  const NewsletterSignup = ({ className = "", showDescription = true }) => (
    <div className={`${className}`}>
      {subscribed ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-fade-in">
          <svg className="w-10 h-10 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-xl font-bold text-green-800 mb-1">You're in!</h3>
          <p className="text-green-700">Check your inbox for our welcome email.</p>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg flex-grow border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors shadow-sm"
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className={`px-6 py-3 rounded-lg font-medium text-white ${
                submitting ? 'bg-gray-400' : 'bg-primary hover:bg-primary/90'
              } transition-all shadow-md hover:shadow-lg hover:-translate-y-1 duration-300 whitespace-nowrap`}
            >
              {submitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {showDescription && (
            <p className="text-xs text-gray-500 text-center">
              Free daily newsletter • Unsubscribe anytime
            </p>
          )}
        </form>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-200 via-primary/30 to-blue-100 py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your daily guide to life in<br />
            <span className="text-primary">St. Lucie County</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            The hyperlocal news, events, and stories that matter to your community. 
            Delivered fresh to your inbox 5 days a week.
          </p>
          <div className="max-w-lg mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-16">
        {/* What We Cover */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">What We Cover</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: 'News',
                icon: '📰',
                description: 'Local government, community issues, and stories that impact your daily life.',
                color: 'bg-blue-100 text-blue-700'
              },
              {
                title: 'Events',
                icon: '🎉',
                description: 'Festivals, community gatherings, and things to do this weekend.',
                color: 'bg-purple-100 text-purple-700'
              },
              {
                title: 'Eats',
                icon: '🍽️',
                description: 'New restaurants, local favorites, and food scenes worth knowing about.',
                color: 'bg-orange-100 text-orange-700'
              },
              {
                title: 'Play',
                icon: '🌞',
                description: 'Recreation, sports, beaches, and ways to enjoy the Florida lifestyle.',
                color: 'bg-green-100 text-green-700'
              }
            ].map((item, index) => (
              <div key={item.title} className={`${item.color} rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300`}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Today's Edition */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Today's Edition</h2>
            <Link 
              href="/news"
              className="text-primary font-medium hover:text-primary/80 transition-colors"
            >
              View All News →
            </Link>
          </div>
          
          {loading ? (
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading today's edition...</p>
            </div>
          ) : latestNewsletter ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(latestNewsletter.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors">
                    <Link href="/newsletter/latest">
                      {latestNewsletter.title}
                    </Link>
                  </h3>
                  <div className="text-gray-600 mb-6 line-clamp-3">
                    {latestNewsletter.excerpt}
                  </div>
                  <Link 
                    href="/newsletter/latest"
                    className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    Read Full Edition
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                {latestNewsletter.featured_image && (
                  <div className="flex-shrink-0 hidden md:block">
                    <Image
                      src={latestNewsletter.featured_image}
                      alt={latestNewsletter.title}
                      width={200}
                      height={150}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fresh Content Daily</h3>
              <p className="text-gray-600 mb-6">
                Every weekday morning, we deliver the latest news, events, and happenings from St. Lucie County.
              </p>
              <Link 
                href="/news"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Browse All News
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </section>

        {/* Why Sunland */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-primary/10 to-blue-100 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Sunland News?</h2>
              <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-8 leading-relaxed">
                "Finally, a newsletter that actually covers what's happening in my neighborhood. 
                No clickbait, no politics - just real local news I can use."
              </blockquote>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Sarah M.</p>
                  <p className="text-sm text-gray-600">Port St. Lucie Resident</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">5 Days</div>
                  <p className="text-gray-600">Fresh content every weekday</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">7,500+</div>
                  <p className="text-gray-600">Local subscribers</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">100%</div>
                  <p className="text-gray-600">Free to read</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Join 7,500+ locals who start their day with Sunland News
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get the stories that matter to St. Lucie County delivered to your inbox every weekday morning. 
            No spam, no politics - just local news you can use.
          </p>
          <div className="max-w-md mx-auto mb-8">
            <NewsletterSignup showDescription={false} />
          </div>
          <p className="text-sm text-gray-500">
            Questions? <Link href="/about" className="text-primary hover:underline">Learn more about our mission</Link> or <Link href="/news" className="text-primary hover:underline">browse our latest stories</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}

 