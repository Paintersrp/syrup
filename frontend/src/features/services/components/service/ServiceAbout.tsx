import { FC, useEffect, useState } from 'react';

import { ButtonBar } from '@/components/Built';
import { Container, Flexer, Item } from '@/components/Containers';
import { Base, Divider, Text } from '@/components/Elements';

import { Media } from '@/components/Media';

import { ServiceType } from '../../types';
import { colors } from '@/theme/common';
import { useEditModeStore } from '@/stores/editmode';
import { FormGenerator } from '@/features/editable/components/FormGenerator';

type ServiceAboutProps = {
  data: ServiceType;
};

export const ServiceAbout: FC<ServiceAboutProps> = ({ data }) => {
  const { editMode }: any = useEditModeStore();
  const [aboutData, setAboutData] = useState(data);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setAboutData(data);
  }, [data]);

  const updateService = (updateService: ServiceType) => {
    setAboutData(updateService);
    setEditing(false);
  };

  return (
    <Base mb={64}>
      {!editing && editMode && (
        <ButtonBar
          justifyContent="flex-end"
          editClick={() => setEditing(!editing)}
          adminLink="servicetier"
          text="Service"
          obj={aboutData.id}
          mb={8}
        />
      )}
      {!editing ? (
        <Container j="fs" a="fs" mb={24}>
          <Item xs={12} sm={12} md={12} lg={6}>
            <Flexer fd="column" w="85%">
              <Text t="h5" a="c" c={colors.primary.main}>
                About Our {aboutData.service_title} Service
              </Text>
              <Divider mt={8} mb={8} text="test" color={colors.primary.light} />
              <Text t="body1" mb={8}>
                {aboutData.paragraph_one}
              </Text>
              <Text t="body1" mb={8}>
                {aboutData.paragraph_two}
              </Text>
              <Text t="body1" mb={16}>
                {aboutData.paragraph_three}
              </Text>
            </Flexer>
          </Item>
          <Item xs={12} sm={12} md={12} lg={6} align="flex-start">
            <Base minw="85%" bs={1} br={8}>
              <Media src={aboutData.image} altText={aboutData.service_title} />
            </Base>
          </Item>
        </Container>
      ) : (
        <Flexer j="c" mb={24}>
          <FormGenerator
            title="Edit Service Header Item"
            endpoint={`servicetier/${data.id}/`}
            data={data}
            onUpdate={updateService}
            handleCancel={() => setEditing(!editing)}
            width="50%"
            excludeKeys={['id', 'image', 'features', 'supported_sites', 'price', 'service_title']}
            multilineKeys={['paragraph_one', 'paragraph_two', 'paragraph_three']}
            px={3}
            py={3}
            br={8}
            placement="bottom"
            imageMixin
            boxShadow
          />
        </Flexer>
      )}
    </Base>
  );
};
