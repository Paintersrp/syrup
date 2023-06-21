import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DisplayTable } from '@/components/Built';
import { Loading, Text } from '@/components/Elements';
import { Page } from '@/components/Layout';
import { usePageSetup } from '@/hooks';

import { useServices } from '../api/useServices';
import { ServiceProcess } from '../components/service/ServiceProcess';
import { ServiceContent } from '../types';
import { ServiceContact } from '../components/service/ServiceContact';
import { ServiceProvider } from '../components/service/ServiceProvider';
import { ServiceInformation } from '../components/service/ServiceInformation';
import { defaultColors } from '@/theme';

export const Service: FC = () => {
  const { id }: any = useParams();
  const { setError, ready, setReady } = usePageSetup();

  const [data, setData] = useState<any>();
  const [fullData, setFullData] = useState<ServiceContent>();
  const [processImage, setProcessImage] = useState<any>();

  useEffect(() => {
    useServices(setFullData, setError, setData, setProcessImage, id);
    setReady(true);
  }, []);

  useEffect(() => {
    const filteredServiceTier = fullData?.services.filter(
      (service: any) => service.id === parseInt(id)
    )[0];

    const filteredProcessImage = fullData?.processImage.filter(
      (image: any) => image.servicetier === filteredServiceTier?.service_title
    )[0];

    setData(filteredServiceTier);
    setProcessImage(filteredProcessImage);
  }, [id, fullData]);

  if (!ready || !data || !fullData) {
    return <Loading load={true} />;
  }

  const tableData = fullData.servicesTable[0];

  return (
    <Page>
      <ServiceProvider data={data} fullData={fullData}>
        <ServiceInformation />
        <ServiceContact />
        <ServiceProcess processImage={processImage} />
        <DisplayTable size="large" data={tableData} links />
      </ServiceProvider>
    </Page>
  );
};
