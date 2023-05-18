import React, { FC, useEffect, useState, CSSProperties } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { colorSwitch } from "../../../utils/styleSwitches/styleSwitches";

interface IconProps {
  fontSize?: string;
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
  fontSize = "1.5rem",
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
      fontSize={fontSize}
      icon={icon}
      style={{
        ...style,
        fontSize,
        marginLeft: marginLeft || 0,
        marginRight: marginRight || 0,
        marginBottom: marginBottom || 0,
        marginTop: marginTop || 0,
        paddingLeft: paddingLeft || 0,
        paddingRight: paddingRight || 0,
        color: colors.background || "inherit",
      }}
    />
  );
};

export default Icon;
