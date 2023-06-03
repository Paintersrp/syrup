import React, { CSSProperties, ReactNode } from "react";
import Text from "../Text/Text";
import "./Option.css";

export interface OptionProps {
  children?: ReactNode;
  value?: string | number;
  isSelected?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  textStyle?: CSSProperties;
  dense?: boolean;
  disabled?: boolean;
}

const Option: React.FC<OptionProps> = ({
  children,
  value,
  isSelected,
  onClick,
  style,
  textStyle = { paddingLeft: 4 },
  dense,
  disabled = false,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`${dense ? "option-dense" : "option"} ${
        isSelected ? "selected" : ""
      } ${disabled ? "option-disabled" : ""}`}
      onClick={handleClick}
      style={style}
    >
      <Text style={textStyle}>{children}</Text>
    </div>
  );
};

export default Option;
