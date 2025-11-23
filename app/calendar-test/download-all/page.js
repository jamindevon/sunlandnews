'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DownloadAll() {
  const router = useRouter();

  useEffect(() => {
    // Trigger download immediately
    const link = document.createElement('a');
    link.href = '/calendar-test/thanksgiving-week-2025.ics';
    link.download = 'thanksgiving-week-2025.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Redirect to join page after 1 second
    setTimeout(() => {
      router.push('/calendar-test/join');
    }, 1000);
  }, [router]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📥</div>
        <h1 style={{ fontSize: '24px', marginBottom: '12px', color: '#1a202c' }}>
          Downloading Events...
        </h1>
        <p style={{ fontSize: '14px', color: '#718096' }}>
          Your calendar file is downloading. You'll be redirected in a moment.
        </p>
      </div>
    </div>
  );
}
