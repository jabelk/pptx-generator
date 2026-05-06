/**
 * Card Components
 *
 * Cards are boxed content areas used for organizing information
 * in grids (2-up, 3-up, 4-up layouts).
 */

/**
 * Add a grid of cards
 * @param {object} slide - PptxGenJS slide object
 * @param {object} theme - Theme configuration
 * @param {object} options - Card grid options
 * @param {Array} options.cards - Array of card objects
 * @param {number} options.columns - Number of columns (2, 3, or 4)
 * @param {number} options.y - Starting Y position
 * @param {number} options.height - Card height
 */
export function addCardGrid(slide, theme, options = {}) {
  const { colors, fonts, layout, spacing } = theme;
  const {
    cards = [],
    columns = 3,
    y = 1.6,
    height = 3.6
  } = options;

  const totalWidth = layout.contentWidth;
  const gap = spacing.cardGap;
  const cardWidth = (totalWidth - (gap * (columns - 1))) / columns;

  cards.forEach((card, i) => {
    if (i >= columns) return; // Only render up to column count

    const x = layout.contentX + (i * (cardWidth + gap));

    // Card background
    slide.addShape('rect', {
      x, y,
      w: cardWidth,
      h: height,
      fill: { color: colors.bgWhite },
      line: { color: card.borderColor || colors.border, width: 1 }
    });

    // Header (if provided)
    if (card.header) {
      slide.addShape('rect', {
        x, y,
        w: cardWidth,
        h: 0.6,
        fill: { color: card.headerColor || colors.primary }
      });

      slide.addText(card.header, {
        x: x + 0.15,
        y,
        w: cardWidth - 0.3,
        h: 0.6,
        fontSize: 14,
        fontFace: fonts.body,
        bold: true,
        color: colors.textLight,
        valign: 'middle'
      });
    }

    // Title (below header or at top)
    const titleY = card.header ? y + 0.7 : y + 0.15;
    if (card.title) {
      slide.addText(card.title, {
        x: x + 0.15,
        y: titleY,
        w: cardWidth - 0.3,
        h: 0.4,
        fontSize: 12,
        fontFace: fonts.body,
        bold: true,
        color: colors.primary
      });
    }

    // Description (single text block) or Bullets (list)
    const contentY = titleY + (card.title ? 0.5 : 0);

    if (card.description) {
      // Render description as wrapped text
      slide.addText(card.description, {
        x: x + 0.15,
        y: contentY,
        w: cardWidth - 0.3,
        h: height - contentY + y - 0.2,
        fontSize: 11,
        fontFace: fonts.body,
        color: colors.textDark,
        valign: 'top'
      });
    } else if (card.bullets && card.bullets.length > 0) {
      // Render bullets as list
      card.bullets.forEach((bullet, j) => {
        slide.addText(`• ${bullet}`, {
          x: x + 0.15,
          y: contentY + (j * 0.5),
          w: cardWidth - 0.3,
          h: 0.45,
          fontSize: 11,
          fontFace: fonts.body,
          color: colors.textDark
        });
      });
    }
  });
}

/**
 * Add a single card with icon/number
 * @param {object} slide - PptxGenJS slide object
 * @param {object} theme - Theme configuration
 * @param {object} options - Card options
 */
export function addNumberedCard(slide, theme, options = {}) {
  const { colors, fonts } = theme;
  const {
    x, y,
    w = 3.0,
    h = 1.5,
    number,
    title,
    items = [],
    bgColor = colors.bgLight
  } = options;

  // Background
  slide.addShape('rect', {
    x, y, w, h,
    fill: { color: bgColor },
    line: { color: colors.border, width: 0.75 }
  });

  // Number circle
  if (number) {
    slide.addShape('ellipse', {
      x: x + 0.2,
      y: y + 0.4,
      w: 0.7,
      h: 0.7,
      fill: { color: colors.primary }
    });
    slide.addText(String(number), {
      x: x + 0.2,
      y: y + 0.4,
      w: 0.7,
      h: 0.7,
      fontSize: 18,
      fontFace: fonts.body,
      bold: true,
      color: colors.textLight,
      align: 'center',
      valign: 'middle'
    });
  }

  // Title
  if (title) {
    slide.addText(title, {
      x: x + (number ? 1.1 : 0.2),
      y: y + 0.15,
      w: w - (number ? 1.3 : 0.4),
      h: 0.4,
      fontSize: 14,
      fontFace: fonts.body,
      bold: true,
      color: colors.primary
    });
  }

  // Items
  items.forEach((item, i) => {
    slide.addText(`• ${item}`, {
      x: x + (number ? 1.1 : 0.2),
      y: y + 0.55 + (i * 0.3),
      w: w - (number ? 1.3 : 0.4),
      h: 0.28,
      fontSize: 11,
      fontFace: fonts.body,
      color: colors.textDark
    });
  });
}

export default { addCardGrid, addNumberedCard };
