
import { FC } from 'react';

import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';

import { useJobs } from '../api/useJobs';

export const Jobs: FC = () => {
  const { data, isLoading } = useJobs();

  if (isLoading || !data) {
    return <Loading load={true} />;
  }

  return (
    <Page>
      Boilerplate
    </Page>
  );
};
