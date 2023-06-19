import React, { CSSProperties } from 'react';

import { classify } from './classify';
import { AlignmentValue, JustificationValue } from './types';

export interface BaseProps {
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

export const Base: React.FC<BaseProps> = ({
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
  style,
  className,
  ref,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
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
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  // console.log(classify(baseCssProps));

  return (
    <div
      className={className}
      css={classify(baseCssProps)}
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
    </div>
  );
};
