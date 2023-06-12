import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';

import { adminRoutes } from './admin';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { jobRoutes } from '@/features/jobs/routes';

import { About } from '@/features/about/routes';
import { Contact } from '@/features/contact/routes';

import { WIP } from '@/components/WIP';

import Landing from '@/features/landing/routes/Landing';
import Posts from '@/features/posts/routes/Posts';
import Post from '@/features/posts/routes/Post';

export const AppRoutes = () => {
  const auth: any = useSelector<any>((state) => state.auth);

  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    { path: '/WIP', element: <WIP /> },
    { path: 'posts', element: <Posts /> },
    { path: 'posts/:id', element: <Post /> },
  ];

  const routes = auth.is_superuser
    ? [...protectedRoutes, ...adminRoutes]
    : auth.username
    ? protectedRoutes
    : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes, ...jobRoutes]);

  return <>{element}</>;
};
