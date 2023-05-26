import React, { CSSProperties } from "react";
import "./FAB.css";
import MaterialIcon from "../Icon/MaterialIcon";

interface FABProps {
  icon: string;
  label?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  onClick: () => void;
  size?: string | undefined;
  style?: CSSProperties;
  className?: string;
}

const FAB: React.FC<FABProps> = ({
  icon,
  label,
  position = "bottom-right",
  onClick,
  size = "24px",
  className,
  style,
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
    <div className={`fab-container ${className}`} style={containerStyle}>
      <button className="fab-button" onClick={onClick}>
        <MaterialIcon icon={icon} color="#fff" size={size} />
        {label && <span className="fab-label">{label}</span>}
      </button>
    </div>
  );
};

export default FAB;
