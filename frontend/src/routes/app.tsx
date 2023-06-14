import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import { adminRoutes } from './admin';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { jobRoutes } from '@/features/jobs';
import { postRoutes } from '@/features/posts';

import { About } from '@/features/about';
import { Contact } from '@/features/contact';
import { Landing } from '@/features/landing';
import { WIP } from '@/components/WIP';
import { servicesRoutes } from '@/features/services';

export const AppRoutes = () => {
  const auth: any = useSelector<any>((state) => state.auth);

  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/WIP', element: <WIP /> },
  ];

  const routes = auth.is_superuser
    ? [...protectedRoutes, ...adminRoutes]
    : auth.username
    ? protectedRoutes
    : publicRoutes;

  const element = useRoutes([
    ...routes,
    ...commonRoutes,
    ...servicesRoutes,
    ...jobRoutes,
    ...postRoutes,
  ]);

  return <>{element}</>;
};
