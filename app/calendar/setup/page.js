'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CalendarSetup() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const isNew = searchParams.get('new');
    const [copied, setCopied] = useState(false);
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    const calendarUrl = token ? `${origin}/cal/${token}` : '';
    const webcalUrl = calendarUrl.replace(/^https?:\/\//, 'webcal://');
    const googleUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(webcalUrl)}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(calendarUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!token) {
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

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto max-w-2xl px-4 py-16">

                {isNew && (
                    <div className="mb-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-3xl mb-6">
                            🎉
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            You're in!
                        </h1>
                        <p className="text-xl text-gray-600">
                            Your personalized calendar is ready.
                        </p>
                    </div>
                )}

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
