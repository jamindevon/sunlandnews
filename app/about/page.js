import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-brutalPink selection:text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 leading-tight tracking-tight">
            The Story Behind<br />
            <span className="inline-block bg-brutalYellow px-4 py-1 mt-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl">Sunland News</span>
          </h1>
          <p className="text-lg md:text-xl font-bold text-gray-800 mb-8 max-w-2xl mx-auto leading-relaxed">
            Born in Fort Pierce. Built for community. Growing across Florida.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl pb-24">
        {/* Our Mission */}
        <section className="mb-24 text-center">
          <div className="bg-brutalBg border-2 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-3xl p-8 md:p-12 max-w-3xl mx-auto relative overflow-hidden">
            <blockquote className="text-2xl md:text-3xl font-bold italic text-black mb-8 leading-relaxed relative z-10">
              "We chase the sun to plant the garden."
            </blockquote>
            <div className="mx-auto text-black font-medium leading-relaxed text-lg space-y-6 relative z-10">
              <p>
                Sunland News was born out of frustration—with news that didn't feel local, didn't feel personal.
                So we built something that did.
              </p>
              <p>
                The garden is the stories, the resources, the tools—the things people need to grow where they are.
                We're not just reporting on local issues—we're building something rooted in care, trust, and community.
              </p>
              <p>
                Our mission is simple: deliver news in a way that's convenient, meaningful, and easy to consume.
                We're here to keep you connected to what matters most in your community.
              </p>
            </div>
          </div>
        </section>

        {/* The Team */}
        <section className="mb-24">
          <h2 className="text-4xl font-extrabold text-black mb-12 text-center uppercase tracking-tight">The Team</h2>

          <div className="flex flex-col md:flex-row items-center gap-12 bg-white border-2 border-black p-8 md:p-12 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-[2rem] relative">
            {/* Background accent */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#ff4365] rounded-full border-2 border-black z-0 opacity-20"></div>

            <div className="flex-shrink-0 text-center md:text-left z-10">
              <div className="relative inline-block border-2 border-black rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)] overflow-hidden">
                <Image
                  src="/images/bio-photo.png"
                  alt="Ja'Min Devon"
                  width={200}
                  height={200}
                  className="w-48 h-48 object-cover object-[-15px_center]"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-black text-black uppercase tracking-tight">Ja'Min Devon</h3>
                <p className="text-white bg-brutalBlue inline-block px-3 py-1 border-2 border-black uppercase text-sm font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] mt-2">Founder</p>
              </div>
            </div>

            <div className="flex-1 space-y-6 text-lg font-medium text-gray-800 leading-relaxed z-10">
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
            <p className="text-black font-bold uppercase underline decoration-2 underline-offset-4 decoration-primary">More team members coming soon...</p>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="mb-24 border-t-2 border-black pt-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold text-black mb-8 tracking-tight">Why It Matters</h2>
            <div className="space-y-6 text-lg font-medium text-gray-800 leading-relaxed">
              <p>
                We believe that strong communities are built on informed citizens, and informed citizens
                need reliable, accessible local news.
              </p>
              <p>
                When communities have access to reliable local news and resources, they become <span className="underline decoration-brutalBlue decoration-4 underline-offset-4 font-bold">stronger, more connected, and more resilient.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-black mb-6 tracking-tight">Get in Touch</h2>
          <p className="text-lg font-medium text-gray-800 mb-8">
            Have a story tip, feedback, or just want to say hello? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@sunland.news"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              Email Us
            </a>
            <Link
              href="/subscribe"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold uppercase tracking-wide border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-brutalBg hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
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