import { Theme, useTheme } from '@emotion/react';
import { CSSProperties } from 'react';
import { ExtendedTheme } from '../types';
import { makeCss } from './makeCss';

// Generic options consistent with theme implementation
export type GenericSize = 'tiny' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SizeOptions = Partial<Record<GenericSize, any>>;

export type GenericVariant = 'outlined' | 'standard' | 'hover' | 'float';
export type VariantOptions = Partial<Record<GenericVariant, any>>;

export type GenericPalette =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'neutral'
  | 'error'
  | 'success'
  | 'info'
  | 'warning'
  | 'slate'
  | 'smoke'
  | 'light'
  | 'dark';

export interface StyleProps {
  // Reusable Generic Properties, which can be used for mapping a set of properties
  size?: GenericSize;
  variant?: GenericVariant;
  palette?: GenericPalette;

  // Direct CSS Properties
  w?: CSSProperties['width'];
  ml?: CSSProperties['marginLeft'];
  mr?: CSSProperties['marginRight'];
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  br?: CSSProperties['borderRadius'];

  // Common Boolean Checks
  disabled?: boolean;
  hasIcon?: boolean;

  // ...
  theme?: Theme;
}

export const defaultStyles: StyleProps = {
  size: 'md',
  variant: 'standard',
  palette: 'primary',
  w: undefined,
  ml: undefined,
  mr: undefined,
  mt: undefined,
  mb: undefined,
  br: undefined,
  disabled: false,
  hasIcon: false,
};

export const buildStyles = (props: StyleProps) => {
  const theme = useTheme() as ExtendedTheme;

  const styleProps = {
    ...defaultStyles,
    ...props,
  } as StyleProps;

  const baseCss = makeCss(styleProps);

  return { theme, styleProps, baseCss };
};
