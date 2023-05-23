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
  mt?: number;
  mb?: number;
  pl?: number;
  j?: JustificationValue | string;
  a?: JustificationValue | string;
  fd?: CSSProperties["flexDirection"];
  w?: number | string;
  grow?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const Flexer: React.FC<FlexerProps> = ({
  mt: marginTop,
  mb: marginBottom,
  pl: paddingLeft,
  j: justifyContent = "flex-start",
  a: alignItems = "center",
  fd: flexDirection = "row",
  w: width = "100%",
  grow = false,
  children,
  style,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        width: width,
        marginBottom: marginBottom || 0,
        marginTop: marginTop || 0,
        paddingLeft: paddingLeft || 0,
        display: "flex",
        flexDirection: flexDirection,
        justifyContent: justificationSwitch(justifyContent),
        alignItems: justificationSwitch(alignItems),
        flexGrow: grow ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

export default Flexer;
