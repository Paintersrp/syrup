import React, { useEffect, useState, CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import "./Button.css";

import {
  ColorShade,
  ColorState,
  colorSwitch,
} from "../../../utils/styleSwitches/styleSwitches";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";

type ButtonType = "button" | "submit" | "reset" | undefined;
type ButtonSize =
  | "t"
  | "tiny"
  | "sm"
  | "small"
  | "md"
  | "medium"
  | "lg"
  | "large";

interface ButtonProps {
  size?: ButtonSize;
  color?: string;
  shade?: ColorShade;
  type?: ButtonType;
  children: ReactNode;
  onClick?: () => void;
  className?: string | undefined;
  style?: CSSProperties;
  disabled?: boolean;
}

const sizeSwitch = (size: ButtonSize): string => {
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

const Button: React.FC<ButtonProps> = ({
  size = "sm",
  color = "primary",
  shade = "main",
  type = undefined,
  children,
  onClick,
  className = undefined,
  style,
  disabled = false,
}) => {
  const [colors, setColors] = useState<ColorState>(colorSwitch(color, shade));
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    setColors(colorSwitch(color, shade));
  }, [color, shade]);

  return (
    <button
      className={clsx("button-base", className, disabled ? "disabled" : "")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      type={type}
      disabled={disabled}
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

export default Button;
