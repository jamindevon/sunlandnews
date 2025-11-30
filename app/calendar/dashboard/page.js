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
                <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Calendar Dashboard</h1>
                    <button onClick={handleSignOut} className="text-sm text-gray-500 hover:text-red-600 font-medium">
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 space-y-6">

                {/* Subscription Status */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Subscription Status</h2>
                            <p className="text-gray-500 text-sm">Member since: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            {user?.subscription_status || 'Active'}
                        </span>
                    </div>
                </div>

                {/* Calendar Link */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Your Calendar Link</h2>
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            readOnly
                            value={`${window.location.origin}/cal/${token}`}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600 font-mono"
                        />
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/cal/${token}`);
                                setMessage('Copied!');
                                setTimeout(() => setMessage(''), 2000);
                            }}
                            className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors"
                        >
                            {message === 'Copied!' ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <Link href={`/calendar/setup?token=${token}`} className="text-primary font-bold text-sm hover:underline">
                        View Setup Instructions &rarr;
                    </Link>
                </div>

                {/* Preferences Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Your Preferences</h2>
                        <Link
                            href={`/calendar/setup?token=${token}&edit=true`}
                            className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/20 transition-colors"
                        >
                            Edit Preferences
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Interests</h3>
                            <div className="flex flex-wrap gap-2">
                                {preferences.interests.length > 0 ? (
                                    preferences.interests.map(i => (
                                        <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {i}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400 text-sm italic">None selected</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Availability</h3>
                            <div className="flex flex-wrap gap-2">
                                {preferences.availability?.length > 0 ? (
                                    preferences.availability.map(i => (
                                        <span key={i} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {i}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400 text-sm italic">None selected</span>
                                )}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Location</h3>
                            <span className="text-gray-800 font-medium">
                                {preferences.location_preference === 'fort_pierce' && 'Fort Pierce Only'}
                                {preferences.location_preference === 'psl_fp' && 'PSL & Fort Pierce'}
                                {preferences.location_preference === 'all_slc' && 'All St. Lucie County'}
                                {preferences.location_preference === 'treasure_coast' && 'Treasure Coast'}
                                {!preferences.location_preference && <span className="text-gray-400 text-sm italic">Not set</span>}
                            </span>
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
