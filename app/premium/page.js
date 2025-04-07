'use client';

import Link from 'next/link';

export default function Premium() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
            <div className="text-center px-4 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Join Sunland News</h1>
              <p className="text-xl text-gray-700">Choose how you want to be part of our community</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Free Newsletter */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 transform transition-all hover:shadow-xl duration-300 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Free Newsletter</h2>
            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">$0</span>
              <span className="text-gray-500 ml-1">/forever</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Daily newsletter</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Local news & updates</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Community updates</span>
            </li>
          </ul>
          
          <Link 
            href="/newsletter"
            className="block w-full px-8 py-3 bg-white text-primary border-2 border-primary font-medium rounded-lg text-center hover:bg-primary/5 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
          >
            Subscribe Free
          </Link>
        </div>

        {/* Monthly Support */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 transform transition-all hover:shadow-xl duration-300 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Monthly Supporter</h2>
            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">$7</span>
              <span className="text-gray-500 ml-1">/month</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Support local journalism</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Help us grow and improve</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Cancel anytime</span>
            </li>
          </ul>
          
          <a 
            href="https://buymeacoffee.com/sunland"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-8 py-3 bg-primary text-white font-medium rounded-lg text-center hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
          >
            Support Monthly
          </a>
        </div>

        {/* Yearly Support */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 transform transition-all hover:shadow-xl duration-300 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
          <div className="flex flex-col items-center text-center mb-8">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-medium text-sm mb-2">BEST VALUE</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Yearly Supporter</h2>
            <div className="mt-4">
              <span className="text-3xl font-bold text-gray-900">$70</span>
              <span className="text-gray-500 ml-1">/year</span>
            </div>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Save $14 compared to monthly</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Support local journalism</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Help us grow and improve</span>
            </li>
          </ul>
          
          <a 
            href="https://buymeacoffee.com/sunland"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-8 py-3 bg-primary text-white font-medium rounded-lg text-center hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
          >
            Support Yearly
          </a>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mb-16 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-3">How does my support help?</h3>
            <p className="text-gray-700">
              Your support helps us continue delivering quality local journalism to St. Lucie County. It allows us to invest in better reporting, community events, and digital resources for our readers.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-3">Can I cancel my support?</h3>
            <p className="text-gray-700">
              Yes, you can cancel your support at any time. Monthly support will continue until the end of your billing period.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-3">How do I manage my support?</h3>
            <p className="text-gray-700">
              You can manage your support through your Buy Me a Coffee account. This includes updating your payment method, changing your support level, or canceling your support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 