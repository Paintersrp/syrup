import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';
import { Loading } from 'sy-core/components/Elements';

const { Landing } = lazyImport(() => import('@/features/landing'), 'Landing');
const { About } = lazyImport(() => import('@/features/about'), 'About');

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
      { path: '/', element: <Landing /> },
      { path: '/about', element: <About /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
