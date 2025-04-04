import Link from 'next/link';

export default function Careers() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
            <div className="text-center px-4 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Join Our Team</h1>
              <p className="text-xl text-gray-700">Opportunities at Sunland News</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 text-center animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-primary/70 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
          </div>
          
          <div className="space-y-6 mb-8">
            <p className="text-xl text-gray-700 leading-relaxed">
              We're currently building our careers page. Please check back soon for open positions at Sunland News.
            </p>
            <p className="text-gray-600">
              In the meantime, you can reach out to us directly if you're interested in joining our team.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 