'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Premium() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
            <div className="text-center px-4 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Premium Membership</h1>
              <p className="text-xl text-gray-700">Stay in the loop—your way, with exclusive local benefits</p>
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          Choose the subscription that works for you and never miss out on what's happening in St. Lucie County.
        </p>
      </div>

      {/* Free Plan */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-10 border border-gray-100 transform transition-all hover:shadow-xl duration-300 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Free Plan</h2>
            <p className="text-gray-600">Basic access to local stories and updates</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-3xl font-bold text-gray-900">$0</span>
            <span className="text-gray-500 ml-1">forever</span>
          </div>
        </div>
        
        <ul className="space-y-4 mb-8">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-gray-700">5-day-a-week newsletter</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-gray-700">Full access to community features</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-gray-700">Local guides, news, and recommendations</span>
          </li>
        </ul>
        
        <Link 
          href="/newsletter"
          className="inline-block w-full md:w-auto px-8 py-3 bg-primary text-white font-medium rounded-lg text-center hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
        >
          Subscribe Free
        </Link>
      </div>

      {/* Premium Plans */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-xl p-8 mb-12 shadow-lg animate-fade-in-up" style={{animationDelay: '0.4s'}}>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Premium Plans</h2>
        
        {/* Plan Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg shadow-md border border-gray-200 overflow-hidden" role="group">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                selectedPlan === 'monthly' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`px-6 py-3 text-sm font-medium border-l border-gray-200 transition-all duration-200 ${
                selectedPlan === 'yearly' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Yearly
            </button>
            <button
              onClick={() => setSelectedPlan('lifetime')}
              className={`px-6 py-3 text-sm font-medium border-l border-gray-200 transition-all duration-200 ${
                selectedPlan === 'lifetime' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Lifetime
            </button>
          </div>
        </div>
        
        {/* Premium Plan Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 transform transition-all hover:shadow-xl duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full font-medium text-sm mb-2">MOST POPULAR</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Membership</h3>
              <p className="text-gray-600">Enhanced access with exclusive perks</p>
            </div>
            <div className="mt-4 md:mt-0">
              {selectedPlan === 'monthly' && (
                <>
                  <span className="text-3xl font-bold text-gray-900">$7</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </>
              )}
              {selectedPlan === 'yearly' && (
                <>
                  <span className="text-3xl font-bold text-gray-900">$70</span>
                  <span className="text-gray-500 ml-1">/year</span>
                  <div className="text-sm text-primary font-medium">Save $14 annually</div>
                </>
              )}
              {selectedPlan === 'lifetime' && (
                <>
                  <span className="text-3xl font-bold text-gray-900">$250</span>
                  <span className="text-gray-500 ml-1">one time</span>
                </>
              )}
            </div>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Everything in Free</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Bonus stories + premium issues</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Early access to new projects and digital guides</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">VIP community perks + invites</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-gray-700">Support local journalism that puts people first</span>
            </li>
          </ul>
          
          <button className="w-full px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300">
            Go Premium
          </button>
          
          <p className="text-sm text-gray-500 text-center mt-4">
            More perks coming soon—we're building as we grow.
          </p>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mb-16 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-3">What's included in the premium subscription?</h3>
            <p className="text-gray-700">
              Premium subscribers get all our daily newsletters, plus exclusive content, early access to new projects, invitations to community events, and more. You'll also be directly supporting local journalism in St. Lucie County.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-3">Can I cancel my subscription?</h3>
            <p className="text-gray-700">
              Yes, you can cancel your subscription at any time. Monthly and yearly subscriptions will continue until the end of your billing period.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold mb-3">How do I access premium content?</h3>
            <p className="text-gray-700">
              Premium content will be delivered directly to your inbox. You'll also have access to an exclusive subscriber portal where you can access all premium content and resources.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 rounded-xl p-8 text-center shadow-lg animate-fade-in-up" style={{animationDelay: '0.6s'}}>
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Choose the plan that's right for you and join our growing community of local news supporters.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/newsletter"
            className="px-6 py-3 bg-white text-primary border border-primary font-medium rounded-lg hover:bg-gray-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
          >
            Subscribe Free
          </Link>
          <button
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
          >
            Go Premium
          </button>
        </div>
      </div>
    </div>
  );
} 