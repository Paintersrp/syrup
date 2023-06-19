import { ExtendedTheme } from '../types';

type IconStyle = (theme: ExtendedTheme) => {
  color: string;
  hover: string;
};

type IconPalette = {
  [key: string]: {
    outlined: IconStyle;
    standard: IconStyle;
  };
};

const createOutlinedStyle = (theme: ExtendedTheme, baseColor: string) => {
  const color = theme[baseColor as keyof ExtendedTheme] as string;

  return {
    color,
    hover: theme.light,
  };
};

const createStandardStyle = (theme: ExtendedTheme) => {
  return {
    color: theme.light,
    hover: theme.light,
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
  'light',
  'dark',
];

export const iconPalette: IconPalette = {};

iconConfigurations.forEach((color) => {
  iconPalette[color] = {
    outlined: (theme: ExtendedTheme) => createOutlinedStyle(theme, color),
    standard: (theme: ExtendedTheme) => createStandardStyle(theme),
  };
});
