import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppDrawer, AppFooter, AppNavbar } from '@/components/Layout';
import { useDrawer } from '@/hooks';
import { LOGO, TITLE } from '@/settings';

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
];

type LayoutProviderProps = {
  children: React.ReactNode;
};

export const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  const { isDrawerOpen, handleDrawer } = useDrawer();

  return (
    <Router>
      <AppNavbar menuButton menuOpen={isDrawerOpen} menuOnClick={handleDrawer} links={LINKS} />
      <AppDrawer
        open={isDrawerOpen}
        handleClose={handleDrawer}
        companyIcon={LOGO}
        companyTitle={TITLE}
      />
      {children}
      <AppFooter links={LINKS} />
    </Router>
  );
};
