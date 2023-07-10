/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { FC, ReactNode } from 'react';

import { Popover } from '../Popover/Popover';
import { Text } from '../Text/Text';

interface TooltipProps {
  text: ReactNode;
  children: any;
  onOpen?: () => void;
  onClose?: () => void;
  position?: 'top' | 'bottom' | 'left' | 'right';
  css?: any;
}

// Disabled Prop

export const Tooltip: FC<TooltipProps> = ({
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
      css={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      {children}
    </Popover>
  );
};
