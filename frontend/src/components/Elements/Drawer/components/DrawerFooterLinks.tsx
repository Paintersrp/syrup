import React, { FC } from 'react';

import { Flexer } from '../../../Containers';
import ListItem from '../../List/ListItem';
import { ListItemDataType } from './DrawerContent';
import { palettes } from '../../../../utils';
import Divider from '../../Divider/Divider';
import { BaseProps } from '../../Base/Base';
import List from '../../List/List';

interface DrawerFooterLinksProps extends BaseProps {
  handleClose?: () => void;
  itemClass?: string;
  items: ListItemDataType[];
}

const DrawerFooterLinks: FC<DrawerFooterLinksProps> = ({ items, itemClass, ...rest }) => {
  return (
    <Flexer fd="column" {...rest}>
      <div style={{ width: '100%' }}>
        <Divider mt={0} color={palettes.primary.hover} />
      </div>
      <List j="c" a="c" spacing={2} maxWidth={400} boxShadow={0} px={0}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            className={itemClass}
            text={item.text}
            icon={item.icon}
            iconColor={item.icon ? 'secondary' : ''}
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

export default DrawerFooterLinks;
