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
        <div className="min-h-screen bg-white font-sans text-black selection:bg-brutalPink selection:text-white pt-16 md:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header Info */}
                <div className="text-center mb-12 bg-white border-2 border-black p-8 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-[2rem] relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-brutalBlue rounded-full border-2 border-black opacity-20"></div>
                    <div className="flex items-center justify-center gap-3 text-sm text-black font-bold mb-6 relative z-10">
                        <span className="bg-brutalYellow border-2 border-black px-3 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase tracking-wider font-black rounded-lg">Latest Issue</span>
                        <span>•</span>
                        <time>{date}</time>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-tight tracking-tight relative z-10">
                        {latestPost.title}
                    </h1>
                </div>

                {/* Content */}
                <article className="bg-white border-2 border-black p-6 md:p-12 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-2xl prose prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-black prose-p:text-gray-800 prose-p:leading-relaxed prose-p:font-medium prose-a:text-black prose-a:font-bold prose-a:underline prose-a:decoration-2 prose-a:decoration-primary prose-a:underline-offset-4 hover:prose-a:text-primary prose-img:rounded-xl prose-img:border-2 prose-img:border-black prose-img:shadow-[4px_4px_0px_rgba(0,0,0,1)] prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:bg-brutalYellow/30 prose-blockquote:text-black prose-blockquote:italic prose-blockquote:py-2 prose-blockquote:pr-4 prose-strong:text-black prose-strong:font-black">
                    <div dangerouslySetInnerHTML={{ __html: latestPost.content }} />
                </article>

                {/* Footer CTA */}
                <div className="mt-16 pt-16 border-t-4 border-black text-center">
                    <h3 className="text-3xl font-black text-black mb-4 uppercase tracking-tight">Don't miss the next one</h3>
                    <p className="text-gray-800 font-bold mb-8 max-w-md mx-auto text-lg">
                        Join 10,000+ locals getting the best stories from St. Lucie County delivered to their inbox.
                    </p>
                    <Link
                        href="/subscribe"
                        className="inline-block bg-primary text-white font-bold uppercase tracking-wide px-8 py-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                    >
                        Subscribe for Free
                    </Link>
                    <div className="mt-8">
                        <Link href="/" className="text-black font-bold hover:text-primary uppercase underline decoration-2 decoration-black hover:decoration-primary underline-offset-4 transition-colors">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
