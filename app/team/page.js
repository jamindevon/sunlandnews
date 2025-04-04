'use client';

export default function Team() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
            <div className="text-center px-4 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Meet the Team</h1>
              <p className="text-xl text-gray-700">The people behind Sunland News</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              Sunland News started as a one-person operation, born from a deep love for community and a belief in the power of local journalism. Today, we're growing into a team of passionate individuals who share the same vision: making local news accessible, meaningful, and community-driven.
            </p>
          </div>
        </div>
      </div>

      {/* The Team */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl p-8 mb-16 shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">The Team</h2>
          <div className="space-y-8">
            {/* Founder */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
              <div className="md:flex">
                <div className="md:w-1/3 bg-gradient-to-br from-blue-100 to-primary/30 flex items-center justify-center py-12 md:py-0">
                  <div className="text-center p-4">
                    <img 
                      src="/images/bio-photo.png" 
                      alt="Ja'Min Devon" 
                      className="w-48 h-48 object-cover object-[-15px_center] rounded-full mx-auto border-4 border-white shadow-lg"
                      onError={(e) => {
                        e.target.src = '/images/no-image-placeholder.png';
                        console.error('Failed to load profile image');
                      }}
                    />
                    <span className="text-xl font-bold text-gray-800 block mt-4">Founder</span>
                  </div>
                </div>
                <div className="md:w-2/3 p-8">
                  <h3 className="text-2xl font-bold mb-2">Ja'Min Devon</h3>
                  <p className="text-gray-600 italic mb-6">Founder</p>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Was born, raised, and still lives in Saint Lucie County, and I have a passion for home, local people, and culture. I'm a story teller who loves the written word and stays up late nights always thinking about how to make Sunland News the most meaningful and impactful news organization in the world.
                  </p>
                </div>
              </div>
            </div>

            {/* Future Team Members */}
            <div className="text-center text-gray-600 italic">
              <p className="text-xl">More team members coming soon...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Us */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          We're always looking for passionate individuals who share our vision for local journalism. If you're interested in joining our team, we'd love to hear from you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/contact" className="px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1">
            Get in Touch
          </a>
          <div className="px-8 py-4 bg-gray-100 text-gray-500 font-medium rounded-lg cursor-default">
            Careers Page Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
} 