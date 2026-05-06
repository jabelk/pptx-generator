#!/usr/bin/env node
/**
 * Architecture Diagrams Example
 *
 * Demonstrates creating architecture and flow diagrams
 * using the SVG utilities.
 *
 * Run with: node examples/with-diagrams.js
 */

import { createPresentation, themes, slides } from '../src/index.js';
import {
  addArchitectureBox,
  addArrowConnector,
  addFlowDiagram,
  addVerticalStack,
  addConnectorLabel
} from '../src/utils/svg.js';
import { addChrome, addTitle } from '../src/components/chrome.js';

const pptx = createPresentation({
  theme: 'cowork',
  title: 'Architecture Diagrams Example',
  author: 'PptxGenerator'
});

const theme = themes.getTheme('cowork');

// 1. Title slide
slides.addTitleSlide(pptx, theme, {
  eyebrow: 'ARCHITECTURE',
  title: 'System Architecture Examples',
  subtitle: 'Creating diagrams with PptxGenerator',
  date: new Date().toLocaleDateString()
});

// 2. Simple flow diagram
const flowSlide = pptx.addSlide();
flowSlide.background = { color: theme.colors.bgWhite };
addChrome(flowSlide, theme, { sectionLabel: 'Flow', pageNum: 2 });
addTitle(flowSlide, theme, 'Data Processing Pipeline');

addFlowDiagram(flowSlide, theme, {
  startX: 1.5,
  startY: 3,
  boxWidth: 2.2,
  boxHeight: 1.2,
  gap: 0.6,
  boxes: [
    { label: 'Ingest', sublabel: 'Raw Data', bgColor: theme.colors.primary },
    { label: 'Transform', sublabel: 'Clean & Map', bgColor: theme.colors.accent },
    { label: 'Validate', sublabel: 'Quality Check', bgColor: theme.colors.amber },
    { label: 'Store', sublabel: 'Database', bgColor: theme.colors.green }
  ]
});

// 3. Three-tier architecture
const tierSlide = pptx.addSlide();
tierSlide.background = { color: theme.colors.bgWhite };
addChrome(tierSlide, theme, { sectionLabel: 'Architecture', pageNum: 3 });
addTitle(tierSlide, theme, 'Three-Tier Architecture');

// Presentation tier
addArchitectureBox(tierSlide, theme, {
  x: 5.2, y: 1.5, w: 3, h: 1,
  label: 'Web Browser',
  sublabel: 'React SPA',
  bgColor: theme.colors.cyan
});

addArrowConnector(tierSlide, theme, {
  x1: 6.7, y1: 2.55, x2: 6.7, y2: 2.95
});
addConnectorLabel(tierSlide, theme, {
  x: 6.7, y: 2.75, text: 'HTTPS'
});

// Application tier
addArchitectureBox(tierSlide, theme, {
  x: 5.2, y: 3, w: 3, h: 1,
  label: 'API Server',
  sublabel: 'Node.js + Express',
  bgColor: theme.colors.primary
});

addArrowConnector(tierSlide, theme, {
  x1: 6.7, y1: 4.05, x2: 6.7, y2: 4.45
});
addConnectorLabel(tierSlide, theme, {
  x: 6.7, y: 4.25, text: 'SQL'
});

// Data tier
addArchitectureBox(tierSlide, theme, {
  x: 5.2, y: 4.5, w: 3, h: 1,
  label: 'Database',
  sublabel: 'PostgreSQL',
  bgColor: theme.colors.accent
});

// Tier labels
tierSlide.addText('Presentation\nTier', {
  x: 2, y: 1.7, w: 2, h: 0.6,
  fontSize: 10, fontFace: theme.fonts.body,
  color: theme.colors.textMuted, align: 'right'
});
tierSlide.addText('Application\nTier', {
  x: 2, y: 3.2, w: 2, h: 0.6,
  fontSize: 10, fontFace: theme.fonts.body,
  color: theme.colors.textMuted, align: 'right'
});
tierSlide.addText('Data\nTier', {
  x: 2, y: 4.7, w: 2, h: 0.6,
  fontSize: 10, fontFace: theme.fonts.body,
  color: theme.colors.textMuted, align: 'right'
});

// 4. Microservices diagram
const msSlide = pptx.addSlide();
msSlide.background = { color: theme.colors.bgWhite };
addChrome(msSlide, theme, { sectionLabel: 'Microservices', pageNum: 4 });
addTitle(msSlide, theme, 'Microservices Architecture');

// API Gateway
addArchitectureBox(msSlide, theme, {
  x: 5.5, y: 1.5, w: 2.5, h: 0.8,
  label: 'API Gateway',
  bgColor: theme.colors.primary
});

// Services row
const services = [
  { label: 'Auth Service', bgColor: theme.colors.cyan },
  { label: 'User Service', bgColor: theme.colors.accent },
  { label: 'Order Service', bgColor: theme.colors.amber },
  { label: 'Payment', bgColor: theme.colors.green }
];

services.forEach((svc, i) => {
  const x = 1.5 + (i * 2.8);
  addArchitectureBox(msSlide, theme, {
    x, y: 3, w: 2.3, h: 0.9,
    label: svc.label,
    bgColor: svc.bgColor
  });

  // Arrow from gateway
  addArrowConnector(msSlide, theme, {
    x1: 6.75, y1: 2.35,
    x2: x + 1.15, y2: 2.95
  });
});

// Databases row
const databases = [
  { label: 'Auth DB', x: 2.9 },
  { label: 'User DB', x: 5.6 },
  { label: 'Order DB', x: 8.3 }
];

databases.forEach((db) => {
  addArchitectureBox(msSlide, theme, {
    x: db.x, y: 4.8, w: 2, h: 0.7,
    label: db.label,
    bgColor: theme.colors.bgDark,
    textColor: theme.colors.textLight
  });
});

// Arrows to databases
addArrowConnector(msSlide, theme, { x1: 2.65, y1: 3.95, x2: 3.4, y2: 4.75 });
addArrowConnector(msSlide, theme, { x1: 5.5, y1: 3.95, x2: 6.1, y2: 4.75 });
addArrowConnector(msSlide, theme, { x1: 8.35, y1: 3.95, x2: 8.8, y2: 4.75 });

// 5. Event-driven architecture
const eventSlide = pptx.addSlide();
eventSlide.background = { color: theme.colors.bgWhite };
addChrome(eventSlide, theme, { sectionLabel: 'Events', pageNum: 5 });
addTitle(eventSlide, theme, 'Event-Driven Architecture');

// Publishers
addVerticalStack(eventSlide, theme, {
  startX: 1, startY: 2,
  boxWidth: 2.5, boxHeight: 0.8, gap: 0.4,
  showArrows: false,
  boxes: [
    { label: 'Producer A', bgColor: theme.colors.cyan },
    { label: 'Producer B', bgColor: theme.colors.cyan },
    { label: 'Producer C', bgColor: theme.colors.cyan }
  ]
});

// Message broker
addArchitectureBox(eventSlide, theme, {
  x: 5, y: 2.8, w: 3, h: 1.5,
  label: 'Message Broker',
  sublabel: 'Kafka / RabbitMQ',
  bgColor: theme.colors.accent
});

// Consumers
addVerticalStack(eventSlide, theme, {
  startX: 9.5, startY: 2,
  boxWidth: 2.5, boxHeight: 0.8, gap: 0.4,
  showArrows: false,
  boxes: [
    { label: 'Consumer X', bgColor: theme.colors.green },
    { label: 'Consumer Y', bgColor: theme.colors.green },
    { label: 'Consumer Z', bgColor: theme.colors.green }
  ]
});

// Arrows to broker
[2.4, 3.2, 4.0].forEach(y => {
  addArrowConnector(eventSlide, theme, {
    x1: 3.55, y1: y, x2: 4.95, y2: 3.55
  });
});

// Arrows from broker
[2.4, 3.2, 4.0].forEach(y => {
  addArrowConnector(eventSlide, theme, {
    x1: 8.05, y1: 3.55, x2: 9.45, y2: y
  });
});

// Labels
eventSlide.addText('Publishers', {
  x: 1, y: 1.5, w: 2.5, h: 0.4,
  fontSize: 11, fontFace: theme.fonts.body, bold: true,
  color: theme.colors.textDark, align: 'center'
});
eventSlide.addText('Subscribers', {
  x: 9.5, y: 1.5, w: 2.5, h: 0.4,
  fontSize: 11, fontFace: theme.fonts.body, bold: true,
  color: theme.colors.textDark, align: 'center'
});

// 6. Summary
slides.addSummarySlide(pptx, theme, {
  eyebrow: 'DIAGRAMS',
  message: 'Architecture diagrams can be created\nprogrammatically using simple primitives:\n\n• Boxes with labels\n• Arrow connectors\n• Flow and stack layouts',
  pageNum: 6
});

// Save
const outputPath = './examples/output/diagrams-example.pptx';
pptx.writeFile({ fileName: outputPath })
  .then(() => console.log(`Saved: ${outputPath}`))
  .catch(err => console.error('Error:', err));
