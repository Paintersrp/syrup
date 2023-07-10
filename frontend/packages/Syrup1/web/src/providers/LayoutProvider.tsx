import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ScrollToTopFAB, useDrawer } from 'sy-core';

import { LOGO, TITLE } from '@/settings';

import { useAlertStore } from '@/stores/alert';
import { ScrollToTop } from '@/utils/scrollToTop';
import { AppNavbar } from '@/components/AppNavbar/AppNavbar';
import { AppFooter } from '@/components/AppFooter/AppFooter';
import { AppDrawer } from '@/components/AppDrawer/AppDrawer';
import { Alert } from '@/components/Alert/Alert';

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
];

type LayoutProviderProps = {
  children: React.ReactNode;
};

export const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  const { isDrawerOpen, handleDrawer } = useDrawer();
  const { alertState, closeAlert } = useAlertStore();

  return (
    <Router>
      {alertState.open && <Alert alert={alertState} onClose={() => closeAlert()} />}
      <AppNavbar menuOpen={isDrawerOpen} menuOnClick={handleDrawer} links={LINKS} />
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
