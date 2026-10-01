'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ClassOf82Page() {
    const [copied, setCopied] = useState(false);
    const [showFlyerModal, setShowFlyerModal] = useState(false);

    const handleCopyZelle = () => {
        navigator.clipboard.writeText('772-577-1048');
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const generateGoogleCalendarUrl = () => {
        const title = encodeURIComponent("Central & Westwood Class of 1982 Birthday Celebration Weekend");
        const details = encodeURIComponent("Central and Westwood Class of 1982 Birthday Celebration Weekend (Oct 23-25, 2026). Details: https://sunlandnews.com/class-of-82");
        const location = encodeURIComponent("Fort Pierce & Port St. Lucie, FL");
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261023T230000Z/20261025T180000Z&details=${details}&location=${location}`;
    };

    return (
        <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white pb-24">
            
            {/* Top Navigation Bar */}
            <header className="bg-black text-white border-b-4 border-black py-4 px-4 sticky top-0 z-40 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <Link 
                        href="/" 
                        className="font-black uppercase tracking-widest text-xs md:text-sm bg-brutalYellow text-black px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                    >
                        ← Sunland News
                    </Link>
                    <span className="font-black uppercase text-xs tracking-wider bg-brutalPink text-white px-3 py-1 border-2 border-white transform rotate-1">
                        Class of 1982 Event Guide
                    </span>
                </div>
            </header>

            {/* Hero Banner Section */}
            <section className="pt-12 pb-16 px-4 border-b-4 border-black bg-brutalYellow relative overflow-hidden mb-12">
                <div 
                    className="absolute inset-0 opacity-[0.08] pointer-events-none" 
                    style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}
                ></div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                    <div>
                        <span className="inline-block py-2 px-5 bg-brutalPink text-white text-xs md:text-sm font-black tracking-widest uppercase border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] transform -rotate-2 mb-4">
                            ✨ Grown &amp; Sexy 62 ✨
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-black uppercase tracking-tight leading-none drop-shadow-sm">
                        Class of 1982 <br /> Birthday Celebration
                    </h1>

                    <div className="inline-block bg-white border-4 border-black p-4 md:p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] transform rotate-1 max-w-2xl">
                        <p className="text-lg md:text-xl font-black text-black tracking-tight">
                            Fort Pierce Central Cobras &amp; Fort Pierce Westwood Panthers
                        </p>
                        <p className="text-sm md:text-base font-bold text-gray-700 mt-1">
                            October 23 – 25, 2026 • Fort Pierce &amp; Port St. Lucie, FL
                        </p>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <a
                            href="#tickets"
                            className="bg-brutalPink text-white font-black text-lg uppercase px-8 py-4 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
                        >
                            🎟️ Reserve Soiree Ticket ($100)
                        </a>
                        <a
                            href={generateGoogleCalendarUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-black font-black text-base uppercase px-6 py-4 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:bg-brutalBlue hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            📆 Add to Google Calendar
                        </a>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="max-w-4xl mx-auto px-4 space-y-12">

                {/* Announcement Card + Flyer Preview */}
                <section className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_rgba(0,0,0,1)] rounded-2xl relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-2 space-y-4">
                            <span className="inline-block bg-brutalBlue text-white font-black text-xs uppercase px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                Event Overview
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black uppercase text-black leading-tight">
                                Everyone is invited to celebrate!
                            </h2>
                            <p className="text-base md:text-lg font-bold text-gray-800 leading-relaxed border-l-4 border-brutalYellow pl-4">
                                Join Central and Westwood Class of 1982 Birthday weekend, <strong>October 23-25, 2026</strong>. Starting Friday night football game and Phatz Sports Bar; Saturday Brunch at Captain&apos;s Galley and the Highwaymen Museum; and the Dress to the Nine Soiree at Tutto Fresco cocktails and dinner ($100 ticket); silent auction and 50/50 raffle; wrapping up the weekend with a church service at Immanuel Full Gospel. <strong>Everyone is invited to join in the celebration!</strong>
                            </p>
                        </div>

                        {/* Flyer Thumbnail Card */}
                        <div 
                            onClick={() => setShowFlyerModal(true)}
                            className="cursor-pointer group bg-brutalYellow p-3 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] transform hover:-rotate-1 hover:scale-105 transition-all text-center"
                        >
                            <div className="relative aspect-[3/4] w-full border-2 border-black overflow-hidden bg-black">
                                <Image 
                                    src="/images/class-of-82-flyer.jpg" 
                                    alt="Class of 1982 Birthday Celebration Flyer"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="block mt-2 font-black text-xs uppercase text-black tracking-wider group-hover:underline">
                                🔍 Click to view full flyer
                            </span>
                        </div>
                    </div>
                </section>

                {/* Itinerary Header */}
                <div className="text-center pt-6">
                    <span className="inline-block bg-brutalYellow text-black font-black text-sm uppercase px-4 py-1 border-3 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transform -rotate-1 mb-2">
                        Official Schedule
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black uppercase text-black tracking-tight">
                        Weekend Schedule of Events
                    </h2>
                </div>

                {/* DAY 1: FRIDAY */}
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden">
                    <div className="bg-brutalBlue border-b-4 border-black p-4 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-black uppercase text-white tracking-widest text-lg md:text-xl">
                            Friday, October 23, 2026
                        </span>
                        <span className="bg-white text-black font-black text-xs uppercase px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                            Kickoff Night
                        </span>
                    </div>

                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Event 1 */}
                        <div className="border-3 border-black p-5 bg-brutalBg shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between border-b-2 border-black pb-2">
                                    <span className="font-black text-sm uppercase text-brutalPink">🏈 7:00 PM</span>
                                    <span className="font-black text-xs uppercase bg-gray-200 text-black px-2 py-0.5 border border-black">Self Pay</span>
                                </div>
                                <h3 className="font-black text-xl text-black uppercase">Football Game</h3>
                                <p className="font-bold text-gray-800 text-sm">
                                    Fort Pierce Central vs. Sebastian River High School
                                </p>
                                <p className="text-xs font-bold text-gray-600">
                                    📍 Lawnwood Stadium, Fort Pierce, FL
                                </p>
                            </div>
                            <a 
                                href="https://maps.google.com/?q=Lawnwood+Stadium+Fort+Pierce+FL" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block text-center font-black text-xs uppercase bg-white text-black py-2 px-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-brutalYellow transition-colors"
                            >
                                📍 Open Lawnwood Stadium in Maps ↗
                            </a>
                        </div>

                        {/* Event 2 */}
                        <div className="border-3 border-black p-5 bg-brutalBg shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between border-b-2 border-black pb-2">
                                    <span className="font-black text-sm uppercase text-brutalPink">🍻 After Game</span>
                                    <span className="font-black text-xs uppercase bg-gray-200 text-black px-2 py-0.5 border border-black">Self Pay</span>
                                </div>
                                <h3 className="font-black text-xl text-black uppercase">After Game Gathering</h3>
                                <p className="font-bold text-gray-800 text-sm">
                                    Phatz Sports Bar &amp; Grill
                                </p>
                                <p className="text-xs font-bold text-gray-600">
                                    📍 421 N US Hwy 1, Fort Pierce, FL 34950
                                </p>
                            </div>
                            <a 
                                href="https://maps.google.com/?q=421+N+US+Hwy+1+Fort+Pierce+FL+34950" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block text-center font-black text-xs uppercase bg-white text-black py-2 px-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-brutalYellow transition-colors"
                            >
                                📍 Open Phatz in Maps ↗
                            </a>
                        </div>

                    </div>
                </div>

                {/* DAY 2: SATURDAY (HIGHLIGHT) */}
                <div className="bg-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden">
                    <div className="bg-brutalYellow border-b-4 border-black p-4 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-black uppercase text-black tracking-widest text-lg md:text-xl">
                            Saturday, October 24, 2026
                        </span>
                        <span className="bg-brutalPink text-white font-black text-xs uppercase px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transform rotate-1">
                            ⭐️ Main Celebration Day
                        </span>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Brunch */}
                            <div className="border-3 border-black p-5 bg-brutalBg shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between border-b-2 border-black pb-2">
                                        <span className="font-black text-sm uppercase text-black">🥞 10:00 AM – 12:00 PM</span>
                                        <span className="font-black text-xs uppercase bg-gray-200 text-black px-2 py-0.5 border border-black">Self Pay</span>
                                    </div>
                                    <h3 className="font-black text-xl text-black uppercase">Saturday Brunch</h3>
                                    <p className="font-bold text-gray-800 text-sm">
                                        Captain&apos;s Galley
                                    </p>
                                    <p className="text-xs font-bold text-gray-600">
                                        📍 825 Indian River Dr, Fort Pierce, FL
                                    </p>
                                </div>
                                <a 
                                    href="https://maps.google.com/?q=825+Indian+River+Dr+Fort+Pierce+FL" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-block text-center font-black text-xs uppercase bg-white text-black py-2 px-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-brutalYellow transition-colors"
                                >
                                    📍 Open Captain&apos;s Galley in Maps ↗
                                </a>
                            </div>

                            {/* Museum */}
                            <div className="border-3 border-black p-5 bg-brutalBg shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between border-b-2 border-black pb-2">
                                        <span className="font-black text-sm uppercase text-black">🎨 12:30 PM – 2:00 PM</span>
                                        <span className="font-black text-xs uppercase bg-gray-200 text-black px-2 py-0.5 border border-black">Self Pay</span>
                                    </div>
                                    <h3 className="font-black text-xl text-black uppercase">Highwaymen Museum Visit</h3>
                                    <p className="font-bold text-gray-800 text-sm">
                                        Florida Highwaymen Museum
                                    </p>
                                    <p className="text-xs font-bold text-gray-600">
                                        📍 1234 Avenue D, Fort Pierce, FL
                                    </p>
                                </div>
                                <a 
                                    href="https://maps.google.com/?q=1234+Avenue+D+Fort+Pierce+FL" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-block text-center font-black text-xs uppercase bg-white text-black py-2 px-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-brutalYellow transition-colors"
                                >
                                    📍 Open Museum in Maps ↗
                                </a>
                            </div>

                        </div>

                        {/* Dress to the Nine Soiree (Featured Card) */}
                        <div id="soiree" className="bg-brutalYellow border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] space-y-6 relative">
                            <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-black pb-4">
                                <div>
                                    <span className="font-black text-xs uppercase bg-brutalPink text-white px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                        Marquee Event
                                    </span>
                                    <h3 className="text-2xl md:text-4xl font-black uppercase text-black mt-2">
                                        Dress to the Nine Soiree
                                    </h3>
                                </div>
                                <div className="bg-black text-brutalYellow font-black text-xl md:text-2xl px-5 py-2 border-2 border-black shadow-[4px_4px_0px_rgba(255,255,255,1)]">
                                    Entry: $100
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black font-bold">
                                <div className="space-y-3">
                                    <p className="text-base md:text-lg leading-snug">
                                        Cocktails, dinner, dancing, comedy, silent auction, and 50/50 raffle!
                                    </p>
                                    <ul className="space-y-2 text-sm bg-white p-4 border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                        <li>📷 <strong>Complimentary 8x10 Photo included</strong></li>
                                        <li>🍸 <strong>5:30 PM – 6:45 PM:</strong> Cocktail Hour</li>
                                        <li>🍽️ <strong>7:15 PM – 11:00 PM:</strong> Dinner, Dancing &amp; Comedy</li>
                                    </ul>
                                </div>

                                <div className="space-y-3 flex flex-col justify-between">
                                    <div>
                                        <p className="text-xs uppercase font-black tracking-wider text-gray-700">Venue Location</p>
                                        <p className="text-lg font-black">Tutto Fresco</p>
                                        <p className="text-sm">9501 Brandywine Ln, Port St. Lucie, FL 34986</p>
                                    </div>

                                    <div className="pt-2">
                                        <a 
                                            href="https://maps.google.com/?q=9501+Brandywine+Ln+Port+St+Lucie+FL+34986" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="block text-center font-black text-xs uppercase bg-white text-black py-2.5 px-4 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-brutalBlue hover:text-white transition-all"
                                        >
                                            📍 Open Tutto Fresco in Maps ↗
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* DAY 3: SUNDAY */}
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-2xl overflow-hidden">
                    <div className="bg-brutalPink border-b-4 border-black p-4 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-black uppercase text-white tracking-widest text-lg md:text-xl">
                            Sunday, October 25, 2026
                        </span>
                        <span className="bg-white text-black font-black text-xs uppercase px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                            Closing Fellowship
                        </span>
                    </div>

                    <div className="p-6 md:p-8">
                        <div className="border-3 border-black p-5 bg-brutalBg shadow-[4px_4px_0px_rgba(0,0,0,1)] space-y-4 max-w-xl">
                            <div className="flex items-center justify-between border-b-2 border-black pb-2">
                                <span className="font-black text-sm uppercase text-black">⛪ 11:00 AM</span>
                                <span className="font-black text-xs uppercase bg-brutalYellow text-black px-2 py-0.5 border border-black">Church Service</span>
                            </div>
                            <h3 className="font-black text-xl text-black uppercase">Worship Service</h3>
                            <p className="font-bold text-gray-800 text-sm">
                                Immanuel Full Gospel Church
                            </p>
                            <p className="text-xs font-bold text-gray-600">
                                📍 1200 N. 25th Street, Fort Pierce, FL
                            </p>
                            <a 
                                href="https://maps.google.com/?q=1200+N+25th+Street+Fort+Pierce+FL" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block text-center font-black text-xs uppercase bg-white text-black py-2 px-3 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-brutalYellow transition-colors"
                            >
                                📍 Open Immanuel Full Gospel in Maps ↗
                            </a>
                        </div>
                    </div>
                </div>

                {/* ZELLE PAYMENT / TICKET RESERVATION SECTION */}
                <section id="tickets" className="bg-brutalYellow border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_rgba(0,0,0,1)] rounded-2xl text-center space-y-8">
                    <div className="max-w-2xl mx-auto space-y-3">
                        <span className="inline-block bg-brutalPink text-white font-black text-xs uppercase px-4 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transform -rotate-2">
                            Zelle Payment Information
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase text-black tracking-tight">
                            Reserve Your Soiree Seat ($100)
                        </h2>
                        <p className="text-base md:text-lg font-bold text-black">
                            Tickets for the Saturday night Dress to the Nine Soiree are <strong>$100 per person</strong>. Please send your payment directly via Zelle to our event coordinator <strong>Deborah Noble</strong>.
                        </p>
                    </div>

                    <div className="max-w-md mx-auto bg-white border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] space-y-6">
                        <div className="space-y-1">
                            <span className="text-xs font-black uppercase tracking-wider text-gray-500 block">Zelle Recipient</span>
                            <div className="text-2xl font-black text-black">Deborah Noble</div>
                            <div className="text-xl font-black text-brutalPink">772-577-1048</div>
                        </div>

                        <button
                            onClick={handleCopyZelle}
                            className="w-full bg-black text-white font-black text-sm uppercase py-4 px-6 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-brutalPink hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
                        >
                            {copied ? '✅ Phone Number Copied to Clipboard!' : '📋 Copy Zelle Phone Number (772-577-1048)'}
                        </button>

                        <div className="text-left text-xs font-bold text-gray-800 bg-brutalBg p-4 border-2 border-black space-y-1">
                            <p className="font-black text-black uppercase">Instructions for Zelle:</p>
                            <ol className="list-decimal pl-4 space-y-1">
                                <li>Open your bank app and select Zelle.</li>
                                <li>Send <strong>$100</strong> to <strong>772-577-1048</strong> (Deborah Noble).</li>
                                <li>Include your name and &quot;Class of 82 Soiree&quot; in the memo note.</li>
                            </ol>
                        </div>
                    </div>
                </section>

            </main>

            {/* Flyer Image Zoom Modal */}
            {showFlyerModal && (
                <div 
                    onClick={() => setShowFlyerModal(false)}
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
                >
                    <div className="relative max-w-2xl w-full max-h-[90vh] aspect-[3/4] bg-white border-4 border-black p-2 shadow-[12px_12px_0px_rgba(0,0,0,1)]">
                        <Image 
                            src="/images/class-of-82-flyer.jpg" 
                            alt="Class of 1982 Birthday Celebration Flyer"
                            fill
                            className="object-contain"
                        />
                        <button 
                            onClick={() => setShowFlyerModal(false)}
                            className="absolute top-4 right-4 bg-brutalPink text-white font-black text-xs uppercase px-3 py-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                        >
                            Close ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="mt-20 border-t-4 border-black text-center py-8 bg-white font-bold text-xs text-gray-600 space-y-1">
                <p className="font-black uppercase text-black text-sm">Central &amp; Westwood Class of 1982 Birthday Celebration</p>
                <p>Published on Sunland News</p>
            </footer>

        </div>
    );
}
