import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center flex-col py-12 px-4">
      <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-xl border border-gray-100 animate-fade-in-up">
        <div className="mb-6 text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
          >
            Return to home
          </Link>
          <Link
            href="/stories"
            className="px-6 py-3 bg-white text-primary border border-primary font-medium rounded-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
          >
            Browse stories
          </Link>
        </div>
      </div>
    </div>
  );
} 