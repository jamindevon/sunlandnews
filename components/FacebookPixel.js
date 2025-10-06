'use client';

import { useEffect } from 'react';

/**
 * Facebook Pixel Component
 *
 * Global initialization component for Meta/Facebook Pixel
 * Pixel ID: 1091133472801541
 *
 * Features:
 * - Automatic PageView tracking on every page load
 * - Uses react-facebook-pixel library for consistent tracking
 * - Client-side only to avoid SSR issues
 */
export default function FacebookPixel() {
  const PIXEL_ID = '1091133472801541';

  useEffect(() => {
    // Initialize Facebook Pixel
    const initPixel = async () => {
      if (typeof window !== 'undefined') {
        try {
          const ReactPixel = (await import('react-facebook-pixel')).default;

          // Initialize with advanced matching and debug mode
          ReactPixel.init(PIXEL_ID, undefined, {
            autoConfig: true,
            debug: true, // Set to false in production
          });

          // Track initial page view
          ReactPixel.pageView();

          console.log('Facebook Pixel initialized successfully:', PIXEL_ID);
        } catch (error) {
          console.error('Error initializing Facebook Pixel:', error);
        }
      }
    };

    initPixel();
  }, []);

  return null;
}
