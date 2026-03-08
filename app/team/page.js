'use client';

export default function Team() {
    return (
        <div className="min-h-screen bg-white font-sans text-black selection:bg-brutalPink selection:text-white">
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 border-b-2 border-black bg-brutalYellow">
                <div className="container mx-auto max-w-4xl text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-black mb-6 leading-tight uppercase tracking-tight">
                        Meet the Team
                    </h1>
                    <p className="text-xl md:text-2xl font-bold text-gray-800 max-w-2xl mx-auto leading-relaxed">
                        The people behind Sunland News, dedicated to planting the garden of local journalism.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-4xl py-24">
                {/* The Team */}
                <section className="mb-24">
                    <div className="space-y-16">
                        {/* Founder */}
                        <div className="flex flex-col md:flex-row items-center gap-12 bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-3xl relative overflow-hidden group">
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "16px 16px" }}></div>
                            <div className="flex-shrink-0 text-center relative z-10 w-full md:w-auto flex flex-col items-center">
                                <div className="relative inline-block border-4 border-black rounded-full overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)] group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all">
                                    <img
                                        src="/images/bio-photo.png"
                                        alt="Ja'Min Devon"
                                        className="w-56 h-56 object-cover object-[-15px_center]"
                                        onError={(e) => {
                                            e.target.src = '/images/no-image-placeholder.png';
                                        }}
                                    />
                                </div>
                                <div className="mt-8 bg-brutalBlue py-2 px-6 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] inline-block transform -rotate-2">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-wider">Ja'Min Devon</h3>
                                    <p className="text-black font-black uppercase text-sm bg-white inline-block px-2 mt-1">Founder</p>
                                </div>
                            </div>
                            <div className="flex-1 text-xl text-gray-800 font-bold leading-relaxed relative z-10 border-l-0 md:border-l-4 border-black pt-8 md:pt-0 pl-0 md:pl-12">
                                <p>
                                    Born, raised, and still living in Saint Lucie County, I have a passion for home, local people, and culture. I'm a storyteller who loves the written word and stays up late nights always thinking about how to make Sunland News the most meaningful and impactful news organization in the world.
                                </p>
                            </div>
                        </div>

                        {/* Future Team Members */}
                        <div className="text-center py-12 border-4 border-black border-dashed rounded-3xl bg-gray-50 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                            <p className="text-black font-black uppercase tracking-widest text-xl">More team members coming soon...</p>
                        </div>
                    </div>
                </section>

                {/* Join Us */}
                <section className="text-center max-w-2xl mx-auto bg-brutalBg p-12 border-4 border-black rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] relative z-10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-brutalBlue rounded-full blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-brutalYellow rounded-full blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>

                    <h2 className="text-4xl font-black text-black mb-6 uppercase tracking-tight relative z-10">Join Our Team</h2>
                    <p className="text-xl font-bold text-gray-800 mb-10 relative z-10 leading-relaxed">
                        We're always looking for passionate individuals who share our vision for local journalism.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                        <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-black text-lg uppercase tracking-wider rounded-xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none border-4 border-black transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                            Get in Touch
                        </a>
                        <div className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-600 font-black text-lg uppercase tracking-wider rounded-xl border-4 border-dashed border-gray-400 cursor-not-allowed">
                            Careers Coming Soon
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
