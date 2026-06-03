'use client';

import { useState, useEffect } from 'react';
import { events } from '@/app/data/events';

export default function CalendarFeedbackPage() {
    const [host, setHost] = useState('');
    const [expandedEvents, setExpandedEvents] = useState({});

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHost(window.location.host);
        }
    }, []);

    const toggleExpand = (id) => {
        setExpandedEvents(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

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
            <div className="max-w-5xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="inline-block py-1 px-3 rounded bg-brutalYellow border-2 border-black shadow-brutal-sm text-black text-xs font-black mb-4 tracking-wider uppercase">
                        Sunland Events
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-black mb-3 leading-tight tracking-tight uppercase">
                        Add to Calendar
                    </h1>
                    <p className="text-base font-bold text-gray-700 max-w-xl mx-auto">
                        Sync the weekend's featured local events (June 5 – June 7, 2026) directly to your calendar app.
                    </p>
                </div>

                {/* ADD ALL SECTION */}
                <div className="bg-white border-4 border-black p-6 rounded-2xl shadow-brutal mb-10 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-brutalPink rounded-full border-4 border-black opacity-10"></div>
                    
                    <h2 className="text-xl md:text-2xl font-black text-black uppercase mb-2 tracking-tight">
                        ⚡ Sync All 10 Events
                    </h2>
                    <p className="text-gray-600 text-sm font-bold mb-5">
                        Subscribe once to have the entire list added to your device automatically.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <a
                            href={webcalUrl}
                            className="inline-flex items-center justify-center bg-white text-black font-black text-sm uppercase border-2 border-black py-3 px-4 rounded-lg shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-center"
                        >
                            🍏 Apple Calendar
                        </a>
                        <a
                            href={googleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-brutalYellow text-black font-black text-sm uppercase border-2 border-black py-3 px-4 rounded-lg shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-center"
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
                            className="inline-flex items-center justify-center bg-brutalBlue text-white font-black text-sm uppercase border-2 border-black py-3 px-4 rounded-lg shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brutal-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-center"
                        >
                            📥 Download .ICS File
                        </a>
                    </div>
                </div>

                {/* INDIVIDUAL EVENTS GRID */}
                <h2 className="text-xl font-black text-black uppercase mb-5 tracking-tight">
                    📌 Or Add Individually:
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map((event) => {
                        const isExpanded = !!expandedEvents[event.id];
                        return (
                            <div 
                                key={event.id} 
                                className="bg-white border-4 border-black p-5 rounded-xl shadow-brutal hover:shadow-brutal-lg transition-all duration-200 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Date & Time */}
                                    <div className="text-primary font-black uppercase text-xs mb-1.5">
                                        📅 {event.date} &nbsp;•&nbsp; 🕒 {event.time}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-black text-black mb-2 leading-tight">{event.title}</h3>
                                    
                                    {/* Location */}
                                    <div className="text-xs font-bold text-gray-500 mb-3 flex items-start gap-1">
                                        <span>📍</span>
                                        <span>{event.location}</span>
                                    </div>

                                    {/* Description (Expandable) */}
                                    <div className="mb-4">
                                        <p className={`text-gray-700 text-xs leading-relaxed font-semibold ${isExpanded ? 'whitespace-pre-wrap' : 'line-clamp-2'}`}>
                                            {event.description}
                                        </p>
                                        <button 
                                            onClick={() => toggleExpand(event.id)}
                                            className="text-[10px] font-black uppercase underline text-gray-500 hover:text-black mt-1.5 transition-colors block"
                                        >
                                            {isExpanded ? 'Show less ▲' : 'Read details ▼'}
                                        </button>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="border-t-2 border-black pt-4 mt-2 flex flex-wrap gap-2">
                                    <a
                                        href={getGoogleCalendarUrl(event)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center bg-brutalYellow text-black font-extrabold uppercase border-2 border-black py-1.5 px-3 rounded shadow-brutal-sm hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-none transition-all text-[10px]"
                                    >
                                        + Google Cal
                                    </a>
                                    <button
                                        onClick={() => downloadSingleIcs(event)}
                                        className="inline-flex items-center justify-center bg-white text-black font-extrabold uppercase border-2 border-black py-1.5 px-3 rounded shadow-brutal-sm hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-none transition-all text-[10px]"
                                    >
                                        🍏 Apple / ICS
                                    </button>
                                    {event.url && (
                                        <a
                                            href={event.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center bg-gray-100 text-black font-extrabold uppercase border-2 border-black py-1.5 px-3 rounded shadow-brutal-sm hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-none transition-all text-[10px]"
                                        >
                                            🔗 Link
                                        </a>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-16 text-center text-xs font-bold text-gray-500">
                    © 2026 Sunland News • St. Lucie County, Florida
                </div>

            </div>
        </div>
    );
}
