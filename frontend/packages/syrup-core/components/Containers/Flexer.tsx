/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { CSSProperties, FC } from 'react';
import clsx from 'clsx';
import { Base, BaseProps } from '../../theme/base';

interface FlexerProps extends BaseProps {
  w?: number | string;
  grow?: boolean;
  wrap?: boolean;
  gap?: CSSProperties['gap'];
  children?: any;
  style?: CSSProperties;
  className?: string;
  noSpacing?: boolean;
  fade?: boolean;
}

export const Flexer: FC<FlexerProps> = ({
  w: width = '100%',
  grow = false,
  wrap = false,
  gap,
  children,
  style,
  className,
  fade = false,
  ...rest
}) => {
  return (
    <Base
      {...rest}
      className={clsx(className, fade ? 'fade-in' : '')}
      d="flex"
      gap={gap}
      w={width}
      style={{
        ...style,
        flexGrow: grow ? 1 : 0,
        flexWrap: wrap ? 'wrap' : undefined,
      }}
    >
      {children}
    </Base>
  );
};
