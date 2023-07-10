/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import { ExtendedTheme } from '../types';

type IconBasicStyle = (theme: ExtendedTheme) => {
  color: string;
  backgroundColor: string;
};

type IconHoverStyle = IconBasicStyle & {
  '&:hover'?: {
    color: string;
    backgroundColor: string;
  };
};

type IconPalette = {
  [key: string]: {
    hover: IconBasicStyle;
    float: IconBasicStyle;
    standard: IconHoverStyle;
  };
};

const createHoverStyle = (theme: ExtendedTheme, baseColor: string) => {
  const color = theme[baseColor as keyof ExtendedTheme] as string;

  return {
    color,
    transition: 'background 0.3s ease',
    backgroundColor: 'transparent',
    '&:hover': {
      color: baseColor === 'light' ? theme.primary : theme.light,
      backgroundColor: color,
    },
  };
};
const createFloatStyle = (theme: ExtendedTheme, baseColor: string) => {
  const color = theme[baseColor as keyof ExtendedTheme] as string;

  return {
    color,
    backgroundColor: 'transparent',
  };
};

const createStandardStyle = (theme: ExtendedTheme, baseColor: string) => {
  const color = theme[baseColor as keyof ExtendedTheme] as string;

  return {
    color: theme.light,
    backgroundColor: color,
  };
};

const iconConfigurations = [
  'primary',
  'secondary',
  'tertiary',
  'quaternary',
  'success',
  'error',
  'info',
  'warning',
  'slate',
  'smoke',
  'light',
  'dark',
];

export const iconPalette: IconPalette = {};

iconConfigurations.forEach((color) => {
  iconPalette[color] = {
    hover: (theme: ExtendedTheme) => createHoverStyle(theme, color),
    float: (theme: ExtendedTheme) => createFloatStyle(theme, color),
    standard: (theme: ExtendedTheme) => createStandardStyle(theme, color),
  };
});
