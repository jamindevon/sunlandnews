'use client';

import { useState } from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 border-b border-gray-100">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether it's a story tip, feedback, or just to say hello.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-24">
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          {/* Email */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-3xl">
              📧
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-6">For general inquiries and story tips</p>
            <a
              href="mailto:hello@sunland.news"
              className="text-primary font-bold hover:underline text-lg"
            >
              hello@sunland.news
            </a>
          </div>

          {/* Social Media */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-3xl">
              🌐
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Social Media</h3>
            <p className="text-gray-600 mb-6">Follow us for updates</p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.facebook.com/thesunlandnews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 font-bold hover:text-primary transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com/sunlandnews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 font-bold hover:text-primary transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 p-8 rounded-2xl text-center border border-green-100">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          ✅
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">Thanks for reaching out. We'll get back to you shortly.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-primary font-bold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-2">Subject</label>
        <select
          id="subject"
          name="subject"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
        >
          <option value="">Select a subject</option>
          <option value="story-tip">Story Tip</option>
          <option value="feedback">Feedback</option>
          <option value="partnership">Partnership</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          rows="6"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
          placeholder="How can we help?"
        ></textarea>
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'error' && (
          <p className="text-red-500 mt-4">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  );
}