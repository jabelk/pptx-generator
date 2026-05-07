# Tasks: Presentation Preparation Artifacts

**Input**: Design documents from `specs/001-presentation-prep-artifacts/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not explicitly requested - manual validation via skill execution.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Skill files**: `~/.claude/skills/presentation/`
- **Templates**: `~/.claude/skills/presentation/templates/`
- **Examples**: `~/.claude/skills/presentation/examples/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create directory structure and base templates

- [x] T001 Create templates directory at ~/.claude/skills/presentation/templates/
- [x] T002 Create examples directory at ~/.claude/skills/presentation/examples/conference-talk/
- [x] T003 [P] Create base presentation-context template at ~/.claude/skills/presentation/templates/presentation-context.md
- [x] T004 [P] Create narrative-flow template at ~/.claude/skills/presentation/templates/narrative-flow.md
- [x] T005 [P] Create demo-script template at ~/.claude/skills/presentation/templates/demo-script.md
- [x] T006 [P] Create speaker-notes template at ~/.claude/skills/presentation/templates/speaker-notes.md

**Checkpoint**: All template files exist with placeholder structure

---

## Phase 2: Foundational (Core Skill Update)

**Purpose**: Update main SKILL.md with new argument parsing and mode detection

**⚠️ CRITICAL**: Must complete before user story implementation

- [x] T007 Update ~/.claude/skills/presentation/SKILL.md to add --type argument parsing (conference, meeting-prep, project-overview, technical-deep-dive)
- [x] T008 Update ~/.claude/skills/presentation/SKILL.md to add --narrative, --demo-script, --speaker-notes flags
- [x] T009 Update ~/.claude/skills/presentation/SKILL.md to add --compare <path> argument handling
- [x] T010 Update ~/.claude/skills/presentation/SKILL.md to document source file reading priority (CLAUDE.md > README.md > MEMORY.md > git log)
- [x] T011 Update ~/.claude/skills/presentation/SKILL.md to add graceful degradation instructions for missing sources

**Checkpoint**: SKILL.md has all argument definitions and source reading instructions

---

## Phase 3: User Story 1 - Conference Talk Preparation (Priority: P1) 🎯 MVP

**Goal**: Generate all three artifacts (context, narrative, demo script) for conference talks

**Independent Test**: Run `/presentation --type conference` in pptx-generator repo and verify 3 files generated

### Implementation for User Story 1

- [x] T012 [US1] Add conference mode logic to ~/.claude/skills/presentation/SKILL.md that triggers all 3 artifact generation
- [x] T013 [US1] Fill presentation-context template at ~/.claude/skills/presentation/templates/presentation-context.md with slide outline sections
- [x] T014 [US1] Fill presentation-context template with architecture extraction instructions
- [x] T015 [US1] Fill presentation-context template with brand settings section
- [x] T016 [US1] Fill narrative-flow template at ~/.claude/skills/presentation/templates/narrative-flow.md with 3-act structure
- [x] T017 [US1] Fill narrative-flow template with What Is/What Could Be cycle instructions
- [x] T018 [US1] Fill narrative-flow template with teaching moments and key quotes sections
- [x] T019 [US1] Fill demo-script template at ~/.claude/skills/presentation/templates/demo-script.md with SAY/DO/BACKUP format
- [x] T020 [US1] Fill demo-script template with pre-demo checklist and backup plan sections
- [x] T021 [US1] Fill demo-script template with timing calculation instructions (default 45 min)
- [x] T022 [US1] Create example conference output at ~/.claude/skills/presentation/examples/conference-talk/presentation-context.md
- [x] T023 [US1] Create example conference output at ~/.claude/skills/presentation/examples/conference-talk/narrative-flow.md
- [x] T024 [US1] Create example conference output at ~/.claude/skills/presentation/examples/conference-talk/demo-script.md
- [x] T025 [US1] Test conference mode by running /presentation --type conference in pptx-generator repo

**Checkpoint**: Conference mode generates 3 complete, well-structured artifacts

---

## Phase 4: User Story 2 - Meeting Preparation with Comparison (Priority: P2)

**Goal**: Generate context with stakeholder analysis and project comparison

**Independent Test**: Run `/presentation --type meeting-prep --compare <path>` and verify comparison table generated

### Implementation for User Story 2

- [x] T026 [US2] Add meeting-prep mode logic to ~/.claude/skills/presentation/SKILL.md
- [x] T027 [US2] Add stakeholder analysis section to ~/.claude/skills/presentation/templates/presentation-context.md
- [x] T028 [US2] Add comparison table section to ~/.claude/skills/presentation/templates/presentation-context.md
- [x] T029 [US2] Add --compare argument handling to read second repository CLAUDE.md/README
- [x] T030 [US2] Add anticipated questions section template with 3+ question minimum
- [x] T031 [US2] Add discussion points section (opening position, what to offer, what to ask)
- [x] T032 [US2] Add fallback behavior when --compare path is invalid (warn and skip comparison)
- [x] T033 [US2] Test meeting-prep mode by running /presentation --type meeting-prep --compare ~/dev/projects/ai/phoenix-project

**Checkpoint**: Meeting prep generates context with stakeholder analysis and comparison table

---

## Phase 5: User Story 3 - Speaker Notes Generation (Priority: P2)

**Goal**: Add speaker notes with per-slide timing to existing or new context

**Independent Test**: Run `/presentation --speaker-notes` and verify notes section added

### Implementation for User Story 3

- [x] T034 [US3] Add --speaker-notes flag handling to ~/.claude/skills/presentation/SKILL.md
- [x] T035 [US3] Fill speaker-notes template at ~/.claude/skills/presentation/templates/speaker-notes.md with per-slide structure
- [x] T036 [US3] Add timing calculation logic (sum of per-slide times = session duration)
- [x] T037 [US3] Add key points (must-say vs nice-to-have) structure to template
- [x] T038 [US3] Add transition phrases (from previous, to next) to template
- [x] T039 [US3] Add logic to embed speaker notes in existing presentation-context.md if it exists
- [x] T040 [US3] Test speaker-notes mode by running /presentation --speaker-notes in repo with existing context

**Checkpoint**: Speaker notes can be added independently with accurate timing

---

## Phase 6: User Story 4 - Narrative-Only Mode (Priority: P3)

**Goal**: Generate only narrative-flow.md without other artifacts

**Independent Test**: Run `/presentation --narrative` and verify only narrative file generated

### Implementation for User Story 4

- [x] T041 [US4] Add --narrative flag handling to ~/.claude/skills/presentation/SKILL.md
- [x] T042 [US4] Add logic to generate only narrative-flow.md when flag is present
- [x] T043 [US4] Test narrative-only mode by running /presentation --narrative

**Checkpoint**: Narrative mode generates only the story arc file

---

## Phase 7: User Story 5 - Brand Application (Priority: P3)

**Goal**: Apply brand colors to generated artifacts

**Independent Test**: Run `/presentation --brand cisco` and verify brand settings in output

### Implementation for User Story 5

- [x] T044 [US5] Add --brand flag handling to ~/.claude/skills/presentation/SKILL.md
- [x] T045 [US5] Add brand lookup logic to read from ~/.claude/skills/presentation/brands.md
- [x] T046 [US5] Add fallback to cowork brand when --brand not specified or invalid
- [x] T047 [US5] Test brand application by running /presentation --brand cisco

**Checkpoint**: Brand settings correctly appear in generated context

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Edge cases, documentation, and validation

- [x] T048 [P] Add edge case handling for missing all source files (generate minimal context with warnings)
- [x] T049 [P] Add existing file handling (prompt for overwrite/append/rename)
- [x] T050 [P] Update quickstart.md with actual tested commands
- [x] T051 Validate all templates generate valid markdown
- [x] T052 Run full workflow test: /presentation --type conference --brand cisco in pptx-generator repo
- [x] T053 Verify generated artifacts match data-model.md structure

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - US1 (Conference) is MVP - complete first
  - US2-US5 can proceed in parallel after US1
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - MVP
- **User Story 2 (P2)**: Can start after Foundational - independent of US1
- **User Story 3 (P2)**: Can start after Foundational - independent of US1
- **User Story 4 (P3)**: Can start after Foundational - reuses US1 templates
- **User Story 5 (P3)**: Can start after Foundational - independent of others

### Within Each User Story

- Template structure before content
- Content before examples
- Examples before testing
- Test before checkpoint

### Parallel Opportunities

**Phase 1 (Setup)**:
```
Task: T003 - presentation-context template
Task: T004 - narrative-flow template
Task: T005 - demo-script template
Task: T006 - speaker-notes template
```

**Phase 3 (US1 Templates)**:
```
Task: T016-T018 - narrative-flow template sections
Task: T019-T021 - demo-script template sections
```

**Phase 8 (Polish)**:
```
Task: T048 - edge case handling
Task: T049 - existing file handling
Task: T050 - quickstart update
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (create directories and empty templates)
2. Complete Phase 2: Foundational (update SKILL.md with arguments)
3. Complete Phase 3: User Story 1 (conference mode)
4. **STOP and VALIDATE**: Test `/presentation --type conference`
5. Deploy if ready - conference mode is the primary use case

### Incremental Delivery

1. Setup + Foundational → Skill structure ready
2. User Story 1 → Conference mode works → MVP!
3. User Story 2 → Meeting prep works
4. User Story 3 → Speaker notes work
5. User Story 4 → Narrative-only mode works
6. User Story 5 → Brand application works
7. Each story adds value without breaking previous stories

---

## Summary

| Phase | Tasks | Story |
|-------|-------|-------|
| Phase 1: Setup | T001-T006 (6 tasks) | — |
| Phase 2: Foundational | T007-T011 (5 tasks) | — |
| Phase 3: US1 Conference | T012-T025 (14 tasks) | P1 MVP |
| Phase 4: US2 Meeting Prep | T026-T033 (8 tasks) | P2 |
| Phase 5: US3 Speaker Notes | T034-T040 (7 tasks) | P2 |
| Phase 6: US4 Narrative Only | T041-T043 (3 tasks) | P3 |
| Phase 7: US5 Brand | T044-T047 (4 tasks) | P3 |
| Phase 8: Polish | T048-T053 (6 tasks) | — |
| **Total** | **53 tasks** | |

**MVP Scope**: Phases 1-3 (25 tasks) - Conference mode fully functional
