# Data Model: Presentation Preparation Artifacts

**Date**: 2026-05-06
**Feature**: [spec.md](./spec.md)

## Overview

This document defines the data structures for presentation preparation artifacts. All artifacts are markdown files with structured sections.

---

## Entities

### 1. Presentation Context

The core artifact containing slide content and metadata.

**File**: `presentation-context.md`

**Structure**:
```yaml
PresentationContext:
  metadata:
    title: string                    # Presentation title
    subtitle: string | null          # Optional subtitle
    presenter: string                # From git config or user input
    audience: string                 # Target audience description
    duration: integer                # Minutes (default: 45)
    venue: enum [in-person, virtual, hybrid]
    brand: string                    # Brand name from brands.md

  brand_settings:
    theme: string                    # pptx-generator theme name
    primary_color: string            # Hex color
    accent_color: string             # Hex color
    background: enum [light, dark]
    fonts:
      heading: string
      body: string

  project_overview:
    summary: string                  # 2-3 paragraph description
    capabilities: string[]           # Bullet list of features
    tech_stack: string[]             # Languages, frameworks

  architecture:
    diagram: string                  # ASCII diagram (preserved)
    modules: Module[]
    data_flow: string | null         # Optional description

  recent_changes:
    items: ChangeItem[]

  slide_outline:
    slides: SlideEntry[]

  diagrams_to_create:
    diagrams: Diagram[]

  key_quotes:
    quotes: string[]                 # Callouts to highlight

  demo_script: string | null         # Link to demo-script.md if generated

  open_questions:
    questions: string[]              # Things to clarify with user

  speaker_notes: SpeakerNote[] | null  # Embedded if --speaker-notes

Module:
  path: string
  purpose: string

ChangeItem:
  date: string
  description: string

SlideEntry:
  number: integer
  type: enum [title, agenda, content, comparison, quote, demo, summary]
  title: string
  content_summary: string
  timing_seconds: integer
  notes: string | null

Diagram:
  name: string
  ascii_art: string                  # Raw ASCII to convert

SpeakerNote:
  slide_number: integer
  slide_title: string
  timing_seconds: integer
  key_points: string[]               # Must-say items
  nice_to_have: string[]             # Optional if time
  transition_from: string
  transition_to: string
  anticipated_questions: QA[]

QA:
  question: string
  answer: string
```

---

### 2. Narrative Flow

Story structure artifact using Duarte Resonate framework.

**File**: `narrative-flow.md`

**Structure**:
```yaml
NarrativeFlow:
  metadata:
    title: string
    duration: integer                # Minutes
    generated: date

  story_arc:
    hook_type: enum [story, statistic, question, demo]
    hook_content: string
    thesis: string                   # "By the end, you will..."

  act_1_setup:                       # 10-15% of time
    opening_hook: string
    current_reality: string[]        # "What Is" pain points
    promise: string

  act_2_journey:                     # 70-80% of time
    cycles: Cycle[]

  act_3_resolution:                  # 10-15% of time
    key_takeaways: string[]          # Max 3
    call_to_action: string
    resources: Resource[]

  teaching_moments:
    moments: TeachingMoment[]

  key_quotes:
    quotes: Quote[]

  transitions:
    transitions: Transition[]

Cycle:
  number: integer
  problem_what_is: string
  solution_what_could_be: string
  evidence_type: enum [demo, data, example]
  evidence_description: string

Resource:
  name: string
  url: string | null

TeachingMoment:
  slide_reference: string
  moment: string
  callout_phrase: string

Quote:
  text: string
  attribution: string | null
  use_context: string

Transition:
  from_section: string
  to_section: string
  phrase: string
```

---

### 3. Demo Script

Step-by-step demonstration artifact.

**File**: `demo-script.md`

**Structure**:
```yaml
DemoScript:
  metadata:
    title: string
    total_duration: integer          # Minutes
    presenter: string
    generated: date

  pre_demo_checklist:
    environment:
      items: ChecklistItem[]
    backup_plan:
      failures: FailureRecovery[]

  sections:
    sections: DemoSection[]

  closing:
    recap_points: string[]
    next_steps: string[]

  post_demo_notes:
    template: NoteEntry[]            # Empty table for filling in

ChecklistItem:
  item: string
  checked: boolean                   # Always false in template

FailureRecovery:
  failure: string
  recovery: string

DemoSection:
  number: integer
  name: string
  duration_minutes: integer
  setup: string                      # Pre-section state
  steps: DemoStep[]
  backup: string                     # Fallback if section fails

DemoStep:
  type: enum [SAY, DO, HIGHLIGHT, ASK]
  content: string                    # Script text or action list
  substeps: string[] | null          # For DO type

NoteEntry:
  topic: string
  question_feedback: string
  follow_up_needed: string
```

---

### 4. Stakeholder Analysis

Meeting preparation artifact (embedded in context for meeting-prep type).

**Structure**:
```yaml
StakeholderAnalysis:
  meeting_context:
    date: string
    duration: integer
    purpose: string
    desired_outcome: string

  stakeholder_profiles:
    profiles: StakeholderProfile[]

  anticipated_questions:
    questions: AnticipatedQuestion[]

  discussion_points:
    opening_position:
      context: string
      stance: string
    supporting_arguments: Argument[]
    closing_position:
      summary: string
      call_to_action: string

  what_to_offer: string[]
  what_to_ask: string[]

StakeholderProfile:
  name: string
  role: string
  concerns: string[]
  what_to_emphasize: string[]

AnticipatedQuestion:
  question: string
  answer: string
  evidence: string | null

Argument:
  point: string
  evidence: string
  counter_to_objection: string
```

---

### 5. Comparison Table

Cross-project comparison (when --compare used).

**Structure**:
```yaml
ComparisonTable:
  project_a:
    name: string
    path: string
  project_b:
    name: string
    path: string

  dimensions:
    rows: ComparisonRow[]

ComparisonRow:
  dimension: string
  project_a_value: string
  project_b_value: string
```

**Standard Dimensions**:
- Status
- Key Capabilities
- Tech Stack
- Data Sources
- Strengths
- Gaps

---

### 6. Brand Configuration

Color scheme settings (read from brands.md).

**Structure**:
```yaml
BrandConfiguration:
  name: string
  base_theme: enum [cowork, minimal]
  background: enum [light, dark]

  colors:
    primary: string                  # Hex without #
    accent: string
    secondary: string | null
    bg_white: string
    bg_light: string
    bg_dark: string
    text_dark: string
    text_muted: string
    text_light: string
    text_accent: string
    green: string
    amber: string
    red: string

  fonts:
    heading: string
    body: string
    mono: string

  usage: string[]                    # When to use this brand
```

---

## Relationships

```
PresentationContext
    ├── references → NarrativeFlow (via demo_script link)
    ├── references → DemoScript (via demo_script link)
    ├── contains → SpeakerNote[] (when --speaker-notes)
    ├── contains → StakeholderAnalysis (when --type meeting-prep)
    ├── contains → ComparisonTable (when --compare)
    └── uses → BrandConfiguration (from brands.md)

NarrativeFlow
    └── derived from → PresentationContext (uses same source analysis)

DemoScript
    └── derived from → PresentationContext (uses project commands/capabilities)
```

---

## Validation Rules

### Timing Validation
- Sum of SlideEntry.timing_seconds must equal metadata.duration * 60
- Each SpeakerNote.timing_seconds must match corresponding SlideEntry
- DemoSection durations must sum to DemoScript.total_duration

### Content Validation
- NarrativeFlow must have exactly 3 acts
- Act 2 must have 3-5 Cycles
- Key takeaways limited to 3
- Stakeholder analysis must have at least 3 anticipated questions (SC-006)

### Source Validation
- At least one source (CLAUDE.md, README.md, or git log) must be available
- Missing sources noted in open_questions
