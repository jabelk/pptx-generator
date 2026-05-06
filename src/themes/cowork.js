/**
 * Cowork Theme - Claude Cowork inspired professional style
 * Dark navy with cyan accents, Cambria/Calibri typography
 */

export const cowork = {
  name: 'cowork',

  colors: {
    // Primary
    primary: '0D2A5C',      // Dark navy - main headers, emphasis
    accent: '049FD9',        // Cyan - accents, highlights, links

    // Backgrounds
    bgWhite: 'FFFFFF',
    bgLight: 'F1F5F9',       // Light gray for alternating rows, cards
    bgDark: '0D2A5C',        // Dark navy for title/summary slides

    // Text
    textDark: '334155',      // Primary body text
    textMuted: '64748B',     // Secondary/caption text
    textLight: 'FFFFFF',     // Text on dark backgrounds
    textAccent: '049FD9',    // Highlighted text

    // Supporting
    lightBlue: 'BFD7E8',     // Subtle blue tints
    mutedBlue: '8FA8C9',     // Muted blue for subtle elements

    // Borders
    border: 'E2E8F0',        // Light gray borders

    // Status colors
    green: '22C55E',         // Success, complete
    amber: 'F59E0B',         // Warning, in progress
    red: 'EF4444',           // Error, blocked

    // Chart palette (for data visualizations)
    chart: ['049FD9', '0D2A5C', '22C55E', 'F59E0B', 'EF4444', '8B5CF6', 'EC4899']
  },

  fonts: {
    heading: 'Cambria',
    body: 'Calibri',
    mono: 'Courier New'
  },

  // Font sizes in points
  fontSize: {
    title: 60,
    subtitle: 32,
    sectionTitle: 40,
    slideTitle: 30,
    heading: 16,
    body: 12,
    small: 10,
    caption: 9
  },

  // Spacing in inches
  spacing: {
    margin: 0.55,            // Standard slide margin
    gutter: 0.2,             // Space between elements
    cardGap: 0.2,            // Gap between cards
    accentBarWidth: 0.18,    // Left accent bar width
    accentBarWidthLarge: 0.4 // Accent bar for title slides
  },

  // Standard positions
  layout: {
    // Content area (after left bar)
    contentX: 0.55,
    contentWidth: 12.2,

    // Title position
    titleY: 0.65,
    titleHeight: 0.75,

    // Section label (eyebrow)
    sectionLabelY: 0.35,
    sectionLabelHeight: 0.32,

    // Footer
    footerY: 7.05,
    footerTextY: 7.12,

    // Takeaway box
    takeawayHeight: 1.0
  }
};

export default cowork;
