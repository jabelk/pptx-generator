# Research: Presentation Preparation Artifacts

**Date**: 2026-05-06
**Feature**: [spec.md](./spec.md) | [plan.md](./plan.md)

## Research Summary

This document consolidates research findings for the presentation preparation artifacts feature. Research was conducted earlier in this session covering narrative frameworks, demo script patterns, speaker notes standards, and meeting prep templates.

---

## 1. Narrative Structure Framework

### Decision: Duarte Resonate Framework

**Rationale**: Industry-standard framework used by professional speakers, well-documented, maps naturally to technical conference talks.

**Alternatives Considered**:
- Hero's Journey (too abstract for technical content)
- Problem-Solution-Benefit (too simple, misses emotional arc)
- Custom framework (unnecessary when Duarte works well)

### Implementation Details

**3-Act Structure**:
```
Act 1: Setup (10-15% of time)
├── Opening Hook (story, statistic, or question)
├── Current Reality ("What Is" - pain points)
└── Promise (what audience will learn)

Act 2: Journey (70-80% of time)
├── Cycle 1: Problem → Solution → Evidence
├── Cycle 2: Problem → Solution → Evidence
├── Cycle 3: Problem → Solution → Evidence
└── (3-5 cycles typical)

Act 3: Resolution (10-15% of time)
├── Key Takeaways (3 maximum)
├── Call to Action
└── Resources
```

**What Is / What Could Be Pattern**:
- Alternate between current pain ("What Is") and potential solution ("What Could Be")
- Each cycle adds evidence: demo, data, or example
- Creates emotional rhythm that maintains engagement

---

## 2. Demo Script Format

### Decision: SAY/DO/BACKUP Pattern

**Rationale**: Professional demo scripts from HubSpot, Microsoft, and Cisco use this explicit format. Separates verbal script from actions from failure recovery.

**Alternatives Considered**:
- Prose-based scripts (harder to follow during live demo)
- Numbered steps only (missing verbal guidance)
- Video-first demos (doesn't fit CLI skill use case)

### Implementation Details

**Section Structure**:
```markdown
### Demo Section: [Feature Name] (X min)

**SETUP**: [Pre-demo state/navigation]

**SAY**: "[What to say to audience]"

**DO**:
1. [Specific action]
2. [Specific action]
3. [Expected result]

**HIGHLIGHT**: [What to point out]

**SAY**: "[Explanation of what just happened]"

**BACKUP**: If fails, [recovery action or screenshot path]
```

**Timing Conventions**:
- Default session: 45 minutes
- Intro/setup: 5 minutes
- Core demo: 60-70% of remaining time
- Q&A buffer: 10% of time
- Each DO step: 10-30 seconds

---

## 3. Speaker Notes Standard

### Decision: Per-Slide Timing with Key Points

**Rationale**: Reveal.js and Marp patterns are well-established. Per-slide timing enables pacing indicators.

**Alternatives Considered**:
- Full scripts (too rigid, hard to adapt)
- Bullet points only (missing timing discipline)
- No notes (relies on memory, risky for important talks)

### Implementation Details

**Note Structure**:
```markdown
### Slide N: [Title]

**Timing**: X seconds (target)
**Pacing**: [On schedule | Flex +/- Y sec]

**Key Points** (must say):
1. [Point 1]
2. [Point 2]

**Nice to Have** (if time):
- [Optional point]

**Transition**:
- FROM previous: "[Bridge phrase]"
- TO next: "[Setup phrase]"

**Anticipated Questions**:
| Q | A |
|---|---|
| [Question] | [Answer] |
```

**Timing Calculation**:
- Sum of per-slide targets = session duration
- Validate total against metadata session length
- Flag slides > 3 minutes (likely too dense)

---

## 4. Meeting Prep Framework

### Decision: Stakeholder Matrix + Comparison Table

**Rationale**: User's existing meeting prep files (tiffany-oces-meeting-prep.md) use this pattern. Proven effective.

**Alternatives Considered**:
- Simple agenda only (misses strategic positioning)
- SWOT analysis (too generic for project comparison)
- Full business case (overkill for typical meetings)

### Implementation Details

**Stakeholder Analysis**:
```markdown
## Stakeholder Profiles

| Name | Role | Concerns | What to Emphasize |
|------|------|----------|-------------------|
| [Name] | [Title] | [Their priorities] | [Key points for them] |

## Anticipated Questions

| Question | Answer | Evidence |
|----------|--------|----------|
| [Expected Q] | [Prepared A] | [Supporting data] |

## Discussion Points

### Opening Position
- Context: [Situation]
- Our stance: [Position]

### What to Offer
- [Capability/insight we bring]

### What to Ask
- [Information we need]
```

**Comparison Table** (when --compare used):
```markdown
## Comparison: [Project A] vs [Project B]

| Dimension | [Project A] | [Project B] |
|-----------|-------------|-------------|
| Status | [State] | [State] |
| Key Capabilities | [List] | [List] |
| Tech Stack | [Stack] | [Stack] |
| Data Sources | [Count/types] | [Count/types] |
| Strengths | [Advantages] | [Advantages] |
| Gaps | [Missing] | [Missing] |
```

---

## 5. Source File Analysis

### Decision: Prioritized Fallback Chain

**Rationale**: Repositories have varying documentation quality. Graceful degradation ensures skill works everywhere.

**Priority Order**:
1. CLAUDE.md (most structured, contains architecture)
2. README.md (overview, features, quick start)
3. MEMORY.md (current status, recent changes)
4. package.json / pyproject.toml (name, version, description)
5. git log (recent commits, contributors)

**Extraction Rules**:
| Source | Extract |
|--------|---------|
| CLAUDE.md | Architecture, commands, key patterns, critical requirements |
| README.md | Overview, features, installation, usage examples |
| MEMORY.md | Version, status, recent changes, pending work |
| package.json | name, version, description, dependencies |
| git log | Recent commits (15), contributors |

**Missing Source Handling**:
- Note missing source in output: "Note: No CLAUDE.md found; using README.md and git history"
- If all sources missing: Generate minimal template with explicit "[NEEDS INPUT]" markers

---

## 6. Brand Integration

### Decision: Brand Settings Section in Output

**Rationale**: Brands already defined in brands.md. Include settings in context for PPTX generation phase.

**Implementation**:
```markdown
## Brand Settings

**Theme**: cisco
**Primary Color**: #049FD9 (Cisco Blue)
**Accent Color**: #00BCEB (Cisco Cyan)
**Background**: Light
**Fonts**: CiscoSansTT / Calibri fallback
```

**Default**: cowork brand if --brand not specified

---

## Resolved Questions

| Question | Resolution |
|----------|------------|
| Default session duration | 45 minutes (Cisco Live breakout standard) |
| Timing calculation method | Sum per-slide targets, validate against session |
| Missing source handling | Graceful fallback with explicit notes |
| File conflict handling | Claude Code prompts interactively |
| Brand default | cowork theme |

---

## Outstanding Items

None - all technical questions resolved. Ready for Phase 1 design.
