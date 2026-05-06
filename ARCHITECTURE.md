# Architecture

Technical design decisions and code structure.

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        User Input                           │
│  (JSON config or JavaScript code)                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Entry Points                           │
│  cli.js (JSON → PPTX)    src/index.js (programmatic API)   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Theme System                          │
│  src/themes/{cowork,minimal}.js → getTheme(), extendTheme() │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Slide Builders                          │
│  src/slides/{title,agenda,content,...}.js                   │
│  Each exports addXxxSlide(pptx, theme, options)             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Components                             │
│  src/components/{chrome,cards,tables,takeaway}.js           │
│  Reusable visual elements added to slides                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      PptxGenJS                              │
│  pptx.addSlide(), slide.addText(), slide.addShape(), etc.   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Output (.pptx)                          │
│  ZIP archive containing XML, images, relationships          │
└─────────────────────────────────────────────────────────────┘
```

## Module Structure

### Entry Points

| File | Purpose |
|------|---------|
| `cli.js` | CLI tool: reads JSON config, outputs PPTX |
| `qa.js` | QA tool: validates PPTX against config |
| `src/index.js` | Library exports for programmatic use |

### Themes (`src/themes/`)

Themes define the visual language:

```javascript
export const cowork = {
  name: 'cowork',
  colors: {
    primary: '0D2A5C',    // Dark navy
    accent: '049FD9',      // Cyan
    textDark: '333333',
    textLight: 'FFFFFF',
    // ...
  },
  fonts: {
    heading: 'Cambria',
    body: 'Calibri'
  },
  fontSize: { title: 36, body: 14 },
  spacing: { margin: 0.5, cardGap: 0.3 },
  layout: { contentX: 0.5, contentWidth: 12.5 }
};
```

### Slides (`src/slides/`)

Each slide type is a function:

```javascript
export function addAgendaSlide(pptx, theme, options) {
  const slide = pptx.addSlide();
  slide.background = { color: theme.colors.bgWhite };

  // Add chrome (header, footer, accent bar)
  addChrome(slide, theme, options);

  // Add title
  addTitle(slide, theme, options.title);

  // Add agenda items
  options.items.forEach((item, i) => {
    // Normalize input format
    const normalized = typeof item === 'string' ? { title: item } : item;
    // Render item...
  });

  return slide;
}
```

### Components (`src/components/`)

Reusable visual elements:

| Component | Purpose |
|-----------|---------|
| `chrome.js` | Accent bar, section labels, page numbers, footers |
| `cards.js` | Card grids (2/3/4 columns) with title + content |
| `tables.js` | Data tables and status tables with badges |
| `takeaway.js` | Callout boxes and key insight highlights |

### Utils (`src/utils/`)

| Utility | Purpose |
|---------|---------|
| `images.js` | Path resolution, base64 encoding |
| `svg.js` | Architecture diagram primitives (boxes, arrows, flows) |

## Data Flow

### JSON Config → PPTX

```
config.json
    │
    ▼
cli.js
    │ Parse JSON
    ▼
buildPresentation(config)
    │
    ├── createPresentation() → PptxGenJS instance
    │
    ├── For each slide in config.slides:
    │   │
    │   └── addSlide(pptx, slide.type, slide)
    │       │
    │       └── Dispatches to addTitleSlide/addAgendaSlide/etc.
    │           │
    │           └── Uses components (addChrome, addCardGrid, etc.)
    │
    ▼
pptx.writeFile({ fileName: 'output.pptx' })
```

### QA Validation

```
output.pptx + config.json
    │
    ▼
qa.js
    │
    ├── JSZip.loadAsync(pptx) → Extract XML
    │
    ├── Parse slide XML → Extract text content
    │
    ├── Compare against config:
    │   - Slide count matches?
    │   - Titles present?
    │   - Items/cards/bullets present?
    │
    ▼
Report (pass/fail + issues)
```

## Key Design Decisions

### 1. Input Normalization

We accept flexible inputs and normalize internally:

```javascript
// Both work:
items: ["Topic 1", "Topic 2"]
items: [{ title: "Topic 1", desc: "Details" }]

// Normalized internally:
const normalized = typeof item === 'string' ? { title: item } : item;
```

### 2. Theme-Driven Values

Never hardcode colors or fonts:

```javascript
// WRONG
slide.addText("Title", { color: '0D2A5C' });

// CORRECT
const { colors } = theme;
slide.addText("Title", { color: colors.primary });
```

### 3. Composition Over Inheritance

Slides are composed from components, not extended:

```javascript
export function addContentSlide(pptx, theme, options) {
  const slide = pptx.addSlide();

  addChrome(slide, theme, options);      // Reusable
  addTitle(slide, theme, options.title); // Reusable

  if (options.cards) {
    addCardGrid(slide, theme, options);  // Reusable
  }
  // ...
}
```

### 4. Exit Codes for Automation

CLI tools return proper exit codes:

```bash
node cli.js config.json output.pptx  # Exit 0 on success, 1 on error
node qa.js output.pptx config.json   # Exit 0 if valid, 1 if issues
```

## Extending the Library

### Adding a New Slide Type

1. Create `src/slides/newtype.js`:
```javascript
import { addChrome, addTitle } from '../components/chrome.js';

export function addNewTypeSlide(pptx, theme, options) {
  const slide = pptx.addSlide();
  slide.background = { color: theme.colors.bgWhite };
  addChrome(slide, theme, options);
  addTitle(slide, theme, options.title);
  // Add custom content...
  return slide;
}
```

2. Export from `src/slides/index.js`
3. Add to `addSlide()` switch in `src/index.js`
4. Update CLAUDE.md with usage example

### Adding a New Theme

1. Create `src/themes/newtheme.js` with full color/font spec
2. Register in `src/themes/index.js`
3. Test with all slide types

### Adding a New Component

1. Create `src/components/newcomponent.js`
2. Export from `src/components/index.js`
3. Use in slide builders as needed
