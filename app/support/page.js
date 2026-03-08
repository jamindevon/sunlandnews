'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';

const supportOptions = [
  {
    title: 'People Pass',
    emoji: '🎟️',
    price: '$9/mo',
    description: 'The best way to support the newsletter. Get exclusive podcasts, 20% off all future merch, and help keep Sunland News free forever.',
    bg: 'bg-brutalBlue',
    ctaText: 'Become a Member',
    href: 'https://www.patreon.com/cw/SunlandCo/membership',
    available: true
  },
  {
    title: 'Buy Me a Coffee',
    emoji: '☕',
    price: 'Any Amount',
    description: 'Just want to say thanks? Buy us a coffee and help fuel the next story.',
    bg: 'bg-brutalYellow',
    ctaText: 'Buy Me a Coffee',
    href: 'https://www.buymeacoffee.com/sunland',
    available: true
  }
];

const benefits = [
  { icon: '🎙️', title: 'Exclusive Podcasts', desc: 'Sunland News podcasts exclusively for People Pass members' },
  { icon: '👕', title: '20% Off Merch', desc: 'Get 20% off all future Sunland Brand merchandise' },
  { icon: '📰', title: 'Support Local News', desc: 'Help keep Sunland News free forever for everyone' },
];

export default function SupportPage() {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        if (typeof window !== 'undefined') {
          const ReactPixel = (await import('react-facebook-pixel')).default;
          ReactPixel.track('ViewContent', {
            content_name: 'Support Options',
            content_category: 'Monetization',
            content_ids: ['people_pass_membership', 'sunland_brand_shirts', 'buy_me_a_coffee']
          });
        }
      } catch (error) {
        console.warn('Failed to track pixel event:', error);
      }
    };
    trackPageView();
  }, []);

  const handleSupportPixel = async (option) => {
    if (option.price && option.price !== 'Any Amount' && option.price !== 'Shop Now') {
      try {
        if (typeof window !== 'undefined') {
          const ReactPixel = (await import('react-facebook-pixel')).default;
          ReactPixel.track('InitiateCheckout', {
            content_name: option.title,
            content_category: 'Support Option',
          });
        }
      } catch (error) {
        console.warn('Failed to track pixel event:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white">
      {/* Buy Me a Coffee Widget */}
      <Script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="sunland"
        data-description="Support me on Buy me a coffee!"
        data-message=""
        data-color="#FF813F"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
        strategy="lazyOnload"
      />

      <div className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-7xl font-black text-black mb-4 uppercase tracking-tight">
            Support Sunland News
          </h1>
          <p className="text-xl font-bold text-gray-800 max-w-2xl mx-auto bg-white inline-block px-6 py-3 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl transform -rotate-1">
            The newsletter is <span className="bg-brutalYellow px-1">free forever and always.</span> But if you want to show love, here's how:
          </p>
        </div>

        {/* Support Cards */}
        <div className="grid md:grid-cols-2 max-w-3xl mx-auto gap-6 mb-16">
          {supportOptions.map((option, index) => (
            <div
              key={option.title}
              className="bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)] transition-all"
            >
              {/* Card Header */}
              <div className={`${option.bg} p-6 border-b-4 border-black text-center`}>
                <div className="text-5xl mb-3">{option.emoji}</div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-black">{option.title}</h3>
                <div className="text-xl font-black text-black mt-1">{option.price}</div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col gap-4">
                <p className="font-bold text-gray-800 leading-relaxed text-center flex-1">
                  {option.description}
                </p>

                {option.available ? (
                  <a
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleSupportPixel(option)}
                    className="w-full py-4 px-6 bg-black text-white font-black uppercase tracking-wider rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-center block"
                  >
                    {option.ctaText}
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-4 px-6 bg-gray-300 text-gray-500 font-black uppercase tracking-wider rounded-xl border-2 border-gray-300 cursor-not-allowed"
                  >
                    {option.ctaText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* People Pass Benefits */}
        <div className="bg-brutalBlue border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "20px 20px" }}></div>

          <h2 className="text-3xl md:text-4xl font-black text-black mb-10 text-center uppercase tracking-tight relative z-10">
            What You Get with People Pass
          </h2>
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {benefits.map((b) => (
              <div key={b.title} className="text-center bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl p-6">
                <div className="text-4xl mb-3">{b.icon}</div>
                <h3 className="font-black text-xl text-black mb-2 uppercase tracking-tight">{b.title}</h3>
                <p className="font-bold text-gray-700 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="font-bold text-gray-700 mb-3">
            Not ready to support yet? No worries — the newsletter is <strong>always free.</strong>
          </p>
          <Link
            href="/"
            className="inline-block font-black uppercase text-sm tracking-widest text-black border-2 border-black px-5 py-2 bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] transition-all rounded-lg"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
