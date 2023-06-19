import './App.css';

import { AppProvider, AuthProvider, LayoutProvider } from '@/providers';
import { AppRoutes } from '@/routes/app';

function App(): JSX.Element {
  return (
    <AppProvider>
      <AuthProvider>
        <LayoutProvider>
          <AppRoutes />
        </LayoutProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
