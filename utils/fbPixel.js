// Helper to safely call fbq only on client side
export const event = (name, parameters = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, parameters);
  }
};

export const customEvent = (name, parameters = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', name, parameters);
  }
};