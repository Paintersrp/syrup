import { useTheme } from '@emotion/react';

export const inject = (styles: any) => {
  const theme: any = useTheme();
  return styles(theme);
};
