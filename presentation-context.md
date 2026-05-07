# Presentation Context: PptxGenerator

Generated: 2025-05-06
Type: conference-demo
Brand: cisco
Source repo: /Users/jabelk/dev/projects/pptx-generator

---

## Session Metadata

- **Title**: Automating Professional Presentations with Code
- **Subtitle**: Build PowerPoint from JSON in Seconds
- **Presenter**: Jason Belk
- **Audience**: Developers, DevOps engineers, and technical writers who need to create consistent presentations at scale
- **Duration**: 45 minutes
- **Venue**: Conference breakout session

---

## Brand Settings

**Theme**: cisco
**Primary Color**: #049FD9 (Cisco Blue)
**Accent Color**: #00BCEB (Cisco Cyan)
**Secondary Color**: #005073 (Cisco Dark Blue)
**Background**: light

**Fonts**:
- Heading: CiscoSansTT (fallback: Calibri)
- Body: CiscoSansTT (fallback: Calibri)
- Mono: Consolas

---

## Project Overview

PptxGenerator is a JavaScript library for creating professional PowerPoint presentations programmatically. Built on PptxGenJS, it provides a high-level abstraction with 10 pre-built slide types, 2 themes, and a QA validation system that makes generating pixel-perfect presentations as easy as writing JSON.

The library solves a common pain point: manually creating and maintaining consistent presentations across teams. Instead of copy-pasting slides and fighting with formatting, developers can define content declaratively and generate branded PPTX files in seconds. This enables automation workflows like generating reports from CI/CD pipelines, creating personalized decks from databases, or building documentation presentations from code.

### Key Capabilities

- **10 slide types**: title, agenda, quote, comparison, phases, workflow, checklist, summary, content, demo
- **2 built-in themes**: Cowork (corporate navy/cyan) and Minimal (clean black/white)
- **Docker support**: Generate presentations without Node.js installed
- **QA validation**: Verify generated content matches your config (CI/CD friendly)
- **Architecture diagrams**: Flow diagrams, boxes, connectors via code
- **Declarative API**: Build presentations from JSON configs
- **Custom themes**: Extend base themes with your brand colors

### Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Core Engine**: PptxGenJS v4.0.1
- **Archive Handling**: JSZip v3.10.1
- **Containerization**: Docker support included

---

## Architecture

```
User Input (JSON/JS) --> Entry Points (cli.js, src/index.js)
                              |
                              v
                    Theme System (src/themes/)
                              |
                              v
                    Slide Builders (src/slides/)
                              |
                              v
                    Components (src/components/)
                              |
                              v
                    PptxGenJS --> .pptx file
```

### Key Modules

| Module | Purpose |
|--------|---------|
| `src/index.js` | Main exports: `createPresentation()`, `addSlide()`, `buildPresentation()` |
| `src/themes/` | Theme definitions (cowork, minimal) with colors, fonts, spacing |
| `src/slides/` | Slide builders: title, agenda, quote, comparison, phases, workflow, checklist, summary, content, demo |
| `src/components/` | Reusable elements: chrome (header/footer/accent bar), cards (grids, numbered), tables (status, data), takeaway (callout boxes) |
| `src/utils/` | Image path handling, SVG diagram primitives |
| `cli.js` | Command-line interface for JSON-to-PPTX generation |
| `qa.js` | QA validation tool that extracts text from PPTX XML |

### Data Flow

1. User provides content via JSON config or JavaScript API
2. Entry point selects appropriate theme and initializes PptxGenJS instance
3. For each slide, the corresponding slide builder is invoked
4. Slide builders use components to add chrome (header/footer), cards, tables
5. PptxGenJS renders final PPTX file
6. Optional: QA tool extracts text from PPTX XML to verify content matches config

---

## Recent Changes

| Date | Change |
|------|--------|
| Recent | Add spec-kit workflow and skills |
| Recent | Update README with comprehensive documentation |
| Recent | Add comprehensive documentation for Claude Code |
| Recent | Fix bugs and add QA validation system (v1.2.0) |
| Recent | Add self-documenting demo presentation |
| Recent | Add Docker support and CLI |

---

## Slide Outline

| # | Type | Title | Content Summary | Timing (sec) | Notes |
|---|------|-------|-----------------|--------------|-------|
| 1 | title | Automating Professional Presentations | Title, subtitle, presenter, Cisco branding | 30 | Strong visual opening |
| 2 | agenda | What We'll Cover | 4 topics: Problem, Solution, Demo, Getting Started | 60 | Set expectations |
| 3 | content | The Problem | Manual presentation pain points - bullets | 90 | Connect with audience pain |
| 4 | quote | "Every presentation looks different" | Key pain quote | 30 | Emotional impact |
| 5 | content | The Solution | PptxGenerator overview with 3 capability cards | 120 | Introduce the tool |
| 6 | content | Architecture | System diagram from CLAUDE.md | 120 | Technical credibility |
| 7 | content | Slide Types | 10 slide types showcase | 90 | Feature depth |
| 8 | comparison | Manual vs Automated | Before/after comparison | 60 | Clear value prop |
| 9 | content | Live Demo | Transition slide to demo | 30 | Bridge to demo |
| 10 | demo | Demo: JSON to PPTX | [LIVE DEMO - 10 min] | 600 | Core demonstration |
| 11 | content | Themes & Branding | Theme customization | 90 | Extensibility |
| 12 | checklist | QA Validation | Automated testing features | 90 | Quality story |
| 13 | phases | Getting Started | 3 phases: Install, Config, Generate | 90 | Clear next steps |
| 14 | summary | Key Takeaways | 3 points + resources + Q&A | 120 | Strong close |

**Total Duration**: 1620 seconds (27 minutes content) + 18 minutes buffer for Q&A/transitions

---

## Diagrams to Create

### Diagram 1: Architecture Flow

```
User Input (JSON/JS) --> Entry Points (cli.js, src/index.js)
                              |
                              v
                    Theme System (src/themes/)
                              |
                              v
                    Slide Builders (src/slides/)
                              |
                              v
                    Components (src/components/)
                              |
                              v
                    PptxGenJS --> .pptx file
```

### Diagram 2: Module Structure

```
pptx-generator/
├── cli.js              # CLI entry point
├── qa.js               # QA validation tool
├── src/
│   ├── index.js        # Main library exports
│   ├── themes/         # Theme definitions
│   ├── slides/         # Slide type builders
│   ├── components/     # Reusable components
│   └── utils/          # Image and diagram utilities
```

---

## Key Quotes / Callouts

> "PptxGenJS requires absolute paths. Relative paths fail silently."
> -- Critical gotcha to highlight

> "The separation of content and presentation means non-technical team members can edit JSON without touching code."
> -- Key benefit

> "This is CI/CD for presentations. Every merge request can validate that generated content matches expectations."
> -- QA value proposition

---

## Demo Script Reference

See: [demo-script.md](./demo-script.md) for step-by-step demonstration guide.

---

## Speaker Notes Reference

See slide-by-slide speaker notes in [narrative-flow.md](./narrative-flow.md).

---

## Open Questions

- [x] Presentation type: conference-demo (specified)
- [x] Brand: cisco (specified)
- [ ] Should demo focus on CLI or JavaScript API?
- [ ] What's the audience technical level (junior dev to senior architect)?
- [ ] Any specific use cases to highlight (CI/CD, reporting, documentation)?

---

## Next Steps

When ready to generate the PPTX:
1. Review and adjust the slide structure above
2. Confirm brand theme (currently: cisco)
3. Finalize demo script in demo-script.md
4. Tell Claude Code to "generate the PPTX"
