/**
 * Utility exports
 */

export * from './images.js';
export * from './svg.js';

import images from './images.js';
import svg from './svg.js';

export default {
  ...images,
  ...svg
};
