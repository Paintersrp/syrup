import { useState, ReactNode, FC, CSSProperties } from 'react';
import './Tooltip.css';

import { Base, BaseProps } from '@/theme/base';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | undefined;

interface TooltipProps extends BaseProps {
  children: ReactNode;
  text?: string;
  position?: TooltipPosition;
  arrow?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  text,
  position = 'bottom',
  arrow = false,
  style,
  disabled = false,
  ...rest
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const tooltipPositionClass = `tooltip-content tooltip-content--${position} ${
    arrow ? `arrow arrow--${position}` : ''
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
        style={{ visibility: isTooltipVisible ? 'visible' : 'hidden' }}
      >
        {text}
      </div>
    </Base>
  );
};
