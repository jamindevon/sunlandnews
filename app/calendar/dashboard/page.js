'use client';

import Link from 'next/link';

export default function CalendarDashboard() {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto max-w-4xl px-4 py-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Calendar Dashboard</h1>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="text-6xl mb-6">📅</div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Your Calendar is Active</h2>
                    <p className="text-gray-600 mb-8">
                        You can manage your preferences and subscription settings here.
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link
                            href="/calendar/setup"
                            className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            View Setup Instructions
                        </Link>
                        <Link
                            href="/"
                            className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
