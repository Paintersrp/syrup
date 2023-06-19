import { FC, useEffect, useState } from 'react';

import { ButtonBar } from '@/components/Built';
import { Container, Flexer, Item } from '@/components/Containers';
import { Divider, Text } from '@/components/Elements';
import { IconTextItem } from '@/components/Media';

import { colors } from '@/theme/common';
import { useEditModeStore } from '@/stores/editmode';

type ServiceFeatureProps = {
  data: any;
  editMode: boolean;
  title: string;
  fieldName: string;
};

const ServiceFeature: FC<ServiceFeatureProps> = ({ data, editMode, title, fieldName }) => {
  const [featureData, setFeatureData] = useState(data);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setFeatureData(data);
  }, [data]);

  const updateFeatureData = (updateFeatureData: any) => {
    setFeatureData(updateFeatureData);
    setEditing(false);
  };

  return (
    <Item xs={12} sm={12} md={12} lg={6} style={{ display: 'flex', flexDirection: 'column' }}>
      {
        !editing ? (
          <Flexer fd="column" w="85%">
            {!editing && editMode && (
              <ButtonBar
                editClick={() => setEditing(!editing)}
                adminLink="servicetier"
                text="Service Tier"
                obj={featureData.id}
              />
            )}
            <Text t="h5" a="c" c={colors.primary.main}>
              {title}
            </Text>
            <Divider mb={2} mt={2} />
            <Flexer fd="column" a="c" gap={2}>
              {featureData[fieldName].map((item: any, index: number) => (
                <IconTextItem
                  key={`${fieldName}-${index}`}
                  icon="check"
                  text={item.detail}
                  iconColor={index % 2 === 0 ? colors.secondary.main : colors.primary.main}
                  fontSize="1rem"
                  iconSize="24px"
                  fw="400"
                />
              ))}
            </Flexer>
          </Flexer>
        ) : null
        //   <ManyToManyEdit
        //     data={featureData}
        //     updateData={updateFeatureData}
        //     endpoint="servicetier"
        //     handleCancel={() => setFeatureEditing(!featureEditing)}
        //     id={featureData.id}
        //     fieldName="features"
        //     title="Edit Features"
        //   />
      }
    </Item>
  );
};

type ServiceFeaturesProps = {
  data: any;
};

export const ServiceFeatures: FC<ServiceFeaturesProps> = ({ data }) => {
  const { editMode }: any = useEditModeStore();
  const [featureData, setFeatureData] = useState(data);

  useEffect(() => {
    setFeatureData(data);
  }, [data]);

  return (
    <Container direction="row" j="fs" a="fs" mt={24} mb={64}>
      <ServiceFeature
        data={featureData}
        editMode={editMode}
        title="Key Features"
        fieldName="features"
      />
      <ServiceFeature
        data={featureData}
        editMode={editMode}
        title="Supported Sites"
        fieldName="supported_sites"
      />
    </Container>
  );
};
