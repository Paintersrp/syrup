import React, { FC, CSSProperties } from "react";
import {
  faBars,
  faPlus,
  faChevronDown,
  faChevronUp,
  faFilter,
  faTimes,
  faSave,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import IconButton from "../IconButton/IconButton";

interface ActionButtonProps {
  size?: "t" | "tiny" | "sm" | "small" | "md" | "medium" | "lg" | "large";
  fontSize?: string;
  color?: string;
  shade?: "light" | "dark" | "main";
  mt?: number;
  mb?: number;
  pl?: number;
  pr?: number;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
  iconStyle?: CSSProperties;
  type?:
    | "menu"
    | "add"
    | "open"
    | "close"
    | "filter"
    | "cancel"
    | "save"
    | "edit"
    | "delete";
}

const ActionButton: FC<ActionButtonProps> = ({
  size = "md",
  fontSize = "1.15rem",
  color = "primary",
  shade = "main",
  mt,
  mb,
  pl,
  pr,
  onClick = () => {},
  className,
  style,
  iconStyle,
  type = "menu",
}) => {
  const getIconByType = (type: ActionButtonProps["type"]): IconProp => {
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
        return faTrashAlt;
      default:
        return faBars;
    }
  };

  const icon = getIconByType(type);

  return (
    <IconButton
      size={size}
      fontSize={fontSize}
      color={color}
      shade={shade}
      mt={mt}
      mb={mb}
      pl={pl}
      pr={pr}
      onClick={onClick}
      className={className}
      style={style}
      icon={icon}
      iconStyle={iconStyle}
    />
  );
};

export default ActionButton;
