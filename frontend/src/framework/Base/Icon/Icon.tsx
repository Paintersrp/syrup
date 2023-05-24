import React, { FC, useEffect, useState, CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { colorSwitch } from "../../../utils/switches/styleSwitches";

interface IconProps {
  size?: string;
  color?: string;
  shade?: "light" | "dark" | "main";
  mt?: CSSProperties["marginTop"];
  mb?: CSSProperties["marginBottom"];
  ml?: CSSProperties["marginLeft"];
  mr?: CSSProperties["marginRight"];
  paddingLeft?: number;
  paddingRight?: number;
  className?: string;
  style?: CSSProperties;
  icon: IconDefinition;
}

const Icon: FC<IconProps> = ({
  size = "1.5rem",
  color = "primary",
  shade = "main",
  mt: marginTop,
  mb: marginBottom,
  ml: marginLeft,
  mr: marginRight,
  paddingLeft,
  paddingRight,
  className = "",
  style,
  icon,
}) => {
  const [colors, setColors] = useState<{ background?: string }>(
    colorSwitch(color, shade)
  );

  useEffect(() => {
    setColors(colorSwitch(color, shade));
  }, [color, shade]);

  if (!colors) {
    return null;
  }

  return (
    <FontAwesomeIcon
      className={className}
      fontSize={size}
      icon={icon}
      style={{
        ...style,
        marginLeft: marginLeft && marginLeft,
        marginRight: marginRight && marginRight,
        marginBottom: marginBottom && marginBottom,
        marginTop: marginTop && marginTop,
        paddingLeft: paddingLeft && paddingLeft,
        paddingRight: paddingRight && paddingRight,
        color: colors.background || "inherit",
      }}
    />
  );
};

export default Icon;
