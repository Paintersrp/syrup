import React, { ReactNode, CSSProperties } from "react";
import "../styles.css";

import { shadowSwitch } from "../../../utils/styleSwitches/styleSwitches";
import { justificationSwitch, JustificationValue } from "../Flexer/Flexer";

type SurfaceProps = {
  children?: ReactNode;
  maxWidth?: number | string;
  minHeight?: number;
  boxShadow?: number;
  mb?: number;
  mt?: number;
  px?: number;
  py?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
  br?: number;
  b?: string;
  j?: JustificationValue | string;
  a?: JustificationValue | string;
  fd?: CSSProperties["flexDirection"];
  gutter?: boolean;
  fillHeight?: boolean;
  style?: object;
  className?: string;
};

function Surface({
  children,
  maxWidth,
  minHeight,
  boxShadow = 0,
  mb: marginBottom = 0,
  mt: marginTop = 0,
  px: paddingX = 3,
  py: paddingY = 3,
  pl: paddingLeft = 0,
  pr: paddingRight = 0,
  pt: paddingTop = 0,
  pb: paddingBottom = 0,
  br: borderRadius = 1,
  b: background = "#F5F5F5",
  j: justifyChildren = "flex-start",
  a: alignChildren = "flex-start",
  fd: flexDirection = "column",
  gutter = false,
  fillHeight = false,
  style,
  className,
}: SurfaceProps) {
  const containerStyle: CSSProperties = {
    width: "100%",
    minHeight: minHeight,
    display: "flex",
    justifyContent: justificationSwitch(justifyChildren),
    alignItems: justificationSwitch(alignChildren),
    flexDirection: flexDirection,
    flexGrow: fillHeight ? 1 : 0,
    margin: 0,
    paddingRight: paddingRight * 8,
    paddingTop: paddingTop * 8,
    paddingBottom: paddingBottom * 8,
    paddingLeft: paddingLeft * 8,
    marginBottom: gutter ? 16 : marginBottom,
    background: background,
    ...style,
  };

  const contentStyle: CSSProperties = {
    maxWidth: maxWidth,
    minHeight: minHeight,
    padding: `${paddingY * 8}px ${paddingX * 8}px`,
    boxShadow: shadowSwitch(boxShadow),
    borderRadius: borderRadius * 8,
    background: background,
    marginBottom: marginBottom * 8,
    marginTop: marginTop * 8,
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <div className={className} style={contentStyle}>
        {children}
      </div>
    </div>
  );
}
export default Surface;
