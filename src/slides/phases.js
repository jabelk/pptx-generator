/**
 * Phases/Timeline Slide Builder
 *
 * Creates timeline, roadmap, or phase-based slides
 * with connected boxes showing progression.
 */

import { addChrome, addTitle } from '../components/chrome.js';
import { addTakeawayBox } from '../components/takeaway.js';

/**
 * Add a phases/timeline slide
 * @param {object} pptx - PptxGenJS instance
 * @param {object} theme - Theme configuration
 * @param {object} options - Slide options
 * @param {string} options.title - Slide title
 * @param {string} options.subtitle - Slide subtitle
 * @param {Array} options.phases - Phase data [{num, name, desc, tasks}]
 * @param {boolean} options.showArrows - Show arrows between phases
 * @param {object} options.takeaway - Takeaway box options
 * @param {string} options.sectionLabel - Section label
 * @param {number} options.pageNum - Page number
 * @param {object} options.footer - Footer options
 * @returns {object} The created slide
 */
export function addPhasesSlide(pptx, theme, options = {}) {
  const { colors, fonts, layout, spacing } = theme;
  const {
    title,
    subtitle,
    phases = [],
    showArrows = true,
    takeaway,
    sectionLabel = 'Roadmap',
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

  // Subtitle
  if (subtitle) {
    slide.addText(subtitle, {
      x: layout.contentX,
      y: 1.4,
      w: layout.contentWidth,
      h: 0.35,
      fontSize: 14,
      fontFace: fonts.body,
      color: colors.textMuted
    });
  }

  // Calculate box dimensions
  const numPhases = phases.length;
  const totalWidth = layout.contentWidth;
  const gap = 0.2;
  const boxWidth = (totalWidth - (gap * (numPhases - 1))) / numPhases;
  const boxHeight = 4.0;
  const startY = 1.7;

  phases.forEach((phase, i) => {
    const x = layout.contentX + (i * (boxWidth + gap));

    // Phase box background
    slide.addShape('rect', {
      x,
      y: startY,
      w: boxWidth,
      h: boxHeight,
      fill: { color: colors.bgLight },
      line: { color: colors.border, pt: 0.75 }
    });

    // Phase header
    slide.addShape('rect', {
      x,
      y: startY,
      w: boxWidth,
      h: 0.6,
      fill: { color: colors.primary }
    });

    const phaseNum = phase.num || String(i + 1);
    slide.addText(`Phase ${phaseNum}`, {
      x,
      y: startY,
      w: boxWidth,
      h: 0.6,
      fontSize: 13,
      fontFace: fonts.body,
      bold: true,
      color: colors.textLight,
      align: 'center',
      valign: 'middle'
    });

    // Phase name
    if (phase.name) {
      slide.addText(phase.name, {
        x: x + 0.1,
        y: startY + 0.75,
        w: boxWidth - 0.2,
        h: 0.4,
        fontSize: 14,
        fontFace: fonts.body,
        bold: true,
        color: colors.primary,
        align: 'center'
      });
    }

    // Phase description
    if (phase.desc) {
      slide.addText(phase.desc, {
        x: x + 0.1,
        y: startY + 1.15,
        w: boxWidth - 0.2,
        h: 0.35,
        fontSize: 11,
        fontFace: fonts.body,
        color: colors.accent,
        align: 'center'
      });
    }

    // Tasks/items
    if (phase.tasks && phase.tasks.length > 0) {
      phase.tasks.forEach((task, j) => {
        slide.addText(`• ${task}`, {
          x: x + 0.15,
          y: startY + 1.65 + (j * 0.5),
          w: boxWidth - 0.3,
          h: 0.45,
          fontSize: 10,
          fontFace: fonts.body,
          color: colors.textDark
        });
      });
    }

    // Arrow to next phase (except last)
    if (showArrows && i < numPhases - 1) {
      slide.addText('→', {
        x: x + boxWidth - 0.1,
        y: startY + 1.5,
        w: gap + 0.2,
        h: 0.5,
        fontSize: 24,
        fontFace: fonts.body,
        bold: true,
        color: colors.accent,
        align: 'center'
      });
    }
  });

  // Takeaway
  if (takeaway) {
    addTakeawayBox(slide, theme, {
      ...takeaway,
      y: 5.9
    });
  }

  return slide;
}

/**
 * Add a workflow/process slide with chevron steps
 * @param {object} pptx - PptxGenJS instance
 * @param {object} theme - Theme configuration
 * @param {object} options - Slide options
 */
export function addWorkflowSlide(pptx, theme, options = {}) {
  const { colors, fonts, layout } = theme;
  const {
    title,
    steps = [],
    takeaway,
    sectionLabel = 'Workflow',
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

  const numSteps = steps.length;
  const stepWidth = (layout.contentWidth - 0.5) / numSteps;

  steps.forEach((step, i) => {
    const x = layout.contentX + (i * stepWidth);

    // Step header
    slide.addShape('rect', {
      x,
      y: 1.7,
      w: stepWidth - 0.2,
      h: 0.7,
      fill: { color: colors.primary }
    });

    // Arrow connector (except last)
    if (i < numSteps - 1) {
      slide.addText('→', {
        x: x + stepWidth - 0.35,
        y: 1.7,
        w: 0.5,
        h: 0.7,
        fontSize: 28,
        fontFace: fonts.body,
        bold: true,
        color: colors.accent,
        valign: 'middle'
      });
    }

    const stepNum = step.num || String(i + 1);
    slide.addText(`${stepNum}. ${step.title}`, {
      x: x + 0.15,
      y: 1.7,
      w: stepWidth - 0.5,
      h: 0.7,
      fontSize: 14,
      fontFace: fonts.body,
      bold: true,
      color: colors.textLight,
      valign: 'middle'
    });

    // Time badge (if provided)
    if (step.time) {
      slide.addShape('roundRect', {
        x: x + (stepWidth - 1.5) / 2,
        y: 2.55,
        w: 1.3,
        h: 0.4,
        fill: { color: colors.accent }
      });
      slide.addText(step.time, {
        x: x + (stepWidth - 1.5) / 2,
        y: 2.55,
        w: 1.3,
        h: 0.4,
        fontSize: 11,
        fontFace: fonts.body,
        bold: true,
        color: colors.textLight,
        align: 'center',
        valign: 'middle'
      });
    }

    // Bullets
    if (step.bullets && step.bullets.length > 0) {
      const bulletStartY = step.time ? 3.1 : 2.6;
      step.bullets.forEach((bullet, j) => {
        slide.addText(`• ${bullet}`, {
          x: x + 0.1,
          y: bulletStartY + (j * 0.5),
          w: stepWidth - 0.3,
          h: 0.45,
          fontSize: 11,
          fontFace: fonts.body,
          color: colors.textDark
        });
      });
    }
  });

  // Takeaway
  if (takeaway) {
    addTakeawayBox(slide, theme, {
      ...takeaway,
      y: 5.0
    });
  }

  return slide;
}

export default { addPhasesSlide, addWorkflowSlide };
