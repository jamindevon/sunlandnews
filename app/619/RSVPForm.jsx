'use client';
import { useState } from 'react';

export default function RSVPForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulating API call for now. 
    // In reality, this would hit Zapier or a local API route to store the email.
    try {
      // await fetch('/api/619/rsvp', { method: 'POST', body: JSON.stringify({ email }) })
      setTimeout(() => setStatus('success'), 1000);
    } catch (err) {
      setStatus('error');
      setErrorMsg('Something went wrong. Try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[var(--poster-green)] text-[var(--poster-cream)] p-6 brutal-border brutal-shadow-sm mt-8 max-w-md animate-fade-in-up">
        <h3 className="font-bold text-2xl mb-2 uppercase" style={{ fontFamily: 'var(--font-poster)', letterSpacing: '0.05em' }}>★ YOU'RE ON THE LIST</h3>
        <p className="font-medium text-lg">
          Thanks for RSVPing! We'll email you the official schedule and VIP updates soon.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 sm:p-8 brutal-border brutal-shadow-sm sm:brutal-shadow mt-8 w-full max-w-2xl mx-auto animate-fade-in-up">
      <h3 className="font-bold text-2xl mb-3 uppercase" style={{fontFamily: 'var(--font-poster)', fontSize: '2.5rem', color: 'var(--poster-black)'}}>
        Get The Schedule First
      </h3>
      <p className="font-medium mb-5 text-sm sm:text-base text-gray-800" style={{ fontWeight: 600 }}>
        Drop your email below and we'll send you the official Juneteenth 2026 map, vendor list, and set times before anyone else.
      </p>
      
      {status === 'error' && <p className="text-red-600 font-bold mb-2">{errorMsg}</p>}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com" 
          required
          className="w-full p-4 brutal-border bg-[#f9fafb] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--poster-orange)] transition-all font-bold text-lg"
          style={{ border: '3px solid var(--poster-black)', fontFamily: 'var(--font-body)' }}
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="btn-primary"
          style={{ width: '100%', fontSize: '2rem', padding: '1rem', backgroundColor: 'var(--poster-red)', color: 'var(--poster-cream)' }}
        >
          {status === 'loading' ? 'SENDING...' : 'RSVP FOR UPDATES'}
        </button>
      </form>
    </div>
  );
}
