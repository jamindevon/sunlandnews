import Image from 'next/image';
import Link from 'next/link';

export default function Vision() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
            <div className="text-center px-4 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Vision</h1>
              <p className="text-xl text-gray-700">Building a better future for local communities</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Mission */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">The Mission</h2>
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              Sunland News is more than just a news platform—it's a movement to revitalize local journalism and community engagement. We believe that strong communities are built on informed citizens, and informed citizens need reliable, accessible local news.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our mission is to chase the sun and plant the garden. The garden is the stories, the resources, the tools—the things people need to grow where they are.
            </p>
          </div>
        </div>
      </div>

      {/* The Future */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl p-8 mb-16 shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">The Future</h2>
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              We're starting with St. Lucie County, but our vision extends far beyond. We're planning to launch four more editions across Florida in the next two years, focusing on cities and counties that have been underserved or forgotten.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              We call these places news deserts. Our goal is to bring light to these areas, providing not just news, but the tools and resources communities need to thrive.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              By the end of 2025, we'll be expanding into podcasts and developing more tools to help people live more connected and local lives.
            </p>
          </div>
        </div>
      </div>

      {/* Tools for Local Living */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Tools for Local Living</h2>
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              We're building more than just a news platform. We're creating tools that help you live a more connected, local life. From restaurant guides to job boards, from event calendars to community directories—we're developing resources that make it easier to be part of your community.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our goal is to be your one-stop destination for everything local—not just news, but the tools and resources you need to thrive in your community.
            </p>
          </div>
        </div>
      </div>

      {/* The Impact */}
      <div className="bg-gradient-to-br from-primary/20 via-orange-100 to-blue-50 rounded-2xl p-8 mb-16 shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">The Impact</h2>
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              We believe that when communities have access to reliable local news and resources, they become stronger, more connected, and more resilient. Our work is about more than just delivering information—it's about building bridges between people and their communities.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              By focusing on underserved areas and providing comprehensive local coverage, we're helping to create more informed, engaged, and connected communities across Florida.
            </p>
          </div>
        </div>
      </div>

      {/* Join Us */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          Be part of building a better future for local communities. Subscribe to stay connected and support independent local journalism.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/newsletter" className="px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1">
            Subscribe Free
          </a>
          <div className="px-8 py-4 bg-gray-100 text-gray-500 font-medium rounded-lg cursor-default">
            Premium Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
} 