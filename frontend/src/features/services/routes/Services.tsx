import { FC, useEffect, useState } from 'react';

import { DisplayTable } from '@/components/Built';
import { Surface } from '@/components/Containers';
import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';
import { usePageSetup } from '@/hooks';

import { handleResetQuiz } from '../api/useQuestionnaire';
import { useServices } from '../api/useServices';
import { Questionnaire } from '../components/services/Questionnaire';
import { Results } from '../components/services/Results';
import { Benefits } from '../components/services/Benefits';
import { ServiceContent, ServiceType } from '../types';
import { useEditModeStore } from '@/stores/editmode';

export const Services: FC = () => {
  const { editMode } = useEditModeStore();
  const { error, setError, ready, setReady } = usePageSetup();

  const [data, setData] = useState<ServiceContent>();
  const [recommended, setRecommended] = useState<ServiceType | undefined>();

  useEffect(() => {
    useServices(setData, setError);
    setReady(true);
  }, []);

  if (!ready || !data) {
    return <Loading load={true} />;
  }

  return (
    <Page header="Explore Our Services">
      {data && (
        <Surface j="c" a="c" maxWidth={1200} outerStyle={{ flexGrow: 1 }}>
          {!recommended ? (
            <Questionnaire
              services={data.services}
              setRecommended={setRecommended}
              quizData={data.quizData}
              editMode={editMode}
            />
          ) : (
            <Results
              services={data.services}
              recommended={recommended}
              handleReset={() => handleResetQuiz(setRecommended)}
              editMode={editMode}
            />
          )}
          <DisplayTable size="xlarge" data={data.servicesTable[0]} mt={60} links />
          <Benefits benefits={data.benefits} headerData={data.benefitsHeader} editMode={editMode} />
        </Surface>
      )}
    </Page>
  );
};
