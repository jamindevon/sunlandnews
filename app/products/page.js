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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-200 via-primary/30 to-blue-100 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Tools for<br />
            <span className="text-primary">Local Living</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            More than just news—we're building products that help you live a more 
            connected, engaged life in St. Lucie County.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl py-16">
        {/* Introduction */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Product Lineup</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              From restaurant guides to event calendars, from interactive tools to premium content—
              we're developing a complete ecosystem to help you discover, explore, and connect 
              with your local community.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className={`${product.color} rounded-2xl p-6 mb-6 text-center`}>
                  <div className="text-5xl mb-4">{product.icon}</div>
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  {product.status === 'available' && product.link ? (
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors text-sm md:text-base"
                    >
                      Visit {product.name}
                      <svg className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  ) : (
                    <div className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 bg-gray-100 text-gray-600 font-medium rounded-lg text-sm md:text-base">
                      Coming Soon
                    </div>
                  )}
                  
                  {product.status === 'available' && (
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium">Live</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-primary/10 to-blue-100 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Building for Community</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Each product we build serves one goal: making it easier for you to be part of your community. 
                Whether you're looking for a great meal, planning your weekend, or wanting to get more involved locally, 
                we're creating the tools you need.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-3">🏠</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Hyperlocal Focus</h3>
                  <p className="text-gray-600">Built specifically for St. Lucie County</p>
                </div>
                <div>
                  <div className="text-3xl mb-3">🤝</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Community Driven</h3>
                  <p className="text-gray-600">Shaped by local feedback and needs</p>
                </div>
                <div>
                  <div className="text-3xl mb-3">🌱</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Always Growing</h3>
                  <p className="text-gray-600">New features and tools added regularly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Integration */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Stay Updated on New Products</h2>
              <p className="text-lg text-gray-600 mb-8">
                Be the first to know when we launch new products and features. Our newsletter subscribers 
                get early access and exclusive previews of everything we're building.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/subscribe"
                  className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Subscribe to Newsletter
                </Link>
                <Link 
                  href="/about"
                  className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Learn Our Story
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Feedback */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-blue-100 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Have Ideas for New Products?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for ways to better serve the St. Lucie County community. 
              If you have ideas for tools or features you'd love to see, we'd love to hear from you.
            </p>
            <a 
              href="mailto:hello@sunlandnews.com"
              className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors text-lg"
            >
              Share Your Ideas
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
} 