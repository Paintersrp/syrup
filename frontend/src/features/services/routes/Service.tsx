import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Page } from '@/components/Layout';
import { usePageSetup } from '@/hooks';

import { seoData } from '@/settings';
import { Loading, Text } from '@/components/Elements';
import { useServices } from '../api/useServices';
import { ServiceContent } from '../types';
import { DisplayTable } from '@/components/Built';
import { Flexer, Surface } from '@/components/Containers';
import { Button } from '@/components/Buttons';
import { ServiceAbout } from '../components/service/ServiceAbout';
import { ServiceProcess } from '../components/service/ServiceProcess';
import { ServiceFeatures } from '../components/service/ServiceFeatures';

export const Service: FC = () => {
  const { id }: any = useParams();
  const editMode = useSelector((state: any) => state.editMode.editMode);
  const { error, setError, ready, setReady } = usePageSetup();

  const formRef = useRef<any>();

  const [data, setData] = useState<any>();
  const [fullData, setFullData] = useState<ServiceContent>();
  const [editing, setEditing] = useState(false);

  const [contentTextData, setContentTextData] = useState();
  const [tableData, setTableData] = useState();
  const [contactData, setContactData] = useState();
  const [socialData, setSocialData] = useState();
  const [processData, setProcessData] = useState();
  const [processImage, setProcessImage] = useState<any>();

  const handleApplyNowClick = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
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
    console.log('test', filteredProcessImage?.image);
    setData(filteredServiceTier);
    setProcessImage(filteredProcessImage);

    // axios
    //   .get(`/services/`)
    //   .then((response) => {
    //     setFullData(response.data.ServiceTier);
    //     const filteredServiceTier = response.data.ServiceTier.filter(
    //       (service: any) => service.id === parseInt(id)
    //     );
    //     setData(filteredServiceTier[0]);

    //     setContactData(response.data.ContactInformation);
    //     setSocialData(response.data.Socials);
    //     setProcessData(response.data.ProcessTextItem);

    //     setContentTextData(response.data.ContentTextBlock[0]);
    //     const filteredProcessImage = response.data.ProcessImageItem.filter(
    //       (image: any) => image.servicetier === filteredServiceTier[0].service_title
    //     );

    //     setProcessImage(filteredProcessImage[0]);

    //     setTableData(response.data.ServiceTable.find((tb: any) => tb.name === 'Tiers'));

    //     setReady(true);
    //   })
    //   .catch((err) => {
    //     setError(err.error);
    //   });
  }, [id, fullData]);

  if (!ready || !data || !fullData) {
    return <Loading load={true} />;
  }

  return (
    <Page seoData={seoData.services} error={error}>
      {/* {data && processData && processImage && ( */}
      {
        data && fullData && (
          <Surface px={4} py={4} m="auto" maxWidth={1100} j="c" mb={24}>
            <Flexer j="fe">
              <Button onClick={handleApplyNowClick} startIcon="approval" w={100}>
                Act Now
              </Button>
            </Flexer>
            <Text t="h2" a="c" mb={24}>
              {data.service_title}
            </Text>
            <ServiceAbout data={data} editMode={editMode} />
            <ServiceProcess
              contentText={fullData.contentText[0]}
              processData={fullData.processText}
              processImage={processImage}
              editMode={editMode}
            />
            <ServiceFeatures data={data} editMode={editMode} />
            <DisplayTable data={fullData.servicesTable[0]} links />
          </Surface>
        )

        //   <ServiceHeader data={data} handleApplyNowClick={handleApplyNowClick} />
        //   <ServiceAbout data={data} editMode={editmode.editMode} />
        //   <ServiceProcess
        //     setContentTextData={setContentTextData}
        //     contentTextData={contentTextData}
        //     processData={processData}
        //     processImage={processImage}
        //     editMode={editmode.editMode}
        //   />
        //   <ServiceFeatures data={data} editMode={editmode.editMode} />
        //   <ServicePrice data={data} editMode={editmode.editMode} />
        //   <ServiceContact
        //     data={data}
        //     formRef={formRef}
        //     contactData={contactData}
        //     socialData={socialData}
        //     editMode={editmode.editMode}
        //   />
      }
    </Page>
  );
};
