import React, { CSSProperties } from "react";
import "./ToggleButton.css";

interface ToggleButtonProps {
  value: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  value,
  onClick,
  children,
  className,
  style,
}) => {
  return (
    <button
      className={`toggle-button ${className}`}
      onClick={onClick}
      value={value}
      style={style}
    >
      {children}
    </button>
  );
};

export default ToggleButton;
