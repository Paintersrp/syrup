
import { FC } from 'react';

import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';

import { useFeature2 } from '../api/useFeature2';

export const Feature2: FC = () => {
  const { data, isLoading } = useFeature2();

  if (isLoading || !data) {
    return <Loading load={true} />;
  }

  return (
    <Page>
      Boilerplate
    </Page>
  );
};
