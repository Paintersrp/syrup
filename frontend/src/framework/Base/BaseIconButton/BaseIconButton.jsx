import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";
import { colorSwitch } from "../../../utils/styleSwitches/styleSwitches";

const sizeSwitch = (size) => {
  switch (size) {
    case "t":
    case "tiny":
      return 24;
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

const BaseIconButton = ({
  size,
  fontSize,
  shade,
  color,
  manualHoverColor,
  invertColors,
  mt: marginTop,
  mb: marginBottom,
  pl: paddingLeft,
  pr: paddingRight,
  onClick,
  className,
  style,
  iconStyle,
  icon,
}) => {
  const [sizeValue, setSizeValue] = useState();
  const [hover, setHover] = useState(false);
  const [colors, setColors] = useState();

  useEffect(() => {
    setSizeValue(sizeSwitch(size));
  }, [size]);

  useEffect(() => {
    setColors(colorSwitch(color, shade));
  }, [color, shade]);

  if (!colors) {
    return null;
  }

  return (
    <button
      className={clsx("collapse-button", className)}
      onClick={onClick}
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
          : null,
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{ ...iconStyle, fontSize: fontSize, marginLeft: 1 }}
      />
    </button>
  );
};

BaseIconButton.propTypes = {
  size: PropTypes.oneOf([
    "t",
    "tiny",
    "sm",
    "small",
    "md",
    "medium",
    "lg",
    "large",
  ]),
  color: PropTypes.oneOf(["primary", "secondary"]),
  manualHoverColor: PropTypes.string,
  invertColors: PropTypes.bool,
  shade: PropTypes.oneOf(["light", "dark", "main"]),
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  iconStyle: PropTypes.object,
  icon: PropTypes.object.isRequired,
  fontSize: PropTypes.string,
};

BaseIconButton.defaultProps = {
  size: "lg",
  color: "primary",
  manualHoverColor: null,
  invertColors: false,
  shade: "main",
  marginTop: undefined,
  marginBottom: undefined,
  paddingLeft: undefined,
  paddingRight: undefined,
  onClick: () => {},
  className: undefined,
  style: undefined,
  iconStyle: undefined,
  fontSize: "1rem",
};

export default BaseIconButton;
