import Link from 'next/link';
import Image from 'next/image';

export default function CalendarLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            src="/images/sunlandnews-logo.png"
                            alt="Sunland News"
                            width={120}
                            height={40}
                            className="h-8 w-auto"
                        />
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/calendar/dashboard" className="text-sm font-bold text-gray-900 hover:text-primary transition-colors">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </header>
            <main className="flex-grow">
                {children}
            </main>
            <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Sunland News. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
