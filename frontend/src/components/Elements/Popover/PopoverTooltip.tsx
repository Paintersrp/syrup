import React from 'react';
import { css } from '@emotion/react';
import Popover from './Popover';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  onOpen?: () => void;
  onClose?: () => void;
}

const PopoverTooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  onOpen,
  onClose,
}) => {
  //   const tooltipStyles = css`
  //     ${position === 'top' &&
  //     css`
  //       bottom: 100%;
  //       transform: translateY(-8px);
  //     `}
  //     ${position === 'bottom' &&
  //     css`
  //       top: 100%;
  //       transform: translateY(8px);
  //     `}
  //     ${position === 'left' &&
  //     css`
  //       right: 100%;
  //       transform: translateX(-8px);
  //     `}
  //     ${position === 'right' &&
  //     css`
  //       left: 100%;
  //       transform: translateX(8px);
  //     `}

  //     // Other tooltip styles...
  //   `;

  return (
    <Popover content={content} onOpen={onOpen} onClose={onClose}>
      <span style={{ position: 'relative', display: 'inline-block' }}>{children}</span>
    </Popover>
  );
};

export default PopoverTooltip;
