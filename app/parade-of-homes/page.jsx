'use client';

import { useState } from 'react';
import { homes } from '../data/parade-homes';
import Image from 'next/image';

export default function ParadeOfHomes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedHomes, setLikedHomes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [started, setStarted] = useState(false);

  const handleLike = () => {
    setLikedHomes([...likedHomes, homes[currentIndex].id]);
    nextHome();
  };

  const handlePass = () => {
    nextHome();
  };

  const nextHome = () => {
    if (currentIndex < homes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowForm(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch('/api/send-parade-homes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, selectedHomeIds: likedHomes }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (!started) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-white py-20">
        <div className="max-w-2xl w-full border-4 border-black p-8 md:p-12 shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-white text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">Parade of Homes Quiz</h1>
          <p className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
            Window shop our featured luxury homes. Swipe right on your favorites, and we'll build a custom list just for you.
          </p>
          <button 
            onClick={() => setStarted(true)}
            className="w-full md:w-auto bg-black text-white text-xl font-bold py-4 px-12 border-4 border-black hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
          >
            START WINDOW SHOPPING
          </button>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-white py-20">
        <div className="max-w-2xl w-full border-4 border-black p-8 md:p-12 shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-white">
          {status === 'success' ? (
            <div className="text-center">
              <h2 className="text-4xl font-black mb-4 uppercase">You're All Set!</h2>
              <p className="text-xl font-medium">We've sent your {likedHomes.length} favorite homes straight to your inbox.</p>
              <button 
                onClick={() => window.location.href = 'https://www.paradeofhomestreasurecoast.com/'}
                className="mt-8 w-full bg-black text-white text-xl font-bold py-4 border-4 border-black hover:bg-white hover:text-black transition-colors"
              >
                RETURN TO PARADE OF HOMES
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-4xl font-black mb-6 uppercase text-center">Get Your List</h2>
              <p className="text-xl font-medium mb-8 text-center leading-relaxed">
                You liked <strong>{likedHomes.length}</strong> {likedHomes.length === 1 ? 'home' : 'homes'}. What's the best email to send these to?
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full text-xl p-4 border-4 border-black font-medium focus:outline-none focus:ring-0 shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-black text-white text-2xl font-black py-5 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-colors disabled:opacity-50 uppercase"
                >
                  {status === 'loading' ? 'SENDING...' : 'SEND ME MY LIST'}
                </button>
                {status === 'error' && (
                  <p className="text-red-500 font-bold text-center mt-2">Oops! Something went wrong. Please try again.</p>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    );
  }

  const currentHome = homes[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-white py-10 md:py-20">
      <div className="w-full max-w-sm mb-4 px-2 flex justify-between font-bold text-black border-b-4 border-black pb-2">
        <span>Home {currentIndex + 1} of {homes.length}</span>
        <span>{likedHomes.length} Saved</span>
      </div>

      <div className="w-full max-w-md border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] bg-white overflow-hidden flex flex-col relative animate-fade-in group">
        <div className="relative w-full aspect-[4/3] bg-gray-100 border-b-4 border-black">
          <img 
            src={currentHome.image} 
            alt={currentHome.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 font-black border-2 border-black">
            {currentHome.price}
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-black tracking-tight leading-tight mb-2 uppercase">{currentHome.name}</h2>
          <p className="text-lg font-bold text-gray-700 mb-6">by {currentHome.builder}</p>
          
          <div className="grid grid-cols-3 gap-2 border-t-4 border-black pt-4 mb-2 h-16">
            <div className="flex flex-col justify-center border-r-4 border-black text-center pr-2">
              <span className="font-black text-lg leading-none">{currentHome.sqft}</span>
              <span className="text-xs font-bold uppercase mt-1">SQ FT</span>
            </div>
            <div className="flex flex-col justify-center border-r-4 border-black text-center px-2">
              <span className="font-black text-lg leading-none">{currentHome.bedrooms}</span>
              <span className="text-xs font-bold uppercase mt-1">BEDS</span>
            </div>
            <div className="flex flex-col justify-center text-center pl-2">
              <span className="font-black text-lg leading-none">{currentHome.bathrooms}</span>
              <span className="text-xs font-bold uppercase mt-1">BATHS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mt-10 w-full max-w-md px-2">
        <button 
          onClick={handlePass}
          className="flex-1 py-4 border-4 border-black bg-white text-black font-black text-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-gray-100 transition-colors uppercase active:translate-y-1 active:shadow-none"
        >
          Pass
        </button>
        <button 
          onClick={handleLike}
          className="flex-1 py-4 border-4 border-black bg-black text-white font-black text-xl shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-white hover:text-black transition-colors uppercase active:translate-y-1 active:shadow-none"
        >
          Love It!
        </button>
      </div>
    </div>
  );
}
