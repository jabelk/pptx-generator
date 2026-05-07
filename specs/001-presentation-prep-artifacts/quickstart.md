# Quickstart: Presentation Preparation Skill

**Feature**: Presentation Preparation Artifacts
**Date**: 2026-05-06

## Prerequisites

1. Claude Code CLI installed
2. Global skill directory: `~/.claude/skills/presentation/`
3. Existing files in skill directory:
   - `SKILL.md` (main skill definition)
   - `brands.md` (color schemes)

## Basic Usage

### Generate Conference Talk Artifacts

```bash
cd /path/to/your/project
/presentation --type conference --brand cisco
```

**Output**:
- `presentation-context.md` — Slide outline, architecture, capabilities
- `narrative-flow.md` — Story arc with 3 acts
- `demo-script.md` — Step-by-step demo with SAY/DO/BACKUP

### Generate Meeting Prep

```bash
/presentation --type meeting-prep --compare ~/other-project
```

**Output**:
- `presentation-context.md` with stakeholder analysis and comparison table

### Generate Individual Artifacts

```bash
# Just the narrative
/presentation --narrative

# Just the demo script
/presentation --demo-script

# Add speaker notes to existing context
/presentation --speaker-notes
```

## Workflow

```
1. Run /presentation with desired flags
       ↓
2. Review generated artifacts
       ↓
3. Iterate: "Adjust the architecture section"
            "Add a comparison slide"
            "Change timing for demo section 2"
       ↓
4. When ready: "Generate the PPTX"
       ↓
5. Claude Code builds JSON config and runs pptx-generator
```

## Available Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--type <type>` | `conference`, `meeting-prep`, `project-overview`, `technical-deep-dive` | `project-overview` |
| `--brand <name>` | `cisco`, `cisco-dark`, `cisco-devnet`, `cowork`, `minimal` | `cowork` |
| `--narrative` | Generate only narrative-flow.md | — |
| `--demo-script` | Generate only demo-script.md | — |
| `--speaker-notes` | Add speaker notes to context | — |
| `--compare <path>` | Include comparison with another project | — |

## Example Outputs

### Conference Type

After `/presentation --type conference --brand cisco`:

```
your-project/
├── presentation-context.md   # 11 slides, Cisco brand
├── narrative-flow.md         # 3-act structure
└── demo-script.md            # 45-minute demo script
```

### Meeting Prep Type

After `/presentation --type meeting-prep --compare ~/phoenix-project`:

```
your-project/
└── presentation-context.md   # With stakeholder analysis + comparison table
```

## Iterating on Artifacts

After generation, you can ask Claude Code to:

- "Make the opening hook a question instead of a story"
- "Add a cycle about error handling to Act 2"
- "Shorten demo section 3 to 5 minutes"
- "Add anticipated questions about security"

Claude Code edits the markdown files directly.

## Generating the PPTX

When artifacts are ready:

```
"Generate the PPTX using the cisco theme"
```

Claude Code will:
1. Convert presentation-context.md to JSON config
2. Run: `node ~/dev/projects/pptx-generator/cli.js config.json output.pptx`
3. Validate: `node ~/dev/projects/pptx-generator/qa.js output.pptx config.json`
4. Report the output path

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "No CLAUDE.md found" | Skill uses README.md and git history as fallback |
| "presentation-context.md exists" | Choose: overwrite, append, or rename |
| "Unknown brand" | Falls back to cowork; check brands.md for available options |
| "Compare path not found" | Generates single-project context without comparison |
