import React from "react";

function alignSwitch(value) {
  const alignmentMap = {
    l: "left",
    left: "left",
    r: "right",
    right: "right",
    c: "center",
    center: "center",
  };

  return alignmentMap[value] || null;
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
  a: align,
  w: width = "100%",
  children,
  className,
  style,
  c: color = "primary",
}) {
  let Component = "p";

  if (type === "h1") Component = "h1";
  if (type === "h2") Component = "h2";
  if (type === "h3") Component = "h3";
  if (type === "h4") Component = "h4";
  if (type === "h5") Component = "h5";
  if (type === "h6") Component = "h6";
  if (type === "subtitle1") Component = "p";
  if (type === "subtitle2") Component = "p";
  if (type === "body1") Component = "p";
  if (type === "body2") Component = "p";

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
