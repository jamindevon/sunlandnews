'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Easily change these questions to update the entire form and backend
const FEUD_QUESTIONS = [
    "If St. Lucie County had a professional sports team, what would the mascot be",
    "Who is the most famous athlete from St. Lucie County",
    "Name a sport St. Lucie County has produced the most talent in",
    "Which non-Florida team has the most fans in St. Lucie County"
];

export default function FeudPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        city: '',
        email: '',
        answers: Array(FEUD_QUESTIONS.length).fill('')
    });

    const [status, setStatus] = useState('idle'); // idle, submitting, error
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        // Automatically swipe up after a very quick loading screen
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    const handleInput = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAnswerInput = (index, value) => {
        setFormData(prev => {
            const newAnswers = [...prev.answers];
            newAnswers[index] = value;
            return { ...prev, answers: newAnswers };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation for required fields
        if (!formData.city || formData.answers.some(ans => ans.trim() === '')) {
            return;
        }

        setStatus('submitting');
        try {
            const res = await fetch('/api/feud', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    city: formData.city,
                    email: formData.email,
                    questions: FEUD_QUESTIONS,
                    answers: formData.answers
                }),
            });

            if (res.ok) {
                // Instantly redirect to the new calendar thank you page
                if (formData.email) {
                    window.location.href = 'https://calendar.sunlandnews.com/thank-you?email=' + encodeURIComponent(formData.email);
                } else {
                    window.location.href = 'https://calendar.sunlandnews.com/thank-you';
                }
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white py-12 px-4 relative z-10">
            {/* Quick Loading Screen */}
            <div 
                className={`fixed inset-0 z-[100] bg-brutalBlue flex flex-col items-center justify-center p-4 transition-transform duration-700 ease-in-out ${showLoader ? 'translate-y-0' : '-translate-y-[120%]'}`}
            >
                <div className="bg-white p-6 md:p-10 rounded-3xl shadow-[12px_12px_0px_rgba(0,0,0,1)] border-4 border-black mb-8 transform -rotate-2">
                    <h2 className="text-4xl md:text-6xl font-black text-center uppercase tracking-widest text-black animate-pulse">
                        Loading...
                    </h2>
                </div>
                <div className="bg-brutalYellow border-4 border-black px-6 py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] transform rotate-1">
                    <p className="text-black text-sm md:text-base font-black uppercase tracking-widest">Sponsored by MidFlorida Card Expo</p>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}></div>

            <div className="max-w-3xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <div className="inline-block bg-brutalYellow border-4 border-black px-4 py-1 mb-12 shadow-[4px_4px_0px_rgba(0,0,0,1)] transform -rotate-2">
                        <span className="font-black uppercase tracking-widest text-sm md:text-base">Florida Feud!</span>
                    </div>

                    {/* Stack of Cards Design */}
                    <div className="relative flex justify-center mb-16 h-64 md:h-80 w-full max-w-sm mx-auto">
                        
                        {/* Background Card (Pokémon Style) */}
                        <div className="absolute inset-0 bg-yellow-400 p-3 rounded-2xl shadow-[8px_8px_0px_rgba(0,0,0,1)] border-4 border-black transform rotate-6 scale-95 z-10 hover:z-30 transition-all duration-300 md:hover:rotate-12 cursor-pointer outline-none select-none">
                            <div className="bg-[#f0f0f0] border-4 border-gray-800 rounded-xl p-3 h-full flex flex-col items-center shadow-inner relative">
                                <div className="w-full flex justify-between items-center mb-2 bg-yellow-200 px-2 rounded border border-gray-400 shadow-sm">
                                    <span className="font-black text-xs text-gray-800 tracking-tighter">BASE SET POKÉMON</span>
                                    <span className="font-black text-[#ff4365] text-xs">100 HP</span>
                                </div>
                                <div className="relative w-full flex-grow border-4 border-gray-300 rounded bg-[#4b7bff] flex items-center justify-center shadow-[inset_0px_0px_10px_rgba(0,0,0,0.5)]">
                                     <div className="w-16 h-16 rounded-full bg-yellow-300 shadow-[0_0_15px_rgba(255,255,0,0.8)] opacity-80" />
                                </div>
                                <div className="w-full flex justify-between text-[8px] uppercase font-bold text-gray-500 mt-2">
                                    <span>weakness: none</span>
                                    <span>resistance: max</span>
                                </div>
                            </div>
                        </div>

                        {/* Foreground Card (Sports Style) */}
                        <div className="absolute inset-0 bg-white p-2 rounded shadow-[12px_12px_0px_rgba(0,0,0,1)] border-4 border-black transform -rotate-3 z-20 hover:scale-105 transition-all duration-300 hover:-rotate-1 cursor-pointer outline-none select-none">
                             <div className="absolute -top-5 -left-5 z-30">
                                 <span className="block text-xs font-black uppercase tracking-wider bg-brutalBlue text-white border-4 border-black px-3 py-1 transform -rotate-12 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                     Sponsored By
                                 </span>
                             </div>
                             
                             <div className="border-[6px] border-gray-200 h-full rounded-[4px] flex flex-col pt-3 relative bg-white overflow-hidden shadow-inner">
                                <div className="absolute top-0 right-0 bg-brutalPink text-white font-black text-[8px] px-2 py-0.5 tracking-widest border-l-2 border-b-2 border-gray-200 z-10">ROOKIE CARD</div>
                                
                                <div className="w-full h-3/5 relative z-0 flex items-center justify-center p-2 mt-4 bg-gray-50">
                                    <Image 
                                        src="/images/midflorida-card-expo-logo.jpg" 
                                        alt="MidFlorida Card Expo" 
                                        fill
                                        className="object-contain drop-shadow-md z-0"
                                    />
                                </div>
                                
                                <div className="bg-gradient-to-tr from-gray-900 to-gray-800 w-full h-2/5 absolute bottom-0 flex flex-col justify-center items-center text-white border-t-[3px] border-brutalPink relative overflow-hidden">
                                     {/* Fake holographic shine */}
                                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-[shimmer_3s_infinite] -translate-x-full z-0"></div>
                                    <h3 className="font-black text-lg md:text-xl tracking-widest mb-0.5 italic z-10">MIDFLORIDA</h3>
                                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-300 z-10">Card Expo</span>
                                </div>
                             </div>
                        </div>

                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-none mb-6 uppercase">
                        We need <span className="text-[#ff4365] underline decoration-8 underline-offset-4">your</span> answers!
                    </h1>
                    <p className="text-lg md:text-xl font-bold bg-white border-2 border-black inline-block px-4 py-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-lg">
                        Help us find the most popular answers in St. Lucie County.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] rounded-3xl overflow-hidden relative">
                    {/* Top Bar matching submit event page style */}
                    <div className="h-4 bg-black w-full"></div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">

                        {/* Section 1: Demographics */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-brutalBlue border-2 border-black flex flex-shrink-0 items-center justify-center font-black text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] text-sm">1</div>
                                <h2 className="text-2xl font-black uppercase">The Basics</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                                        City <span className="text-[#ff4365]">*</span>
                                    </label>
                                    <select
                                        value={formData.city}
                                        onChange={(e) => handleInput('city', e.target.value)}
                                        className="w-full bg-white border-2 border-black rounded-xl p-4 text-xl font-bold text-gray-900 focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] appearance-none cursor-pointer"
                                        style={{ backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", backgroundSize: "1em" }}
                                        required
                                    >
                                        <option value="" disabled>Select a city...</option>
                                        <option value="Port St. Lucie">Port St. Lucie</option>
                                        <option value="Fort Pierce">Fort Pierce</option>
                                        <option value="Other Treasure Coast">Other Treasure Coast city</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                                        Email <span className="text-gray-400 font-bold ml-1">(Optional)</span>
                                    </label>
                                    <p className="text-xs font-bold text-gray-600 bg-brutalYellow/40 p-2 rounded-lg border-2 border-black mb-3 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                                        🎁 Enter your email for a chance to win a <span className="text-brutalPink underline">gift card at a local restaurant!</span> We give away one gift card per episode.
                                    </p>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInput('email', e.target.value)}
                                        placeholder="you@email.com"
                                        className="w-full bg-white border-2 border-black rounded-xl p-4 text-xl font-bold text-gray-900 focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all placeholder-gray-300 shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-t-4 border-black border-dashed" />

                        {/* Section 2: Questions */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-brutalYellow border-2 border-black flex flex-shrink-0 items-center justify-center font-black text-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-sm">2</div>
                                <h2 className="text-2xl font-black uppercase">The Questions</h2>
                            </div>

                            {FEUD_QUESTIONS.map((question, index) => (
                                <div key={index}>
                                    <label className="block text-lg font-black text-black mb-3">
                                        {question} <span className="text-[#ff4365]">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.answers[index]}
                                        onChange={(e) => handleAnswerInput(index, e.target.value)}
                                        className="w-full bg-white border-2 border-black rounded-xl p-4 text-xl font-bold text-gray-900 focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                        required
                                    />
                                </div>
                            ))}

                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className={`w-full text-2xl font-black uppercase py-5 rounded-2xl border-4 transition-all ${status === 'submitting'
                                    ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed shadow-[2px_2px_0px_rgba(0,0,0,0.2)]'
                                    : 'bg-primary text-white border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[8px] active:translate-y-[8px]'
                                    }`}
                            >
                                {status === 'submitting' ? 'Submitting...' : 'Send Answers'}
                            </button>

                            {status === 'error' && (
                                <div className="mt-4 p-4 bg-brutalPink text-white font-bold border-4 border-black text-center shadow-[4px_4px_0px_rgba(0,0,0,1)] transform rotate-1">
                                    Whoops! Look like something went wrong. Try again.
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
