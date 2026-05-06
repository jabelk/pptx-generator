# Project Memory

Status tracking for Claude Code sessions.

## Current State

**Version**: 1.2.0
**Status**: Stable, production-ready

## Recent Changes

### v1.2.0 (Latest)
- Fixed: Agenda slide now accepts string arrays (not just objects)
- Fixed: Cards now render `description` field (not just `bullets`)
- Added: QA system (`qa.js`) for content validation
- Added: Visual QA support via LibreOffice (`Dockerfile.qa`)

### v1.1.0
- Added: Docker support
- Added: CLI tool (`cli.js`)
- Added: JSON config-based generation

### v1.0.0
- Initial release
- 10 slide types
- 2 themes (cowork, minimal)
- Component system

## Known Limitations

1. **Images require absolute paths** - PptxGenJS limitation
2. **No master slides** - Each slide built from scratch
3. **No animations** - Static content only
4. **Page numbers are manual** - Must track in code

## User Preferences

- Prefers Docker for clean testing
- Uses QA validation before delivery
- McKinsey-style professional layouts

## Pending Ideas

- [ ] TypeScript definitions
- [ ] npm registry publication
- [ ] Mermaid/D2 diagram import
- [ ] Visual diff testing (PDF comparison)

## File Locations

| Purpose | Path |
|---------|------|
| Main exports | `src/index.js` |
| CLI | `cli.js` |
| QA tool | `qa.js` |
| Themes | `src/themes/` |
| Slides | `src/slides/` |
| Components | `src/components/` |
| Examples | `examples/` |
| Docker | `Dockerfile` |

## Testing Checklist

Before any release:
- [ ] `node examples/basic.js` runs
- [ ] `node examples/with-diagrams.js` runs
- [ ] `node qa.js examples/output/basic-example.pptx` passes
- [ ] Docker build succeeds
- [ ] Docker run produces valid PPTX
