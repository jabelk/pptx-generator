/**
 * SVG Utilities
 *
 * Helpers for working with SVG diagrams in presentations:
 * - SVG to PNG conversion preparation
 * - Architecture diagram helpers
 * - Shape path utilities
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, isAbsolute } from 'path';

/**
 * Read SVG file contents
 * @param {string} svgPath - Path to SVG file
 * @param {string} basePath - Base directory for relative paths
 * @returns {string} SVG content
 */
export function readSvgFile(svgPath, basePath = process.cwd()) {
  const absolutePath = isAbsolute(svgPath) ? svgPath : resolve(basePath, svgPath);

  if (!existsSync(absolutePath)) {
    throw new Error(`SVG file not found: ${absolutePath}`);
  }

  return readFileSync(absolutePath, 'utf-8');
}

/**
 * Convert SVG string to data URI for embedding
 * @param {string} svgContent - SVG content string
 * @returns {string} Data URI
 */
export function svgToDataUri(svgContent) {
  // Encode SVG for data URI (URL encode special characters)
  const encoded = encodeURIComponent(svgContent)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  return `data:image/svg+xml,${encoded}`;
}

/**
 * Create a simple box shape for architecture diagrams
 * @param {object} slide - PptxGenJS slide
 * @param {object} theme - Theme configuration
 * @param {object} options - Box options
 */
export function addArchitectureBox(slide, theme, options = {}) {
  const { colors, fonts } = theme;
  const {
    x,
    y,
    w = 2,
    h = 1,
    label,
    sublabel,
    bgColor = colors.primary,
    textColor = colors.textLight,
    borderColor = null,
    icon = null
  } = options;

  // Box background
  slide.addShape('roundRect', {
    x,
    y,
    w,
    h,
    fill: { color: bgColor },
    line: borderColor ? { color: borderColor, pt: 1 } : null
  });

  // Icon (if provided)
  if (icon) {
    slide.addText(icon, {
      x,
      y: y + 0.1,
      w,
      h: 0.4,
      fontSize: 16,
      fontFace: fonts.body,
      color: textColor,
      align: 'center'
    });
  }

  // Label
  if (label) {
    const labelY = icon ? y + 0.45 : y + (sublabel ? 0.2 : 0.25);
    slide.addText(label, {
      x,
      y: labelY,
      w,
      h: 0.4,
      fontSize: 11,
      fontFace: fonts.body,
      bold: true,
      color: textColor,
      align: 'center',
      valign: 'middle'
    });
  }

  // Sublabel
  if (sublabel) {
    slide.addText(sublabel, {
      x,
      y: y + h - 0.35,
      w,
      h: 0.3,
      fontSize: 8,
      fontFace: fonts.body,
      color: textColor,
      align: 'center'
    });
  }
}

/**
 * Add an arrow connector between two points
 * @param {object} slide - PptxGenJS slide
 * @param {object} theme - Theme configuration
 * @param {object} options - Arrow options
 */
export function addArrowConnector(slide, theme, options = {}) {
  const { colors } = theme;
  const {
    x1,
    y1,
    x2,
    y2,
    color = colors.accent,
    width = 1.5,
    headLength = 0.15,
    headWidth = 0.1
  } = options;

  slide.addShape('line', {
    x: x1,
    y: y1,
    w: x2 - x1,
    h: y2 - y1,
    line: {
      color,
      pt: width,
      headEnd: { type: 'arrow', w: headWidth, len: headLength }
    }
  });
}

/**
 * Add a bi-directional arrow connector
 * @param {object} slide - PptxGenJS slide
 * @param {object} theme - Theme configuration
 * @param {object} options - Arrow options
 */
export function addBidirectionalArrow(slide, theme, options = {}) {
  const { colors } = theme;
  const {
    x1,
    y1,
    x2,
    y2,
    color = colors.accent,
    width = 1.5
  } = options;

  slide.addShape('line', {
    x: x1,
    y: y1,
    w: x2 - x1,
    h: y2 - y1,
    line: {
      color,
      pt: width,
      headEnd: { type: 'arrow' },
      tailEnd: { type: 'arrow' }
    }
  });
}

/**
 * Add a label on a connector line
 * @param {object} slide - PptxGenJS slide
 * @param {object} theme - Theme configuration
 * @param {object} options - Label options
 */
export function addConnectorLabel(slide, theme, options = {}) {
  const { colors, fonts } = theme;
  const {
    x,
    y,
    text,
    bgColor = colors.bgWhite,
    textColor = colors.textMuted
  } = options;

  // Small background box
  slide.addShape('rect', {
    x: x - 0.4,
    y: y - 0.12,
    w: 0.8,
    h: 0.24,
    fill: { color: bgColor }
  });

  // Label text
  slide.addText(text, {
    x: x - 0.4,
    y: y - 0.12,
    w: 0.8,
    h: 0.24,
    fontSize: 8,
    fontFace: fonts.body,
    color: textColor,
    align: 'center',
    valign: 'middle'
  });
}

/**
 * Create a simple flow diagram (horizontal)
 * @param {object} slide - PptxGenJS slide
 * @param {object} theme - Theme configuration
 * @param {object} options - Diagram options
 */
export function addFlowDiagram(slide, theme, options = {}) {
  const { colors } = theme;
  const {
    boxes = [],
    startX = 1,
    startY = 3,
    boxWidth = 2,
    boxHeight = 1,
    gap = 0.5,
    arrowColor = colors.accent
  } = options;

  boxes.forEach((box, i) => {
    const x = startX + i * (boxWidth + gap);

    // Add box
    addArchitectureBox(slide, theme, {
      x,
      y: startY,
      w: boxWidth,
      h: boxHeight,
      ...box
    });

    // Add arrow to next box (except last)
    if (i < boxes.length - 1) {
      addArrowConnector(slide, theme, {
        x1: x + boxWidth + 0.05,
        y1: startY + boxHeight / 2,
        x2: x + boxWidth + gap - 0.05,
        y2: startY + boxHeight / 2,
        color: arrowColor
      });
    }
  });
}

/**
 * Create a vertical stack of boxes
 * @param {object} slide - PptxGenJS slide
 * @param {object} theme - Theme configuration
 * @param {object} options - Stack options
 */
export function addVerticalStack(slide, theme, options = {}) {
  const { colors } = theme;
  const {
    boxes = [],
    startX = 5,
    startY = 1.5,
    boxWidth = 3,
    boxHeight = 0.8,
    gap = 0.3,
    showArrows = true,
    arrowColor = colors.accent
  } = options;

  boxes.forEach((box, i) => {
    const y = startY + i * (boxHeight + gap);

    // Add box
    addArchitectureBox(slide, theme, {
      x: startX,
      y,
      w: boxWidth,
      h: boxHeight,
      ...box
    });

    // Add arrow to next box (except last)
    if (showArrows && i < boxes.length - 1) {
      addArrowConnector(slide, theme, {
        x1: startX + boxWidth / 2,
        y1: y + boxHeight + 0.05,
        x2: startX + boxWidth / 2,
        y2: y + boxHeight + gap - 0.05,
        color: arrowColor
      });
    }
  });
}

export default {
  readSvgFile,
  svgToDataUri,
  addArchitectureBox,
  addArrowConnector,
  addBidirectionalArrow,
  addConnectorLabel,
  addFlowDiagram,
  addVerticalStack
};
