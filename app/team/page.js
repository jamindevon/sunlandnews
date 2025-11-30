'use client';

export default function Team() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 border-b border-gray-100">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Meet the Team
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        The people behind Sunland News, dedicated to planting the garden of local journalism.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-4xl py-24">
                {/* The Team */}
                <section className="mb-24">
                    <div className="space-y-16">
                        {/* Founder */}
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-shrink-0 text-center md:text-left">
                                <div className="relative inline-block">
                                    <img
                                        src="/images/bio-photo.png"
                                        alt="Ja'Min Devon"
                                        className="w-48 h-48 object-cover object-[-15px_center] rounded-full shadow-xl"
                                        onError={(e) => {
                                            e.target.src = '/images/no-image-placeholder.png';
                                        }}
                                    />
                                </div>
                                <div className="mt-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-900">Ja'Min Devon</h3>
                                    <p className="text-primary font-medium">Founder</p>
                                </div>
                            </div>
                            <div className="flex-1 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Born, raised, and still living in Saint Lucie County, I have a passion for home, local people, and culture. I'm a storyteller who loves the written word and stays up late nights always thinking about how to make Sunland News the most meaningful and impactful news organization in the world.
                                </p>
                            </div>
                        </div>

                        {/* Future Team Members */}
                        <div className="text-center py-12 border-t border-gray-100">
                            <p className="text-gray-400 italic text-lg">More team members coming soon...</p>
                        </div>
                    </div>
                </section>

                {/* Join Us */}
                <section className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Team</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        We're always looking for passionate individuals who share our vision for local journalism.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/30">
                            Get in Touch
                        </a>
                        <div className="inline-flex items-center justify-center px-8 py-4 bg-gray-50 text-gray-400 font-medium rounded-xl border border-gray-100 cursor-default">
                            Careers Page Coming Soon
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
