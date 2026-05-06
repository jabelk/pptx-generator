/**
 * Takeaway Box Component
 *
 * A highlighted callout box typically placed at the bottom of slides
 * to emphasize key insights or conclusions.
 */

/**
 * Add a takeaway/insight box
 * @param {object} slide - PptxGenJS slide object
 * @param {object} theme - Theme configuration
 * @param {object} options - Takeaway options
 * @param {string} options.label - Label text (e.g., "Key insight", "Bottom line")
 * @param {string} options.text - Main takeaway text
 * @param {number} options.y - Y position (default: 6.0)
 * @param {number} options.height - Box height (default: from theme)
 */
export function addTakeawayBox(slide, theme, options = {}) {
  const { colors, fonts, layout, spacing } = theme;
  const {
    label = 'Key takeaway',
    text,
    y = 6.0,
    height = layout.takeawayHeight
  } = options;

  if (!text) return;

  // Background
  slide.addShape('rect', {
    x: layout.contentX,
    y,
    w: layout.contentWidth,
    h: height,
    fill: { color: colors.bgLight },
    line: { color: colors.bgLight }
  });

  // Left accent bar
  slide.addShape('rect', {
    x: layout.contentX,
    y,
    w: 0.08,
    h: height,
    fill: { color: colors.accent },
    line: { color: colors.accent }
  });

  // Text with label
  slide.addText([
    { text: `${label}: `, options: { bold: true, color: colors.primary } },
    { text, options: { color: colors.textDark } }
  ], {
    x: layout.contentX + 0.3,
    y: y + 0.1,
    w: layout.contentWidth - 0.5,
    h: height - 0.2,
    fontSize: 13,
    fontFace: fonts.body,
    valign: 'middle'
  });
}

/**
 * Add a callout box (similar to takeaway but more flexible)
 * @param {object} slide - PptxGenJS slide object
 * @param {object} theme - Theme configuration
 * @param {object} options - Callout options
 */
export function addCalloutBox(slide, theme, options = {}) {
  const { colors, fonts, layout } = theme;
  const {
    x = layout.contentX,
    y,
    w = layout.contentWidth,
    h = 1.0,
    text,
    accentColor = colors.accent,
    bgColor = colors.bgLight
  } = options;

  // Background
  slide.addShape('rect', {
    x, y, w, h,
    fill: { color: bgColor },
    line: { color: bgColor }
  });

  // Left accent
  slide.addShape('rect', {
    x, y,
    w: 0.06,
    h,
    fill: { color: accentColor },
    line: { color: accentColor }
  });

  // Text
  if (text) {
    slide.addText(text, {
      x: x + 0.2,
      y: y + 0.1,
      w: w - 0.4,
      h: h - 0.2,
      fontSize: 12,
      fontFace: fonts.body,
      color: colors.textDark,
      valign: 'middle'
    });
  }
}

export default { addTakeawayBox, addCalloutBox };
