/**
 * Chrome Components - Standard slide decorations
 *
 * Chrome includes the left accent bar, section labels, and footers
 * that appear consistently across content slides.
 */

/**
 * Add standard slide chrome (accent bar, section label, footer)
 * @param {object} slide - PptxGenJS slide object
 * @param {object} theme - Theme configuration
 * @param {object} options - Chrome options
 * @param {string} options.sectionLabel - Section label text (e.g., "Architecture")
 * @param {number|string} options.pageNum - Page number for footer
 * @param {string} options.footerText - Left footer text
 * @param {string} options.footerRight - Right footer text template (use {pageNum} placeholder)
 */
export function addChrome(slide, theme, options = {}) {
  const { colors, fonts, spacing, layout } = theme;
  const {
    sectionLabel,
    pageNum,
    footerText = '',
    footerRight = ''
  } = options;

  // Left accent bar
  if (spacing.accentBarWidth > 0) {
    slide.addShape('rect', {
      x: 0,
      y: 0,
      w: spacing.accentBarWidth,
      h: '100%',
      fill: { color: colors.accent },
      line: { color: colors.accent }
    });
  }

  // Section label (top, all caps)
  if (sectionLabel) {
    slide.addText(sectionLabel.toUpperCase(), {
      x: layout.contentX,
      y: layout.sectionLabelY,
      w: layout.contentWidth,
      h: layout.sectionLabelHeight,
      fontSize: 11,
      fontFace: fonts.body,
      bold: true,
      color: colors.accent,
      charSpacing: 4
    });
  }

  // Footer line
  slide.addShape('line', {
    x: layout.contentX,
    y: layout.footerY,
    w: layout.contentWidth,
    h: 0,
    line: { color: colors.border, width: 0.75 }
  });

  // Footer text left
  if (footerText) {
    slide.addText(footerText, {
      x: layout.contentX,
      y: layout.footerTextY,
      w: 8,
      h: 0.3,
      fontSize: 9,
      fontFace: fonts.body,
      color: colors.textMuted
    });
  }

  // Footer text right (with page number)
  if (footerRight && pageNum) {
    const rightText = footerRight.replace('{pageNum}', pageNum);
    slide.addText(rightText, {
      x: 8.5,
      y: layout.footerTextY,
      w: 4.2,
      h: 0.3,
      fontSize: 9,
      fontFace: fonts.body,
      color: colors.textMuted,
      align: 'right'
    });
  }
}

/**
 * Add slide title
 * @param {object} slide - PptxGenJS slide object
 * @param {object} theme - Theme configuration
 * @param {string} title - Title text
 * @param {object} options - Additional options
 */
export function addTitle(slide, theme, title, options = {}) {
  const { colors, fonts, fontSize, layout } = theme;
  const { y = layout.titleY, color = colors.primary } = options;

  slide.addText(title, {
    x: layout.contentX,
    y,
    w: layout.contentWidth,
    h: layout.titleHeight,
    fontSize: fontSize.slideTitle,
    fontFace: fonts.heading,
    bold: true,
    color
  });
}

/**
 * Add subtitle below title
 * @param {object} slide - PptxGenJS slide object
 * @param {object} theme - Theme configuration
 * @param {string} subtitle - Subtitle text
 * @param {object} options - Additional options
 */
export function addSubtitle(slide, theme, subtitle, options = {}) {
  const { colors, fonts, fontSize, layout } = theme;
  const { y = 1.4 } = options;

  slide.addText(subtitle, {
    x: layout.contentX,
    y,
    w: layout.contentWidth,
    h: 0.4,
    fontSize: fontSize.heading,
    fontFace: fonts.body,
    color: colors.textMuted
  });
}

export default { addChrome, addTitle, addSubtitle };
