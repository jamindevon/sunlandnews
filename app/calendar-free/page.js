'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function CalendarFreePage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        zipCode: '',
        isParent: '',
        interests: [],
        ageRange: '',
        isBusinessOwner: '',
        email: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleCheckboxChange = (value) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(value)
                ? prev.interests.filter(i => i !== value)
                : [...prev.interests, value]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await fetch('/api/calendar-free-signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    ...formData
                }),
            });

            setStep(2);
        } catch (error) {
            console.error('Survey submission error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const getSubscriptionUrl = (category) => {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://sunlandnews.com';
        return `${baseUrl}/calendars/${category}`;
    };

    const getWebcalUrl = (category) => {
        return getSubscriptionUrl(category).replace('https://', 'webcal://');
    };

    if (step === 2) {
        return (
            <div className={`min-h-screen bg-slate-50 text-slate-900 ${inter.className}`}>
                <div className='max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
                    <div className='text-center mb-16'>
                        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl mb-6'>
                            ✓
                        </div>
                        <h1 className='text-4xl md:text-5xl font-bold text-slate-900 mb-6'>
                            Access Granted.
                        </h1>
                        <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
                            Your curated feeds are ready. Add them to your device with a single tap.
                        </p>
                    </div>

                    <div className='grid gap-8 md:grid-cols-3 mb-16'>
                        {[
                            { id: 'parent', name: 'Parent', desc: 'School board, holidays & testing.', icon: '📚' },
                            { id: 'civic', name: 'Civic', desc: 'Council, commission & zoning.', icon: '🏛️' },
                            { id: 'big-events', name: 'Big Events', desc: 'Festivals, parades & concerts.', icon: '🎉' },
                        ].map((calendar) => (
                            <div key={calendar.id} className='bg-white rounded-xl shadow-sm border border-slate-100 p-8 hover:shadow-md transition-all duration-300'>
                                <div className='text-4xl mb-6'>{calendar.icon}</div>
                                <h3 className='text-2xl font-bold text-slate-900 mb-2'>{calendar.name}</h3>
                                <p className='text-slate-500 mb-8 min-h-[48px]'>{calendar.desc}</p>
                                <div className='space-y-3'>
                                    <a
                                        href={getWebcalUrl(calendar.id)}
                                        className='block w-full bg-slate-900 text-white px-4 py-3 rounded-lg font-medium text-center hover:bg-black transition-colors'
                                    >
                                        Apple Calendar
                                    </a>
                                    <a
                                        href={`https://calendar.google.com/calendar/r?cid=${encodeURIComponent(getSubscriptionUrl(calendar.id))}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='block w-full bg-white text-slate-900 border border-slate-200 px-4 py-3 rounded-lg font-medium text-center hover:bg-slate-50 transition-colors'
                                    >
                                        Google Calendar
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='bg-slate-900 rounded-2xl p-12 text-center text-white'>
                        <h3 className='text-3xl font-bold mb-4'>Unlock the Full Experience</h3>
                        <p className='text-slate-300 text-lg mb-8 max-w-2xl mx-auto'>
                            Get access to Live Music, Date Night, Business, Family, and Outdoor calendars for just $39/year.
                        </p>
                        <Link href='/calendar' className='inline-block bg-white text-slate-900 px-8 py-4 rounded-lg font-bold hover:bg-slate-100 transition-colors'>
                            Upgrade to Calendar Club
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-white ${inter.className}`}>
            <div className='flex min-h-screen'>
                {/* Left Side - Content */}
                <div className='w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center'>
                    <div className='max-w-xl mx-auto w-full'>
                        <span className='inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-xs font-bold tracking-widest uppercase mb-8'>
                            Sunland News
                        </span>
                        <h1 className='text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight'>
                            Unlock St. Lucie's Best Events.
                        </h1>
                        <p className='text-xl text-slate-600 mb-12'>
                            Curated feeds for parents, civic leaders, and socialites. Free forever.
                        </p>

                        <form onSubmit={handleSubmit} className='space-y-8'>
                            <div className='space-y-6'>
                                <div className='grid grid-cols-2 gap-6'>
                                    <div>
                                        <label className='block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2'>ZIP Code</label>
                                        <input
                                            type='text'
                                            required
                                            value={formData.zipCode}
                                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                            className='w-full border-b-2 border-slate-200 py-3 text-lg focus:border-slate-900 focus:outline-none transition-colors bg-transparent'
                                            placeholder='34952'
                                        />
                                    </div>
                                    <div>
                                        <label className='block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2'>Age Range</label>
                                        <select
                                            value={formData.ageRange}
                                            onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                                            className='w-full border-b-2 border-slate-200 py-3 text-lg focus:border-slate-900 focus:outline-none transition-colors bg-transparent'
                                        >
                                            <option value=''>Select...</option>
                                            <option value='18-24'>18-24</option>
                                            <option value='25-34'>25-34</option>
                                            <option value='35-44'>35-44</option>
                                            <option value='45-54'>45-54</option>
                                            <option value='55-64'>55-64</option>
                                            <option value='65+'>65+</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4'>Interests</label>
                                    <div className='flex flex-wrap gap-3'>
                                        {['Music', 'Food & Drink', 'Family', 'Outdoor', 'Business', 'Arts'].map(interest => (
                                            <label key={interest} className='cursor-pointer'>
                                                <input
                                                    type='checkbox'
                                                    className='hidden'
                                                    checked={formData.interests.includes(interest)}
                                                    onChange={() => handleCheckboxChange(interest)}
                                                />
                                                <span className={`inline-block px-4 py-2 rounded-full border transition-all ${formData.interests.includes(interest)
                                                    ? 'bg-slate-900 text-white border-slate-900'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                                                    }`}>
                                                    {interest}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className='grid grid-cols-2 gap-6'>
                                    <div>
                                        <label className='block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3'>Parent?</label>
                                        <div className='flex gap-4'>
                                            {['Yes', 'No'].map(opt => (
                                                <label key={opt} className='cursor-pointer'>
                                                    <input
                                                        type='radio'
                                                        name='isParent'
                                                        value={opt.toLowerCase()}
                                                        checked={formData.isParent === opt.toLowerCase()}
                                                        onChange={(e) => setFormData({ ...formData, isParent: e.target.value })}
                                                        className='hidden'
                                                    />
                                                    <span className={`inline-block px-6 py-2 rounded-lg border transition-all ${formData.isParent === opt.toLowerCase()
                                                        ? 'bg-slate-100 border-slate-900 text-slate-900 font-bold'
                                                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                                                        }`}>
                                                        {opt}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className='block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3'>Business Owner?</label>
                                        <div className='flex gap-4'>
                                            {['Yes', 'No'].map(opt => (
                                                <label key={opt} className='cursor-pointer'>
                                                    <input
                                                        type='radio'
                                                        name='isBusinessOwner'
                                                        value={opt.toLowerCase()}
                                                        checked={formData.isBusinessOwner === opt.toLowerCase()}
                                                        onChange={(e) => setFormData({ ...formData, isBusinessOwner: e.target.value })}
                                                        className='hidden'
                                                    />
                                                    <span className={`inline-block px-6 py-2 rounded-lg border transition-all ${formData.isBusinessOwner === opt.toLowerCase()
                                                        ? 'bg-slate-100 border-slate-900 text-slate-900 font-bold'
                                                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                                                        }`}>
                                                        {opt}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2'>Email Address</label>
                                    <input
                                        type='email'
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className='w-full border-b-2 border-slate-200 py-3 text-lg focus:border-slate-900 focus:outline-none transition-colors bg-transparent'
                                        placeholder='you@example.com'
                                    />
                                </div>
                            </div>

                            <button
                                type='submit'
                                disabled={submitting}
                                className='group relative w-full bg-slate-900 text-white px-8 py-5 rounded-xl font-bold text-lg overflow-hidden transition-all hover:shadow-xl disabled:bg-slate-400'
                            >
                                <span className='relative z-10 flex items-center justify-center gap-2'>
                                    {submitting ? 'Processing...' : 'Unlock Calendars'}
                                    {!submitting && <span>→</span>}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Side - Visual */}
                <div className='hidden lg:block w-1/2 bg-slate-50 relative overflow-hidden'>
                    <div className='absolute inset-0 bg-[url("https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068&auto=format&fit=crop")] bg-cover bg-center opacity-10 grayscale mix-blend-multiply'></div>
                    <div className='absolute inset-0 bg-gradient-to-tr from-slate-100/50 to-transparent'></div>

                    <div className='absolute inset-0 flex items-center justify-center p-12'>
                        <div className='grid gap-6 w-full max-w-md opacity-80'>
                            <div className='bg-white p-6 rounded-2xl shadow-lg transform translate-x-4 rotate-2'>
                                <div className='flex gap-4 items-center mb-4'>
                                    <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-xl'>🍷</div>
                                    <div>
                                        <h4 className='font-bold text-slate-900'>Date Night</h4>
                                        <p className='text-xs text-slate-500'>Friday, 7:00 PM</p>
                                    </div>
                                </div>
                                <div className='h-2 bg-slate-100 rounded-full w-3/4'></div>
                            </div>

                            <div className='bg-white p-6 rounded-2xl shadow-lg transform -translate-x-4 -rotate-1'>
                                <div className='flex gap-4 items-center mb-4'>
                                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl'>🎸</div>
                                    <div>
                                        <h4 className='font-bold text-slate-900'>Live Jazz at the Inlet</h4>
                                        <p className='text-xs text-slate-500'>Saturday, 8:30 PM</p>
                                    </div>
                                </div>
                                <div className='h-2 bg-slate-100 rounded-full w-1/2'></div>
                            </div>

                            <div className='bg-white p-6 rounded-2xl shadow-lg transform translate-x-2 rotate-3'>
                                <div className='flex gap-4 items-center mb-4'>
                                    <div className='w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-xl'>🏖️</div>
                                    <div>
                                        <h4 className='font-bold text-slate-900'>Beach Cleanup & Yoga</h4>
                                        <p className='text-xs text-slate-500'>Sunday, 9:00 AM</p>
                                    </div>
                                </div>
                                <div className='h-2 bg-slate-100 rounded-full w-2/3'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
