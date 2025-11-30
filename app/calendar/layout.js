import Link from 'next/link';
import Image from 'next/image';
import CalendarHeader from './components/CalendarHeader';

export default function CalendarLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <CalendarHeader />
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
