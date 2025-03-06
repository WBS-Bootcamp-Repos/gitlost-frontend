/**
 * Utility functions for handling multiple images in posts
 */

// Format for storing multiple images: mainCoverImage|additionalImage1|additionalImage2|additionalImage3
const SEPARATOR = '|';

/**
 * Parse the combined image string into separate URLs
 * @param {string} combinedImageString - String containing all image URLs
 * @returns {Object} Object with cover and additional image URLs
 */
export const parseImages = (combinedImageString) => {
  if (!combinedImageString) return { cover: '', additionalImages: [] };
  
  const images = combinedImageString.split('|').filter(url => url.trim());
  
  return {
    cover: images[0] || '',
    additionalImages: images.slice(1) || []
  };
};

/**
 * Combine main cover and additional images into a single string for storage
 * @param {string} mainCover - The main cover image URL
 * @param {Array<string>} additionalImages - Array of additional image URLs
 * @returns {string} Combined string for database storage
 */
export const formatImagesForStorage = (mainCover, additionalImages = ['', '', '']) => {
  // Ensure we always have exactly 3 additional images
  const normalizedAdditionalImages = [
    additionalImages[0] || '',
    additionalImages[1] || '',
    additionalImages[2] || ''
  ];
  
  return [mainCover, ...normalizedAdditionalImages].join(SEPARATOR);
};

/**
 * Check if a string is a valid URL
 * @param {string} url - The URL to validate
 * @returns {boolean} True if the URL is valid
 */
export const isValidImageUrl = (url) => {
  if (!url || url.trim() === '') return true; // Empty URLs are considered "valid" for optional images
  
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};