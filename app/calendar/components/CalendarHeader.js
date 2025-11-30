'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function CalendarHeader() {
    const pathname = usePathname();
    const isLoginPage = pathname === '/calendar/login';

    // Don't show this custom header on the main offer page (it uses the main site header)
    if (pathname === '/calendar') return null;

    return (
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
                {!isLoginPage && (
                    <div className="flex items-center gap-4">
                        <Link href="/calendar/dashboard" className="text-sm font-bold text-gray-900 hover:text-primary transition-colors">
                            Dashboard
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
