import React, { useEffect, useState, MouseEvent, CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { colorSwitch } from "../../../utils/switches/styleSwitches";
import clsx from "clsx";
import "./IconButton.css";

type Shade = "light" | "dark" | "main";

export type Size =
  | "t"
  | "tiny"
  | "sm"
  | "small"
  | "md"
  | "medium"
  | "lg"
  | "large";

interface IconButtonProps {
  size?: Size;
  fontSize?: CSSProperties["fontSize"];
  shade?: Shade;
  color?: CSSProperties["color"];
  manualHoverColor?: CSSProperties["color"];
  invertColors?: boolean;
  mt?: CSSProperties["marginTop"];
  mb?: CSSProperties["marginBottom"];
  pl?: CSSProperties["paddingLeft"];
  pr?: CSSProperties["paddingRight"];
  href?: string | undefined;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
  iconStyle?: CSSProperties;
  icon: IconDefinition;
}

const sizeSwitch = (size: Size): number => {
  switch (size) {
    case "t":
    case "tiny":
      return 25.2;
    case "sm":
    case "small":
      return 32;
    case "md":
    case "medium":
      return 36;
    case "lg":
    case "large":
      return 40;
    default:
      return 36;
  }
};

const IconButton: React.FC<IconButtonProps> = ({
  size = "lg",
  fontSize = "1rem",
  shade = "main",
  color = "primary",
  manualHoverColor,
  invertColors = false,
  mt: marginTop,
  mb: marginBottom,
  pl: paddingLeft,
  pr: paddingRight,
  href,
  onClick = () => {},
  className,
  style,
  iconStyle,
  icon,
}) => {
  const [sizeValue, setSizeValue] = useState<number | undefined>();
  const [hover, setHover] = useState(false);
  const [colors, setColors] = useState<any>();

  useEffect(() => {
    setSizeValue(sizeSwitch(size));
  }, [size]);

  useEffect(() => {
    setColors(colorSwitch(color, shade));
  }, [color, shade]);

  const handleHref = () => {
    if (href) {
      window.location.href = href;
    }
  };

  if (!colors) {
    return null;
  }

  return (
    <button
      className={clsx("collapse-button", className)}
      onClick={href ? handleHref : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...style,
        width: sizeValue,
        height: sizeValue,
        marginBottom: marginBottom || 0,
        marginTop: marginTop || 0,
        paddingLeft: paddingLeft || 0,
        paddingRight: paddingRight || 0,
        backgroundColor: !invertColors
          ? hover
            ? manualHoverColor
              ? manualHoverColor
              : colors.hover
            : colors.background
          : "inherit",
        color: invertColors
          ? hover
            ? manualHoverColor
              ? manualHoverColor
              : colors.hover
            : "#fff"
          : undefined,
      }}
    >
      <FontAwesomeIcon icon={icon} style={{ ...iconStyle, fontSize }} />
    </button>
  );
};

export default IconButton;
