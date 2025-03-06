/**
 * Utility functions for handling multiple images in posts
 */

// Format for storing multiple images: mainCoverImage|additionalImage1|additionalImage2|additionalImage3
const SEPARATOR = '|';

/**
 * Parse the cover string into separate image URLs
 * @param {string} coverString - The combined image URLs string
 * @returns {object} An object with cover and additional images
 */
export const parseImages = (coverString) => {
  if (!coverString) {
    return { 
      cover: '', 
      additionalImages: ['', '', ''] 
    };
  }
  
  const imageUrls = coverString.split(SEPARATOR);
  const mainCover = imageUrls[0] || '';
  
  // Initialize additionalImages with empty strings or the provided values
  const additionalImages = [
    imageUrls[1] || '',
    imageUrls[2] || '',
    imageUrls[3] || ''
  ];
  
  return {
    cover: mainCover,
    additionalImages
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