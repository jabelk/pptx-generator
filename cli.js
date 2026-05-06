#!/usr/bin/env node
/**
 * CLI for pptx-generator
 *
 * Usage:
 *   node cli.js <config.json> [output.pptx]
 *
 * Or with Docker:
 *   docker run -v $(pwd):/workspace pptx-generator config.json output.pptx
 */

import { readFileSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { buildPresentation } from './src/index.js';

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  console.log(`
pptx-generator - Create PowerPoint presentations from JSON

Usage:
  pptx-generator <config.json> [output.pptx]

Arguments:
  config.json   JSON file with presentation configuration
  output.pptx   Output file path (default: presentation.pptx)

Config file format:
{
  "meta": {
    "title": "Presentation Title",
    "author": "Your Name"
  },
  "theme": "cowork",
  "slides": [
    { "type": "title", "title": "Welcome", "subtitle": "Introduction" },
    { "type": "agenda", "items": ["Topic 1", "Topic 2"] },
    { "type": "content", "title": "Details", "bullets": ["Point 1", "Point 2"] },
    { "type": "summary", "message": "Thank you!" }
  ]
}

Available slide types:
  title, agenda, quote, comparison, phases, workflow,
  checklist, summary, content, demo

Available themes:
  cowork (default), minimal

For images, use paths relative to the config file location.
`);
  process.exit(0);
}

const configPath = args[0];
const outputPath = args[1] || 'presentation.pptx';

// Determine working directory (for Docker: /workspace, otherwise config file's directory)
const workDir = process.env.WORKSPACE || dirname(resolve(configPath));

try {
  // Read and parse config
  const configFile = resolve(configPath);
  const configText = readFileSync(configFile, 'utf-8');
  const config = JSON.parse(configText);

  // Process image paths - make them absolute relative to workDir
  if (config.slides) {
    config.slides = config.slides.map(slide => {
      if (slide.image && slide.image.path && !slide.image.path.startsWith('/')) {
        slide.image.path = resolve(workDir, slide.image.path);
      }
      if (slide.imagePath && !slide.imagePath.startsWith('/')) {
        slide.imagePath = resolve(workDir, slide.imagePath);
      }
      return slide;
    });
  }

  // Build presentation
  const pptx = buildPresentation(config);

  // Determine output path (relative to current directory, not config directory)
  const outputFile = outputPath.startsWith('/')
    ? outputPath
    : resolve(process.cwd(), outputPath);

  // Save
  pptx.writeFile({ fileName: outputFile })
    .then(() => {
      console.log(`Created: ${outputFile}`);
    })
    .catch(err => {
      console.error('Error writing file:', err.message);
      process.exit(1);
    });

} catch (err) {
  if (err.code === 'ENOENT') {
    console.error(`Error: Config file not found: ${configPath}`);
  } else if (err instanceof SyntaxError) {
    console.error(`Error: Invalid JSON in config file: ${err.message}`);
  } else {
    console.error(`Error: ${err.message}`);
  }
  process.exit(1);
}
