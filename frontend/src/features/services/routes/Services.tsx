import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Page } from '@/components/Layout';
import { usePageSetup } from '@/hooks';
import { seoData } from '@/settings';

import { useServices } from '../api/useServices';
import { Surface } from '@/components/Containers';
import { Questionnaire } from '../components/Questionnaire';

export const Services: FC = () => {
  const editMode: boolean = useSelector((state: any) => state.editMode.editMode);
  const { error, setError, ready, setReady } = usePageSetup();
  const [data, setData] = useState<any>();

  const [recommendedServices, setRecommendedServices] = useState(null);
  const [unrecommendedServices, setUnrecommendedServices] = useState([]);

  useEffect(() => {
    useServices(setData, setError);
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <Page seoData={seoData.services} error={error} ready={ready}>
      {data && (
        <Surface j="c" a="c" outerStyle={{ flexGrow: 1 }}>
          {!recommendedServices ? (
            <Questionnaire
              services={data.services}
              setRecommendedServices={setRecommendedServices}
              setUnrecommendedServices={setUnrecommendedServices}
              quizData={data.quizData}
              editMode={editMode}
            />
          ) : null}
          {/* <Quiz
        serviceData={data.ServiceTier}
        servicesTableData={servicesTable}
        competitorsTableData={competitorsTable}
        benefitsData={data.Benefits}
        blockData={data.TitleBlock[0]}
        quizData={quizData}
        editMode={editmode.editMode}
      /> */}
        </Surface>
      )}
    </Page>
  );
};
