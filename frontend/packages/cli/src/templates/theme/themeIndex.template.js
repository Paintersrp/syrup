/**
 * @description
 * Returns the template for generating an index file in the theme directory.
 *
 * @returns {string} - The index template.
 */
export const ThemeIndexTemplate = () =>
  `
export { keyframes as keyframeCx, animations } from './animations';
export type { AnimationKeyframe, AnimationStyleKey, AnimationStyles } from './animations';

export { breakpoints } from './breakpoints';
export type { Breakpoint, Breakpoints } from './breakpoints';

export { colors } from './colors';
export type { Colors } from './colors';

export { shadows } from './shadows'; 
`;
