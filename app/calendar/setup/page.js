'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';

function SetupContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const isNew = searchParams.get('new');
    const sessionId = searchParams.get('session_id');

    const [fetchedToken, setFetchedToken] = useState(null);
    const [loading, setLoading] = useState(!!sessionId && !token);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [origin, setOrigin] = useState('');

    // Flow State
    // If isNew is present, we start at 'quiz'. Otherwise we show 'complete' (links).
    const [step, setStep] = useState(isNew ? 'quiz' : 'complete');
    const [preferences, setPreferences] = useState({
        interests: [],
        location_preference: 'all_slc'
    });
    const [saving, setSaving] = useState(false);

    const activeToken = token || fetchedToken;

    useEffect(() => {
        setOrigin(window.location.origin);

        if (sessionId && !token) {
            const fetchToken = async () => {
                try {
                    const res = await fetch(`/api/checkout/session?session_id=${sessionId}`);
                    const data = await res.json();

                    if (data.token) {
                        setFetchedToken(data.token);
                        // Update URL but keep 'new' param so we stay in quiz mode
                        window.history.replaceState({}, '', `/calendar/setup?token=${data.token}&new=true`);
                        setStep('quiz'); // Ensure we are in quiz mode for new sessions
                    } else {
                        setError(data.error || 'Failed to retrieve setup details.');
                    }
                } catch (err) {
                    setError('Something went wrong. Please refresh.');
                } finally {
                    setLoading(false);
                }
            };
            fetchToken();
        }
    }, [sessionId, token]);

    const handleInterestChange = (interest) => {
        setPreferences(prev => {
            const newInterests = prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests: newInterests };
        });
    };

    const handleQuizSubmit = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/user/preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: activeToken, preferences }),
            });

            if (res.ok) {
                setStep('complete');
                window.scrollTo(0, 0);
            } else {
                alert('Failed to save preferences. Please try again.');
            }
        } catch (error) {
            alert('Error saving preferences.');
        } finally {
            setSaving(false);
        }
    };

    const calendarUrl = activeToken ? `${origin}/cal/${activeToken}` : '';
    const webcalUrl = calendarUrl.replace(/^https?:\/\//, 'webcal://');
    const googleUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(webcalUrl)}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(calendarUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <h2 className="text-xl font-bold text-gray-900">Finalizing your setup...</h2>
                    <p className="text-gray-500">This usually takes just a few seconds.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Setup Issue</h1>
                    <p className="text-red-500 mb-8">{error}</p>
                    <button onClick={() => window.location.reload()} className="text-primary font-bold hover:underline">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!activeToken) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Link</h1>
                    <p className="text-gray-600 mb-8">No calendar token found. Please check your link.</p>
                    <Link href="/calendar" className="text-primary font-bold hover:underline">
                        Return to Calendar Page
                    </Link>
                </div>
            </div>
        );
    }

    // STEP 1: THE QUIZ
    if (step === 'quiz') {
        return (
            <div className="min-h-screen bg-white">
                <div className="container mx-auto max-w-2xl px-4 py-16">
                    <div className="mb-12 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Let's Personalize Your Calendar
                        </h1>
                        <p className="text-xl text-gray-600">
                            Select what you're interested in so we can curate the best events for you.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Food & Drink', 'Live Music', 'Arts & Culture', 'Family & Kids', 'Outdoors', 'Nightlife', 'Workshops', 'Community'].map((interest) => (
                                    <label key={interest} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${preferences.interests.includes(interest) ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${preferences.interests.includes(interest) ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                                            {preferences.interests.includes(interest) && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={preferences.interests.includes(interest)}
                                            onChange={() => handleInterestChange(interest)}
                                        />
                                        <span className="text-lg font-medium text-gray-900">{interest}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="pt-6">
                                <button
                                    onClick={handleQuizSubmit}
                                    disabled={saving || preferences.interests.length === 0}
                                    className="w-full py-4 bg-primary text-white text-xl font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                                >
                                    {saving ? 'Saving...' : 'Get My Calendar Link →'}
                                </button>
                                {preferences.interests.length === 0 && (
                                    <p className="text-center text-sm text-gray-500 mt-3">Please select at least one interest.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // STEP 2: THE LINKS (COMPLETE)
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto max-w-2xl px-4 py-16">

                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-3xl mb-6">
                        🎉
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        You're All Set!
                    </h1>
                    <p className="text-xl text-gray-600">
                        Here is your personalized calendar link.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-12">
                    <div className="p-8 bg-gray-50 border-b border-gray-100 text-center">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Subscribe to your calendar</h2>
                        <p className="text-gray-500 text-sm">Choose your device below to sync automatically.</p>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* iPhone / Apple Calendar */}
                        <a
                            href={webcalUrl}
                            className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-primary hover:bg-primary/5 transition-all group cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">🍎</span>
                                <div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-primary">Apple Calendar</h3>
                                    <p className="text-sm text-gray-500">iPhone, iPad, Mac</p>
                                </div>
                            </div>
                            <span className="text-primary font-bold">Connect &rarr;</span>
                        </a>

                        {/* Google Calendar */}
                        <a
                            href={googleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-primary hover:bg-primary/5 transition-all group cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">📅</span>
                                <div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-primary">Google Calendar</h3>
                                    <p className="text-sm text-gray-500">Android, Web</p>
                                </div>
                            </div>
                            <span className="text-primary font-bold">Connect &rarr;</span>
                        </a>

                        {/* Outlook / Other */}
                        <a
                            href={webcalUrl}
                            className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-primary hover:bg-primary/5 transition-all group cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">📧</span>
                                <div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-primary">Outlook</h3>
                                    <p className="text-sm text-gray-500">Desktop, Web</p>
                                </div>
                            </div>
                            <span className="text-primary font-bold">Connect &rarr;</span>
                        </a>
                    </div>

                    {/* Manual Copy */}
                    <div className="bg-gray-50 p-6 border-t border-gray-100">
                        <p className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Manual Subscription URL</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                readOnly
                                value={calendarUrl}
                                className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 focus:outline-none"
                            />
                            <button
                                onClick={handleCopy}
                                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link href="/calendar/dashboard" className="text-gray-500 hover:text-gray-900 text-sm font-medium">
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function CalendarSetup() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
            <SetupContent />
        </Suspense>
    );
}
