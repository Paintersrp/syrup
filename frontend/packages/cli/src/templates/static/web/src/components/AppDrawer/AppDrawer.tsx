import { FC } from 'react';
import { css } from '@emotion/react';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils/inject';
import { useAuthStore } from '@/stores/auth';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerFooterLinks,
  DrawerHeader,
  Flexer,
  ListItemDataType,
  PaletteOptions,
} from 'sy-core';

const styles = (theme: ExtendedTheme) => ({
  item: css({
    color: theme.light,
    '&:hover': {
      background: '#a1a1a133',
    },
  }),
});

type AppDrawerProps = {
  color?: PaletteOptions;
  iconColor?: PaletteOptions;
  open?: boolean;
  handleClose?: () => void;
  variant?: 'standard' | 'permanent' | 'persistent';
  side?: 'left' | 'right';
  companyIcon?: string | undefined | any;
  companyTitle?: string | undefined;
};

export const AppDrawer: FC<AppDrawerProps> = ({
  color = 'primary',
  iconColor = 'secondary',
  open = false,
  handleClose = () => {},
  variant = 'standard',
  side = 'left',
  companyIcon = undefined,
  companyTitle = undefined,
}) => {
  const css = inject(styles);
  const { authState } = useAuthStore();

  const handleLogout = () => {
    // LogoutUser();
    handleClose();
  };

  const linkListItemData: ListItemDataType[] = [
    { text: 'Home', to: '/', icon: 'home', onClick: handleClose },
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
    // {
    //   text: 'Admin',
    //   to: '/admin',
    //   icon: 'admin_panel_settings',
    //   onClick: handleClose,
    // },
    // {
    //   text: 'Profile',
    //   to: '/profile',
    //   icon: 'account_circle',
    //   onClick: handleClose,
    // },
    {
      text: 'Logout',
      to: '/logout',
      icon: 'logout',
      onClick: handleLogout,
    },
  ];

  const footerItems = authState.is_authenticated
    ? authedBottomListItemData
    : unauthedBottomListItemData;

  return (
    <Drawer color={color} variant={variant} open={open} onClose={handleClose} side={side}>
      <Flexer fd="column" grow style={{ color: '#f5f5f5' }}>
        <DrawerHeader title={companyTitle} icon={companyIcon} />
        <Flexer j="space-between" fd="column" grow>
          <DrawerContent iconColor={iconColor} items={linkListItemData} itemCss={css.item} />
          <Flexer fd="column">
            <DrawerFooterLinks iconColor={iconColor} items={footerItems} itemCss={css.item} />
            <DrawerFooter title={companyTitle} />
          </Flexer>
        </Flexer>
      </Flexer>
    </Drawer>
  );
};
