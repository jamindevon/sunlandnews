'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
            <div className="text-center px-4 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
              <p className="text-xl text-gray-700">We'd love to hear from you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Options */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">How to Reach Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Email */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">For general inquiries and story tips</p>
              <a 
                href="mailto:hello@sunland.news" 
                className="text-primary hover:underline inline-flex items-center group"
              >
                hello@sunland.news
                <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-2">Social Media</h3>
              <p className="text-gray-600 mb-4">Follow us for updates and community</p>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com/sunlandnews" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center group"
                >
                  Twitter
                  <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/sunlandnews" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center group"
                >
                  Instagram
                  <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl p-8 mb-16 shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              >
                <option value="">Select a subject</option>
                <option value="story-tip">Story Tip</option>
                <option value="feedback">Feedback</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Your message..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">How do I submit a story tip?</h3>
              <p className="text-gray-700">You can submit story tips through our contact form, email us directly, or reach out on social media. We review all submissions and will get back to you if we need more information.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">How long does it take to get a response?</h3>
              <p className="text-gray-700">We aim to respond to all inquiries within 24-48 hours. For urgent story tips, we may respond more quickly.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Do you accept guest submissions?</h3>
              <p className="text-gray-700">Yes, we welcome guest submissions! Please email us with your pitch or completed article, and we'll review it for publication.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-gradient-to-br from-primary/20 via-orange-100 to-blue-50 rounded-2xl p-8 text-center shadow-lg animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          If you're having trouble reaching us or need immediate assistance, check our FAQ section or try reaching out on social media.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#faq" className="px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1">
            View FAQ
          </a>
          <a href="https://twitter.com/sunlandnews" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-primary border border-primary font-medium rounded-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1">
            Tweet Us
          </a>
        </div>
      </div>
    </div>
  );
} 