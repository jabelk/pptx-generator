/**
 * Agenda Slide Builder
 *
 * Creates agenda/table of contents slides with numbered items
 * and descriptions.
 */

import { addChrome, addTitle } from '../components/chrome.js';

/**
 * Add an agenda slide
 * @param {object} pptx - PptxGenJS instance
 * @param {object} theme - Theme configuration
 * @param {object} options - Slide options
 * @param {string} options.title - Slide title (default: "What we'll cover")
 * @param {Array} options.items - Agenda items [{num, title, desc}]
 * @param {string} options.sectionLabel - Section label
 * @param {number} options.pageNum - Page number
 * @param {object} options.footer - Footer options
 * @returns {object} The created slide
 */
export function addAgendaSlide(pptx, theme, options = {}) {
  const { colors, fonts, layout } = theme;
  const {
    title = "What we'll cover",
    items = [],
    sectionLabel = 'Agenda',
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

  // Agenda items - handle both string and object formats
  items.forEach((item, i) => {
    const y = 1.6 + (i * 0.85);

    // Normalize item format: strings become {title: string}
    const normalizedItem = typeof item === 'string' ? { title: item } : item;
    const num = normalizedItem.num || String(i + 1).padStart(2, '0');
    const itemTitle = normalizedItem.title || '';
    const itemDesc = normalizedItem.desc || normalizedItem.description || '';

    // Number
    slide.addText(num, {
      x: layout.contentX,
      y,
      w: 0.7,
      h: 0.7,
      fontSize: 24,
      fontFace: fonts.body,
      bold: true,
      color: colors.accent
    });

    // Title
    slide.addText(itemTitle, {
      x: layout.contentX + 0.85,
      y,
      w: 5,
      h: 0.4,
      fontSize: 18,
      fontFace: fonts.body,
      bold: true,
      color: colors.primary
    });

    // Description
    if (itemDesc) {
      slide.addText(itemDesc, {
        x: layout.contentX + 0.85,
        y: y + 0.4,
        w: 10,
        h: 0.35,
        fontSize: 12,
        fontFace: fonts.body,
        color: colors.textMuted
      });
    }

    // Divider line (except last)
    if (i < items.length - 1) {
      slide.addShape('line', {
        x: layout.contentX,
        y: y + 0.8,
        w: layout.contentWidth,
        h: 0,
        line: { color: colors.border, width: 0.5 }
      });
    }
  });

  return slide;
}

export default { addAgendaSlide };
