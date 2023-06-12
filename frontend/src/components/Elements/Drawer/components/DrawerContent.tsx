import React, { FC } from 'react';

import ListItem from '../../List/ListItem';
import { Flexer } from '../../../Containers';
import { palettes } from '../../../../utils';
import { BaseProps } from '../../Base/Base';
import Divider from '../../Divider/Divider';
import List from '../../List/List';

interface DrawerContentProps {
  handleClose?: () => void;
  itemClass?: string;
  items: ListItemDataType[];
}

export interface ListItemDataType extends BaseProps {
  text: string;
  to: string;
  icon?: any;
  onClick?: () => void;
}

const DrawerContent: FC<DrawerContentProps> = ({ items, itemClass, ...rest }) => {
  return (
    <Flexer fd="column" {...rest}>
      <List j="c" a="c" maxWidth={400} boxShadow={0} px={0}>
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
      <div style={{ width: '100%' }}>
        <Divider mt={0} color={palettes.primary.hover} />
      </div>
    </Flexer>
  );
};

export default DrawerContent;
