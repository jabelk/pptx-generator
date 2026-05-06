/**
 * Checklist/Requirements Slide Builder
 *
 * Creates status tables with requirements, statuses,
 * and colored badges for tracking completion.
 */

import { addChrome, addTitle } from '../components/chrome.js';
import { addTakeawayBox } from '../components/takeaway.js';

/**
 * Add a requirements checklist slide
 * @param {object} pptx - PptxGenJS instance
 * @param {object} theme - Theme configuration
 * @param {object} options - Slide options
 * @param {string} options.title - Slide title
 * @param {Array} options.rows - Row data [{req, status, statusColor, notes}]
 * @param {object} options.takeaway - Takeaway box options
 * @param {string} options.sectionLabel - Section label
 * @param {number} options.pageNum - Page number
 * @param {object} options.footer - Footer options
 * @returns {object} The created slide
 */
export function addChecklistSlide(pptx, theme, options = {}) {
  const { colors, fonts, layout } = theme;
  const {
    title = 'Requirements Checklist',
    rows = [],
    takeaway,
    sectionLabel = 'Alignment',
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

  // Table dimensions
  const tableX = layout.contentX;
  const tableY = 1.55;
  const tableW = layout.contentWidth;
  const rowHeight = 0.55;
  const headerHeight = 0.5;

  // Column widths
  const reqWidth = 4;
  const statusWidth = 1.8;
  const notesWidth = tableW - reqWidth - statusWidth;

  // Header row
  slide.addShape('rect', {
    x: tableX,
    y: tableY,
    w: tableW,
    h: headerHeight,
    fill: { color: colors.primary }
  });

  slide.addText('Requirement', {
    x: tableX + 0.1,
    y: tableY,
    w: reqWidth - 0.2,
    h: headerHeight,
    fontSize: 11,
    fontFace: fonts.body,
    bold: true,
    color: colors.textLight,
    valign: 'middle'
  });

  slide.addText('Status', {
    x: tableX + reqWidth,
    y: tableY,
    w: statusWidth,
    h: headerHeight,
    fontSize: 11,
    fontFace: fonts.body,
    bold: true,
    color: colors.textLight,
    valign: 'middle',
    align: 'center'
  });

  slide.addText('Notes', {
    x: tableX + reqWidth + statusWidth + 0.1,
    y: tableY,
    w: notesWidth - 0.2,
    h: headerHeight,
    fontSize: 11,
    fontFace: fonts.body,
    bold: true,
    color: colors.textLight,
    valign: 'middle'
  });

  // Data rows
  rows.forEach((row, i) => {
    const rowY = tableY + headerHeight + 0.05 + (i * rowHeight);
    const bgColor = i % 2 === 0 ? colors.bgLight : colors.bgWhite;

    // Row background
    slide.addShape('rect', {
      x: tableX,
      y: rowY,
      w: tableW,
      h: rowHeight,
      fill: { color: bgColor },
      line: { color: colors.border, width: 0.5 }
    });

    // Requirement text
    slide.addText(row.req || row.requirement || '', {
      x: tableX + 0.1,
      y: rowY,
      w: reqWidth - 0.2,
      h: rowHeight,
      fontSize: 10,
      fontFace: fonts.body,
      color: colors.textDark,
      valign: 'middle'
    });

    // Status badge
    const statusColor = row.statusColor || (
      row.status?.toLowerCase().includes('complete') ? colors.green :
      row.status?.toLowerCase().includes('progress') ? colors.amber :
      row.status?.toLowerCase().includes('test') ? colors.amber :
      colors.green
    );

    slide.addShape('roundRect', {
      x: tableX + reqWidth + 0.1,
      y: rowY + 0.1,
      w: statusWidth - 0.2,
      h: 0.35,
      fill: { color: statusColor }
    });

    slide.addText(row.status || '', {
      x: tableX + reqWidth + 0.1,
      y: rowY + 0.1,
      w: statusWidth - 0.2,
      h: 0.35,
      fontSize: 9,
      fontFace: fonts.body,
      bold: true,
      color: colors.textLight,
      align: 'center',
      valign: 'middle'
    });

    // Notes
    slide.addText(row.notes || '', {
      x: tableX + reqWidth + statusWidth + 0.1,
      y: rowY,
      w: notesWidth - 0.2,
      h: rowHeight,
      fontSize: 10,
      fontFace: fonts.body,
      color: colors.textMuted,
      valign: 'middle'
    });
  });

  // Takeaway
  if (takeaway) {
    addTakeawayBox(slide, theme, {
      ...takeaway,
      y: 6.4
    });
  }

  return slide;
}

export default { addChecklistSlide };
