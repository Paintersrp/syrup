import { darken, lighten } from 'polished';

import { genColorSet } from '@/theme/utils';
import { GenericMapping } from '@/types';

export type Colors = GenericMapping & {
  dark: string;
  darkLight: string;
  darker: string;

  light: string;
  lighter: string;
  lightDark: string;

  transparent: string;
  accent: string;
  yellow: string;
  textHighlight: string;

  minVisible: string;
  disabled: string;
  drawerLight: string;

  grey: string;
  charcoal: string;

  backgroundLight: string;
  backgroundDark: string;
};

export const colors: Colors = {
  ...genColorSet('primary', '#2e3b55', 0.1, 0.1),
  ...genColorSet('secondary', '#ff8c00', 0.2, 0.05),
  ...genColorSet('tertiary', '#9E5CF7', 0.2, 0.05),
  ...genColorSet('quaternary', '#3ad984', 0.2, 0.2),
  ...genColorSet('error', '#f44336', 0.05, 0.15),
  ...genColorSet('warning', '#f08a24', 0.1, 0.1),
  ...genColorSet('success', '#4caf50', 0.1, 0.1),
  ...genColorSet('info', '#1976d2', 0.2, 0.15),
  ...genColorSet('slate', '#444f60', 0.1, 0.1),
  ...genColorSet('smoke', '#dbe5ef', 0.05, 0.1),

  dark: '#222',
  darkLight: lighten(0.1, '#222'),
  darker: '#000',

  light: '#f5f5f5',
  lighter: '#fff',
  lightDark: darken(0.05, '#f5f5f5'),

  transparent: 'transparent',
  accent: '#0366d6',
  yellow: '#EDBA07',
  textHighlight: '#FDEA9B',

  minVisible: 'rgba(34, 34, 34, 0.1)',
  disabled: 'rgba(34, 34, 34, 0.38)',
  drawerLight: 'rgba(34, 34, 34, 0.40)',

  grey: 'rgba(0, 0, 0, 0.50)',
  charcoal: 'rgba(0, 0, 0, 0.75)',

  backgroundLight: '#f5f5f5',
  backgroundDark: '#333333',
};
