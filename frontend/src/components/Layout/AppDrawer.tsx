import { FC } from 'react';
import { css } from '@emotion/react';

import { Flexer } from '@/components/Containers';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerFooterLinks,
  DrawerHeader,
  ListItemDataType,
} from '@/components/Elements';
import { useAuthStore } from '@/stores/auth';
import { useEditModeStore } from '@/stores/editmode';
import { inject } from '@/theme/utils';
import { LogoutUser } from '@/utils';

const styles = (theme: any) => ({
  item: css({
    color: theme.light,
    '&:hover': {
      background: '#a1a1a133',
    },
  }),
});

type AppDrawerProps = {
  open?: boolean;
  handleClose?: () => void;
  variant?: 'standard' | 'permanent' | 'persistent';
  side?: 'left' | 'right';
  color?: string;
  companyIcon?: string | undefined | any;
  companyTitle?: string | undefined;
};

export const AppDrawer: FC<AppDrawerProps> = ({
  open = false,
  handleClose = () => {},
  variant = 'standard',
  side = 'left',
  color = '#F5F5F5',
  companyIcon = undefined,
  companyTitle = undefined,
}) => {
  const css = inject(styles);
  const { authState } = useAuthStore();
  const { editModeToggle } = useEditModeStore();

  const handleEditClick = () => {
    editModeToggle();
    handleClose();
  };

  const handleLogout = () => {
    LogoutUser();
    handleClose();
  };

  const linkListItemData: ListItemDataType[] = [
    { text: 'Home', to: '/', icon: 'home', onClick: handleClose },
    { text: 'About', to: '/about', icon: 'contact_mail', onClick: handleClose },
    { text: 'WIP', to: '/WIP', icon: 'work', onClick: handleClose },
  ];

  const unauthedBottomListItemData: ListItemDataType[] = [
    {
      text: 'Register',
      to: '/register',
      icon: 'person_add',
      onClick: handleClose,
    },
    {
      text: 'Login',
      to: '/login',
      icon: 'login',
      onClick: handleClose,
    },
  ];

  const authedBottomListItemData: ListItemDataType[] = [
    {
      text: 'Edit Mode',
      to: '',
      icon: 'edit',
      onClick: handleEditClick,
    },
    {
      text: 'Admin',
      to: '/admin',
      icon: 'admin_panel_settings',
      onClick: handleClose,
    },
    {
      text: 'Profile',
      to: '/profile',
      icon: 'account_circle',
      onClick: handleClose,
    },
    {
      text: 'Logout',
      to: '/logout',
      icon: 'logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Drawer variant={variant} open={open} onClose={handleClose} side={side}>
      <Flexer fd="column" grow style={{ color }}>
        <DrawerHeader title={companyTitle} icon={companyIcon} />
        <Flexer j="space-between" fd="column" grow>
          <DrawerContent items={linkListItemData} itemCss={css.item} />
          <Flexer fd="column">
            <DrawerFooterLinks
              items={
                authState.is_authenticated ? authedBottomListItemData : unauthedBottomListItemData
              }
              itemCss={css.item}
            />
            <DrawerFooter title={companyTitle} />
          </Flexer>
        </Flexer>
      </Flexer>
    </Drawer>
  );
};
