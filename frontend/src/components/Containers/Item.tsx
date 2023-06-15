import React from 'react';
import clsx from 'clsx';
import './css/Item.css';

import { Base, BaseProps } from '../Elements';

interface ItemProps extends BaseProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  justify?: string;
  align?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Item: React.FC<ItemProps> = ({
  xs = 12,
  sm,
  md,
  lg,
  xl,
  justify = 'center',
  align = 'center',
  children,
  style,
  className,

  ...rest
}) => {
  const getBasis = (breakpointValue: number | undefined, defaultValue: number): string => {
    const value = breakpointValue !== undefined ? breakpointValue : defaultValue;
    return value * 8.333333333333333 + '%';
  };

  const itemBasis = {
    '--item-basis-xs': getBasis(xs, 12),
    '--item-basis-sm': getBasis(sm, xs),
    '--item-basis-md': getBasis(md, sm || xs),
    '--item-basis-lg': getBasis(lg, md || sm || xs),
    '--item-basis-xl': getBasis(xl, lg || md || sm || xs),
  } as React.CSSProperties;

  const itemStyle = {
    ...itemBasis,
    display: justify ? 'flex' : '',
    justifyContent: justify ? justify : '',
    alignItems: align ? align : '',
    ...style,
  };

  return (
    <Base className={clsx('item', className)} style={itemStyle} {...rest}>
      {children}
    </Base>
  );
};

export default Item;
