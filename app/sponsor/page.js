'use client';

import Link from 'next/link';

export default function SponsorPage() {
    const sponsors = [
        { 
            name: "Amandla Wellness", 
            src: "/images/amandla%20well%20ness%20logo.jpg", 
            bg: "bg-[#ccfbf1]", 
            p: "p-6" 
        },
        { 
            name: "Pepe's", 
            src: "/images/pepes%20logo.png", 
            bg: "bg-[#a3e635]", 
            p: "p-3" 
        },
        { 
            name: "SE Benchmark", 
            src: "/images/sebenchmarklogo.png", 
            bg: "bg-[#f3e8ff]", 
            p: "p-6" 
        },
        { 
            name: "Sunrise", 
            src: "/images/sunrise%20logo.png", 
            bg: "bg-gray-900", 
            p: "p-6" 
        },
        { 
            name: "Yates Funeral Home", 
            src: "/images/yates%20logo%20Yates%20Logo%20NO%20Background%20(1).png", 
            bg: "bg-white", // Fixed Yates to white so the gold text is readable
            p: "p-6" 
        },
        { 
            name: "Stoney", 
            src: "/images/stoney%20logo.png", 
            bg: "bg-[#dc2626]", 
            p: "p-2" 
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-black selection:bg-[#ff4365] selection:text-white">
            
            {/* 1. HERO SECTION */}
            <section className="pt-20 pb-16 px-4 bg-brutalBlue border-b-4 border-black relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-brutalYellow rounded-full border-4 border-black opacity-40"></div>
                
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-black mb-6 uppercase tracking-tight">
                        Local News is Free.<br/>
                        <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-[#ff4365] leading-normal px-2 mt-2 inline-block -rotate-1 rounded-sm">Our Partners Pay the Bill.</span>
                    </h1>
                    <p className="text-xl md:text-3xl text-black font-bold max-w-3xl mx-auto leading-relaxed mt-8 bg-brutalYellow border-2 border-black p-4 inline-block shadow-[4px_4px_0px_rgba(0,0,0,1)] -rotate-1">
                        We believe St. Lucie County deserves high-quality, unfiltered local news without hitting a paywall.
                    </p>
                    <p className="text-lg md:text-xl text-gray-900 font-medium max-w-2xl mx-auto leading-relaxed mt-8">
                        To make that happen, we partner with a select group of local businesses who care about this community as much as we do. We refuse to use generic pop-up ads, programmatic banners, or clickbait. It's not a transaction—we only work with brands we can honestly vouch for.
                    </p>
                </div>
            </section>

            {/* 2. THE LOCAL LEGENDS (SPONSORS GRID) */}
            <section className="py-20 px-4 bg-gray-50 border-b-4 border-black">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black uppercase text-black">
                            Local Legends Who Keep Us Free
                        </h2>
                        <p className="mt-4 text-gray-600 font-medium text-lg">If you see a brand here, it's because they actively fund independent local journalism.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                        {sponsors.map((sponsor, idx) => (
                            <div key={idx} className={`${sponsor.bg} ${sponsor.p} border-4 border-black rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] flex items-center justify-center h-48 sm:h-40 md:h-48 hover:-translate-y-2 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] transition-all overflow-hidden relative group`}>
                                <img 
                                    src={sponsor.src} 
                                    alt={`${sponsor.name} Logo`} 
                                    className={`${sponsor.name === 'Amandla Wellness' || sponsor.name === "Pepe's" ? `w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-2 border-black/10 shadow-sm ${sponsor.name === "Pepe's" ? 'bg-black p-2 scale-[1.15]' : ''}` : 'w-full h-full object-contain'} transition-transform duration-500 group-hover:scale-105 ${sponsor.bg === 'bg-[#a3e635]' || sponsor.bg === 'bg-[#dc2626]' ? 'scale-[1.1]' : ''}`} 
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. VALUE PROPS (3-COLUMN LAYOUT) */}
            <section className="py-24 px-4 bg-white border-b-4 border-black">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 text-black tracking-tight">
                            Why We Build <span className="text-primary underline decoration-8 underline-offset-4 pointer-events-none">Partnerships</span> <br/> 
                            Not Ads.
                        </h2>
                        <p className="text-xl text-gray-700 font-medium">Most local advertising is a transaction. You pay, they post. We go deep to actually integrate your business into the fabric of St. Lucie County.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-brutalYellow border-4 border-black p-8 rounded-[2rem] shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col hover:-translate-y-2 transition-transform">
                            <div className="w-16 h-16 bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-2xl mb-6">1</div>
                            <h3 className="font-extrabold text-2xl mb-4 uppercase">Total Exclusivity</h3>
                            <p className="font-medium text-gray-800 leading-relaxed">
                                When you sponsor a specific vertical or season with Sunland News, you absolutely own it. We don't rotate banners. We block your competitors out completely to give you unshared mindshare.
                            </p>
                        </div>
                        
                        <div className="bg-[#ff4365] text-white border-4 border-black p-8 rounded-[2rem] shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col hover:-translate-y-2 transition-transform">
                            <div className="w-16 h-16 bg-white text-black border-2 border-black rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-2xl mb-6">2</div>
                            <h3 className="font-extrabold text-2xl mb-4 uppercase">Custom Funnels</h3>
                            <p className="font-medium text-red-50 leading-relaxed">
                                We don't just blast your logo out into the void. We build highly optimized interactive lead magnets, quizzes, and digital forms to turn our deeply engaged readers into your active leads.
                            </p>
                        </div>

                        <div className="bg-primary text-white border-4 border-black p-8 rounded-[2rem] shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col hover:-translate-y-2 transition-transform">
                            <div className="w-16 h-16 bg-white text-black border-2 border-black rounded-full shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-2xl mb-6">3</div>
                            <h3 className="font-extrabold text-2xl mb-4 uppercase">Community Trust</h3>
                            <p className="font-medium text-orange-50 leading-relaxed">
                                Our audience trusts us entirely because of our strict gatekeeping. We weave your brand into our stories seamlessly so it feels like a neighborly recommendation, not a corporate interruption.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. BOTTOM CTA */}
            <section className="py-24 px-4 bg-black text-white relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[30rem] font-black opacity-5 whitespace-nowrap pointer-events-none">
                    ST LUCIE
                </div>
                
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">
                        Want To Fund Local News?
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 font-medium max-w-2xl mx-auto">
                        Are you a local business owner looking to reach a deeply engaged audience while supporting real, independent journalism? We strictly cap our sponsorships.
                    </p>
                    
                    <a 
                        href="mailto:thesunlandcompany@gmail.com" 
                        className="inline-block px-10 py-6 text-xl md:text-2xl font-black uppercase text-black bg-white border-4 border-brutalYellow rounded-2xl transition-all hover:scale-105 active:scale-95"
                    >
                        Reach Out About Sponsorship
                    </a>
                    <p className="text-sm font-bold text-gray-500 text-center mt-6 uppercase tracking-widest">
                        Direct Access To Our Founders
                    </p>
                </div>
            </section>

        </div>
    );
}
