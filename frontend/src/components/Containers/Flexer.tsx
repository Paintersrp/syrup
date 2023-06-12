import React, { ReactNode, CSSProperties } from 'react';
import { Base, BaseProps } from '../Elements';

interface FlexerProps extends BaseProps {
  w?: number | string;
  grow?: boolean;
  wrap?: boolean;
  gap?: CSSProperties['gap'];
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
  noSpacing?: boolean;
  fade?: boolean;
}

const Flexer: React.FC<FlexerProps> = ({
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
      className={`${className} ${fade ? 'fade-in' : ''}`}
      style={{
        ...style,
        width: width,
        display: 'flex',
        flexGrow: grow ? 1 : 0,
        flexWrap: wrap ? 'wrap' : undefined,
        gap: gap,
      }}
    >
      {children}
    </Base>
  );
};

export default Flexer;
