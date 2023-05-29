import React, { useEffect, useState, CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import "./Button.css";

import {
  ColorShade,
  ColorState,
  colorSwitch,
} from "../../../utils/switches/styleSwitches";
import MaterialIcon from "../Icon/MaterialIcon";

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
  ref?: React.LegacyRef<HTMLButtonElement> | null;
  size?: ButtonSize;
  color?: string;
  shade?: ColorShade;
  type?: ButtonType;
  children: ReactNode;
  onClick?: (event: any) => void;
  className?: string | undefined;
  style?: CSSProperties;
  disabled?: boolean;
  startIcon?: string;
  endIcon?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaHasPopup?: "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined;
  ariaControls?: string;
  ariaPressed?: boolean | "mixed";
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
  ref,
  size = "sm",
  color = "primary",
  shade = "main",
  type = undefined,
  children,
  onClick,
  className = undefined,
  style,
  disabled = false,
  startIcon,
  endIcon,
  ariaLabel,
  ariaDescribedBy,
  ariaExpanded,
  ariaHasPopup,
  ariaControls,
  ariaPressed,
}) => {
  const [colors, setColors] = useState<ColorState>(colorSwitch(color, shade));
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    setColors(colorSwitch(color, shade));
  }, [color, shade]);

  return (
    <button
      ref={ref}
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
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHasPopup}
      aria-controls={ariaControls}
      aria-pressed={ariaPressed}
    >
      {startIcon && (
        <MaterialIcon icon={startIcon} size="18px" mr={6} color="#f5f5f5" />
      )}
      {children}
      {endIcon && (
        <MaterialIcon icon={endIcon} size="18px" ml={6} color="#f5f5f5" />
      )}
    </button>
  );
};

export default Button;
