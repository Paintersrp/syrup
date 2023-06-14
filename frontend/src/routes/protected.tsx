import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@/components/Elements';

const ProtectedOutlet = () => {
  return (
    <Suspense fallback={<Loading load={true} />}>
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <ProtectedOutlet />,
    children: [{ path: '*', element: <Navigate to="." /> }],
  },
];
