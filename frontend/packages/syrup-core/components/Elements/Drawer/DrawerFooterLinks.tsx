/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { FC } from 'react';

import { ListItem, ListItemDataType } from '../List/ListItem';

import { List } from '../List/List';
import { Divider } from '../Divider/Divider';
import { Flexer } from '../../Containers';
import { BaseProps } from '../../../theme/base';
import { PaletteOptions } from '../../../theme/palettes';

interface DrawerFooterLinksProps extends BaseProps {
  handleClose?: () => void;
  itemCss?: string;
  items: ListItemDataType[];
  iconColor: PaletteOptions;
}

export const DrawerFooterLinks: FC<DrawerFooterLinksProps> = ({
  items,
  itemCss,
  iconColor = 'primary',
  ...rest
}) => {
  return (
    <Flexer fd="column" {...rest}>
      <div style={{ width: '100%' }}>
        <Divider mt={0} color="drawerLight" />
      </div>
      <List j="c" a="c" spacing={2} maxWidth={400} boxShadow={0} px={0}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            css={[itemCss, { cursor: 'pointer', color: '#f5f5f5' }]}
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
    </Flexer>
  );
};
