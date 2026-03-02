'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function DashboardContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const urlToken = searchParams.get('token');

    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [preferences, setPreferences] = useState({
        interests: [],
        location_preference: 'all_slc'
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    // Initialize token from URL or LocalStorage
    useEffect(() => {
        if (urlToken) {
            localStorage.setItem('calendarToken', urlToken);
            setToken(urlToken);
            // Clean URL
            window.history.replaceState({}, '', '/calendar/dashboard');
        } else {
            const storedToken = localStorage.getItem('calendarToken');
            if (storedToken) {
                setToken(storedToken);
            } else {
                router.push('/calendar/login');
            }
        }
    }, [urlToken, router]);

    // Fetch User Data
    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                // We need an endpoint to get user data by token. 
                // For now, let's assume we can use the same session endpoint or a new one.
                // Let's use a new simple endpoint or reuse the session one if it returns enough info.
                // Actually, let's just fetch directly from Supabase client-side for simplicity if we had RLS, 
                // but we don't have auth session. 
                // So we need a server action or API route.
                // Let's create a quick API route for this: /api/user/preferences

                const res = await fetch(`/api/user/preferences?token=${token}`);
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                    setPreferences(data.preferences || { interests: [], location_preference: 'all_slc' });
                } else {
                    // Token invalid
                    localStorage.removeItem('calendarToken');
                    router.push('/calendar/login');
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, router]);

    const handleInterestChange = (interest) => {
        setPreferences(prev => {
            const newInterests = prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests: newInterests };
        });
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            const res = await fetch('/api/user/preferences', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, preferences }),
            });

            if (res.ok) {
                setMessage('Preferences saved successfully!');
                setTimeout(() => setMessage(''), 3000);
            } else {
                setMessage('Failed to save.');
            }
        } catch (error) {
            setMessage('Error saving preferences.');
        } finally {
            setSaving(false);
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('calendarToken');
        router.push('/calendar/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const getWebcalUrl = (path) => {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sunlandnews.com';
        return `${baseUrl}${path}`.replace(/^https?:\/\//, 'webcal://');
    };

    const getGoogleUrl = (path) => {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sunlandnews.com';
        const feedUrl = `${baseUrl}${path}`;
        const webcalUrl = feedUrl.replace(/^https?:\/\//, 'webcal://');
        return `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(webcalUrl)}`;
    };

    const MASTER_CALENDAR = {
        name: "The Master Calendar",
        desc: "Everything happening in St. Lucie County. (Includes all categories below)",
        path: "/calendars/all",
        icon: "👑",
        isPremium: true
    };

    const PREMIUM_CALENDARS = [
        { name: "Live Music", desc: "Concerts, local bands & acoustic sets.", path: "/calendars/live-music", icon: "🎸" },
        { name: "Date Night", desc: "Evening events, wine tastings & specials.", path: "/calendars/date-night", icon: "🍷" },
        { name: "Family", desc: "Kids activities, parks & family fun.", path: "/calendars/family", icon: "👨‍👩‍👧‍👦" },
        { name: "Outdoor", desc: "Nature walks, beach cleanups & yoga.", path: "/calendars/outdoor", icon: "🌳" },
    ];

    const FREE_CALENDARS = [
        { name: "Parent", desc: "School board, holidays & testing.", path: "/calendars/parent", icon: "📚" },
        { name: "Civic", desc: "City & county meetings.", path: "/calendars/civic", icon: "🏛️" },
        { name: "Big Events", desc: "Major festivals & parades.", path: "/calendars/big-events", icon: "🎉" },
        { name: "Business", desc: "Networking & chamber events.", path: "/calendars/business", icon: "💼" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="bg-white border-b border-gray-200 mb-8">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">Calendar Dashboard</h1>
                            <p className="text-gray-500">Welcome back, {user?.email}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {user?.subscription_status || 'Active'}
                            </span>
                            <button onClick={handleSignOut} className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 space-y-12">

                {/* 1. MASTER CALENDAR */}
                <section>
                    <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl">👑</div>
                        <h2 className="text-3xl font-bold mb-2 relative z-10">The Master Calendar</h2>
                        <p className="text-indigo-200 mb-8 max-w-lg relative z-10">
                            Create one subscription and get <strong>everything</strong>. Includes all 8 categories automatically.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                            <a href={getWebcalUrl(MASTER_CALENDAR.path)} className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                                🍎 Add to Apple Calendar
                            </a>
                            <a href={getGoogleUrl(MASTER_CALENDAR.path)} target="_blank" rel="noopener noreferrer" className="bg-indigo-800 text-white border border-indigo-700 px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                                📅 Add to Google Calendar
                            </a>
                        </div>
                    </div>
                </section>

                <div className="border-t border-gray-200"></div>

                {/* 2. PREMIUM CALENDARS */}
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="bg-purple-100 text-purple-700 p-1 rounded">💎</span> Premium Feeds
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {PREMIUM_CALENDARS.map(cal => (
                            <div key={cal.name} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="text-3xl">{cal.icon}</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{cal.name}</h4>
                                            <p className="text-xs text-gray-500">{cal.desc}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <a href={getWebcalUrl(cal.path)} className="flex-1 bg-gray-50 text-gray-900 text-xs font-bold py-2 rounded-lg text-center hover:bg-gray-100">
                                        Apple
                                    </a>
                                    <a href={getGoogleUrl(cal.path)} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white border border-gray-200 text-gray-700 text-xs font-bold py-2 rounded-lg text-center hover:bg-gray-50">
                                        Google
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. FREE CALENDARS */}
                <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="bg-green-100 text-green-700 p-1 rounded">🆓</span> Free Feeds
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {FREE_CALENDARS.map(cal => (
                            <div key={cal.name} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                                <div className="mb-4">
                                    <div className="text-2xl mb-2">{cal.icon}</div>
                                    <h4 className="font-bold text-gray-900 text-sm">{cal.name}</h4>
                                    <p className="text-xs text-gray-500">{cal.desc}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <a href={getWebcalUrl(cal.path)} className="bg-gray-50 text-gray-900 text-xs font-bold py-2 rounded-lg text-center hover:bg-gray-100 block">
                                        Add to Apple
                                    </a>
                                    <a href={getGoogleUrl(cal.path)} target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-2 rounded-lg text-center hover:bg-gray-50 block">
                                        Add to Google
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}

export default function CalendarDashboard() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>}>
            <DashboardContent />
        </Suspense>
    );
}
