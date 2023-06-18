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
