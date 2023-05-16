import React from "react";
import "../styles.css";

import Flexer from "../../Flexer/Flexer";
import { shadowSwitch } from "../../../../utils/styleSwitches/styleSwitches";

function Surface({
  children,
  maxWidth,
  boxShadow = 0,
  mb: marginBottom = 3,
  mt: marginTop = 3,
  pad: padding = 3,
  pl: paddingLeft = 0,
  pr: paddingRight = 0,
  pt: paddingTop = 0,
  pb: paddingBottom = 0,
  br: borderRadius = 1,
  b: background = "#F5F5F5",
  j: justifyChildren = "flex-start",
  a: alignChildren = "flex-start",
  fd = "column",
  gutter = false,
  fillHeight = false,
  className,
}) {
  return (
    <Flexer
      j={justifyChildren}
      a={alignChildren}
      fd={fd}
      pl={paddingLeft * 8}
      style={{
        flexGrow: fillHeight ? 1 : 0,
        margin: 0,
        paddingRight: paddingRight * 8,
        paddingTop: paddingTop * 8,
        paddingBottom: paddingBottom * 8,
        marginBottom: gutter ? 16 : marginBottom ? marginBottom : 0,
        background: background,
      }}
    >
      <div
        className={className}
        style={{
          maxWidth: maxWidth,
          padding: padding * 8,
          boxShadow: shadowSwitch(boxShadow),
          borderRadius: borderRadius * 8,
          background: background,
          marginBottom: marginBottom * 8,
          marginTop: marginTop * 8,
          width: "100%",
        }}
      >
        {children}
      </div>
    </Flexer>
  );
}

export default Surface;
