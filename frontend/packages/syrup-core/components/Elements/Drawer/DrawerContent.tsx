/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { FC } from 'react';

import { List } from '../List/List';
import { ListItem, ListItemDataType } from '../List/ListItem';
import { Divider } from '../Divider/Divider';
import { Flexer } from '../../Containers';
import { BaseProps } from '../../../theme/base';
import { PaletteOptions } from '../../../theme/palettes';

interface DrawerContentProps extends BaseProps {
  handleClose?: () => void;
  itemCss?: any;
  items: ListItemDataType[];
  iconColor: PaletteOptions;
}

export const DrawerContent: FC<DrawerContentProps> = ({
  items,
  itemCss,
  iconColor = 'primary',
  ...rest
}) => {
  return (
    <Flexer fd="column" {...rest}>
      <List j="c" a="c" maxWidth={400} boxShadow={0} px={0}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            css={itemCss}
            text={item.text}
            icon={item.icon}
            iconColor={item.icon ? iconColor : ''}
            onClick={item.onClick}
            textAlign="center"
            to={item.to}
            pt={8}
            pb={8}
          />
        ))}
      </List>
      <div style={{ width: '100%' }}>
        <Divider mt={0} color="drawerLight" />
      </div>
    </Flexer>
  );
};
