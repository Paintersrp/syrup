import React from "react";
import PropTypes from "prop-types";
import {
  faBars,
  faPlus,
  faChevronDown,
  faChevronUp,
  faFilter,
  faTimes,
  faSave,
  faEdit,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import BaseIconButton from "../../../Base/BaseIconButton/BaseIconButton";

const getIconByType = (type) => {
  switch (type) {
    case "menu":
      return faBars;
    case "add":
      return faPlus;
    case "open":
      return faChevronDown;
    case "close":
      return faChevronUp;
    case "filter":
      return faFilter;
    case "cancel":
      return faTimes;
    case "save":
      return faSave;
    case "edit":
      return faEdit;
    case "delete":
      return faDeleteLeft;
    default:
      return faBars;
  }
};

const ActionButton = ({
  size,
  fontSize,
  color,
  shade,
  mt: marginTop,
  mb: marginBottom,
  pl: paddingLeft,
  pr: paddingRight,
  onClick,
  className,
  style,
  iconStyle,
  type,
}) => {
  const icon = getIconByType(type);
  return (
    <BaseIconButton
      size={size}
      fontSize={fontSize}
      color={color}
      shade={shade}
      mt={marginTop}
      mb={marginBottom}
      pl={paddingLeft}
      pr={paddingRight}
      onClick={onClick}
      className={className}
      style={style}
      icon={icon}
      iconStyle={iconStyle}
    />
  );
};

ActionButton.propTypes = {
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
  fontSize: PropTypes.string,
  color: PropTypes.oneOf(["primary", "secondary"]),
  shade: PropTypes.oneOf(["light", "dark", "main"]),
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string,
  iconStyle: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.oneOf([
    "menu",
    "add",
    "open",
    "close",
    "filter",
    "cancel",
    "save",
    "edit",
  ]),
};

ActionButton.defaultProps = {
  size: "md",
  fontSize: "1.15rem",
  color: "primary",
  shade: "main",
  marginTop: undefined,
  marginBottom: undefined,
  paddingLeft: undefined,
  paddingRight: undefined,
  onClick: () => {},
  className: undefined,
  style: undefined,
  iconStyle: undefined,
  type: "",
};

export default ActionButton;
