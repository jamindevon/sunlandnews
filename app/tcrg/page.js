'use client';

export default function TCRGPitchPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white pb-16">
            
            {/* TOP PRESENTATION BANNER */}
            <div className="bg-slate-950 text-amber-400 font-bold text-xs py-2.5 px-4 text-center uppercase tracking-widest flex items-center justify-center gap-2 border-b border-slate-800">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>CONFIDENTIAL PROPOSAL • FOR LUKE LEWIS & TREASURE COAST REALTY GROUP</span>
            </div>

            <div className="max-w-4xl mx-auto px-4 pt-8 space-y-10">

                {/* 1. HERO SLIDE / HEADER WITH LOGO IMAGES */}
                <header className="bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white p-8 md:p-10 rounded-2xl shadow-xl text-center relative overflow-hidden border border-slate-800">
                    
                    {/* LOGOS ROW (SUNLAND NEWS LOGO × TCRG LOGO) */}
                    <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
                        <div className="bg-white px-4 py-2 rounded-xl shadow-md flex items-center justify-center">
                            <img 
                                src="/images/sunlandnews-logo.png" 
                                alt="Sunland News Logo" 
                                className="h-9 md:h-11 w-auto object-contain"
                            />
                        </div>
                        <span className="font-bold text-xl text-amber-400">×</span>
                        <div className="bg-white px-4 py-2 rounded-xl shadow-md flex items-center justify-center">
                            <img 
                                src="/images/cf0ebcd0fbac-LOGO_Treasure_Coast_Realty_Group.png" 
                                alt="Treasure Coast Realty Group Logo" 
                                className="h-9 md:h-11 w-auto object-contain"
                            />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black mb-3 uppercase tracking-tight leading-tight text-white">
                        A Year-Long Partnership<br />
                        <span className="text-amber-400 font-extrabold text-2xl md:text-3xl block mt-1">
                            Building the Future of TCRG
                        </span>
                    </h1>

                    <p className="text-sm md:text-base font-medium text-slate-200 max-w-xl mx-auto leading-relaxed mt-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                        Building the visibility, trust, and lead pipeline behind <span className="text-amber-400 font-bold underline decoration-amber-400 decoration-2">Luke Lewis</span> (Broker & Owner) and the firm’s next chapter across St. Lucie County.
                    </p>
                    
                    <div className="mt-5 text-xs font-semibold uppercase tracking-widest text-slate-400">
                        Prepared by Ja'Min Brown • Founder, Sunland News
                    </div>
                </header>

                {/* 2. PROVEN REACH NUMBERS */}
                <section className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-xl">
                            <span className="block text-2xl md:text-4xl font-black text-slate-900">20,000</span>
                            <span className="text-xs font-semibold uppercase text-slate-600">Newsletter Inboxes</span>
                        </div>
                        <div className="p-4 bg-blue-50/60 border border-blue-200/60 rounded-xl">
                            <span className="block text-2xl md:text-4xl font-black text-slate-900">55%</span>
                            <span className="text-xs font-semibold uppercase text-slate-600">Avg Open Rate</span>
                        </div>
                        <div className="p-4 bg-emerald-50/60 border border-emerald-200/60 rounded-xl">
                            <span className="block text-2xl md:text-4xl font-black text-slate-900">7.5%</span>
                            <span className="text-xs font-semibold uppercase text-slate-600">Avg Click-Through</span>
                        </div>
                        <div className="p-4 bg-purple-50/60 border border-purple-200/60 rounded-xl">
                            <span className="block text-2xl md:text-4xl font-black text-slate-900">40,000</span>
                            <span className="text-xs font-semibold uppercase text-slate-600">Local Followers</span>
                        </div>
                    </div>
                </section>

                {/* 3. STEP 1: COVER STORY & VSL LANDING PAGE — REINTRODUCING LUKE LEWIS */}
                <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full uppercase tracking-wider">Step 01</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-bold">The Core Asset</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                            Reintroducing Luke Lewis: Cover Story & VSL
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1 leading-relaxed max-w-2xl">
                            A new ownership chapter deserves to be told in Luke’s own words. The sit-down interview cover story is the foundational raw material that feeds every layer of visibility below.
                        </p>
                    </div>

                    {/* VSL COVER STORY LANDING PAGE MOCKUP */}
                    <div className="border border-slate-300 rounded-xl overflow-hidden shadow-md bg-white">
                        {/* Browser Bar */}
                        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-white">
                            <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                <span className="ml-3 text-xs font-mono text-slate-300 bg-slate-800 px-3 py-1 rounded-md max-w-sm truncate border border-slate-700">
                                    https://sunlandnews.com/stories/tcrg-luke-lewis-cover-story
                                </span>
                            </div>
                            <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded uppercase">COVER STORY VSL</span>
                        </div>

                        {/* Article Content */}
                        <div className="p-6 md:p-8 space-y-6">
                            
                            <div className="space-y-2 border-b border-slate-200 pb-4">
                                <div className="flex items-center gap-2">
                                    <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">Exclusive Cover Feature</span>
                                    <span className="text-xs text-slate-500 font-medium">St. Lucie County Real Estate</span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                                    Building the Future of St. Lucie Real Estate: Luke Lewis & Treasure Coast Realty Group
                                </h3>
                                <p className="text-xs text-slate-500 font-medium">
                                    By Ja'Min Brown • Founder, Sunland News
                                </p>
                            </div>

                            {/* Sit-Down VSL Video Frame */}
                            <div className="aspect-video w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-md">
                                <iframe
                                    src="https://drive.google.com/file/d/1knPn6WCz9JsAFnRzlLU7QCzcm3EkioF9/preview"
                                    className="w-full h-full border-0"
                                    allow="autoplay"
                                    title="Luke Lewis Sit-Down Cover Feature Interview"
                                ></iframe>
                            </div>

                            {/* Article Excerpt */}
                            <div className="prose prose-slate max-w-none text-xs md:text-sm text-slate-700 leading-relaxed space-y-2">
                                <p className="font-semibold text-slate-900 text-sm">
                                    “We aren't just selling houses—we're investing in St. Lucie County's long-term growth and helping families build real local equity.”
                                </p>
                                <p>
                                    Under the leadership of Broker/Owner Luke Lewis, Treasure Coast Realty Group is ushering in a client-first approach to real estate across Fort Pierce, Port St. Lucie, and the surrounding Treasure Coast.
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* 3 NARRATIVE PILLARS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <div className="text-2xl mb-2">🎙️</div>
                            <h3 className="text-xs font-bold text-slate-900 uppercase mb-1">Why He Started</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">The story behind taking over the firm, told on camera to build immediate human trust.</p>
                        </div>

                        <div className="p-4 bg-amber-50/60 border border-amber-200/60 rounded-xl">
                            <div className="text-2xl mb-2">🚀</div>
                            <h3 className="text-xs font-bold text-slate-900 uppercase mb-1">What It Means</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">Ownership change reframed as forward motion and elevated standards across the Treasure Coast.</p>
                        </div>

                        <div className="p-4 bg-blue-50/60 border border-blue-200/60 rounded-xl">
                            <div className="text-2xl mb-2">🗺️</div>
                            <h3 className="text-xs font-bold text-slate-900 uppercase mb-1">Where Firm Is Headed</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">Vision, in his own voice. Positioning TCRG as the local brokerage of choice.</p>
                        </div>
                    </div>
                </section>

                {/* 4. STEP 2: THE KALEIDOSCOPE METHOD */}
                <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-blue-900 text-white text-xs font-bold rounded-full uppercase tracking-wider">Step 02</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">The Content Engine</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                            One Interview. A Year of Content.
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1 leading-relaxed max-w-2xl">
                            The Kaleidoscope Method: We recut, re-edit, and re-chop up the sit-down interview so it stays fresh and consistently visible all year long.
                        </p>
                    </div>

                    {/* 4-STAGE PIPELINE GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <span className="w-7 h-7 bg-amber-400 text-slate-950 font-bold rounded-full flex items-center justify-center text-xs mb-2">1</span>
                            <h3 className="text-xs font-bold text-slate-900 uppercase mb-1">Newsletter Feature</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">Told to 20,000+ local inboxes across St. Lucie County.</p>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <span className="w-7 h-7 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-xs mb-2">2</span>
                            <h3 className="text-xs font-bold text-slate-900 uppercase mb-1">Social Clips</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">Re-chopped reels posted across Instagram, Facebook, & TikTok.</p>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <span className="w-7 h-7 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center text-xs mb-2">3</span>
                            <h3 className="text-xs font-bold text-slate-900 uppercase mb-1">Landing Page VSL</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">The sit-down interview acts as TCRG's ongoing story landing page.</p>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <span className="w-7 h-7 bg-emerald-500 text-white font-bold rounded-full flex items-center justify-center text-xs mb-2">4</span>
                            <h3 className="text-xs font-bold text-slate-900 uppercase mb-1">Retargeting Pool</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">Clips shown to warm leads driving recurring inquiry leads to TCRG.</p>
                        </div>
                    </div>
                </section>

                {/* 5. SIGNATURE FRANCHISE: SUNLAND CRIBS */}
                <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-full uppercase tracking-wider">Signature Franchise</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Property Showcases</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                            Sunland Cribs
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1 leading-relaxed max-w-2xl">
                            A once-a-month MTV Cribs style home tour show, featuring Treasure Coast Realty Group agents as featured guest hosts.
                        </p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-red-500 text-white font-bold px-2 py-0.5 text-[10px] uppercase rounded">Proof of Concept</span>
                            <span className="font-semibold text-xs text-slate-800">Last episode outperformed the rest of our video slate!</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed mt-1">
                            That's the proof of concept. Now we produce a monthly featured episode built around Treasure Coast Realty Group listings.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Facebook Video Embed for Sunland Cribs */}
                        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-md">
                            <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-white">
                                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Monthly Sunland Cribs Episode</span>
                            </div>
                            <div className="aspect-[9/16] sm:aspect-video w-full flex items-center justify-center bg-black">
                                <iframe
                                    src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D923875537105611&show_text=false"
                                    className="w-full h-full border-0"
                                    allowFullScreen={true}
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    title="Sunland Cribs Facebook Video"
                                ></iframe>
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-3">
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                <div className="text-xl mb-1">🏡</div>
                                <h3 className="text-xs font-bold text-slate-900 uppercase mb-0.5">Featured Agent Tours Listing</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">TCRG agents tour featured properties on camera, highlighting personality and market expertise.</p>
                            </div>

                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                <div className="text-xl mb-1">📲</div>
                                <h3 className="text-xs font-bold text-slate-900 uppercase mb-0.5">Multi-Channel Distribution</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">Distributed as a flagship monthly newsletter feature + short-form video clips across social media.</p>
                            </div>

                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                <div className="text-xl mb-1">🔥</div>
                                <h3 className="text-xs font-bold text-slate-900 uppercase mb-0.5">Monthly Featured Spotlight</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">Locals love seeing inside neighborhood homes, giving your featured listing massive organic engagement.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. STEP 3: NEWSLETTER AD SPONSORSHIP TIERS */}
                <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-blue-900 text-white text-xs font-bold rounded-full uppercase tracking-wider">Step 03</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Daily Inbox Presence</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                            Newsletter Sponsorship Formats
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1 leading-relaxed max-w-2xl">
                            How Treasure Coast Realty Group appears across our 20,000+ subscriber morning newsletter. Rendered in TCRG's brand palette (Deep Blue, Brand Gold, and White).
                        </p>
                    </div>

                    <div className="space-y-6 max-w-xl mx-auto font-sans">

                        {/* NEWSLETTER AD FORMAT 1: BIG */}
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">BIG</p>
                            <div className="bg-[#f0f4ff] border border-[#0b2545] rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-[#0b2545] px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-[#cca43b]">
                                    SPONSORED · TREASURE COAST REALTY GROUP · ST. LUCIE COUNTY
                                </div>
                                <img 
                                    src="/Torino-5888-NW-Favian-Avenue-PSL-FL-34983-Drone-web-view.jpg" 
                                    alt="Treasure Coast Property Drone Feature" 
                                    className="w-full h-auto block object-cover max-h-[280px]"
                                />
                                <div className="p-6 bg-white">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#0b2545] mb-1.5">
                                        EXCLUSIVE PROPERTY FEATURE · PORT ST. LUCIE & FORT PIERCE
                                    </p>
                                    <h4 className="text-xl font-black text-[#0b2545] mb-2 leading-snug">
                                        🏡 Buying or Selling on the Treasure Coast? Here's What Luke Lewis Says About the Market.
                                    </h4>
                                    <div className="inline-block bg-[#cca43b] rounded px-3 py-1 mb-3 text-xs font-bold text-[#0b2545]">
                                        LOCAL EXPERTISE · INDEPENDENT BROKERAGE · TRUSTED SERVICE
                                    </div>
                                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                        Whether you're looking for your dream home in Torino or selling property in Fort Pierce, Treasure Coast Realty Group brings real local market insight to every transaction.
                                    </p>
                                    <a href="#" onClick={(e) => e.preventDefault()} className="block bg-[#0b2545] text-[#cca43b] font-bold text-xs uppercase tracking-wider text-center py-3 px-4 rounded-lg shadow-sm hover:bg-[#133c6d]">
                                        VIEW TCRG COVER STORY & CONNECT WITH LUKE LEWIS →
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* NEWSLETTER AD FORMAT 2: MEDIUM */}
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">MEDIUM</p>
                            <div className="bg-[#f0f4ff] border border-[#0b2545] rounded-xl p-5 shadow-sm">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#0b2545] mb-1">
                                    SPONSORED · TREASURE COAST REALTY GROUP
                                </p>
                                <h4 className="text-base font-black text-[#0b2545] mb-2 leading-snug">
                                    🏡 Thinking of Selling Your Home in St. Lucie County?
                                </h4>
                                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                    Get a free, honest local property valuation from Luke Lewis and the team at Treasure Coast Realty Group. Real market data, no pressure.
                                </p>
                                <a href="#" onClick={(e) => e.preventDefault()} className="inline-block bg-[#0b2545] text-[#cca43b] font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-lg">
                                    GET YOUR HOME VALUATION →
                                </a>
                            </div>
                        </div>

                        {/* NEWSLETTER AD FORMAT 3: SMALL */}
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">SMALL</p>
                            <div className="bg-[#0b2545] border border-[#cca43b] rounded-xl p-5 shadow-sm">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#cca43b] mb-1">
                                    SPONSORED · TREASURE COAST REALTY GROUP
                                </p>
                                <h4 className="text-lg font-black text-white mb-1">
                                    Treasure Coast Realty Group
                                </h4>
                                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                    Locally owned. Independent. Dedicated to buyers and sellers across Fort Pierce and Port St. Lucie.
                                </p>
                                <a href="#" onClick={(e) => e.preventDefault()} className="inline-block bg-[#cca43b] text-[#0b2545] font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-lg">
                                    VISIT TCRG COVER STORY →
                                </a>
                            </div>
                        </div>

                    </div>

                    {/* SPONSORED REEL EMBED */}
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="text-[10px] font-bold uppercase bg-blue-900 text-white px-2 py-0.5 rounded mb-2 inline-block">
                            Social Reel Extension: Sponsored Video Reel
                        </span>
                        <p className="text-xs text-slate-600 mb-3">
                            High-performing short-form video reels spotlighting local developments, property roundups, and sponsored features.
                        </p>

                        <div className="flex justify-center bg-white p-3 border border-slate-200 rounded-xl shadow-sm">
                            <iframe
                                src="https://www.instagram.com/p/DZqLKqABFpl/embed"
                                className="w-full max-w-[340px] h-[480px] border-0 rounded-lg"
                                allowTransparency={true}
                                title="Sunland Sponsored Instagram Reel"
                            ></iframe>
                        </div>
                    </div>
                </section>

                {/* 7. STEP 4: TURNING AGENTS INTO LOCAL BRANDS (QUARTERLY CONTENT DAYS) */}
                <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-blue-900 text-white text-xs font-bold rounded-full uppercase tracking-wider">Step 04</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Agent Branding & Quarterly Cadence</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                            Turning Agents Into Local Brands
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1 leading-relaxed max-w-2xl">
                            We don't just shoot once and walk away. Every quarter, we conduct dedicated Content Days to continuously generate fresh video material.
                        </p>
                    </div>

                    {/* QUARTERLY CONTENT DAY HIGHLIGHT BOX */}
                    <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-slate-950 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Quarterly Content Cadence</span>
                            <span className="font-semibold text-xs text-slate-900 uppercase">Ja'Min On-Site With TCRG</span>
                        </div>
                        <p className="text-xs text-slate-800 leading-relaxed">
                            Once every quarter, Ja'Min Brown comes in personally to interview Luke Lewis and top TCRG agents. We ask real, targeted customer questions—like <span className="underline decoration-amber-500 font-semibold">“What are the most frequently asked questions from your buyers and sellers?”</span>—giving us a fresh batch of raw video material every 90 days.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <span className="w-7 h-7 bg-amber-400 text-slate-950 font-bold rounded-full flex items-center justify-center text-xs mb-2">1</span>
                            <h3 className="text-xs font-bold text-slate-900 uppercase mb-1">Quarterly Workshops</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">Teaching TCRG agents how to build video content & local brand authority.</p>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <span className="w-7 h-7 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-xs mb-2">2</span>
                            <h3 className="text-xs font-bold text-slate-900 uppercase mb-1">Quarterly Content Day</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">Filming on-site with Luke Lewis & agents, asking high-value client FAQ questions.</p>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <span className="w-7 h-7 bg-indigo-600 text-white font-bold rounded-full flex items-center justify-center text-xs mb-2">3</span>
                            <h3 className="text-xs font-bold text-slate-900 uppercase mb-1">On-Demand Coaching</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">Recorded Q&A sessions with Ja'Min Brown acting as media liaison & teacher.</p>
                        </div>
                    </div>

                    {/* INSTAGRAM REEL EMBED: COACHING */}
                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div>
                                <span className="bg-blue-900 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                                    Coaching Framework Example
                                </span>
                                <h3 className="text-lg font-bold text-slate-900 uppercase mt-2">
                                    “Brand Shortens the Conversation”
                                </h3>
                                <p className="text-xs font-medium text-slate-800 leading-relaxed mt-2 bg-amber-100/80 p-3 rounded-lg border border-amber-200">
                                    “Brand shortens the conversation you need to have in order to get someone to make a decision.”
                                </p>
                                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                                    This live reel demonstrates the media principles we teach TCRG agents during our quarterly workshops and coaching sessions.
                                </p>
                            </div>

                            <div className="flex justify-center bg-white p-3 border border-slate-200 rounded-xl shadow-sm">
                                <iframe
                                    src="https://www.instagram.com/p/DUjXHAJEkhM/embed"
                                    className="w-full max-w-[300px] h-[440px] border-0 rounded-lg"
                                    allowTransparency={true}
                                    title="Ja'Min Real Estate Brand Coaching Reel"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. STEP 5: LEADS DELIVERED MONTHLY */}
                <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">Step 05</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">The Pipeline Engine</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                            Leads, Delivered Monthly
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1 leading-relaxed max-w-2xl">
                            The cover story doesn't just build the brand. It becomes the firm's VSL landing page and sends Treasure Coast Realty Group qualified buyer and seller leads every month.
                        </p>
                    </div>

                    <div className="p-5 bg-blue-50/60 border border-blue-200 rounded-xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
                            <div className="p-3 bg-white border border-slate-200 rounded-lg font-bold text-slate-900 uppercase shadow-sm">
                                🎙️ Cover Story
                            </div>
                            <div className="p-3 bg-amber-100 border border-amber-300 rounded-lg font-bold text-slate-900 uppercase shadow-sm">
                                🌐 VSL Landing Page
                            </div>
                            <div className="p-3 bg-blue-600 text-white rounded-lg font-bold uppercase shadow-sm">
                                📲 Social Retargeting
                            </div>
                            <div className="p-3 bg-emerald-500 text-white rounded-lg font-bold uppercase shadow-sm">
                                📈 Leads to TCRG
                            </div>
                        </div>
                    </div>
                </section>

                {/* 9. STEP 6: GIVING BACK, TOGETHER */}
                <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-full uppercase tracking-wider">Step 06</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Community Impact</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                            Giving Back, Together
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1 leading-relaxed max-w-2xl">
                            Every time Luke Lewis points us to someone worth telling a story about, that story runs, co-branded, at no additional cost.
                        </p>
                    </div>

                    <div className="p-6 bg-slate-900 text-white rounded-xl space-y-2 border border-slate-800">
                        <span className="inline-block px-2.5 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-bold uppercase rounded">
                            Co-Branded Community Spotlight
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold uppercase text-amber-400 leading-snug">
                            “This story was made possible by Treasure Coast Realty Group.”
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            A dedicated community feature spotlighting local heroes, non-profits, or small businesses Luke Lewis wants to highlight. Generates immense local goodwill that directly reflects on TCRG.
                        </p>
                    </div>
                </section>

                {/* 10. PARTNERSHIP INVESTMENT / PRICING SECTION */}
                <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
                    <div className="text-center space-y-1">
                        <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-full uppercase tracking-wider">
                            Partnership Investment
                        </span>
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tight pt-2">
                            Campaign Pricing Structure
                        </h2>
                        <p className="text-sm font-medium text-slate-600 max-w-xl mx-auto">
                            Transparent, high-value investment structure for Treasure Coast Realty Group.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        
                        {/* UPFRONT SETUP & COVER STORY */}
                        <div className="p-6 bg-slate-900 text-white rounded-xl border border-slate-800 flex flex-col justify-between shadow-md space-y-4">
                            <div>
                                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Initial Launch & Production</span>
                                <h3 className="text-xl font-bold uppercase text-white mt-1">Cover Story Kickoff</h3>
                                <div className="mt-4 mb-4">
                                    <span className="text-4xl font-black text-white">$2,995</span>
                                    <span className="text-xs text-slate-400 uppercase font-semibold block mt-1">One-Time Upfront Investment</span>
                                </div>
                                <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
                                    <li className="flex items-center gap-2">
                                        <span className="text-amber-400 font-bold">✓</span>
                                        <span>Full Sit-Down Cover Feature Interview Production</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-amber-400 font-bold">✓</span>
                                        <span>On-Site Filming & Professional Studio Setup</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-amber-400 font-bold">✓</span>
                                        <span>Dedicated VSL Landing Page Development</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-amber-400 font-bold">✓</span>
                                        <span>Branding Alignment & Initial Campaign Setup</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* MONTHLY PARTNERSHIP & DISTRIBUTION */}
                        <div className="p-6 bg-amber-500/10 border border-amber-300 rounded-xl flex flex-col justify-between shadow-sm space-y-4">
                            <div>
                                <span className="text-amber-700 text-xs font-bold uppercase tracking-wider">Ongoing Visibility & Retargeting</span>
                                <h3 className="text-xl font-bold uppercase text-slate-900 mt-1">Monthly Retainer</h3>
                                <div className="mt-4 mb-4">
                                    <span className="text-4xl font-black text-slate-900">$1,250</span>
                                    <span className="text-xs text-slate-600 uppercase font-semibold block mt-1">Month-Over-Month Partnership</span>
                                </div>
                                <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-amber-200">
                                    <li className="flex items-center gap-2">
                                        <span className="text-amber-600 font-bold">✓</span>
                                        <span>The Kaleidoscope Method Year-Round Distribution</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-amber-600 font-bold">✓</span>
                                        <span>20,000+ Subscriber Newsletter Placement (Big/Med/Small)</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-amber-600 font-bold">✓</span>
                                        <span>Monthly Featured Episode of Sunland Cribs</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-amber-600 font-bold">✓</span>
                                        <span>Quarterly On-Site Content Days with Ja'Min Brown</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="text-amber-600 font-bold">✓</span>
                                        <span>Social Retargeting & Monthly Buyer/Seller Lead Flow</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 11. CLEAN PRESENTATION CLOSING */}
                <footer className="bg-slate-950 text-white border border-slate-800 p-8 rounded-2xl shadow-xl text-center space-y-4">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <img 
                            src="/images/sunlandnews-logo.png" 
                            alt="Sunland News Logo" 
                            className="h-9 w-auto object-contain bg-white px-3 py-1.5 rounded-lg"
                        />
                        <span className="font-bold text-lg text-amber-400">×</span>
                        <img 
                            src="/images/cf0ebcd0fbac-LOGO_Treasure_Coast_Realty_Group.png" 
                            alt="Treasure Coast Realty Group Logo" 
                            className="h-9 w-auto object-contain bg-white px-3 py-1.5 rounded-lg"
                        />
                    </div>

                    <span className="inline-block py-1 px-3 bg-amber-400 text-slate-950 text-xs font-bold tracking-wider uppercase rounded-full">
                        Let's Build This Together
                    </span>

                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                        Treasure Coast Realty Group
                    </h2>
                    <p className="text-sm font-medium text-slate-400 max-w-lg mx-auto">
                        A Year of Unmatched Visibility, Authority, and Pipeline Growth across St. Lucie County.
                    </p>

                    <div className="pt-4 border-t border-slate-800 text-xs font-medium text-slate-500">
                        <p className="text-sm font-bold text-white uppercase">Ja'Min Brown</p>
                        <p>Founder, Sunland News</p>
                        <p className="text-amber-400 font-bold mt-1">JaMin@SunlandNews.com</p>
                    </div>
                </footer>

            </div>
        </div>
    );
}
