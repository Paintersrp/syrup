import React from "react";
import PropTypes from "prop-types";
import "../styles.css";

import { shadowSwitch } from "../../../../utils/styleSwitches/styleSwitches";

function Surface({
  children,
  maxWidth,
  boxShadow,
  mb: marginBottom,
  mt: marginTop,
  px: paddingX,
  py: paddingY,
  pl: paddingLeft,
  pr: paddingRight,
  pt: paddingTop,
  pb: paddingBottom,
  br: borderRadius,
  b: background,
  j: justifyChildren,
  a: alignChildren,
  fd: flexDirection,
  gutter,
  fillHeight,
  className,
}) {
  return (
    <div
      style={{
        width: maxWidth,
        display: "flex",
        justifyContent: justifyChildren,
        alignItems: alignChildren,
        flexDirection: flexDirection,
        flexGrow: fillHeight ? 1 : 0,
        margin: 0,
        paddingRight: paddingRight * 8,
        paddingTop: paddingTop * 8,
        paddingBottom: paddingBottom * 8,
        paddingLeft: paddingLeft * 8,
        marginBottom: gutter ? 16 : marginBottom ? marginBottom : 0,
        background: background,
      }}
    >
      <div
        className={className}
        style={{
          maxWidth: maxWidth,
          padding: `${paddingY * 8}px ${paddingX * 8}px`,
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
    </div>
  );
}

Surface.propTypes = {
  children: PropTypes.node,
  maxWidth: PropTypes.number,
  boxShadow: PropTypes.number,
  marginBottom: PropTypes.number,
  marginTop: PropTypes.number,
  paddingX: PropTypes.number,
  paddingY: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  borderRadius: PropTypes.node,
  background: PropTypes.string,
  justifyChildren: PropTypes.string,
  alignChildren: PropTypes.string,
  flexDirection: PropTypes.string,
  gutter: PropTypes.bool,
  fillHeight: PropTypes.bool,
  className: PropTypes.string,
};

Surface.defaultProps = {
  children: null,
  maxWidth: undefined,
  boxShadow: 0,
  marginBottom: 3,
  marginTop: 3,
  paddingX: 3,
  paddingY: 3,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  borderRadius: 1,
  background: "#F5F5F5",
  justifyChildren: "flex-start",
  alignChildren: "flex-start",
  flexDirection: "column",
  gutter: false,
  fillHeight: false,
  className: undefined,
};

export default Surface;
