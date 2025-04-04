'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const pathname = usePathname();
  
  const aboutRef = useRef(null);
  const newsRef = useRef(null);
  const resourcesRef = useRef(null);
  const menuInitialized = useRef(false);

  // Initialize menu and add event listeners only once on component mount
  useEffect(() => {
    if (menuInitialized.current) return;
    menuInitialized.current = true;
    
    const handleClickOutside = (event) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setAboutDropdownOpen(false);
      }
      if (newsRef.current && !newsRef.current.contains(event.target)) {
        setNewsDropdownOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target)) {
        setResourcesDropdownOpen(false);
      }
    };

    // Add mouse events
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close all dropdowns when pathname changes (page navigation)
  useEffect(() => {
    setAboutDropdownOpen(false);
    setNewsDropdownOpen(false);
    setResourcesDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = (e) => {
    if (e) e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleAboutDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAboutDropdownOpen(!aboutDropdownOpen);
    setNewsDropdownOpen(false);
    setResourcesDropdownOpen(false);
  };

  const toggleNewsDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setNewsDropdownOpen(!newsDropdownOpen);
    setAboutDropdownOpen(false);
    setResourcesDropdownOpen(false);
  };

  const toggleResourcesDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setResourcesDropdownOpen(!resourcesDropdownOpen);
    setAboutDropdownOpen(false);
    setNewsDropdownOpen(false);
  };

  // Helper function to close a specific dropdown
  const closeDropdown = (setter) => {
    setter(false);
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
            className="md:hidden flex flex-col space-y-1.5 p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          
          <nav className={`absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent z-20 shadow-lg md:shadow-none transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 max-h-[80vh] overflow-y-auto' : 'opacity-0 max-h-0 md:opacity-100 md:max-h-none overflow-hidden md:overflow-visible'}`}>
            <ul className="flex flex-col md:flex-row md:items-center py-4 md:py-0 px-4 md:px-0">
              {/* About Dropdown */}
              <li ref={aboutRef} className="py-2 md:py-0 md:px-4 relative">
                <div className="md:hidden">
                  <div className="font-medium text-gray-900 mb-2 text-lg border-l-4 border-primary pl-3">About</div>
                  <ul className="pl-4 space-y-3 mb-4">
                    <li>
                      <Link 
                        href="/about"
                        className={`text-gray-600 hover:text-primary block transition-colors py-1 ${pathname === '/about' ? 'text-primary font-medium' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Our Story
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/team"
                        className={`text-gray-600 hover:text-primary block transition-colors py-1 ${pathname === '/team' ? 'text-primary font-medium' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Our Team
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/vision"
                        className={`text-gray-600 hover:text-primary block transition-colors py-1 ${pathname === '/vision' ? 'text-primary font-medium' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Our Vision
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="hidden md:block">
                  <button 
                    className={`text-gray-700 hover:text-primary font-medium flex items-center ${
                      ['/about', '/team', '/vision'].includes(pathname) ? 'text-primary' : ''
                    }`}
                    onClick={toggleAboutDropdown}
                  >
                    About
                    <svg className={`w-4 h-4 ml-1 transform transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {aboutDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-30" onClick={(e) => e.stopPropagation()}>
                      <Link 
                        href="/about"
                        className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary ${pathname === '/about' ? 'text-primary' : ''}`}
                        onClick={() => closeDropdown(setAboutDropdownOpen)}
                      >
                        Our Story
                      </Link>
                      <Link 
                        href="/team"
                        className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary ${pathname === '/team' ? 'text-primary' : ''}`}
                        onClick={() => closeDropdown(setAboutDropdownOpen)}
                      >
                        Our Team
                      </Link>
                      <Link 
                        href="/vision"
                        className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary ${pathname === '/vision' ? 'text-primary' : ''}`}
                        onClick={() => closeDropdown(setAboutDropdownOpen)}
                      >
                        Our Vision
                      </Link>
                    </div>
                  )}
                </div>
              </li>
              
              {/* News Dropdown */}
              <li ref={newsRef} className="py-2 md:py-0 md:px-4 relative">
                <div className="md:hidden">
                  <div className="font-medium text-gray-900 mb-2 text-lg border-l-4 border-primary pl-3">News</div>
                  <ul className="pl-4 space-y-3 mb-4">
                    <li>
                      <Link 
                        href="/stories"
                        className={`text-gray-600 hover:text-primary block transition-colors py-1 ${pathname === '/stories' ? 'text-primary font-medium' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sunland Stories
                      </Link>
                    </li>
                    <li>
                      <Link 
                        href="/newsletter"
                        className={`text-gray-600 hover:text-primary block transition-colors py-1 ${pathname === '/newsletter' ? 'text-primary font-medium' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Latest Newsletter
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="hidden md:block">
                  <button 
                    className={`text-gray-700 hover:text-primary font-medium flex items-center ${
                      ['/stories', '/newsletter'].includes(pathname) ? 'text-primary' : ''
                    }`}
                    onClick={toggleNewsDropdown}
                  >
                    News
                    <svg className={`w-4 h-4 ml-1 transform transition-transform ${newsDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {newsDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-30" onClick={(e) => e.stopPropagation()}>
                      <Link 
                        href="/stories"
                        className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary ${pathname === '/stories' ? 'text-primary' : ''}`}
                        onClick={() => closeDropdown(setNewsDropdownOpen)}
                      >
                        Sunland Stories
                      </Link>
                      <Link 
                        href="/newsletter"
                        className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary ${pathname === '/newsletter' ? 'text-primary' : ''}`}
                        onClick={() => closeDropdown(setNewsDropdownOpen)}
                      >
                        Latest Newsletter
                      </Link>
                    </div>
                  )}
                </div>
              </li>
              
              {/* Resources Dropdown */}
              <li ref={resourcesRef} className="py-2 md:py-0 md:px-4 relative">
                <div className="md:hidden">
                  <div className="font-medium text-gray-900 mb-2 text-lg border-l-4 border-primary pl-3">Resources</div>
                  <ul className="pl-4 space-y-3 mb-4">
                    <li>
                      <a 
                        href="https://events.sunland.news" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary block transition-colors py-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Events
                      </a>
                    </li>
                    <li>
                      <Link 
                        href="/products"
                        className={`text-gray-600 hover:text-primary block transition-colors py-1 ${pathname === '/products' ? 'text-primary font-medium' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Products
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="hidden md:block">
                  <button 
                    className={`text-gray-700 hover:text-primary font-medium flex items-center ${
                      ['/products'].includes(pathname) ? 'text-primary' : ''
                    }`}
                    onClick={toggleResourcesDropdown}
                  >
                    Resources
                    <svg className={`w-4 h-4 ml-1 transform transition-transform ${resourcesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {resourcesDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-30" onClick={(e) => e.stopPropagation()}>
                      <a 
                        href="https://events.sunland.news" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary"
                        onClick={() => closeDropdown(setResourcesDropdownOpen)}
                      >
                        Events
                      </a>
                      <Link 
                        href="/products"
                        className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary ${pathname === '/products' ? 'text-primary' : ''}`}
                        onClick={() => closeDropdown(setResourcesDropdownOpen)}
                      >
                        Products
                      </Link>
                    </div>
                  )}
                </div>
              </li>
              
              <li className="py-2 md:py-0 md:px-4">
                <div className="md:hidden">
                  <Link 
                    href="/contact" 
                    className={`text-gray-600 hover:text-primary block transition-colors py-1 mb-4 pl-4 ${pathname === '/contact' ? 'text-primary font-medium' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  
                  <div className="mt-4 border-t border-gray-200 pt-4 px-4">
                    <Link 
                      href="/subscribe" 
                      className="w-full block py-3 bg-primary text-white font-medium rounded-md text-center hover:bg-opacity-90 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Subscribe
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Link 
                    href="/contact" 
                    className={`text-gray-700 hover:text-primary font-medium block ${pathname === '/contact' ? 'text-primary' : ''}`}
                  >
                    Contact
                  </Link>
                </div>
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