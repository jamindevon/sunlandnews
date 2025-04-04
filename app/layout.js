import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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