'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ClassOf82Page() {
    const [copied, setCopied] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleCopyZelle = () => {
        navigator.clipboard.writeText('772-577-1046');
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const calendarEvents = [
        {
            title: "FPC vs. Sebastian River Football Game & Phatz Gathering",
            start: "20261023T190000",
            end: "20261023T230000",
            details: "Central & Westwood Class of 82 Weekend - Football Game at Lawnwood Stadium (7 PM) & After Game at Phatz Sports Bar.",
            location: "Lawnwood Stadium & Phatz Sports Bar, Fort Pierce, FL"
        },
        {
            title: "Class of 82 Brunch & Highwaymen Museum",
            start: "20261024T100000",
            end: "20261024T140000",
            details: "10am Brunch at Captain's Galley, 12:30pm Highwaymen Museum.",
            location: "Captain's Galley & Highwaymen Museum, Fort Pierce, FL"
        },
        {
            title: "Dress to the Nine Soiree",
            start: "20261024T173000",
            end: "20261024T230000",
            details: "Dinner, Dancing, Comedy, Silent Auction & 50/50 Raffle. Ticket: $100 (Zelle Deborah Noble 772-577-1046).",
            location: "Tutto Fresco, 9501 Brandywine Ln, Port St. Lucie, FL 34986"
        },
        {
            title: "Class of 82 Celebration Church Service",
            start: "20261025T110000",
            end: "20261025T130000",
            details: "Church Service at Immanuel Full Gospel.",
            location: "Immanuel Full Gospel, 1200 N 25th St, Fort Pierce, FL"
        }
    ];

    const generateGoogleCalendarUrl = () => {
        const title = encodeURIComponent("Central & Westwood Class of 1982 Birthday Celebration Weekend");
        const details = encodeURIComponent("Join Central and Westwood Class of 1982 Birthday weekend! Oct 23-25, 2026. Schedule & Info: https://sunlandnews.com/class-of-82");
        const location = encodeURIComponent("Fort Pierce & Port St. Lucie, FL");
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261023T230000Z/20261025T180000Z&details=${details}&location=${location}`;
    };

    return (
        <div className="min-h-screen bg-[#0d0f12] text-gray-100 font-sans selection:bg-amber-500 selection:text-black pb-20">
            {/* Top Bar Header */}
            <header className="border-b border-amber-500/20 bg-black/60 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-amber-400 font-bold text-sm tracking-wider uppercase hover:text-amber-300 transition-colors">
                        <span>←</span> Sunland News Events
                    </Link>
                    <span className="text-xs font-semibold px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full">
                        Official Event Guide
                    </span>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 px-4 text-center">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-4xl mx-auto relative z-10 space-y-6">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-500/40 text-amber-300 text-sm font-black tracking-widest uppercase shadow-lg shadow-amber-500/10">
                        <span>✨</span> Grown &amp; Sexy 62 <span>✨</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 tracking-tight uppercase leading-tight">
                        Class of 1982 <br className="hidden md:inline" />
                        Birthday Celebration Weekend
                    </h1>

                    <p className="text-xl md:text-2xl font-medium text-amber-200/90 max-w-2xl mx-auto italic">
                        Fort Pierce Central Cobras &amp; Fort Pierce Westwood Panthers
                    </p>

                    {/* Date & Location Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <div className="bg-gray-900/90 border border-amber-500/30 px-5 py-2.5 rounded-xl flex items-center gap-2 text-amber-300 font-bold shadow-md">
                            <span className="text-lg">📅</span> October 23 – 25, 2026
                        </div>
                        <div className="bg-gray-900/90 border border-amber-500/30 px-5 py-2.5 rounded-xl flex items-center gap-2 text-gray-300 font-bold shadow-md">
                            <span className="text-lg">📍</span> Fort Pierce &amp; Port St. Lucie, FL
                        </div>
                    </div>

                    {/* Quick Call to Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <a
                            href="#tickets"
                            className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-extrabold px-8 py-4 rounded-xl shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all text-lg tracking-wide uppercase"
                        >
                            🎟️ Get Soiree Tickets ($100)
                        </a>
                        <a
                            href={generateGoogleCalendarUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-900 hover:bg-gray-800 text-amber-300 border border-amber-500/40 font-bold px-6 py-4 rounded-xl shadow-lg hover:scale-105 transition-all text-base flex items-center gap-2"
                        >
                            📆 Add to Calendar
                        </a>
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <main className="max-w-5xl mx-auto px-4 space-y-16 relative z-10">

                {/* Announcement Card */}
                <section className="bg-gradient-to-b from-gray-900/90 to-gray-950 border border-amber-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <span className="text-xs font-black tracking-widest text-amber-400 uppercase bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-md inline-block">
                                You&apos;re Invited!
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                                Join the Celebration
                            </h2>
                            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                                Join Central and Westwood Class of 1982 for our 62nd Birthday weekend, <strong>October 23–25, 2026</strong>. Starting Friday night football game and Phatz Sports Bar; Saturday Brunch at Captain&apos;s Galley and the Highwaymen Museum; and the Dress to the Nine Soiree at Tutto Fresco with cocktails &amp; dinner ($100 ticket); silent auction and 50/50 raffle; wrapping up the weekend with a church service at Immanuel Full Gospel. <strong>Everyone is invited to join in the celebration!</strong>
                            </p>
                        </div>

                        {/* Thumbnail of Flyer */}
                        <div
                            onClick={() => setShowModal(true)}
                            className="relative cursor-pointer group flex-shrink-0 w-full md:w-64 bg-black p-2 rounded-2xl border-2 border-amber-500/40 shadow-xl hover:border-amber-400 transition-all hover:scale-105"
                        >
                            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden">
                                <Image
                                    src="/images/class-of-82-flyer.jpg"
                                    alt="Class of 1982 Birthday Weekend Flyer"
                                    fill
                                    className="object-cover group-hover:opacity-90 transition-opacity"
                                />
                            </div>
                            <div className="mt-2 text-center text-xs font-bold text-amber-400 group-hover:underline flex items-center justify-center gap-1">
                                🔍 Click to View Full Flyer
                            </div>
                        </div>
                    </div>
                </section>

                {/* Itinerary Schedule Section */}
                <section className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 tracking-tight uppercase">
                            Weekend Schedule
                        </h2>
                        <p className="text-gray-400 text-base md:text-lg">
                            Three days of food, fellowship, entertainment, and fun!
                        </p>
                    </div>

                    <div className="space-y-8">

                        {/* Friday Oct 23 Card */}
                        <div className="bg-gray-900/80 border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl hover:border-amber-500/30 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-4 gap-2">
                                <div>
                                    <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">DAY 1</span>
                                    <h3 className="text-2xl font-black text-white">Friday, October 23, 2026</h3>
                                </div>
                                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full w-fit">
                                    Kickoff Night
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Event 1 */}
                                <div className="bg-black/50 border border-gray-800 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-amber-400 font-extrabold text-sm">🏈 7:00 PM</span>
                                            <span className="text-xs font-semibold px-2 py-0.5 bg-gray-800 text-gray-300 rounded">Self Pay</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-white">Football Game: FPC vs. Sebastian River</h4>
                                        <p className="text-gray-400 text-sm">
                                            Cheer on Fort Pierce Central as they take on Sebastian River at Lawnwood Stadium!
                                        </p>
                                        <p className="text-xs text-gray-400 font-medium">📍 Lawnwood Stadium, Fort Pierce, FL</p>
                                    </div>
                                    <a
                                        href="https://maps.google.com/?q=Lawnwood+Stadium+Fort+Pierce+FL"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 pt-2"
                                    >
                                        📍 Open in Google Maps →
                                    </a>
                                </div>

                                {/* Event 2 */}
                                <div className="bg-black/50 border border-gray-800 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-amber-400 font-extrabold text-sm">🍻 After Game</span>
                                            <span className="text-xs font-semibold px-2 py-0.5 bg-gray-800 text-gray-300 rounded">Self Pay</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-white">After Game Gathering at Phatz</h4>
                                        <p className="text-gray-400 text-sm">
                                            Gather with classmates right after the game for drinks, food, and fun.
                                        </p>
                                        <p className="text-xs text-gray-400 font-medium">📍 Phatz Sports Bar &amp; Grill, 421 N US Hwy 1, Fort Pierce, FL 34950</p>
                                    </div>
                                    <a
                                        href="https://maps.google.com/?q=421+N+US+Hwy+1+Fort+Pierce+FL+34950"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 pt-2"
                                    >
                                        📍 Open in Google Maps →
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Saturday Oct 24 Card (MAIN DAY) */}
                        <div className="bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-950 border-2 border-amber-500/50 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl shadow-amber-500/5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-500/20 pb-4 gap-2">
                                <div>
                                    <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">DAY 2 • MAIN CELEBRATION</span>
                                    <h3 className="text-2xl md:text-3xl font-black text-white">Saturday, October 24, 2026</h3>
                                </div>
                                <span className="bg-amber-500 text-black font-extrabold text-xs px-3.5 py-1.5 rounded-full w-fit uppercase tracking-wider">
                                    Highlight Day
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                {/* Saturday Brunch */}
                                <div className="bg-black/60 border border-gray-800 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-amber-400 font-extrabold text-sm">🥞 10:00 AM – 12:00 PM</span>
                                            <span className="text-xs font-semibold px-2 py-0.5 bg-gray-800 text-gray-300 rounded">Self Pay</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-white">Birthday Brunch</h4>
                                        <p className="text-gray-400 text-sm">
                                            Start Saturday morning with delicious waterfront brunch at Captain&apos;s Galley.
                                        </p>
                                        <p className="text-xs text-gray-400 font-medium">📍 Captain&apos;s Galley, 825 Indian River Dr, Fort Pierce, FL</p>
                                    </div>
                                    <a
                                        href="https://maps.google.com/?q=825+Indian+River+Dr+Fort+Pierce+FL"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 pt-2"
                                    >
                                        📍 Open in Google Maps →
                                    </a>
                                </div>

                                {/* Highwaymen Museum */}
                                <div className="bg-black/60 border border-gray-800 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-amber-400 font-extrabold text-sm">🎨 12:30 PM – 2:00 PM</span>
                                            <span className="text-xs font-semibold px-2 py-0.5 bg-gray-800 text-gray-300 rounded">Self Pay</span>
                                        </div>
                                        <h4 className="text-lg font-bold text-white">Highwaymen Museum Visit</h4>
                                        <p className="text-gray-400 text-sm">
                                            Explore iconic local African-American Florida landscape art history.
                                        </p>
                                        <p className="text-xs text-gray-400 font-medium">📍 Highwaymen Museum, 1234 Avenue D, Fort Pierce, FL</p>
                                    </div>
                                    <a
                                        href="https://maps.google.com/?q=1234+Avenue+D+Fort+Pierce+FL"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 pt-2"
                                    >
                                        📍 Open in Google Maps →
                                    </a>
                                </div>

                                {/* Dress to the Nine Soiree */}
                                <div id="soiree" className="bg-gradient-to-b from-amber-500/10 via-black to-black border-2 border-amber-500 p-5 rounded-2xl space-y-3 flex flex-col justify-between md:col-span-2 lg:col-span-1 shadow-xl">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-amber-400 font-extrabold text-sm">🥂 5:30 PM – 11:00 PM</span>
                                            <span className="text-xs font-black px-2.5 py-1 bg-amber-500 text-black rounded-md uppercase">Entry: $100</span>
                                        </div>
                                        <h4 className="text-xl font-black text-amber-300">Dress to the Nine Soiree</h4>
                                        <p className="text-gray-300 text-sm">
                                            The marquee event! Cocktails, dinner, dancing, comedy, silent auction &amp; 50/50 raffle.
                                        </p>
                                        <ul className="text-xs text-gray-300 space-y-1 bg-gray-900/80 p-2.5 rounded-lg border border-gray-800">
                                            <li>📷 <strong>Complimentary 8x10 Photo</strong></li>
                                            <li>🍹 <strong>5:30 PM – 6:45 PM:</strong> Cocktail Hour</li>
                                            <li>🍽️ <strong>7:15 PM – 11:00 PM:</strong> Dinner, Dancing &amp; Comedy</li>
                                        </ul>
                                        <p className="text-xs text-gray-400 font-medium">📍 Tutto Fresco, 9501 Brandywine Ln, Port St. Lucie, FL 34986</p>
                                    </div>
                                    <a
                                        href="#tickets"
                                        className="w-full bg-amber-500 text-black text-center font-black py-2 rounded-xl text-xs uppercase hover:bg-amber-400 transition-colors mt-2"
                                    >
                                        Pay $100 Ticket via Zelle
                                    </a>
                                </div>

                            </div>
                        </div>

                        {/* Sunday Oct 25 Card */}
                        <div className="bg-gray-900/80 border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl hover:border-amber-500/30 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-4 gap-2">
                                <div>
                                    <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">DAY 3</span>
                                    <h3 className="text-2xl font-black text-white">Sunday, October 25, 2026</h3>
                                </div>
                                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full w-fit">
                                    Closing Fellowship
                                </span>
                            </div>

                            <div className="max-w-xl">
                                <div className="bg-black/50 border border-gray-800 p-5 rounded-2xl space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-amber-400 font-extrabold text-sm">⛪ 11:00 AM</span>
                                        <span className="text-xs font-semibold px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded">Church Service</span>
                                    </div>
                                    <h4 className="text-lg font-bold text-white">Sunday Service at Immanuel Full Gospel</h4>
                                    <p className="text-gray-400 text-sm">
                                        Wrap up an unforgettable weekend together in worship and Thanksgiving.
                                    </p>
                                    <p className="text-xs text-gray-400 font-medium">📍 Immanuel Full Gospel, 1200 N. 25th Street, Fort Pierce, FL</p>
                                    <a
                                        href="https://maps.google.com/?q=1200+N+25th+Street+Fort+Pierce+FL"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 pt-2"
                                    >
                                        📍 Open in Google Maps →
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Ticket & Zelle Payment Section */}
                <section id="tickets" className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-2 border-amber-500/50 rounded-3xl p-6 md:p-12 shadow-2xl space-y-8 text-center relative overflow-hidden">
                    <div className="max-w-2xl mx-auto space-y-4">
                        <span className="text-xs font-black tracking-widest text-amber-400 uppercase bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full inline-block">
                            Dress to the Nine Soiree Ticket ($100)
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                            Reserve Your Seat
                        </h2>
                        <p className="text-gray-300 text-base md:text-lg">
                            Send payment of <strong>$100 per entry</strong> via Zelle directly to our event coordinator <strong>Deborah Noble</strong>.
                        </p>
                    </div>

                    <div className="max-w-md mx-auto bg-gray-950 border border-amber-500/30 rounded-2xl p-6 space-y-6 shadow-inner">
                        <div className="space-y-2">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Zelle Recipient</span>
                            <div className="text-2xl font-black text-amber-300">Deborah Noble</div>
                            <div className="text-lg font-bold text-white tracking-wide">772-577-1046</div>
                        </div>

                        <button
                            onClick={handleCopyZelle}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                        >
                            {copied ? '✅ Phone Number Copied!' : '📋 Copy Zelle Phone Number (772-577-1046)'}
                        </button>

                        <div className="text-xs text-gray-400 bg-gray-900 p-3 rounded-lg border border-gray-800 space-y-1">
                            <p className="font-semibold text-gray-300">💡 Instructions for Zelle:</p>
                            <p>1. Open your banking app &amp; select Zelle.</p>
                            <p>2. Send <strong>$100</strong> to <strong>772-577-1046</strong> (Deborah Noble).</p>
                            <p>3. Include your full name in the memo note.</p>
                        </div>
                    </div>
                </section>

                {/* FAQ / Info Section */}
                <section className="bg-gray-900/60 border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6">
                    <h3 className="text-2xl font-bold text-white text-center">Frequently Asked Questions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-gray-800">
                            <h4 className="font-bold text-amber-300 text-sm">Who is invited to the weekend?</h4>
                            <p className="text-gray-300 text-sm">Everyone is welcome! Central &amp; Westwood alumni, family, and friends are invited to celebrate.</p>
                        </div>
                        <div className="space-y-2 bg-black/40 p-4 rounded-xl border border-gray-800">
                            <h4 className="font-bold text-amber-300 text-sm">What is the dress code for Saturday night?</h4>
                            <p className="text-gray-300 text-sm">&quot;Dress to the Nine&quot; — elegant evening wear, suits, and formal dresses for a memorable night out.</p>
                        </div>
                    </div>
                </section>

            </main>

            {/* Modal for viewing flyer image */}
            {showModal && (
                <div
                    onClick={() => setShowModal(false)}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
                >
                    <div className="relative max-w-2xl w-full max-h-[90vh] aspect-[3/4] bg-black rounded-2xl overflow-hidden border-2 border-amber-500 shadow-2xl">
                        <Image
                            src="/images/class-of-82-flyer.jpg"
                            alt="Class of 1982 Flyer"
                            fill
                            className="object-contain"
                        />
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 bg-amber-500 text-black font-black px-4 py-2 rounded-full text-xs uppercase"
                        >
                            Close ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="mt-20 border-t border-gray-800 text-center py-8 text-gray-500 text-xs space-y-2">
                <p>Central &amp; Westwood Class of 1982 Birthday Celebration Weekend</p>
                <p>Promoted &amp; Hosted on Sunland News</p>
            </footer>
        </div>
    );
}
