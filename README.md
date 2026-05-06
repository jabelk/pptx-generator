# PptxGenerator

A JavaScript library for creating professional PowerPoint presentations programmatically. Built on [PptxGenJS](https://github.com/gitbrent/PptxGenJS) with pre-built themes, slide templates, and utilities for common presentation patterns.

## Features

- **Pre-built themes** - Professional color schemes and typography
- **10 slide types** - Title, agenda, quote, comparison, phases, workflow, checklist, summary, content, demo
- **Reusable components** - Chrome (headers/footers), takeaway boxes, card grids, data tables
- **Architecture diagrams** - Flow diagrams, vertical stacks, connectors
- **Image utilities** - Path resolution, base64 encoding
- **Declarative API** - Build presentations from config objects
- **Docker support** - No Node.js installation required

## Quick Start with Docker

No npm required! Just create a `config.json` and run:

```bash
# Pull and run (or build locally)
docker run -v $(pwd):/workspace ghcr.io/jabelk/pptx-generator config.json output.pptx
```

Example `config.json`:

```json
{
  "theme": "cowork",
  "slides": [
    { "type": "title", "title": "My Presentation", "subtitle": "Made with Docker" },
    { "type": "agenda", "items": ["Topic 1", "Topic 2", "Topic 3"] },
    { "type": "summary", "message": "Thanks for watching!" }
  ]
}
```

Build the image locally:

```bash
git clone https://github.com/jabelk/pptx-generator.git
cd pptx-generator
docker build -t pptx-generator .
docker run -v $(pwd)/examples:/workspace pptx-generator config.json my-deck.pptx
```

## Installation (npm)

```bash
npm install jabelk/pptx-generator
```

Or clone and link locally:

```bash
git clone https://github.com/jabelk/pptx-generator.git
cd pptx-generator
npm install
npm link
```

## CLI Usage

```bash
# After npm install
pptx-generator config.json output.pptx

# Or run directly
node cli.js config.json output.pptx

# Help
pptx-generator --help
```

## Quick Start

```javascript
import { createPresentation, addSlide } from 'pptx-generator';

// Create presentation with theme
const pptx = createPresentation({
  theme: 'cowork',
  title: 'My Presentation',
  author: 'Your Name'
});

// Add slides
addSlide(pptx, 'title', {
  title: 'Welcome',
  subtitle: 'An introduction to our product'
});

addSlide(pptx, 'agenda', {
  items: ['Overview', 'Features', 'Demo', 'Q&A']
});

addSlide(pptx, 'content', {
  title: 'Key Features',
  bullets: [
    'Easy to use',
    'Professional output',
    'Fully customizable'
  ]
});

addSlide(pptx, 'summary', {
  message: 'Thank you!\n\nQuestions?'
});

// Save
pptx.writeFile('my-presentation.pptx');
```

## Themes

### Cowork (Default)

Professional corporate theme with dark navy and cyan.

- Primary: #0D2A5C (Dark Navy)
- Accent: #049FD9 (Cyan)
- Fonts: Cambria (headings), Calibri (body)

### Minimal

Clean black and white theme.

- Primary: #1A1A1A (Near Black)
- Accent: #0066CC (Blue)
- Fonts: Arial (headings and body)

### Custom Themes

```javascript
import { themes } from 'pptx-generator';

// Extend existing theme
themes.registerTheme('brand', themes.extendTheme('cowork', {
  colors: {
    primary: 'FF5500',
    accent: '00AA00'
  }
}));

// Use custom theme
const pptx = createPresentation({ theme: 'brand' });
```

## Slide Types

### Title Slide

```javascript
addSlide(pptx, 'title', {
  eyebrow: 'QUARTERLY REVIEW',
  title: 'Q4 2024 Results',
  subtitle: 'Building momentum for 2025',
  author: 'Finance Team',
  date: 'December 2024'
});
```

### Agenda Slide

```javascript
addSlide(pptx, 'agenda', {
  title: 'Today\'s Agenda',
  items: [
    'Financial Overview',
    'Product Updates',
    'Market Analysis',
    'Next Steps'
  ],
  sectionLabel: 'Overview',
  pageNum: 2
});
```

### Quote Slide

```javascript
addSlide(pptx, 'quote', {
  quote: 'The best way to predict the future is to create it.',
  attribution: 'Peter Drucker'
});
```

### Comparison Slide

```javascript
addSlide(pptx, 'comparison', {
  title: 'Before vs After',
  leftTitle: 'Before',
  leftItems: ['Manual process', 'Slow', 'Error-prone'],
  rightTitle: 'After',
  rightItems: ['Automated', 'Fast', 'Reliable']
});
```

### Phases/Timeline Slide

```javascript
addSlide(pptx, 'phases', {
  title: 'Implementation Roadmap',
  phases: [
    { num: '1', name: 'Plan', desc: 'Q1', tasks: ['Research', 'Design'] },
    { num: '2', name: 'Build', desc: 'Q2', tasks: ['Develop', 'Test'] },
    { num: '3', name: 'Launch', desc: 'Q3', tasks: ['Deploy', 'Monitor'] }
  ]
});
```

### Checklist Slide

```javascript
addSlide(pptx, 'checklist', {
  title: 'Requirements Status',
  rows: [
    { req: 'User Authentication', status: 'Complete', notes: 'OAuth2' },
    { req: 'Data Migration', status: 'In Progress', notes: '80% done' },
    { req: 'Performance Testing', status: 'Pending', notes: 'Week 4' }
  ]
});
```

### Content Slide

Flexible slide for bullets, cards, or images.

```javascript
// With bullets
addSlide(pptx, 'content', {
  title: 'Key Points',
  bullets: ['Point 1', 'Point 2', 'Point 3']
});

// With cards
addSlide(pptx, 'content', {
  title: 'Features',
  cards: [
    { title: 'Fast', description: 'Quick processing' },
    { title: 'Secure', description: 'Enterprise-grade' }
  ]
});

// With image (must use absolute path)
addSlide(pptx, 'content', {
  title: 'Screenshot',
  image: { path: '/absolute/path/to/image.png', w: 10, h: 5 }
});
```

### Summary Slide

Dark background closing slide.

```javascript
addSlide(pptx, 'summary', {
  eyebrow: 'CONCLUSION',
  message: 'Key takeaways:\n\n• Revenue up 20%\n• New markets opened\n• Team expanded',
  footerText: 'Confidential'
});
```

## Architecture Diagrams

```javascript
import { addFlowDiagram, addArchitectureBox, addArrowConnector } from 'pptx-generator/utils/svg';

const slide = pptx.addSlide();

// Simple flow diagram
addFlowDiagram(slide, theme, {
  boxes: [
    { label: 'Input', bgColor: theme.colors.primary },
    { label: 'Process', bgColor: theme.colors.accent },
    { label: 'Output', bgColor: theme.colors.green }
  ]
});

// Custom architecture
addArchitectureBox(slide, theme, { x: 5, y: 2, w: 3, h: 1, label: 'API Server' });
addArchitectureBox(slide, theme, { x: 5, y: 4, w: 3, h: 1, label: 'Database' });
addArrowConnector(slide, theme, { x1: 6.5, y1: 3.1, x2: 6.5, y2: 3.9 });
```

## Declarative API

Build entire presentations from configuration:

```javascript
import { buildPresentation } from 'pptx-generator';

const pptx = buildPresentation({
  meta: { title: 'Sales Deck', author: 'Sales Team' },
  theme: 'cowork',
  slides: [
    { type: 'title', title: 'Our Solution', subtitle: 'For Your Business' },
    { type: 'agenda', items: ['Problem', 'Solution', 'Pricing'] },
    { type: 'comparison', title: 'Why Us', leftTitle: 'Others', leftItems: ['Slow'], rightTitle: 'Us', rightItems: ['Fast'] },
    { type: 'summary', message: 'Let\'s talk.\n\ncontact@company.com' }
  ]
});

pptx.writeFile('sales-deck.pptx');
```

## Examples

Run the included examples:

```bash
node examples/basic.js           # Basic presentation
node examples/with-diagrams.js   # Architecture diagrams
```

Output files are saved to `examples/output/`.

## Important Notes

### Image Paths

PptxGenJS requires **absolute paths** for local images:

```javascript
// ✅ Correct
image: { path: '/Users/name/project/images/logo.png' }

// ✅ Correct - using resolve
import { resolve } from 'path';
image: { path: resolve(import.meta.dirname, '../images/logo.png') }

// ❌ Wrong - relative paths don't work
image: { path: './images/logo.png' }
```

### Page Numbers

Page numbers are not automatic. Track and pass them manually:

```javascript
let pageNum = 1;
addSlide(pptx, 'title', { ... }); pageNum++;
addSlide(pptx, 'agenda', { pageNum }); pageNum++;
addSlide(pptx, 'content', { pageNum }); pageNum++;
```

## API Reference

### `createPresentation(options)`

Creates a new PptxGenJS instance with theme.

- `options.theme` - Theme name (default: 'cowork')
- `options.title` - Presentation title metadata
- `options.author` - Author metadata
- `options.company` - Company metadata

### `addSlide(pptx, type, options)`

Adds a slide of the specified type.

- `pptx` - PptxGenJS instance
- `type` - Slide type string
- `options` - Slide-specific options

### `buildPresentation(config)`

Creates presentation from declarative config.

- `config.meta` - Metadata object
- `config.theme` - Theme name
- `config.slides` - Array of slide configs

## License

MIT
