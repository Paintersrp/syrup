import React, { ReactNode, CSSProperties } from 'react';

import { shadowMap } from '../../utils';
import { Base, BaseProps } from '../Elements';

interface SurfaceProps extends BaseProps {
  children?: ReactNode;
  maxWidth?: CSSProperties['maxWidth'];
  minHeight?: CSSProperties['minHeight'];
  boxShadow?: number;
  px?: number;
  py?: number;
  br?: CSSProperties['borderRadius'];
  fillHeight?: boolean;
  outerStyle?: CSSProperties;
  innerStyle?: CSSProperties;
  outerClass?: string;
  innerClass?: string;
  onClick?: any;
}

const Surface: React.FC<SurfaceProps> = ({
  children,
  maxWidth,
  minHeight,
  boxShadow = 0,
  px: paddingX = 3,
  py: paddingY = 3,
  br: borderRadius = 4,
  fillHeight = false,
  outerStyle,
  innerStyle,
  outerClass,
  innerClass,
  onClick,
  ...rest
}) => {
  const containerStyle: CSSProperties = {
    width: '100%',
    minHeight: minHeight,
    display: 'flex',
    flexGrow: fillHeight ? 1 : 0,
    ...outerStyle,
  };

  const contentStyle: CSSProperties = {
    maxWidth: maxWidth,
    minHeight: minHeight,
    padding: `${paddingY * 8}px ${paddingX * 8}px`,
    boxShadow: shadowMap[boxShadow],
    borderRadius: borderRadius,
    width: '100%',
    ...innerStyle,
  };

  return (
    <Base className={outerClass} style={containerStyle} onClick={onClick} {...rest}>
      <div style={contentStyle} className={innerClass}>
        {children}
      </div>
    </Base>
  );
};
export default Surface;
