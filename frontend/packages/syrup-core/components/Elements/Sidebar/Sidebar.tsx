/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { CSSProperties, FC, ReactNode } from 'react';

import './Sidebar.css';
import { css, useTheme } from '@emotion/react';
import { Base, BaseProps } from '../../../theme/base';

// retool component
const styles = {
  root: (theme: any) =>
    css({
      position: 'sticky',
      color: '#fff',
      backgroundColor: theme.primary,
      transition: 'width 0.3s ease',
      boxShadow: theme.shadows[1],
    }),
};

export interface SidebarProps extends BaseProps {
  side: 'left' | 'right';
  children: ReactNode;
  outerClass?: string;
  innerClass?: string;
  outerStyle?: CSSProperties;
  innerStyle?: CSSProperties;
  open?: boolean;
}

const Sidebar: FC<SidebarProps> = ({
  side = 'right',
  children,
  outerClass,
  innerClass,
  outerStyle,
  innerStyle,
  w: width = 240,
  open = true,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <div className={`${open ? 'open' : 'closed'} sidebar-outer`}>
      <Base
        w={open ? width : 0}
        className={`sidebar-inner-${side} ${innerClass} ${open ? 'open' : 'closed'}`}
        style={innerStyle}
        {...rest}
      >
        {children}
      </Base>
    </div>
  );
};

export default Sidebar;
