import { FC } from 'react';

import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';
import { PostCards } from '@/features/posts';
import { ServiceCards } from '@/features/services';
import { seoData } from '@/settings';

import { useLanding } from '../api/useLanding';
import { Hero } from '../components/Hero';
import { IconScroller } from '../components/IconScroller';
import { Processes } from '../components/Processes';

export const Landing: FC = () => {
  const { data, isLoading } = useLanding();

  if (isLoading || !data) {
    return <Loading load={true} />;
  }

  return (
    <Page seoData={seoData.landing}>
      <Hero data={data.hero} contactData={data.contactInfo} socialsData={data.socials} />
      <ServiceCards services={data.services} />
      <Processes processData={data.processes} headerData={data.processHeader[0]} />
      <PostCards posts={data.posts} header={data.postsHeader[0]} />
      <IconScroller />
    </Page>
  );
};
