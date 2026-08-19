'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getCalApi } from "@calcom/embed-react";

export default function EventSponsorPage() {
    const stripeLink = "https://buy.stripe.com/5kQeVe0hYgaJ3S65SgcZa0j";
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({"namespace":"sunlandnewsadvertisercall"});
            cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        })();
    }, []);

    const features = [
        {
            title: "Monthly Top Events Carousel",
            desc: "Featured in our highly anticipated monthly roundup carousel posted on Instagram, TikTok, and Facebook. Includes custom branding and design.",
            icon: "📱"
        },
        {
            title: "Monthly Top Events Video",
            desc: "A dedicated mention in our Monthly Top Events video, produced with professional editing and shared directly to our local follower base.",
            icon: "🎥"
        },
        {
            title: "Week of Event — Weekender Carousel",
            desc: "Inclusion in our weekend events guide carousel published right before the weekend when local residents are actively looking for plans.",
            icon: "🗓️"
        },
        {
            title: "Week of Event — Weekender Video",
            desc: "A shoutout in our Friday 'Weekender' video walkthrough highlighting the best things to do in town.",
            icon: "🎬"
        },
        {
            title: "Wednesday Newsletter Mention",
            desc: "Inclusion in our mid-week newsletter sent directly to thousands of active local subscribers preparing their weekly schedules.",
            icon: "✉️"
        },
        {
            title: "Thursday Events Newsletter Mention",
            desc: "A high-visibility feature in our Thursday 'What's Happening' dedicated event guide email.",
            icon: "🗞️"
        },
        {
            title: "Gold Card at the Top of the Events Section",
            desc: "A custom gold-themed highlight card pinned to the absolute top of the calendar events listing for your entire event week.",
            icon: "✨"
        },
        {
            title: "Listed on the Sunland Calendar",
            desc: "Guaranteed, priority placement on our main Sunland Events Calendar database with direct links to your ticketing or RSVP site.",
            icon: "📅"
        }
    ];

    const scrollToPricing = (e) => {
        e.preventDefault();
        const element = document.getElementById('pricing');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const logos = [
        { name: "City of Fort Pierce", src: "/images/Document (3).png", class: "h-14 w-auto object-contain", wrapperClass: "bg-gray-50/50 hover:bg-gray-50" },
        { name: "IRSC", src: "/images/IRSC_Mark_V_2color-scaled.jpg", class: "h-12 w-auto object-contain", wrapperClass: "bg-gray-50/50 hover:bg-gray-50" },
        { name: "TCBA", src: "/images/download (16).jpeg", class: "h-10 w-auto object-contain", wrapperClass: "bg-gray-50/50 hover:bg-gray-50" },
        { name: "Sunrise Theatre", src: "/images/sunrise logo.png", class: "h-10 w-auto object-contain", wrapperClass: "bg-black hover:bg-black/95 px-4 py-2" },
        { name: "Yates Funeral Home", src: "/images/yates logo Yates Logo NO Background (1).png", class: "h-14 w-auto object-contain", wrapperClass: "bg-gray-50/50 hover:bg-gray-50" },
        { name: "Pepe's", src: "/images/pepes logo.png", class: "h-12 w-auto object-contain", wrapperClass: "bg-gray-50/50 hover:bg-gray-50" }
    ];

    const socialPreviews = [
        {
            title: "Monthly Carousel",
            tag: "IG / TT / FB Carousel",
            description: "High-reach swipeable posts spotlighting the month's biggest local happenings.",
            embedUrl: "https://www.instagram.com/p/DWwZ8pXkWCU/embed",
            originalUrl: "https://www.instagram.com/p/DWwZ8pXkWCU/?img_index=1",
            icon: "📱"
        },
        {
            title: "Top Events Video",
            tag: "Monthly Video Reel",
            description: "Vibrant, short-form video reels that capture local engagement and attention.",
            embedUrl: "https://www.instagram.com/p/DWzAVdBjnql/embed",
            originalUrl: "https://www.instagram.com/p/DWzAVdBjnql/",
            icon: "🎥"
        },
        {
            title: "Weekend Video Guide",
            tag: "Weekender Video",
            description: "Our signature 'Weekender' video walking locals through the best weekend spots.",
            embedUrl: "https://www.instagram.com/p/DYDmAZdJP_k/embed",
            originalUrl: "https://www.instagram.com/p/DYDmAZdJP_k/",
            icon: "🎬"
        },
        {
            title: "Weekender Carousel",
            tag: "Weekend Guide",
            description: "A popular multi-image guide showcasing top weekend plans.",
            embedUrl: "https://www.instagram.com/p/DYAoUj-kR2K/embed",
            originalUrl: "https://www.instagram.com/p/DYAoUj-kR2K/?img_index=1",
            icon: "🗓️"
        }
    ];

    return (
        <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white pb-24 scroll-smooth">
            
            {/* 1. HERO SECTION */}
            <section className="pt-24 pb-20 px-4 bg-brutalBlue border-b-4 border-black relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}></div>
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-brutalYellow rounded-full border-4 border-black opacity-30 transform rotate-12"></div>
                
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block py-2 px-4 bg-brutalYellow text-black text-xs md:text-sm font-black mb-6 tracking-widest uppercase border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transform -rotate-1">
                        Sponsor Your Event
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-black mb-6 uppercase tracking-tight leading-none">
                        Get Your Event Seen By<br/>
                        <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-brutalPink leading-normal px-4 mt-2 inline-block -rotate-1 rounded-lg border-2 border-black">
                            All of St. Lucie County
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl font-bold text-gray-900 max-w-2xl mx-auto leading-relaxed mt-6">
                        Put your event directly in front of 45,000+ active local residents. Top positioning, email newsletters, customized videos, and social carousel posts — all in one powerful package.
                    </p>
                    
                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button
                            onClick={scrollToPricing}
                            className="w-full sm:w-auto px-8 py-5 bg-black text-white text-lg font-black uppercase tracking-wider rounded-xl border-4 border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            Claim Your Sponsored Slot
                        </button>
                        <a
                            href="#examples"
                            className="w-full sm:w-auto px-8 py-5 bg-white text-black text-lg font-black uppercase tracking-wider rounded-xl border-4 border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            See Live Previews
                        </a>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2">
                        <span className="text-brutalYellow text-xl">⭐⭐⭐⭐⭐</span>
                        <span className="text-sm font-black uppercase tracking-wider text-black/75">St. Lucie's Go-To Event Resource</span>
                    </div>
                </div>
            </section>

            {/* 2. SOCIAL PROOF LOGO MARQUEE */}
            <section className="py-12 bg-white border-b-4 border-black overflow-hidden">
                <div className="container mx-auto max-w-5xl px-4">
                    <p className="text-center text-xs font-black uppercase tracking-widest text-gray-500 mb-8">
                        Trusted by St. Lucie County's Favorite Brands & Institutions
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center opacity-85">
                        {logos.map((logo, idx) => (
                            <div key={idx} className={`flex items-center justify-center p-2 rounded-xl transition-all border border-transparent hover:border-black/10 hover:opacity-100 ${logo.wrapperClass}`}>
                                <img
                                    src={logo.src}
                                    alt={`${logo.name} logo`}
                                    className={logo.class}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. PROVEN REACH STATS */}
            <section className="py-20 px-4 bg-white border-b-4 border-black">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 tracking-tight">
                            Massive, Unrivaled Local Reach
                        </h2>
                        <p className="text-lg font-bold text-gray-600">
                            Stop wasting budget on broad algorithms. We deliver highly targeted, active St. Lucie locals ready to buy tickets and show up.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-8 bg-brutalYellow border-4 border-black rounded-2xl shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                            <span className="block text-6xl font-black mb-2">25,000+</span>
                            <span className="text-sm font-black uppercase tracking-wider text-black/80">Social Views</span>
                            <p className="text-sm font-bold text-gray-700 mt-4 leading-relaxed">
                                Combined organic video views and carousel impressions across Instagram, TikTok & Facebook from just our two Monthly Top posts and two Event videos.
                            </p>
                        </div>
                        <div className="p-8 bg-brutalPink text-white border-4 border-black rounded-2xl shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                            <span className="block text-6xl font-black mb-2">20,000+</span>
                            <span className="text-sm font-black uppercase tracking-wider text-red-100">Newsletter Readers</span>
                            <p className="text-sm font-bold text-red-50 mt-4 leading-relaxed">
                                Direct, high-open-rate delivery straight to St. Lucie County locals' email inboxes via our weekly community events newsletters.
                            </p>
                        </div>
                        <div className="p-8 bg-primary text-white border-4 border-black rounded-2xl shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                            <span className="block text-6xl font-black mb-2">45,000+</span>
                            <span className="text-sm font-black uppercase tracking-wider text-orange-100">Total Impressions</span>
                            <p className="text-sm font-bold text-orange-50 mt-4 leading-relaxed">
                                High-impact, multi-channel local awareness during the week of your event. If they are in town, they will see it.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. THE PROBLEM & SOLUTION */}
            <section className="py-20 px-4 bg-gray-50 border-b-4 border-black">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        {/* The Problem */}
                        <div className="bg-white p-8 border-4 border-black rounded-2xl shadow-brutal relative">
                            <div className="absolute -top-5 -left-3 w-10 h-10 bg-red-500 text-white border-2 border-black rounded-full flex items-center justify-center font-black text-lg">✕</div>
                            <h3 className="text-2xl font-black uppercase mb-4 text-red-600">The Ad Problem</h3>
                            <p className="font-bold text-gray-700 leading-relaxed text-sm">
                                Standard social media algorithms throttle organic business pages to force ad spends. Programmatic banner ads on corporate local papers are ignored, blocky, and paywalled. Getting people to actually show up has never been harder or more expensive.
                            </p>
                        </div>

                        {/* The Solution */}
                        <div className="bg-brutalYellow p-8 border-4 border-black rounded-2xl shadow-brutal relative">
                            <div className="absolute -top-5 -left-3 w-10 h-10 bg-green-500 text-white border-2 border-black rounded-full flex items-center justify-center font-black text-lg">✓</div>
                            <h3 className="text-2xl font-black uppercase mb-4 text-black">The Sunland Way</h3>
                            <p className="font-bold text-gray-900 leading-relaxed text-sm">
                                We bypass the algorithms entirely. We weave your event into our highly anticipated organic content (weekly carousels, video previews, email news digests) that locals actively trust and seek out. It feels like a recommendation from a neighbor, not an ad.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. INTERACTIVE LIVE INSTAGRAM PREVIEWS */}
            <section id="examples" className="py-20 px-4 bg-white border-b-4 border-black">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 tracking-tight">
                            Live Promotion Formats
                        </h2>
                        <p className="text-lg font-bold text-gray-600">
                            See exactly how your event will appear across our channels. Switch tabs below to see live previews:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-12 gap-8 items-start">
                        {/* Tab Selector Buttons */}
                        <div className="md:col-span-5 space-y-3">
                            {socialPreviews.map((preview, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    className={`w-full text-left p-4 border-4 border-black rounded-xl transition-all flex items-start gap-3 ${activeTab === idx
                                        ? 'bg-brutalYellow shadow-brutal translate-x-[2px] translate-y-[2px]'
                                        : 'bg-white hover:-translate-y-0.5 hover:shadow-brutal-sm'
                                    }`}
                                >
                                    <span className="text-2xl mt-0.5">{preview.icon}</span>
                                    <div>
                                        <h3 className="font-black text-sm uppercase tracking-tight leading-none mb-1">
                                            {preview.title}
                                        </h3>
                                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 block mb-1">
                                            {preview.tag}
                                        </span>
                                        <p className="text-xs font-bold text-gray-600 leading-snug">
                                            {preview.description}
                                        </p>
                                    </div>
                                </button>
                            ))}

                            <div className="pt-4">
                                <a
                                    href={socialPreviews[activeTab].originalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center py-4 bg-white hover:bg-gray-50 border-4 border-black font-black uppercase tracking-wider rounded-xl shadow-brutal active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                                >
                                    View Live Post on Instagram &rarr;
                                </a>
                            </div>
                        </div>

                        {/* Interactive Dynamic Phone Preview Container */}
                        <div className="md:col-span-7 bg-black p-4 rounded-[2.5rem] border-8 border-black shadow-brutal flex flex-col justify-center items-center min-h-[500px] relative max-w-sm mx-auto">
                            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-full z-10 border border-gray-800 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 bg-black rounded-full mr-2"></div>
                                <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                            </div>
                            <div className="w-full h-[450px] rounded-[1.5rem] overflow-hidden bg-white mt-4 relative">
                                <iframe
                                    src={socialPreviews[activeTab].embedUrl}
                                    className="w-full h-full border-none"
                                    allowFullScreen
                                    scrolling="yes"
                                    allow="encrypted-media"
                                    key={activeTab}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. FEATURES SHOWCASE */}
            <section className="py-20 px-4 bg-gray-50 border-b-4 border-black">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 tracking-tight">
                            Everything Included In the Package
                        </h2>
                        <p className="text-lg font-bold text-gray-600">
                            We don't do single-channel blasts. Our Event Partner package places you everywhere that locals check.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feat, idx) => (
                            <div key={idx} className="p-6 bg-white border-4 border-black rounded-2xl shadow-brutal flex items-start gap-4">
                                <span className="text-4xl">{feat.icon}</span>
                                <div>
                                    <h3 className="text-xl font-black uppercase mb-2 tracking-tight">{feat.title}</h3>
                                    <p className="text-sm font-bold text-gray-600 leading-relaxed">{feat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <button
                            onClick={scrollToPricing}
                            className="inline-block px-10 py-5 bg-primary text-white text-lg font-black uppercase tracking-wider rounded-xl border-4 border-black shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
                        >
                            Claim Your Sponsored Slot
                        </button>
                    </div>
                </div>
            </section>

            {/* 7. PERSONAL NOTE SECTION */}
            <section className="py-20 px-4 bg-white border-b-4 border-black relative overflow-hidden">
                <div className="container mx-auto max-w-3xl">
                    <div className="bg-brutalBg border-4 border-black p-8 rounded-3xl shadow-brutal relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brutalBlue/10 rounded-full blur-xl pointer-events-none"></div>
                        
                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                            {/* Profile Image container */}
                            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-black overflow-hidden shadow-brutal bg-white flex-shrink-0 transform -rotate-3 hover:rotate-1 transition-transform">
                                <Image
                                    src="/images/jamin-profile.png"
                                    alt="Jamin"
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            
                            {/* Text content */}
                            <div className="space-y-4 font-bold text-gray-800 leading-relaxed">
                                <span className="inline-block bg-black text-white px-3 py-1 rounded text-xs font-black uppercase tracking-wider transform -rotate-1">
                                    Founder's Note
                                </span>
                                <h3 className="text-3xl font-black text-black uppercase tracking-tight leading-none mb-2">
                                    Hey, I'm Ja'Min.
                                </h3>
                                <p className="text-sm md:text-base">
                                    I started Sunland News because I noticed how difficult it was to stay updated on what is actually happening in our community. Local news shouldn't be hidden behind massive corporate paywalls, and local events shouldn't go unnoticed.
                                </p>
                                <p className="text-sm md:text-base">
                                    When you partner with us for your event listing, you're not just purchasing a block of advertising. You're supporting real, independent local journalism, and you're weaving your event into a channel that locals trust.
                                </p>
                                <p className="text-sm md:text-base">
                                    I personally verify and format every sponsored listing to ensure it looks stellar and grabs attention. Let's make your next event a huge success.
                                </p>
                                
                                <div className="pt-2">
                                    <span className="font-black text-black text-xl italic font-serif">- Ja'Min</span>
                                    <span className="block text-xs font-black uppercase text-gray-500 mt-1">Founder, Sunland News</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. PRICING & CALL-TO-ACTION */}
            <section id="pricing" className="py-20 px-4 bg-gray-50 border-b-4 border-black">
                <div className="container mx-auto max-w-md">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-black uppercase mb-3 tracking-tight">
                            Simple Pricing
                        </h2>
                        <p className="text-sm font-bold text-gray-600">
                            One single, all-inclusive promotion package. No monthly subscriptions, no lock-in.
                        </p>
                    </div>

                    <div className="bg-brutalYellow p-8 border-4 border-black rounded-3xl shadow-brutal relative">
                        <div className="absolute -top-4 -right-4 bg-brutalPink text-white border-4 border-black rounded-full py-1.5 px-4 font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_rgba(0,0,0,1)] transform rotate-6">
                            ONE TIME
                        </div>

                        <div className="text-center mb-6">
                            <span className="bg-black text-white text-xs font-black uppercase px-3 py-1 rounded tracking-wider mb-3 inline-block">
                                Event Partner
                            </span>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-6xl font-black">$300</span>
                                <span className="text-lg font-bold text-black/75">/ event</span>
                            </div>
                        </div>

                        <ul className="space-y-3 font-bold text-sm text-gray-900 border-t-2 border-b-2 border-black/10 py-6 mb-8">
                            <li className="flex items-center gap-2">
                                <span className="text-green-600">✓</span> Monthly Top Events Carousel (IG/TT/FB)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-600">✓</span> Monthly Top Events Video Mention
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-600">✓</span> Week of Event Weekender Carousel
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-600">✓</span> Week of Event Weekender Video
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-600">✓</span> Wednesday Newsletter Mention
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-600">✓</span> Thursday Dedicated Event Mention
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-600">✓</span> Pinned Gold Highlight Card (1 Week)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-600">✓</span> Live Priority Calendar Listing
                            </li>
                        </ul>

                        <a
                            href={stripeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center py-5 bg-black text-white text-xl font-black uppercase tracking-wider rounded-xl border-4 border-black shadow-[4px_4px_0px_rgba(248,134,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(248,134,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all mb-4"
                        >
                            Claim Your Sponsored Slot
                        </a>

                        <p className="text-center text-xs font-bold text-black/60">
                            Processed securely via Stripe Checkout.
                        </p>
                    </div>
                </div>
            </section>

            {/* 9. FAQ SECTION */}
            <section className="py-20 px-4 bg-white border-b-4 border-black">
                <div className="container mx-auto max-w-3xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 tracking-tight">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg font-bold text-gray-600">
                            Got questions? We've got answers.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-brutalBg p-6 border-4 border-black rounded-2xl shadow-brutal-sm">
                            <h3 className="text-lg font-black uppercase mb-2">When should I purchase the listing?</h3>
                            <p className="text-sm font-bold text-gray-600 leading-relaxed">
                                We recommend purchasing at least 2 to 3 weeks before your event date. This ensures we can get your event featured in both the monthly calendar layouts and the week-of promotions.
                            </p>
                        </div>
                        <div className="bg-brutalBg p-6 border-4 border-black rounded-2xl shadow-brutal-sm">
                            <h3 className="text-lg font-black uppercase mb-2">How do you get my event details?</h3>
                            <p className="text-sm font-bold text-gray-600 leading-relaxed">
                                We pull the details directly from the event submission form you completed. Once payment goes through, we compile those details and start formatting the graphics.
                            </p>
                        </div>
                        <div className="bg-brutalBg p-6 border-4 border-black rounded-2xl shadow-brutal-sm">
                            <h3 className="text-lg font-black uppercase mb-2">What if my event is cancelled or postponed?</h3>
                            <p className="text-sm font-bold text-gray-600 leading-relaxed">
                                No problem. Reach out to us at least 48 hours prior to your scheduled week and we can easily transfer your sponsorship slot to another date or event.
                            </p>
                        </div>
                        <div className="bg-brutalBg p-6 border-4 border-black rounded-2xl shadow-brutal-sm">
                            <h3 className="text-lg font-black uppercase mb-2">Can I sponsor multiple events?</h3>
                            <p className="text-sm font-bold text-gray-600 leading-relaxed">
                                Absolutely! Each event requires a separate one-time partnership purchase. For bulk event booking, annual rates, or custom packages, you can <button type="button" data-cal-link="sunlandcompany/sunlandnewsadvertisercall" data-cal-namespace="sunlandnewsadvertisercall" data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}' className="underline hover:text-primary transition-colors font-bold inline-block align-baseline bg-transparent border-none p-0 cursor-pointer">book a call with us</button> directly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. FINAL CALL TO ACTION */}
            <section className="py-24 px-4 bg-black text-white relative overflow-hidden text-center">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-black opacity-5 whitespace-nowrap pointer-events-none">
                    ST LUCIE
                </div>
                
                <div className="container mx-auto max-w-3xl relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 tracking-tight">
                        Ready to Sell Out Your Event?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 font-bold max-w-xl mx-auto">
                        Get massive visibility, priority placement, and start filling seats. Claim your spot today.
                    </p>
                    
                    <a
                        href={stripeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-10 py-6 text-xl font-black uppercase text-black bg-white border-4 border-brutalYellow rounded-2xl shadow-brutal hover:scale-105 active:scale-95 transition-all"
                    >
                        Claim Sponsored Slot ($300)
                    </a>
                    
                    <div className="mt-6 flex justify-center items-center gap-4 text-xs font-black uppercase tracking-widest text-gray-400">
                        <span>✓ One-time purchase</span>
                        <span>•</span>
                        <span>✓ Secure checkout</span>
                        <span>•</span>
                        <span>✓ Priority Support</span>
                    </div>
                </div>
            </section>

        </div>
    );
}
