'use client';

import Link from 'next/link';

export default function SponsorPage() {
    return (
        <div className="min-h-screen bg-white">

            {/* 1. HERO & VSL SECTION */}
            <section className="bg-gray-900 text-white pt-16 pb-24 px-4">
                <div className="container mx-auto max-w-4xl text-center">

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                        Get Your Business in Front of <span className="text-primary">10,000+ Locals</span> Every Week.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-light">
                        The #1 way to reach engaged residents in Fort Pierce & Port St. Lucie without wasting money on ads nobody sees.
                    </p>

                    {/* VSL Video Placeholder */}
                    <div className="relative w-full aspect-video bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 mb-12 overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-sm font-medium text-gray-300">Watch: How we drive foot traffic to local businesses</p>
                        </div>
                    </div>

                    {/* Primary CTA */}
                    <div className="flex flex-col items-center">
                        <Link
                            href="#booking"
                            className="px-8 py-5 bg-primary text-white font-bold text-xl rounded-full hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(255,107,0,0.4)] hover:shadow-[0_0_40px_rgba(255,107,0,0.6)] transform hover:-translate-y-1"
                        >
                            Book Your Strategy Call
                        </Link>
                        <p className="mt-4 text-sm text-gray-400 uppercase tracking-widest">No pressure. No obligation.</p>
                    </div>

                </div>
            </section>

            {/* 2. SOCIAL PROOF / TESTIMONIALS */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by St. Lucie's Best Businesses</h2>
                        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex text-yellow-400 mb-4">★★★★★</div>
                            <p className="text-gray-700 mb-6 italic">"We saw an immediate spike in foot traffic the weekend after our feature. The readers are actually local and engaged."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div>
                                    <p className="font-bold text-gray-900">Sarah J.</p>
                                    <p className="text-xs text-gray-500">Local Coffee Shop Owner</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex text-yellow-400 mb-4">★★★★★</div>
                            <p className="text-gray-700 mb-6 italic">"Better ROI than Facebook ads. It's refreshing to work with a partner that actually cares about the community."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div>
                                    <p className="font-bold text-gray-900">Mike T.</p>
                                    <p className="text-xs text-gray-500">Event Organizer</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex text-yellow-400 mb-4">★★★★★</div>
                            <p className="text-gray-700 mb-6 italic">"The calendar feature is a game changer. We fill our workshops weeks in advance now."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div>
                                    <p className="font-bold text-gray-900">Jessica R.</p>
                                    <p className="text-xs text-gray-500">Art Studio Founder</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. THE OFFER / STATS */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                Stop Shouting Into The Void. <br />
                                <span className="text-primary">Start Getting Seen.</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Most local advertising is broken. You pay for "impressions" from bots or people three counties away.
                                <br /><br />
                                <strong>We do it differently.</strong> We've built a loyal audience of locals who actually read our emails to find out what to do, where to eat, and where to shop.
                            </p>

                            <ul className="space-y-4 mb-10">
                                <li className="flex items-center text-lg font-medium text-gray-800">
                                    <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 font-bold">✓</span>
                                    10,000+ Active Weekly Readers
                                </li>
                                <li className="flex items-center text-lg font-medium text-gray-800">
                                    <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 font-bold">✓</span>
                                    45%+ Open Rates (Industry Avg is 20%)
                                </li>
                                <li className="flex items-center text-lg font-medium text-gray-800">
                                    <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 font-bold">✓</span>
                                    100% St. Lucie County Focused
                                </li>
                            </ul>

                            <Link
                                href="#booking"
                                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-bold text-lg rounded-full hover:bg-gray-800 transition-all"
                            >
                                Let's Talk Numbers
                            </Link>
                        </div>

                        {/* Visual/Image Placeholder */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/20 rounded-3xl transform rotate-3"></div>
                            <div className="relative bg-gray-100 rounded-2xl p-8 h-96 flex items-center justify-center border border-gray-200 shadow-xl">
                                <p className="text-gray-400 font-medium text-center">
                                    [Image: Happy Business Owner <br /> or Newsletter Screenshot]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FINAL CTA */}
            <section id="booking" className="py-24 px-4 bg-gray-900 text-white text-center">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">
                        Ready to Grow Your Local Business?
                    </h2>
                    <p className="text-xl text-gray-400 mb-12">
                        Spots are limited. We only partner with businesses we believe in.
                        Book a 15-minute strategy call to see if we're a fit.
                    </p>

                    <Link
                        href="https://calendly.com"
                        target="_blank"
                        className="px-10 py-6 bg-primary text-white font-bold text-2xl rounded-full hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(255,107,0,0.4)] hover:shadow-[0_0_50px_rgba(255,107,0,0.6)] transform hover:-translate-y-1 inline-block"
                    >
                        Book Your Call Now
                    </Link>
                    <p className="mt-6 text-sm text-gray-500">
                        Prefer email? <a href="mailto:thesunlandcompany@gmail.com" className="underline hover:text-white">Click here</a>
                    </p>
                </div>
            </section>

        </div>
    );
}
