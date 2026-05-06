/**
 * Content Slide Builder
 *
 * Generic content slides with flexible layouts for
 * text, images, cards, and diagrams.
 */

import { addChrome, addTitle, addSubtitle } from '../components/chrome.js';
import { addTakeawayBox } from '../components/takeaway.js';
import { addCardGrid } from '../components/cards.js';

/**
 * Add a standard content slide
 * @param {object} pptx - PptxGenJS instance
 * @param {object} theme - Theme configuration
 * @param {object} options - Slide options
 * @param {string} options.title - Slide title
 * @param {string} options.subtitle - Slide subtitle
 * @param {Array} options.cards - Card data for grid layout
 * @param {Array} options.bullets - Bullet points
 * @param {object} options.image - Image options {path, x, y, w, h}
 * @param {object} options.takeaway - Takeaway box options
 * @param {string} options.sectionLabel - Section label
 * @param {number} options.pageNum - Page number
 * @param {object} options.footer - Footer options
 * @returns {object} The created slide
 */
export function addContentSlide(pptx, theme, options = {}) {
  const { colors, fonts, layout } = theme;
  const {
    title,
    subtitle,
    cards,
    bullets,
    image,
    takeaway,
    sectionLabel,
    pageNum,
    footer = {}
  } = options;

  const slide = pptx.addSlide();
  slide.background = { color: colors.bgWhite };

  addChrome(slide, theme, {
    sectionLabel,
    pageNum,
    ...footer
  });

  if (title) {
    addTitle(slide, theme, title);
  }

  if (subtitle) {
    addSubtitle(slide, theme, subtitle);
  }

  // Cards layout
  if (cards && cards.length > 0) {
    addCardGrid(slide, theme, {
      cards,
      columns: Math.min(cards.length, 3),
      y: subtitle ? 1.9 : 1.6
    });
  }

  // Bullets
  if (bullets && bullets.length > 0) {
    const bulletStartY = subtitle ? 1.9 : 1.6;
    bullets.forEach((bullet, i) => {
      slide.addText(`• ${bullet}`, {
        x: layout.contentX,
        y: bulletStartY + (i * 0.5),
        w: layout.contentWidth,
        h: 0.45,
        fontSize: 14,
        fontFace: fonts.body,
        color: colors.textDark
      });
    });
  }

  // Image
  if (image && image.path) {
    slide.addImage({
      path: image.path,
      x: image.x || layout.contentX,
      y: image.y || 1.6,
      w: image.w || layout.contentWidth,
      h: image.h || 5.0,
      sizing: image.sizing || { type: 'contain' }
    });
  }

  // Takeaway
  if (takeaway) {
    addTakeawayBox(slide, theme, takeaway);
  }

  return slide;
}

/**
 * Add a demo/screenshot slide
 * @param {object} pptx - PptxGenJS instance
 * @param {object} theme - Theme configuration
 * @param {object} options - Slide options
 * @param {string} options.title - Slide title
 * @param {string} options.imagePath - Path to screenshot image
 * @param {string} options.caption - Image caption
 * @param {object} options.takeaway - Takeaway box options
 * @param {string} options.sectionLabel - Section label
 * @param {number} options.pageNum - Page number
 * @param {object} options.footer - Footer options
 * @returns {object} The created slide
 */
export function addDemoSlide(pptx, theme, options = {}) {
  const { colors, fonts, layout } = theme;
  const {
    title,
    imagePath,
    caption,
    takeaway,
    sectionLabel = 'Demo',
    pageNum,
    footer = {}
  } = options;

  const slide = pptx.addSlide();
  slide.background = { color: colors.bgWhite };

  addChrome(slide, theme, {
    sectionLabel,
    pageNum,
    ...footer
  });

  if (title) {
    addTitle(slide, theme, title);
  }

  // Screenshot
  if (imagePath) {
    slide.addImage({
      path: imagePath,
      x: layout.contentX,
      y: 1.5,
      w: layout.contentWidth - 0.5,
      h: 5.0,
      sizing: { type: 'contain' }
    });
  }

  // Caption
  if (caption) {
    slide.addText(caption, {
      x: layout.contentX,
      y: 6.6,
      w: layout.contentWidth,
      h: 0.35,
      fontSize: 10,
      fontFace: fonts.body,
      italic: true,
      color: colors.textMuted
    });
  }

  // Takeaway
  if (takeaway) {
    addTakeawayBox(slide, theme, {
      ...takeaway,
      y: 6.6
    });
  }

  return slide;
}

export default { addContentSlide, addDemoSlide };
