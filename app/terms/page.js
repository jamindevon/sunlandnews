export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-white font-sans text-black selection:bg-brutalPink selection:text-white pt-24 pb-24 px-4">
            <div className="container mx-auto max-w-4xl bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-3xl p-8 md:p-12 prose prose-lg prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary prose-a:font-bold prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:text-black">
                <h1 className="text-5xl md:text-6xl font-black text-black mb-8 border-b-4 border-black pb-4 uppercase">Terms of Service</h1>
                <p className="font-bold text-gray-800 bg-brutalYellow inline-block px-3 py-1 border-2 border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-8 uppercase tracking-wide text-sm">Last updated: {new Date().toLocaleDateString()}</p>
                <p className="text-xl font-bold leading-relaxed">Welcome to Sunland News. By accessing or using our website, you agree to be bound by these Terms of Service.</p>

                <h2 className="text-3xl mt-12 mb-6">Use of Our Service</h2>
                <div className="bg-brutalBlue/10 border-l-4 border-black pl-6 py-2 my-6">
                    <p className="font-bold text-gray-800 m-0">You agree to use our service only for lawful purposes and in accordance with these Terms.</p>
                </div>

                <h2 className="text-3xl mt-12 mb-6">Intellectual Property</h2>
                <div className="bg-brutalBg border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] my-6">
                    <p className="font-bold text-gray-800 m-0">The content on Sunland News, including text, graphics, and logos, is the property of Sunland News and is protected by copyright laws.</p>
                </div>

                <h2 className="text-3xl mt-12 mb-6">Contact Us</h2>
                <p className="font-bold text-xl">If you have any questions about these Terms, please contact us at <a href="mailto:hello@sunland.news" className="text-primary hover:text-black transition-colors">hello@sunland.news</a>.</p>
            </div>
        </div>
    );
}
