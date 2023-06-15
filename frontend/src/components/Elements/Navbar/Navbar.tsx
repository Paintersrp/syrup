import React, { ReactNode, CSSProperties, FC } from 'react';
import classNames from 'classnames';
import './Navbar.css';

interface NavbarProps {
  children: ReactNode;
  position?: 'fixed' | 'absolute';
  side?: 'top' | 'bottom';
  color?: 'primary' | 'secondary' | 'error' | 'success';
  className?: string;
  style?: CSSProperties | null;
}

const Navbar: FC<NavbarProps> = ({
  children,
  position = 'fixed',
  side = 'top',
  color = 'primary',
  className = '',
  style = null,
}) => {
  const navbarStyles: CSSProperties = {
    position,
    [side]: -1,
    ...style,
  };

  const classes = classNames('nav-top', `bg-${color}-m`, className);

  return (
    <nav className={classes} style={navbarStyles}>
      {children}
    </nav>
  );
};

export default Navbar;
