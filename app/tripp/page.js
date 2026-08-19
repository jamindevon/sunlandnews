'use client';

import { useState, useEffect } from 'react';

export default function TrippPitchPage() {
    // 1. Cover Story View Tab State: 'newsletter' vs 'vsl'
    const [coverStoryTab, setCoverStoryTab] = useState('newsletter');

    // 2. DM Automation Animated Looping Simulator State
    const [simStep, setSimStep] = useState(0);
    const [typedComment, setTypedComment] = useState('');

    useEffect(() => {
        let timer;
        const targetText = 'LOVE';

        if (simStep === 0) {
            let charIndex = 0;
            setTypedComment('');
            const interval = setInterval(() => {
                charIndex++;
                if (charIndex <= targetText.length) {
                    setTypedComment(targetText.slice(0, charIndex));
                } else {
                    clearInterval(interval);
                    timer = setTimeout(() => {
                        setSimStep(1);
                    }, 600);
                }
            }, 300);

            return () => {
                clearInterval(interval);
                if (timer) clearTimeout(timer);
            };
        } else if (simStep === 1) {
            timer = setTimeout(() => {
                setSimStep(2);
            }, 900);
        } else if (simStep === 2) {
            timer = setTimeout(() => {
                setSimStep(3);
            }, 1200);
        } else if (simStep === 3) {
            timer = setTimeout(() => {
                setTypedComment('');
                setSimStep(0);
            }, 5500);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [simStep]);

    const handleReplaySim = () => {
        setTypedComment('');
        setSimStep(0);
    };

    // 3. Interactive Poll Voting State
    const [pollVotedOption, setPollVotedOption] = useState(null);
    const [pollVotes, setPollVotes] = useState({
        trafficStress: 64,
        dateNight: 32,
        workLife: 18,
        parenting: 12
    });

    const handlePollVote = (key) => {
        if (pollVotedOption) return;
        setPollVotedOption(key);
        setPollVotes(prev => ({
            ...prev,
            [key]: prev[key] + 1
        }));
    };

    const totalPollVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

    // SMOOTH SCROLL TO VSL COVER STORY HANDLER
    const scrollToVSL = (e) => {
        if (e) e.preventDefault();
        setCoverStoryTab('vsl');
        const elem = document.getElementById('cover-story-vsl');
        if (elem) {
            elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#8ec346] selection:text-[#2e401b] pb-24">
            
            {/* TOP PRESENTATION BANNER */}
            <div className="bg-[#2e401b] text-[#8ec346] font-bold text-xs py-2.5 px-4 text-center uppercase tracking-widest flex items-center justify-center gap-2 border-b border-[#3b5223]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#8ec346] animate-pulse"></span>
                <span>CONFIDENTIAL PROPOSAL • FOR DR. TRIPP & ASSOCIATES</span>
            </div>

            <div className="max-w-4xl mx-auto px-4 pt-8 space-y-12">

                {/* 1. HERO HEADER */}
                <header className="bg-gradient-to-b from-[#2e401b] via-[#243515] to-[#1a280f] text-white p-8 md:p-12 rounded-3xl shadow-xl text-center relative overflow-hidden border border-[#3b5223]">
                    <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
                        <div className="bg-white px-4 py-2.5 rounded-xl shadow-md flex items-center justify-center">
                            <img src="/images/sunlandnews-logo.png" alt="Sunland News Logo" className="h-9 md:h-11 w-auto object-contain" />
                        </div>
                        <span className="font-bold text-xl text-[#8ec346]">×</span>
                        <div className="bg-white px-4 py-2.5 rounded-xl shadow-md flex items-center justify-center">
                            <img src="/images/tripp-image.png" alt="Dr. Tripp & Associates Logo" className="h-9 md:h-11 w-auto object-contain" />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black mb-3 uppercase tracking-tight leading-tight text-white">
                        A Year-Long Partnership<br />
                        <span className="text-[#8ec346] font-extrabold text-2xl md:text-3xl block mt-1">
                            Building Presence & Trust Across the Treasure Coast
                        </span>
                    </h1>

                    <p className="text-sm md:text-base font-medium text-slate-200 max-w-xl mx-auto leading-relaxed mt-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                        Connecting <span className="text-[#8ec346] font-bold underline decoration-[#8ec346] decoration-2">Dr. Tripp & Associates</span> with couples, families, and individuals across St. Lucie and Martin County through high-impact media.
                    </p>
                    
                    <div className="mt-5 text-xs font-semibold uppercase tracking-widest text-[#8ec346]">
                        Prepared by Ja'Min Brown • Founder, Sunland News
                    </div>
                </header>

                {/* 2. PROVEN REACH NUMBERS */}
                <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl shadow-sm">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4 bg-[#faf9f5] border border-slate-200 rounded-2xl">
                            <span className="block text-2xl md:text-4xl font-black text-[#2e401b]">20,000</span>
                            <span className="text-xs font-semibold uppercase text-slate-600">Newsletter Inboxes</span>
                        </div>
                        <div className="p-4 bg-[#faf9f5] border border-slate-200 rounded-2xl">
                            <span className="block text-2xl md:text-4xl font-black text-[#2e401b]">55%</span>
                            <span className="text-xs font-semibold uppercase text-slate-600">Avg Open Rate</span>
                        </div>
                        <div className="p-4 bg-[#faf9f5] border border-slate-200 rounded-2xl">
                            <span className="block text-2xl md:text-4xl font-black text-[#2e401b]">7.5%</span>
                            <span className="text-xs font-semibold uppercase text-slate-600">Avg Click-Through</span>
                        </div>
                        <div className="p-4 bg-[#faf9f5] border border-slate-200 rounded-2xl">
                            <span className="block text-2xl md:text-4xl font-black text-[#2e401b]">40,000</span>
                            <span className="text-xs font-semibold uppercase text-slate-600">Social Followers</span>
                        </div>
                    </div>
                </section>

                {/* 3. STEP 1: THE SIT-DOWN COVER FEATURE */}
                <section className="bg-white border border-slate-200 p-6 md:p-10 rounded-3xl shadow-sm space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-[#2e401b] text-white text-xs font-bold rounded-full uppercase tracking-wider">Step 01</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">The Foundation</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-[#2e401b] uppercase tracking-tight">
                            The Sit-Down Master Interview
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1 leading-relaxed max-w-2xl">
                            A relaxed sit-down story format (*“I sat down with Dr. Tripp & Associates in Port St. Lucie...”*). This single afternoon recording is the master asset that fuels your entire year of content.
                        </p>
                    </div>

                    <div className="p-5 bg-[#2e401b] text-white rounded-2xl shadow-md space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="bg-[#8ec346] text-[#2e401b] text-xs font-bold px-2.5 py-0.5 rounded uppercase">
                                Master Interview Production
                            </span>
                            <span className="text-xs text-slate-300">Sunrise Theatre Executive Director Example</span>
                        </div>

                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-700">
                            <iframe
                                src="https://www.youtube.com/embed/CAtpBlCEBPA"
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Master Sit-Down Interview"
                            ></iframe>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-slate-200">
                            <div className="p-3 bg-[#3b5223]/70 rounded-xl border border-white/10">
                                <span className="font-bold text-[#8ec346] block mb-0.5">🎙️ Human Storytelling</span>
                                <span>Warm editorial journalism introducing Dr. Tripp's philosophy.</span>
                            </div>
                            <div className="p-3 bg-[#3b5223]/70 rounded-lg border border-white/10">
                                <span className="font-bold text-[#8ec346] block mb-0.5">💡 Clinical Authority</span>
                                <span>Establishes Dr. Tripp as the premier relationship experts.</span>
                            </div>
                            <div className="p-3 bg-[#3b5223]/70 rounded-lg border border-white/10">
                                <span className="font-bold text-[#8ec346] block mb-0.5">⚙️ Master Asset</span>
                                <span>Chopped into all newsletter features, reels, & retargeting ads.</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. DEDICATED COVER STORY SECTION WITH TABS (NEWSLETTER FIRST, WEBSITE VSL SECOND) */}
                <section id="cover-story-vsl" className="bg-white border-2 border-[#2e401b] p-6 md:p-10 rounded-3xl shadow-lg space-y-6 scroll-mt-6">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4 flex-wrap gap-3">
                        <div>
                            <span className="px-3 py-1 bg-[#8ec346] text-[#2e401b] text-xs font-black rounded-full uppercase tracking-wider">
                                Core Destination Asset
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black text-[#2e401b] uppercase tracking-tight mt-1">
                                Cover Story Feature
                            </h2>
                        </div>

                        <div className="flex items-center gap-1.5 bg-[#faf9f5] p-1.5 rounded-xl border border-slate-300 text-xs">
                            <button
                                onClick={() => setCoverStoryTab('newsletter')}
                                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                                    coverStoryTab === 'newsletter'
                                        ? 'bg-[#2e401b] text-[#8ec346] shadow-sm'
                                        : 'text-slate-600 hover:text-[#2e401b]'
                                }`}
                            >
                                📧 Newsletter Version
                            </button>
                            <button
                                onClick={() => setCoverStoryTab('vsl')}
                                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                                    coverStoryTab === 'vsl'
                                        ? 'bg-[#2e401b] text-[#8ec346] shadow-sm'
                                        : 'text-slate-600 hover:text-[#2e401b]'
                                }`}
                            >
                                🌐 Website VSL Version
                            </button>
                        </div>
                    </div>

                    {/* TAB CONTENT 1: NEWSLETTER COVER STORY VERSION */}
                    {coverStoryTab === 'newsletter' && (
                        <div className="space-y-4 animate-fadeIn">
                            <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                How the Cover Story is introduced to 20,000+ local inboxes inside our morning email newsletter:
                            </p>

                            <div className="max-w-xl mx-auto bg-[#faf9f5] border-2 border-[#2e401b] rounded-2xl overflow-hidden shadow-xl">
                                <div className="bg-[#2e401b] text-[#8ec346] px-5 py-3 flex items-center justify-between text-xs font-bold border-b border-[#3b5223]">
                                    <div className="flex items-center gap-2">
                                        <img src="/images/sunlandnews-logo.png" alt="Sunland" className="h-5 w-auto bg-white px-1.5 py-0.5 rounded" />
                                        <span>SUNLAND NEWS MORNING EDITION</span>
                                    </div>
                                    <span className="bg-[#8ec346] text-[#2e401b] px-2 py-0.5 rounded text-[10px] uppercase font-black">
                                        NEWSLETTER COVER FEATURE
                                    </span>
                                </div>

                                <div className="p-6 bg-white space-y-4 font-sans">
                                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2e401b] bg-[#8ec346]/20 px-2.5 py-1 rounded">
                                        EXCLUSIVE SIT-DOWN STORY
                                    </span>
                                    
                                    <h3 className="text-xl md:text-2xl font-black text-[#2e401b] leading-snug font-serif">
                                        🌿 “I Sat Down With Dr. Tripp & Associates in Port St. Lucie to Talk Relationship Health & Connection”
                                    </h3>

                                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-200 shadow-sm">
                                        <iframe
                                            src="https://www.youtube.com/embed/CAtpBlCEBPA"
                                            className="w-full h-full border-0"
                                            title="Newsletter Cover Video"
                                        ></iframe>
                                    </div>

                                    <p className="text-xs text-slate-600 leading-relaxed font-serif">
                                        In this week's Sunland News feature story, founder Ja'Min Brown sits down with Dr. Tripp & Associates to discuss practical relationship tools, managing stress, and building trust across St. Lucie and Martin County.
                                    </p>

                                    <button 
                                        onClick={scrollToVSL}
                                        className="w-full bg-[#2e401b] text-white font-extrabold text-xs uppercase tracking-wider text-center py-3 px-4 rounded-xl shadow-md hover:bg-[#243515] transition-all"
                                    >
                                        READ FULL COVER STORY & WATCH VIDEO →
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB CONTENT 2: WEBSITE VSL VERSION */}
                    {coverStoryTab === 'vsl' && (
                        <div className="space-y-4 animate-fadeIn">
                            <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                The full website cover story landing page where social traffic, DMs, and retargeting ads send viewers back to. Includes editorial Q&A story, photos, video interview, and confidential lead form at the bottom:
                            </p>

                            <div className="border-2 border-[#2e401b] rounded-2xl overflow-hidden shadow-xl bg-white">
                                <div className="bg-[#2e401b] text-white px-4 py-3 flex items-center justify-between text-xs border-b border-[#3b5223]">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block"></span>
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block"></span>
                                        </div>
                                        <span className="font-mono text-slate-300 ml-2 text-[11px]">https://sunlandnews.com/stories/dr-tripp-associates</span>
                                    </div>
                                    <span className="bg-[#8ec346] text-[#2e401b] font-black px-2.5 py-0.5 rounded text-[10px] uppercase">
                                        WEBSITE VSL VERSION
                                    </span>
                                </div>

                                <div className="p-6 md:p-8 space-y-6 bg-slate-50">
                                    <div className="space-y-3 border-b border-slate-200 pb-5">
                                        <span className="text-xs font-bold text-[#8ec346] uppercase bg-[#2e401b] px-3 py-1 rounded">
                                            Sunland News Exclusive Feature
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-black text-[#2e401b] leading-tight font-serif">
                                            “I Sat Down With Dr. Tripp & Associates in Port St. Lucie to Talk Relationship Health & Connection”
                                        </h3>
                                        <p className="text-xs text-slate-500 font-medium">
                                            By Ja'Min Brown • Published in Sunland News • St. Lucie County Feature
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-xs font-bold text-[#2e401b] uppercase">Watch The Sit-Down Interview (VSL):</span>
                                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-md border border-slate-300">
                                            <iframe
                                                src="https://www.youtube.com/embed/CAtpBlCEBPA"
                                                className="w-full h-full border-0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title="Cover Story VSL"
                                            ></iframe>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-white rounded-xl border border-slate-200 space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed font-serif">
                                        <p className="italic font-sans text-slate-500 text-xs border-l-2 border-[#8ec346] pl-3 py-0.5">
                                            “When I sat down with the team at Dr. Tripp & Associates, one thing became clear immediately: relationship health isn't about waiting for a crisis—it's about building proactive communication tools into everyday life on the Treasure Coast.”
                                        </p>
                                        <p>
                                            In this exclusive Q&A, Dr. Tripp & Associates share how couples across Port St. Lucie and Fort Pierce are restoring trust, navigating stress, and prioritizing family wellness.
                                        </p>
                                    </div>

                                    <div className="p-6 bg-[#2e401b] text-white rounded-2xl shadow-md space-y-4 border border-[#3b5223]">
                                        <div>
                                            <span className="text-[10px] font-bold text-[#8ec346] uppercase bg-[#3b5223] px-2.5 py-0.5 rounded">
                                                CONFIDENTIAL CONSULTATION FORM
                                            </span>
                                            <h4 className="text-xl font-bold font-serif text-white mt-1">
                                                Schedule a Confidential Consultation with Dr. Tripp & Associates
                                            </h4>
                                            <p className="text-xs text-slate-300">
                                                Serving couples, families, and individuals across St. Lucie and Martin County.
                                            </p>
                                        </div>

                                        <form onSubmit={(e) => e.preventDefault()} className="space-y-3 text-xs">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block text-[11px] font-bold text-slate-200 mb-1">Full Name</label>
                                                    <input type="text" placeholder="Jane Doe" className="w-full p-2.5 bg-[#1e2c12] border border-[#3b5223] rounded-lg text-white placeholder-slate-400" disabled readOnly />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-bold text-slate-200 mb-1">Phone Number</label>
                                                    <input type="tel" placeholder="(772) 555-0199" className="w-full p-2.5 bg-[#1e2c12] border border-[#3b5223] rounded-lg text-white placeholder-slate-400" disabled readOnly />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-200 mb-1">Email Address</label>
                                                <input type="email" placeholder="jane@example.com" className="w-full p-2.5 bg-[#1e2c12] border border-[#3b5223] rounded-lg text-white placeholder-slate-400" disabled readOnly />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-200 mb-1">Service Interested In</label>
                                                <select className="w-full p-2.5 bg-[#1e2c12] border border-[#3b5223] rounded-lg text-white" disabled>
                                                    <option>Couples & Marriage Therapy</option>
                                                    <option>Individual Counseling</option>
                                                    <option>Deeper Couples Retreat</option>
                                                </select>
                                            </div>
                                            <button className="w-full py-3 bg-[#8ec346] text-[#2e401b] font-black uppercase text-xs rounded-xl shadow-md tracking-wider">
                                                Submit Confidential Consultation Request →
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* 5. STEP 2: REPURPOSED INTO CORE CONTENT & REAL EMBEDDED CLIPS */}
                <section className="bg-white border border-slate-200 p-6 md:p-10 rounded-3xl shadow-sm space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-[#2e401b] text-white text-xs font-bold rounded-full uppercase tracking-wider">Step 02</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Content Multiplication</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-[#2e401b] uppercase tracking-tight">
                            One Interview. A Year of Content.
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1 leading-relaxed max-w-2xl">
                            We slice the sit-down interview into newsletter stories, website articles, and short-form video reels:
                        </p>
                    </div>

                    {/* SECTION A: CLIPS SUNLAND POSTS */}
                    <div className="p-5 bg-[#faf9f5] border border-slate-200 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase bg-[#2e401b] text-white px-3 py-1 rounded">
                                Clips Sunland Posts to Instagram, Facebook & TikTok
                            </span>
                            <span className="text-xs font-bold text-[#2e401b]">3 Real Video Previews</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-3 bg-[#2e401b] text-white rounded-xl space-y-2">
                                <span className="text-[10px] font-bold text-[#8ec346] uppercase block">Sunland Reel #1</span>
                                <div className="relative aspect-[9/16] w-full h-[380px] rounded-lg overflow-hidden bg-black shadow-md flex items-center justify-center">
                                    <iframe 
                                        src="https://drive.google.com/file/d/1f_44wVREcmjTeaD9ks6wT4QiVEd_l3an/preview" 
                                        className="w-full h-full border-0 scale-[1.03] origin-center"
                                        allow="autoplay"
                                    ></iframe>
                                </div>
                            </div>

                            <div className="p-3 bg-[#2e401b] text-white rounded-xl space-y-2">
                                <span className="text-[10px] font-bold text-[#8ec346] uppercase block">Sunland Reel #2</span>
                                <div className="relative aspect-[9/16] w-full h-[380px] rounded-lg overflow-hidden bg-black shadow-md flex items-center justify-center">
                                    <iframe 
                                        src="https://drive.google.com/file/d/129zceRJ7yFl269uophiFVcr4FJZNTHg8/preview" 
                                        className="w-full h-full border-0 scale-[1.03] origin-center"
                                        allow="autoplay"
                                    ></iframe>
                                </div>
                            </div>

                            <div className="p-3 bg-[#2e401b] text-white rounded-xl space-y-2">
                                <span className="text-[10px] font-bold text-[#8ec346] uppercase block">Sunland Reel #3</span>
                                <div className="relative aspect-[9/16] w-full h-[380px] rounded-lg overflow-hidden bg-black shadow-md flex items-center justify-center">
                                    <iframe 
                                        src="https://drive.google.com/file/d/1mclbHGWFUKNfRNTE0NEbNvl-CXQaGVwb/preview" 
                                        className="w-full h-full border-0 scale-[1.03] origin-center"
                                        allow="autoplay"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION B: BRANDED CLIPS DR. TRIPP POSTS */}
                    <div className="p-5 bg-white border border-[#2e401b] rounded-2xl space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase bg-[#8ec346] text-[#2e401b] px-3 py-1 rounded">
                                Branded Clips You Get to Post to Your Own Channels
                            </span>
                            <span className="text-xs font-bold text-[#2e401b]">Co-Branded Client Assets</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-3 bg-[#faf9f5] border border-slate-200 rounded-xl space-y-2">
                                <span className="text-[10px] font-bold text-[#2e401b] uppercase block">Dr. Tripp Clip #1</span>
                                <div className="relative aspect-[9/16] w-full h-[380px] rounded-lg overflow-hidden bg-black shadow-md flex items-center justify-center">
                                    <iframe 
                                        src="https://drive.google.com/file/d/1knPn6WCz9JsAFnRzlLU7QCzcm3EkioF9/preview" 
                                        className="w-full h-full border-0 scale-[1.03] origin-center"
                                        allow="autoplay"
                                    ></iframe>
                                </div>
                            </div>

                            <div className="p-3 bg-[#faf9f5] border border-slate-200 rounded-xl space-y-2">
                                <span className="text-[10px] font-bold text-[#2e401b] uppercase block">Dr. Tripp Clip #2</span>
                                <div className="relative aspect-[9/16] w-full h-[380px] rounded-lg overflow-hidden bg-black shadow-md flex items-center justify-center">
                                    <iframe 
                                        src="https://drive.google.com/file/d/1hn4poeHmyEdyHpc6dFEqfM3jH-qbyxgR/preview" 
                                        className="w-full h-full border-0 scale-[1.03] origin-center"
                                        allow="autoplay"
                                    ></iframe>
                                </div>
                            </div>

                            <div className="p-3 bg-[#faf9f5] border border-slate-200 rounded-xl space-y-2">
                                <span className="text-[10px] font-bold text-[#2e401b] uppercase block">Dr. Tripp Clip #3</span>
                                <div className="relative aspect-[9/16] w-full h-[380px] rounded-lg overflow-hidden bg-black shadow-md flex items-center justify-center">
                                    <iframe 
                                        src="https://drive.google.com/file/d/1-TE8s9zFE3eOi6xf65ouvI0ifAELgUSO/preview" 
                                        className="w-full h-full border-0 scale-[1.03] origin-center"
                                        allow="autoplay"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. STEP 3: AUTOMATED SOCIAL DMS */}
                <section className="bg-white border border-slate-200 p-6 md:p-10 rounded-3xl shadow-sm space-y-6">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-[#2e401b] text-white text-xs font-bold rounded-full uppercase tracking-wider">Step 03</span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#8ec346] bg-[#2e401b] px-2 py-0.5 rounded animate-pulse">
                                    🔴 Live Animated Simulator
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black text-[#2e401b] uppercase tracking-tight">
                                Automated Social DM Engine
                            </h2>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleReplaySim}
                                className="px-3 py-1.5 bg-[#2e401b] text-[#8ec346] hover:bg-[#243515] font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                            >
                                🔄 Replay Demo
                            </button>
                            <div className="flex items-center gap-2.5 bg-white border border-slate-300 px-3.5 py-1.5 rounded-xl shadow-sm">
                                <img src="/images/manychat-logo.png" alt="ManyChat Logo" className="h-5 w-auto object-contain" />
                                <span className="text-xs font-black text-slate-800 tracking-tight">ManyChat Automation</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-2xl">
                        Watch how a viewer watching a social reel triggers an instant automated DM with Dr. Tripp's sponsor mention powered by <span className="font-bold text-slate-900">ManyChat</span>:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                        <div className="bg-[#2e401b] text-white p-5 rounded-2xl border border-[#3b5223] shadow-xl flex flex-col justify-between space-y-3">
                            <div>
                                <div className="flex items-center justify-between border-b border-[#3b5223] pb-2 text-xs mb-3">
                                    <span className="text-[#8ec346] font-bold uppercase">1. Sunland Instagram Reel</span>
                                    <span className="text-[10px] bg-[#3b5223] px-2 py-0.5 rounded text-slate-300 font-mono">Live Reel Trigger</span>
                                </div>

                                <div className="relative aspect-[9/16] w-full h-[380px] rounded-xl overflow-hidden bg-black shadow-md mx-auto flex items-center justify-center">
                                    <iframe 
                                        src="https://drive.google.com/file/d/1f_44wVREcmjTeaD9ks6wT4QiVEd_l3an/preview" 
                                        className="w-full h-full border-0 scale-[1.03] origin-center"
                                        title="Instagram Reel Trigger"
                                    ></iframe>
                                </div>
                            </div>

                            <div className="p-3 bg-[#1e2c12] rounded-xl border border-white/10 text-xs space-y-1 text-slate-200 mt-3">
                                <span className="font-bold text-[#8ec346] block">💬 Reel Caption Trigger:</span>
                                <span className="text-slate-300">“Comment <strong className="text-[#8ec346] font-mono font-bold bg-[#3b5223] px-1.5 py-0.5 rounded">LOVE</strong> below to get our full story & Dr. Tripp consultation info!”</span>
                            </div>
                        </div>

                        <div className="bg-[#2e401b] text-white p-5 md:p-6 rounded-2xl border border-[#3b5223] shadow-xl flex flex-col justify-between space-y-4 relative">
                            <div>
                                <div className="flex items-center justify-between border-b border-[#3b5223] pb-3 mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-white px-2 py-1 rounded flex items-center justify-center">
                                            <img src="/images/manychat-logo.png" alt="ManyChat" className="h-4 w-auto object-contain" />
                                        </div>
                                        <span className="text-xs font-bold text-[#8ec346] uppercase">ManyChat DM Bot</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-[10px] font-mono">
                                        {simStep === 0 && <span className="text-amber-300 animate-pulse">⌨️ Typing comment...</span>}
                                        {simStep === 1 && <span className="text-yellow-400 font-bold">⚡ Trigger Fired!</span>}
                                        {simStep === 2 && <span className="text-[#8ec346] animate-pulse">💬 Bot Typing...</span>}
                                        {simStep === 3 && <span className="text-[#8ec346] font-bold">✅ DM Sent!</span>}
                                    </div>
                                </div>

                                <div className="bg-[#1e2c12] p-3 rounded-xl border border-white/10 text-xs space-y-2 mb-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">2. Viewer Comments On Reel:</span>
                                        {simStep >= 1 && <span className="text-[10px] bg-[#8ec346] text-[#2e401b] font-black px-1.5 py-0.5 rounded uppercase">Posted ✓</span>}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-white text-slate-900 font-bold px-2 py-0.5 rounded text-[11px]">User @treasurecoast_local</span>
                                        <span className="text-[#8ec346] font-mono font-bold text-sm">
                                            "{typedComment}"
                                            {simStep === 0 && <span className="animate-ping inline-block font-normal text-white">|</span>}
                                        </span>
                                    </div>
                                </div>

                                <div className="min-h-[220px] flex flex-col justify-center">
                                    {simStep <= 1 && (
                                        <div className="p-6 bg-[#1e2c12]/60 rounded-xl border border-dashed border-white/10 text-center text-xs space-y-2 text-slate-400">
                                            <div className="text-xl">📩</div>
                                            <p className="font-medium text-slate-300">
                                                {simStep === 0 ? 'Viewer is typing "LOVE" on the reel...' : '⚡ Keyword detected! ManyChat DM triggering...'}
                                            </p>
                                        </div>
                                    )}

                                    {simStep === 2 && (
                                        <div className="bg-[#3b5223] p-4 rounded-xl text-xs space-y-2 border border-[#8ec346]/40 shadow-md animate-fadeIn">
                                            <div className="flex items-center gap-2">
                                                <img src="/images/sunlandnews-logo.png" alt="Sunland" className="h-4 w-auto bg-white px-1 py-0.5 rounded" />
                                                <span className="font-bold text-[#8ec346]">Sunland News</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 py-2 text-slate-200">
                                                <span className="text-xs">ManyChat bot is typing message</span>
                                                <span className="animate-bounce inline-block">.</span>
                                                <span className="animate-bounce inline-block delay-100">.</span>
                                                <span className="animate-bounce inline-block delay-200">.</span>
                                            </div>
                                        </div>
                                    )}

                                    {simStep === 3 && (
                                        <div className="bg-[#3b5223] p-4 rounded-xl text-xs space-y-3 border border-[#8ec346]/40 shadow-md animate-fadeIn">
                                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                                <div className="flex items-center gap-2">
                                                    <img src="/images/sunlandnews-logo.png" alt="Sunland" className="h-4 w-auto bg-white px-1 py-0.5 rounded" />
                                                    <span className="font-bold text-[#8ec346]">Sunland News (Automated DM)</span>
                                                </div>
                                                <span className="text-[9px] bg-[#8ec346] text-[#2e401b] font-black px-1.5 py-0.5 rounded uppercase">JUST NOW</span>
                                            </div>

                                            <p className="text-slate-100 leading-relaxed font-medium">
                                                Hey! Thanks for engaging with <span className="text-[#8ec346] font-bold">Sunland News</span>! 🌿
                                            </p>
                                            
                                            <p className="text-xs text-white font-bold bg-[#1e2c12] p-3 rounded-lg border border-white/10">
                                                This feature was made possible by <span className="text-[#8ec346]">Dr. Tripp & Associates</span>—providing expert couples & family counseling across Port St. Lucie & Fort Pierce.
                                            </p>

                                            <div className="space-y-2 pt-1">
                                                <button 
                                                    onClick={scrollToVSL}
                                                    className="w-full bg-[#8ec346] text-[#2e401b] font-extrabold text-center py-2.5 px-3 rounded-lg uppercase tracking-wider text-[11px] shadow-sm hover:bg-[#7eb23d] transition-all"
                                                >
                                                    📖 Read Dr. Tripp Cover Story & Book Consultation →
                                                </button>
                                                <a 
                                                    href="https://www.drtrippandassociates.com/get-matched" 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="block bg-[#1e2c12] text-white font-bold text-center py-2 px-3 rounded-lg text-[11px] border border-white/10 hover:bg-[#3b5223] transition-all"
                                                >
                                                    🏖️ Learn About Deeper Couples Retreat →
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>

                            <div className="text-center pt-2 flex items-center justify-between text-[10px] text-slate-300 border-t border-[#3b5223]">
                                <span>✅ ManyChat DM sent instantly</span>
                                <button onClick={handleReplaySim} className="text-[#8ec346] underline font-bold">
                                    ↺ Replay Demo
                                </button>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 7. STEP 4: DAILY NEWSLETTER PRESENCE & SPONSORED GUIDES */}
                <section className="bg-white border border-slate-200 p-6 md:p-10 rounded-3xl shadow-sm space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-[#2e401b] text-white text-xs font-bold rounded-full uppercase tracking-wider">Step 04</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">8–12 Times / Month</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-[#2e401b] uppercase tracking-tight">
                            Newsletter Sponsorships & Sponsored Guides
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1 leading-relaxed max-w-2xl">
                            While the Cover Story is a warm editorial feature (*“I sat down with Dr. Tripp...”*), your newsletter placements deliver both **direct promotional offers** and **native sponsored content features**:
                        </p>
                    </div>

                    <div className="space-y-6 max-w-xl mx-auto font-sans">
                        
                        {/* FORMAT 1: LARGE PROMOTIONAL COLLAB */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">FORMAT 1: LARGE COLLAB (DIRECT ANNOUNCEMENT / OFFER)</p>
                                <span className="text-[10px] bg-[#8ec346] text-[#2e401b] font-bold px-2 py-0.5 rounded uppercase">Example: Retreat Offer</span>
                            </div>
                            <div className="bg-[#faf9f5] border border-[#2e401b] rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-[#2e401b] px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-[#8ec346]">
                                    SUNLAND NEWS × DR. TRIPP & ASSOCIATES
                                </div>
                                <div className="p-6 bg-white space-y-3">
                                    <h4 className="text-lg font-black text-[#2e401b] leading-snug">
                                        🏖️ Announcing the 2026 Treasure Coast Deeper Couples Retreat with Dr. Tripp & Associates
                                    </h4>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Reconnect in paradise. Join Dr. Tripp & Associates for an exclusive weekend retreat designed to restore communication, trust, and intimacy. Limited spots available for Treasure Coast couples.
                                    </p>
                                    <a 
                                        href="https://www.drtrippandassociates.com/get-matched" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="block bg-[#2e401b] text-white font-bold text-xs uppercase tracking-wider text-center py-2.5 px-4 rounded-lg hover:bg-[#243515] transition-all"
                                    >
                                        VISIT DRTRIPPANDASSOCIATES.COM/GET-MATCHED →
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* FORMAT 2: MEDIUM PROMOTIONAL ANNOUNCEMENT */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">FORMAT 2: MEDIUM (PATIENT AVAILABILITY)</p>
                                <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded uppercase">Example: Accepting Patients</span>
                            </div>
                            <div className="bg-[#faf9f5] border border-slate-200 rounded-xl p-5 shadow-sm space-y-2">
                                <span className="text-[10px] font-bold uppercase text-[#2e401b]">SPONSORED WELLNESS · DR. TRIPP & ASSOCIATES</span>
                                <h4 className="text-base font-black text-[#2e401b]">💬 Now Accepting New Couples & Family Therapy Patients</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Dr. Tripp & Associates has opened new appointment slots in Port St. Lucie & Fort Pierce for individuals and couples seeking relationship support.
                                </p>
                                <a 
                                    href="https://www.drtrippandassociates.com/get-matched" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-block text-[#2e401b] font-bold text-xs underline pt-1 hover:text-[#8ec346] transition-all"
                                >
                                    Schedule a Confidential Consultation at DrTrippAndAssociates.com/get-matched →
                                </a>
                            </div>
                        </div>

                        {/* FORMAT 3: SMALL HIRING / QUICK OFFER */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">FORMAT 3: SMALL (RECRUITMENT / HIRING)</p>
                                <span className="text-[10px] bg-[#2e401b] text-[#8ec346] font-bold px-2 py-0.5 rounded uppercase">Example: Hiring Announcement</span>
                            </div>
                            <div className="bg-[#2e401b] text-white border border-[#8ec346] rounded-xl p-4 shadow-sm space-y-1">
                                <span className="text-[10px] font-bold uppercase text-[#8ec346]">WE'RE HIRING · DR. TRIPP & ASSOCIATES</span>
                                <h4 className="text-sm font-bold text-white">Seeking Licensed Marriage & Family Therapists (LMFT)</h4>
                                <p className="text-xs text-slate-300">Join our growing practice in St. Lucie County.</p>
                                <a 
                                    href="https://www.drtrippandassociates.com/get-matched" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-block text-[#8ec346] font-bold text-xs underline pt-1 hover:text-white transition-all"
                                >
                                    Apply at DrTrippAndAssociates.com/get-matched →
                                </a>
                            </div>
                        </div>

                        {/* FORMAT 4: SPONSORED EDITORIAL CONTENT FEATURE */}
                        <div className="pt-2">
                            <div className="flex items-center justify-between mb-1.5">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">FORMAT 4: SPONSORED EDITORIAL CONTENT FEATURE</p>
                                <span className="text-[10px] bg-[#2e401b] text-[#8ec346] font-bold px-2 py-0.5 rounded uppercase">Native Community Guide</span>
                            </div>
                            <div className="bg-[#faf9f5] border-2 border-[#2e401b] rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-[#2e401b] px-4 py-2 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-[#8ec346]">
                                    <span>SPONSORED COMMUNITY GUIDE · DR. TRIPP & ASSOCIATES</span>
                                    <span className="bg-[#8ec346] text-[#2e401b] px-1.5 py-0.5 rounded font-black">SUNLAND EXCLUSIVE</span>
                                </div>
                                <div className="p-6 bg-white space-y-4 font-sans">
                                    <h4 className="text-lg font-black text-[#2e401b] leading-snug">
                                        🚗 5 Secret Alternate Routes to Avoid Traffic Stress in St. Lucie County
                                    </h4>

                                    <p className="text-xs text-slate-700 leading-relaxed font-serif italic border-l-2 border-[#8ec346] pl-3 py-1">
                                        “I know traffic is a huge stress across Port St. Lucie, and so does the team at Dr. Tripp & Associates. They put me on a mission to find alternate routes around our busiest corridors—because according to their clinical team, stepping back and setting boundaries early avoids a lot of pain and stress in the long run.”
                                    </p>

                                    <div className="bg-[#faf9f5] p-4 rounded-lg border border-slate-200 text-xs space-y-2">
                                        <span className="font-bold text-[#2e401b] block uppercase">St. Lucie County Stress-Free Detour Guide:</span>
                                        <ul className="space-y-1.5 text-slate-700">
                                            <li className="flex items-start gap-1.5">
                                                <span className="text-[#8ec346] font-bold">🛣️</span>
                                                <span><strong>US 1 Bypass</strong>: Take Lennard Rd to Walton Rd to bypass Port St. Lucie Blvd gridlock.</span>
                                            </li>
                                            <li className="flex items-start gap-1.5">
                                                <span className="text-[#8ec346] font-bold">🚦</span>
                                                <span><strong>St. Lucie West Blvd Detour</strong>: Cut down California Blvd to Peacock Blvd or Country Club.</span>
                                            </li>
                                            <li className="flex items-start gap-1.5">
                                                <span className="text-[#8ec346] font-bold">🚘</span>
                                                <span><strong>Port St. Lucie Blvd Relief</strong>: Use Darwin Blvd to Rosser Blvd to avoid I-95 backup.</span>
                                            </li>
                                            <li className="flex items-start gap-1.5">
                                                <span className="text-[#8ec346] font-bold">🛣️</span>
                                                <span><strong>Gatlin Blvd Corridor</strong>: Take Savona Blvd down to Becker Rd for smooth east/west travel.</span>
                                            </li>
                                            <li className="flex items-start gap-1.5">
                                                <span className="text-[#8ec346] font-bold">🎒</span>
                                                <span><strong>School Rush Detour</strong>: Utilize Crosstown Parkway connector routes during morning drop-offs.</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <a 
                                        href="https://www.drtrippandassociates.com/get-matched" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="block bg-[#2e401b] text-white font-bold text-xs uppercase tracking-wider text-center py-2.5 px-4 rounded-lg hover:bg-[#243515] transition-all"
                                    >
                                        READ FULL STRESS-RELIEF GUIDE & BOOK CONSULTATION AT DRTRIPPANDASSOCIATES.COM/GET-MATCHED →
                                    </a>

                                    <div className="p-3 bg-[#2e401b]/5 rounded-lg border border-[#2e401b]/20 text-[11px] text-[#2e401b] font-medium flex items-center gap-2">
                                        <span>💡</span>
                                        <span><strong>Multi-Channel Asset</strong>: This newsletter feature also turns into a permanent, SEO-indexed sponsored article page on SunlandNews.com.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 8. STEP 5: ONGOING RETARGETING ENGINE */}
                <section className="bg-white border border-slate-200 p-6 md:p-10 rounded-3xl shadow-sm space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-[#2e401b] text-white text-xs font-bold rounded-full uppercase tracking-wider">Step 05</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#8ec346] bg-[#2e401b] px-2 py-0.5 rounded">
                                Visual Retargeting Engine
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-[#2e401b] uppercase tracking-tight">
                            Visual Pixel Retargeting Diagram
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1 leading-relaxed max-w-2xl">
                            How social engagers AND newsletter readers are automatically captured into a single custom audience pool and served retargeting ads:
                        </p>
                    </div>

                    <div className="p-6 bg-[#faf9f5] border border-slate-200 rounded-2xl space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-xs">
                            <div className="p-4 bg-white border border-slate-300 rounded-xl space-y-1 shadow-sm">
                                <span className="text-base block">📲</span>
                                <span className="font-bold text-[#2e401b] block">Channel 1: Social Reels</span>
                                <span className="text-slate-500">Viewers of Sunland video features & short reels</span>
                            </div>

                            <div className="p-4 bg-[#2e401b] text-white rounded-xl space-y-1 shadow-md border-2 border-[#8ec346]">
                                <span className="text-base block">🎯</span>
                                <span className="font-bold text-[#8ec346] block">Meta Pixel + Custom List</span>
                                <span className="text-slate-200">Captures non-converters into warm retargeting pool</span>
                            </div>

                            <div className="p-4 bg-white border border-slate-300 rounded-xl space-y-1 shadow-sm">
                                <span className="text-base block">📧</span>
                                <span className="font-bold text-[#2e401b] block">Channel 2: Newsletter</span>
                                <span className="text-slate-500">Readers clicking Dr. Tripp newsletter placements</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <span className="text-slate-400 font-bold text-xs uppercase">⬇️ BOTH SOURCES ARE SERVED RETARGETING AD CLIPS ON FACEBOOK & INSTAGRAM ⬇️</span>
                        </div>

                        <div className="max-w-md mx-auto bg-white border-2 border-[#2e401b] rounded-2xl p-5 shadow-lg space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <div className="flex items-center gap-2">
                                    <img src="/images/tripp-image.png" alt="Dr. Tripp" className="h-6 w-auto" />
                                    <span className="text-xs font-bold text-[#2e401b]">Dr. Tripp & Associates (Sponsored Ad)</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-bold">Meta Retargeting Ad</span>
                            </div>

                            <p className="text-xs text-[#2e401b] leading-relaxed font-bold">
                                “Stressed sitting in traffic on St. Lucie West Blvd? Here is how to reset your communication before walking through the front door...”
                            </p>

                            <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                                <iframe src="https://drive.google.com/file/d/1knPn6WCz9JsAFnRzlLU7QCzcm3EkioF9/preview" className="w-full h-full border-0"></iframe>
                            </div>

                            <button 
                                onClick={scrollToVSL}
                                className="w-full bg-[#2e401b] text-white text-center py-2.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:bg-[#243515] transition-all"
                            >
                                READ COVER STORY & BOOK CONSULTATION →
                            </button>
                        </div>
                    </div>
                </section>

                {/* 9. STEP 6: MONTHLY SPONSORED COMMUNITY POLL */}
                <section className="bg-white border border-slate-200 p-6 md:p-10 rounded-3xl shadow-sm space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-[#8ec346] text-[#2e401b] text-xs font-bold rounded-full uppercase tracking-wider">Step 06</span>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">1 Per Month</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-[#2e401b] uppercase tracking-tight">
                            Monthly Sponsored Community Poll
                        </h2>
                        <p className="text-sm font-medium text-slate-600 mt-1 leading-relaxed max-w-2xl">
                            Each month, we run a co-branded interactive poll across the Sunland News newsletter and social channels:
                        </p>
                    </div>

                    <div className="bg-[#2e401b] text-white p-6 rounded-xl border border-[#3b5223] space-y-4 max-w-xl mx-auto shadow-md">
                        <div className="flex items-center justify-between border-b border-[#3b5223] pb-3 text-xs">
                            <span className="bg-[#8ec346] text-[#2e401b] text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
                                MONTHLY SPONSORED POLL
                            </span>
                            <span className="text-[#8ec346] font-bold">LIVE VOTING DEMO</span>
                        </div>

                        <h3 className="text-base font-bold text-white">
                            📊 What is the #1 thing you do when you feel stressed sitting in traffic on St. Lucie West Blvd?
                        </h3>

                        <div className="space-y-2 text-xs">
                            {[
                                { key: 'trafficStress', label: '🎧 Listen to a podcast or deep-breathing exercise' },
                                { key: 'dateNight', label: '🗣️ Call my partner to vent about the day' },
                                { key: 'workLife', label: '🎵 Turn on music and try to decompress before home' },
                                { key: 'parenting', label: '🚗 Find a side street detour through Crosstown' },
                            ].map(option => {
                                const count = pollVotes[option.key];
                                const percent = Math.round((count / totalPollVotes) * 100);
                                const isSelected = pollVotedOption === option.key;

                                return (
                                    <button
                                        key={option.key}
                                        onClick={() => handlePollVote(option.key)}
                                        className={`w-full p-3 rounded-lg font-bold text-left transition-all relative overflow-hidden border ${
                                            isSelected ? 'bg-[#3b5223] border-[#8ec346]' : 'bg-[#1e2c12] border-[#3b5223] text-slate-200'
                                        }`}
                                    >
                                        <div className="absolute top-0 left-0 bottom-0 bg-[#8ec346]/30 pointer-events-none" style={{ width: `${percent}%` }}></div>
                                        <div className="relative z-10 flex justify-between items-center">
                                            <span>{option.label}</span>
                                            <span className="text-[#8ec346] font-mono">{percent}% ({count})</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 10. THE GRAND FINALE SURPRISE: SIGNATURE MONTHLY SHOW ("FROM SUNLAND WITH LOVE") */}
                <section className="bg-[#2e401b] text-white border-2 border-[#8ec346] p-6 md:p-10 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#8ec346] text-[#2e401b] text-[10px] font-black uppercase px-4 py-1.5 rounded-bl-xl tracking-widest shadow-sm">
                        🎉 GRAND SURPRISE FEATURE
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-[#8ec346] text-[#2e401b] text-xs font-black rounded-full uppercase tracking-wider">
                                Signature Franchise
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#8ec346]">
                                Monthly Sponsored Local Show
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                            “From Sunland with Love”
                        </h2>
                        <p className="text-sm font-medium text-slate-200 mt-2 leading-relaxed max-w-2xl">
                            Our premier 10–20 minute documentary series spotlighting real Treasure Coast couples, first dates, and local relationship stories.
                        </p>
                    </div>

                    {/* STRATEGIC MEETING CONTEXT BOX: DATE NIGHT SERIES & DEEPER COUPLES RETREAT LEAD-UP */}
                    <div className="p-5 bg-[#8ec346] text-[#2e401b] rounded-2xl font-bold text-xs md:text-sm leading-relaxed shadow-md space-y-2">
                        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide border-b border-[#2e401b]/20 pb-1">
                            <span>💡 How This Powers Dr. Tripp & Associates:</span>
                        </div>
                        <p className="text-slate-950 font-medium">
                            This monthly show anchors your <strong>Date Night Series</strong> as the premier lead-up to your <strong>Deeper Couples Retreat</strong>. It presents Dr. Tripp & Associates as the presenting sponsor, establishing your clinical authority on relationship connection before inviting couples to register for your retreat.
                        </p>
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between border-b border-[#3b5223] pb-2 text-xs">
                            <span className="text-amber-400 font-bold uppercase">Presented by Dr. Tripp & Associates</span>
                            <span className="bg-[#3b5223] text-[#8ec346] text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">Pilot Episode Intro</span>
                        </div>

                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-700 shadow-md">
                            <iframe
                                src="https://drive.google.com/file/d/12_tbfUm9LXBbyKG2xqiqXnlV5rxMSrMl/preview"
                                className="w-full h-full border-0"
                                allow="autoplay"
                                title="From Sunland With Love Pilot Intro"
                            ></iframe>
                        </div>

                        <div className="p-4 bg-white text-[#2e401b] rounded-xl space-y-1">
                            <div className="flex items-center justify-between text-xs font-bold">
                                <span>🚗 Example Social Reel Cut From The Show:</span>
                                <span className="bg-[#2e401b] text-[#8ec346] px-2 py-0.5 rounded text-[10px]">High Engagement</span>
                            </div>
                            <p className="text-xs text-slate-700 leading-relaxed pt-1">
                                “What do you do when you're stuck sitting in traffic at the I-95 light on St. Lucie West Blvd at 5 PM?”
                            </p>
                        </div>
                    </div>
                </section>

                {/* 11. INVESTMENT & PARTNERSHIP TERMS (DUAL PACKAGE COMPARISON WITH DOWNSELL) */}
                <section className="bg-white border-2 border-[#2e401b] rounded-3xl shadow-lg overflow-hidden">
                    <div className="bg-[#2e401b] text-white p-6 md:p-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">💰</span>
                            <div>
                                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
                                    Investment & Partnership Terms
                                </h3>
                                <p className="text-xs text-[#8ec346] font-medium mt-0.5">
                                    Select the partnership tier that best fits your practice's growth goals
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10 space-y-6 bg-slate-50 border-t border-[#3b5223]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            {/* OPTION A: FULL PARTNERSHIP PACKAGE */}
                            <div className="bg-white border-2 border-[#2e401b] rounded-2xl p-6 md:p-8 shadow-md space-y-4 relative flex flex-col justify-between">
                                <div className="absolute -top-3 right-4 bg-[#8ec346] text-[#2e401b] text-[10px] font-black uppercase px-2.5 py-0.5 rounded shadow-sm">
                                    RECOMMENDED FULL ECOSYSTEM
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="border-b border-slate-200 pb-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#2e401b] bg-[#8ec346]/20 px-2.5 py-1 rounded">
                                            OPTION A: FULL PARTNERSHIP
                                        </span>
                                        <h4 className="text-xl font-black text-[#2e401b] mt-2">
                                            Complete Year-Long Ecosystem
                                        </h4>
                                        <div className="mt-2">
                                            <span className="text-3xl md:text-4xl font-black text-[#2e401b]">$4,800</span>
                                            <span className="text-xs font-bold text-slate-500 uppercase ml-1">/ Quarter ($19,200 annual)</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-xs text-slate-700">
                                        <span className="font-bold text-[#2e401b] uppercase block text-[11px]">
                                            Includes Everything Above:
                                        </span>
                                        <ul className="space-y-2 leading-relaxed">
                                            <li className="flex items-start gap-2"><span className="text-[#8ec346] font-bold">✓</span><span><strong>Sit-Down Master Story</strong> & VSL Landing Page</span></li>
                                            <li className="flex items-start gap-2"><span className="text-[#8ec346] font-bold">✓</span><span><strong>Social Video Reels</strong> (3 Sunland + 3 Client Branded)</span></li>
                                            <li className="flex items-start gap-2"><span className="text-[#8ec346] font-bold">✓</span><span><strong>ManyChat DM Automations</strong> & Keyword Triggers</span></li>
                                            <li className="flex items-start gap-2"><span className="text-[#8ec346] font-bold">✓</span><span><strong>Newsletter Placements & Sponsored Detour Guides</strong></span></li>
                                            <li className="flex items-start gap-2"><span className="text-[#8ec346] font-bold">✓</span><span><strong>Meta Pixel Engine</strong> Refreshed Retargeting Ads</span></li>
                                            <li className="flex items-start gap-2"><span className="text-[#8ec346] font-bold">✓</span><span><strong>Monthly Sponsored Community Polls</strong></span></li>
                                            <li className="flex items-start gap-2"><span className="text-[#8ec346] font-bold">✓</span><span><strong>"From Sunland with Love" Show Partnership</strong> (Lead-up to Deeper Couples Retreat)</span></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="p-3.5 bg-[#2e401b] text-white rounded-xl text-center text-xs font-bold mt-4">
                                    🔥 Full Media & Show Partnership
                                </div>
                            </div>

                            {/* OPTION B: MEDIA PLACEMENT PACKAGE (DOWNSELL TIER) */}
                            <div className="bg-white border-2 border-slate-300 rounded-2xl p-6 md:p-8 shadow-sm space-y-4 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="border-b border-slate-200 pb-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                                            OPTION B: MEDIA PLACEMENT
                                        </span>
                                        <h4 className="text-xl font-black text-slate-800 mt-2">
                                            Core Distribution & Placement
                                        </h4>
                                        <div className="mt-2">
                                            <span className="text-3xl md:text-4xl font-black text-slate-900">$2,400</span>
                                            <span className="text-xs font-bold text-slate-500 uppercase ml-1">/ Quarter ($9,600 annual)</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-xs text-slate-700">
                                        <span className="font-bold text-slate-800 uppercase block text-[11px]">
                                            Includes Core Media & Distribution:
                                        </span>
                                        <ul className="space-y-2 leading-relaxed">
                                            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold">✓</span><span><strong>Sit-Down Master Story</strong> & VSL Landing Page</span></li>
                                            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold">✓</span><span><strong>Social Video Reels</strong> (3 Sunland + 3 Client Branded)</span></li>
                                            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold">✓</span><span><strong>ManyChat DM Automations</strong> & Keyword Triggers</span></li>
                                            <li className="flex items-start gap-2"><span className="text-emerald-600 font-bold">✓</span><span><strong>Newsletter Placements & Sponsored Detour Guides</strong></span></li>
                                            <li className="flex items-start gap-2"><span className="text-slate-400 font-bold">✕</span><span className="text-slate-400 italic">Excludes Monthly Show Series Production</span></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="p-3.5 bg-slate-100 text-slate-700 rounded-xl text-center text-xs font-bold mt-4 border border-slate-200">
                                    🌱 Core Media & Retargeting Entry Tier
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 12. CLEAN PRESENTATION CLOSING */}
                <footer className="bg-[#2e401b] text-white border border-[#3b5223] p-8 md:p-10 rounded-3xl shadow-xl text-center space-y-4">
                    <div className="flex justify-center items-center gap-3 mb-2">
                        <img 
                            src="/images/sunlandnews-logo.png" 
                            alt="Sunland News Logo" 
                            className="h-9 w-auto object-contain bg-white px-3 py-1.5 rounded-lg"
                        />
                        <span className="font-bold text-[#8ec346]">×</span>
                        <img 
                            src="/images/tripp-image.png" 
                            alt="Dr. Tripp & Associates Logo" 
                            className="h-9 w-auto object-contain bg-white px-3 py-1.5 rounded-lg"
                        />
                    </div>

                    <span className="inline-block py-1 px-3 bg-[#8ec346] text-[#2e401b] text-xs font-bold tracking-wider uppercase rounded-full">
                        Let's Build This Together
                    </span>

                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#8ec346]">
                        Dr. Tripp & Associates
                    </h2>
                    <p className="text-sm font-medium text-slate-200 max-w-lg mx-auto">
                        A Year of Unmatched Presence, Trust, and Client Growth across St. Lucie and Martin County.
                    </p>

                    <div className="pt-4 border-t border-[#3b5223] text-xs font-medium text-slate-300">
                        <p className="text-sm font-bold text-white uppercase">Ja'Min Brown</p>
                        <p>Founder, Sunland News</p>
                        <p className="text-[#8ec346] font-bold mt-1">JaMin@SunlandNews.com</p>
                    </div>
                </footer>

            </div>
        </div>
    );
}
