/**
 * Quote Slide Builder
 *
 * Creates impactful quote slides with large quotation marks,
 * attribution, and optional takeaway box.
 */

import { addChrome } from '../components/chrome.js';
import { addTakeawayBox } from '../components/takeaway.js';

/**
 * Add a quote slide
 * @param {object} pptx - PptxGenJS instance
 * @param {object} theme - Theme configuration
 * @param {object} options - Slide options
 * @param {string} options.quote - The quote text
 * @param {string} options.author - Quote author name
 * @param {string} options.authorTitle - Author's title/date
 * @param {object} options.takeaway - Takeaway box options {label, text}
 * @param {string} options.sectionLabel - Section label
 * @param {number} options.pageNum - Page number
 * @param {object} options.footer - Footer options
 * @returns {object} The created slide
 */
export function addQuoteSlide(pptx, theme, options = {}) {
  const { colors, fonts } = theme;
  const {
    quote,
    author,
    authorTitle,
    takeaway,
    sectionLabel = 'Vision',
    pageNum,
    footer = {}
  } = options;

  const slide = pptx.addSlide();
  slide.background = { color: colors.bgLight };

  addChrome(slide, theme, {
    sectionLabel,
    pageNum,
    ...footer
  });

  // Large quote mark
  slide.addText('"', {
    x: 0.8,
    y: 1.2,
    w: 1,
    h: 1.5,
    fontSize: 120,
    fontFace: 'Georgia',
    color: colors.accent
  });

  // Quote text
  if (quote) {
    slide.addText(quote, {
      x: 1.5,
      y: 2.2,
      w: 10.5,
      h: 2,
      fontSize: 28,
      fontFace: fonts.heading,
      italic: true,
      color: colors.primary
    });
  }

  // Attribution
  slide.addShape('rect', {
    x: 1.5,
    y: 4.5,
    w: 1.2,
    h: 0.04,
    fill: { color: colors.accent }
  });

  if (author) {
    slide.addText(author, {
      x: 1.5,
      y: 4.7,
      w: 10,
      h: 0.4,
      fontSize: 16,
      fontFace: fonts.body,
      bold: true,
      color: colors.primary
    });
  }

  if (authorTitle) {
    slide.addText(authorTitle, {
      x: 1.5,
      y: 5.1,
      w: 10,
      h: 0.35,
      fontSize: 12,
      fontFace: fonts.body,
      color: colors.textMuted
    });
  }

  // Takeaway box
  if (takeaway) {
    addTakeawayBox(slide, theme, {
      ...takeaway,
      y: 6.0
    });
  }

  return slide;
}

export default { addQuoteSlide };
