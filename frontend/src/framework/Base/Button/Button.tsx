import React, { useEffect, useState, CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import "./Button.css";

import {
  ColorShade,
  ColorState,
  colorSwitch,
} from "../../../utils/theming/styleSwitches";
import MaterialIcon from "../Icon/MaterialIcon";
import { Flexer } from "../../Containers";
import Text from "../Text/Text";

type ButtonType = "button" | "submit" | "reset" | undefined;
export type ButtonSize =
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
  w?: CSSProperties["width"];
  ml?: CSSProperties["marginLeft"];
  mr?: CSSProperties["marginRight"];
  mt?: CSSProperties["marginTop"];
  mb?: CSSProperties["marginBottom"];
  color?: string;
  shade?: ColorShade;
  manualHover?: string;
  type?: ButtonType;
  children: ReactNode;
  onClick?: (event: any) => void;
  className?: string | undefined;
  style?: CSSProperties;
  disabled?: boolean;
  startIcon?: string;
  endIcon?: string;
  href?: string | undefined;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaHasPopup?: "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined;
  ariaControls?: string;
  ariaPressed?: boolean | "mixed";
  iconSize?: CSSProperties["fontSize"];
  textSize?: CSSProperties["fontSize"];
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
  w: width = "auto",
  ml: marginLeft,
  mr: marginRight,
  mt: marginTop,
  mb: marginBottom,
  color = "primary",
  shade = "main",
  manualHover,
  type = undefined,
  children,
  onClick,
  className = undefined,
  style,
  disabled = false,
  startIcon,
  endIcon,
  href,
  ariaLabel,
  ariaDescribedBy,
  ariaExpanded,
  ariaHasPopup,
  ariaControls,
  ariaPressed,
  iconSize = "18px",
  textSize = "0.85rem",
}) => {
  const [colors, setColors] = useState<ColorState>(colorSwitch(color, shade));
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    setColors(colorSwitch(color, shade));
  }, [color, shade]);

  const handleHref = () => {
    if (href) {
      window.location.href = href;
    }
  };

  return (
    <button
      ref={ref}
      className={clsx("button-base", className, disabled ? "disabled" : "")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={href ? handleHref : onClick}
      type={type}
      disabled={disabled}
      style={{
        ...style,
        width: width,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
        marginBottom: marginBottom,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: sizeSwitch(size),
        backgroundColor: hover
          ? manualHover
            ? manualHover
            : colors.hover
          : colors.background,
      }}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHasPopup}
      aria-controls={ariaControls}
      aria-pressed={ariaPressed}
    >
      <Flexer a="c" j="c">
        {startIcon && (
          <MaterialIcon
            icon={startIcon}
            size={iconSize}
            mr={2}
            ml={2}
            color="#f5f5f5"
          />
        )}
        <Text a="c" t="button" fw="600" s={textSize}>
          {children}
        </Text>
        {endIcon && (
          <MaterialIcon icon={endIcon} size={iconSize} ml={6} color="#f5f5f5" />
        )}
      </Flexer>
    </button>
  );
};

export default Button;
