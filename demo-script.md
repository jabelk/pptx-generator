# Demo Script: PptxGenerator

**Total Duration**: 45 minutes (demo portion: ~15 min)
**Presenter**: Jason Belk
**Generated**: 2025-05-06

---

## Pre-Demo Checklist

### Environment Setup

- [ ] Demo environment: ~/dev/projects/pptx-generator/
- [ ] Node.js installed and working: `node --version`
- [ ] Dependencies installed: `npm install` completed
- [ ] Sample configs ready: examples/config.json, examples/self-demo.json
- [ ] Terminal font size: 18pt minimum for visibility
- [ ] Screen resolution: 1920x1080 (recommended)
- [ ] VS Code or editor ready with examples/basic.js open
- [ ] PowerPoint or preview app ready
- [ ] Notifications disabled

### Files to Have Open

- [ ] Terminal in ~/dev/projects/pptx-generator/
- [ ] VS Code with examples/basic.js
- [ ] VS Code with src/themes/cowork.js
- [ ] examples/config.json in editor

### Backup Materials

| Location | Contents |
|----------|----------|
| examples/output/ | Pre-generated presentations |
| examples/output/basic-presentation.pptx | Basic example output |
| examples/output/demo-output.pptx | Self-demo output |
| /backup/screenshots/ | Screenshots of each step |

---

## Backup Plan

| Failure Scenario | Recovery Action |
|------------------|-----------------|
| Node.js not found | Use Docker: `docker run -v $(pwd):/workspace pptx-generator config.json output.pptx` |
| npm install fails | Use pre-installed examples/output/ files |
| CLI hangs | Kill process, show pre-generated output |
| PPTX won't open | Show screenshots from /backup/ |
| QA tool crashes | Describe expected output, show screenshot |
| Time running short | Skip to "Full Workflow" section, summarize earlier sections |

---

## Demo Opening (2 min)

**SETUP**: Terminal open in project directory, VS Code minimized

**SAY**:
"Alright, let's see PptxGenerator in action. I have this project cloned and dependencies installed. Let me show you the simplest possible example."

**Audience Check** (optional):
"Before we dive in - how many of you have used a command-line tool to generate documents before? PDF, HTML, anything? [pause] Great, this will feel familiar."

---

## Demo Section 1: Basic Generation (4 min)

### Setup

**Navigate to**: Terminal in ~/dev/projects/pptx-generator/
**Starting state**: Clean terminal, no files open

### Script

**SAY**:
"Let's start with the JavaScript API. I have a file called basic.js that creates a simple presentation."

**DO**:
1. Open examples/basic.js in VS Code
2. Scroll through slowly, pointing out:
   - `createPresentation({ theme: 'cowork' })`
   - `addSlide(pptx, 'title', { ... })`
   - `addSlide(pptx, 'agenda', { ... })`
   - `pptx.writeFile({ fileName: '...' })`

**HIGHLIGHT**:
Point to addSlide calls: "Notice how each slide is just a function call with options. No positioning, no colors, no fonts - just content."

**SAY**:
"Let's run it."

**DO**:
1. In terminal: `node examples/basic.js`
2. Wait for output: "Presentation created: examples/output/basic-presentation.pptx"

**HIGHLIGHT**:
"Three seconds. Let's open it."

**DO**:
1. Open examples/output/basic-presentation.pptx
2. Click through 3-4 slides
3. Point out consistent formatting

**SAY**:
"Professional slides, consistent formatting, and I never touched PowerPoint."

### Timing

- Setup: 30 sec
- Code walkthrough: 90 sec
- Execution: 30 sec
- Review output: 60 sec
- **Section Total**: 3.5 min

### Backup

**If this fails**: Open examples/output/basic-presentation.pptx and say "I ran this earlier"
**Screenshot**: /backup/screenshots/basic-output.png

### Transition

**SAY**: "That's the JavaScript API. But what if you want to generate presentations without writing code?"

---

## Demo Section 2: CLI with JSON Config (3 min)

### Setup

**Navigate to**: Terminal, have examples/config.json visible
**Starting state**: Terminal ready

### Script

**SAY**:
"For production workflows, you probably want JSON configs. Your content team can edit JSON without touching code."

**DO**:
1. Open examples/config.json in VS Code
2. Scroll through showing structure:
   - Theme setting
   - Array of slides
   - Each slide has type and content

**HIGHLIGHT**:
"Pure data. No JavaScript. Your CMS, database, or API can generate this format."

**SAY**:
"The CLI takes this JSON and produces a PPTX."

**DO**:
1. In terminal: `node cli.js examples/config.json examples/output/cli-output.pptx`
2. Show success message
3. Open the generated file briefly

**SAY**:
"Same result, but now it's scriptable. Put this in a bash script, a CI/CD pipeline, a cron job."

### Timing

- Setup: 15 sec
- JSON walkthrough: 60 sec
- CLI execution: 30 sec
- Review: 30 sec
- **Section Total**: 2.5 min

### Backup

**If this fails**: Show pre-generated output
**Screenshot**: /backup/screenshots/cli-output.png

### Transition

**SAY**: "Now let's talk about themes."

---

## Demo Section 3: Theme Comparison (3 min)

### Setup

**Navigate to**: VS Code with src/themes/cowork.js and src/themes/minimal.js
**Starting state**: Both theme files visible side-by-side

### Script

**SAY**:
"Every presentation uses a theme. A theme is just colors, fonts, and spacing defined in one place."

**DO**:
1. Show src/themes/cowork.js
2. Highlight colors object: primary, accent, bgWhite, bgDark
3. Highlight fonts object
4. Switch to src/themes/minimal.js
5. Show the differences

**HIGHLIGHT**:
"This is your entire brand identity in about 20 lines of code. Change primary color here, every slide updates."

**SAY**:
"Watch what happens when I generate the same content with different themes."

**DO**:
1. Generate with cowork (already done from basic.js)
2. Modify basic.js to use 'minimal' theme OR run: `node examples/with-diagrams.js`
3. Open both presentations
4. Show side-by-side (or switch between tabs)

**HIGHLIGHT**:
"Same content. Completely different look. This is how you enforce brand consistency."

### Timing

- Theme file walkthrough: 60 sec
- Generate comparison: 60 sec
- Side-by-side review: 60 sec
- **Section Total**: 3 min

### Backup

**If this fails**: Show screenshots of both outputs
**Screenshot**: /backup/screenshots/theme-comparison.png

### Transition

**SAY**: "Beautiful. But how do we know the content is actually correct?"

---

## Demo Section 4: QA Validation (3 min)

### Setup

**Navigate to**: Terminal
**Starting state**: Have a generated PPTX file ready

### Script

**SAY**:
"When you're generating presentations at scale, you need automated validation. The QA tool extracts all text from a PPTX and can validate it against expected content."

**DO**:
1. Run: `node qa.js examples/output/basic-presentation.pptx`
2. Show the text extraction output
3. Point out slide numbers, text elements

**HIGHLIGHT**:
"This pulls every text element out of the PPTX XML. You can inspect exactly what's in the file."

**SAY**:
"Now let's validate against a config."

**DO**:
1. Run: `node qa.js examples/output/cli-output.pptx examples/config.json`
2. Show the validation report with checkmarks
3. Point out "Status: PASSED" and slide count

**HIGHLIGHT**:
"Green checkmarks mean content matches. This returns exit code 0 for pass, 1 for fail - perfect for CI/CD."

**SAY**:
"You can gate deployments on this. No more shipping presentations with typos."

### Timing

- Text extraction: 45 sec
- Validation demo: 60 sec
- CI/CD explanation: 30 sec
- **Section Total**: 2.5 min

### Backup

**If this fails**: Describe the output verbally, show /backup/qa-output.txt
**Screenshot**: /backup/screenshots/qa-validation.png

### Transition

**SAY**: "Let me show you the full workflow one more time."

---

## Demo Section 5: Full Workflow (2 min)

### Setup

**Navigate to**: Terminal, clean state
**Starting state**: Ready for fresh demo

### Script

**SAY**:
"Here's the complete pipeline in three commands."

**DO**:
1. Show JSON config briefly
2. Run: `node cli.js examples/config.json output.pptx`
3. Run: `node qa.js output.pptx examples/config.json`
4. Show both commands succeeded

**SAY**:
"JSON to PPTX to validated. Script this, schedule it, run it in CI. Same input, same output, every time."

**HIGHLIGHT**:
"This is what reproducible presentations look like."

### Timing

- Commands: 60 sec
- Summary: 30 sec
- **Section Total**: 1.5 min

### Backup

**If this fails**: Summarize verbally

### Transition

**SAY**: "Let me recap and show you how to get started."

---

## Demo Closing (2 min)

**SAY**:
"So to recap what we just saw:

1. **JavaScript API** - Create presentations programmatically with addSlide()
2. **CLI with JSON** - Generate from config files, perfect for automation
3. **Themes** - Define your brand once, apply everywhere
4. **QA Validation** - Automated content verification for CI/CD

The code is open source. Clone it, run the examples, and you'll be generating presentations in five minutes."

**ASK**:
"What questions do you have about what we demonstrated?"

**Next Steps**:
```bash
git clone https://github.com/jabelk/pptx-generator.git
cd pptx-generator
npm install
node examples/basic.js
```

---

## Timing Summary

| Section | Duration | Running Total |
|---------|----------|---------------|
| Opening | 2 min | 2 min |
| Section 1: Basic Generation | 4 min | 6 min |
| Section 2: CLI with JSON | 3 min | 9 min |
| Section 3: Theme Comparison | 3 min | 12 min |
| Section 4: QA Validation | 3 min | 15 min |
| Section 5: Full Workflow | 2 min | 17 min |
| Closing | 2 min | 19 min |
| **Buffer** | 6 min | 25 min |
| **Total Demo Time** | 25 min | |

**Target**: 25 minutes within 45-minute session
**Buffer**: 6 minutes for questions/issues during demo

---

## Post-Demo Notes

| Topic | Question/Feedback | Follow-up Needed |
|-------|-------------------|------------------|
| | | |
| | | |
| | | |

---

## Quick Reference Card

**Key Commands**:
```bash
# Basic example
node examples/basic.js

# CLI generation
node cli.js config.json output.pptx

# QA validation
node qa.js output.pptx config.json

# Docker (no Node required)
docker run -v $(pwd):/workspace pptx-generator config.json output.pptx
```

**Key Files**:
- `examples/basic.js` - JavaScript API example
- `examples/config.json` - Simple JSON config
- `src/themes/cowork.js` - Default theme
- `src/themes/minimal.js` - Minimal theme

**Emergency Recovery**:
- Pre-generated outputs: `examples/output/`
- Screenshots: `/backup/screenshots/`
- Docker fallback: `docker run -v $(pwd):/workspace pptx-generator`
