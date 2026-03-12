'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

function ThankYouForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledEmail = searchParams.get('email') || '';

  const [formData, setFormData] = useState({
    interest: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Track conversion on load
  useEffect(() => {
    const trackConversion = async () => {
      try {
        if (typeof window !== 'undefined') {
          const ReactPixel = (await import('react-facebook-pixel')).default;
          ReactPixel.track('CompleteRegistration', {
            content_name: 'Newsletter Signup Complete',
            content_category: 'Email Subscription',
            status: 'completed'
          });
        }
      } catch (error) {
        console.warn('Failed to track pixel event:', error);
      }
    };
    trackConversion();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Required field validation (HTML5 covers most, but fallback here)
    if (!formData.interest) {
      setError('Please select an option.');
      setSubmitting(false);
      return;
    }

    try {
      // Save to new DB and tag in Beehiiv
      const response = await fetch('/api/segment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: prefilledEmail,
          interest: formData.interest
        })
      });

      // Don't strongly block on failure — still redirect them
      if (!response.ok) {
        console.warn('Segment save failed, proceeding anyway');
      }
    } catch (err) {
      console.error('Submission error:', err);
    }

    // Redirect user depending on their selected interest
    if (formData.interest === 'Events, things to do, food, and new openings') {
      const destUrl = prefilledEmail
        ? `https://calendar.sunlandnews.com/thank-you?email=${encodeURIComponent(prefilledEmail)}`
        : 'https://calendar.sunlandnews.com/thank-you';
      window.location.href = destUrl;
    } else {
      router.push('/support');
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12 relative z-10">
      {/* Success Message — compact */}
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-black mb-2 md:mb-3 uppercase tracking-tight mx-auto flex items-center justify-center gap-2 md:gap-3">
          <div className="w-10 h-10 md:w-16 md:h-16 bg-brutalYellow border-4 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-full flex items-center justify-center transform -rotate-3 animate-pulse">
            <span className="text-2xl md:text-5xl text-black">!</span>
          </div>
          Wait, one last step!
        </h1>
        <p className="text-base md:text-lg font-bold text-gray-800 inline-block px-4 py-1.5 md:px-5 md:py-2 bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] md:shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-xl transform rotate-1">
          Your initial signup is complete. Action required below 👇
        </p>
      </div>

      {/* Segmentation Form Card */}
      <div className="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden relative max-w-xl mx-auto">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "16px 16px" }}></div>

        {/* Top: Photo Header */}
        <div className="w-full bg-brutalBlue border-b-4 border-black relative flex items-center justify-center py-8 px-4">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)] relative z-10 bg-white transform -rotate-2 hover:rotate-1 transition-transform">
            <Image
              src="/images/jamin-profile.png"
              alt="Ja'Min"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        {/* Bottom: Form Area */}
        <div className="w-full p-5 md:p-8 relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-2 flex flex-col items-center gap-2">
              <span className="bg-black text-white px-3 py-1 rounded-md text-sm tracking-widest block transform -rotate-2 w-max shadow-[3px_3px_0px_rgba(255,107,107,1)] border-2 border-black">STEP 2 OF 2</span>
              Complete Your Setup
            </h2>
            <p className="font-bold text-gray-700 bg-brutalYellow px-2 inline-block text-sm md:text-base mt-2">
              Tell us what you're looking for so we don't send you junk.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">


            <div className="bg-gray-50 border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <label className="block text-base font-black uppercase tracking-wider mb-4 text-center">What are you most looking for?</label>
              <div className="space-y-3">
                {[
                  'Stay informed on local news and breaking alerts',
                  'Events, things to do, food, and new openings',
                  'Feel more connected to my community'
                ].map((option) => (
                  <label
                    key={option}
                    className={`block relative cursor-pointer group`}
                  >
                    <div className={`p-3 border-4 rounded-xl transition-all font-bold text-sm flex items-center gap-3 ${formData.interest === option
                      ? 'border-black bg-brutalYellow shadow-[3px_3px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]'
                      : 'border-black bg-white shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[5px_5px_0px_rgba(0,0,0,1)]'
                      }`}>
                      <div className={`w-5 h-5 rounded-full border-4 flex-shrink-0 flex items-center justify-center transition-colors ${formData.interest === option ? 'border-black bg-black' : 'border-black bg-white'}`}></div>
                      <input
                        type="radio"
                        name="interest"
                        value={option}
                        checked={formData.interest === option}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="sr-only"
                        required
                      />
                      <span className="leading-snug">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {error && <p className="text-red-600 font-bold bg-red-100 p-3 border-4 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] rounded-xl text-center text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting || !formData.interest}
              className={`w-full py-4 text-xl font-black uppercase tracking-wider rounded-2xl border-4 transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] ${submitting || !formData.interest
                ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed shadow-[2px_2px_0px_rgba(0,0,0,0.1)]'
                : 'bg-primary text-white border-black hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
                }`}
            >
              {submitting ? 'Saving...' : 'Finish Setup →'}
            </button>
          </form>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">
          This step ensures your newsletter is completely personalized
        </p>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-black uppercase text-xl">Loading...</div>}>
        <ThankYouForm />
      </Suspense>
    </div>
  );
}
