'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CalendarLoginPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const res = await fetch('/api/auth/magic-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage('Check your email! We sent you a magic link to access your dashboard.');
            } else {
                setStatus('error');
                setMessage(data.error || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Access Your Calendar
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter the email you used to subscribe.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {status === 'success' ? (
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Email Sent!</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                {message}
                            </p>
                            <div className="mt-6">
                                <Link href="/" className="text-primary hover:text-primary/80 font-medium">
                                    Return Home
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    />
                                </div>
                            </div>

                            {status === 'error' && (
                                <div className="text-red-600 text-sm text-center">
                                    {message}
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${status === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
                                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                                >
                                    {status === 'loading' ? 'Sending...' : 'Send Magic Link'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
