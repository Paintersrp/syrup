import React from 'react';
import { css } from '@emotion/react';
import Popover from './Popover';
import { Text } from '../Text/Text';

interface TooltipProps {
  text: React.ReactNode;
  children: React.ReactElement;
  onOpen?: () => void;
  onClose?: () => void;
  position?: 'top' | 'bottom' | 'left' | 'right'; // New prop for tooltip position
}

const Tooltip2: React.FC<TooltipProps> = ({
  text,
  children,
  onOpen,
  onClose,
  position = 'bottom',
}) => {
  const ToolTipTextContent = (
    <Text t="body2" a="c" w="auto">
      {text}
    </Text>
  );
  return (
    <Popover
      trigger="hover"
      content={ToolTipTextContent}
      onOpen={onOpen}
      onClose={onClose}
      position={position}
    >
      {children}
    </Popover>
  );
};

export default Tooltip2;
