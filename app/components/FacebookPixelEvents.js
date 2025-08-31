'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function FacebookPixelEvents() {
  const pathname = usePathname();

  useEffect(() => {
    // Fire PageView on route change for SPA navigation
    if (typeof window !== 'undefined') {
      const ReactPixel = require('react-facebook-pixel');
      ReactPixel.pageView();
    }
  }, [pathname]);

  return null;
}