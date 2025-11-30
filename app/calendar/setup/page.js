'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';

function SetupContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const isNew = searchParams.get('new');
    const sessionId = searchParams.get('session_id');

    const isEdit = searchParams.get('edit');

    const [fetchedToken, setFetchedToken] = useState(null);
    const [loading, setLoading] = useState(!!sessionId && !token);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [origin, setOrigin] = useState('');

    // Flow State
    const [step, setStep] = useState(isNew || isEdit ? 1 : 4); // 1: Interests, 2: Availability, 3: Location, 4: Complete
    const [preferences, setPreferences] = useState({
        interests: [],
        availability: [],
        location_preference: ''
    });
    const [saving, setSaving] = useState(false);

    const activeToken = token || fetchedToken;

    useEffect(() => {
        setOrigin(window.location.origin);

        // Fetch existing preferences if token is present
        if (activeToken) {
            const fetchPreferences = async () => {
                try {
                    const res = await fetch(`/api/user/preferences?token=${activeToken}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.preferences) {
                            setPreferences(prev => ({
                                ...prev,
                                ...data.preferences
                            }));
                        }
                    }
                } catch (err) {
                    console.error('Failed to fetch preferences', err);
                }
            };
            fetchPreferences();
        }

        if (sessionId && !token) {
            const fetchToken = async () => {
                try {
                    const res = await fetch(`/api/checkout/session?session_id=${sessionId}`);
                    const data = await res.json();

                    if (data.token) {
                        setFetchedToken(data.token);
                        // Update URL but keep 'new' param so we stay in quiz mode
                        window.history.replaceState({}, '', `/calendar/setup?token=${data.token}&new=true`);
                        setStep(1);
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
    }, [sessionId, token, activeToken]);

    const handleInterestChange = (interest) => {
        setPreferences(prev => {
            const currentInterests = prev.interests || [];
            const newInterests = currentInterests.includes(interest)
                ? currentInterests.filter(i => i !== interest)
                : [...currentInterests, interest];
            return { ...prev, interests: newInterests };
        });
    };

    const handleAvailabilityChange = (time) => {
        setPreferences(prev => {
            const currentAvailability = prev.availability || [];
            const newAvailability = currentAvailability.includes(time)
                ? currentAvailability.filter(t => t !== time)
                : [...currentAvailability, time];
            return { ...prev, availability: newAvailability };
        });
    };

    const handleLocationChange = (loc) => {
        setPreferences(prev => ({ ...prev, location_preference: loc }));
    };

    const handleNext = () => {
        setStep(prev => prev + 1);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
        window.scrollTo(0, 0);
    };

    const handleFinalSubmit = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/user/preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: activeToken, preferences }),
            });

            if (res.ok) {
                if (isEdit) {
                    // If editing, go back to dashboard
                    window.location.href = '/calendar/dashboard';
                } else {
                    setStep(4);
                    window.scrollTo(0, 0);
                }
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
                    <p className="text-gray-600 mb-8">No calendar token found.</p>
                    <Link href="/calendar" className="text-primary font-bold hover:underline">
                        Return to Calendar Page
                    </Link>
                </div>
            </div>
        );
    }

    // PROGRESS BAR
    const renderProgressBar = () => (
        <div className="max-w-xl mx-auto mb-12">
            <div className="flex justify-between mb-2">
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {s}
                    </div>
                ))}
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-black transition-all duration-500 ease-out"
                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                />
            </div>
        </div>
    );

    // STEP 1: INTERESTS
    if (step === 1) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto max-w-2xl px-4">
                    {renderProgressBar()}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">What interests you?</h1>
                        <p className="text-gray-600">Select all that apply. We'll only show you events you care about.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {[
                            { id: 'Food & Drink', icon: '🍔' },
                            { id: 'Live Music', icon: '🎵' },
                            { id: 'Arts & Culture', icon: '🎨' },
                            { id: 'Outdoors', icon: '🌳' },
                            { id: 'Family Events', icon: '👨‍👩‍👧‍👦' },
                            { id: 'Nightlife', icon: '🍸' },
                            { id: 'Workshops', icon: '💡' },
                            { id: 'Community', icon: '🤝' }
                        ].map((item) => (
                            <label key={item.id} className={`flex items-center justify-center flex-col p-6 rounded-2xl border-2 cursor-pointer transition-all bg-white hover:shadow-md ${preferences.interests?.includes(item.id) ? 'border-black ring-1 ring-black' : 'border-gray-100'}`}>
                                <span className="text-4xl mb-3">{item.icon}</span>
                                <span className="font-bold text-gray-900">{item.id}</span>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={preferences.interests?.includes(item.id) || false}
                                    onChange={() => handleInterestChange(item.id)}
                                />
                            </label>
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={preferences.interests.length === 0}
                        className="w-full py-4 bg-black text-white text-lg font-bold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue &rarr;
                    </button>
                </div>
            </div>
        );
    }

    // STEP 2: AVAILABILITY
    if (step === 2) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto max-w-2xl px-4">
                    {renderProgressBar()}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">When are you free?</h1>
                        <p className="text-gray-600">We'll prioritize events during these times.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {[
                            { id: 'Weekday Mornings', icon: '🌅' },
                            { id: 'Weekday Evenings', icon: '🌆' },
                            { id: 'Weekend Days', icon: '☀️' },
                            { id: 'Weekend Nights', icon: '🌙' }
                        ].map((item) => (
                            <label key={item.id} className={`flex items-center justify-center flex-col p-6 rounded-2xl border-2 cursor-pointer transition-all bg-white hover:shadow-md ${preferences.availability?.includes(item.id) ? 'border-black ring-1 ring-black' : 'border-gray-100'}`}>
                                <span className="text-4xl mb-3">{item.icon}</span>
                                <span className="font-bold text-gray-900">{item.id}</span>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={preferences.availability?.includes(item.id) || false}
                                    onChange={() => handleAvailabilityChange(item.id)}
                                />
                            </label>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button onClick={handleBack} className="flex-1 py-4 bg-gray-200 text-gray-900 text-lg font-bold rounded-xl hover:bg-gray-300 transition-colors">
                            &larr; Back
                        </button>
                        <button
                            onClick={handleNext}
                            className="flex-[2] py-4 bg-black text-white text-lg font-bold rounded-xl hover:bg-gray-800 transition-colors"
                        >
                            Continue &rarr;
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // STEP 3: LOCATION
    if (step === 3) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto max-w-2xl px-4">
                    {renderProgressBar()}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">How far will you travel?</h1>
                        <p className="text-gray-600">We'll only show events within your comfort zone.</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        {[
                            { id: 'fort_pierce', label: '📍 Fort Pierce only (my hometown)' },
                            { id: 'psl_fp', label: '🗺️ Port St. Lucie & Fort Pierce (20 min drive)' },
                            { id: 'all_slc', label: '🚗 All of St. Lucie County (30 min drive)' },
                            { id: 'treasure_coast', label: '🛣️ Treasure Coast (up to 45 min - Vero, Stuart, PSL)' }
                        ].map((item) => (
                            <label key={item.id} className={`flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all bg-white hover:shadow-md ${preferences.location_preference === item.id ? 'border-black ring-1 ring-black' : 'border-gray-100'}`}>
                                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${preferences.location_preference === item.id ? 'border-black' : 'border-gray-300'}`}>
                                    {preferences.location_preference === item.id && <div className="w-3 h-3 rounded-full bg-black" />}
                                </div>
                                <span className="font-bold text-gray-900 text-lg">{item.label}</span>
                                <input
                                    type="radio"
                                    name="location"
                                    className="hidden"
                                    checked={preferences.location_preference === item.id}
                                    onChange={() => handleLocationChange(item.id)}
                                />
                            </label>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button onClick={handleBack} className="flex-1 py-4 bg-gray-200 text-gray-900 text-lg font-bold rounded-xl hover:bg-gray-300 transition-colors">
                            &larr; Back
                        </button>
                        <button
                            onClick={handleFinalSubmit}
                            disabled={saving || !preferences.location_preference}
                            className="flex-[2] py-4 bg-black text-white text-lg font-bold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Creating Calendar...' : 'Create My Calendar →'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // STEP 4: COMPLETE
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto max-w-2xl px-4 py-16">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 text-5xl mb-6 animate-bounce">
                        🎉
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Your calendar is ready!
                    </h1>
                    <p className="text-xl text-gray-600">
                        Tap a button below to add events to your calendar. <br />
                        New events will appear automatically every week.
                    </p>
                </div>

                <div className="space-y-4 max-w-md mx-auto mb-12">
                    <a href={webcalUrl} className="flex items-center justify-center w-full py-4 bg-black text-white text-lg font-bold rounded-xl hover:bg-gray-800 transition-all">
                        🍎 Add to Apple Calendar
                    </a>
                    <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-all">
                        📅 Add to Google Calendar
                    </a>
                    <a href={webcalUrl} className="flex items-center justify-center w-full py-4 bg-blue-500 text-white text-lg font-bold rounded-xl hover:bg-blue-600 transition-all">
                        📧 Add to Outlook
                    </a>
                </div>

                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
                    <p className="text-gray-500 font-bold mb-4 uppercase tracking-wide text-xs">Your personal calendar link</p>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 font-mono text-sm break-all text-gray-600 select-all cursor-pointer" onClick={handleCopy}>
                        {calendarUrl}
                    </div>
                    {copied && <p className="text-green-600 text-sm font-bold mt-2">Copied to clipboard!</p>}
                </div>

                <div className="text-center mt-12">
                    <Link href="/calendar/dashboard" className="text-gray-400 hover:text-gray-900 text-sm font-medium transition-colors">
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
