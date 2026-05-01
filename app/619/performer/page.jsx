'use client';
import Link from 'next/link';
import '../juneteenth.css';
import PerformerForm from '../PerformerForm';

export default function PerformerApplicationPage() {
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
          opacity: 0.15,
          filter: 'blur(8px)',
          mixBlendMode: 'multiply'
        }}
      >
        <source src="/JUNETEENTH BG video.mov" />
      </video>

      <div className="j-container" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Simple Navigation */}
        <div style={{ marginBottom: '2rem', textAlign: 'center', padding: '0 1rem' }}>
          <Link href="/619" style={{
            fontFamily: 'var(--font-poster)',
            fontSize: 'max(1.2rem, 4vw)',
            color: 'var(--poster-black)',
            textDecoration: 'none',
            borderBottom: '2px solid var(--poster-black)',
            wordBreak: 'break-word',
            display: 'inline-block'
          }}>
            ← BACK TO JUNETEENTH EVENT INFO
          </Link>
        </div>

        {/* Form Container */}
        <div className="brutalist-card form-page-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <PerformerForm />
        </div>
        
      </div>
    </div>
  );
}
