import imageUrlBuilder from '@sanity/image-url';

// Configuration for the image URL builder
const config = {
  projectId: 'oj0fldpz',
  dataset: 'production',
};

// Create the builder instance
const builder = imageUrlBuilder(config);

/**
 * Generate an image URL from a Sanity image reference
 * @param {Object} source - The Sanity image object with asset reference
 * @returns {Object} - An image builder object with methods like width(), height(), etc.
 */
export function urlFor(source) {
  if (!source || !source.asset) {
    return null;
  }
  return builder.image(source);
}

/**
 * Helper function that returns the complete URL string with options
 * @param {Object} source - The Sanity image object
 * @param {Object} options - Options like width, height, etc.
 * @returns {string|null} - The complete image URL or null if source is invalid
 */
export function getImageUrl(source, options = {}) {
  if (!source || !source.asset) {
    return null;
  }
  
  let imageBuilder = builder.image(source);
  
  // Apply options if provided
  if (options.width) {
    imageBuilder = imageBuilder.width(options.width);
  }
  
  if (options.height) {
    imageBuilder = imageBuilder.height(options.height);
  }
  
  if (options.fit) {
    imageBuilder = imageBuilder.fit(options.fit);
  }
  
  return imageBuilder.url();
} 