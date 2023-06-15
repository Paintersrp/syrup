import { FC } from 'react';

import { Surface } from '@/components/Containers';
import { Page } from '@/components/Layout';
import { seoData } from '@/settings';

import { useAbout } from '../api/useAbout';
import { AboutHeader } from '../components/AboutHeader';
import { AboutFAQ } from '../components/AboutFAQ';
import { Paragraph } from '../components/Paragraph';
import { Values } from '../components/Values';
import { Loading } from '@/components/Elements';

export const About: FC = () => {
  const { data, isLoading } = useAbout();

  if (isLoading || !data) {
    return <Loading load={true} />;
  }

  return (
    <Page seoData={seoData.about}>
      {data && (
        <Surface maxWidth={900} j="c" a="c">
          <AboutHeader data={data.header} />
          <Paragraph
            data={data.missionStatement}
            text="Mission Statement"
            adminLink="missionstatement"
          />
          <Paragraph data={data.companyHistory} text="Company History" adminLink="companyhistory" />
          <Values valuesData={data.values} />
          <AboutFAQ />
        </Surface>
      )}
    </Page>
  );
};
