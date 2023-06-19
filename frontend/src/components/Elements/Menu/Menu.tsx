import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import './Menu.css';

import { Base, BaseProps } from '@/theme/base';
import { Divider } from '../Divider/Divider';
import { Button } from '../../Buttons';

interface MenuProps extends BaseProps {
  children: ReactNode;
  position?: string;
  manualButton?: ReactNode;
  dividers?: boolean;
  buttonText?: string;
  style?: CSSProperties;
}

const Menu: React.FC<MenuProps> = ({
  children,
  position = 'bottom',
  manualButton,
  dividers = false,
  buttonText = 'Open Menu',
  style,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const getMenuPosition = () => {
    return isOpen ? 'block' : 'none';
  };

  const getMenuStyle = () => {
    const menuStyle: React.CSSProperties = {
      display: getMenuPosition(),
      ...style,
    };

    if (position.includes('top')) {
      menuStyle.bottom = '100%';
      menuStyle.marginBottom = '5px';
    } else {
      menuStyle.top = '100%';
      menuStyle.marginTop = '5px';
    }

    if (position.includes('left')) {
      menuStyle.left = '0';
      menuStyle.transform = 'translateX(-90%)';
    } else if (position.includes('right')) {
      menuStyle.right = '0';
      menuStyle.transform = 'translateX(90%)';
    } else {
      menuStyle.left = '50%';
      menuStyle.transform = 'translateX(-50%)';
    }

    return menuStyle;
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  const renderChildren = React.Children.map(children, (child, index) => {
    const shouldRenderDivider = dividers && index !== 0;

    return (
      <>
        {shouldRenderDivider && <Divider />}
        {child}
      </>
    );
  });

  return (
    <Base className="menu-root" ref={dropdownRef} {...rest}>
      {manualButton ? (
        React.cloneElement(manualButton as React.ReactElement, {
          onClick: toggleDropdown,
        })
      ) : (
        <Button size="sm" onClick={toggleDropdown}>
          {buttonText}
        </Button>
      )}
      <div className={`menu-container ${isOpen ? 'open' : ''}`} style={getMenuStyle()}>
        {renderChildren}
      </div>
    </Base>
  );
};

export default Menu;
