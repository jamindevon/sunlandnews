'use client';

import Link from 'next/link';

export default function EventSuccessPage() {
    return (
        <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white pb-24">
            {/* Header Section */}
            <section className="pt-20 pb-12 px-4 border-b-4 border-black bg-brutalYellow relative overflow-hidden mb-16">
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}></div>
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block py-2 px-4 bg-black text-white text-sm font-black mb-6 tracking-widest uppercase border-2 border-black shadow-[3px_3px_0px_rgba(248,134,0,1)] transform -rotate-1">
                        Submission Received
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-black mb-4 uppercase tracking-tight">
                        You're Good To Go!
                    </h1>
                    <p className="text-lg md:text-xl font-bold text-gray-800 max-w-2xl mx-auto">
                        Your event has been submitted successfully and is queued for team review.
                    </p>
                </div>
            </section>

            <div className="max-w-2xl mx-auto px-4">
                <div className="space-y-8">
                    {/* Confirmation Details Card */}
                    <div className="bg-white p-8 rounded-2xl border-4 border-black shadow-brutal relative">
                        <div className="absolute -top-6 -left-4 w-12 h-12 bg-green-400 border-4 border-black rounded-full flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] transform -rotate-6">
                            ✓
                        </div>
                        <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">What happens next?</h2>
                        <ul className="space-y-3 font-bold text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                Our moderation team reviews all details (date, times, venue) to ensure correctness.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                Approved events typically appear on the Sunland Calendar within 24 to 48 hours.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                You will receive an email once your event is live.
                            </li>
                        </ul>
                    </div>

                    {/* Upsell / Sponsor Pitch Card */}
                    <div className="bg-brutalBlue/10 p-8 rounded-2xl border-4 border-black border-dashed shadow-brutal hover:bg-brutalBlue/15 transition-all">
                        <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-4 flex items-center gap-2">
                            <span>🚀</span> Want 10x More Visibility?
                        </h2>
                        <p className="font-bold text-gray-800 text-lg mb-6 leading-relaxed">
                            Stand out from the crowd! Upgrade to a <strong className="text-primary font-extrabold">Monthly Event Partner</strong> listing to get featured at the very top of our calendar, spotlighted in our newsletters, and featured on our social media channels.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/events/sponsor"
                                className="inline-block text-center py-4 px-6 bg-primary text-white font-black uppercase tracking-wider rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
                            >
                                View Sponsorship Options →
                            </Link>
                            <Link
                                href="/"
                                className="inline-block text-center py-4 px-6 bg-white text-black font-black uppercase tracking-wider rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
                            >
                                Back To Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
