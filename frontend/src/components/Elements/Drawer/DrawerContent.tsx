import { FC } from 'react';

import { Flexer } from '@/components/Containers';
import { BaseProps } from '@/theme/base';
import { List } from '../List/List';
import { ListItem, ListItemDataType } from '../List/ListItem';
import { Divider } from '../Divider/Divider';
import { colors } from '@/theme/common';

interface DrawerContentProps extends BaseProps {
  handleClose?: () => void;
  itemClass?: string;
  items: ListItemDataType[];
}

export const DrawerContent: FC<DrawerContentProps> = ({ items, itemClass, ...rest }) => {
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
        <Divider mt={0} color={colors.primary.hover} />
      </div>
    </Flexer>
  );
};
