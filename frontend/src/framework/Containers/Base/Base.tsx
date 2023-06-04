import React, { CSSProperties, ReactNode } from "react";

export const justifyContentMap: {
  [key: string]: CSSProperties["justifyContent"];
} = {
  l: "flex-start",
  fs: "flex-start",
  start: "flex-start",
  "flex-start": "flex-start",
  r: "flex-end",
  fe: "flex-end",
  right: "flex-end",
  "flex-end": "flex-end",
  c: "center",
  center: "center",
  sb: "space-between",
  "space-between": "space-between",
  sa: "space-around",
  "space-around": "space-around",
  se: "space-evenly",
  "space-evenly": "space-evenly",
};

export const alignItemsMap: {
  [key: string]: CSSProperties["alignItems"];
} = {
  t: "flex-start",
  top: "flex-start",
  fs: "flex-start",
  start: "flex-start",
  "flex-start": "flex-start",
  b: "flex-end",
  bottom: "flex-end",
  fe: "flex-end",
  end: "flex-end",
  "flex-end": "flex-end",
  c: "center",
  center: "center",
  base: "baseline",
  baseline: "baseline",
  s: "stretch",
  stretch: "stretch",
};

export type JustifyContentValue =
  | "l"
  | "fs"
  | "start"
  | "flex-start"
  | "r"
  | "fe"
  | "right"
  | "flex-end"
  | "c"
  | "center"
  | "sb"
  | "space-between"
  | "sa"
  | "space-around"
  | "se"
  | "space-evenly";

export type AlignItemValue =
  | "t"
  | "top"
  | "fs"
  | "start"
  | "flex-start"
  | "b"
  | "bottom"
  | "fe"
  | "end"
  | "flex-end"
  | "c"
  | "center"
  | "base"
  | "baseline"
  | "s"
  | "stretch";

export interface BaseProps {
  children?: ReactNode;
  m?: CSSProperties["margin"];
  mt?: CSSProperties["marginTop"];
  mb?: CSSProperties["marginBottom"];
  ml?: CSSProperties["marginLeft"];
  mr?: CSSProperties["marginRight"];
  p?: CSSProperties["padding"];
  pt?: CSSProperties["paddingTop"];
  pb?: CSSProperties["paddingBottom"];
  pl?: CSSProperties["paddingLeft"];
  pr?: CSSProperties["paddingRight"];
  w?: CSSProperties["width"];
  minw?: CSSProperties["minWidth"];
  maxw?: CSSProperties["maxWidth"];
  h?: CSSProperties["height"];
  minh?: CSSProperties["minHeight"];
  maxh?: CSSProperties["maxHeight"];
  c?: CSSProperties["color"];
  bg?: CSSProperties["backgroundColor"];
  br?: CSSProperties["borderRadius"];
  fs?: CSSProperties["fontSize"];
  fw?: CSSProperties["fontWeight"];
  ta?: CSSProperties["textAlign"];
  td?: CSSProperties["textDecoration"];
  d?: CSSProperties["display"];
  fd?: CSSProperties["flexDirection"];
  j?: JustifyContentValue | string;
  a?: AlignItemValue | string;
  gap?: CSSProperties["gap"];
  z?: CSSProperties["zIndex"];
  o?: CSSProperties["opacity"];
  bs?: CSSProperties["boxShadow"];
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

const Base: React.FC<BaseProps> = ({
  children,
  m: margin,
  mt: marginTop,
  mb: marginBottom,
  ml: marginLeft,
  mr: marginRight,
  p: padding,
  pt: paddingTop,
  pb: paddingBottom,
  pl: paddingLeft,
  pr: paddingRight,
  w: width,
  minw: minWidth,
  maxw: maxWidth,
  h: height,
  minh: minHeight,
  maxh: maxHeight,
  c: color,
  bg: backgroundColor,
  br: borderRadius,
  fs: fontSize,
  fw: fontWeight,
  ta: textAlign,
  td: textDecoration,
  d: display,
  fd: flexDirection,
  j: justifyContent,
  a: alignItems,
  gap,
  z: zIndex,
  o: opacity,
  bs: boxShadow,
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
  const baseStyle: CSSProperties = {
    margin: margin,
    marginTop: marginTop,
    marginBottom: marginBottom,
    marginLeft: marginLeft,
    marginRight: marginRight,
    padding: padding,
    paddingTop: paddingTop,
    paddingBottom: paddingBottom,
    paddingLeft: paddingLeft,
    paddingRight: paddingRight,
    width: width,
    minWidth: minWidth,
    maxWidth: maxWidth,
    height: height,
    minHeight: minHeight,
    maxHeight: maxHeight,
    color: color,
    backgroundColor: backgroundColor,
    borderRadius: borderRadius,
    fontSize: fontSize,
    fontWeight: fontWeight,
    textAlign: textAlign,
    textDecoration: textDecoration,
    display: display,
    flexDirection: flexDirection,
    justifyContent: justifyContent && justifyContentMap[justifyContent],
    alignItems: alignItems && alignItemsMap[alignItems],
    gap: gap,
    zIndex: zIndex,
    opacity: opacity,
    boxShadow: boxShadow,
    ...style,
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  return (
    <div
      className={className}
      style={baseStyle}
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

export default Base;
