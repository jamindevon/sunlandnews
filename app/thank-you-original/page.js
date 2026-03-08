'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function ThankYouPageOriginal() {
    // Track conversion on thank you page
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

    return (
        <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white">
            <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
                {/* Success Message */}
                <div className="text-center mb-16 relative">
                    <div className="w-24 h-24 bg-green-400 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-full flex items-center justify-center mx-auto mb-8 transform -rotate-3 hover:rotate-0 transition-transform">
                        <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-black mb-6 uppercase tracking-tight">
                        You're in! 🎉
                    </h1>
                    <p className="text-2xl font-bold text-gray-800 mb-8 max-w-2xl mx-auto bg-white inline-block px-6 py-3 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl transform rotate-1">
                        Thanks for signing up.
                    </p>
                </div>

                {/* Video Section */}
                <div className="bg-white rounded-3xl border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] p-8 md:p-12 mb-12 relative overflow-hidden">
                    {/* Decorative brutalist background dots */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "16px 16px" }}></div>

                    <div className="max-w-3xl mx-auto text-center relative z-10">
                        {/* YouTube Video Embed */}
                        <div className="aspect-video mb-12 rounded-xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-brutalBlue">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/Rss_K3v__Wc?autoplay=1&mute=1"
                                title="Welcome to Sunland News"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>

                        <div className="space-y-8">
                            <p className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed max-w-2xl mx-auto">
                                Before we start sending you local news, take this 45-second quiz.
                                <br />
                                <span className="bg-brutalYellow inline-block mt-2 px-2">It'll help us send you the right stuff — not random stuff.</span>
                            </p>

                            <Link
                                href="/quiz"
                                className="inline-flex items-center px-10 py-5 bg-primary text-white text-xl font-black uppercase tracking-wide border-4 border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all"
                            >
                                Take the Quick Quiz
                                <svg className="w-6 h-6 ml-3 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Additional Context */}
                <div className="text-center">
                    <p className="text-gray-800 font-bold uppercase tracking-wider text-sm bg-gray-200 inline-block px-4 py-2 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        This will only take a minute and helps us personalize your experience.
                    </p>
                </div>
            </div>
        </div>
    );
}
