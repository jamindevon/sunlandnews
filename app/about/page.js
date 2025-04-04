import Image from 'next/image';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-200 via-primary/30 to-blue-100 w-full h-full flex items-center justify-center">
            <div className="text-center px-4 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">The Story Behind Sunland</h1>
              <p className="text-xl text-gray-700">Started in Fort Pierce. Growing across Florida.</p>
            </div>
          </div>
        </div>
      </div>

      {/* The Past */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">The Past</h2>
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              Sunland News is named after Sunland Gardens, a neighborhood in Fort Pierce where my family has lived for decades. It's where I learned what real community looks like—and this newsletter is a tribute to that.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              I started Sunland News out of frustration—plain and simple. I was tired of news that didn't feel personal. It didn't reflect the people I knew or the places I loved. With all the tools available to us today, I realized we didn't have to wait for better local coverage. We could build it.
            </p>
          </div>
        </div>
      </div>

      {/* The Present */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl p-8 mb-16 shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">The Present</h2>
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              Today, Sunland News delivers thoughtful, people-first news to St. Lucie County. We're not just reporting on local issues—we're building something rooted in care, trust, and community.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Our mission is simple: deliver news in a way that's convenient, meaningful, and easy to consume. We're here to keep you connected to what matters most in your community.
            </p>
          </div>
        </div>
      </div>

      {/* The Future */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">The Future</h2>
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              Our long-term goal is to bring this model to other places that need it. We're starting four more editions across Florida in the next two years—focusing on cities and counties that have been underserved or forgotten.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              We call these places news deserts. Our goal is to chase the sun and plant the garden. The garden is the stories, the resources, the tools—the things people need to grow where they are.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              We're expanding beyond just news. Podcasts are coming by the end of 2025, and we're building tools that help people live more connected and more local lives.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-orange-50 via-white to-blue-50 rounded-2xl p-8 mb-16 shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-up">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              Every day, we curate and deliver the most important local news, events, and stories directly to your inbox. We focus on what matters to you—from city council decisions to local business openings, from community events to cultural happenings.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              We're building a community-driven approach to local news. Your feedback, story tips, and engagement help shape what we cover and how we cover it.
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">The Weekly Schedule</h2>
        <p className="text-xl text-center text-gray-600 mb-10">Here's what you can expect each week:</p>
        
        <div className="grid md:grid-cols-5 gap-5">
          {[
            { 
              day: "Monday", 
              emoji: "🗓", 
              title: "The Playbook", 
              desc: "Weekly forecast + civic updates", 
              link: "https://newsletter.sunlandnews.com/p/parking-s-not-free-much-longer",
              example: "Parking's Not Free Much Longer"
            },
            { 
              day: "Tuesday", 
              emoji: "📰", 
              title: "The Deep Dive", 
              desc: "Local stories & features", 
              link: "https://newsletter.sunlandnews.com/p/a-zora-neale-hurston-museum-is-coming-to-fort-pierce",
              example: "A Zora Neale Hurston Museum is Coming" 
            },
            { 
              day: "Wednesday", 
              emoji: "⚖️", 
              title: "The Pulse", 
              desc: "Midweek county check-in", 
              link: "https://newsletter.sunlandnews.com/p/vero-s-still-in-hot-water-over-missing-audit",
              example: "Vero's Still in Hot Water Over Missing Audit" 
            },
            { 
              day: "Thursday", 
              emoji: "🎟", 
              title: "What's Happening", 
              desc: "Weekend events guide", 
              link: "https://newsletter.sunlandnews.com/p/a-night-in-las-vegas-at-pelican-yacht-club",
              example: "A Night in Las Vegas at Pelican Yacht Club" 
            },
            { 
              day: "Friday", 
              emoji: "📬", 
              title: "The Wrap", 
              desc: "Week's recap + look ahead", 
              link: "https://newsletter.sunlandnews.com/p/see-what-happened-this-week",
              example: "See What Happened This Week" 
            }
          ].map((item, index) => (
            <div 
              key={item.day}
              className="bg-white p-6 rounded-xl shadow-md transform transition-all hover:-translate-y-2 hover:shadow-lg duration-300 border border-gray-100 group animate-fade-in-up"
              style={{animationDelay: `${0.1 + index * 0.1}s`}}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.emoji}</div>
              <h3 className="text-xl font-bold mb-2">{item.day}</h3>
              <h4 className="text-primary font-medium text-sm mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
              <div className="p-3 bg-gray-50 rounded-lg mb-4 border border-gray-100">
                <span className="text-xs text-gray-500 block mb-1">Recent Example:</span>
                <p className="text-sm font-medium text-gray-700">{item.example}</p>
              </div>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center group"
              >
                Read full example
                <svg className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href="https://newsletter.sunlandnews.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
          >
            View Past Newsletters
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Support Our Work */}
      <div className="bg-gradient-to-br from-primary/20 via-orange-100 to-blue-50 rounded-2xl p-8 text-center shadow-lg animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-4">Join Sunland News</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700">
          Be part of our story. Subscribe to stay connected with St. Lucie County and support independent local journalism.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/newsletter" className="px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1">
            Subscribe Free
          </a>
          <a href="/premium" className="px-8 py-4 bg-white text-primary border border-primary font-medium rounded-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1">
            Go Premium
          </a>
        </div>
      </div>
    </div>
  );
}