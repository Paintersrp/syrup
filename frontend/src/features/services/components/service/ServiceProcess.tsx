import { FC, Fragment, useEffect, useState } from 'react';

import { Container, Flexer, Item, Surface } from '@/components/Containers';
import { Divider, Text } from '@/components/Elements';
import { useBreakpoint } from '@/hooks';

import { ServiceProcessImage } from './ServiceProcessImage';
import { ServiceProcessText } from './ServiceProcessText';
import { colors } from '@/theme/common';
import { useEditModeStore } from '@/stores/editmode';
import { useServiceData } from './ServiceProvider';
import { ButtonBar } from '@/features/editable';

type ServiceProcessType = {
  processImage: any;
};

export const ServiceProcess: FC<ServiceProcessType> = ({ processImage }) => {
  const { fullData } = useServiceData();
  const { editMode } = useEditModeStore();
  const isMediumScreen = useBreakpoint('md');

  const [contentTextData, setContextTextData] = useState(fullData.contentText[0]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setContextTextData(fullData.contentText[0]);
  }, [fullData.contentText]);

  const updateContentTextData = (updateContentTextData: any) => {
    setContextTextData(updateContentTextData);
    setEditing(false);
  };

  return (
    <Container a="fs" mt={24} mb={64}>
      <ServiceProcessImage imageItem={processImage} editMode={editMode} />
      <Item
        xs={12}
        sm={12}
        md={12}
        lg={4}
        style={{
          paddingLeft: 8,
          display: 'flex',
          flexDirection: 'column',
          order: isMediumScreen ? 1 : 2,
        }}
        justify="center"
        align="center"
      >
        <Flexer fd="column" w="100%">
          {
            !editing ? (
              <Fragment>
                <Text t="h5" a="c" c="primary">
                  {contentTextData.title}
                </Text>
                {/* <Text t="body1" a="c">
                {contentTextData.description}
              </Text> */}
                <Divider mt={8} mb={8} />
              </Fragment>
            ) : null
            //   <ProcessTextEdit
            //     item={contentTextData}
            //     updateProcess={updateContentTextData}
            //     handleCancel={() => setEditing(!editing)}
            //     excludeKeys={['id', 'slug']}
            //     multilineKeys={['description']}
            //     iconMixin={false}
            //     title="Edit Content Text Block Item"
            //     endpoint="contenttextblock"
            //   />
          }
          {!editing && editMode && (
            <ButtonBar
              editClick={() => setEditing(!editing)}
              adminLink="contenttextblock"
              text="Content Text Block"
              obj={contentTextData.id}
            />
          )}
          <Surface px={0} py={0}>
            <Flexer fd="column" gap={8}>
              {fullData.processText.map((item: any, index: number) => (
                <ServiceProcessText textItem={item} index={index} editMode={editMode} />
              ))}
            </Flexer>
          </Surface>
        </Flexer>
      </Item>
    </Container>
  );
};
