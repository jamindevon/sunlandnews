// Global type declarations for Facebook Pixel
declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export {}; 