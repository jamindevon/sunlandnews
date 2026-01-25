'use client';

import { useState, useEffect } from 'react';
import { events } from '@/app/data/events';

export default function CalendarFeedback() {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [host, setHost] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHost(window.location.host);
        }
    }, []);

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
                    name: 'Calendar Club Interested User',
                    email: email,
                    subject: 'Calendar Club Signup',
                    message: `User signed up for Calendar Club access.\nEmail: ${email}`
                }),
            });

            if (response.ok) {
                setHasSubmitted(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Generate URLs for subscription (No filters)
    const getSubscriptionUrls = () => {
        const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'https' : 'http';
        const feedUrl = `${protocol}://${host}/api/calendar-feed`;

        // Webcal for Apple/Outlook
        const webcalUrl = feedUrl.replace(/^http/, 'webcal');

        // Google Import
        const googleUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(feedUrl)}`;

        return { webcalUrl, googleUrl, feedUrl };
    };

    const { webcalUrl, googleUrl, feedUrl } = getSubscriptionUrls();

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

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-4">
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="bg-blue-600 p-8 text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">Sunland Calendar Club</h1>
                    <p className="text-blue-100 text-lg">Never miss a Fort Pierce event again.</p>
                </div>

                <div className="p-8">
                    {!hasSubmitted ? (
                        <div className="text-center">
                            <p className="text-gray-600 text-lg mb-8">
                                Get this week's <b>{events.length} curated events</b> added to your calendar instantly.
                                Enter your email to unlock the "Add All" button.
                            </p>

                            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                                <input
                                    type="email"
                                    required
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none text-lg"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-black transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Unlocking...' : 'Unlock Calendar Access'}
                                </button>
                            </form>
                            <p className="text-sm text-gray-400 mt-4">No spam. Just local events.</p>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            <div className="bg-green-50 rounded-xl p-6 mb-8 text-center border border-green-100">
                                <h3 className="text-xl font-bold text-green-900 mb-2">You're In! 🎉</h3>
                                <p className="text-green-800">Choose how you want to add these events:</p>
                            </div>

                            {/* Subscription Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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

                            <div className="text-center mb-10">
                                <a href={feedUrl} download="sunland-events.ics" className="text-gray-500 text-sm underline hover:text-gray-800">
                                    Download .ics file (Outlook/Manual)
                                </a>
                            </div>

                            <hr className="border-gray-100 my-8" />

                            <h3 className="text-xl font-bold text-gray-900 mb-6">Preview: This Week's Events</h3>

                            <div className="space-y-4">
                                {events.map((event) => (
                                    <div key={event.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {event.tags.map(tag => (
                                                <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                                        <div className="text-gray-500 text-sm mb-3">
                                            <span className="font-medium text-gray-900">{event.date}</span> • {event.time}
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                                        <a
                                            href={getGoogleCalendarUrl(event)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm font-semibold"
                                        >
                                            + Add just this event
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
