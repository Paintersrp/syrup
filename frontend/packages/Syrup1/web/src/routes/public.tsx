import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';
import { Loading } from 'sy-core/components/Elements';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');
const { Home } = lazyImport(() => import('@/features/home'), 'Home');

const PublicOutlet = () => {
  return (
    <Suspense fallback={<Loading load={true} />}>
      <Outlet />
    </Suspense>
  );
};

export const publicRoutes = [
  {
    path: '',
    element: <PublicOutlet />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/auth/*', element: <AuthRoutes /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
