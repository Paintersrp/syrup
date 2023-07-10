import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from 'sy-core/components/Elements';
import { lazyImport } from '@/utils/lazyImport';

const { Home } = lazyImport(() => import('@/features/home'), 'Home');

const ProtectedOutlet = () => {
  return (
    <Suspense fallback={<Loading load={true} />}>
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: '',
    element: <ProtectedOutlet />,
    children: [
      { path: '/', element: <Home /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
