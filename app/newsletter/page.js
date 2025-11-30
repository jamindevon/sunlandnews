'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Newsletter() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
            <div className="text-center px-4 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sunland Daily Newsletter</h1>
              <p className="text-xl text-gray-700">Your daily digest of St. Lucie County news</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Description */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              Stay informed with the latest news and updates from St. Lucie County, delivered to your inbox every morning. Our daily newsletter brings you:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700">
              <li>Breaking local news and updates</li>
              <li>Community events and announcements</li>
              <li>Important developments in St. Lucie County</li>
              <li>Exclusive content and special features</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          Join our community of informed St. Lucie County residents. It's free!
        </p>
        <a
          href="https://newsletter.sunlandnews.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-white font-medium px-8 py-4 rounded-lg text-lg hover:bg-primary/90 transition-colors"
        >
          Send me the news
        </a>
        <p className="text-gray-500 text-sm mt-6">
          Powered by beehiiv • Unsubscribe anytime
        </p>
      </div>
    </div>
  );
} 