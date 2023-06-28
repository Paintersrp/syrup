
import { FC } from 'react';

import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';

import { usePost } from '../api/usePost';

export const Post: FC = () => {
  const { data, isLoading } = usePost();

  if (isLoading || !data) {
    return <Loading load={true} />;
  }

  return (
    <Page>
      Boilerplate
    </Page>
  );
};
