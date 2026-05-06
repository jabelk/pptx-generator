/**
 * PptxGenerator - Professional PowerPoint generation library
 *
 * A reusable library for creating McKinsey-style presentations
 * with consistent theming, professional layouts, and easy customization.
 *
 * @example
 * import { createPresentation, themes, slides } from 'pptx-generator';
 *
 * const pptx = createPresentation({ theme: 'cowork' });
 * slides.addTitleSlide(pptx, themes.getTheme('cowork'), {
 *   title: 'My Presentation',
 *   subtitle: 'A professional deck'
 * });
 * pptx.writeFile('output.pptx');
 */

import PptxGenJS from 'pptxgenjs';

// Theme system
import * as themes from './themes/index.js';
export { themes };

// Slide builders
import * as slides from './slides/index.js';
export { slides };

// Component helpers
import * as components from './components/index.js';
export { components };

// Utilities
import * as utils from './utils/index.js';
export { utils };

/**
 * Create a new presentation instance with theme applied
 * @param {object} options - Creation options
 * @param {string} options.theme - Theme name ('cowork', 'minimal', or custom)
 * @param {string} options.title - Presentation title (metadata)
 * @param {string} options.subject - Presentation subject (metadata)
 * @param {string} options.author - Presentation author (metadata)
 * @param {string} options.company - Company name (metadata)
 * @returns {object} PptxGenJS instance with theme attached
 */
export function createPresentation(options = {}) {
  const {
    theme: themeName = 'cowork',
    title,
    subject,
    author,
    company
  } = options;

  const pptx = new PptxGenJS();

  // Apply metadata
  if (title) pptx.title = title;
  if (subject) pptx.subject = subject;
  if (author) pptx.author = author;
  if (company) pptx.company = company;

  // Standard slide size (16:9)
  pptx.defineLayout({ name: 'LAYOUT_16x9', width: 13.33, height: 7.5 });
  pptx.layout = 'LAYOUT_16x9';

  // Get theme and attach to instance for convenience
  const theme = themes.getTheme(themeName);
  pptx.theme = theme;

  return pptx;
}

/**
 * Convenience function to add a slide with theme auto-detected
 * @param {object} pptx - PptxGenJS instance (with theme attached)
 * @param {string} slideType - Slide type ('title', 'agenda', 'content', etc.)
 * @param {object} options - Slide options
 * @returns {object} The created slide
 */
export function addSlide(pptx, slideType, options = {}) {
  const theme = pptx.theme || themes.getTheme('cowork');

  const slideBuilders = {
    title: slides.addTitleSlide,
    agenda: slides.addAgendaSlide,
    quote: slides.addQuoteSlide,
    comparison: slides.addComparisonSlide,
    phases: slides.addPhasesSlide,
    workflow: slides.addWorkflowSlide,
    checklist: slides.addChecklistSlide,
    summary: slides.addSummarySlide,
    content: slides.addContentSlide,
    demo: slides.addDemoSlide
  };

  const builder = slideBuilders[slideType];
  if (!builder) {
    throw new Error(`Unknown slide type: ${slideType}. Available types: ${Object.keys(slideBuilders).join(', ')}`);
  }

  return builder(pptx, theme, options);
}

/**
 * Quick presentation builder using declarative config
 * @param {object} config - Presentation configuration
 * @param {object} config.meta - Metadata (title, author, etc.)
 * @param {string} config.theme - Theme name
 * @param {Array} config.slides - Array of slide configurations
 * @returns {object} PptxGenJS instance
 *
 * @example
 * const pptx = buildPresentation({
 *   meta: { title: 'My Deck', author: 'John' },
 *   theme: 'cowork',
 *   slides: [
 *     { type: 'title', title: 'Welcome', subtitle: 'An introduction' },
 *     { type: 'agenda', items: ['Topic 1', 'Topic 2'] },
 *     { type: 'content', title: 'Details', bullets: ['Point 1', 'Point 2'] }
 *   ]
 * });
 */
export function buildPresentation(config = {}) {
  const { meta = {}, theme = 'cowork', slides: slideConfigs = [] } = config;

  const pptx = createPresentation({
    theme,
    ...meta
  });

  slideConfigs.forEach((slideConfig, index) => {
    const { type, ...options } = slideConfig;
    if (!type) {
      throw new Error(`Slide at index ${index} is missing 'type' property`);
    }
    addSlide(pptx, type, options);
  });

  return pptx;
}

// Default export for convenience
export default {
  createPresentation,
  addSlide,
  buildPresentation,
  themes,
  slides,
  components,
  utils
};
