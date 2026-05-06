#!/usr/bin/env node
/**
 * QA CLI for pptx-generator
 *
 * Validates generated PPTX files against their source configs.
 *
 * Usage:
 *   node qa.js <presentation.pptx> [config.json]
 *
 * Or with Docker:
 *   docker run -v $(pwd):/workspace pptx-generator-qa presentation.pptx config.json
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { extractText, validateAgainstConfig, generateReport } from './src/qa/extract-text.js';

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  console.log(`
pptx-generator QA - Validate generated presentations

Usage:
  pptx-qa <presentation.pptx> [config.json]

Arguments:
  presentation.pptx  The generated PPTX file to validate
  config.json        Optional: Original config to validate against

Modes:
  Without config:    Extracts and displays all text content from slides
  With config:       Validates that expected content appears on each slide

Examples:
  # Extract text only
  node qa.js output.pptx

  # Validate against config
  node qa.js output.pptx config.json

Exit codes:
  0 - Validation passed (or extraction completed)
  1 - Validation failed or error occurred
`);
  process.exit(0);
}

const pptxPath = args[0];
const configPath = args[1];

async function main() {
  try {
    const resolvedPptx = resolve(process.cwd(), pptxPath);

    if (configPath) {
      // Validate mode
      const resolvedConfig = resolve(process.cwd(), configPath);
      const configText = readFileSync(resolvedConfig, 'utf-8');
      const config = JSON.parse(configText);

      console.log(`Validating: ${pptxPath}`);
      console.log(`Against:    ${configPath}`);
      console.log('');

      const results = await validateAgainstConfig(resolvedPptx, config);
      console.log(generateReport(results));

      process.exit(results.valid ? 0 : 1);
    } else {
      // Extract mode
      console.log(`Extracting text from: ${pptxPath}`);
      console.log('');

      const slides = await extractText(resolvedPptx);

      console.log('═══════════════════════════════════════════════════════════');
      console.log('                 PPTX TEXT EXTRACTION                       ');
      console.log('═══════════════════════════════════════════════════════════');
      console.log('');
      console.log(`Total slides: ${slides.length}`);
      console.log('');

      slides.forEach(slide => {
        console.log(`─── Slide ${slide.slideNumber} (${slide.rawTextCount} text elements) ───`);
        slide.textContent.forEach((text, i) => {
          console.log(`  [${i + 1}] ${text}`);
        });
        console.log('');
      });

      console.log('═══════════════════════════════════════════════════════════');
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`Error: File not found: ${err.path}`);
    } else {
      console.error(`Error: ${err.message}`);
    }
    process.exit(1);
  }
}

main();
