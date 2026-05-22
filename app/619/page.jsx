'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './juneteenth.css';
import RSVPForm from './RSVPForm';

export default function JuneteenthPage() {
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const mainEl = document.querySelector('main');
    if (mainEl) {
      const originalClasses = mainEl.className;
      mainEl.className = 'flex-grow w-full';
      return () => {
        mainEl.className = originalClasses;
      };
    }
  }, []);

  const lineupItems = [
    // Food Trucks & Tents (7 items)
    { name: "Bo's Mobile Fresh Seafood", category: "Food Truck" },
    { name: "OH BOY BBQ", category: "Food Truck" },
    { name: "R & L", category: "Food Truck" },
    { name: "D and T Catering", category: "Food Truck" },
    { name: "Snoballs Seafood & Wings", category: "Food Truck" },
    { name: "Tornado Enterprise Inc. (Mediterranean)", category: "Food Tent" },
    { name: "Turkey Everything LLC", category: "Food Tent" },

    // Sweets & Treats (6 items)
    { name: "Smacking Traps", category: "Sweets" },
    { name: "Goshen Cafe (Italian Ice)", category: "Sweets" },
    { name: "Sweet Krave", category: "Sweets" },
    { name: "DQTYZ Twisted Treats", category: "Sweets" },
    { name: "Sweet Treats by Naty", category: "Sweets" },
    { name: "DonutNV", category: "Sweets" },

    // Community & Merchants (18 items)
    { name: "Amandla Wellness Center", category: "Merchant" },
    { name: "Barbershop Blood Pressure", category: "Merchant" },
    { name: "Florida Blue", category: "Merchant" },
    { name: "Council on Aging", category: "Merchant" },
    { name: "TCBU (Mobile Unit)", category: "Merchant" },
    { name: "Primerica Financial Services", category: "Merchant" },
    { name: "IThink Financial", category: "Merchant" },
    { name: "Simply Covered (Lemonade)", category: "Merchant" },
    { name: "3 Sweet Lemons", category: "Merchant" },
    { name: "Ciara Smith (Sweets)", category: "Merchant" },
    { name: "The Cappello Family (Honey)", category: "Merchant" },
    { name: "KrazyfruitbyT (Candy Fruit)", category: "Merchant" },
    { name: "Empire P.E. Scented Candles", category: "Merchant" },
    { name: "IvoryCo.", category: "Merchant" },
    { name: "Omicron Tau Chapter, Omega Psi Phi", category: "Merchant" },
    { name: "Be Xquisit (Event Hall)", category: "Merchant" },
    { name: "Bloved Enterprise", category: "Merchant" },
    { name: "Bernard Taylor For Congress", category: "Merchant" }
  ];

  const filteredItems = lineupItems.filter(item => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Food Trucks') return item.category === 'Food Truck';
    if (activeTab === 'Food Tents') return item.category === 'Food Tent';
    if (activeTab === 'Sweets') return item.category === 'Sweets';
    if (activeTab === 'Merchants') return item.category === 'Merchant';
    return true;
  });

  const getNameSizeClass = (name) => {
    const len = name.length;
    if (len > 28) return 'text-sm sm:text-base md:text-lg';
    if (len > 18) return 'text-base sm:text-lg md:text-xl';
    return 'text-lg sm:text-xl md:text-2xl';
  };

  return (
    <div className="juneteenth-wrapper">
      
      {/* Fixed Background Video and Overlay */}
      <div className="fixed-video-container">
        <video autoPlay loop muted playsInline>
          <source src="/JUNETEENTH BG video.mov" />
        </video>
        <div className="fixed-video-overlay"></div>
      </div>
      
      {/* Hero Section containing hero content */}
      <div className="hero-section">
        <div className="relative z-10 w-full px-4 md:px-12 pt-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left: Giant Poster Typography & Info */}
            <div className="lg:col-span-8 space-y-8 animate-fade-in-up">
              <div className="inline-block bg-[var(--poster-black)] text-[var(--poster-cream)] px-5 py-2.5 brutal-border brutal-shadow-sm -rotate-2">
                <span className="text-base font-black tracking-wider uppercase flex items-center gap-2">
                  ★ FORT PIERCE, FL
                </span>
              </div>

              <div>
                <h1 className="font-black uppercase tracking-wider mb-6 w-full flex flex-col space-y-4" style={{ fontFamily: 'var(--font-poster)', color: 'var(--poster-cream)' }}>
                  <span className="block text-[clamp(3.5rem,14vw,18rem)] leading-none" style={{ textShadow: 'var(--title-shadow)' }}>
                    ART.
                  </span>
                  <span className="block text-[clamp(1.75rem,7vw,9rem)] leading-none" style={{ textShadow: 'var(--title-shadow)' }}>
                    CULTURE.
                  </span>
                  <span className="block text-[clamp(1.75rem,7vw,9rem)] leading-none text-[var(--poster-yellow)]" style={{ textShadow: 'var(--title-shadow)' }}>
                    FREEDOM.
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl font-black bg-[var(--poster-red)] text-[var(--poster-cream)] inline-block px-4 py-1.5 brutal-border brutal-shadow-sm rotate-1 mb-6" style={{ fontFamily: 'var(--font-poster)', letterSpacing: '0.05em' }}>
                  FREE COMMUNITY CELEBRATION
                </p>
                <p className="text-lg md:text-xl lg:text-2xl font-semibold max-w-2xl leading-relaxed mt-2 border-l-4 border-[var(--poster-yellow)] pl-4 text-[var(--poster-cream)] drop-shadow-md">
                  Two days of culture, history, and community. Join us for a powerful symposium honoring our past, followed by a massive block party celebrating our future with live music, local vendors, and family fun.
                </p>
              </div>
            </div>

            {/* Right: Event Schedule Bulletin Clippings */}
            <div className="lg:col-span-4 space-y-6 animate-fade-in-up flex flex-col justify-center" style={{ animationDelay: '0.2s' }}>
              <div className="bg-[var(--poster-yellow)] text-black p-5 md:p-8 brutal-border brutal-shadow rotate-1">
                <h2 className="text-4xl font-black uppercase mb-4" style={{ fontFamily: 'var(--font-poster)' }}>★ SCHEDULE</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-wider text-[var(--poster-red)]">THURSDAY, JUNE 18 — 6:00 PM - 9:00 PM</h3>
                    <p className="text-2xl md:text-3xl font-black leading-none mt-0.5" style={{ fontFamily: 'var(--font-poster)' }}>EDUCATION SYMPOSIUM</p>
                    <p className="text-xs font-semibold mt-1">Featuring Sankofa Historic Mobile Museum at Percy Peek Gymnasium.</p>
                  </div>
                  <hr className="border-black border-dashed" />
                  <div>
                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-wider text-[var(--poster-green)]">FRIDAY, JUNE 19 — 12:00 PM - 8:00 PM</h3>
                    <p className="text-2xl md:text-3xl font-black leading-none mt-0.5" style={{ fontFamily: 'var(--font-poster)' }}>FESTIVAL & ACTIVATIONS</p>
                    <div className="text-[11px] font-bold mt-1.5 space-y-1 text-black opacity-90 leading-tight">
                      <p>⚡ <span className="text-[var(--poster-red)] uppercase font-extrabold">Gym (12-4 PM):</span> Career Fair, Health Screenings, Highwaymen Paint Class, and Free Haircuts for youth/job seekers.</p>
                      <p>⚡ <span className="text-[var(--poster-green)] uppercase font-extrabold">Outdoor (12-8 PM):</span> Youth Performances, Live Band, Cultural Performances, E-sport Tournament (Game Truck), Haircuts for Charity (TCBU Mobile Unit), and Community Resource Partners.</p>
                    </div>
                  </div>
                  <hr className="border-black border-dashed" />
                  <div>
                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-wider text-black opacity-60">LOCATION</h3>
                    <p className="text-2xl md:text-3xl font-black leading-none mt-0.5" style={{ fontFamily: 'var(--font-poster)' }}>PERCY PEEK GYMNASIUM & LOT</p>
                    <p className="text-xs font-bold opacity-80">2902 Avenue D, Fort Pierce, FL</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* Marquee Ticker 1 */}
      <div className="marquee-container my-8">
        <div className="marquee-track">
          <span>★ JUNETEENTH 2026 ★ FORT PIERCE, FL ★ FREE COMMUNITY CELEBRATION ★ LIVE MUSIC ★ FOOD TRUCKS ★ ART & HISTORY ★&nbsp;</span>
          <span>★ JUNETEENTH 2026 ★ FORT PIERCE, FL ★ FREE COMMUNITY CELEBRATION ★ LIVE MUSIC ★ FOOD TRUCKS ★ ART & HISTORY ★&nbsp;</span>
        </div>
      </div>

      {/* Interactive Vendor Grid Section */}
      <div className="relative z-10 w-full px-4 md:px-12 py-8">
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase text-center mb-4" style={{ fontFamily: 'var(--font-poster)', color: 'var(--poster-cream)', textShadow: 'var(--title-shadow-sm)' }}>
          ★ VENDORS & ACTIVATIONS ★
        </h2>
        <p className="text-center font-bold text-lg mb-10 text-[var(--poster-yellow)] max-w-2xl mx-auto" style={{ textShadow: '2px 2px 0px var(--poster-black)' }}>
          Explore our food trucks, tents, sweets, and community merchants.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 max-w-4xl mx-auto">
          {[
            { id: 'All', label: '★ All Vendors' },
            { id: 'Food Trucks', label: '★ Food Trucks' },
            { id: 'Food Tents', label: '★ Food Tents' },
            { id: 'Sweets', label: '★ Sweets & Treats' },
            { id: 'Merchants', label: '★ Merchants & Orgs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 md:px-5 md:py-2.5 font-black uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-lg brutal-border transition-all duration-150 ${
                activeTab === tab.id
                  ? 'bg-[var(--poster-yellow)] text-black -translate-y-0.5 md:-translate-y-1 brutal-shadow-sm md:brutal-shadow'
                  : 'bg-[var(--poster-black)] text-[var(--poster-cream)] hover:-translate-y-0.5 hover:bg-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="lineup-grid">
          {filteredItems.map((item, index) => {
            const catClass = item.category.toLowerCase().replace(/\s+/g, '-');
            return (
              <div 
                key={index} 
                className={`lineup-item cat-${catClass} flex flex-col justify-between items-center relative group p-4 sm:p-6`}
              >
                <span className="text-[10px] md:text-xs font-black tracking-widest uppercase border border-dashed px-2 py-0.5 rounded mb-3 lineup-item-badge">
                  ★ {item.category}
                </span>
                <span className={`text-center w-full grow flex items-center justify-center font-black leading-tight uppercase ${getNameSizeClass(item.name)}`}>
                  ★ {item.name} ★
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee Ticker 2 (Green) */}
      <div className="marquee-container green my-8">
        <div className="marquee-track">
          <span>★ FREE COMMUNITY EVENT ★ GET THE SCHEDULE FIRST ★ COMMEMORATE FREEDOM ★ ALL ARE WELCOME ★&nbsp;</span>
          <span>★ FREE COMMUNITY EVENT ★ GET THE SCHEDULE FIRST ★ COMMEMORATE FREEDOM ★ ALL ARE WELCOME ★&nbsp;</span>
        </div>
      </div>

      {/* Playlist / Soundtrack Section */}
      <div className="relative z-10 w-full px-4 md:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[var(--poster-pink)] text-[var(--poster-cream)] p-5 md:p-8 brutal-border brutal-shadow -rotate-1 text-center">
            <h2 className="text-5xl md:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'var(--font-poster)' }}>
              ★ THE SOUNDTRACK OF FREEDOM ★
            </h2>
            <p className="font-bold text-lg mb-8 max-w-2xl mx-auto" style={{ color: 'var(--poster-cream)' }}>
              Get into the spirit of Juneteenth 2026. Listen to the official curated playlist featuring tracks and artists defining this year's festival.
            </p>
            
            <div className="w-full aspect-video brutal-border brutal-shadow-sm overflow-hidden bg-black max-w-3xl mx-auto">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/videoseries?list=PLd4UFeulPDefXji7AOegZ6aiZ5qAgm1kq" 
                title="Juneteenth 2026 Playlist" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Section */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 pb-28 mt-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-4" style={{ fontFamily: 'var(--font-poster)', color: 'var(--poster-cream)', textShadow: 'var(--title-shadow-sm)' }}>
            JOIN THE CELEBRATION
          </h2>
          <p className="font-semibold text-[var(--poster-cream)] text-lg opacity-95">
            Register below to receive exclusive set time releases, vendor maps, and festival alerts.
          </p>
        </div>
        <RSVPForm />
      </div>

      {/* Marquee Ticker 3 (Orange) */}
      <div className="marquee-container orange my-8">
        <div className="marquee-track">
          <span>★ ALL ARE WELCOME ★ NO TICKETS REQUIRED ★ FREE ADMISSION ★ LIVE ART & MUSIC ★&nbsp;</span>
          <span>★ ALL ARE WELCOME ★ NO TICKETS REQUIRED ★ FREE ADMISSION ★ LIVE ART & MUSIC ★&nbsp;</span>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ marginTop: '3rem', paddingBottom: '3rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'var(--font-poster)', letterSpacing: '0.05em', color: 'var(--poster-cream)', textShadow: '2px 2px 0px var(--poster-black)' }}>
          ★ JUNETEENTH 2026 CELEBRATION ★
        </p>
      </footer>
    </div>
  );
}
