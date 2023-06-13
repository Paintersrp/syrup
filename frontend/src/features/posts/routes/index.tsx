import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@/components/Elements';

import { Posts } from './Posts';
import { Post } from './Post';

const PostsOutlet = () => {
  return (
    <Suspense fallback={<Loading load={true} />}>
      <Outlet />
    </Suspense>
  );
};

export const postRoutes = [
  {
    path: '/posts',
    element: <PostsOutlet />,
    children: [
      { path: '', element: <Posts /> },
      { path: ':id', element: <Post /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
