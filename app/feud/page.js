'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Easily change these questions to update the entire form and backend
const FEUD_QUESTIONS = [
    "Name a landmark in St. Lucie County everyone knows",
    "Name the most famous person from St. Lucie County",
    "You know you're in Port St. Lucie when you see ___",
    "Name something you wish Port St. Lucie had that it currently doesn't",
    "If you could bring back one business that's no longer in St. Lucie County, what would it be?",
    "Name something you only buy when you live in Florida",
    "Name something every Florida home has"
];

export default function FeudPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        city: '',
        email: '',
        answers: Array(FEUD_QUESTIONS.length).fill('')
    });

    const [status, setStatus] = useState('idle'); // idle, submitting, error

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
                // Instantly redirect to subscribe page to drop them into the funnel
                if (formData.email) {
                    router.push('/subscribe?email=' + encodeURIComponent(formData.email));
                } else {
                    router.push('/subscribe');
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
            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}></div>

            <div className="max-w-3xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-block bg-brutalYellow border-4 border-black px-4 py-1 mb-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] transform -rotate-2">
                        <span className="font-black uppercase tracking-widest text-sm md:text-base">Florida Feud!</span>
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
