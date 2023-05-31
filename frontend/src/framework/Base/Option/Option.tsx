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
}

const Option: React.FC<OptionProps> = ({
  children,
  value, // do not remove
  isSelected,
  onClick,
  style,
  textStyle = { paddingLeft: 4 },
  dense,
}) => {
  return (
    <div
      className={`${dense ? "option-dense" : "option"} ${
        isSelected ? "selected" : ""
      }`}
      onClick={onClick}
      style={style}
    >
      <Text style={textStyle}>{children}</Text>
    </div>
  );
};

export default Option;
