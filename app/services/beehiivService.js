/**
 * Beehiiv API integration service
 * Handles subscriber management for the Sunland News newsletter
 */

// Configuration for Beehiiv API
const BEEHIIV_PUBLICATION_ID = 'pub_4cdbaa69-8749-4433-881b-ef4090c671d1';
const BEEHIIV_API_URL = 'https://api.beehiiv.com/v2';

/**
 * Subscribe a new email to the Beehiiv newsletter
 * @param {Object} subscriberData - Subscriber information
 * @param {string} subscriberData.email - Subscriber email (required)
 * @param {string} subscriberData.name - Subscriber name (optional)
 * @param {boolean} subscriberData.isPremium - Whether this is a premium subscriber (optional)
 * @returns {Promise<Object>} - Response from Beehiiv API
 */
export async function subscribeToNewsletter(subscriberData) {
  if (!subscriberData.email) {
    throw new Error('Email is required to subscribe');
  }

  try {
    const response = await fetch(`${BEEHIIV_API_URL}/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BEEHIIV_API_KEY || ''}`,
      },
      body: JSON.stringify({
        email: subscriberData.email,
        name: subscriberData.name || '',
        referring_site: 'sunlandnews.com',
        custom_fields: {
          premium_member: subscriberData.isPremium ? 'Yes' : 'No',
        },
        utm_source: 'website',
        utm_campaign: 'sunland_signup',
        utm_medium: subscriberData.source || 'direct',
        reactivate_existing: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to subscribe to newsletter');
    }

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Beehiiv subscription error:', error);
    return {
      success: false,
      error: error.message || 'Failed to subscribe to newsletter',
    };
  }
}

/**
 * Subscribe via client-side implementation (for use in client components)
 * Note: This requires the NEXT_PUBLIC_BEEHIIV_API_KEY to be set in .env.local
 */
export async function subscribeClientSide(subscriberData) {
  return subscribeToNewsletter(subscriberData);
} 