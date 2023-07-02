/**
 * @description
 * Returns the template for generating a useTheme and inject function file in the theme directory.
 *
 * @returns {string} - The useTheme and inject function template.
 */
export const ThemeInjectFnTemplate = () =>
  `
  import { useTheme as useEmotionTheme } from '@emotion/react';
  import { ExtendedTheme } from '../types';
  
  export const useTheme = (): ExtendedTheme => {
    const theme = useEmotionTheme();
    return theme as ExtendedTheme;
  };
  
  export const inject = (styles: any) => {
    const theme = useTheme();
    return styles(theme);
  };  
`;
