import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { client, urlFor } from '../../../lib/sanityClient';
import groq from 'groq';

// Map URL slugs to human readable names and search queries
const cityConfig = {
  'fort-pierce': {
    name: 'Fort Pierce',
    searchQuery: '"Fort Pierce"',
    description: 'Sunland News covers Fort Pierce news, local government, community events, and civic life across St. Lucie County. We are Fort Pierce\'s independent local newsroom, built for the people who live here.'
  },
  'port-st-lucie': {
    name: 'Port St. Lucie',
    searchQuery: '"Port St. Lucie" || pt::text(body) match "Port Saint Lucie"',
    description: 'Sunland News covers Port St. Lucie news, local government, development, and community life across St. Lucie County. Independent local journalism built for the Treasure Coast.'
  },
  'st-lucie-county': {
    name: 'St. Lucie County',
    searchQuery: '"St. Lucie County" || pt::text(body) match "Saint Lucie County"',
    description: 'Sunland News covers St. Lucie County news, government, schools, business, and community life across Fort Pierce, Port St. Lucie, and the Treasure Coast.'
  }
};

export async function generateMetadata({ params }) {
  const config = cityConfig[params.slug];
  if (!config) return {};

  return {
    title: `${config.name} News — Sunland News`,
    description: config.description,
  };
}

async function getCityStories(searchQuery) {
  try {
    // Fetch stories that match the specific city name in title or body
    const query = groq`*[_type == "post" && !(_id in path('drafts.**')) && (title match ${searchQuery} || pt::text(body) match ${searchQuery})] | order(publishedAt desc)[0...10] {
      _id,
      title,
      slug,
      mainImage,
      categories[]->{
        _id,
        title
      },
      publishedAt,
      author->{
        name,
        image
      },
      excerpt
    }`;
    
    const stories = await client.fetch(query);
    return stories || [];
  } catch (error) {
    console.error(`Error fetching stories for ${searchQuery}:`, error);
    return [];
  }
}

export const revalidate = 300; // 5 minutes

export default async function CityHubPage({ params }) {
  const { slug } = params;
  const config = cityConfig[slug];

  if (!config) {
    notFound();
  }

  const stories = await getCityStories(config.searchQuery);

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-brutalPink selection:text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 border-b-2 border-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 leading-tight tracking-tight">
            Latest News in<br />
            <span className="inline-block bg-brutalYellow px-4 py-1 mt-2 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-xl">{config.name}</span>
          </h1>
          <p className="text-lg md:text-xl font-bold text-gray-800 mb-8 max-w-2xl mx-auto leading-relaxed">
            {config.description}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-4xl py-16">
        <div className="space-y-12">
          {stories.length > 0 ? (
            stories.map((story) => (
              <article key={story._id} className="group grid md:grid-cols-12 gap-6 items-start bg-white border-2 border-black p-4 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] transition-all">
                {story.mainImage && (
                  <div className="md:col-span-4">
                    <div className="aspect-[4/3] relative rounded-xl overflow-hidden border-2 border-black bg-gray-100 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      <Image
                        src={urlFor(story.mainImage).width(400).height(300).url()}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                )}
                <div className={story.mainImage ? "md:col-span-8" : "col-span-12"}>
                  <div className="flex items-center gap-3 text-sm text-black font-bold mb-3">
                    <span className="bg-brutalBlue text-white px-2 py-0.5 border-2 border-black rounded tracking-wider shadow-[1px_1px_0px_rgba(0,0,0,1)] text-xs uppercase">
                      {story.categories?.[0]?.title || 'News'}
                    </span>
                    <span>•</span>
                    <time className="opacity-80">{new Date(story.publishedAt).toLocaleDateString()}</time>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-black mb-3 group-hover:text-primary transition-colors leading-tight">
                    <Link href={`/post/${story.slug.current}`}>
                      {story.title}
                    </Link>
                  </h3>
                  <p className="text-gray-800 font-medium leading-relaxed line-clamp-2 mb-4">
                    {story.excerpt || 'Read the full story on Sunland News...'}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    {story.author?.image && (
                      <div className="border-2 border-black rounded-full overflow-hidden shadow-[1px_1px_0px_rgba(0,0,0,1)] w-8 h-8">
                        <Image
                          src={urlFor(story.author.image).width(40).height(40).url()}
                          alt={story.author.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span className="text-sm font-bold text-black uppercase">
                      {story.author?.name || 'Sunland Staff'}
                    </span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-black">
              <h3 className="text-xl font-bold mb-2">Check back soon</h3>
              <p className="text-gray-500">We're actively reporting on new stories from {config.name}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
