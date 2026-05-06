# Contributing to PptxGenerator

## Development Setup

```bash
git clone https://github.com/jabelk/pptx-generator.git
cd pptx-generator
npm install
```

## Running Tests

```bash
# Run examples
node examples/basic.js
node examples/with-diagrams.js

# Validate output
node qa.js examples/output/basic-example.pptx

# Test Docker build
docker build -t pptx-generator .
docker run -v $(pwd)/examples:/workspace pptx-generator config.json test.pptx
```

## Code Style

- ES modules (`import`/`export`)
- JSDoc comments for exported functions
- Descriptive names (not `slide1`, use `titleSlide`)
- Get theme values via destructuring: `const { colors, fonts } = theme`

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes
3. Run QA: `node qa.js` on any generated output
4. Test with Docker
5. Update CLAUDE.md if adding new features
6. Submit PR

## Adding New Slide Types

See ARCHITECTURE.md for detailed guide. Quick summary:

1. Create `src/slides/yourtype.js`
2. Export from `src/slides/index.js`
3. Add case to `addSlide()` in `src/index.js`
4. Add example to `examples/`
5. Document in CLAUDE.md

## Adding New Themes

1. Create `src/themes/yourtheme.js` (copy `minimal.js` as template)
2. Define all required properties (colors, fonts, fontSize, spacing, layout)
3. Register in `src/themes/index.js`
4. Test with all slide types

## Reporting Issues

Include:
- Node.js version
- Generated PPTX file (if possible)
- Config/code used to generate
- Expected vs actual result
