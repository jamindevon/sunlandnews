'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function StoriesError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Stories page error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center flex-col py-12 px-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-xl border border-gray-100 animate-fade-in-up">
        <div className="mb-6 text-orange-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to load stories</h2>
        <p className="text-gray-600 mb-6">
          We're having trouble connecting to our content server. This could be a temporary issue.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-white text-primary border border-primary font-medium rounded-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
          >
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
} 