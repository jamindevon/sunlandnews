'use client';

import { useEffect } from 'react';
import Script from 'next/script';

/**
 * Facebook Pixel Component
 *
 * Global initialization component for Meta/Facebook Pixel
 * Pixel ID: 528010896404537
 *
 * Features:
 * - Automatic PageView tracking on every page load
 * - Uses Next.js Script with afterInteractive strategy
 * - Includes noscript fallback for users with JavaScript disabled
 */
export default function FacebookPixel() {
  const PIXEL_ID = '528010896404537';

  useEffect(() => {
    // Initialize Facebook Pixel
    const initPixel = async () => {
      if (typeof window !== 'undefined') {
        try {
          const ReactPixel = (await import('react-facebook-pixel')).default;
          ReactPixel.init(PIXEL_ID);
          ReactPixel.pageView();
        } catch (error) {
          console.error('Error initializing Facebook Pixel:', error);
        }
      }
    };

    initPixel();
  }, []);

  return (
    <>
      {/* Facebook Pixel Script */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* Noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
