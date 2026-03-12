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

const supporters = [
  { name: 'mommachiefa', action: 'became a supporter.', message: 'Thank you for giving our family fun things to do and ways to be out in our local community!' },
  { name: 'Tangie Jennings', action: 'became a supporter.', message: 'I appreciate you keeping me abreast with local current events happening on The Treasure Coast.' },
  { name: 'Dale Ann Ervin', action: 'became a supporter.', message: 'My daily must-read!' },
  { name: 'FP Born And Raised', action: 'bought 25 coffees.', message: 'I like what I see and I am looking forward to hearing what you have to say. I love this town and your positive approach.' },
  { name: 'Dale Ann Ervin', action: 'bought a coffee.', message: 'I found your name while reading the Bible this morning. You’re named after a Levite.\\n“The Levites... then instructed the people in the Law while everyone remained in their places.”\\nNehemiah 8:7 NLT' },
  { name: 'Misty', action: 'bought 10 coffees.', message: 'Thank you for all your hard work. Both my hubby and I enjoy reading your newsletter and often turn to it when looking for things to do. :)' },
  { name: 'A Local Reader', action: 'bought 10 coffees.', message: 'Thank you for keeping the community informed. We appreciate your work + effort! Look forward to watching Sunland News grow in the years to come.' },
  { name: 'David Diaz', action: 'bought 5 coffees.', message: 'I am new in town and loving Sunland News!' },
  { name: 'Erik Perry', action: 'is now a member.', message: "It's awesome to see you progress from a child at Morningside Academy, to working with you, to seeing you become a pillar of the community, cant wait to watch Sunland become the voice of the Fort 💯" },
  { name: 'Evelyn Lewis Adeyinka', action: 'became a monthly supporter.', message: 'Hello son wake up every morning just to look and see what’s going on keep up the good work' },
  { name: 'Heitor Tremura', action: 'is now a member.', message: 'An incredibly thoughtful newsletter aimed at locals. The world needs more reporting like this.' },
  { name: 'Demar Metcalfe', action: 'bought 5 coffees.', message: 'Thank you for putting together this newsletter that helps keep us connected to local news and events. Through it, I learned about the Treasure Coast Black Chamber of Commerce and had the opportunity to connect with some wonderful people.' },
  { name: 'Tanya Hurt', action: 'bought 50 coffees.', message: 'Keep support our community' },
  { name: 'Tanya Hurt', action: 'is now a member.', message: 'Thank you for keeping us with the news in area of Port St Lucie. I support black businesses' },
  { name: 'Cindy M', action: 'bought 5 coffees.', message: 'I am enjoying your news letter not working right now so I have time to actually read the articles' },
  { name: 'TMCS Community Care', action: 'is now a member.', message: 'Great communication media! We appreciate the informative and useful content. Sunland News has been a great way to learn about the community we now serve!' },
  { name: 'Cheryl Placide', action: 'is now a member.', message: 'Ja’Min,\\nI love how engaging your words are. I love your ‘Sounds like’ after the weather. Your writing reveals your heart and your passion for what you do. Your attention to detail is amazing. We pray favor and success over all you do!\\nCheryl & Jean' },
  { name: 'Dale Ann Ervin', action: 'became a supporter.', message: 'I’ve been reading since the beginning Ja’Min. I’m so proud of you. I agree we need more reporters. We live in Tradition and would love more local Tradition and PSL news. I have referred a couple of people and will continue.' },
  { name: 'Jessica Storey', action: 'is now a member.', message: "The work you're doing is incredibly important! Please keep this up - local communities need more passionate people like you!!" },
  { name: 'geoffrey', action: 'became a supporter.', message: '*love\\nwe need skatetown back lmaoo' },
  { name: 'geoffrey', action: 'is now a member.', message: 'i love the locals, great food and great people.' },
  { name: 'Dorrian Bridges', action: 'is now a member.', message: 'Love the work!' },
  { name: 'Jess J', action: 'is now a member.', message: 'As a newcomer to the state and this area, I’ve found this newsletter to be a major source of not only local news but also historic context. Excited to see where this publication goes!' },
  { name: 'Margaret Lott', action: 'is now a member.', message: 'Keep up the good work!' },
  { name: 'A Local Reader', action: 'is now a member.', message: 'Thank you for your passion for people.' },
  { name: 'Merle Litvack', action: 'is now a member.', message: 'Thank you for your effort to bring attention to one of the most beautiful regions in Florida and my adopted home. I feel our region gets lost between the two larger media markets of Orlando and WPB - so thanks for bringing local news to the local area.' },
  { name: 'Joel D Sparkman', action: 'is now a member.', message: 'Amazed at how much effort you put into this. Love it' },
  { name: 'KAREN CARTWRIGHT', action: 'is now a member.', message: 'Love the content. Keeps us posted on local happenings even when we are traveling.' },
  { name: 'Alex Coto', action: 'is now a member.', message: 'I found you on Reddit a few weeks ago and have been following you ever since. I really appreciate all your efforts. Just yesterday, I was talking with family about one of your articles! Keep it coming.' },
  { name: 'Danielle Brown', action: 'is now a member.', message: "Keep up the good work....I'm so proud of you!!! 🥰" },
  { name: 'Maura Philipps', action: 'is now a member.', message: "It's your biggest fan from reddit! Keep up the amazing work. Let me know if you ever need volunteer help.\\nMaura" },
  { name: 'Denise Jenkins', action: 'is now a member.', message: 'I love the emails! Keep ‘em coming! 😎' },
  { name: 'Timothy du Vall-Brown', action: 'is now a member.', message: 'Looking forward to learning about what’s happening in the area. Thanks for your hard work putting this together!' },
  { name: 'A Local Reader', action: 'became a supporter.', message: 'Thanks for the good info. I look forward to reading my sunland emails.' },
  { name: 'Maura Philipps', action: 'became a supporter.', message: 'I know I say it a lot but I really am proud of you! You are the change we need in this world. Keep up the amazing work!' },
  { name: 'SBQRADIO', action: 'bought 3 coffees.', message: 'keep representin for sunland, my bruvva!' },
  { name: 'Linda', action: 'became a supporter.', message: null },
  { name: 'pslconsumer2024', action: 'bought 5 coffees.', message: null },
  { name: 'Jessica Kadie-Barclay', action: 'is now a member.', message: null },
  { name: 'alex s', action: 'is now a member.', message: null },
  { name: 'New Life Changing Center', action: 'became a monthly supporter.', message: null },
  { name: 'Robynn Holland', action: 'is now a member.', message: null },
  { name: 'Marte McKeon', action: 'is now a member.', message: null },
  { name: 'saintorbin81', action: 'bought 10 coffees.', message: null },
  { name: 'Donna', action: 'is now a member.', message: null },
  { name: 'Deb Frazier', action: 'is now a member.', message: null },
  { name: 'a2n1n5', action: 'bought 5 coffees.', message: null },
  { name: 'A Local', action: 'bought a coffee.', message: null },
  { name: 'Robert Mac Keen', action: 'is now a member.', message: null },
  { name: 'Jonathan Chappel', action: 'is now a member.', message: null },
  { name: 'Mike Knauer', action: 'is now a member.', message: null },
  { name: 'Krystle Martinez', action: 'is now a member.', message: null },
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

        {/* Wall of Love / Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight mb-4 group inline-block">
              <span className="bg-brutalPink text-white px-2 py-1 transform -rotate-2 inline-block shadow-[4px_4px_0px_rgba(0,0,0,1)] border-2 border-black">Wall of Love</span>
            </h2>
            <br />

            {/* 5-Star Social Proof */}
            <div className="flex flex-col items-center gap-6 mb-12">
              <div className="inline-flex flex-col items-center justify-center p-4 bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-2xl transform hover:rotate-1 transition-transform">
                <div className="flex gap-1 text-2xl mb-2">⭐ ⭐ ⭐ ⭐ ⭐</div>
                <p className="font-black text-black text-xl uppercase tracking-tight">
                  "It's Awesome!"
                </p>
                <p className="font-bold text-gray-700 text-sm mt-1">
                  Rated 5 stars by over <span className="text-black bg-brutalYellow px-1">1,700+</span> locals
                </p>
              </div>

              <p className="text-xl font-bold text-gray-800 bg-white inline-block px-4 py-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-lg">
                Hear what our community is saying about Sunland News.
              </p>
            </div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {supporters.filter(s => s.message).map((s, idx) => (
              <div key={idx} className="break-inside-avoid bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-2xl p-6 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all">
                <p className="font-bold text-gray-900 text-lg leading-relaxed mb-4">
                  "{s.message.split('\\n').map((line, i) => <span key={i}>{line}<br /></span>)}"
                </p>
                <div className="flex items-center gap-3 border-t-2 border-dashed border-black pt-4 mt-auto">
                  <div className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center font-black text-white text-lg flex-shrink-0 ${['bg-brutalBlue', 'bg-brutalPink', 'bg-[#ff813f]', 'bg-black'][idx % 4]}`}>
                    {s.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-black text-black uppercase tracking-tight text-sm">{s.name}</div>
                    <div className="font-bold text-gray-500 text-xs">{s.action}</div>
                  </div>
                </div>
              </div>
            ))}
            {/* Render a few random non-message supporters as mini shoutouts */}
            {supporters.filter(s => !s.message).map((s, idx) => (
              <div key={`no-msg-${idx}`} className="break-inside-avoid bg-brutalYellow border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl p-4 flex items-center gap-3">
                <div className="text-2xl">💖</div>
                <div>
                  <div className="font-black text-black uppercase tracking-tight text-sm truncate max-w-[200px]">{s.name}</div>
                  <div className="font-bold text-gray-800 text-xs">{s.action}</div>
                </div>
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
