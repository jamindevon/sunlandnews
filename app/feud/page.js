'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function FeudPage() {
    const [response, setResponse] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!response.trim()) return;

        setStatus('submitting');
        try {
            const res = await fetch('/api/feud', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ response, email }),
            });

            if (res.ok) {
                setStatus('success');
                setResponse('');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="max-w-2xl w-full">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                        Sunland Family Feud
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-6">
                        What <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">entertainment</span> is missing from St. Lucie County?
                    </h1>
                    <p className="text-xl text-gray-500">
                        Theme parks, specific activities, nightlife, etc...
                    </p>
                </div>

                {/* Success State */}
                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 border border-green-100 rounded-3xl p-12 text-center"
                    >
                        <div className="text-6xl mb-6">🎉</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Survey Says... Accepted!</h2>
                        <p className="text-gray-600 mb-8">Thanks for playing. We'll be using the best answers in our next video!</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="text-green-700 font-bold hover:underline"
                        >
                            Submit another answer
                        </button>
                    </motion.div>
                ) : (
                    /* Form */
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                Your Answer
                            </label>
                            <textarea
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                placeholder="We really need a specific..."
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-6 text-xl font-medium text-gray-900 focus:border-black focus:ring-0 transition-all placeholder-gray-300 min-h-[160px] resize-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                Your Email <span className="text-gray-400 font-normal normal-case">(Optional)</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl p-4 text-lg font-medium text-gray-900 focus:border-black focus:ring-0 transition-all placeholder-gray-300"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'submitting' || !response.trim()}
                            className="w-full bg-black text-white text-xl font-bold py-5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {status === 'submitting' ? 'Submitting...' : 'Send Answer ↵'}
                        </button>

                        {status === 'error' && (
                            <p className="text-red-500 text-center font-bold">
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
}
