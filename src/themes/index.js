/**
 * Theme system for pptx-generator
 *
 * Themes define colors, fonts, spacing, and layout conventions.
 * Use getTheme() to retrieve a theme by name.
 */

import { cowork } from './cowork.js';
import { minimal } from './minimal.js';

// Registry of available themes
const themes = {
  cowork,
  minimal
};

/**
 * Get a theme by name
 * @param {string} name - Theme name ('cowork', 'minimal')
 * @returns {object} Theme configuration
 */
export function getTheme(name = 'cowork') {
  const theme = themes[name];
  if (!theme) {
    throw new Error(`Unknown theme: ${name}. Available: ${Object.keys(themes).join(', ')}`);
  }
  return theme;
}

/**
 * Create a custom theme by extending an existing one
 * @param {string} baseName - Base theme to extend
 * @param {object} overrides - Properties to override
 * @returns {object} New theme configuration
 */
export function extendTheme(baseName, overrides) {
  const base = getTheme(baseName);
  return {
    ...base,
    name: overrides.name || `${base.name}-custom`,
    colors: { ...base.colors, ...overrides.colors },
    fonts: { ...base.fonts, ...overrides.fonts },
    fontSize: { ...base.fontSize, ...overrides.fontSize },
    spacing: { ...base.spacing, ...overrides.spacing },
    layout: { ...base.layout, ...overrides.layout }
  };
}

/**
 * Register a custom theme
 * @param {object} theme - Theme configuration with 'name' property
 */
export function registerTheme(theme) {
  if (!theme.name) {
    throw new Error('Theme must have a name property');
  }
  themes[theme.name] = theme;
}

export { cowork, minimal };
export default { getTheme, extendTheme, registerTheme, cowork, minimal };
