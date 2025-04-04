'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  
  useEffect(() => {
    // When the pathname changes (i.e., navigation occurs),
    // scroll to the top of the page
    window.scrollTo(0, 0);
  }, [pathname]);
  
  // This component doesn't render anything
  return null;
} 