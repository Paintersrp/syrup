import React, { CSSProperties, ReactNode } from "react";
import "./Option.css";

import { Base, BaseProps } from "../../Containers";
import Text from "../Text/Text";

export interface OptionProps extends BaseProps {
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
  ...rest
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <Base
      className={`${dense ? "option-dense" : "option"} ${
        isSelected ? "selected" : ""
      } ${disabled ? "option-disabled" : ""}`}
      onClick={handleClick}
      style={style}
      {...rest}
    >
      <Text style={textStyle}>{children}</Text>
    </Base>
  );
};

export default Option;
