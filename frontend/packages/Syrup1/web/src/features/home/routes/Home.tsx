import { FC } from 'react';
import { Loading, Page, Surface } from 'sy-core';
import { useHome } from '../api/useHome';

import { Hero } from '../components/Hero';
import { IconScroller } from '../components/IconScroller';

export const Home: FC = () => {
  const { data, isLoading } = useHome();

  if (isLoading || !data) {
    return <Loading load={true} />;
  }

  return (
    <Page>
      {/* <Hero data={data.hero} contactData={data.contactInfo} socialsData={data.socials} /> */}
      <Surface fillHeight a="c">
        <IconScroller />
      </Surface>
    </Page>
  );
};
