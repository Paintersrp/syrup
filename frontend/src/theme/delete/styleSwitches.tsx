import { colors } from '../common';

export type ColorShade = 'light' | 'main' | 'dark';
export type ColorState = {
  hover: string;
  background: string;
};

export const colorSwitch = (
  color: string,
  shade: ColorShade
): { background: string; hover: string } => {
  if (color.startsWith('rgb') || color.startsWith('#')) {
    return {
      background: color,
      hover: color,
    };
  }

  if (colors[color]) {
    const selectedShade = colors[color][shade] || colors[color].main;
    const hoverShade =
      shade === 'dark' || shade === 'light' ? colors[color].main : colors[color].light;
    return {
      background: selectedShade,
      hover: hoverShade,
    };
  }

  return {
    background: '#000000',
    hover: '#000000',
  };
};
