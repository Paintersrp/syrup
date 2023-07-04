import { darken, lighten } from 'polished';

// Generates a set of color classes based on the passed in name / color / change values
// Creates a light, dark, and regular class for the passed in color.
// The lightenValue is used with lighten to control how much to lighten
// The darkenValue is used with darken to control how much to darken
export type GeneratedThemeColors = {
  [key: string]: string;
};

export type GenColorSetFn = (
  baseName: string,
  baseColor: string,
  lightenValue: number,
  darkenValue: number
) => GeneratedThemeColors;

export const genColorSet: GenColorSetFn = (baseName, baseColor, lightenValue, darkenValue) => {
  const lightName = `${baseName}Light`;
  const darkName = `${baseName}Dark`;

  const colorSet: GeneratedThemeColors = {
    [baseName]: baseColor,
    [lightName]: lighten(lightenValue, baseColor),
    [darkName]: darken(darkenValue, baseColor),
  };

  return colorSet;
};
