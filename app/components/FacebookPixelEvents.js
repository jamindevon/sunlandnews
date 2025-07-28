'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as fbPixel from '../../utils/fbPixel';

export default function FacebookPixelEvents() {
  const pathname = usePathname();

  useEffect(() => {
    // Fire PageView on route change for SPA navigation
    fbPixel.event('PageView');
  }, [pathname]);

  return null;
}