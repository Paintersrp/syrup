import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@/components/Elements';
import { Services } from './Services';
import { Service } from './Service';

const ServicesOutlet = () => {
  return (
    <Suspense fallback={<Loading load={true} />}>
      <Outlet />
    </Suspense>
  );
};

export const servicesRoutes = [
  {
    path: '/services',
    element: <ServicesOutlet />,
    children: [
      { path: '', element: <Services /> },
      { path: ':id', element: <Service /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
