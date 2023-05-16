import React, { useEffect, useState } from "react";
import clsx from "clsx";
import "./BaseButton.css";

import { colorSwitch } from "../../../utils/styleSwitches/styleSwitches";

const sizeSwitch = (size) => {
  switch (size) {
    case "t":
    case "tiny":
      return "0.2rem";
    case "sm":
    case "small":
      return "0.35rem";
    case "md":
    case "medium":
      return "0.5rem";
    case "lg":
    case "large":
      return "0.75rem";
    default:
      return "0.35rem";
  }
};

const BaseButton = ({
  size = "sm",
  color = "primary",
  shade = "main",
  type = null,
  children,
  onClick,
  className = undefined,
  style,
}) => {
  const [colors, setColors] = useState(colorSwitch(color, shade));
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setColors(colorSwitch(color, shade));
  }, [color, shade]);

  return (
    <button
      className={clsx("button-base", className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      type={type}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: sizeSwitch(size),
        backgroundColor: hover ? colors.hover : colors.background,
      }}
    >
      {children}
    </button>
  );
};

export default BaseButton;
