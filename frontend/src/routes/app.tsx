import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import { adminRoutes } from './admin';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

import { WIP } from '@/components/WIP';

export const AppRoutes = () => {
  const auth: any = useSelector<any>((state) => state.auth);

  const commonRoutes = [{ path: '/WIP', element: <WIP /> }];

  const routes = auth.is_superuser
    ? [...protectedRoutes, ...adminRoutes]
    : auth.username
    ? protectedRoutes
    : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
