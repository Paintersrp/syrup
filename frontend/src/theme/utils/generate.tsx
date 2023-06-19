import { darken, lighten } from 'polished';

type GeneratedThemeColors = {
  [key: string]: string;
};

type GenerateColorSetFunction = (
  baseName: string,
  baseColor: string,
  lightenValue: number,
  darkenValue: number
) => GeneratedThemeColors;

export const generateColorSet: GenerateColorSetFunction = (
  baseName,
  baseColor,
  lightenValue,
  darkenValue
) => {
  const lightName = `${baseName}Light`;
  const darkName = `${baseName}Dark`;

  const colorSet: GeneratedThemeColors = {
    [baseName]: baseColor,
    [lightName]: lighten(lightenValue, baseColor),
    [darkName]: darken(darkenValue, baseColor),
  };

  return colorSet;
};
