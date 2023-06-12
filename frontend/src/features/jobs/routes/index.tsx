import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@/components/Elements';
import { Jobs } from './Jobs';

const JobsOutlet = () => {
  return (
    <Suspense fallback={<Loading load={true} />}>
      <Outlet />
    </Suspense>
  );
};

export const jobRoutes = [
  {
    path: '/jobposting',
    element: <JobsOutlet />,
    children: [
      { path: '', element: <Jobs /> },
      { path: ':id', element: <Jobs /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
