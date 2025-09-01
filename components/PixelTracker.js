import { useEffect } from "react";

const PixelTracker = () => {
  useEffect(() => {
    const initPixel = async () => {
      if (typeof window !== 'undefined') {
        const ReactPixel = (await import('react-facebook-pixel')).default;
        const pixelId = "1191376851980285";
        ReactPixel.init(pixelId);
        ReactPixel.pageView();
      }
    };
    initPixel();
  }, []);

  return null;
};

export default PixelTracker;