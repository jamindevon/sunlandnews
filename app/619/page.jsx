'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import './juneteenth.css';
import VolunteerForm from './VolunteerForm';
import PerformerForm from './PerformerForm';

export default function JuneteenthPage() {
  const [activeTab, setActiveTab] = useState('info');
  const mainRef = useRef(null);

  // Automatically scroll to the top of the content when switching tabs
  const handleSwitchTab = (tab) => {
    setActiveTab(tab);
    setTimeout(() => {
      mainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="juneteenth-wrapper">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -2,
          opacity: 0.25,
          filter: 'blur(6px)',
          mixBlendMode: 'multiply'
        }}
      >
        <source src="/JUNETEENTH BG video.mov" />
      </video>

      <div className="j-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
      
      {/* HEADER / HERO */}
      <header style={{ marginBottom: '3rem', marginTop: '3rem' }} className="animate-fade-in-up">
        
        <div style={{ width: '100%', marginBottom: '2rem' }}>
          <div style={{ borderBottom: '4px solid var(--poster-black)', paddingBottom: '1rem', display: 'inline-block' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <span className="poster-star">★</span>
              FORT PIERCE
              <span className="poster-star">★</span>
            </h2>
          </div>
        </div>

        <div style={{ padding: '0 3rem' }}>
          <h1 style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ position: 'absolute', top: '10px', left: '-50px', fontSize: '3rem', transform: 'rotate(-25deg)', color: 'var(--poster-black)' }}>★</span>
            JUNETEENTH
            <span style={{ position: 'absolute', bottom: '10px', right: '-40px', fontSize: '2.5rem', transform: 'rotate(15deg)', color: 'var(--poster-green)' }}>★</span>
          </h1>
        </div>
        <h1 style={{ fontSize: '7.5rem', color: 'var(--poster-black)', marginTop: '0' }}>
          2 0 2 6
        </h1>
        <h2 style={{ fontSize: '4rem', color: 'var(--poster-black)' }}>CELEBRATION</h2>
        
        <div style={{ marginTop: '1rem' }}>
          <span className="highlight" style={{ fontSize: '2.5rem', transform: 'rotate(-3deg)' }}>FREE EVENT</span>
        </div>

        <div style={{ marginTop: '4rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn-primary" 
            style={activeTab === 'info' ? {backgroundColor: 'var(--poster-black)', color: 'var(--poster-cream)', transform: 'translate(4px, 4px)', boxShadow: '0px 0px 0px var(--poster-red)'} : {backgroundColor: 'var(--poster-cream)', color: 'var(--poster-black)'}}
            onClick={() => handleSwitchTab('info')}
          >
            EVENT SCHEDULE
          </button>
          <button 
            className="btn-primary" 
            style={activeTab === 'volunteer' ? {backgroundColor: 'var(--poster-black)', color: 'var(--poster-cream)', transform: 'translate(4px, 4px)', boxShadow: '0px 0px 0px var(--poster-red)'} : {backgroundColor: 'var(--poster-green)', color: 'var(--poster-cream)'}}
            onClick={() => handleSwitchTab('volunteer')}
          >
            BECOME A VOLUNTEER
          </button>
          <Link 
            href="/619/performer"
            className="btn-primary" 
            style={{backgroundColor: 'var(--poster-red)', color: 'var(--poster-cream)', textAlign: 'center'}}
          >
            REGISTER TO PERFORM
          </Link>
        </div>
      </header>

      {/* DYNAMIC CONTENT AREA */}
      <main ref={mainRef} style={{ marginTop: '1rem', textAlign: 'left', minHeight: '500px' }}>
        
        {activeTab === 'info' && (
          <div className="animate-fade-in-up">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '3.5rem' }}>Join the Community</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '850px', margin: '0 auto' }}>
              
              {/* Day 1: Symposium */}
              <div className="feature-box green">
                <div className="feature-icon">★</div>
                <div>
                  <h3 style={{ marginBottom: '0.2rem', color: '#ffffff' }}>THE SYMPOSIUM</h3>
                  <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-poster)', marginBottom: '0.5rem', color: '#ffffff', opacity: 0.9 }}>JUNE 18TH | 6:00 PM - 9:00 PM</p>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff' }}>Museum, Presentation, Q&A Panel, & More.</p>
                </div>
              </div>

              {/* Day 2: Celebration */}
              <div className="feature-box red">
                <div className="feature-icon">★</div>
                <div>
                  <h3 style={{ marginBottom: '0.2rem', color: '#ffffff' }}>MAIN EVENT</h3>
                  <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-poster)', marginBottom: '0.5rem', color: '#ffffff', opacity: 0.9 }}>JUNE 19TH | 12:00 PM - 8:00 PM</p>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff' }}>Live Music, DJs, Local Vendors, Family Fun.</p>
                </div>
              </div>

              {/* Location */}
              <div className="feature-box" style={{ gridColumn: '1 / -1', background: 'var(--poster-black)', color: '#ffffff' }}>
                <div className="feature-icon">📍</div>
                <div>
                  <h3 style={{ marginBottom: '0.2rem', color: 'var(--poster-cream)' }}>LOCATION</h3>
                  <p style={{ fontSize: '2rem', fontFamily: 'var(--font-poster)', letterSpacing: '0.05em' }}>2902 AVE D, FORT PIERCE, FL</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'volunteer' && (
          <div className="brutalist-card" style={{ maxWidth: '650px', margin: '0 auto' }}>
            <VolunteerForm />
          </div>
        )}

      </main>
      
      {/* FOOTER */}
      <footer style={{ marginTop: '5rem', paddingBottom: '3rem', textAlign: 'center' }}>
        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'var(--font-poster)', letterSpacing: '0.05em', color: 'var(--poster-black)' }}>
          ★ JUNETEENTH 2026 CELEBRATION ★
        </p>
      </footer>
    </div>
    </div>
  );
}
