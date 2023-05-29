import React, { useState, ReactNode, FC, CSSProperties } from "react";
import "./Tooltip.css";

export type TooltipPosition = "top" | "bottom" | "left" | "right" | undefined;

interface TooltipProps {
  children: ReactNode;
  text?: string;
  position?: TooltipPosition;
  arrow?: boolean;
  style?: CSSProperties;
}

const Tooltip: FC<TooltipProps> = ({
  children,
  text,
  position = "bottom",
  arrow = false,
  style,
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
    <div className="tooltip-container" style={style}>
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
