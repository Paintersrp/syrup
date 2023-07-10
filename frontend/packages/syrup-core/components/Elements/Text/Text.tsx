/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { CSSProperties, ReactNode } from 'react';
import { css } from '@emotion/react';
import clsx from 'clsx';
import { ExtendedTheme } from '../../../theme/types';
import { GenericMapping } from '../../../types';
import { inject } from '../../../theme/utils';
import { colors } from '../../../theme/common';

const typeMapping: GenericMapping = {
  h1: {
    fontWeight: 600,
    fontSize: '2.25rem',
    lineHeight: 1.167,
    letterSpacing: '0.02em',
  },
  h2: {
    fontWeight: 600,
    fontSize: '2rem',
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.167,
    letterSpacing: '0em',
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.1rem',
    lineHeight: 1.334,
    letterSpacing: '0em',
  },
  h6: {
    fontWeight: 500,
    fontSize: '0.9rem',
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
  },
  subtitle1: {
    fontWeight: 500,
    fontSize: '0.95rem',
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  body1: {
    fontWeight: 500,
    fontSize: '1rem',
    lineHeight: 1.167,
    letterSpacing: '-0.00833em',
  },
  body2: {
    fontWeight: 500,
    fontSize: '0.95rem',
    lineHeight: 1.334,
    letterSpacing: '-0.00833em',
  },
  button: {
    fontWeight: 600,
    fontSize: '0.9rem',
    textTransform: 'uppercase',
  },
  caption: {
    fontWeight: 700,
    fontSize: '0.85rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontWeight: 600,
    fontSize: '0.85rem',
    lineHeight: 2.66,
    letterSpacing: '0.083333em',
    textTransform: 'uppercase',
  },
};

const styles = (theme: ExtendedTheme) => ({
  text: (type: string) =>
    css({
      ...typeMapping[type],
    }),
});

export type TextType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button'
  | 'overline';

export type AlignmentValue = 'l' | 'left' | 'r' | 'right' | 'c' | 'center';
export type TextAlign = 'left' | 'right' | 'center';

export interface TextProps {
  t?: TextType;
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  mr?: CSSProperties['marginRight'];
  ml?: CSSProperties['marginLeft'];
  pt?: CSSProperties['paddingTop'];
  pl?: CSSProperties['paddingLeft'];
  s?: CSSProperties['fontSize'];
  fw?: CSSProperties['fontWeight'];
  a?: AlignmentValue;
  w?: CSSProperties['width'];
  u?: boolean;
  uo?: CSSProperties['textUnderlineOffset'];
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  c?: CSSProperties['color'] | string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

const alignSwitch = (value: AlignmentValue): TextAlign | undefined => {
  const alignmentMap: Record<AlignmentValue, TextAlign> = {
    l: 'left',
    left: 'left',
    r: 'right',
    right: 'right',
    c: 'center',
    center: 'center',
  };

  return alignmentMap[value] || undefined;
};

const typeSwitch = (type: TextType): keyof JSX.IntrinsicElements => {
  switch (type) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'subtitle1':
    case 'subtitle2':
    case 'body1':
    case 'body2':
    case 'button':
    case 'overline':
      return 'p';
    default:
      return 'p';
  }
};

export const Text: React.FC<TextProps> = ({
  t: type = 'body1',
  mt: marginTop,
  mb: marginBottom,
  mr: marginRight,
  ml: marginLeft,
  pt: paddingTop,
  pl: paddingLeft,
  s: fontSize,
  fw: fontWeight,
  a: align = 'left',
  w: width = '100%',
  u: underline = false,
  uo: textUnderlineOffset = 4,
  children,
  className,
  style,
  c: color,
  dangerouslySetInnerHTML,
}) => {
  const css = inject(styles);

  let Component: keyof JSX.IntrinsicElements = typeSwitch(type);

  return (
    <Component
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
      css={css.text(type)}
      className={clsx(className)}
      style={{
        marginBottom: marginBottom && marginBottom,
        marginTop: marginTop && marginTop,
        marginRight: marginRight && marginRight,
        marginLeft: marginLeft && marginLeft,
        paddingTop: paddingTop && paddingTop,
        paddingLeft: paddingLeft && paddingLeft,
        fontSize: fontSize,
        fontWeight: fontWeight,
        textAlign: alignSwitch(align),
        width: width,
        color: color && colors[color],
        textDecoration: underline ? 'underline' : '',
        textUnderlineOffset: textUnderlineOffset,
        ...style,
      }}
    >
      {children}
    </Component>
  );
};
