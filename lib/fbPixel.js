/**
 * Facebook Pixel Helper Functions
 *
 * Provides utility functions for tracking Facebook Pixel events
 * Pixel ID: 528010896404537
 */

/**
 * Track a custom Facebook Pixel event
 * @param {string} eventName - Name of the event to track
 * @param {object} params - Optional parameters for the event
 */
export const trackFBEvent = async (eventName, params = {}) => {
  if (typeof window !== 'undefined') {
    try {
      const ReactPixel = (await import('react-facebook-pixel')).default;
      ReactPixel.track(eventName, params);
    } catch (error) {
      console.error('Error tracking Facebook Pixel event:', error);
    }
  }
};

/**
 * Pre-configured Facebook Pixel events
 */
export const fbEvents = {
  /**
   * Track a lead/form submission event
   * @param {object} params - Optional parameters
   */
  formSubmit: (params = {}) => {
    trackFBEvent('Lead', {
      content_name: 'Form Submission',
      ...params
    });
  },

  /**
   * Track a newsletter subscription event
   * @param {string} source - Source of the subscription (e.g., 'homepage', 'footer')
   * @param {object} params - Optional additional parameters
   */
  subscribeSubmit: (source = 'website', params = {}) => {
    trackFBEvent('Subscribe', {
      content_name: 'Newsletter Signup',
      content_category: 'Email Subscription',
      source: source,
      ...params
    });
  },

  /**
   * Track checkout initiation
   * @param {number} value - Cart value
   * @param {string} currency - Currency code (default: 'USD')
   * @param {object} params - Optional additional parameters
   */
  initiateCheckout: (value, currency = 'USD', params = {}) => {
    trackFBEvent('InitiateCheckout', {
      value: value,
      currency: currency,
      ...params
    });
  },

  /**
   * Track a completed purchase
   * @param {number} value - Purchase amount
   * @param {string} currency - Currency code (default: 'USD')
   * @param {object} params - Optional additional parameters
   */
  completePurchase: (value, currency = 'USD', params = {}) => {
    trackFBEvent('Purchase', {
      value: value,
      currency: currency,
      ...params
    });
  },

  /**
   * Track add to cart event
   * @param {object} params - Optional parameters
   */
  addToCart: (params = {}) => {
    trackFBEvent('AddToCart', params);
  },

  /**
   * Track view content event
   * @param {object} params - Optional parameters
   */
  viewContent: (params = {}) => {
    trackFBEvent('ViewContent', params);
  },

  /**
   * Track complete registration event
   * @param {object} params - Optional parameters
   */
  completeRegistration: (params = {}) => {
    trackFBEvent('CompleteRegistration', params);
  },

  /**
   * Track contact event
   * @param {object} params - Optional parameters
   */
  contact: (params = {}) => {
    trackFBEvent('Contact', params);
  }
};
