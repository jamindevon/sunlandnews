'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function FacebookPixelEvents() {
  const pathname = usePathname();

  useEffect(() => {
    // Fire PageView on route change for SPA navigation
    const trackPageView = async () => {
      if (typeof window !== 'undefined') {
        const ReactPixel = (await import('react-facebook-pixel')).default;
        ReactPixel.pageView();
      }
    };
    trackPageView();
  }, [pathname]);

  return null;
}