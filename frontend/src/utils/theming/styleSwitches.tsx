import { palettes } from './theme';

export function mapSwitch<T>(value: T, map: Record<string, T>): T {
  return map[value as unknown as string] || value;
}

export const shadowMap: any = {
  1: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  2: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  3: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
  4: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  5: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
  6: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
  7: '0px 4px 5px -2px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 16px 1px rgba(0,0,0,0.12)',
  8: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
  9: '0px 5px 6px -3px rgba(0,0,0,0.2), 0px 9px 12px 1px rgba(0,0,0,0.14), 0px 3px 16px 2px rgba(0,0,0,0.12)',
};

export const shadowSwitch = (value: any): string => {
  return shadowMap[value] || 'none';
};

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

  if (palettes[color]) {
    const selectedShade = palettes[color][shade] || palettes[color].main;
    const hoverShade =
      shade === 'dark' || shade === 'light' ? palettes[color].main : palettes[color].light;
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
