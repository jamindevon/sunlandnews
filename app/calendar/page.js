'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CalendarOffer() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('calendarToken');
        if (token) {
            router.push('/calendar/dashboard');
        }
    }, [router]);

    const handlePurchase = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Checkout error:', data.error);
                alert('Something went wrong. Please try again.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Purchase error:', error);
            alert('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-black selection:bg-brutalPink selection:text-white">
            {/* Hero Section */}
            <section className="pt-8 md:pt-12 pb-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <span className="inline-block py-1.5 px-4 rounded-lg bg-brutalYellow border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-black text-sm font-black mb-6 tracking-wider uppercase">
                        Founder Offer
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 leading-tight tracking-tight">
                        Plan your week in St. Lucie — $39/year
                    </h1>
                    <p className="text-xl font-bold text-gray-800 max-w-2xl mx-auto mb-8 leading-relaxed">
                        Take a 2-minute quiz, tap one link, and only the events you care about show up in your calendar—every week. <span className="text-black bg-brutalYellow px-2 py-0.5 border-2 border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] rounded inline-block mt-2">Fort Pierce • Port St. Lucie • St. Lucie County.</span>
                    </p>

                    {/* Bullets */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-bold text-sm text-black mb-10 max-w-3xl mx-auto uppercase">
                        <span className="flex items-center">✨ Your picks (food • music)</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center">📅 Apple/Google/Outlook</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center">🚫 No politics</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center">🛡️ 7-day refund</span>
                    </div>

                    <button
                        onClick={handlePurchase}
                        disabled={loading}
                        className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide text-lg rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : 'Get my calendar — $39'}
                    </button>
                    <p className="mt-4 text-sm font-bold text-gray-500">
                        Join 10,000+ locals • Built by Sunland News (St. Lucie County)
                    </p>
                    <div className="mt-8">
                        <a href="/calendar/login" className="text-sm font-black text-black hover:text-primary uppercase underline decoration-2 decoration-black hover:decoration-primary underline-offset-4 transition-colors">
                            Already a member? Sign in here
                        </a>
                    </div>
                </div>
            </section>

            {/* Visual How it Works */}
            <section className="pb-24 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-brutalBlue rounded-full border-2 border-black opacity-20 z-0"></div>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-black mb-12 text-center uppercase tracking-tight relative z-10">How it works</h3>

                        <div className="grid md:grid-cols-3 gap-8 relative z-10">
                            {/* Connecting Line (Desktop only) */}
                            <div className="hidden md:block absolute top-12 left-0 w-full h-2 bg-black -z-10 transform -translate-y-1/2"></div>

                            {/* Step 1 */}
                            <div className="relative bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-center transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-300">
                                <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                    <span className="text-3xl">📝</span>
                                </div>
                                <div className="absolute top-0 right-0 bg-brutalBlue text-white w-8 h-8 rounded-full flex items-center justify-center font-black -mt-3 -mr-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">1</div>
                                <h4 className="text-xl font-black text-black uppercase mb-3 text-left">Pick Your Interests</h4>
                                <p className="text-gray-800 font-medium text-sm leading-relaxed text-left">
                                    Tell us what you love—Food, Music, Family, Outdoors. We filter out the noise.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="relative bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-center transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-300">
                                <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                    <span className="text-3xl">🔗</span>
                                </div>
                                <div className="absolute top-0 right-0 bg-[#ff4365] text-white w-8 h-8 rounded-full flex items-center justify-center font-black -mt-3 -mr-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">2</div>
                                <h4 className="text-xl font-black text-black uppercase mb-3 text-left">Get Magic Link</h4>
                                <p className="text-gray-800 font-medium text-sm leading-relaxed text-left">
                                    We generate a unique, secure calendar link just for you. No app download needed.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="relative bg-white p-6 rounded-2xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] text-center transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all duration-300">
                                <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                    <span className="text-3xl">📱</span>
                                </div>
                                <div className="absolute top-0 right-0 bg-brutalYellow text-black w-8 h-8 rounded-full flex items-center justify-center font-black -mt-3 -mr-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">3</div>
                                <h4 className="text-xl font-black text-black uppercase mb-3 text-left">Auto-Sync Forever</h4>
                                <p className="text-gray-800 font-medium text-sm leading-relaxed text-left">
                                    Events magically appear in your phone's calendar. Updated weekly.
                                </p>
                            </div>
                        </div>

                        {/* Visual Calendar Preview */}
                        <div className="mt-16 max-w-2xl mx-auto relative z-10">
                            <div className="bg-white rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] border-2 border-black overflow-hidden">
                                <div className="bg-brutalBg px-4 py-3 border-b-2 border-black flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full border-2 border-black bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full border-2 border-black bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full border-2 border-black bg-green-400"></div>
                                    </div>
                                    <span className="font-bold text-black text-sm uppercase">Your Phone Calendar</span>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex items-start space-x-4 p-3 bg-white rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                        <div className="text-center min-w-[60px]">
                                            <div className="text-xs font-black text-brutalBlue uppercase">Sat</div>
                                            <div className="text-xl font-black text-black">14</div>
                                        </div>
                                        <div className="pl-4 border-l-2 border-black">
                                            <h5 className="font-extrabold text-black">Farmers Market 🥬</h5>
                                            <p className="text-sm font-bold text-gray-700">9:00 AM • Downtown Fort Pierce</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4 p-3 bg-white rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                        <div className="text-center min-w-[60px]">
                                            <div className="text-xs font-black text-primary uppercase">Sat</div>
                                            <div className="text-xl font-black text-black">14</div>
                                        </div>
                                        <div className="pl-4 border-l-2 border-black">
                                            <h5 className="font-extrabold text-black">Jazz on the Water 🎷</h5>
                                            <p className="text-sm font-bold text-gray-700">7:00 PM • Melody Lane</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-4 p-3 bg-white rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                        <div className="text-center min-w-[60px]">
                                            <div className="text-xs font-black text-brutalYellow uppercase">Sun</div>
                                            <div className="text-xl font-black text-black">15</div>
                                        </div>
                                        <div className="pl-4 border-l-2 border-black">
                                            <h5 className="font-extrabold text-black">Brunch & Art Walk 🎨</h5>
                                            <p className="text-sm font-bold text-gray-700">11:00 AM • Peacock Arts District</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center text-gray-400 text-sm mt-4">
                                (This is exactly how it looks on your phone!)
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-brutalBg border-t-2 border-black">
                <div className="container mx-auto max-w-3xl px-4">
                    <h2 className="text-4xl font-extrabold text-black text-center mb-12 uppercase tracking-tight">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all">
                            <h3 className="font-black text-black text-xl mb-2">Does this work with my phone?</h3>
                            <p className="text-gray-800 font-medium">Yes! It works natively with Apple Calendar (iPhone), Google Calendar (Android/Desktop), and Outlook.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all">
                            <h3 className="font-black text-black text-xl mb-2">Can I change my preferences later?</h3>
                            <p className="text-gray-800 font-medium">Absolutely. You can update your interests and availability anytime, and your calendar will automatically update to match.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all">
                            <h3 className="font-black text-black text-xl mb-2">Is this a monthly subscription?</h3>
                            <p className="text-gray-800 font-medium">No. It's a simple one-time payment of $39 for a full year of access.</p>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <button
                            onClick={handlePurchase}
                            disabled={loading}
                            className="inline-flex items-center justify-center px-10 py-5 bg-primary text-white font-bold uppercase tracking-wide text-xl rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            Get Started Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
