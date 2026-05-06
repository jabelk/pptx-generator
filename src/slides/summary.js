/**
 * Summary Slide Builder
 *
 * Creates closing/summary slides with dark backgrounds
 * and prominent key messages.
 */

/**
 * Add a summary/closing slide
 * @param {object} pptx - PptxGenJS instance
 * @param {object} theme - Theme configuration
 * @param {object} options - Slide options
 * @param {string} options.eyebrow - Small text above message (e.g., "SUMMARY")
 * @param {string} options.message - Main message text (supports \n for line breaks)
 * @param {string} options.footerText - Footer text (bottom right)
 * @param {number} options.pageNum - Page number
 * @returns {object} The created slide
 */
export function addSummarySlide(pptx, theme, options = {}) {
  const { colors, fonts, spacing } = theme;
  const {
    eyebrow = 'SUMMARY',
    message,
    footerText,
    pageNum
  } = options;

  const slide = pptx.addSlide();
  slide.background = { color: colors.bgDark };

  // Left accent bar
  if (spacing.accentBarWidthLarge > 0) {
    slide.addShape('rect', {
      x: 0,
      y: 0,
      w: spacing.accentBarWidthLarge,
      h: '100%',
      fill: { color: colors.accent }
    });
  }

  // Top rule
  slide.addShape('line', {
    x: 0.5,
    y: 0.7,
    w: 12.3,
    h: 0,
    line: { color: colors.textLight, width: 0.4 }
  });

  // Eyebrow
  if (eyebrow) {
    slide.addText(eyebrow.toUpperCase(), {
      x: 0.5,
      y: 0.3,
      w: 12.3,
      h: 0.3,
      fontSize: 10,
      fontFace: fonts.body,
      color: colors.mutedBlue,
      align: 'right'
    });
  }

  // Main message
  if (message) {
    slide.addText(message, {
      x: 1.5,
      y: 2.0,
      w: 10.3,
      h: 4.0,
      fontSize: 26,
      fontFace: fonts.heading,
      bold: true,
      color: colors.textLight,
      valign: 'middle'
    });
  }

  // Footer
  if (footerText || pageNum) {
    const footer = pageNum ? `${footerText || ''}    ${pageNum}` : footerText;
    slide.addText(footer, {
      x: 8.5,
      y: 7.1,
      w: 4.2,
      h: 0.3,
      fontSize: 9,
      fontFace: fonts.body,
      color: colors.mutedBlue,
      align: 'right'
    });
  }

  return slide;
}

export default { addSummarySlide };
