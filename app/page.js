'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts, fetchFeaturedPosts } from './services/sanityService';
import { createClient } from 'next-sanity';
import { urlFor } from './lib/sanity-image';

// Define the Sanity configuration
const client = createClient({
  projectId: 'oj0fldpz',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

// Page title and description are handled in layout.js for client components
// Cannot export metadata from a client component

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [latestPosts, setLatestPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [subheadlineIndex, setSubheadlineIndex] = useState(0);
  const headlinesRef = useRef(null);

  const subheadlines = [
    "Delivered directly to your inbox 5 days a week.",
    "Hyperlocal stories. Real community impact.",
    "People. Events. Food. Culture. All in one place.",
    "The news St. Lucie County deserves."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSubheadlineIndex((prev) => (prev + 1) % subheadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const [latestData, featuredData] = await Promise.all([
          getPosts(1, 3),
          fetchFeaturedPosts(1)
        ]);
        setLatestPosts(latestData.posts || []);
        setFeaturedPosts(featuredData || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load latest posts');
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      setEmail('');
    }, 1500);
  };

  const NewsletterSignup = ({ className = "" }) => (
    <div className={`${className}`}>
      {subscribed ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-fade-in">
          <svg className="w-10 h-10 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="text-xl font-bold text-green-800 mb-1">Thanks for subscribing!</h3>
          <p className="text-green-700">Check your inbox for a confirmation email.</p>
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
              } transition-all shadow-md hover:shadow-lg whitespace-nowrap hover:-translate-y-1 duration-300`}
            >
              {submitting ? 'Signing Up...' : 'Subscribe Free'}
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Join our <span className="font-medium">5-day a week newsletter</span>. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="py-8 md:py-24">
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-center">
          <div className="md:col-span-7 order-2 md:order-1">
            <h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 animate-fade-in"
              style={{animationDelay: '0.2s'}}
            >
              <span className="text-primary">Hyperlocal news</span> for St. Lucie County
            </h1>
            <div 
              className="h-12 mb-6 overflow-hidden"
              ref={headlinesRef}
            >
              <p 
                className="text-xl md:text-2xl text-gray-700 animate-slide-up opacity-0" 
                style={{ 
                  animationDelay: '0.3s', 
                  animationFillMode: 'forwards',
                  transform: 'translateY(20px)',
                  marginBottom: '0.5rem'
                }}
              >
                {subheadlines[subheadlineIndex]}
              </p>
            </div>
            
            {/* Email Capture Form */}
            <div 
              className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100 animate-slide-up transform transition-all hover:shadow-xl duration-300"
              style={{animationDelay: '0.8s'}}
            >
              <NewsletterSignup />
            </div>
            
            {/* Secondary CTA */}
            <div 
              className="flex flex-wrap gap-4 animate-slide-up"
              style={{animationDelay: '1s'}}
            >
              <Link
                href="/subscribe"
                className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-white font-medium rounded-lg hover:from-primary/90 hover:to-primary transition-all shadow-md hover:shadow-lg hover:-translate-y-1 duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
                Go Premium
              </Link>
            </div>

            <div className="mt-8 animate-fade-in opacity-0" style={{animationDelay: '1.2s', animationFillMode: 'forwards'}}>
              <p className="text-sm text-gray-600 flex items-center">
                <span className="mr-2">✍️</span> Started in Fort Pierce. Growing across Florida.
                <Link href="/vision" className="ml-2 text-primary hover:underline inline-flex items-center group">
                  Read the Vision
                  <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </p>
            </div>
          </div>
          
          <div className="md:col-span-5 order-1 md:order-2 animate-float">
            <div className="hidden md:block relative mx-auto w-[300px] h-[580px]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-primary/10 rounded-[40px] shadow-lg transform rotate-2 animate-pulse-slow"></div>
              <div className="absolute inset-0 bg-white rounded-[36px] shadow-xl transform -rotate-1 overflow-hidden border-8 border-gray-800">
                <div className="absolute top-0 w-full h-6 bg-gray-800 rounded-t-sm"></div>
                <div className="pt-8 px-4 h-full overflow-hidden">
                  <div className="bg-gray-100 rounded-xl p-4 mb-4 animate-slide-in" style={{animationDelay: '0.3s'}}>
                    <h3 className="font-bold text-lg mb-2">Sunland News</h3>
                    <p className="text-sm text-gray-700">Your daily dose of St. Lucie County happenings</p>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-100 rounded-lg p-3 transform transition-transform hover:scale-105 duration-300 animate-slide-in" style={{animationDelay: '0.5s'}}>
                      <div className="w-full h-24 bg-gradient-to-r from-primary/20 to-blue-200 rounded-md mb-2 animate-shimmer"></div>
                      <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-3 w-1/2 bg-gray-300 rounded mt-2 animate-pulse"></div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 animate-slide-in" style={{animationDelay: '0.7s'}}>
                      <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-3 w-2/3 bg-gray-300 rounded mt-2 animate-pulse"></div>
                      <div className="h-3 w-1/2 bg-gray-300 rounded mt-2 animate-pulse"></div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 transform transition-transform hover:scale-105 duration-300 animate-slide-in" style={{animationDelay: '0.9s'}}>
                      <div className="w-full h-24 bg-gradient-to-r from-orange-200 to-primary/30 rounded-md mb-2 animate-shimmer"></div>
                      <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-3 w-1/2 bg-gray-300 rounded mt-2 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-[60px] -right-16 w-32 h-32 bg-primary/10 rounded-full filter blur-2xl animate-blob"></div>
              <div className="absolute bottom-[100px] -left-20 w-40 h-40 bg-blue-200/50 rounded-full filter blur-2xl animate-blob animation-delay-4000"></div>
            </div>
            
            {/* Mobile Phone Preview */}
            <div className="md:hidden relative mx-auto w-[200px] h-[380px] mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-primary/10 rounded-[30px] shadow-lg transform rotate-2 animate-pulse-slow"></div>
              <div className="absolute inset-0 bg-white rounded-[26px] shadow-xl transform -rotate-1 overflow-hidden border-6 border-gray-800">
                <div className="absolute top-0 w-full h-4 bg-gray-800 rounded-t-sm"></div>
                <div className="pt-6 px-3 h-full overflow-hidden">
                  <div className="bg-gray-100 rounded-lg p-3 mb-3 animate-slide-in" style={{animationDelay: '0.3s'}}>
                    <h3 className="font-bold text-sm mb-1">Sunland News</h3>
                    <p className="text-xs text-gray-700">Your daily local updates</p>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-gray-100 rounded-lg p-2 transform transition-transform hover:scale-105 duration-300 animate-slide-in" style={{animationDelay: '0.5s'}}>
                      <div className="w-full h-16 bg-gradient-to-r from-primary/20 to-blue-200 rounded-md mb-2 animate-shimmer"></div>
                      <div className="h-3 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-2 w-1/2 bg-gray-300 rounded mt-1 animate-pulse"></div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-2 animate-slide-in" style={{animationDelay: '0.7s'}}>
                      <div className="h-3 w-3/4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-2 w-2/3 bg-gray-300 rounded mt-1 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Content */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 rounded-3xl my-16 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2 animate-fade-in-up">🌱 From the Garden: Latest Stories</h2>
          <p className="text-center text-gray-600 mb-10 animate-fade-in-up" style={{animationDelay: '0.1s'}}>The freshest stories from St. Lucie County</p>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-gray-600 py-20">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {latestPosts.slice(0, 2).map((post, index) => (
                <Link 
                  key={post._id || post.id} 
                  href={post.slug && post.slug.current 
                    ? `/stories/${post.slug.current}` 
                    : `/stories/${post._id || post.id}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow animate-fade-in-up"
                  style={{animationDelay: `${0.2 + index * 0.1}s`}}
                >
                  <div className="h-64 bg-gray-200 relative overflow-hidden">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(800).height(600).url()}
                        alt={post.title?.rendered || 'Story image'}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <span className="text-white text-opacity-80 text-lg">No image available</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 
                      className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Untitled Post' }}
                    ></h3>
                    <div 
                      className="text-gray-600 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || 'No excerpt available' }}
                    ></div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="text-center animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <Link 
              href="/stories"
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 duration-300"
              prefetch={true}
            >
              Browse All Stories
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Behind the Mission (Mini About Tease) */}
      <section className="py-16 my-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 animate-fade-in-up">Behind the Mission</h2>
          <p className="text-xl text-gray-700 mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Sunland News was born out of frustration—with news that didn't feel local, didn't feel personal. So I built something that did.
          </p>
          <Link 
            href="/about" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 duration-300 animate-fade-in-up"
            style={{animationDelay: '0.2s'}}
          >
            Meet the Founder
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </section>
      
      {/* Where We're Headed (Mini Vision Tease) */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-blue-50 to-primary/5 rounded-3xl my-16 shadow-sm">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6 animate-fade-in-up">Where We're Headed</h2>
          <p className="text-xl text-gray-700 mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            We're not just covering St. Lucie County. We're building a model for people-first news across Florida.
          </p>
          <Link 
            href="/vision" 
            className="inline-flex items-center px-6 py-3 bg-white border border-primary text-primary font-medium rounded-lg hover:bg-primary/5 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 duration-300 animate-fade-in-up"
            style={{animationDelay: '0.2s'}}
          >
            Explore the Vision
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </section>
      
      {/* Tools We're Building (Mini Products Preview) */}
      <section className="py-16 my-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6 animate-fade-in-up">Tools We're Building</h2>
          <p className="text-xl text-gray-700 mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Sunland isn't just news—it's tools for living more local. From restaurant guides to job boards, we're building tech that keeps small communities strong.
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-1 duration-300 animate-fade-in-up"
            style={{animationDelay: '0.2s'}}
          >
            See Our Products
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </section>
      
      {/* Newsletter Signup (Bottom) */}
      <section className="py-16 bg-white rounded-3xl border border-gray-100 shadow-lg my-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">Ready to read local again?</h2>
          <p className="text-xl text-gray-700 mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Join 5,000+ readers getting the real stories of St. Lucie County.
          </p>
          <div className="max-w-xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
} 