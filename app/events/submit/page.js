'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitEventPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        eventName: '',
        eventDate: '',
        startTime: '',
        endTime: '',
        venue: '',
        address: '',
        isRecurring: false,
        link: '',
        isSponsored: false,
        // Honeypot field (hidden from users)
        website_url: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/events/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                // Redirect to thank you page or show success message
                alert('Event submitted successfully! It will be reviewed shortly.');
                router.push('/');
            } else {
                alert('Something went wrong. Please try again.');
                console.error('Submission error:', data.error);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-brutalBg font-sans text-black selection:bg-brutalPink selection:text-white pb-24">
            {/* Hero Section */}
            <section className="pt-16 pb-12 px-4 border-b-4 border-black bg-brutalBlue relative overflow-hidden mb-16">
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}></div>
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block py-2 px-4 bg-brutalYellow text-black text-sm font-black mb-6 tracking-widest uppercase border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] transform -rotate-2">
                        Community Calendar
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-black mb-6 uppercase tracking-tight">
                        Submit an Event
                    </h1>
                    <p className="text-lg md:text-xl font-bold text-gray-800 max-w-2xl mx-auto bg-white inline-block px-6 py-3 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl transform rotate-1">
                        Share your local event with the Sunland community. <br className="hidden md:block" />
                        All submissions are reviewed by our team before publishing.
                    </p>
                </div>
            </section>

            <div className="max-w-3xl mx-auto px-4">
                <form onSubmit={handleSubmit} className="space-y-12">

                    {/* Honeypot Field - Hidden */}
                    <div className="hidden">
                        <label>Website URL</label>
                        <input
                            type="text"
                            name="website_url"
                            value={formData.website_url}
                            onChange={handleChange}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    {/* Section: Your Info */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative">
                        <div className="absolute -top-6 -left-4 w-12 h-12 bg-brutalYellow border-4 border-black rounded-full flex items-center justify-center font-black text-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] transform -rotate-6">
                            1
                        </div>
                        <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-8 border-b-4 border-black pb-4">Your Information</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-black text-black uppercase tracking-wider mb-2">
                                    Your Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Jane Doe"
                                    className="w-full px-4 py-3 bg-white border-2 border-black font-bold text-gray-900 rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-black uppercase tracking-wider mb-2">
                                    Your Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="jane@example.com"
                                    className="w-full px-4 py-3 bg-white border-2 border-black font-bold text-gray-900 rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section: Event Details */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative">
                        <div className="absolute -top-6 -left-4 w-12 h-12 bg-[#ff4365] text-white border-4 border-black rounded-full flex items-center justify-center font-black text-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] transform rotate-6">
                            2
                        </div>
                        <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-8 border-b-4 border-black pb-4">Event Details</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-black text-black uppercase tracking-wider mb-2">
                                    Event Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="eventName"
                                    required
                                    value={formData.eventName}
                                    onChange={handleChange}
                                    placeholder="e.g. Downtown Jazz Festival"
                                    className="w-full px-4 py-3 bg-white border-2 border-black font-bold text-gray-900 rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-black text-black uppercase tracking-wider mb-2">
                                        Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="eventDate"
                                        required
                                        value={formData.eventDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border-2 border-black font-bold text-gray-900 rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-black uppercase tracking-wider mb-2">
                                        Start Time <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        required
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border-2 border-black font-bold text-gray-900 rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-black text-black uppercase tracking-wider mb-2">
                                        End Time <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="endTime"
                                        required
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white border-2 border-black font-bold text-gray-900 rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-brutalBlue/10 rounded-xl border-4 border-black border-dashed transition-all hover:bg-brutalBlue/20">
                                <div className="relative flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isRecurring"
                                        id="isRecurring"
                                        checked={formData.isRecurring}
                                        onChange={handleChange}
                                        className="appearance-none w-8 h-8 rounded-lg bg-white border-2 border-black checked:bg-brutalYellow checked:border-black transition-all cursor-pointer peer relative z-10"
                                    />
                                    <svg className="absolute w-6 h-6 z-20 top-1 left-1 pointer-events-none opacity-0 peer-checked:opacity-100 peer-checked:text-black stroke-[4px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <label htmlFor="isRecurring" className="text-base font-bold text-black cursor-pointer select-none">
                                    This is a recurring event (e.g. every week)
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Section: Location */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative">
                        <div className="absolute -top-6 -left-4 w-12 h-12 bg-orange-400 border-4 border-black rounded-full flex items-center justify-center font-black text-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] transform -rotate-3">
                            3
                        </div>
                        <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-8 border-b-4 border-black pb-4">Location</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-black text-black uppercase tracking-wider mb-2">
                                    Venue Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="venue"
                                    required
                                    value={formData.venue}
                                    onChange={handleChange}
                                    placeholder="e.g. Riverside Park"
                                    className="w-full px-4 py-3 bg-white border-2 border-black font-bold text-gray-900 rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-black text-black uppercase tracking-wider mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="123 Main St, Fort Pierce, FL"
                                    className="w-full px-4 py-3 bg-white border-2 border-black font-bold text-gray-900 rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section: More Info */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] relative">
                        <div className="absolute -top-6 -left-4 w-12 h-12 bg-green-400 border-4 border-black rounded-full flex items-center justify-center font-black text-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] transform rotate-1">
                            4
                        </div>
                        <h2 className="text-3xl font-black text-black uppercase tracking-tight mb-8 border-b-4 border-black pb-4">More Info</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-black text-black uppercase tracking-wider mb-2">
                                    Event Link
                                </label>
                                <input
                                    type="text"
                                    name="link"
                                    value={formData.link} // Changed 'link' to 'eventLink' based on Supabase target
                                    onChange={handleChange}
                                    placeholder="https://... or just a description"
                                    className="w-full px-4 py-3 bg-white border-2 border-black font-bold text-gray-900 rounded-xl focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                                />
                                <p className="text-sm font-bold text-gray-600 mt-2">Link to tickets, Facebook event, or website.</p>
                            </div>

                            <div className="flex items-start gap-4 p-6 bg-brutalYellow rounded-2xl border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all">
                                <div className="relative flex items-center mt-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="isSponsored"
                                        id="isSponsored"
                                        checked={formData.isSponsored}
                                        onChange={handleChange}
                                        className="appearance-none w-8 h-8 rounded-lg bg-white border-2 border-black checked:bg-black checked:border-black transition-all cursor-pointer peer relative z-10"
                                    />
                                    <svg className="absolute w-6 h-6 z-20 top-1 left-1 pointer-events-none opacity-0 peer-checked:opacity-100 peer-checked:text-brutalYellow stroke-[4px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <label htmlFor="isSponsored" className="text-base text-gray-900 cursor-pointer select-none">
                                    <span className="font-black block text-black mb-1 text-xl uppercase tracking-tight">Interested in a Sponsored Listing?</span>
                                    <span className="font-bold">Get your event featured at the top of the calendar and in our newsletter.</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 text-center pb-12">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full max-w-lg mx-auto py-5 px-8 text-xl font-black uppercase tracking-wider text-white rounded-2xl border-4 transition-all ${isSubmitting ? 'bg-gray-400 border-gray-500 translate-x-[4px] translate-y-[4px] cursor-not-allowed shadow-none' : 'bg-primary border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none'
                                }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Event'}
                        </button>
                        <p className="text-center font-bold text-gray-700 mt-6 bg-white inline-block px-4 py-2 border-2 border-black rounded-lg transform -rotate-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                            By submitting, you agree to our terms. All events are subject to approval.
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}
