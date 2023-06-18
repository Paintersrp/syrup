import { FC, Fragment, useEffect, useState } from 'react';

import { ButtonBar } from '@/components/Built';
import { Container, Flexer, Item, Surface } from '@/components/Containers';
import { Divider, Text } from '@/components/Elements';
import { useApp, useBreakpoint } from '@/hooks';

import { ServiceProcessImage } from './ServiceProcessImage';
import { ServiceProcessText } from './ServiceProcessText';
import { colors } from '@/theme/common';

type ServiceProcessType = {
  contentText: any;
  processData: any;
  processImage: any;
};

export const ServiceProcess: FC<ServiceProcessType> = ({
  contentText,
  processData,
  processImage,
}) => {
  const { editMode }: any = useApp();
  const isMediumScreen = useBreakpoint('md');
  const [contentTextData, setContextTextData] = useState(contentText);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setContextTextData(contentText);
  }, [contentText]);

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
        lg={6}
        style={{
          paddingLeft: 8,
          display: 'flex',
          flexDirection: 'column',
          order: isMediumScreen ? 1 : 2,
        }}
        justify="center"
        align="center"
      >
        <Flexer fd="column" w="85%">
          {
            !editing ? (
              <Fragment>
                <Text t="h5" a="c" c={colors.primary.main}>
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
              {processData.map((item: any, index: number) => (
                <ServiceProcessText textItem={item} index={index} editMode={editMode} />
              ))}
            </Flexer>
          </Surface>
        </Flexer>
      </Item>
    </Container>
  );
};
