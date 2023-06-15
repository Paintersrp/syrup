import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@/components/Elements';
import { lazyImport } from '@/utils/lazyImport';

const { Landing } = lazyImport(() => import('@/features/landing'), 'Landing');
const { About } = lazyImport(() => import('@/features/about'), 'About');
const { Contact } = lazyImport(() => import('@/features/contact'), 'Contact');
const { JobsRoutes } = lazyImport(() => import('@/features/jobs'), 'JobsRoutes');
const { PostsRoutes } = lazyImport(() => import('@/features/posts'), 'PostsRoutes');
const { ServicesRoutes } = lazyImport(() => import('@/features/services'), 'ServicesRoutes');

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
      { path: '/contact', element: <Contact /> },
      { path: '/jobs/*', element: <JobsRoutes /> },
      { path: '/posts/*', element: <PostsRoutes /> },
      { path: '/services/*', element: <ServicesRoutes /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
