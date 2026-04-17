'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const newsDropdownRef = useRef(null);
  const productsDropdownRef = useRef(null);
  const pathname = usePathname();

  // Close mobile menu when pathname changes (page navigation)
  useEffect(() => {
    setMobileMenuOpen(false);
    setNewsDropdownOpen(false);
    setProductsDropdownOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (newsDropdownRef.current && !newsDropdownRef.current.contains(event.target)) {
        setNewsDropdownOpen(false);
      }
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target)) {
        setProductsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [newsDropdownRef, productsDropdownRef]);

  // Hide header on calendar sub-pages (dashboard, login, setup)
  // But SHOW it on the main offer page (/calendar)
  if (pathname?.startsWith('/calendar/')) {
    return null;
  }

  const toggleMobileMenu = (e) => {
    if (e) e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleNewsDropdown = (e) => {
    if (e) e.stopPropagation();
    setNewsDropdownOpen(!newsDropdownOpen);
    setProductsDropdownOpen(false);
  };

  const toggleProductsDropdown = (e) => {
    if (e) e.stopPropagation();
    setProductsDropdownOpen(!productsDropdownOpen);
    setNewsDropdownOpen(false);
  };

  return (
    <header className="bg-brutalBg border-b-2 border-black sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center hover:-translate-y-1 hover:-translate-x-1 transition-transform">
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
            className={`lg:hidden flex flex-col space-y-1.5 p-3 relative z-[60] bg-white border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-lg hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all ${mobileMenuOpen ? 'shadow-[1px_1px_0px_rgba(0,0,0,1)] translate-y-[1px] translate-x-[1px]' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-1 bg-black rounded-full transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`block w-6 h-1 bg-black rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-1 bg-black rounded-full transition-all duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-2.5' : ''}`}></span>
          </button>

          <nav className={`absolute lg:relative top-[76px] lg:top-0 left-0 w-full lg:w-auto bg-brutalBg lg:bg-transparent z-50 border-b-2 border-black lg:border-b-0 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 max-h-[80vh] overflow-y-auto' : 'opacity-0 max-h-0 lg:opacity-100 lg:max-h-none overflow-hidden lg:overflow-visible'}`}>
            <ul className="flex flex-col lg:flex-row lg:items-center py-6 lg:py-0 px-6 lg:px-0 lg:space-x-8 xl:space-x-12">
              <li className="py-4 lg:py-0 border-b-2 border-black/10 lg:border-none">
                <Link
                  href="/"
                  className={`block lg:inline-flex lg:items-center text-black font-extrabold text-lg lg:text-sm xl:text-base uppercase whitespace-nowrap transition-all transform hover:-translate-y-0.5 hover:text-primary ${pathname === '/' ? 'text-primary underline decoration-2 underline-offset-4' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              {/* News Dropdown */}
              <li
                className="py-4 lg:py-0 border-b-2 border-black/10 lg:border-none relative group"
                ref={newsDropdownRef}
                onMouseEnter={() => setProductsDropdownOpen(false)}
              >
                <button
                  onClick={toggleNewsDropdown}
                  className={`flex items-center w-full lg:w-auto justify-between lg:justify-start text-black font-extrabold text-lg lg:text-sm xl:text-base whitespace-nowrap uppercase transition-all transform hover:-translate-y-0.5 hover:text-primary ${pathname === '/news' || pathname.startsWith('/news/') || pathname.startsWith('/stories') || pathname.startsWith('/newsletter') || pathname === '/latest' ? 'text-primary underline decoration-2 underline-offset-4' : ''}`}
                >
                  News
                  <svg className={`w-6 h-6 lg:w-4 lg:h-4 ml-1 stroke-[3px] transition-transform duration-200 group-hover:rotate-180 ${newsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                <div className={`lg:absolute lg:top-full lg:left-0 lg:w-56 bg-white lg:rounded-xl py-3 mt-2 lg:mt-3 lg:border-2 lg:border-black lg:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-200 z-50 border-l-4 border-black ml-2 px-2 lg:ml-0 lg:px-0 lg:border-l-2 ${newsDropdownOpen ? 'block' : 'hidden lg:group-hover:block'}`}>
                  <div className="hidden lg:block absolute -top-4 left-0 w-full h-4 bg-transparent"></div>

                  <Link
                    href="/news"
                    className="block px-5 py-3 text-base lg:text-sm font-bold text-black uppercase whitespace-nowrap hover:bg-brutalYellow hover:pl-6 transition-all border-b-2 border-transparent hover:border-black mx-2 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All News
                  </Link>

                  <Link
                    href="/latest"
                    className="block px-5 py-3 text-base lg:text-sm font-bold text-black uppercase whitespace-nowrap hover:bg-brutalYellow hover:pl-6 transition-all border-b-2 border-transparent hover:border-black mx-2 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Latest Newsletter
                  </Link>
                </div>
              </li>

              {/* Products Dropdown */}
              <li
                className="py-4 lg:py-0 border-b-2 border-black/10 lg:border-none relative group"
                ref={productsDropdownRef}
                onMouseEnter={() => setNewsDropdownOpen(false)}
              >
                <button
                  onClick={toggleProductsDropdown}
                  className={`flex items-center w-full lg:w-auto justify-between lg:justify-start text-black font-extrabold text-lg lg:text-sm xl:text-base whitespace-nowrap uppercase transition-all transform hover:-translate-y-0.5 hover:text-primary ${pathname.startsWith('/calendar') ? 'text-primary underline decoration-2 underline-offset-4' : ''}`}
                >
                  Products
                  <svg className={`w-6 h-6 lg:w-4 lg:h-4 ml-1 stroke-[3px] transition-transform duration-200 group-hover:rotate-180 ${productsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                <div className={`lg:absolute lg:top-full lg:left-0 lg:w-56 bg-white lg:rounded-xl py-3 mt-2 lg:mt-3 lg:border-2 lg:border-black lg:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-200 z-50 border-l-4 border-black ml-2 px-2 lg:ml-0 lg:px-0 lg:border-l-2 ${productsDropdownOpen ? 'block' : 'hidden lg:group-hover:block'}`}>
                  <div className="hidden lg:block absolute -top-4 left-0 w-full h-4 bg-transparent"></div>

                  <a
                    href="https://calendar.sunlandnews.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-5 py-3 text-base lg:text-sm font-bold text-black uppercase whitespace-nowrap hover:bg-brutalYellow hover:pl-6 transition-all border-b-2 border-transparent hover:border-black mx-2 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Calendar Club
                  </a>
                </div>
              </li>


              <li className="py-4 lg:py-0 border-b-2 border-black/10 lg:border-none">
                <Link
                  href="/about"
                  className={`block lg:inline-flex lg:items-center text-black font-extrabold text-lg lg:text-sm xl:text-base uppercase whitespace-nowrap transition-all transform hover:-translate-y-0.5 hover:text-primary ${pathname === '/about' ? 'text-primary underline decoration-2 underline-offset-4' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>

              <li className="py-4 lg:py-0 border-b-2 border-black/10 lg:border-none">
                <Link
                  href="/sponsor"
                  className={`block lg:inline-flex lg:items-center text-black font-extrabold text-lg lg:text-sm xl:text-base uppercase whitespace-nowrap transition-all transform hover:-translate-y-0.5 hover:text-primary ${pathname === '/sponsor' ? 'text-primary underline decoration-2 underline-offset-4' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sponsor
                </Link>
              </li>

              <li className="py-8 lg:py-0 lg:hidden mt-4">
                <Link
                  href="/subscribe"
                  className="w-full block py-4 bg-brutalBlue text-white border-2 border-black font-black text-xl tracking-wide uppercase rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] text-center hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Subscribe
                </Link>
              </li>
            </ul>
          </nav>

          <Link
            href="/subscribe"
            className="hidden lg:inline-block px-5 py-2 bg-brutalBlue text-white border-2 border-black font-black uppercase text-sm tracking-wide whitespace-nowrap rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all z-10"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
}