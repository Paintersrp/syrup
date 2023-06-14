import { ScrollToTopFAB } from '@/components/Built';
import { Alert } from '@/components/Elements';
import { AppDrawer, AppFooter, AppNavbar } from '@/components/Layout';
import { useApp, useDrawer } from '@/hooks';

import { closeAlert } from '@/lib';
import { LINKS, LOGO, TITLE } from '@/settings';
import { ScrollToTop } from '@/utils';
import { FC } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

type LayoutProviderProps = {
  children: React.ReactNode;
};

export const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { isDrawerOpen, handleDrawer } = useDrawer();
  const { alert } = useApp();

  return (
    <HelmetProvider>
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
        <AppFooter />
      </Router>
    </HelmetProvider>
  );
};
