/**
 * Table Components
 *
 * Professional table layouts with headers, status badges, and alternating rows.
 */

/**
 * Add a status/checklist table
 * @param {object} slide - PptxGenJS slide object
 * @param {object} theme - Theme configuration
 * @param {object} options - Table options
 * @param {Array} options.columns - Column definitions [{name, width}]
 * @param {Array} options.rows - Row data [{col1, col2, status, statusColor}]
 * @param {number} options.y - Starting Y position
 */
export function addStatusTable(slide, theme, options = {}) {
  const { colors, fonts, layout } = theme;
  const {
    columns = [
      { name: 'Item', width: 4 },
      { name: 'Status', width: 1.8 },
      { name: 'Notes', width: 6 }
    ],
    rows = [],
    y = 1.55,
    x = layout.contentX
  } = options;

  const totalWidth = columns.reduce((sum, col) => sum + col.width, 0);
  const rowHeight = 0.55;

  // Header row
  slide.addShape('rect', {
    x, y,
    w: totalWidth,
    h: 0.5,
    fill: { color: colors.primary }
  });

  let colX = x;
  columns.forEach(col => {
    slide.addText(col.name, {
      x: colX + 0.1,
      y,
      w: col.width - 0.2,
      h: 0.5,
      fontSize: 11,
      fontFace: fonts.body,
      bold: true,
      color: colors.textLight,
      valign: 'middle'
    });
    colX += col.width;
  });

  // Data rows
  rows.forEach((row, i) => {
    const rowY = y + 0.55 + (i * rowHeight);
    const bgColor = i % 2 === 0 ? colors.bgLight : colors.bgWhite;

    // Row background
    slide.addShape('rect', {
      x, y: rowY,
      w: totalWidth,
      h: rowHeight,
      fill: { color: bgColor },
      line: { color: colors.border, width: 0.5 }
    });

    // Cell values
    colX = x;
    columns.forEach((col, colIndex) => {
      const value = row[col.key || `col${colIndex}`] || row.values?.[colIndex] || '';

      // Special handling for status column
      if (col.isStatus && row.status) {
        // Status badge
        slide.addShape('roundRect', {
          x: colX + 0.1,
          y: rowY + 0.1,
          w: col.width - 0.2,
          h: 0.35,
          fill: { color: row.statusColor || colors.green }
        });
        slide.addText(row.status, {
          x: colX + 0.1,
          y: rowY + 0.1,
          w: col.width - 0.2,
          h: 0.35,
          fontSize: 9,
          fontFace: fonts.body,
          bold: true,
          color: colors.textLight,
          align: 'center',
          valign: 'middle'
        });
      } else {
        slide.addText(value, {
          x: colX + 0.1,
          y: rowY,
          w: col.width - 0.2,
          h: rowHeight,
          fontSize: 10,
          fontFace: fonts.body,
          color: col.muted ? colors.textMuted : colors.textDark,
          valign: 'middle'
        });
      }
      colX += col.width;
    });
  });
}

/**
 * Add a simple data table
 * @param {object} slide - PptxGenJS slide object
 * @param {object} theme - Theme configuration
 * @param {object} options - Table options
 */
export function addDataTable(slide, theme, options = {}) {
  const { colors, fonts, layout } = theme;
  const {
    headers = [],
    data = [],
    x = layout.contentX,
    y = 1.6,
    colWidths = null,
    headerColor = colors.primary
  } = options;

  // Auto-calculate column widths if not provided
  const numCols = headers.length || (data[0]?.length || 0);
  const widths = colWidths || Array(numCols).fill(layout.contentWidth / numCols);

  // Build table rows for PptxGenJS native table
  const tableRows = [];

  // Header row
  if (headers.length > 0) {
    tableRows.push(headers.map(h => ({
      text: h,
      options: {
        bold: true,
        color: colors.textLight,
        fill: { color: headerColor }
      }
    })));
  }

  // Data rows
  data.forEach((row, i) => {
    const rowData = (Array.isArray(row) ? row : Object.values(row)).map(cell => ({
      text: String(cell),
      options: {
        fill: { color: i % 2 === 0 ? colors.bgLight : colors.bgWhite }
      }
    }));
    tableRows.push(rowData);
  });

  // Add table
  slide.addTable(tableRows, {
    x, y,
    colW: widths,
    fontFace: fonts.body,
    fontSize: 10,
    color: colors.textDark,
    border: { color: colors.border, pt: 0.5 },
    valign: 'middle'
  });
}

export default { addStatusTable, addDataTable };
