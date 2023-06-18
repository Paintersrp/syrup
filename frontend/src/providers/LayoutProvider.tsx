import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { ScrollToTopFAB } from '@/components/Built';
import { Alert } from '@/components/Elements';
import { AppDrawer, AppFooter, AppNavbar } from '@/components/Layout';
import { useApp, useDrawer } from '@/hooks';
import { closeAlert } from '@/lib/redux';
import { LOGO, TITLE } from '@/settings';
import { ScrollToTop } from '@/utils';

export interface SiteLinkType {
  to: string;
  key: string;
  footer: boolean;
  navbar: boolean;
}

export const LINKS: SiteLinkType[] = [
  {
    to: '/',
    key: 'Home',
    footer: false,
    navbar: true,
  },
  {
    to: '/about',
    key: 'About',
    footer: true,
    navbar: true,
  },
  {
    to: '/contact',
    key: 'Contact',
    footer: true,
    navbar: true,
  },
  {
    to: '/services',
    key: 'Services',
    footer: true,
    navbar: true,
  },
  {
    to: '/posts',
    key: 'Posts',
    footer: true,
    navbar: true,
  },

  {
    to: '/WIP',
    key: 'WIP',
    footer: true,
    navbar: true,
  },
];

type LayoutProviderProps = {
  children: React.ReactNode;
};

export const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { isDrawerOpen, handleDrawer } = useDrawer();
  const { alert } = useApp();

  return (
    <Router>
      {alert.open && (
        <Alert
          alert={{ message: alert.message, type: alert.type }}
          onClose={() => dispatch(closeAlert())}
        />
      )}
      <AppNavbar menuButton menuOpen={isDrawerOpen} menuOnClick={handleDrawer} links={LINKS} />
      <AppDrawer
        open={isDrawerOpen}
        handleClose={handleDrawer}
        companyIcon={LOGO}
        companyTitle={TITLE}
      />
      {children}

      <ScrollToTop />
      <ScrollToTopFAB />
      <AppFooter links={LINKS} />
    </Router>
  );
};
