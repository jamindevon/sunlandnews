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

            <div className="max-w-5xl mx-auto px-4 space-y-8">

                {/* Quick Actions Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Calendar Link Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Your Calendar Link</h2>
                        </div>
                        <p className="text-gray-500 text-sm mb-4 flex-grow">
                            This is your unique magic link. Add it to Apple, Google, or Outlook to see your personalized events.
                        </p>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                readOnly
                                value={`${window.location.origin}/cal/${token}`}
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 font-mono truncate"
                            />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.origin}/cal/${token}`);
                                    setMessage('Copied!');
                                    setTimeout(() => setMessage(''), 2000);
                                }}
                                className="bg-black text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors"
                            >
                                {message === 'Copied!' ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <Link href={`/calendar/setup?token=${token}`} className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1">
                            View Setup Instructions <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>

                    {/* Edit Preferences Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Personalization</h2>
                        </div>
                        <p className="text-gray-500 text-sm mb-6 flex-grow">
                            Update your interests, availability, and location settings to refine which events appear on your calendar.
                        </p>
                        <Link
                            href={`/calendar/setup?token=${token}&edit=true`}
                            className="w-full bg-white border-2 border-gray-200 text-gray-900 px-4 py-3 rounded-xl font-bold text-sm hover:border-primary hover:text-primary transition-all text-center block"
                        >
                            Update Preferences
                        </Link>
                    </div>
                </div>

                {/* Preferences Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="text-lg font-bold text-gray-900">Current Settings</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-pink-400"></span> Interests
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {preferences.interests?.length > 0 ? (
                                        preferences.interests.map(i => (
                                            <span key={i} className="bg-pink-50 text-pink-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-pink-100">
                                                {i}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 text-sm italic">None selected</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-400"></span> Availability
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {preferences.availability?.length > 0 ? (
                                        preferences.availability.map(i => (
                                            <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100">
                                                {i}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 text-sm italic">None selected</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400"></span> Location
                                </h3>
                                <span className="text-gray-900 font-medium block p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    {preferences.location_preference === 'fort_pierce' && '📍 Fort Pierce Only'}
                                    {preferences.location_preference === 'psl_fp' && '📍 PSL & Fort Pierce'}
                                    {preferences.location_preference === 'all_slc' && '📍 All St. Lucie County'}
                                    {preferences.location_preference === 'treasure_coast' && '📍 Treasure Coast'}
                                    {!preferences.location_preference && <span className="text-gray-400 italic">Not set</span>}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

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
