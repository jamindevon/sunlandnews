'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Products() {
  const [activeTab, setActiveTab] = useState('all');
  const [scrolled, setScrolled] = useState(false);

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

  const products = [
    {
      id: 1,
      name: "772 Eats",
      description: "Discover the best places to eat in St. Lucie County with our curated food guide.",
      category: "food",
      gradientClass: "from-amber-300 to-orange-500",
      link: "https://772eats.com",
      external: true
    },
    {
      id: 2,
      name: "Events Calendar",
      description: "Never miss an event in St. Lucie County with our comprehensive events calendar.",
      category: "events",
      gradientClass: "from-blue-300 to-purple-500",
      link: "https://events.sunland.news",
      external: true
    },
    {
      id: 3,
      name: "Business Directory",
      description: "Support local businesses by browsing our St. Lucie County Business Directory.",
      category: "business",
      gradientClass: "from-green-300 to-teal-500"
    },
    {
      id: 4,
      name: "Sunland Newsletter",
      description: "Stay up to date with our daily newsletter, delivered directly to your inbox.",
      category: "news",
      link: "https://newsletter.sunlandnews.com",
      gradientClass: "from-primary/30 to-primary",
      external: true
    },
    {
      id: 5,
      name: "Job Board",
      description: "Find local employment opportunities and connect with St. Lucie County employers.",
      category: "business",
      gradientClass: "from-blue-400 to-indigo-600"
    }
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.category === activeTab);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
            <div className="text-center px-4 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sunland Products</h1>
              <p className="text-xl text-gray-700">Tools and services built for the St. Lucie community</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Introduction */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Tools for Living Local</h2>
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              Sunland News is more than just a newsletter—we're building a suite of products and tools designed to help you live a more connected local life.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              From discovering great local restaurants to finding community events, our goal is to be your one-stop hub for everything St. Lucie County.
            </p>
          </div>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl p-6 md:p-8 mb-16 shadow-lg animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-6 md:mb-8 text-center">Our Products</h2>
        
        {/* Desktop Tabs */}
        <div className="hidden md:flex justify-center mb-8">
          <div className="inline-flex rounded-lg shadow-sm border border-gray-200 overflow-hidden" role="group">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === 'all' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`px-6 py-3 text-sm font-medium border-l border-gray-200 transition-all duration-200 ${
                activeTab === 'food' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Food
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-3 text-sm font-medium border-l border-gray-200 transition-all duration-200 ${
                activeTab === 'events' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('business')}
              className={`px-6 py-3 text-sm font-medium border-l border-gray-200 transition-all duration-200 ${
                activeTab === 'business' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Business
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-3 text-sm font-medium border-l border-gray-200 transition-all duration-200 ${
                activeTab === 'news' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              News
            </button>
          </div>
        </div>
        
        {/* Mobile Filter Pills */}
        <div className="md:hidden flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              activeTab === 'all' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('food')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              activeTab === 'food' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Food
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              activeTab === 'events' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('business')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              activeTab === 'business' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Business
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              activeTab === 'news' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            News
          </button>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 animate-fade-in-up"
              style={{animationDelay: `${0.1 + index * 0.1}s`}}
            >
              <div className={`h-36 md:h-48 bg-gradient-to-r ${product.gradientClass}`}>
                <div className="h-full w-full flex items-center justify-center">
                  <h3 className="text-xl md:text-2xl font-bold text-white px-4 text-center">{product.name}</h3>
                </div>
              </div>
              <div className="p-5 md:p-6">
                <p className="text-gray-700 mb-6 text-base md:text-lg">{product.description}</p>
                {product.link ? (
                  product.external ? (
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1 duration-300 text-sm md:text-base"
                    >
                      Visit {product.name}
                      <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={product.link}
                      className="inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1 duration-300 text-sm md:text-base"
                    >
                      Explore {product.name}
                    </Link>
                  )
                ) : (
                  <button
                    className="inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1 duration-300 text-sm md:text-base"
                    disabled
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Solutions */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-4">Need a custom solution?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          We offer custom solutions for local businesses and organizations. Contact us to learn more about how we can help you connect with the St. Lucie community.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1 duration-300"
        >
          Get in Touch
          <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
} 