export const RoutesProtectedTemplate = () =>
  `
  import { Suspense } from 'react';
  import { Navigate, Outlet } from 'react-router-dom';
  
  import { Loading } from '@/components/Elements';
  import { lazyImport } from '@/utils/lazyImport';
  
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
  
`;
