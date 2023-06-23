import React, { useState } from 'react';
import { css } from '@emotion/react';
import Popover from './Popover';

interface MenuItem {
  label: string;
  onClick: () => void;
}

interface MenuProps {
  items: MenuItem[];
  children: React.ReactElement;
}

const Menu: React.FC<MenuProps> = ({ items, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuStyles = css`
    list-style-type: none;
    padding: 0;
    margin: 0;
  `;

  const menuItemStyles = css`
    cursor: pointer;
    padding: 5px;
    &:hover {
      background-color: lightgray;
    }
  `;

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Popover
      content={
        <ul css={menuStyles}>
          {items.map((item, index) => (
            <li
              key={index}
              css={menuItemStyles}
              onClick={() => {
                item.onClick();
                handleClose();
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      }
      onOpen={handleOpen}
      onClose={handleClose}
    >
      {children}
    </Popover>
  );
};

export default Menu;
