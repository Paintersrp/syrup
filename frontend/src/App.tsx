import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import { closeAlert } from './lib/redux';
import { ScrollToTop, WithAuth } from './utils';
import { LINKS, LOGO, TITLE } from './settings';
import { AppProvider } from './providers/app';
import { AppRoutes } from './routes/app';
import { Alert, useDrawer } from './components/Elements';
import { ScrollToTopFAB } from './components/Built';
import { AppDrawer, AppFooter, AppNavbar } from './components/Layout';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alert);
  const loading = useSelector((state: any) => state.loading.loading);
  const { isDrawerOpen, handleDrawer } = useDrawer();

  return (
    <AppProvider>
      {alert.open && (
        <Alert
          alert={{ message: alert.message, type: alert.type }}
          onClose={() => dispatch(closeAlert())}
        />
      )}
      {/* <Loading load={loading} /> */}
      <AppNavbar menuButton menuOpen={isDrawerOpen} menuOnClick={handleDrawer} links={LINKS} />
      <AppDrawer
        open={isDrawerOpen}
        handleClose={handleDrawer}
        companyIcon={LOGO}
        companyTitle={TITLE}
      />

      <AppRoutes />

      <ScrollToTop />
      <ScrollToTopFAB />
      <AppFooter />
    </AppProvider>
  );
}

export default WithAuth(App);
