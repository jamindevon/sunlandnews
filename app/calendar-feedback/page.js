'use client';

import { useState, useEffect } from 'react';
import { events } from '@/app/data/events';

export default function CalendarFeedbackProp() {
    const [step, setStep] = useState(0); // 0 = Intro, 1-4 = Questions, 5 = Success
    const [formData, setFormData] = useState({
        autoAdd: '',
        eventTypes: [],
        pricePoint: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [host, setHost] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHost(window.location.host);
        }
    }, []);

    // Show ALL events regardless of filter
    // We still capture the 'eventTypes' preference for data, but don't filter the view.
    const displayedEvents = events;

    const handleEventTypeChange = (type) => {
        setFormData(prev => {
            const newTypes = prev.eventTypes.includes(type)
                ? prev.eventTypes.filter(t => t !== type)
                : [...prev.eventTypes, type];
            return { ...prev, eventTypes: newTypes };
        });
    };

    const nextStep = () => {
        setStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'Calendar Feedback User',
                    email: formData.email,
                    subject: 'Calendar Club Feedback Quiz',
                    message: `
            Q1 (Auto-add tailored events): ${formData.autoAdd}
            Q2 (Event Types): ${formData.eventTypes.join(', ')}
            Q3 (Price Point): ${formData.pricePoint}
            Email: ${formData.email}
          `
                }),
            });

            if (response.ok) {
                setStep(5); // Success step
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const getGoogleCalendarUrl = (event) => {
        const baseUrl = "https://calendar.google.com/calendar/render";
        const params = new URLSearchParams({
            action: "TEMPLATE",
            text: event.title,
            dates: event.gcalTime,
            details: `${event.description}\n\nAdded via Sunland News`,
            location: event.location,
        });
        return `${baseUrl}?${params.toString()}`;
    };

    // Generate URLs for subscription (Master Feed)
    const getSubscriptionUrls = () => {
        // No query params needed because we want ALL events for now
        const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'https' : 'http';
        const feedUrl = `${protocol}://${host}/api/calendar-feed`;

        // Webcal for Apple/Outlook
        const webcalUrl = feedUrl.replace(/^http/, 'webcal');

        // Google Import (Needs public URL, so we warn if localhost)
        const googleUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(feedUrl)}`;

        return { webcalUrl, googleUrl, feedUrl };
    };

    const { webcalUrl, googleUrl, feedUrl } = getSubscriptionUrls();

    return (
        <div className="min-h-screen bg-neutral-50 font-sans flex items-center justify-center p-4">
            <div className="max-w-xl w-full">

                {/* Progress Bar (Only for quiz steps) */}
                {step > 0 && step < 5 && (
                    <div className="mb-6">
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-500 ease-out"
                                style={{ width: `${(step / 4) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-right text-xs text-gray-500 mt-1">Step {step} of 4</p>
                    </div>
                )}

                {/* Step 0: Intro */}
                {step === 0 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                            📅
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Sunland Calendar Club</h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            We're building a tool to auto-add local events to your calendar. <br /><br />
                            Take this 30-second quiz to help us build it — and get this week's full event calendar instantly.
                        </p>
                        <button
                            onClick={nextStep}
                            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transform hover:-translate-y-1 transition-all"
                        >
                            Start Quick Quiz
                        </button>
                    </div>
                )}

                {/* Step 1: Auto-add willingness */}
                {step === 1 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Would you pay for a service that auto-adds <span className="text-blue-600">tailored</span> events to your calendar?
                        </h2>
                        <div className="space-y-4">
                            {['Yes, definitely', 'Maybe, depends on price', 'No, not interested'].map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => {
                                        setFormData({ ...formData, autoAdd: opt });
                                        nextStep();
                                    }}
                                    className="w-full p-5 rounded-xl border-2 border-gray-100 text-left text-lg font-medium hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group"
                                >
                                    {opt}
                                    <span className="text-gray-300 group-hover:text-blue-500">→</span>
                                </button>
                            ))}
                        </div>
                        <button onClick={prevStep} className="mt-6 text-gray-400 text-sm hover:text-gray-600">Back</button>
                    </div>
                )}

                {/* Step 2: Event Types */}
                {step === 2 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            What do you care about?
                        </h2>
                        <p className="text-gray-500 mb-6">Select your favorites. (For this beta test, we'll give you ALL events regardless).</p>

                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {['Food & Drink', 'Live Music', 'Family/Kids', 'Arts & Culture', 'Outdoor/Nature', 'Nightlife', 'Networking', 'Free Events'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => handleEventTypeChange(type)}
                                    className={`p-4 rounded-xl border text-sm font-semibold transition-all ${formData.eventTypes.includes(type)
                                            ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-[1.02]'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={nextStep}
                            disabled={formData.eventTypes.length === 0}
                            className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Continue
                        </button>
                        <button onClick={prevStep} className="mt-4 text-center w-full text-gray-400 text-sm hover:text-gray-600">Back</button>
                    </div>
                )}

                {/* Step 3: Price Point */}
                {step === 3 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            If this saved you time every week, what's a fair monthly price?
                        </h2>
                        <div className="space-y-3">
                            {['$1 - $5', '$5 - $10', '$10 - $15', '$15+'].map((price) => (
                                <button
                                    key={price}
                                    onClick={() => {
                                        setFormData({ ...formData, pricePoint: price });
                                        nextStep();
                                    }}
                                    className="w-full p-5 rounded-xl border-2 border-gray-100 text-left text-lg font-medium hover:border-green-500 hover:bg-green-50 transition-all flex items-center justify-between group"
                                >
                                    {price}
                                    <span className="text-gray-300 group-hover:text-green-500 font-bold">$</span>
                                </button>
                            ))}
                        </div>
                        <button onClick={prevStep} className="mt-6 text-gray-400 text-sm hover:text-gray-600">Back</button>
                    </div>
                )}

                {/* Step 4: Email & Submit */}
                {step === 4 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Last thing!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Drop your email to get your <span className="font-bold text-blue-600">event list</span> and early access if we build this.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                required
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full p-5 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-lg mb-6"
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.email}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? 'Generating...' : 'Get My Events ->'}
                            </button>
                        </form>
                        <button onClick={prevStep} className="mt-6 w-full text-center text-gray-400 text-sm hover:text-gray-600">Back</button>
                    </div>
                )}

                {/* Step 5: Success & Results */}
                {step === 5 && (
                    <div className="max-w-2xl w-full mx-auto">
                        <div className="bg-green-50 rounded-2xl p-8 mb-8 text-center border border-green-100 animate-fade-in">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                ✅
                            </div>
                            <h3 className="text-2xl font-bold text-green-900 mb-2">You're In!</h3>
                            <p className="text-green-800">
                                Here are the <b>{displayedEvents.length}</b> events happening this week.
                            </p>
                        </div>

                        {/* Subscribe Buttons */}
                        {displayedEvents.length > 0 && (
                            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <a
                                    href={webcalUrl}
                                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-black flex items-center justify-center gap-2 transform hover:-translate-y-1 transition-all"
                                >
                                    <span className="text-2xl">🍏</span> Add to Apple Cal
                                </a>
                                <a
                                    href={googleUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 bg-white border-2 border-gray-200 text-gray-900 rounded-xl font-bold text-lg shadow-sm hover:border-gray-400 flex items-center justify-center gap-2 transform hover:-translate-y-1 transition-all"
                                    onClick={(e) => {
                                        if (host.includes('localhost')) {
                                            e.preventDefault();
                                            alert('Google Calendar Subscribe requires a public URL. This will work once deployed! Use Apple/Download for local testing.');
                                        }
                                    }}
                                >
                                    <span className="text-2xl">📅</span> Add to Google Cal
                                </a>
                            </div>
                        )}
                        {/* Download Link Backup */}
                        {displayedEvents.length > 0 && (
                            <div className="text-center mb-12">
                                <a href={feedUrl} download="sunland-events.ics" className="text-gray-500 text-sm underline hover:text-gray-800">
                                    Or download .ics file directly (Outlook/Other)
                                </a>
                            </div>
                        )}

                        <div className="space-y-4">
                            {displayedEvents.length > 0 ? (
                                displayedEvents.map((event) => (
                                    <div key={event.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {event.tags.map(tag => (
                                                <span key={tag} className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${formData.eventTypes.includes(tag) ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                                        <div className="text-gray-500 text-sm mb-3 flex items-center gap-2">
                                            <span className="font-medium text-gray-900">{event.date}</span> • {event.time}
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{event.description}</p>

                                        <a
                                            href={getGoogleCalendarUrl(event)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            + Add just this event
                                        </a>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
                                    <p>No events found.</p>
                                </div>
                            )}
                        </div>

                        <button onClick={() => window.location.reload()} className="mt-12 w-full text-center text-gray-400 text-sm hover:text-gray-600">Start Over</button>
                    </div>
                )}
            </div>
        </div>
    );
}
