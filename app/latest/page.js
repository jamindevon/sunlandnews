import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Revalidate every hour

async function getLatestNewsletter() {
    try {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Frss.beehiiv.com%2Ffeeds%2FhyCELI0tNT.xml');
        const data = await res.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
            return data.items[0];
        }
        return null;
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
        return null;
    }
}

export default async function LatestNewsletterPage() {
    const latestPost = await getLatestNewsletter();

    if (!latestPost) {
        return notFound();
    }

    // Format date
    const date = new Date(latestPost.pubDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="min-h-screen bg-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header Info */}
                <div className="text-center mb-12">
                    <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
                        <img src="/images/sunlandnews-logo.png" alt="Sunland News" className="h-10 w-auto mx-auto" />
                    </Link>
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mb-4">
                        <span className="uppercase tracking-wider font-medium">Latest Issue</span>
                        <span>•</span>
                        <time>{date}</time>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                        {latestPost.title}
                    </h1>
                </div>

                {/* Content */}
                <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-sm prose-blockquote:border-l-primary prose-blockquote:text-gray-600 prose-blockquote:italic prose-strong:text-gray-900">
                    <div dangerouslySetInnerHTML={{ __html: latestPost.content }} />
                </article>

                {/* Footer CTA */}
                <div className="mt-16 pt-12 border-t border-gray-100 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't miss the next one</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Join 10,000+ locals getting the best stories from St. Lucie County delivered to their inbox.
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Subscribe for Free
                    </Link>
                    <div className="mt-8">
                        <Link href="/" className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
