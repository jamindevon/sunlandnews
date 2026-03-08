'use client';

import { useState } from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-brutalPink selection:text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 border-b-2 border-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 leading-tight uppercase tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl font-bold text-gray-800 max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether it's a story tip, feedback, or just to say hello.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-24">
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          {/* Email */}
          <div className="bg-white p-8 rounded-3xl border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all text-center">
            <div className="w-16 h-16 bg-brutalYellow rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-3xl">
              📧
            </div>
            <h3 className="text-2xl font-black text-black mb-2 uppercase tracking-tight">Email Us</h3>
            <p className="text-gray-800 font-bold mb-6">For general inquiries and story tips</p>
            <a
              href="mailto:hello@sunland.news"
              className="text-black font-black hover:text-primary uppercase tracking-wide underline decoration-4 underline-offset-4 decoration-primary transition-colors text-lg"
            >
              hello@sunland.news
            </a>
          </div>

          {/* Social Media */}
          <div className="bg-white p-8 rounded-3xl border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all text-center">
            <div className="w-16 h-16 bg-brutalBlue rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-3xl">
              🌐
            </div>
            <h3 className="text-2xl font-black text-black mb-2 uppercase tracking-tight">Social Media</h3>
            <p className="text-gray-800 font-bold mb-6">Follow us for updates</p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.facebook.com/thesunlandnews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-black uppercase tracking-wide hover:text-primary transition-colors underline decoration-2 decoration-transparent hover:decoration-primary underline-offset-4"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com/sunlandnews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-black uppercase tracking-wide hover:text-primary transition-colors underline decoration-2 decoration-transparent hover:decoration-primary underline-offset-4"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-black mb-8 text-center uppercase tracking-tight">Send a Message</h2>
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
      <div className="bg-brutalBg p-8 rounded-2xl text-center border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        <div className="w-16 h-16 bg-green-400 border-2 border-black rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center justify-center mx-auto mb-4 text-3xl">
          ✅
        </div>
        <h3 className="text-2xl font-black text-black mb-2 uppercase tracking-tight">Message Sent!</h3>
        <p className="text-gray-800 font-bold mb-6 text-lg">Thanks for reaching out. We'll get back to you shortly.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-black font-black hover:text-primary uppercase underline decoration-2 underline-offset-4 transition-colors"
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
          <label htmlFor="name" className="block text-sm font-black text-black uppercase tracking-wider mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-5 py-4 bg-white border-2 border-black rounded-xl font-bold text-black placeholder:text-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-black text-black uppercase tracking-wider mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-5 py-4 bg-white border-2 border-black rounded-xl font-bold text-black placeholder:text-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
            placeholder="your@email.com"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-black text-black uppercase tracking-wider mb-2">Subject</label>
        <select
          id="subject"
          name="subject"
          className="w-full px-5 py-4 bg-white border-2 border-black rounded-xl font-bold text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer appearance-none"
          required
        >
          <option value="">Select a subject</option>
          <option value="story-tip">Story Tip</option>
          <option value="feedback">Feedback</option>
          <option value="partnership">Partnership</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-black text-black uppercase tracking-wider mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          rows="6"
          className="w-full px-5 py-4 bg-white border-2 border-black rounded-xl font-bold text-black placeholder:text-gray-500 shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all resize-none"
          placeholder="How can we help?"
          required
        ></textarea>
      </div>

      <div className="text-center pt-8">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center px-10 py-5 bg-primary text-white font-bold text-lg uppercase tracking-wide rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'error' && (
          <p className="text-red-500 font-bold mt-6 py-2 px-4 bg-red-100 border-2 border-red-500 rounded-lg inline-block">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  );
}