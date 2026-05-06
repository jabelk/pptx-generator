/**
 * Image Utilities
 *
 * Helpers for working with images in presentations:
 * - Path resolution (absolute paths required by PptxGenJS)
 * - Base64 encoding for embedded images
 * - Image sizing calculations
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, isAbsolute, extname } from 'path';

/**
 * Resolve image path to absolute path
 * @param {string} imagePath - Relative or absolute image path
 * @param {string} basePath - Base directory for relative paths
 * @returns {string} Absolute path to image
 */
export function resolveImagePath(imagePath, basePath = process.cwd()) {
  if (isAbsolute(imagePath)) {
    return imagePath;
  }
  return resolve(basePath, imagePath);
}

/**
 * Get MIME type from file extension
 * @param {string} filePath - Path to image file
 * @returns {string} MIME type
 */
export function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.bmp': 'image/bmp'
  };
  return mimeTypes[ext] || 'image/png';
}

/**
 * Convert image file to base64 data URI
 * @param {string} imagePath - Path to image file
 * @param {string} basePath - Base directory for relative paths
 * @returns {string} Base64 data URI
 */
export function imageToBase64(imagePath, basePath = process.cwd()) {
  const absolutePath = resolveImagePath(imagePath, basePath);

  if (!existsSync(absolutePath)) {
    throw new Error(`Image not found: ${absolutePath}`);
  }

  const imageBuffer = readFileSync(absolutePath);
  const base64 = imageBuffer.toString('base64');
  const mimeType = getMimeType(absolutePath);

  return `data:${mimeType};base64,${base64}`;
}

/**
 * Check if string is a data URI
 * @param {string} str - String to check
 * @returns {boolean} True if data URI
 */
export function isDataUri(str) {
  return str && str.startsWith('data:');
}

/**
 * Check if string is a URL
 * @param {string} str - String to check
 * @returns {boolean} True if URL
 */
export function isUrl(str) {
  return str && (str.startsWith('http://') || str.startsWith('https://'));
}

/**
 * Prepare image for PptxGenJS
 * Resolves paths to absolute, optionally converts to base64
 * @param {string} imagePath - Image path, URL, or data URI
 * @param {object} options - Options
 * @param {string} options.basePath - Base path for relative paths
 * @param {boolean} options.embedBase64 - Convert to base64 for embedding
 * @returns {string} Prepared image path/data URI
 */
export function prepareImage(imagePath, options = {}) {
  const { basePath = process.cwd(), embedBase64 = false } = options;

  // Already a data URI or URL - return as-is
  if (isDataUri(imagePath) || isUrl(imagePath)) {
    return imagePath;
  }

  // Resolve to absolute path
  const absolutePath = resolveImagePath(imagePath, basePath);

  // Optionally convert to base64
  if (embedBase64) {
    return imageToBase64(absolutePath);
  }

  return absolutePath;
}

/**
 * Calculate image dimensions to fit within bounds while preserving aspect ratio
 * @param {number} originalWidth - Original image width
 * @param {number} originalHeight - Original image height
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @returns {object} {width, height} - Calculated dimensions
 */
export function fitImageDimensions(originalWidth, originalHeight, maxWidth, maxHeight) {
  const widthRatio = maxWidth / originalWidth;
  const heightRatio = maxHeight / originalHeight;
  const ratio = Math.min(widthRatio, heightRatio);

  return {
    width: originalWidth * ratio,
    height: originalHeight * ratio
  };
}

/**
 * Center an image within a bounding box
 * @param {number} imageWidth - Image width
 * @param {number} imageHeight - Image height
 * @param {number} boxX - Bounding box X
 * @param {number} boxY - Bounding box Y
 * @param {number} boxWidth - Bounding box width
 * @param {number} boxHeight - Bounding box height
 * @returns {object} {x, y} - Centered position
 */
export function centerImage(imageWidth, imageHeight, boxX, boxY, boxWidth, boxHeight) {
  return {
    x: boxX + (boxWidth - imageWidth) / 2,
    y: boxY + (boxHeight - imageHeight) / 2
  };
}

export default {
  resolveImagePath,
  getMimeType,
  imageToBase64,
  isDataUri,
  isUrl,
  prepareImage,
  fitImageDimensions,
  centerImage
};
