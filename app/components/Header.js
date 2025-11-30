'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();

  // Close mobile menu when pathname changes (page navigation)
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleMobileMenu = (e) => {
    if (e) e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (e) => {
    if (e) e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/sunlandnews-logo.png"
                alt="Sunland News Logo"
                width={180}
                height={50}
                className="h-auto"
                priority
              />
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col space-y-1.5 p-2 relative z-[60]"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          <nav className={`absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent z-50 shadow-lg md:shadow-none transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 max-h-[80vh] overflow-y-auto' : 'opacity-0 max-h-0 md:opacity-100 md:max-h-none overflow-hidden md:overflow-visible'}`}>
            <ul className="flex flex-col md:flex-row md:items-center py-4 md:py-0 px-4 md:px-0 md:space-x-8">
              <li className="py-2 md:py-0">
                <Link
                  href="/"
                  className={`text-gray-700 hover:text-primary font-medium block transition-colors ${pathname === '/' ? 'text-primary' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              <li className="py-2 md:py-0">
                <Link
                  href="/news"
                  className={`text-gray-700 hover:text-primary font-medium block transition-colors ${pathname === '/news' || pathname.startsWith('/news') || pathname.startsWith('/stories') || pathname.startsWith('/newsletter') ? 'text-primary' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  News
                </Link>
              </li>

              <li className="py-2 md:py-0">
                <Link
                  href="/latest"
                  className={`text-gray-700 hover:text-primary font-medium block transition-colors ${pathname === '/latest' ? 'text-primary' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Latest Newsletter
                </Link>
              </li>

              {/* Dropdown Menu */}
              <li className="py-2 md:py-0 relative group" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center text-gray-700 hover:text-primary font-medium transition-colors w-full md:w-auto justify-between md:justify-start ${pathname.startsWith('/events') || pathname.startsWith('/sponsor') ? 'text-primary' : ''}`}
                >
                  Get Involved
                  <svg className={`w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                {/* Desktop Dropdown */}
                <div className={`md:absolute md:top-full md:left-0 md:w-48 bg-white md:shadow-xl rounded-lg py-2 mt-1 md:mt-2 border border-gray-100 transition-all duration-200 ${dropdownOpen ? 'block' : 'hidden md:group-hover:block'}`}>
                  {/* Invisible bridge to prevent menu from closing when moving mouse from button to menu */}
                  <div className="hidden md:block absolute -top-4 left-0 w-full h-4 bg-transparent"></div>

                  <Link
                    href="/events/submit"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Submit an Event
                  </Link>
                  {/* <Link
                    href="/sponsor"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Become a Sponsor
                  </Link> */}
                </div>
              </li>

              <li className="py-2 md:py-0">
                <Link
                  href="/about"
                  className={`text-gray-700 hover:text-primary font-medium block transition-colors ${pathname === '/about' ? 'text-primary' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>

              <li className="py-2 md:py-0 md:hidden">
                <Link
                  href="/subscribe"
                  className="w-full block py-3 bg-primary text-white font-medium rounded-md text-center hover:bg-opacity-90 transition-colors mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Subscribe
                </Link>
              </li>
            </ul>
          </nav>

          <Link
            href="/subscribe"
            className="hidden md:inline-block px-5 py-2 bg-primary text-white font-medium rounded hover:bg-opacity-90 transition-colors"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
} 