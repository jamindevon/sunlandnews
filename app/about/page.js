import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-200 via-primary/30 to-blue-100 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The Story Behind<br />
            <span className="text-primary">Sunland News</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Born in Fort Pierce. Built for community. Growing across Florida.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-16">
        {/* Our Mission */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <blockquote className="text-2xl md:text-3xl font-bold text-primary italic mb-12 leading-tight">
              "We chase the sun to plant the garden."
            </blockquote>
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-left">
              <div className="space-y-6">
                <p className="text-xl text-gray-700 leading-relaxed">
                  Sunland News was born out of frustration—with news that didn't feel local, didn't feel personal. 
                  So we built something that did.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  The garden is the stories, the resources, the tools—the things people need to grow where they are. 
                  We're not just reporting on local issues—we're building something rooted in care, trust, and community.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Our mission is simple: deliver news in a way that's convenient, meaningful, and easy to consume. 
                  We're here to keep you connected to what matters most in your community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Team */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">The Team</h2>
          
          <div className="bg-gradient-to-r from-primary/10 to-blue-100 rounded-2xl overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-primary/20 to-blue-200 flex items-center justify-center py-12 md:py-16">
                <div className="text-center p-4">
                  <Image
                    src="/images/bio-photo.png" 
                    alt="Ja'Min Devon" 
                    width={192}
                    height={192}
                    className="w-48 h-48 object-cover object-[-15px_center] rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                  <div className="mt-6">
                    <h3 className="text-2xl font-bold text-gray-900">Ja'Min Devon</h3>
                    <p className="text-primary font-medium">Founder</p>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 p-8 md:p-12 bg-white">
                <div className="space-y-6">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Born, raised, and still living in Saint Lucie County, I have a passion for home, 
                    local people, and culture.
                  </p>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    I'm a storyteller who loves the written word and stays up late nights always thinking 
                    about how to make Sunland News the most meaningful and impactful news organization 
                    in the world.
                  </p>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Sunland News is named after Sunland Gardens, a neighborhood in Fort Pierce where my 
                    family has lived for decades. It's where I learned what real community looks like—and 
                    this newsletter is a tribute to that.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 italic text-lg">More team members coming soon...</p>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Why It Matters</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                We believe that strong communities are built on informed citizens, and informed citizens 
                need reliable, accessible local news.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                When communities have access to reliable local news and resources, they become stronger, 
                more connected, and more resilient.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                By focusing on underserved areas and providing comprehensive local coverage, we're helping 
                to create more informed, engaged, and connected communities across Florida.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">7,500+ subscribers across St. Lucie County</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Daily local news coverage since launch</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Community-focused, people-first journalism</p>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Expanding to 4 more Florida cities by 2026</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Story So Far */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">The Story So Far</h2>
          
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 transform hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-2xl font-bold text-primary mb-4">The Beginning</h3>
              <p className="text-xl text-gray-700 leading-relaxed">
                Today, Sunland News delivers thoughtful, people-first news to St. Lucie County. 
                We started with a simple belief: local news should be personal, accessible, and rooted 
                in the community it serves.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-primary/10 to-blue-100 rounded-2xl p-8 transform hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Future</h3>
              <p className="text-xl text-gray-700 leading-relaxed">
                We're expanding beyond just news. Podcasts are coming by the end of 2025, and we're 
                building tools that help people live more connected and more local lives. Our long-term 
                goal is to bring this model to other places that need it across Florida.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Get in Touch</h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-primary">✉️</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a href="mailto:hello@sunlandnews.com" className="text-primary hover:underline">
                        hello@sunlandnews.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-primary">📍</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-700">St. Lucie County, Florida</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <span className="text-primary">💼</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Story Tips</p>
                      <p className="text-gray-700">Have a local story? We'd love to hear from you.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Our Work</h3>
                <div className="space-y-6">
                  <p className="text-gray-700">
                    Stay connected with our latest stories, behind-the-scenes updates, and community 
                    conversations through our newsletter and social media.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href="/subscribe"
                      className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Subscribe to Newsletter
                    </Link>
                    <Link 
                      href="/news"
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Browse Our Stories
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-blue-100 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Be part of building a better future for local communities. Subscribe to stay connected 
              and support independent local journalism.
            </p>
            <Link 
              href="/subscribe"
              className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors text-lg"
            >
              Subscribe Free
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'About - Sunland News',
  description: 'Learn about Sunland News, our mission to plant the garden of local journalism, and meet the team building a better future for St. Lucie County communities.',
};