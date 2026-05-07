# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PptxGenerator is a JavaScript library for creating professional PowerPoint presentations programmatically, built on PptxGenJS. It provides 10 slide types, 2 themes, and a QA validation system.

## Commands

```bash
npm install                          # Install dependencies
npm run example:basic                # Run basic example
npm run example:diagrams             # Run diagrams example
node cli.js config.json output.pptx  # Generate from JSON config
node qa.js output.pptx config.json   # Validate PPTX against config
node qa.js output.pptx               # Extract text only (inspection)

# Docker
npm run docker:build                 # Build Docker image
docker run -v $(pwd):/workspace pptx-generator config.json output.pptx
```

## Architecture

```
User Input (JSON/JS) → Entry Points (cli.js, src/index.js)
                              ↓
                    Theme System (src/themes/)
                              ↓
                    Slide Builders (src/slides/)
                              ↓
                    Components (src/components/)
                              ↓
                    PptxGenJS → .pptx file
```

**Key modules:**
- `src/index.js` - Main exports: `createPresentation()`, `addSlide()`, `buildPresentation()`
- `src/themes/` - Theme definitions (cowork, minimal) with colors, fonts, spacing
- `src/slides/` - Slide builders: title, agenda, quote, comparison, phases, workflow, checklist, summary, content, demo
- `src/components/` - Reusable elements: chrome (header/footer/accent bar), cards (grids, numbered), tables (status, data), takeaway (callout boxes)
- `src/utils/` - Image path handling, SVG diagram primitives

**Slide builder pattern:**
```javascript
export function addXxxSlide(pptx, theme, options) {
  const slide = pptx.addSlide();
  slide.background = { color: theme.colors.bgWhite };
  addChrome(slide, theme, options);  // Header, footer, accent bar
  addTitle(slide, theme, options.title);
  // Add slide-specific content...
  return slide;
}
```

## Critical Requirements

### Image Paths Must Be Absolute

PptxGenJS requires absolute paths. Relative paths fail silently.

```javascript
import { resolve } from 'path';

// CORRECT
image: { path: '/Users/name/project/images/logo.png' }
image: { path: resolve(import.meta.dirname, '../images/logo.png') }

// WRONG - fails silently
image: { path: './images/logo.png' }
```

### Use Object Form for writeFile

```javascript
// CORRECT
pptx.writeFile({ fileName: 'output.pptx' })

// DEPRECATED (works but warns)
pptx.writeFile('output.pptx')
```

### Always Use Theme Colors

Never hardcode colors:
```javascript
// WRONG
slide.addText("Title", { color: '0D2A5C' });

// CORRECT
slide.addText("Title", { color: theme.colors.primary });
```

## Input Flexibility

The library normalizes inputs. Both formats work:

```javascript
// Agenda items - strings or objects
items: ["Topic 1", "Topic 2"]
items: [{ title: "Topic 1", desc: "Details" }]

// Cards - description OR bullets (not both)
cards: [{ title: "Feature", description: "Explanation" }]
cards: [{ title: "Feature", bullets: ["Point 1", "Point 2"] }]
```

## Adding New Slide Types

1. Create `src/slides/newtype.js` with `addNewTypeSlide(pptx, theme, options)`
2. Export from `src/slides/index.js`
3. Add to `slideBuilders` map in `src/index.js:84`

## QA Validation

Always validate generated presentations:
```bash
node qa.js output.pptx config.json  # Exit 0 = pass, 1 = fail
```

The QA tool extracts all text from PPTX XML and verifies expected content is present.
