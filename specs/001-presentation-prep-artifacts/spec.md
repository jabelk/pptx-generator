# Feature Specification: Presentation Preparation Artifacts

**Feature Directory**: `specs/001-presentation-prep-artifacts`
**Created**: 2026-05-06
**Status**: Draft
**Input**: Enhanced presentation skill with narrative mode, demo scripts, meeting prep, and speaker notes. The skill analyzes codebases and generates preparation artifacts for conference talks and stakeholder meetings.

## Overview

Enhance the global `/presentation` skill to generate comprehensive preparation artifacts for conference talks and stakeholder meetings. The skill will analyze codebases (CLAUDE.md, README, git history) and produce multiple coordinated markdown files that Claude Code can iterate on before generating final PPTX output.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Conference Talk Preparation (Priority: P1)

A developer preparing a Cisco Live presentation runs `/presentation --type conference` in their project repository. The skill analyzes the codebase and generates three coordinated files: a presentation context (slide content), a narrative flow (story arc with acts and teaching moments), and a demo script (step-by-step with timing and failure recovery).

**Why this priority**: Conference talks are the primary use case, requiring all three artifact types working together. This represents the complete workflow the user needs.

**Independent Test**: Can be tested by running the command in any repo with CLAUDE.md and verifying all three output files are generated with correct structure and cross-references.

**Acceptance Scenarios**:

1. **Given** a repository with CLAUDE.md and README.md, **When** user runs `/presentation --type conference`, **Then** system generates `presentation-context.md`, `narrative-flow.md`, and `demo-script.md` in the repository root
2. **Given** generated artifacts, **When** user reviews the narrative-flow.md, **Then** it contains a 3-act structure with "What Is/What Could Be" cycles derived from the codebase content
3. **Given** generated artifacts, **When** user reviews the demo-script.md, **Then** it contains SAY/DO/BACKUP format sections with timing estimates and failure recovery plans
4. **Given** a repository without CLAUDE.md, **When** user runs `/presentation --type conference`, **Then** system uses README.md and git history as fallback sources and notes the missing context

---

### User Story 2 - Meeting Preparation with Comparison (Priority: P2)

A developer preparing a stakeholder meeting runs `/presentation --type meeting-prep --compare ~/other-project` to generate meeting preparation materials that compare their project against another system or approach.

**Why this priority**: Meeting prep is a distinct use case from conference talks, requiring stakeholder analysis and comparison frameworks rather than demo scripts.

**Independent Test**: Can be tested by running the command with a comparison path and verifying stakeholder analysis and comparison tables are generated.

**Acceptance Scenarios**:

1. **Given** a repository and a comparison target path, **When** user runs `/presentation --type meeting-prep --compare <path>`, **Then** system generates `presentation-context.md` with embedded stakeholder analysis and comparison tables
2. **Given** the comparison target has CLAUDE.md, **When** system generates comparison, **Then** the comparison table includes capabilities, tech stack, and status from both projects
3. **Given** generated meeting prep, **When** user reviews the output, **Then** it contains anticipated questions, discussion points, and what to offer/ask sections

---

### User Story 3 - Speaker Notes Generation (Priority: P2)

A developer with an existing presentation context wants to add detailed speaker notes. They run `/presentation --speaker-notes` to generate per-slide timing and talking points.

**Why this priority**: Speaker notes enhance any presentation type and can be added independently to existing context files.

**Independent Test**: Can be tested by running on a repo with existing presentation-context.md and verifying speaker notes section is added or separate file is created.

**Acceptance Scenarios**:

1. **Given** an existing `presentation-context.md` with slide outline, **When** user runs `/presentation --speaker-notes`, **Then** system adds a Speaker Notes section with per-slide entries
2. **Given** generated speaker notes, **When** user reviews a slide entry, **Then** it contains target timing, key points (must-say vs nice-to-have), and transition phrases
3. **Given** speaker notes generation, **When** system calculates timing, **Then** total time equals sum of per-slide targets and matches the session duration specified in metadata

---

### User Story 4 - Narrative-Only Mode (Priority: P3)

A developer wants only the story structure without demo scripts or full context. They run `/presentation --narrative` to generate just the narrative flow file.

**Why this priority**: Allows focused artifact generation when user already has context but needs help with story structure.

**Independent Test**: Can be tested by running the command and verifying only narrative-flow.md is generated.

**Acceptance Scenarios**:

1. **Given** a repository with CLAUDE.md, **When** user runs `/presentation --narrative`, **Then** system generates only `narrative-flow.md`
2. **Given** generated narrative, **When** user reviews the file, **Then** it contains Acts (Setup, Journey, Resolution), teaching moments, key quotes, and transition phrases

---

### User Story 5 - Brand Application (Priority: P3)

A developer specifies a brand when generating presentation context. The brand colors and styling are noted in the output for later PPTX generation.

**Why this priority**: Brand consistency is important but builds on the core artifact generation functionality.

**Independent Test**: Can be tested by running with --brand flag and verifying brand settings appear in output.

**Acceptance Scenarios**:

1. **Given** available brands (cisco, cisco-dark, cisco-devnet, cowork, minimal), **When** user runs `/presentation --brand cisco`, **Then** generated context includes Brand Settings section with Cisco color values
2. **Given** no brand specified, **When** user runs `/presentation`, **Then** system defaults to cowork brand

---

### Edge Cases

- What happens when the repository has no CLAUDE.md, README.md, or meaningful git history?
  - System generates minimal context with warnings about missing sources and prompts user to provide information manually
- What happens when --compare path doesn't exist or has no readable files?
  - System warns user and generates single-project context without comparison table
- What happens when presentation-context.md already exists in the repo?
  - System prompts user to overwrite, append, or use a different filename
- What happens when specified brand doesn't exist in brands.md?
  - System warns user and falls back to cowork brand

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Skill MUST read CLAUDE.md, README.md, MEMORY.md, and git history to extract project information
- **FR-002**: Skill MUST generate `presentation-context.md` with slide outline, architecture diagrams, and key capabilities
- **FR-003**: Skill MUST support `--type conference` flag that generates all three artifacts (context, narrative, demo script)
- **FR-004**: Skill MUST support `--type meeting-prep` flag that generates context with stakeholder analysis and comparison sections
- **FR-005**: Skill MUST support `--narrative` flag that generates only narrative-flow.md
- **FR-006**: Skill MUST support `--demo-script` flag that generates only demo-script.md
- **FR-007**: Skill MUST support `--speaker-notes` flag that adds speaker notes to context
- **FR-008**: Skill MUST support `--compare <path>` flag that reads another repository for comparison content
- **FR-009**: Skill MUST support `--brand <name>` flag that specifies color scheme from brands.md
- **FR-010**: Skill MUST generate narrative-flow.md using Duarte Resonate framework (3-act structure with What Is/What Could Be cycles)
- **FR-011**: Skill MUST generate demo-script.md using SAY/DO/BACKUP format with timing and failure recovery
- **FR-012**: Skill MUST generate speaker notes with per-slide timing, key points, and transitions
- **FR-013**: Skill MUST support stakeholder analysis with anticipated questions and discussion points for meeting-prep type
- **FR-014**: Skill MUST gracefully handle missing source files by using available alternatives and noting gaps
- **FR-015**: Skill MUST preserve existing presentation-context.md if user declines overwrite

### Key Entities

- **Presentation Context**: Core artifact containing slide outline, architecture, capabilities, diagrams, and brand settings
- **Narrative Flow**: Story structure artifact with acts, scenes, cycles, teaching moments, and key quotes
- **Demo Script**: Step-by-step demonstration artifact with SAY/DO/BACKUP format, timing, and failure recovery
- **Speaker Notes**: Per-slide timing, talking points, and transitions (embedded in context or standalone)
- **Stakeholder Analysis**: Meeting prep artifact with audience profiles, anticipated questions, and discussion points
- **Brand Configuration**: Color scheme and styling settings from brands.md

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can generate complete conference talk preparation (3 files) in under 60 seconds
- **SC-002**: Generated narrative-flow.md contains all Duarte framework elements (3 acts, What Is/What Could Be cycles, teaching moments)
- **SC-003**: Generated demo-script.md contains timing estimates that sum to a realistic presentation duration (15-60 minutes)
- **SC-004**: 90% of generated content requires only minor edits before use (measured by user feedback)
- **SC-005**: Users can iterate on generated artifacts with Claude Code and produce final PPTX in under 10 minutes of additional interaction
- **SC-006**: Stakeholder analysis for meeting-prep includes at least 3 anticipated questions with suggested answers
- **SC-007**: Speaker notes timing accuracy within 20% of actual presentation delivery time

## Assumptions

- User's global skill directory is at `~/.claude/skills/presentation/`
- pptx-generator is available at `~/dev/projects/pptx-generator/` or user can specify path
- Repositories have at least one of: CLAUDE.md, README.md, or meaningful git history
- User will review and iterate on generated artifacts before final PPTX generation
- Brand definitions are maintained in `~/.claude/skills/presentation/brands.md`
