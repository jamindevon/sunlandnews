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
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-gray-900 text-white py-16 px-4 rounded-3xl mb-12">
                <div className="container mx-auto max-w-4xl text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-sm font-bold mb-4 tracking-wide uppercase border border-primary/30">
                        Community Calendar
                    </span>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6">
                        Submit an Event
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Share your local event with the Sunland community. <br className="hidden md:block" />
                        All submissions are reviewed by our team before publishing.
                    </p>
                </div>
            </section>

            <div className="max-w-3xl mx-auto">
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
                    <div>
                        <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                            <span className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">1</span>
                            <h2 className="text-2xl font-bold text-gray-900">Your Information</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Your Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Jane Doe"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Your Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="jane@example.com"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section: Event Details */}
                    <div>
                        <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                            <span className="bg-purple-100 text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">2</span>
                            <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Event Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="eventName"
                                    required
                                    value={formData.eventName}
                                    onChange={handleChange}
                                    placeholder="e.g. Downtown Jazz Festival"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="eventDate"
                                        required
                                        value={formData.eventDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Start Time <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        required
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        End Time <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="endTime"
                                        required
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-colors hover:border-gray-200">
                                <input
                                    type="checkbox"
                                    name="isRecurring"
                                    id="isRecurring"
                                    checked={formData.isRecurring}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-primary rounded focus:ring-primary border-gray-300"
                                />
                                <label htmlFor="isRecurring" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                                    This is a recurring event (e.g. every week)
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Section: Location */}
                    <div>
                        <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                            <span className="bg-orange-100 text-orange-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">3</span>
                            <h2 className="text-2xl font-bold text-gray-900">Location</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Venue Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="venue"
                                    required
                                    value={formData.venue}
                                    onChange={handleChange}
                                    placeholder="e.g. Riverside Park"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="123 Main St, Fort Pierce, FL"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section: More Info */}
                    <div>
                        <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                            <span className="bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">4</span>
                            <h2 className="text-2xl font-bold text-gray-900">More Info</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Event Link
                                </label>
                                <input
                                    type="text"
                                    name="link"
                                    value={formData.link}
                                    onChange={handleChange}
                                    placeholder="https://... or just a description"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                />
                                <p className="text-xs text-gray-500 mt-2">Link to tickets, Facebook event, or website.</p>
                            </div>

                            <div className="flex items-start gap-4 p-6 bg-yellow-50 rounded-2xl border border-yellow-100 hover:shadow-sm transition-all">
                                <input
                                    type="checkbox"
                                    name="isSponsored"
                                    id="isSponsored"
                                    checked={formData.isSponsored}
                                    onChange={handleChange}
                                    className="w-6 h-6 text-primary rounded focus:ring-primary border-gray-300 mt-1"
                                />
                                <label htmlFor="isSponsored" className="text-base text-gray-700 cursor-pointer select-none">
                                    <span className="font-bold block text-gray-900 mb-1 text-lg">Interested in a Sponsored Listing?</span>
                                    Get your event featured at the top of the calendar and in our newsletter.
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-5 text-xl font-bold text-white rounded-2xl shadow-xl shadow-primary/20 transition-all transform hover:-translate-y-1 active:translate-y-0 ${isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
                                }`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Event'}
                        </button>
                        <p className="text-center text-sm text-gray-500 mt-6">
                            By submitting, you agree to our terms. All events are subject to approval.
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}
