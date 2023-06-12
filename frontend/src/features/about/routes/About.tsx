import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Surface } from '@/components/Containers';
import { Page } from '@/components/Layout';
import { usePageSetup } from '@/hooks';
import { seoData } from '@/settings';

import { useAbout } from '../api/useAbout';
import { AboutHeader } from '../components/AboutHeader';
import { AboutFAQ } from '../components/AboutFAQ';
import { Paragraph } from '../components/Paragraph';
import { Values } from '../components/Values';
import { AboutContent } from '../types';

export const About: FC = () => {
  const editMode = useSelector((state: any) => state.editMode.editMode);
  const { error, setError, ready, setReady } = usePageSetup();
  const [data, setData] = useState<AboutContent | null>();

  useEffect(() => {
    useAbout(setData, setError);
    setReady(true);
  }, []);

  const updateData = (updatedData: AboutContent, section: string) => {
    setData((prevData: any) => ({
      ...prevData,
      [section]: updatedData,
    }));
  };

  return (
    <Page seoData={seoData.about} error={error} ready={ready}>
      {data && (
        <Surface maxWidth={900} j="c" a="c">
          <AboutHeader
            data={data.header}
            editMode={editMode}
            onUpdate={(updatedHeader: any) => updateData(updatedHeader, 'header')}
            setError={setError}
          />
          <Paragraph
            data={data.missionStatement}
            editMode={editMode}
            onUpdate={(updatedMission: any) => updateData(updatedMission, 'missionStatement')}
            text="Mission Statement"
            adminLink="missionstatement"
          />
          <Paragraph
            data={data.companyHistory}
            editMode={editMode}
            onUpdate={(updatedHistory: any) => updateData(updatedHistory, 'companyHistory')}
            text="Company History"
            adminLink="companyhistory"
          />
          <Values valuesData={data.values} editMode={editMode} />
          <AboutFAQ editMode={editMode} />
        </Surface>
      )}
    </Page>
  );
};
