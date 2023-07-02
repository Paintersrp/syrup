/**
 * @description
 * Returns the template for generating theme breakpoints.
 *
 * @returns {string} - The theme breakpoints template.
 */
export const ThemeBreakpointsTemplate = () =>
  `
  export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type Breakpoints = { [key in Breakpoint]: number };

export const breakpoints: Breakpoints = {
  xs: 0,
  sm: 500,
  md: 650,
  lg: 900,
  xl: 1280,
  xxl: 1920,
};

export const mediaQueries = Object.entries(breakpoints).reduce((acc, [breakpoint, value]) => {
  acc[breakpoint as Breakpoint] = \`@media (max-width: \${value}px)\`;
  return acc;
}, {} as { [key in Breakpoint]: string });
`;
