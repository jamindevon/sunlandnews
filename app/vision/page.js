'use client';

import Link from 'next/link';

export default function Vision() {
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-brutalPink selection:text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 border-b-2 border-black bg-brutalBlue text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight uppercase tracking-tight">
            Our Vision
          </h1>
          <p className="text-xl md:text-2xl font-bold max-w-2xl mx-auto leading-relaxed text-white">
            Building a better future for local communities through connection and information.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-24 space-y-24">
        {/* The Mission */}
        <section className="text-center bg-brutalYellow border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-3xl transform -rotate-1 hover:rotate-0 transition-transform relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)", backgroundSize: "32px 32px" }}></div>
          <h2 className="text-3xl md:text-5xl font-black text-black mb-8 uppercase tracking-tight relative z-10">The Mission</h2>
          <div className="prose prose-lg prose-p:text-xl mx-auto text-black font-bold leading-relaxed relative z-10">
            <p className="mb-6">
              Sunland News is more than just a news platform—it's a movement to revitalize local journalism and community engagement. We believe that strong communities are built on informed citizens, and informed citizens need reliable, accessible local news.
            </p>
            <p className="bg-white inline-block px-6 py-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl mt-4">
              Our mission is to chase the sun and plant the garden. The garden is the stories, the resources, the tools—the things people need to grow where they are.
            </p>
          </div>
        </section>

        {/* The Future */}
        <section className="text-center bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-3xl">
          <h2 className="text-3xl md:text-5xl font-black text-black mb-8 uppercase tracking-tight">The Future</h2>
          <div className="prose prose-lg mx-auto text-gray-800 font-bold leading-relaxed">
            <p className="mb-6 text-xl">
              We're starting with St. Lucie County, but our vision extends far beyond. We're planning to launch four more editions across Florida in the next two years, focusing on cities and counties that have been underserved or forgotten.
            </p>
            <p className="mb-6 text-xl text-black bg-brutalBlue/20 border-l-4 border-black pl-4 py-2">
              We call these places news deserts. Our goal is to bring light to these areas, providing not just news, but the tools and resources communities need to thrive.
            </p>
            <p className="text-xl">
              By the end of 2025, we'll be expanding into podcasts and developing more tools to help people live more connected and local lives.
            </p>
          </div>
        </section>

        {/* Tools for Local Living */}
        <section className="text-center bg-brutalBg border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-3xl transform rotate-1 hover:rotate-0 transition-transform">
          <h2 className="text-3xl md:text-5xl font-black text-black mb-8 uppercase tracking-tight">Tools for Local Living</h2>
          <div className="prose prose-lg mx-auto text-gray-800 font-bold leading-relaxed">
            <p className="mb-6 text-xl">
              We're building more than just a news platform. We're creating tools that help you live a more connected, local life. From restaurant guides to job boards, from event calendars to community directories—we're developing resources that make it easier to be part of your community.
            </p>
            <p className="bg-primary text-white p-4 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl text-xl">
              Our goal is to be your one-stop destination for everything local—not just news, but the tools and resources you need to thrive in your community.
            </p>
          </div>
        </section>

        {/* The Impact */}
        <section className="text-center bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brutalPink rounded-full blur-[40px] opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
          <h2 className="text-3xl md:text-5xl font-black text-black mb-8 uppercase tracking-tight relative z-10">The Impact</h2>
          <div className="prose prose-lg mx-auto text-gray-800 font-bold leading-relaxed relative z-10">
            <p className="mb-6 text-xl">
              We believe that when communities have access to reliable local news and resources, they become stronger, more connected, and more resilient. Our work is about more than just delivering information—it's about building bridges between people and their communities.
            </p>
            <p className="text-xl">
              By focusing on underserved areas and providing comprehensive local coverage, we're helping to create more informed, engaged, and connected communities across Florida.
            </p>
          </div>
        </section>

        {/* Join Us */}
        <section className="text-center border-t-4 border-black pt-16 mt-8">
          <h2 className="text-4xl font-black text-black mb-6 uppercase tracking-tight">Join Our Mission</h2>
          <p className="text-xl font-bold text-gray-800 mb-10 max-w-2xl mx-auto leading-relaxed">
            Be part of building a better future for local communities. Subscribe to stay connected and support independent local journalism.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://www.buymeacoffee.com/sunland" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-5 bg-[#FF813F] text-white font-black text-lg uppercase tracking-wider rounded-xl hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none border-4 border-black transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              <span className="text-2xl mr-3">☕</span> Buy me a coffee
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
