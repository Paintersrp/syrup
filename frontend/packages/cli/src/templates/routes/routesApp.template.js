export const RoutesAppTemplate = () =>
  `
  import { useRoutes } from 'react-router-dom';

  import { adminRoutes } from './admin';
  import { protectedRoutes } from './protected';
  import { publicRoutes } from './public';
  
  import { WIP } from '@/components/WIP';
  import { useAuthStore } from '@/stores/auth';
  
  export const AppRoutes = () => {
    const { authState } = useAuthStore();
    const commonRoutes = [{ path: '/WIP', element: <WIP /> }];
  
    const routes = authState.is_superuser
      ? [...protectedRoutes, ...adminRoutes]
      : authState.username
      ? protectedRoutes
      : publicRoutes;
  
    const element = useRoutes([...routes, ...commonRoutes]);
  
    return <>{element}</>;
  }; 
`;
