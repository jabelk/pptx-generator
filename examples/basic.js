#!/usr/bin/env node
/**
 * Basic Example - Simple presentation with common slide types
 *
 * Run with: node examples/basic.js
 */

import { createPresentation, addSlide } from '../src/index.js';

// Create presentation with cowork theme
const pptx = createPresentation({
  theme: 'cowork',
  title: 'Basic Example Presentation',
  author: 'PptxGenerator'
});

// 1. Title slide
addSlide(pptx, 'title', {
  eyebrow: 'EXAMPLE',
  title: 'PptxGenerator Demo',
  subtitle: 'Creating professional presentations with code',
  author: 'Your Name',
  date: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
});

// 2. Agenda slide
addSlide(pptx, 'agenda', {
  title: 'Agenda',
  items: [
    'Introduction to the library',
    'Theme system overview',
    'Slide types available',
    'Next steps and resources'
  ],
  sectionLabel: 'Overview',
  pageNum: 2
});

// 3. Quote slide
addSlide(pptx, 'quote', {
  quote: 'The best way to predict the future is to create it.',
  attribution: 'Peter Drucker',
  pageNum: 3
});

// 4. Content slide with bullets
addSlide(pptx, 'content', {
  title: 'Key Features',
  subtitle: 'What makes this library powerful',
  bullets: [
    'Consistent theming across all slides',
    'Professional McKinsey-style layouts',
    'Easy to extend and customize',
    'Works with absolute image paths',
    'Declarative or programmatic API'
  ],
  sectionLabel: 'Features',
  pageNum: 4
});

// 5. Content slide with cards
addSlide(pptx, 'content', {
  title: 'Available Themes',
  cards: [
    {
      title: 'Cowork',
      description: 'Dark navy and cyan theme with professional corporate styling'
    },
    {
      title: 'Minimal',
      description: 'Clean black and white theme with subtle accent colors'
    },
    {
      title: 'Custom',
      description: 'Create your own theme by extending the base configuration'
    }
  ],
  sectionLabel: 'Themes',
  pageNum: 5
});

// 6. Comparison slide
addSlide(pptx, 'comparison', {
  title: 'Manual vs Automated',
  leftTitle: 'Manual Creation',
  leftItems: [
    'Time-consuming formatting',
    'Inconsistent styling',
    'Hard to maintain',
    'Error-prone updates'
  ],
  rightTitle: 'With PptxGenerator',
  rightItems: [
    'Instant generation',
    'Consistent theming',
    'Version controlled',
    'Easy to update'
  ],
  sectionLabel: 'Comparison',
  pageNum: 6
});

// 7. Phases/timeline slide
addSlide(pptx, 'phases', {
  title: 'Implementation Roadmap',
  subtitle: 'Three phases to production',
  phases: [
    {
      num: '1',
      name: 'Setup',
      desc: 'Week 1',
      tasks: ['Install library', 'Configure theme', 'Create templates']
    },
    {
      num: '2',
      name: 'Development',
      desc: 'Weeks 2-3',
      tasks: ['Build slide library', 'Add custom components', 'Test outputs']
    },
    {
      num: '3',
      name: 'Production',
      desc: 'Week 4',
      tasks: ['Deploy automation', 'Train team', 'Document usage']
    }
  ],
  sectionLabel: 'Roadmap',
  pageNum: 7
});

// 8. Checklist slide
addSlide(pptx, 'checklist', {
  title: 'Feature Checklist',
  rows: [
    { req: 'Theme system', status: 'Complete', notes: 'Cowork and Minimal themes' },
    { req: 'Slide builders', status: 'Complete', notes: '10 slide types' },
    { req: 'Image utilities', status: 'Complete', notes: 'Base64 and path resolution' },
    { req: 'SVG diagrams', status: 'In Progress', notes: 'Architecture helpers added' },
    { req: 'Documentation', status: 'Complete', notes: 'README and examples' }
  ],
  sectionLabel: 'Status',
  pageNum: 8
});

// 9. Summary slide
addSlide(pptx, 'summary', {
  eyebrow: 'SUMMARY',
  message: 'PptxGenerator makes it easy to create\nprofessional presentations programmatically.\n\nStart building your slide library today.',
  footerText: 'PptxGenerator Demo',
  pageNum: 9
});

// Save presentation
const outputPath = './examples/output/basic-example.pptx';
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`Presentation saved to: ${outputPath}`);
  })
  .catch(err => {
    console.error('Error saving presentation:', err);
  });
