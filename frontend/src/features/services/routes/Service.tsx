import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DisplayTable } from '@/components/Built';
import { Flexer, Surface } from '@/components/Containers';
import { Loading } from '@/components/Elements';
import { Page } from '@/components/Layout';
import { usePageSetup } from '@/hooks';

import { useServices } from '../api/useServices';
import { ServiceAbout } from '../components/service/ServiceAbout';
import { ServiceProcess } from '../components/service/ServiceProcess';
import { ServiceFeatures } from '../components/service/ServiceFeatures';
import { ServicePrice } from '../components/service/ServicePrice';
import { ServiceHeader } from '../components/service/ServiceHeader';
import { ServiceContent } from '../types';
import { ServiceContact } from '../components/service/ServiceContact';
import { Button } from '@/components/Buttons';

export const Service: FC = () => {
  const { id }: any = useParams();
  const { setError, ready, setReady } = usePageSetup();

  const formRef = useRef<any>();

  const [data, setData] = useState<any>();
  const [fullData, setFullData] = useState<ServiceContent>();
  const [processImage, setProcessImage] = useState<any>();

  const handleApplyNowClick = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!ready || !data || !fullData) {
    return <Loading load={true} />;
  }

  return (
    <Page>
      <Flexer>
        <Surface px={isSidebarOpen ? 2 : 4} py={4} j="c" a="c" mt={0} mb={24} boxShadow={0} br={6}>
          <Flexer fd="column">
            <Flexer j="fe" mb={8}>
              <Button onClick={toggleSidebar}>Open</Button>
            </Flexer>
            <ServiceHeader data={data} handleApplyNowClick={handleApplyNowClick} />
            <ServiceAbout data={data} />
            <ServiceProcess
              contentText={fullData.contentText[0]}
              processData={fullData.processText}
              processImage={processImage}
            />
            <ServiceFeatures data={data} />
            <ServicePrice data={data} />
            <ServiceContact
              data={data}
              formRef={formRef}
              contactData={fullData.contactInfo}
              socialData={fullData.socials}
            />
            <DisplayTable data={fullData.servicesTable[0]} links />
          </Flexer>
        </Surface>

        {/* <Sidebar side="right" open={isSidebarOpen}>
          <Text t="h3" a="c" pt={16}>
            Sidebar Title
          </Text>
          <Text a="c" mt={4}>
            Sidebar Content
          </Text>
        </Sidebar> */}
      </Flexer>
    </Page>
  );
};
