export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-white font-sans text-black selection:bg-brutalPink selection:text-white pt-24 pb-24 px-4">
            <div className="container mx-auto max-w-4xl bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-3xl p-8 md:p-12 prose prose-lg prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary prose-a:font-bold prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:text-black">
                <h1 className="text-5xl md:text-6xl font-black text-black mb-8 border-b-4 border-black pb-4 uppercase">Privacy Policy</h1>
                <p className="font-bold text-gray-800 bg-brutalYellow inline-block px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-8 uppercase tracking-wide text-sm">Last updated: {new Date().toLocaleDateString()}</p>
                <p className="text-xl font-bold leading-relaxed">At Sunland News, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>

                <h2 className="text-3xl mt-12 mb-6">Information We Collect</h2>
                <div className="bg-brutalBlue/10 border-l-4 border-black pl-6 py-2 my-6">
                    <p className="font-bold text-gray-800 m-0">We collect information you provide directly to us, such as when you subscribe to our newsletter, purchase a calendar subscription, or contact us.</p>
                </div>

                <h2 className="text-3xl mt-12 mb-6">How We Use Your Information</h2>
                <div className="bg-brutalBg border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] my-6">
                    <p className="font-bold text-gray-800 m-0">We use your information to send you our newsletter, provide the services you requested, and improve our content.</p>
                </div>

                <h2 className="text-3xl mt-12 mb-6">Contact Us</h2>
                <p className="font-bold text-xl">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@sunland.news" className="text-primary hover:text-black transition-colors">hello@sunland.news</a>.</p>
            </div>
        </div>
    );
}
