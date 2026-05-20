'use client';
import Link from 'next/link';
import './juneteenth.css';
import RSVPForm from './RSVPForm';

export default function JuneteenthPage() {

  return (
    <div className="juneteenth-wrapper">
      
      {/* Header Links */}
      <div className="absolute top-6 right-6 z-50 flex gap-4">
        <Link href="/619/performer" className="inline-block px-4 py-2 bg-[var(--poster-red)] text-[var(--poster-cream)] brutal-border brutal-shadow-sm font-bold text-sm hover:-translate-y-1 transition-transform rotate-2 uppercase" style={{ fontFamily: 'var(--font-poster)', fontSize: '1.2rem', textDecoration: 'none' }}>
          Apply to Perform
        </Link>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content & Narrative */}
          <div className="space-y-8 animate-fade-in-up">
            
            <div className="inline-block bg-[var(--poster-black)] text-[var(--poster-cream)] px-4 py-2 brutal-border brutal-shadow-sm -rotate-2">
              <span className="text-sm font-bold tracking-wider uppercase flex items-center gap-2">
                ★ FORT PIERCE, FL
              </span>
            </div>

            <div>
              <h1 className="text-7xl md:text-8xl font-serif font-black tracking-tighter uppercase leading-[0.9] mb-4" style={{ fontFamily: 'var(--font-poster)', color: 'var(--poster-red)', textShadow: '4px 4px 0px var(--poster-black)' }}>
                JUNETEENTH <br />
                <span className="text-[var(--poster-black)] inline-block mt-2" style={{ textShadow: 'none' }}>2026</span>
              </h1>
              <p className="text-2xl font-bold bg-[var(--poster-green)] text-white inline-block px-3 py-1 brutal-border brutal-shadow-sm rotate-1 mb-4" style={{ fontFamily: 'var(--font-poster)' }}>
                FREE COMMUNITY CELEBRATION
              </p>
              <p className="text-lg md:text-xl font-medium max-w-xl leading-relaxed mt-4 border-l-4 border-black pl-4">
                Two days of culture, history, and community. Join us for a powerful symposium honoring our past, followed by a massive block party celebrating our future with live music, local vendors, and family fun.
              </p>
            </div>

            {/* RSVP Form Component */}
            <RSVPForm />

          </div>

          {/* Right: Event Details & Bulletin Board */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            
            {/* Day 1 & Day 2 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-white p-6 brutal-border brutal-shadow-sm quirky-tilt rotate-1">
                <div className="w-12 h-12 bg-[var(--poster-green)] brutal-border flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🏛️</span>
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider mb-1" style={{ color: 'var(--poster-green)' }}>Day 1: The Symposium</h3>
                <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-poster)', fontSize: '1.5rem' }}>June 18TH</p>
                <p className="text-md font-medium text-gray-700">6:00 PM - 9:00 PM</p>
              </div>

              <div className="bg-white p-6 brutal-border brutal-shadow-sm quirky-tilt -rotate-1">
                <div className="w-12 h-12 bg-[var(--poster-red)] brutal-border flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🎵</span>
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider mb-1" style={{ color: 'var(--poster-red)' }}>Day 2: Main Event</h3>
                <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-poster)', fontSize: '1.5rem' }}>June 19TH</p>
                <p className="text-md font-medium text-gray-700">12:00 PM - 8:00 PM</p>
              </div>

            </div>

            {/* Location Card */}
            <div className="bg-[var(--poster-black)] text-[var(--poster-cream)] p-6 brutal-border brutal-shadow quirky-tilt-reverse mt-6 rotate-1">
              <div className="flex items-start gap-4 mb-2">
                <div className="w-12 h-12 bg-white brutal-border flex items-center justify-center shrink-0">
                  <span className="text-black text-2xl">📍</span>
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider mb-1" style={{ color: 'var(--poster-cream)', opacity: 0.8 }}>Location</h3>
                  <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poster)', letterSpacing: '0.05em' }}>2902 AVE D, FORT PIERCE, FL</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      
      {/* FOOTER */}
      <footer style={{ marginTop: '5rem', paddingBottom: '3rem', textAlign: 'center' }}>
        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'var(--font-poster)', letterSpacing: '0.05em', color: 'var(--poster-black)' }}>
          ★ JUNETEENTH 2026 CELEBRATION ★
        </p>
      </footer>
    </div>
  );
}
