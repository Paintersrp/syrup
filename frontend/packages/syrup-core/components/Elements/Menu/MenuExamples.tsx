import { ReactElement } from 'react';
import {
  faCoins,
  faEdit,
  faCancel,
  faBold,
  faBorderStyle,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons';

import { Flexer } from '../../Containers';
import { Divider } from '../Divider/Divider';
import { MenuItem } from './MenuItem';
import { Text } from '../Text/Text';
import { Menu } from './Menu';

const MenuExamples = (): ReactElement => {
  const items = [
    { icon: faCoins, isActive: true, label: 'Item 1' },
    { label: 'Item 2' },
    { label: 'Item 3' },
  ];

  const advancedItems = [
    { icon: faBorderStyle, label: 'Border Style' },
    { icon: faBold, label: 'Bold', isActive: true },
    { icon: faUnderline, label: 'Underline', isActive: true },
    { icon: faEdit, label: 'Edit', iconColor: 'success', textAlign: 'right' },
    { icon: faCancel, label: 'Cancel', iconColor: 'error', textAlign: 'right' },
  ];

  const topMenus = [
    { buttonText: 'Top Left', position: 'top-left', dividers: true },
    { buttonText: 'Top Center', position: 'top-center', dividers: true },
    { buttonText: 'Top Right', position: 'top-right', dividers: true },
  ];
  const bottomMenus = [
    { buttonText: 'Bottom Left', position: 'bottom-left', dividers: true },
    { buttonText: 'Bottom Center', position: 'bottom-center', dividers: true },
    { buttonText: 'Bottom Right', position: 'bottom-right', dividers: true },
  ];
  const advancedMenus = [
    { buttonText: 'Dividers', position: 'bottom-center', dividers: true },
    { buttonText: 'No Dividers', position: 'bottom-center', dividers: false },
  ];

  const menuSet = [
    { menus: topMenus, items: items, width: '100%' },
    { menus: bottomMenus, items: items, width: '100%' },
    { menus: advancedMenus, items: advancedItems, width: '100%' },
  ];

  return (
    <Flexer fd="column" w={500}>
      <Text t="h2" a="c">
        Menu Examples
      </Text>
      <div style={{ width: '100%' }}>
        <Divider mb={16} mt={4} />
      </div>
      {menuSet.map((set, index) => (
        <Flexer key={`menu-${index}`} j="c" w={set.width} mb={48}>
          {set.menus.map((menu, index) => (
            <div style={{ marginRight: 16 }}>
              <Menu
                key={index}
                dividers={menu.dividers}
                buttonText={menu.buttonText}
                position={menu.position}
              >
                {/* {set.items.map((item, itemIndex) => (
                  <MenuItem
                    key={itemIndex}
                    icon={item.icon}
                    isActive={item.isActive}
                    iconColor={item.iconColor}
                    textAlign={item.textAlign}
                  >
                    {item.label}
                  </MenuItem>
                ))} */}
              </Menu>
            </div>
          ))}
        </Flexer>
      ))}
    </Flexer>
  );
};

export default MenuExamples;
