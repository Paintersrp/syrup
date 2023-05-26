import React, { FC, useEffect, useState, CSSProperties } from "react";
import { colorSwitch } from "../../../utils/switches/styleSwitches";

interface MaterialIconProps {
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
  icon: string;
}

const MaterialIcon: FC<MaterialIconProps> = ({
  size = "24px",
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
    <span
      className={`material-icons ${className}`}
      style={{
        ...style,
        marginLeft: marginLeft && marginLeft,
        marginRight: marginRight && marginRight,
        marginBottom: marginBottom && marginBottom,
        marginTop: marginTop && marginTop,
        paddingLeft: paddingLeft && paddingLeft,
        paddingRight: paddingRight && paddingRight,
        color: colors.background || "inherit",
        fontSize: size,
      }}
    >
      {icon}
    </span>
  );
};

export default MaterialIcon;
