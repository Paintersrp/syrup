import { useRoutes } from 'react-router-dom';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

import { useAuthStore } from '@/stores/auth';

export const AppRoutes = () => {
  const { authState } = useAuthStore();
  const commonRoutes = [{}];

  // const routes = authState.is_superuser
  //   ? [...protectedRoutes, ...adminRoutes]
  //   : authState.username
  //   ? protectedRoutes
  //   : publicRoutes;

  const routes = authState.username ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
