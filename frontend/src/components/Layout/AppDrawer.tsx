import { FC } from 'react';
import './css/AppDrawer.css';

import { Flexer } from '@/components/Containers';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerFooterLinks,
  DrawerHeader,
  ListItemDataType,
} from '@/components/Elements';
import { useEditModeStore } from '@/stores/editmode';
import { useAuthStore } from '@/stores/auth';
import { LogoutUser } from '@/utils';

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
          <DrawerContent items={linkListItemData} itemClass="drawer-list-item" />
          <Flexer fd="column">
            <DrawerFooterLinks
              items={
                authState.is_authenticated ? authedBottomListItemData : unauthedBottomListItemData
              }
              itemClass="drawer-list-item"
            />
            <DrawerFooter title={companyTitle} />
          </Flexer>
        </Flexer>
      </Flexer>
    </Drawer>
  );
};
