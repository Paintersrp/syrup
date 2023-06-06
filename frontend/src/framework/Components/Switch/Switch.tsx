import React, { useState } from "react";
import "./Switch.css";

import { Base, BaseProps } from "../../Containers";
import HelpText from "../HelpText/HelpText";

interface SwitchProps extends BaseProps {
  name: string;
  label: string;
  value: boolean;
  onChange: any;
  size?: "small" | "medium" | "large";
}

const Switch: React.FC<SwitchProps> = ({
  name,
  label,
  value,
  onChange,
  size = "small",
  ...rest
}) => {
  const [isChecked, setIsChecked] = useState(value);

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(e);
  };

  const switchSizeClass = `switch ${isChecked ? "on" : "off"} ${size}`;

  return (
    <Base
      className={`switch-container ${size}`}
      onClick={handleToggle}
      {...rest}
    >
      <HelpText w="auto" mr={8} mt={0} mb={0}>
        {label}
      </HelpText>
      <div className={switchSizeClass}>
        <input
          type="checkbox"
          name={name}
          checked={isChecked}
          onChange={handleToggle}
          className="switch-input"
        />
        <span className="slider" />
      </div>
    </Base>
  );
};

export default Switch;
