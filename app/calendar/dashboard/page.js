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

    const handleLogout = () => {
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

    if (!user) return null;

    const calendarUrl = `${window.location.origin}/cal/${token}`;

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="bg-white shadow">
                <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Calendar Dashboard</h1>
                    <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-900">
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">

                {/* Status Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Subscription Status</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${user.subscription_status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {user.subscription_status?.toUpperCase()}
                        </span>
                    </div>
                    <p className="text-gray-600">
                        Member since: {new Date(user.created_at).toLocaleDateString()}
                    </p>
                </div>

                {/* Calendar Link Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Your Calendar Link</h2>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            readOnly
                            value={calendarUrl}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600"
                        />
                        <button
                            onClick={() => navigator.clipboard.writeText(calendarUrl)}
                            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800"
                        >
                            Copy
                        </button>
                    </div>
                    <div className="mt-4">
                        <Link href={`/calendar/setup?token=${token}`} className="text-primary font-bold hover:underline text-sm">
                            View Setup Instructions &rarr;
                        </Link>
                    </div>
                </div>

                {/* Personalization Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Personalize Your Events</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">What are you interested in?</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {['Food & Drink', 'Live Music', 'Arts & Culture', 'Family & Kids', 'Outdoors', 'Nightlife', 'Workshops'].map((interest) => (
                                    <label key={interest} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={preferences.interests.includes(interest)}
                                            onChange={() => handleInterestChange(interest)}
                                            className="w-5 h-5 text-primary rounded focus:ring-primary"
                                        />
                                        <span className="text-gray-700">{interest}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Preferences'}
                            </button>
                            {message && <span className="ml-4 text-green-600 font-medium">{message}</span>}
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
