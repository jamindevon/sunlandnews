'use client';

import Link from 'next/link';

export default function Vision() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 border-b border-gray-100">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Our Vision
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Building a better future for local communities through connection and information.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-3xl py-24 space-y-24">
        {/* The Mission */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Mission</h2>
          <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
            <p className="mb-6">
              Sunland News is more than just a news platform—it's a movement to revitalize local journalism and community engagement. We believe that strong communities are built on informed citizens, and informed citizens need reliable, accessible local news.
            </p>
            <p>
              Our mission is to chase the sun and plant the garden. The garden is the stories, the resources, the tools—the things people need to grow where they are.
            </p>
          </div>
        </section>

        {/* The Future */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Future</h2>
          <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
            <p className="mb-6">
              We're starting with St. Lucie County, but our vision extends far beyond. We're planning to launch four more editions across Florida in the next two years, focusing on cities and counties that have been underserved or forgotten.
            </p>
            <p className="mb-6">
              We call these places news deserts. Our goal is to bring light to these areas, providing not just news, but the tools and resources communities need to thrive.
            </p>
            <p>
              By the end of 2025, we'll be expanding into podcasts and developing more tools to help people live more connected and local lives.
            </p>
          </div>
        </section>

        {/* Tools for Local Living */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Tools for Local Living</h2>
          <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
            <p className="mb-6">
              We're building more than just a news platform. We're creating tools that help you live a more connected, local life. From restaurant guides to job boards, from event calendars to community directories—we're developing resources that make it easier to be part of your community.
            </p>
            <p>
              Our goal is to be your one-stop destination for everything local—not just news, but the tools and resources you need to thrive in your community.
            </p>
          </div>
        </section>

        {/* The Impact */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Impact</h2>
          <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
            <p className="mb-6">
              We believe that when communities have access to reliable local news and resources, they become stronger, more connected, and more resilient. Our work is about more than just delivering information—it's about building bridges between people and their communities.
            </p>
            <p>
              By focusing on underserved areas and providing comprehensive local coverage, we're helping to create more informed, engaged, and connected communities across Florida.
            </p>
          </div>
        </section>

        {/* Join Us */}
        <section className="text-center border-t border-gray-100 pt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of building a better future for local communities. Subscribe to stay connected and support independent local journalism.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.buymeacoffee.com/sunland" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 bg-[#FF813F] text-white font-bold rounded-xl hover:bg-[#FF813F]/90 transition-all shadow-lg shadow-orange-200">
              ☕ Buy me a coffee
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
