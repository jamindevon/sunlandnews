'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fbEvents } from '../../lib/fbPixel';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleFooterSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'footer',
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      // Track newsletter subscription with Meta Pixel
      fbEvents.subscribeSubmit('footer', {
        content_name: 'Footer Newsletter Signup'
      });

      // Always pass email to thank-you page for segmentation
      router.push(`/thank-you?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-brutalBg border-t-4 border-black pt-16 pb-12 relative overflow-hidden text-black z-10">
      {/* Decorative dots background for Footer */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "24px 24px" }}></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-black uppercase mb-4 tracking-wide bg-brutalYellow inline-block px-2 border-2 border-black -rotate-2">
              Sunland News
            </h3>
            <p className="font-bold text-gray-800 mb-6 leading-relaxed">
              Hyperlocal news and stories from St. Lucie County, delivered straight to your inbox.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://www.facebook.com/thesunlandnews" target="_blank" rel="noopener noreferrer" className="text-white bg-brutalBlue border-2 border-black w-10 h-10 flex items-center justify-center rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/sunlandnews" target="_blank" rel="noopener noreferrer" className="text-white bg-[#ff4365] border-2 border-black w-10 h-10 flex items-center justify-center rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427-.465-1.067-.048-1.407-.06-4.123-.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.153-1.772 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-xl font-black uppercase mb-5 tracking-wide underline decoration-4 underline-offset-4 decoration-primary inline-block">Quick Links</h3>
            <ul className="space-y-3 font-bold">
              <li><Link href="/about" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">About Us</Link></li>
              <li><Link href="/team" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Our Team</Link></li>
              <li><Link href="/vision" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Our Vision</Link></li>
              <li><Link href="/stories" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Latest Stories</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-black uppercase mb-5 tracking-wide underline decoration-4 underline-offset-4 decoration-primary inline-block">Contact</h3>
            <ul className="space-y-3 font-bold">
              <li><Link href="/contact" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">Contact Us</Link></li>
              <li><a href="mailto:hello@sunland.news" className="hover:text-primary hover:translate-x-1 inline-block transition-transform">hello@sunland.news</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-xl font-black uppercase mb-3 tracking-wide bg-black text-white px-2 py-1 inline-block rotate-2">Newsletter</h3>
            <p className="font-bold text-gray-800 mb-4">
              Subscribe to receive local news straight to your inbox.
            </p>
            <form onSubmit={handleFooterSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all font-bold placeholder:text-gray-400 placeholder:font-black"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className={`w-full px-4 py-3 font-black uppercase text-white rounded-xl border-2 border-black transition-all ${submitting
                  ? 'bg-gray-400 translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-not-allowed'
                  : 'bg-primary shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none'
                  }`}
                disabled={submitting}
              >
                {submitting ? 'SENDING...' : 'SEND ME THE NEWS'}
              </button>
              {error && <p className="text-red-500 font-bold text-sm bg-white border-2 border-red-500 rounded p-1 inline-block">{error}</p>}
            </form>
          </div>
        </div>

        <div className="border-2 border-black mt-12 mb-4 flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <p className="font-bold text-black text-center md:text-left">© {new Date().getFullYear()} Sunland News. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-6">
            <Link href="/privacy" className="font-bold text-black hover:text-primary transition-colors underline decoration-2 underline-offset-4">Privacy Policy</Link>
            <Link href="/terms" className="font-bold text-black hover:text-primary transition-colors underline decoration-2 underline-offset-4">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}