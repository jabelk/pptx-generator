# PptxGenerator - Claude Code Instructions

A reusable library for generating professional PowerPoint presentations programmatically.

## Quick Start

```javascript
import { createPresentation, addSlide } from 'pptx-generator';

const pptx = createPresentation({ theme: 'cowork' });
addSlide(pptx, 'title', { title: 'My Presentation' });
pptx.writeFile('output.pptx');
```

## Available Slide Types

| Type | Function | Use Case |
|------|----------|----------|
| `title` | `addTitleSlide` | Cover/opening slide with eyebrow, title, subtitle |
| `agenda` | `addAgendaSlide` | Numbered list of topics |
| `quote` | `addQuoteSlide` | Large quote with attribution |
| `comparison` | `addComparisonSlide` | Two-column comparison |
| `phases` | `addPhasesSlide` | Timeline/roadmap with phase boxes |
| `workflow` | `addWorkflowSlide` | Process flow with chevron steps |
| `checklist` | `addChecklistSlide` | Requirements table with status badges |
| `summary` | `addSummarySlide` | Dark closing slide with key message |
| `content` | `addContentSlide` | Generic content (bullets, cards, images) |
| `demo` | `addDemoSlide` | Screenshot/demo slide |

## Themes

- `cowork` - Dark navy (#0D2A5C) with cyan (#049FD9) accents
- `minimal` - Clean black/white with blue accents

### Custom Theme

```javascript
import { themes } from 'pptx-generator';

themes.registerTheme('custom', themes.extendTheme('cowork', {
  colors: { primary: 'FF5500', accent: '00AA00' }
}));
```

## Common Patterns

### Content Slide with Bullets

```javascript
addSlide(pptx, 'content', {
  title: 'Key Points',
  subtitle: 'Important information',
  bullets: ['Point one', 'Point two', 'Point three'],
  sectionLabel: 'Details',
  pageNum: 5
});
```

### Content Slide with Cards

```javascript
addSlide(pptx, 'content', {
  title: 'Features',
  cards: [
    { title: 'Fast', description: 'Quick generation' },
    { title: 'Flexible', description: 'Easy customization' },
    { title: 'Professional', description: 'McKinsey-style' }
  ]
});
```

### Image Slide

```javascript
addSlide(pptx, 'content', {
  title: 'Screenshot',
  image: {
    path: '/absolute/path/to/image.png',  // MUST be absolute
    x: 1.0,
    y: 1.6,
    w: 11,
    h: 5
  }
});
```

### Architecture Diagram

```javascript
import { addFlowDiagram } from 'pptx-generator/utils/svg';

const slide = pptx.addSlide();
addFlowDiagram(slide, theme, {
  boxes: [
    { label: 'Input', bgColor: theme.colors.primary },
    { label: 'Process', bgColor: theme.colors.accent },
    { label: 'Output', bgColor: theme.colors.green }
  ]
});
```

## Image Path Requirements

**CRITICAL**: PptxGenJS requires absolute paths for local images.

```javascript
import { resolve } from 'path';

// Correct - absolute path
image: { path: '/Users/name/project/images/screenshot.png' }

// Also correct - use resolve
image: { path: resolve(import.meta.dirname, '../images/screenshot.png') }

// WRONG - relative paths fail
image: { path: './images/screenshot.png' }  // Will fail!
```

## Declarative API

Build entire presentations from config:

```javascript
import { buildPresentation } from 'pptx-generator';

const pptx = buildPresentation({
  meta: { title: 'Q4 Review', author: 'Team' },
  theme: 'cowork',
  slides: [
    { type: 'title', title: 'Q4 Review', subtitle: '2024' },
    { type: 'agenda', items: ['Revenue', 'Growth', 'Plans'] },
    { type: 'content', title: 'Revenue', bullets: ['Up 20%', 'Beat targets'] },
    { type: 'summary', message: 'Strong quarter.\nReady for Q1.' }
  ]
});

pptx.writeFile('q4-review.pptx');
```

## Project Structure

```
pptx-generator/
├── src/
│   ├── index.js          # Main exports
│   ├── themes/           # Theme definitions
│   │   ├── cowork.js     # Corporate theme
│   │   └── minimal.js    # Clean theme
│   ├── slides/           # Slide type builders
│   │   ├── title.js
│   │   ├── agenda.js
│   │   ├── content.js
│   │   └── ...
│   ├── components/       # Reusable components
│   │   ├── chrome.js     # Headers, footers, accent bars
│   │   ├── takeaway.js   # Callout boxes
│   │   ├── cards.js      # Card grids
│   │   └── tables.js     # Data tables
│   └── utils/            # Helpers
│       ├── images.js     # Image path resolution
│       └── svg.js        # Diagram utilities
└── examples/             # Working examples
```

## Commands

```bash
npm install              # Install dependencies
node examples/basic.js   # Run basic example
```

## QA System

Always validate generated presentations before delivery:

```bash
# Validate content against config
node qa.js output.pptx config.json

# Extract text only (no config)
node qa.js output.pptx
```

The QA tool:
- Extracts all text from PPTX XML
- Checks slide count matches config
- Validates titles, items, cards, bullets are present
- Returns exit code 0 (pass) or 1 (fail)

## Docker Usage

```bash
# Generate presentation (no Node.js needed)
docker run -v $(pwd):/workspace pptx-generator config.json output.pptx

# Build locally
docker build -t pptx-generator .
```

## Common Pitfalls (Lessons Learned)

### 1. Agenda Items Format
The agenda slide accepts BOTH formats:
```javascript
// Simple strings
items: ["Topic 1", "Topic 2", "Topic 3"]

// Objects with description
items: [
  { title: "Topic 1", desc: "Details here" },
  { title: "Topic 2", desc: "More details" }
]
```

### 2. Card Content
Cards support EITHER `description` OR `bullets`:
```javascript
// Single description
cards: [{ title: "Feature", description: "Explanation text" }]

// Bullet list
cards: [{ title: "Feature", bullets: ["Point 1", "Point 2"] }]
```

### 3. Slide Variable Names
When copying slide code, ensure variable names match:
```javascript
// WRONG - mixed variable names cause duplicate content
const slide5 = pptx.addSlide();
slide4.addText("Title", {...});  // BUG: using old variable

// CORRECT
const slide5 = pptx.addSlide();
slide5.addText("Title", {...});
```

### 4. writeFile API
Use the object form (string form is deprecated):
```javascript
// Correct
pptx.writeFile({ fileName: 'output.pptx' })

// Deprecated (works but warns)
pptx.writeFile('output.pptx')
```

## Tips for Claude Code

1. **Always use absolute paths** for images - use `resolve()` or full paths
2. **Check the theme** before using colors - access via `theme.colors.primary`
3. **Use `addSlide()`** for quick slides, direct functions for custom layouts
4. **Run QA after generation** - `node qa.js output.pptx config.json`
5. **Page numbers** are manual - track and increment in your script
6. **Test with Docker** before shipping - ensures clean environment works
7. **Read examples/** for working patterns before writing new slide types
