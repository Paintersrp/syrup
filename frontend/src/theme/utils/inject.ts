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
