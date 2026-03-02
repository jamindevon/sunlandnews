'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function CalendarClubMemberPage() {
    const searchParams = useSearchParams();
    const [validating, setValidating] = useState(true);
    const [valid, setValid] = useState(false);
    const [selectedFeeds, setSelectedFeeds] = useState([
        'parent', 'civic', 'big-events', 'live-music', 'date-night', 'business', 'family', 'outdoor'
    ]);

    useEffect(() => {
        const sessionId = searchParams.get('session_id');

        if (!sessionId) {
            setValidating(false);
            return;
        }

        fetch(`/api/checkout/session?session_id=${sessionId}`)
            .then(res => res.json())
            .then(data => {
                if (data.token || data.success) {
                    setValid(true);
                }
                setValidating(false);
            })
            .catch(() => {
                setValidating(false);
            });
    }, [searchParams]);

    const toggleFeed = (feed) => {
        setSelectedFeeds(prev =>
            prev.includes(feed)
                ? prev.filter(f => f !== feed)
                : [...prev, feed]
        );
    };

    const getSubscriptionUrl = (category) => {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sunlandnews.com';
        return `${baseUrl}/calendars/${category}`;
    };

    const getWebcalUrl = (category) => {
        return getSubscriptionUrl(category).replace('https://', 'webcal://');
    };

    const feeds = [
        { id: 'parent', name: 'Parent Calendar', emoji: '📚', description: 'School board, early release, holidays', tier: 'free' },
        { id: 'civic', name: 'Civic Calendar', emoji: '🏛️', description: 'City Council, County Commission, Planning', tier: 'free' },
        { id: 'big-events', name: 'Big Events', emoji: '🎉', description: 'Major festivals, concerts, parades', tier: 'free' },
        { id: 'live-music', name: 'Live Music', emoji: '🎸', description: 'Local bands, jazz nights, acoustic shows', tier: 'paid' },
        { id: 'date-night', name: 'Date Night', emoji: '💕', description: 'Romantic events, wine tastings, art walks', tier: 'paid' },
        { id: 'business', name: 'Business & Networking', emoji: '💼', description: 'Chamber events, meetups, workshops', tier: 'free' },
        { id: 'family', name: 'Family Activities', emoji: '👨‍👩‍👧‍👦', description: 'Kids events, movie nights, science days', tier: 'paid' },
        { id: 'outdoor', name: 'Outdoor & Fitness', emoji: '🏃', description: 'Yoga, 5Ks, hiking, outdoor activities', tier: 'paid' },
    ];

    if (validating) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4'></div>
                    <p className='text-gray-600'>Validating your membership...</p>
                </div>
            </div>
        );
    }

    if (!valid) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4'>
                <div className='bg-white rounded-2xl shadow-xl p-8 max-w-md text-center'>
                    <div className='text-6xl mb-4'>⚠️</div>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>Access Required</h1>
                    <p className='text-gray-600 mb-6'>
                        This page is for Calendar Club members only.
                    </p>
                    <a
                        href='/calendar'
                        className='inline-block bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all'
                    >
                        Join Calendar Club
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-4xl mx-auto'>
                <div className='text-center mb-12'>
                    <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-600 text-white text-4xl mb-6'>
                        ✨
                    </div>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                        Welcome to Calendar Club!
                    </h1>
                    <p className='text-xl text-gray-600'>
                        Select the calendars you want. They'll auto-update every month.
                    </p>
                </div>

                <div className='bg-white rounded-2xl shadow-xl p-8 mb-8'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>Your Calendars</h2>

                    <div className='space-y-4 mb-8'>
                        {feeds.map(feed => (
                            <div key={feed.id} className='border rounded-xl p-4'>
                                <label className='flex items-start cursor-pointer'>
                                    <input
                                        type='checkbox'
                                        checked={selectedFeeds.includes(feed.id)}
                                        onChange={() => toggleFeed(feed.id)}
                                        className='mt-1 mr-4 h-5 w-5'
                                    />
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-2 mb-1'>
                                            <span className='text-2xl'>{feed.emoji}</span>
                                            <h3 className='text-lg font-bold text-gray-900'>{feed.name}</h3>
                                            {feed.tier === 'paid' && (
                                                <span className='text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-bold'>
                                                    MEMBER
                                                </span>
                                            )}
                                        </div>
                                        <p className='text-gray-600 text-sm'>{feed.description}</p>

                                        {selectedFeeds.includes(feed.id) && (
                                            <div className='mt-3 flex flex-col sm:flex-row gap-2'>
                                                <a
                                                    href={getWebcalUrl(feed.id)}
                                                    className='flex-1 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold text-center hover:bg-gray-800 transition-all'
                                                >
                                                    Add to Apple Calendar
                                                </a>
                                                <a
                                                    href={`https://calendar.google.com/calendar/r?cid=${encodeURIComponent(getSubscriptionUrl(feed.id))}`}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold text-center hover:bg-blue-700 transition-all'
                                                >
                                                    Add to Google Calendar
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className='bg-blue-50 rounded-xl p-6'>
                        <h3 className='font-bold text-gray-900 mb-2'>📱 How it works</h3>
                        <ul className='text-sm text-gray-700 space-y-1'>
                            <li>• Tap "Add to Apple Calendar" or "Add to Google Calendar"</li>
                            <li>• Your phone will ask to subscribe - tap "Subscribe"</li>
                            <li>• Events auto-update every 12-24 hours</li>
                            <li>• Bookmark this page to add more calendars later</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
