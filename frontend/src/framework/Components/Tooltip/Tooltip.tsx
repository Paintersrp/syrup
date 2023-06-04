import React, {
  useState,
  ReactNode,
  FC,
  CSSProperties,
  useEffect,
} from "react";
import "./Tooltip.css";

import { Base, BaseProps } from "../../Containers";

export type TooltipPosition = "top" | "bottom" | "left" | "right" | undefined;

interface TooltipProps extends BaseProps {
  children: ReactNode;
  text?: string;
  position?: TooltipPosition;
  arrow?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
}

const Tooltip: FC<TooltipProps> = ({
  children,
  text,
  position = "bottom",
  arrow = false,
  style,
  disabled = false,
  ...rest
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled && isTooltipVisible) {
      setIsTooltipVisible(false);
    }
  };

  useEffect(() => {
    if (disabled && isTooltipVisible) {
      setIsTooltipVisible(false);
    }
  }, [disabled]);

  const tooltipPositionClass = `tooltip-content tooltip-content--${position} ${
    arrow ? `arrow arrow--${position}` : ""
  }`;

  return (
    <Base className="tooltip-container" style={style} {...rest}>
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
    </Base>
  );
};

export default Tooltip;
