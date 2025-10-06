import { useEffect } from "react";

const PixelTracker = () => {
  useEffect(() => {
    const initPixel = async () => {
      if (typeof window !== 'undefined') {
        const ReactPixel = (await import('react-facebook-pixel')).default;
        const pixelId = "528010896404537";
        ReactPixel.init(pixelId);
        ReactPixel.pageView();
      }
    };
    initPixel();
  }, []);

  return null;
};

export default PixelTracker;