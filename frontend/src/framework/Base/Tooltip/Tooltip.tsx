import React, { useState, ReactNode, FC } from "react";
import "./Tooltip.css";

interface TooltipProps {
  children: ReactNode;
  text?: string;
  position?: "top" | "bottom" | "left" | "right";
  arrow?: boolean;
}

const Tooltip: FC<TooltipProps> = ({
  children,
  text,
  position = "bottom",
  arrow = false,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    console.log("entered");
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const tooltipPositionClass = `tooltip-content tooltip-content--${position} ${
    arrow ? `arrow arrow--${position}` : ""
  }`;

  return (
    <div className="tooltip-container">
      <span
        className="tooltip-trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
      <div
        className={tooltipPositionClass}
        style={{ visibility: isTooltipVisible ? "visible" : "hidden" }}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
