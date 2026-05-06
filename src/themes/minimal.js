/**
 * Minimal Theme - Clean, modern, distraction-free
 * Black/white with subtle gray accents
 */

export const minimal = {
  name: 'minimal',

  colors: {
    // Primary
    primary: '111827',       // Near black
    accent: '3B82F6',        // Blue accent

    // Backgrounds
    bgWhite: 'FFFFFF',
    bgLight: 'F9FAFB',
    bgDark: '111827',

    // Text
    textDark: '111827',
    textMuted: '6B7280',
    textLight: 'FFFFFF',
    textAccent: '3B82F6',

    // Supporting
    lightBlue: 'DBEAFE',
    mutedBlue: '93C5FD',

    // Borders
    border: 'E5E7EB',

    // Status colors
    green: '10B981',
    amber: 'F59E0B',
    red: 'EF4444',

    // Chart palette
    chart: ['3B82F6', '111827', '10B981', 'F59E0B', 'EF4444', '8B5CF6', 'EC4899']
  },

  fonts: {
    heading: 'Arial',
    body: 'Arial',
    mono: 'Consolas'
  },

  fontSize: {
    title: 54,
    subtitle: 28,
    sectionTitle: 36,
    slideTitle: 28,
    heading: 14,
    body: 11,
    small: 9,
    caption: 8
  },

  spacing: {
    margin: 0.6,
    gutter: 0.25,
    cardGap: 0.25,
    accentBarWidth: 0,       // No accent bar in minimal
    accentBarWidthLarge: 0
  },

  layout: {
    contentX: 0.6,
    contentWidth: 12.1,
    titleY: 0.6,
    titleHeight: 0.7,
    sectionLabelY: 0.3,
    sectionLabelHeight: 0.3,
    footerY: 7.1,
    footerTextY: 7.15,
    takeawayHeight: 0.9
  }
};

export default minimal;
