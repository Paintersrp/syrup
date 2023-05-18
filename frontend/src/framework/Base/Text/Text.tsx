import React, { CSSProperties, ReactNode } from "react";

export type TextType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2";

export type AlignmentValue = "l" | "left" | "r" | "right" | "c" | "center";
export type TextAlign = "left" | "right" | "center";

interface TextProps {
  t?: TextType;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  pt?: number;
  pl?: number;
  s?: CSSProperties["fontSize"];
  fw?: CSSProperties["fontWeight"];
  a?: AlignmentValue;
  w?: CSSProperties["width"];
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  c?: string;
}

function alignSwitch(value: AlignmentValue): TextAlign | undefined {
  const alignmentMap: Record<AlignmentValue, TextAlign> = {
    l: "left",
    left: "left",
    r: "right",
    right: "right",
    c: "center",
    center: "center",
  };

  return alignmentMap[value] || undefined;
}

function typeSwitch(type: TextType): keyof JSX.IntrinsicElements {
  switch (type) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
    case "subtitle1":
    case "subtitle2":
    case "body1":
    case "body2":
      return "p";
    default:
      return "p";
  }
}
function Text({
  t: type = "body1",
  mt: marginTop,
  mb: marginBottom,
  mr: marginRight,
  ml: marginLeft,
  pt: paddingTop,
  pl: paddingLeft,
  s: fontSize,
  fw: fontWeight,
  a: align = "left",
  w: width = "100%",
  children,
  className,
  style,
  c: color = "primary",
}: TextProps) {
  let Component: keyof JSX.IntrinsicElements = typeSwitch(type);

  return (
    <Component
      className={`${type} ${className || ""} text-${color}`}
      style={{
        marginBottom: marginBottom || 0,
        marginTop: marginTop || 0,
        marginRight: marginRight || 0,
        marginLeft: marginLeft || 0,
        paddingTop: paddingTop || 0,
        paddingLeft: paddingLeft || 0,
        fontSize: fontSize,
        fontWeight: fontWeight,
        textAlign: alignSwitch(align),
        width: width,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}

export default Text;
