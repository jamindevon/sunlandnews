'use client';

import { useState, useEffect } from 'react';
import { events } from '@/app/data/events';

export default function CalendarFeedbackPage() {
    const [host, setHost] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHost(window.location.host);
        }
    }, []);

    // Generate URLs for subscription (Master Feed containing all 10 events)
    const getSubscriptionUrls = () => {
        const protocol = typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'https' : 'http';
        const feedUrl = `${protocol}://${host}/api/calendar-feed`;
        const webcalUrl = feedUrl.replace(/^http/, 'webcal');
        const googleUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(feedUrl)}`;
        return { webcalUrl, googleUrl, feedUrl };
    };

    const { webcalUrl, googleUrl, feedUrl } = getSubscriptionUrls();

    // Individual Google Calendar redirect URL generator
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

    // Client-side single event ICS downloader
    const downloadSingleIcs = (event) => {
        const [startGcal, endGcal] = event.gcalTime.split('/');
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Sunland News//Calendar Event//EN',
            'BEGIN:VEVENT',
            `UID:event-${event.id}-${Date.now()}@sunlandnews.com`,
            `DTSTART;TZID=America/New_York:${startGcal}`,
            `DTEND;TZID=America/New_York:${endGcal}`,
            `SUMMARY:${event.title.replace(/[,;]/g, '\\$&')}`,
            `DESCRIPTION:${event.description.replace(/\n/g, '\\n').replace(/[,;]/g, '\\$&')}`,
            `LOCATION:${event.location.replace(/[,;]/g, '\\$&')}`,
            event.url ? `URL:${event.url}` : '',
            'END:VEVENT',
            'END:VCALENDAR'
        ].filter(Boolean).join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-brutalBg font-sans text-black p-4 md:p-8 selection:bg-brutalPink selection:text-white">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block py-1.5 px-4 rounded-lg bg-brutalYellow border-2 border-black shadow-brutal-sm text-black text-sm font-black mb-6 tracking-wider uppercase">
                        Sunland Events Portal
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-4 leading-tight tracking-tight uppercase">
                        Add Events To Your Calendar
                    </h1>
                    <p className="text-lg md:text-xl font-bold text-gray-800 max-w-2xl mx-auto">
                        Quickly sync this week's featured local events (June 5 – June 7, 2026) directly to your phone or calendar app.
                    </p>
                </div>

                {/* ADD ALL SECTION */}
                <div className="bg-white border-4 border-black p-6 md:p-8 rounded-[2rem] shadow-brutal mb-12 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-brutalPink rounded-full border-4 border-black opacity-10"></div>
                    
                    <h2 className="text-2xl md:text-3xl font-black text-black uppercase mb-4 tracking-tight">
                        ⚡ Add All 10 Events in One Click
                    </h2>
                    <p className="text-gray-700 font-bold mb-6">
                        Subscribe to the complete featured events feed. Your calendar will automatically sync these details.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <a
                            href={webcalUrl}
                            className="inline-flex items-center justify-center bg-white text-black font-black uppercase border-4 border-black py-4 px-6 rounded-xl shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-center"
                        >
                            🍏 Apple Calendar
                        </a>
                        <a
                            href={googleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-brutalYellow text-black font-black uppercase border-4 border-black py-4 px-6 rounded-xl shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-center"
                            onClick={(e) => {
                                if (host.includes('localhost')) {
                                    e.preventDefault();
                                    alert('Google Calendar Sync requires a public URL. This link will work seamlessly on the live domain! To test locally, use Apple Calendar or download the ICS file.');
                                }
                            }}
                        >
                            📅 Google Calendar
                        </a>
                        <a
                            href={feedUrl}
                            download="sunland-events.ics"
                            className="inline-flex items-center justify-center bg-brutalBlue text-white font-black uppercase border-4 border-black py-4 px-6 rounded-xl shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brutal-sm active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-center"
                        >
                            📥 Download .ICS file
                        </a>
                    </div>
                </div>

                {/* INDIVIDUAL EVENTS LIST */}
                <h2 className="text-2xl font-black text-black uppercase mb-6 tracking-tight">
                    📌 Or Add Events Individually:
                </h2>
                
                <div className="space-y-6">
                    {events.map((event) => (
                        <div 
                            key={event.id} 
                            className="bg-white border-4 border-black p-6 rounded-2xl shadow-brutal hover:shadow-brutal-lg transition-all duration-200"
                        >
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {event.tags.map((tag, idx) => {
                                    const colors = ['bg-brutalYellow', 'bg-brutalBlue text-white', 'bg-brutalPink text-white', 'bg-green-200'];
                                    const colorClass = colors[idx % colors.length];
                                    return (
                                        <span 
                                            key={tag} 
                                            className={`text-xs font-black px-2.5 py-1 rounded border-2 border-black uppercase ${colorClass}`}
                                        >
                                            {tag}
                                        </span>
                                    );
                                })}
                            </div>

                            {/* Event details */}
                            <h3 className="text-2xl font-black text-black mb-1">{event.title}</h3>
                            <div className="text-primary font-black uppercase text-sm mb-3">
                                📅 {event.date} &nbsp;•&nbsp; 🕒 {event.time}
                            </div>
                            
                            <div className="text-sm font-bold text-gray-700 mb-4 flex items-center">
                                📍 {event.location}
                            </div>

                            <p className="text-gray-800 font-medium mb-6 whitespace-pre-wrap leading-relaxed border-l-4 border-black pl-3 bg-gray-50/50 py-2 rounded">
                                {event.description}
                            </p>

                            {/* Individual Add buttons */}
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={getGoogleCalendarUrl(event)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center bg-brutalYellow text-black font-extrabold uppercase border-2 border-black py-2 px-4 rounded shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all text-xs"
                                >
                                    + Add to Google
                                </a>
                                <button
                                    onClick={() => downloadSingleIcs(event)}
                                    className="inline-flex items-center justify-center bg-white text-black font-extrabold uppercase border-2 border-black py-2 px-4 rounded shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all text-xs"
                                >
                                    📥 Download ICS (Apple/Outlook)
                                </button>
                                {event.url && (
                                    <a
                                        href={event.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center bg-gray-100 text-black font-extrabold uppercase border-2 border-black py-2 px-4 rounded shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all text-xs"
                                    >
                                        🔗 Event Details Page
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center text-sm font-bold text-gray-500">
                    © 2026 Sunland News • Built for St. Lucie County, Florida
                </div>

            </div>
        </div>
    );
}
