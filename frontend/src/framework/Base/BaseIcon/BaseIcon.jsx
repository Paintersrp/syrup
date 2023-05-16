import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colorSwitch } from "../../../utils/styleSwitches/styleSwitches";

const BaseIcon = ({
  fontSize,
  shade,
  color,
  mt: marginTop,
  mb: marginBottom,
  ml: marginLeft,
  pl: paddingLeft,
  pr: paddingRight,
  className,
  style,
  icon,
}) => {
  const [colors, setColors] = useState();

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
        fontSize: fontSize,
        marginLeft: marginLeft || 1,
        marginBottom: marginBottom || 0,
        marginTop: marginTop || 0,
        paddingLeft: paddingLeft || 0,
        paddingRight: paddingRight || 0,
        backgroundColor: "inherit",
        color: colors.background || "inherit",
      }}
    />
  );
};

BaseIcon.propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.oneOf(["primary", "secondary"]),
  shade: PropTypes.oneOf(["light", "dark", "main"]),
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.object.isRequired,
};

BaseIcon.defaultProps = {
  fontSize: "1.5rem",
  color: "primary",
  shade: "main",
  marginTop: undefined,
  marginBottom: undefined,
  paddingLeft: undefined,
  paddingRight: undefined,
  className: "",
  style: undefined,
  icon: null,
};

export default BaseIcon;
