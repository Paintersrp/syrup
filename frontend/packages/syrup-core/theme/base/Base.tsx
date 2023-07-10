/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { CSSProperties, ElementType, forwardRef } from 'react';

import { makeCss } from './makeCss';
import { AlignmentValue, JustificationValue } from './types';

export interface BaseProps {
  as?: ElementType;
  children?: any;
  m?: CSSProperties['margin'];
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  ml?: CSSProperties['marginLeft'];
  mr?: CSSProperties['marginRight'];
  p?: CSSProperties['padding'];
  pt?: CSSProperties['paddingTop'];
  pb?: CSSProperties['paddingBottom'];
  pl?: CSSProperties['paddingLeft'];
  pr?: CSSProperties['paddingRight'];
  w?: CSSProperties['width'];
  minw?: CSSProperties['minWidth'];
  maxw?: CSSProperties['maxWidth'];
  h?: CSSProperties['height'];
  minh?: CSSProperties['minHeight'];
  maxh?: CSSProperties['maxHeight'];
  c?: CSSProperties['color'];
  bg?: CSSProperties['backgroundColor'];
  br?: CSSProperties['borderRadius'];
  fs?: CSSProperties['fontSize'];
  fw?: CSSProperties['fontWeight'];
  ta?: CSSProperties['textAlign'];
  d?: CSSProperties['display'];
  fd?: CSSProperties['flexDirection'];
  j?: JustificationValue | string;
  a?: AlignmentValue | string;
  gap?: CSSProperties['gap'];
  z?: CSSProperties['zIndex'];
  o?: CSSProperties['opacity'];
  bs?: number | undefined;
  cur?: CSSProperties['cursor'];
  style?: CSSProperties;
  className?: string;
  ref?: any;
  onClick?: any;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

export const Base = forwardRef<HTMLElement, BaseProps>(
  (
    {
      as: Component = 'div',
      children,
      m,
      mt,
      mb,
      ml,
      mr,
      p,
      pt,
      pb,
      pl,
      pr,
      w,
      minw,
      maxw,
      h,
      minh,
      maxh,
      c,
      bg,
      br,
      fs,
      fw,
      ta,
      d,
      fd,
      j,
      a,
      gap,
      z,
      o,
      bs,
      cur,
      style,
      className,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeyDown,
    },
    ref
  ) => {
    const baseCssProps = {
      m,
      mt,
      mb,
      ml,
      mr,
      p,
      pt,
      pb,
      pl,
      pr,
      w,
      minw,
      maxw,
      h,
      minh,
      maxh,
      c,
      bg,
      br,
      fs,
      fw,
      ta,
      d,
      fd,
      j,
      a,
      gap,
      z,
      o,
      bs,
      cur,
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (onKeyDown) {
        onKeyDown(event);
      }
    };

    return (
      <Component
        className={className}
        css={makeCss(baseCssProps)}
        style={style}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);
