/**
 * Comparison Slide Builder
 *
 * Creates two-column comparison slides for contrasting
 * approaches, options, or before/after scenarios.
 */

import { addChrome, addTitle } from '../components/chrome.js';
import { addTakeawayBox } from '../components/takeaway.js';

/**
 * Add a two-column comparison slide
 * @param {object} pptx - PptxGenJS instance
 * @param {object} theme - Theme configuration
 * @param {object} options - Slide options
 * @param {string} options.title - Slide title
 * @param {string} options.leftLabel - Left column header
 * @param {string} options.rightLabel - Right column header
 * @param {Array} options.leftItems - Left column items (strings)
 * @param {Array} options.rightItems - Right column items (strings)
 * @param {string} options.leftColor - Left header color (default: accent)
 * @param {string} options.rightColor - Right header color (default: muted)
 * @param {boolean} options.checkmarks - Add checkmarks to left items
 * @param {object} options.takeaway - Takeaway box options
 * @param {string} options.sectionLabel - Section label
 * @param {number} options.pageNum - Page number
 * @param {object} options.footer - Footer options
 * @returns {object} The created slide
 */
export function addComparisonSlide(pptx, theme, options = {}) {
  const { colors, fonts, layout } = theme;
  const {
    title,
    leftLabel = 'Option A',
    rightLabel = 'Option B',
    leftItems = [],
    rightItems = [],
    leftColor,
    rightColor,
    checkmarks = true,
    takeaway,
    sectionLabel = 'Comparison',
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

  addTitle(slide, theme, title);

  const leftColX = layout.contentX;
  const rightColX = 6.85;
  const leftColW = 5.8;
  const rightColW = 5.9;
  const headerY = 1.6;

  // Left column header
  slide.addShape('rect', {
    x: leftColX,
    y: headerY,
    w: leftColW,
    h: 0.55,
    fill: { color: leftColor || colors.accent }
  });
  slide.addText(leftLabel, {
    x: leftColX,
    y: headerY,
    w: leftColW,
    h: 0.55,
    fontSize: 14,
    fontFace: fonts.body,
    bold: true,
    color: colors.textLight,
    align: 'center',
    valign: 'middle'
  });

  // Right column header
  slide.addShape('rect', {
    x: rightColX,
    y: headerY,
    w: rightColW,
    h: 0.55,
    fill: { color: rightColor || colors.textMuted }
  });
  slide.addText(rightLabel, {
    x: rightColX,
    y: headerY,
    w: rightColW,
    h: 0.55,
    fontSize: 14,
    fontFace: fonts.body,
    bold: true,
    color: colors.textLight,
    align: 'center',
    valign: 'middle'
  });

  // Left items
  leftItems.forEach((item, i) => {
    const y = 2.3 + (i * 0.6);
    slide.addShape('rect', {
      x: leftColX,
      y,
      w: leftColW,
      h: 0.55,
      fill: { color: i % 2 === 0 ? colors.bgLight : colors.bgWhite },
      line: { color: colors.border, pt: 0.5 }
    });
    slide.addText(checkmarks ? `✓ ${item}` : item, {
      x: leftColX + 0.2,
      y,
      w: leftColW - 0.4,
      h: 0.55,
      fontSize: 12,
      fontFace: fonts.body,
      color: colors.textDark,
      valign: 'middle'
    });
  });

  // Right items
  rightItems.forEach((item, i) => {
    const y = 2.3 + (i * 0.6);
    slide.addShape('rect', {
      x: rightColX,
      y,
      w: rightColW,
      h: 0.55,
      fill: { color: i % 2 === 0 ? colors.bgLight : colors.bgWhite },
      line: { color: colors.border, pt: 0.5 }
    });
    slide.addText(item, {
      x: rightColX + 0.2,
      y,
      w: rightColW - 0.4,
      h: 0.55,
      fontSize: 12,
      fontFace: fonts.body,
      color: colors.textMuted,
      valign: 'middle'
    });
  });

  // Takeaway
  if (takeaway) {
    addTakeawayBox(slide, theme, {
      ...takeaway,
      y: 5.5
    });
  }

  return slide;
}

export default { addComparisonSlide };
