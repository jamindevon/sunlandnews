'use client';

import { useState, useEffect } from 'react';

export default function NewsletterScrollPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Check if user has already subscribed or dismissed recently (14-day frequency cap)
        const isSubscribed = localStorage.getItem('sunland_subscribed');
        const lastDismissed = localStorage.getItem('sunland_popup_dismissed');

        if (isSubscribed === 'true') {
            return; // Never show if already subscribed
        }

        if (lastDismissed) {
            const fourteenDaysInMs = 14 * 24 * 60 * 60 * 1000;
            if (Date.now() - parseInt(lastDismissed, 10) < fourteenDaysInMs) {
                return; // Do not show if dismissed in the last 14 days
            }
        }

        const handleScroll = () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            
            // Trigger when user scrolls down 35% of the page
            if (scrollPercent >= 35) {
                setIsVisible(true);
                // Remove scroll listener once triggered
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        // Store dismissal timestamp so it won't show again for 14 days
        localStorage.setItem('sunland_popup_dismissed', Date.now().toString());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) return;

        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    source: 'scroll_popup'
                })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('success');
                localStorage.setItem('sunland_subscribed', 'true');
                // Automatically hide after 4 seconds of showing success message
                setTimeout(() => {
                    setIsVisible(false);
                }, 4000);
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'Failed to subscribe. Please try again.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 max-w-md w-[calc(100%-2rem)] sm:w-96 animate-slide-up">
            <div className="bg-black text-white border-3 border-white rounded-2xl p-5 shadow-[6px_6px_0px_#f9dc5c] relative">
                
                {/* Close Button */}
                <button
                    onClick={handleDismiss}
                    aria-label="Close newsletter popup"
                    className="absolute -top-3 -right-3 bg-[#ff4365] text-white font-black w-8 h-8 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                    ✕
                </button>

                {status === 'success' ? (
                    <div className="text-center py-2">
                        <div className="text-3xl mb-1">🎉</div>
                        <h4 className="text-lg font-black uppercase text-[#f9dc5c] mb-1">
                            You&apos;re On The List!
                        </h4>
                        <p className="text-xs font-bold text-gray-200">
                            Thanks for joining Sunland News. Check your inbox for your first morning update!
                        </p>
                    </div>
                ) : (
                    <div>
                        <div className="inline-block bg-[#f9dc5c] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded mb-2 border border-black">
                            Free Daily Newsletter
                        </div>

                        <h4 className="text-lg font-black uppercase leading-tight mb-1 text-white">
                            Enjoying St. Lucie Stories?
                        </h4>
                        <p className="text-xs font-bold text-gray-300 mb-3">
                            Get local news, events, and pay insights delivered free to your inbox 5 mornings a week.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email..."
                                    required
                                    className="flex-1 bg-white border-2 border-white rounded-xl px-3 py-2 text-xs font-bold text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f9dc5c]"
                                />
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="bg-[#f88600] hover:bg-[#ff4365] text-white font-black uppercase px-4 py-2 rounded-xl text-xs border-2 border-white transition-colors cursor-pointer disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'Subbing...' : 'Join'}
                                </button>
                            </div>

                            {status === 'error' && (
                                <div className="text-[11px] font-bold text-[#ff4365]">
                                    {errorMessage}
                                </div>
                            )}

                            <div className="text-[10px] font-bold text-gray-400 text-center">
                                No spam ever. Unsubscribe in 1 click anytime.
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
