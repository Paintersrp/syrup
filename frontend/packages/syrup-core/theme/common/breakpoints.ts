/** @jsx jsx */
import { jsx } from '@emotion/react';

/**
 * Represents different breakpoints used for responsive design.
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Represents the values associated with each breakpoint.
 */
export type Breakpoints = { [key in Breakpoint]: number };

/**
 * Defines the specific values for each breakpoint.
 */
export const breakpoints: Breakpoints = {
  xs: 0,
  sm: 500,
  md: 650,
  lg: 900,
  xl: 1280,
  xxl: 1920,
};

/**
 * Represents media queries for each breakpoint based on the maximum width.
 */
export const mediaQueries = Object.entries(breakpoints).reduce((acc, [breakpoint, value]) => {
  acc[breakpoint as Breakpoint] = `@media (max-width: ${value}px)`;
  return acc;
}, {} as { [key in Breakpoint]: string });
