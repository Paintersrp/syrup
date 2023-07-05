/** @jsx jsx */
import { jsx } from '@emotion/react';

import { ExtendedTheme } from '../types';

type ButtonStyle = (theme: ExtendedTheme) => {
  backgroundColor: string;
  color: string;
  border?: string;
  '&:hover'?: {
    color: string;
    backgroundColor: string;
  };
};

type ButtonPalette = {
  [key: string]: {
    outlined: ButtonStyle;
    standard: ButtonStyle;
  };
};

const createOutlinedStyle = (theme: ExtendedTheme, baseColor: string) => {
  const color = theme[baseColor as keyof ExtendedTheme] as string;

  return {
    backgroundColor: theme.light,
    color: color,
    border: `1px solid ${color}`,
    '&:hover': {
      color: theme.light,
      backgroundColor: color,
    },
  };
};

const createStandardStyle = (theme: ExtendedTheme, baseColor: string, shade: string) => {
  // add cap first to last shade
  const formattedShade = baseColor === 'light' || baseColor === 'dark' ? shade : shade;

  const background = theme[baseColor as keyof ExtendedTheme] as string;
  const hover = theme[`${baseColor}${formattedShade}` as keyof ExtendedTheme] as string;

  return {
    backgroundColor: background,
    color: theme.light,
    '&:hover': {
      color: theme.light,
      backgroundColor: hover,
    },
  };
};

const buttonConfigurations = [
  { color: 'primary', shade: 'dark' },
  { color: 'secondary', shade: 'dark' },
  { color: 'tertiary', shade: 'dark' },
  { color: 'quaternary', shade: 'dark' },
  { color: 'success', shade: 'light' },
  { color: 'error', shade: 'dark' },
  { color: 'info', shade: 'light' },
  { color: 'warning', shade: 'dark' },
  { color: 'slate', shade: 'dark' },
  { color: 'smoke', shade: 'dark' },
  { color: 'light', shade: 'er' },
  { color: 'dark', shade: 'er' },
];

export const buttonPalette: ButtonPalette | any = {};

buttonConfigurations.forEach(({ color, shade }) => {
  buttonPalette[color] = {
    outlined: (theme: ExtendedTheme) => createOutlinedStyle(theme, color),
    standard: (theme: ExtendedTheme) => createStandardStyle(theme, color, shade),
  };
});
