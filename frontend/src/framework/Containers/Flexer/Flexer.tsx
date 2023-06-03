import React, { ReactNode, CSSProperties } from "react";

export type JustificationValue =
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
  | "space-between";

interface JustificationMap {
  [key: string]: CSSProperties["justifyContent"];
}

const justificationMap: JustificationMap = {
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
};

export function justificationSwitch(
  value: JustificationValue | string
): CSSProperties["justifyContent"] | string {
  return justificationMap[value] || "flex-start";
}

interface FlexerProps {
  mt?: CSSProperties["marginTop"];
  mb?: CSSProperties["marginBottom"];
  pl?: CSSProperties["paddingLeft"];
  pr?: CSSProperties["paddingRight"];
  j?: JustificationValue | string;
  a?: JustificationValue | string;
  fd?: CSSProperties["flexDirection"];
  w?: number | string;
  grow?: boolean;
  wrap?: boolean;
  gap?: CSSProperties["gap"];
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  noSpacing?: boolean;
  fade?: boolean;
}

const Flexer: React.FC<FlexerProps> = ({
  mt: marginTop,
  mb: marginBottom,
  pl: paddingLeft,
  pr: paddingRight,
  j: justifyContent = "flex-start",
  a: alignItems = "center",
  fd: flexDirection = "row",
  w: width = "100%",
  grow = false,
  wrap = false,
  gap,
  children,
  style,
  className,
  fade = false,
}) => {
  return (
    <div
      className={`${className} ${fade ? "fade-in" : ""}`}
      style={{
        ...style,
        width: width,
        marginBottom: marginBottom && marginBottom,
        marginTop: marginTop && marginTop,
        paddingLeft: paddingLeft && paddingLeft,
        paddingRight: paddingRight && paddingRight,
        display: "flex",
        flexDirection: flexDirection,
        justifyContent: justificationSwitch(justifyContent),
        alignItems: justificationSwitch(alignItems),
        flexGrow: grow ? 1 : 0,
        flexWrap: wrap ? "wrap" : undefined,
        gap: gap,
      }}
    >
      {children}
    </div>
  );
};

export default Flexer;
