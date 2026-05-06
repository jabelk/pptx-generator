#!/usr/bin/env node
/**
 * Extract text content from PPTX files for validation
 *
 * PPTX files are ZIP archives containing XML files.
 * This extracts all text from each slide for QA purposes.
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import JSZip from 'jszip';

/**
 * Decode common HTML entities
 */
function decodeHtmlEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)));
}

/**
 * Extract text from a PPTX file
 * @param {string} pptxPath - Path to PPTX file
 * @returns {Promise<Array>} Array of slide objects with text content
 */
export async function extractText(pptxPath) {
  const absolutePath = resolve(pptxPath);
  const data = readFileSync(absolutePath);
  const zip = await JSZip.loadAsync(data);

  const slides = [];

  // Find all slide XML files
  const slideFiles = Object.keys(zip.files)
    .filter(name => name.match(/^ppt\/slides\/slide\d+\.xml$/))
    .sort((a, b) => {
      const numA = parseInt(a.match(/slide(\d+)/)[1]);
      const numB = parseInt(b.match(/slide(\d+)/)[1]);
      return numA - numB;
    });

  for (const slidePath of slideFiles) {
    const slideNum = parseInt(slidePath.match(/slide(\d+)/)[1]);
    const xml = await zip.files[slidePath].async('string');

    // Extract text from XML (simple regex approach)
    const textMatches = xml.match(/<a:t>([^<]*)<\/a:t>/g) || [];
    const texts = textMatches
      .map(match => match.replace(/<a:t>|<\/a:t>/g, ''))
      .map(text => decodeHtmlEntities(text))
      .filter(text => text.trim().length > 0);

    slides.push({
      slideNumber: slideNum,
      textContent: texts,
      rawTextCount: texts.length,
      combinedText: texts.join(' | ')
    });
  }

  return slides;
}

/**
 * Validate PPTX content against expected structure
 * @param {string} pptxPath - Path to PPTX file
 * @param {object} config - Original config used to generate the PPTX
 * @returns {Promise<object>} Validation results
 */
export async function validateAgainstConfig(pptxPath, config) {
  const slides = await extractText(pptxPath);
  const issues = [];
  const expectedSlideCount = config.slides?.length || 0;

  // Check slide count
  if (slides.length !== expectedSlideCount) {
    issues.push({
      type: 'slide_count_mismatch',
      expected: expectedSlideCount,
      actual: slides.length,
      severity: 'error'
    });
  }

  // Check each slide has content
  slides.forEach((slide, i) => {
    if (slide.textContent.length === 0) {
      issues.push({
        type: 'empty_slide',
        slideNumber: slide.slideNumber,
        severity: 'warning'
      });
    }

    // Check expected content from config
    const configSlide = config.slides?.[i];
    if (configSlide) {
      // Check title is present
      if (configSlide.title && !slide.textContent.some(t => t.includes(configSlide.title))) {
        issues.push({
          type: 'missing_title',
          slideNumber: slide.slideNumber,
          expected: configSlide.title,
          severity: 'error'
        });
      }

      // Check items are present (for agenda slides)
      if (configSlide.items) {
        const itemTexts = configSlide.items.map(item =>
          typeof item === 'string' ? item : item.title
        );
        itemTexts.forEach(itemText => {
          if (itemText && !slide.textContent.some(t => t.includes(itemText))) {
            issues.push({
              type: 'missing_item',
              slideNumber: slide.slideNumber,
              expected: itemText,
              severity: 'error'
            });
          }
        });
      }

      // Check cards content
      if (configSlide.cards) {
        configSlide.cards.forEach(card => {
          if (card.title && !slide.textContent.some(t => t.includes(card.title))) {
            issues.push({
              type: 'missing_card_title',
              slideNumber: slide.slideNumber,
              expected: card.title,
              severity: 'error'
            });
          }
          if (card.description && !slide.textContent.some(t => t.includes(card.description))) {
            issues.push({
              type: 'missing_card_description',
              slideNumber: slide.slideNumber,
              expected: card.description,
              severity: 'error'
            });
          }
        });
      }

      // Check bullets
      if (configSlide.bullets) {
        configSlide.bullets.forEach(bullet => {
          if (!slide.textContent.some(t => t.includes(bullet))) {
            issues.push({
              type: 'missing_bullet',
              slideNumber: slide.slideNumber,
              expected: bullet,
              severity: 'warning'
            });
          }
        });
      }
    }
  });

  return {
    valid: issues.filter(i => i.severity === 'error').length === 0,
    slideCount: slides.length,
    expectedSlideCount,
    issues,
    slides
  };
}

/**
 * Generate a QA report
 * @param {object} results - Validation results
 * @returns {string} Formatted report
 */
export function generateReport(results) {
  const lines = [
    '═══════════════════════════════════════════════════════════',
    '                    PPTX QA REPORT                         ',
    '═══════════════════════════════════════════════════════════',
    '',
    `Status: ${results.valid ? '✓ PASSED' : '✗ FAILED'}`,
    `Slides: ${results.slideCount} (expected: ${results.expectedSlideCount})`,
    ''
  ];

  if (results.issues.length > 0) {
    lines.push('Issues Found:');
    lines.push('─────────────────────────────────────────────────────────────');
    results.issues.forEach(issue => {
      const icon = issue.severity === 'error' ? '✗' : '⚠';
      lines.push(`  ${icon} [Slide ${issue.slideNumber || 'N/A'}] ${issue.type}`);
      if (issue.expected) {
        lines.push(`    Expected: "${issue.expected}"`);
      }
    });
    lines.push('');
  }

  lines.push('Slide Content Summary:');
  lines.push('─────────────────────────────────────────────────────────────');
  results.slides.forEach(slide => {
    const preview = slide.combinedText.substring(0, 80);
    lines.push(`  Slide ${slide.slideNumber}: ${slide.rawTextCount} text elements`);
    lines.push(`    "${preview}${preview.length < slide.combinedText.length ? '...' : ''}"`);
  });

  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════');

  return lines.join('\n');
}

export default { extractText, validateAgainstConfig, generateReport };
