import { FC } from 'react';

import { ListItem, ListItemDataType } from '../List/ListItem';

import { BaseProps } from '@/theme/base';
import { List } from '../List/List';
import { Flexer } from '@/components/Containers';
import { Divider } from '../Divider/Divider';

interface DrawerFooterLinksProps extends BaseProps {
  handleClose?: () => void;
  itemCss?: string;
  items: ListItemDataType[];
}

export const DrawerFooterLinks: FC<DrawerFooterLinksProps> = ({ items, itemCss, ...rest }) => {
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
