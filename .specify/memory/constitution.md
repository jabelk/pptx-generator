# PptxGenerator Constitution

Core principles guiding development of this library.

## Core Principles

### I. Declarative First
Users should be able to create presentations from simple JSON configs without writing JavaScript. The `buildPresentation()` API and CLI support this pattern.

### II. Flexible Input Formats
Accept multiple valid input formats where reasonable:
- Agenda items: both `["string"]` and `[{title, desc}]`
- Card content: both `description` (string) and `bullets` (array)
- Don't force users into rigid schemas when alternatives are intuitive

### III. Fail Loudly, Validate Early
The QA system exists because silent failures (missing content, empty slides) are worse than errors. Always run `node qa.js` before shipping.

### IV. Absolute Paths for Images
PptxGenJS requires absolute paths. This is a hard constraint. Document it prominently and provide `resolveImagePath()` helpers.

### V. Theme-Driven Consistency
All colors, fonts, and spacing should come from the theme object. Never hardcode values in slide builders. This ensures visual consistency.

### VI. Components Over Monoliths
Break reusable patterns into components (chrome, cards, tables) that can be composed. Slides are built from components, not copy-pasted code.

## Quality Standards

### Before Shipping
1. Run `node qa.js output.pptx config.json` - must pass
2. Open the PPTX visually - check for rendering issues
3. Test with Docker - ensures no local-only dependencies

### Code Style
- ES modules (`import`/`export`)
- JSDoc comments for public functions
- Descriptive variable names (not `slide1`, `slide2`)
- Theme values via destructuring: `const { colors, fonts } = theme`

## Architecture Decisions

### Why PptxGenJS?
- Most mature JS library for PPTX generation
- Full PowerPoint feature support
- Active maintenance
- No native dependencies (pure JS)

### Why Not PDF/HTML First?
- Native PPTX allows editing after generation
- Better compatibility with corporate workflows
- Preserves PowerPoint features (animations, speaker notes)

### Why Docker Support?
- Eliminates "works on my machine" issues
- Enables CI/CD pipeline integration
- Users without Node.js can still generate presentations

## Future Directions

### Considered but Not Implemented
- **Master slides**: PptxGenJS supports them, but adds complexity. May add later.
- **SVG import**: Would enable Mermaid/D2 diagrams. Needs research.
- **PDF visual diff**: Compare generated PDFs pixel-by-pixel. Requires LibreOffice.

### Open Questions
- Should we publish to npm registry?
- Add TypeScript definitions?
- Support for slide animations?

## Governance

Constitution supersedes all other practices. Amendments require documentation and testing of all affected slide types.

**Version**: 1.0.0 | **Ratified**: 2024-05-06 | **Last Amended**: 2024-05-06
