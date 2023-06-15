import { CSSProperties, FC, ReactNode } from 'react';
import Base, { BaseProps } from '../Base/Base';
import './Sidebar.css';

interface SidebarProps extends BaseProps {
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
