# Implementation Plan: Presentation Preparation Artifacts

**Branch**: `main` | **Date**: 2026-05-06 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-presentation-prep-artifacts/spec.md`

## Summary

Enhance the global `/presentation` skill to generate comprehensive preparation artifacts for conference talks and stakeholder meetings. The skill will be implemented as markdown templates with embedded instructions that Claude Code executes. Key artifacts: presentation-context.md (slides), narrative-flow.md (story arc), demo-script.md (step-by-step demo), and speaker notes.

## Technical Context

**Language/Version**: Markdown (skill definitions) + JavaScript ES Modules (pptx-generator integration)
**Primary Dependencies**: Claude Code skill system, pptx-generator library, git CLI
**Storage**: File-based (markdown artifacts in target repository)
**Testing**: Manual validation via skill execution + QA tool for generated PPTX
**Target Platform**: Claude Code CLI (macOS/Linux)
**Project Type**: Single project (skill enhancement)
**Performance Goals**: Generate all artifacts in under 60 seconds (SC-001)
**Constraints**: Must work in any repository with minimal context (graceful degradation)
**Scale/Scope**: Single-user CLI skill, operates on one repository at a time

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Declarative First | PASS | Skill uses declarative templates; user provides flags, skill generates artifacts |
| II. Flexible Input Formats | PASS | Multiple input sources (CLAUDE.md, README, git); graceful fallbacks |
| III. Fail Loudly, Validate Early | PASS | Missing sources noted in output; gaps explicitly flagged |
| IV. Absolute Paths for Images | N/A | Skill generates markdown, not PPTX directly |
| V. Theme-Driven Consistency | PASS | Brand settings from brands.md; colors not hardcoded |
| VI. Components Over Monoliths | PASS | Separate artifact templates (context, narrative, demo-script, speaker-notes) |

**Gate Status**: PASSED - No violations requiring justification.

## Project Structure

### Documentation (this feature)

```text
specs/001-presentation-prep-artifacts/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (from /speckit-tasks)
```

### Source Code (skill files)

```text
~/.claude/skills/presentation/
├── SKILL.md                    # Main skill definition (UPDATE)
├── brands.md                   # Brand color schemes (EXISTS)
├── templates/                  # NEW: Artifact templates
│   ├── presentation-context.md # Template for slide context
│   ├── narrative-flow.md       # Template for story arc
│   ├── demo-script.md          # Template for demo instructions
│   └── speaker-notes.md        # Template for per-slide notes
└── examples/                   # NEW: Example outputs
    └── conference-talk/        # Example conference artifacts
```

**Structure Decision**: Skill enhancement in global skill directory. No changes to pptx-generator source code - skill instructs Claude Code to use existing pptx-generator when generating PPTX.

## Complexity Tracking

No violations requiring justification. Implementation uses simple file templates with no external dependencies beyond what already exists.

## Implementation Approach

### Key Design Decisions

1. **Template-based generation**: Each artifact type has a markdown template with placeholders that Claude Code fills from codebase analysis
2. **Flag-driven modes**: `--type conference`, `--type meeting-prep`, `--narrative`, `--demo-script`, `--speaker-notes`, `--compare`, `--brand`
3. **Graceful degradation**: Missing source files result in warnings, not failures
4. **Iterative workflow**: Generate → Review → Refine → Generate PPTX

### Artifact Generation Flow

```
/presentation --type conference --brand cisco
    │
    ├── Read sources: CLAUDE.md, README.md, MEMORY.md, git log
    │
    ├── Generate presentation-context.md
    │   └── Slide outline, architecture, capabilities, brand settings
    │
    ├── Generate narrative-flow.md
    │   └── 3-act structure, What Is/What Could Be cycles, teaching moments
    │
    └── Generate demo-script.md
        └── SAY/DO/BACKUP format, timing, failure recovery
```

### Integration with pptx-generator

When user says "generate the PPTX":
1. Convert presentation-context.md to JSON config
2. Run `node ~/dev/projects/pptx-generator/cli.js config.json output.pptx`
3. Run `node ~/dev/projects/pptx-generator/qa.js output.pptx config.json`

## Next Steps

1. **Phase 0**: Generate research.md (resolve any remaining questions)
2. **Phase 1**: Generate data-model.md and artifact templates
3. **Phase 2**: Generate tasks.md via `/speckit-tasks`
4. **Implementation**: Execute tasks via `/speckit-implement`
