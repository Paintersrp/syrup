import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';
import { usePageSetup } from '@/hooks';
import { seoData } from '@/settings';

import { useLanding } from '../api/useLanding';
import { Hero } from '../components/Hero';
import { IconScroller } from '../components/IconScroller';
import { Processes } from '../components/Processes';

import { PostCards } from '@/features/posts';
import { ServiceCards } from '@/features/services';

export const Landing: FC = () => {
  const editMode: boolean = useSelector((state: any) => state.editMode.editMode);
  const { error, setError, ready, setReady } = usePageSetup();

  const [data, setData] = useState<any | null>();

  useEffect(() => {
    useLanding(setData, setError);
    setTimeout(() => setReady(true), 250);
  }, []);

  if (!ready || !data) {
    return <Loading load={true} />;
  }

  return (
    <Page seoData={seoData.landing} error={error}>
      <Hero
        data={data.hero}
        editMode={editMode}
        contactData={data.contactInfo}
        socialsData={data.socials}
      />
      {/* <Services serviceData={data.services} />  */}
      <ServiceCards />
      <Processes
        processData={data.processes}
        headerData={data.processHeader[0]}
        editMode={editMode}
      />
      <PostCards posts={data.posts} header={data.postsHeader[0]} editMode={editMode} />
      <IconScroller />
    </Page>
  );
};
