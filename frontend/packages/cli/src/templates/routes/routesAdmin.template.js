export const RoutesAdminTemplate = () =>
  `
  import { Suspense } from 'react';
  import { Navigate, Outlet } from 'react-router-dom';
  
  import { Loading } from '@/components/Elements';
  import {
    AppDashboard,
    ApplicationView,
    MainDashboard,
    MessageView,
    ModelDashboard,
    ObjectDashboard,
  } from '@/features/admin';
  
  const Admin = () => {
    return (
      <Suspense fallback={<Loading load={true} />}>
        <Outlet />
      </Suspense>
    );
  };
  
  export const adminRoutes = [
    {
      path: '/admin',
      element: <Admin />,
      children: [
        { path: '', element: <MainDashboard /> },
        { path: ':id', element: <ModelDashboard /> },
        { path: 'model/:str', element: <AppDashboard /> },
        { path: ':str/control', element: <ObjectDashboard /> },
        { path: ':str/control/:pk', element: <ObjectDashboard /> },
        { path: 'messages/read', element: <MessageView /> },
        { path: 'messages/read/:pk', element: <MessageView /> },
        { path: 'application/read', element: <ApplicationView /> },
        { path: 'application/read/:pk', element: <ApplicationView /> },
        { path: '*', element: <Navigate to="." /> },
      ],
    },
  ];
  
`;
