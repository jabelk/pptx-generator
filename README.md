# PptxGenerator

A JavaScript library for creating professional PowerPoint presentations programmatically. Built on [PptxGenJS](https://github.com/gitbrent/PptxGenJS) with pre-built themes, slide templates, and a QA validation system.

## Features

- **10 slide types** - Title, agenda, quote, comparison, phases, workflow, checklist, summary, content, demo
- **2 themes** - Cowork (corporate navy/cyan) and Minimal (clean black/white)
- **Docker support** - Generate presentations without Node.js installed
- **QA validation** - Verify generated content matches your config
- **Architecture diagrams** - Flow diagrams, boxes, connectors
- **Declarative API** - Build presentations from JSON configs

## Quick Start

### Option 1: Docker (No Installation)

```bash
# Clone and build
git clone https://github.com/jabelk/pptx-generator.git
cd pptx-generator
docker build -t pptx-generator .

# Create a config file
cat > my-deck.json << 'EOF'
{
  "theme": "cowork",
  "slides": [
    { "type": "title", "title": "My Presentation", "subtitle": "Created with Docker" },
    { "type": "agenda", "items": ["Introduction", "Main Points", "Conclusion"] },
    { "type": "content", "title": "Key Points", "bullets": ["Point one", "Point two", "Point three"] },
    { "type": "summary", "message": "Thank you!\n\nQuestions?" }
  ]
}
EOF

# Generate presentation
docker run -v $(pwd):/workspace pptx-generator my-deck.json output.pptx
```

### Option 2: Node.js

```bash
# Clone and install
git clone https://github.com/jabelk/pptx-generator.git
cd pptx-generator
npm install

# CLI usage
node cli.js my-deck.json output.pptx

# Or programmatic usage
node examples/basic.js
```

### Option 3: As a Dependency

```bash
npm install jabelk/pptx-generator
```

```javascript
import { createPresentation, addSlide } from 'pptx-generator';

const pptx = createPresentation({ theme: 'cowork' });

addSlide(pptx, 'title', { title: 'Welcome', subtitle: 'Getting Started' });
addSlide(pptx, 'agenda', { items: ['Overview', 'Demo', 'Q&A'] });
addSlide(pptx, 'summary', { message: 'Thanks for watching!' });

pptx.writeFile({ fileName: 'my-presentation.pptx' });
```

## Slide Types

### Title Slide
Opening slide with eyebrow text, title, subtitle, author, and date.

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
Numbered list of topics. Accepts strings or objects.

```javascript
// Simple strings
addSlide(pptx, 'agenda', {
  title: "Today's Agenda",
  items: ['Introduction', 'Demo', 'Q&A']
});

// Objects with descriptions
addSlide(pptx, 'agenda', {
  title: "Today's Agenda",
  items: [
    { title: 'Introduction', desc: 'Meet the team' },
    { title: 'Demo', desc: 'See it in action' }
  ]
});
```

### Quote Slide
Large quote with attribution.

```javascript
addSlide(pptx, 'quote', {
  quote: 'The best way to predict the future is to create it.',
  attribution: 'Peter Drucker'
});
```

### Comparison Slide
Two-column comparison layout.

```javascript
addSlide(pptx, 'comparison', {
  title: 'Before vs After',
  leftTitle: 'Before',
  leftItems: ['Manual process', 'Slow', 'Error-prone'],
  rightTitle: 'After',
  rightItems: ['Automated', 'Fast', 'Reliable']
});
```

### Phases Slide
Timeline or roadmap with phase boxes.

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
Requirements table with status badges.

```javascript
addSlide(pptx, 'checklist', {
  title: 'Requirements Status',
  rows: [
    { req: 'Authentication', status: 'Complete', notes: 'OAuth2' },
    { req: 'Data Migration', status: 'In Progress', notes: '80%' },
    { req: 'Testing', status: 'Pending', notes: 'Week 4' }
  ]
});
```

### Content Slide
Flexible slide for bullets, cards, or images.

```javascript
// With bullets
addSlide(pptx, 'content', {
  title: 'Key Points',
  bullets: ['First point', 'Second point', 'Third point']
});

// With cards (use description OR bullets)
addSlide(pptx, 'content', {
  title: 'Features',
  cards: [
    { title: 'Fast', description: 'Quick processing times' },
    { title: 'Secure', description: 'Enterprise-grade security' }
  ]
});

// With image (MUST use absolute path)
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
  message: 'Key takeaways:\n\n• Revenue up 20%\n• Team expanded',
  footerText: 'Confidential'
});
```

## Themes

### Cowork (Default)
Professional corporate theme.
- Primary: #0D2A5C (Dark Navy)
- Accent: #049FD9 (Cyan)
- Fonts: Cambria (headings), Calibri (body)

### Minimal
Clean black and white theme.
- Primary: #1A1A1A (Near Black)
- Accent: #0066CC (Blue)
- Fonts: Arial

### Custom Themes

```javascript
import { themes } from 'pptx-generator';

themes.registerTheme('brand', themes.extendTheme('cowork', {
  colors: { primary: 'FF5500', accent: '00AA00' }
}));

const pptx = createPresentation({ theme: 'brand' });
```

## QA Validation

Always validate generated presentations:

```bash
# Validate content against config
node qa.js output.pptx config.json

# Extract text only (inspection)
node qa.js output.pptx
```

Example output:
```
═══════════════════════════════════════════════════════════
                    PPTX QA REPORT
═══════════════════════════════════════════════════════════

Status: ✓ PASSED
Slides: 11 (expected: 11)

Slide Content Summary:
─────────────────────────────────────────────────────────────
  Slide 1: 4 text elements
    "OPEN SOURCE LIBRARY | PptxGenerator | Professional..."
  Slide 2: 12 text elements
    "OVERVIEW | What You'll Learn | 01 | What is..."
```

The QA tool:
- Extracts all text from PPTX XML
- Validates titles, items, cards, bullets are present
- Returns exit code 0 (pass) or 1 (fail) for CI/CD

## JSON Config Format

Full config schema for CLI/Docker usage:

```json
{
  "meta": {
    "title": "Presentation Title",
    "author": "Your Name"
  },
  "theme": "cowork",
  "slides": [
    {
      "type": "title",
      "eyebrow": "CATEGORY",
      "title": "Main Title",
      "subtitle": "Subtitle text",
      "date": "2024"
    },
    {
      "type": "agenda",
      "title": "Agenda",
      "items": ["Topic 1", "Topic 2"],
      "sectionLabel": "Overview",
      "pageNum": 2
    },
    {
      "type": "content",
      "title": "Slide Title",
      "subtitle": "Optional subtitle",
      "bullets": ["Point 1", "Point 2"],
      "sectionLabel": "Section",
      "pageNum": 3
    },
    {
      "type": "content",
      "title": "Cards Example",
      "cards": [
        { "title": "Card 1", "description": "Description text" },
        { "title": "Card 2", "description": "More text" }
      ]
    },
    {
      "type": "summary",
      "eyebrow": "CLOSING",
      "message": "Thank you!\n\ncontact@example.com"
    }
  ]
}
```

## Architecture Diagrams

Create architecture diagrams programmatically:

```javascript
import { addFlowDiagram, addArchitectureBox, addArrowConnector } from 'pptx-generator/utils/svg';

const slide = pptx.addSlide();

// Horizontal flow
addFlowDiagram(slide, theme, {
  boxes: [
    { label: 'Input', bgColor: theme.colors.primary },
    { label: 'Process', bgColor: theme.colors.accent },
    { label: 'Output', bgColor: theme.colors.green }
  ]
});

// Custom layout
addArchitectureBox(slide, theme, { x: 5, y: 2, w: 3, h: 1, label: 'API' });
addArchitectureBox(slide, theme, { x: 5, y: 4, w: 3, h: 1, label: 'Database' });
addArrowConnector(slide, theme, { x1: 6.5, y1: 3.1, x2: 6.5, y2: 3.9 });
```

See `examples/with-diagrams.js` for complete examples.

## Important Notes

### Image Paths
PptxGenJS requires **absolute paths** for local images:

```javascript
import { resolve } from 'path';

// ✅ Correct - absolute path
image: { path: '/Users/name/project/images/logo.png' }

// ✅ Correct - using resolve
image: { path: resolve(import.meta.dirname, '../images/logo.png') }

// ❌ Wrong - relative paths fail silently
image: { path: './images/logo.png' }
```

### writeFile API
Use the object form (string form is deprecated):

```javascript
// ✅ Correct
pptx.writeFile({ fileName: 'output.pptx' })

// ⚠️ Deprecated (works but warns)
pptx.writeFile('output.pptx')
```

### Page Numbers
Page numbers are manual. Track them in your code:

```javascript
let pageNum = 1;
addSlide(pptx, 'title', { ... }); pageNum++;
addSlide(pptx, 'agenda', { pageNum }); pageNum++;
```

## Examples

```bash
# Basic presentation (9 slides)
node examples/basic.js

# Architecture diagrams (6 slides)
node examples/with-diagrams.js

# Self-documenting demo (11 slides)
docker run -v $(pwd)/examples:/workspace pptx-generator self-demo.json output/demo.pptx
```

Output saved to `examples/output/`.

## Project Structure

```
pptx-generator/
├── cli.js              # CLI entry point
├── qa.js               # QA validation tool
├── Dockerfile          # Docker image for generation
├── src/
│   ├── index.js        # Main library exports
│   ├── themes/         # Theme definitions
│   ├── slides/         # Slide type builders
│   ├── components/     # Reusable components
│   └── utils/          # Image and diagram utilities
├── examples/
│   ├── basic.js        # Programmatic example
│   ├── with-diagrams.js # Architecture diagrams
│   ├── config.json     # Simple JSON config
│   └── self-demo.json  # Comprehensive demo
└── docs/
    ├── CLAUDE.md       # Claude Code instructions
    ├── ARCHITECTURE.md # System design
    └── CONTRIBUTING.md # Development guide
```

## Documentation

- **[CLAUDE.md](CLAUDE.md)** - Instructions for Claude Code / AI assistants
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System design and extension guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Development setup and PR process

## License

MIT
