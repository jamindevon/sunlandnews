import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Set revalidation for the entire site
export const revalidate = 60; // revalidate every 60 seconds

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://sunlandnews.com'),
  title: "Sunland News - Saint Lucie County",
  description: "A hyper-local email newsletter covering Saint Lucie County. Food, News, Events, and People—delivered 5 days a week.",
  icons: {
    icon: '/favicon.ico',
    apple: '/images/apple-icon.png',
  },
  openGraph: {
    title: "Sunland News - Saint Lucie County",
    description: "A hyper-local email newsletter covering Saint Lucie County. Food, News, Events, and People—delivered 5 days a week.",
    url: 'https://sunlandnews.com',
    siteName: 'Sunland News',
    images: [
      {
        url: '/images/share-sunland.png',
        width: 1200,
        height: 630,
        alt: 'Sunland News - Saint Lucie County',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sunland News - Saint Lucie County",
    description: "A hyper-local email newsletter covering Saint Lucie County. Food, News, Events, and People—delivered 5 days a week.",
    images: ['/images/share-sunland.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Meta Pixel Code - Placed at top of body to load in head */}
        <Script
          id="meta-pixel"
          strategy="beforeInteractive"
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
              fbq('init', '1091133472801541');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=1091133472801541&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        
        <div className="min-h-screen flex flex-col">
          <Header />
          <ScrollToTop />
          <main className="flex-grow container max-w-6xl mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 