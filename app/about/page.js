import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            The Story Behind<br />
            <span className="text-primary">Sunland News</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Born in Fort Pierce. Built for community. Growing across Florida.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl pb-24">
        {/* Our Mission */}
        <section className="mb-24 text-center">
          <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-900 mb-12 leading-relaxed max-w-3xl mx-auto">
            "We chase the sun to plant the garden."
          </blockquote>
          <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
            <p className="mb-6">
              Sunland News was born out of frustration—with news that didn't feel local, didn't feel personal.
              So we built something that did.
            </p>
            <p className="mb-6">
              The garden is the stories, the resources, the tools—the things people need to grow where they are.
              We're not just reporting on local issues—we're building something rooted in care, trust, and community.
            </p>
            <p>
              Our mission is simple: deliver news in a way that's convenient, meaningful, and easy to consume.
              We're here to keep you connected to what matters most in your community.
            </p>
          </div>
        </section>

        {/* The Team */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">The Team</h2>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-shrink-0 text-center md:text-left">
              <div className="relative inline-block">
                <Image
                  src="/images/bio-photo.png"
                  alt="Ja'Min Devon"
                  width={200}
                  height={200}
                  className="w-48 h-48 object-cover object-[-15px_center] rounded-full shadow-xl"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-gray-900">Ja'Min Devon</h3>
                <p className="text-primary font-medium">Founder</p>
              </div>
            </div>

            <div className="flex-1 space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Born, raised, and still living in Saint Lucie County, I have a passion for home,
                local people, and culture.
              </p>
              <p>
                I'm a storyteller who loves the written word and stays up late nights always thinking
                about how to make Sunland News the most meaningful and impactful news organization
                in the world.
              </p>
              <p>
                Sunland News is named after Sunland Gardens, a neighborhood in Fort Pierce where my
                family has lived for decades. It's where I learned what real community looks like—and
                this newsletter is a tribute to that.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 italic">More team members coming soon...</p>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="mb-24 border-t border-gray-100 pt-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why It Matters</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                We believe that strong communities are built on informed citizens, and informed citizens
                need reliable, accessible local news.
              </p>
              <p>
                When communities have access to reliable local news and resources, they become stronger,
                more connected, and more resilient.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8">
            Have a story tip, feedback, or just want to say hello? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@sunland.news"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/30"
            >
              Email Us
            </a>
            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-100 hover:border-gray-300 transition-all"
            >
              Subscribe Free
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