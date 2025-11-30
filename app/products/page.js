// This is a server component
import Link from 'next/link';

// Set revalidation
export const revalidate = 3600; // revalidate every hour

// Metadata for the page
export const metadata = {
  title: 'Products - Sunland News',
  description: 'Discover our suite of products designed to help you live a more connected local life in St. Lucie County.',
};

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Events Sunland",
      description: "Your comprehensive guide to everything happening in St. Lucie County. From festivals to community meetings, never miss what matters to you.",
      icon: "🎉",
      link: "https://events.sunland.news",
      external: true,
      color: "bg-purple-100 text-purple-700",
      status: "available"
    },
    {
      id: 2,
      name: "772 Eats",
      description: "The ultimate food guide for St. Lucie County. Discover local favorites, new openings, and hidden gems in your neighborhood.",
      icon: "🍽️",
      link: "https://772eats.com",
      external: true,
      color: "bg-orange-100 text-orange-700",
      status: "available"
    },
    {
      id: 3,
      name: "Play Sunland",
      description: "Interactive quizzes, games, and tools to help you explore and engage with your local community in fun new ways.",
      icon: "🎮",
      link: "https://play.sunlandnews.com",
      external: true,
      color: "bg-green-100 text-green-700",
      status: "available"
    },
    {
      id: 4,
      name: "People Pass",
      description: "Premium membership with exclusive content, early access to events, and deeper community connections.",
      icon: "⭐",
      link: "https://buymeacoffee.com/sunland?new=1",
      external: true,
      color: "bg-blue-100 text-blue-700",
      status: "available"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Tools for<br />
            <span className="text-primary">Local Living</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            More than just news—we're building products that help you live a more
            connected, engaged life in St. Lucie County.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl pb-24">
        {/* Products Grid */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl ${product.color.split(' ')[0]} bg-opacity-50`}>
                    {product.icon}
                  </div>
                  {product.status === 'available' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                      Live
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-lg leading-relaxed mb-8 min-h-[84px]">
                  {product.description}
                </p>

                {product.status === 'available' && product.link ? (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    Visit {product.name}
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                ) : (
                  <span className="text-gray-400 font-medium cursor-not-allowed">
                    Launch details coming soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-24 bg-gray-50 rounded-3xl p-8 md:p-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Building for Community</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Each product we build serves one goal: making it easier for you to be part of your community.
              Whether you're looking for a great meal, planning your weekend, or wanting to get more involved locally,
              we're creating the tools you need.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '🏠', title: 'Hyperlocal Focus', desc: 'Built specifically for St. Lucie County' },
                { icon: '🤝', title: 'Community Driven', desc: 'Shaped by local feedback and needs' },
                { icon: '🌱', title: 'Always Growing', desc: 'New features and tools added regularly' }
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact/Feedback */}
        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Have Ideas?</h2>
          <p className="text-lg text-gray-600 mb-8">
            We're always looking for ways to better serve the community.
            If you have ideas for tools or features you'd love to see, let us know.
          </p>
          <a
            href="mailto:hello@sunlandnews.com"
            className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-100 hover:border-gray-300 transition-all"
          >
            Share Your Ideas
          </a>
        </section>
      </div>
    </div>
  );
} 