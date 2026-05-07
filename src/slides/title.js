/**
 * Title Slide Builder
 *
 * Creates professional cover/title slides with large text,
 * accent elements, and author/date information.
 */

/**
 * Add a title/cover slide
 * @param {object} pptx - PptxGenJS instance
 * @param {object} theme - Theme configuration
 * @param {object} options - Slide options
 * @param {string} options.eyebrow - Small text above title (e.g., "POC UPDATE")
 * @param {string} options.title - Main title text
 * @param {string} options.subtitle - Subtitle text
 * @param {string} options.tagline - Tagline/description below subtitle
 * @param {string} options.author - Author name
 * @param {string} options.recipient - Recipient name (e.g., "For Liz Miller")
 * @param {string} options.date - Date string
 * @returns {object} The created slide
 */
export function addTitleSlide(pptx, theme, options = {}) {
  const { colors, fonts, fontSize, spacing } = theme;
  const {
    eyebrow,
    title,
    subtitle,
    tagline,
    author,
    recipient,
    date
  } = options;

  const slide = pptx.addSlide();
  slide.background = { color: colors.bgDark };

  // Left accent bar (thicker for title)
  if (spacing.accentBarWidthLarge > 0) {
    slide.addShape('rect', {
      x: 0,
      y: 0,
      w: spacing.accentBarWidthLarge,
      h: '100%',
      fill: { color: colors.accent }
    });
  }

  // Top right accent
  slide.addShape('rect', {
    x: 11.5,
    y: 0,
    w: 1.9,
    h: 0.18,
    fill: { color: colors.accent }
  });

  // Eyebrow text
  if (eyebrow) {
    slide.addText(eyebrow.toUpperCase(), {
      x: 1.1,
      y: 1.2,
      w: 10.5,
      h: 0.45,
      fontSize: 14,
      fontFace: fonts.body,
      bold: true,
      color: colors.accent,
      charSpacing: 6
    });
  }

  // Main title - allow room for 2-line titles at 60pt
  if (title) {
    slide.addText(title, {
      x: 1.1,
      y: 1.7,
      w: 10.5,
      h: 1.5,
      fontSize: fontSize.title,
      fontFace: fonts.heading,
      bold: true,
      color: colors.textLight,
      shrinkText: true
    });
  }

  // Subtitle - positioned below title with gap
  if (subtitle) {
    slide.addText(subtitle, {
      x: 1.1,
      y: 3.25,
      w: 10.5,
      h: 0.7,
      fontSize: fontSize.subtitle,
      fontFace: fonts.heading,
      color: colors.textLight
    });
  }

  // Divider line - positioned below subtitle
  slide.addShape('rect', {
    x: 1.1,
    y: 4.1,
    w: 1.5,
    h: 0.04,
    fill: { color: colors.accent }
  });

  // Tagline - positioned below divider
  if (tagline) {
    slide.addText(tagline, {
      x: 1.1,
      y: 4.3,
      w: 10.5,
      h: 0.55,
      fontSize: 18,
      fontFace: fonts.body,
      italic: true,
      color: colors.lightBlue
    });
  }

  // Author info
  if (author) {
    slide.addText([
      { text: 'Prepared by  ', options: { color: colors.mutedBlue } },
      { text: author, options: { bold: true, color: colors.textLight } }
    ], {
      x: 1.1,
      y: 5.6,
      w: 10.5,
      h: 0.35,
      fontSize: 13,
      fontFace: fonts.body
    });
  }

  // Recipient info
  if (recipient) {
    slide.addText([
      { text: 'For  ', options: { color: colors.mutedBlue } },
      { text: recipient, options: { bold: true, color: colors.textLight } }
    ], {
      x: 1.1,
      y: 5.95,
      w: 10.5,
      h: 0.35,
      fontSize: 13,
      fontFace: fonts.body
    });
  }

  // Date
  if (date) {
    slide.addText(date, {
      x: 1.1,
      y: 6.35,
      w: 10.5,
      h: 0.3,
      fontSize: 12,
      fontFace: fonts.body,
      color: colors.mutedBlue
    });
  }

  return slide;
}

export default { addTitleSlide };
