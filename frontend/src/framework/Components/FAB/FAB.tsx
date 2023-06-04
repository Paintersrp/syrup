import React, { CSSProperties } from "react";
import "./FAB.css";

import { Base, BaseProps } from "../../Containers";
import MaterialIcon from "../Icon/MaterialIcon";

interface FABProps extends BaseProps {
  icon: string;
  label?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  onClick: () => void;
  size?: string | undefined;
  style?: CSSProperties;
  className?: string;
}

// color additions

const FAB: React.FC<FABProps> = ({
  icon,
  label,
  position = "bottom-right",
  onClick,
  size = "24px",
  className,
  style,
  ...rest
}) => {
  const containerStyle: CSSProperties = {
    position: "fixed",
    bottom: position.includes("bottom") ? "30px" : "unset",
    top: position.includes("top") ? "70px" : "unset",
    right: position.includes("right") ? "30px" : "unset",
    left: position.includes("left") ? "30px" : "unset",
    zIndex: 100,
    ...style,
  };

  return (
    <Base
      className={`fab-container ${className}`}
      style={containerStyle}
      {...rest}
    >
      <button className="fab-button" onClick={onClick}>
        <MaterialIcon icon={icon} color="#fff" size={size} />
        {label && <span className="fab-label">{label}</span>}
      </button>
    </Base>
  );
};

export default FAB;
