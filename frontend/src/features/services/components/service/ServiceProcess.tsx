import { FC, Fragment, useEffect, useState } from 'react';

import { breakPoints, palettes, useBreakpoint } from '@/utils';
import { Container, Flexer, Item, Surface } from '@/components/Containers';
import { Divider, Text } from '@/components/Elements';
import { ButtonBar } from '@/components/Built';
import { ServiceProcessImage } from './ServiceProcessImage';
import { ServiceProcessText } from './ServiceProcessText';

type ServiceProcessType = {
  contentText: any;
  processData: any;
  processImage: any;
  editMode: boolean;
};

export const ServiceProcess: FC<ServiceProcessType> = ({
  contentText,
  processData,
  processImage,
  editMode,
}) => {
  const isMediumScreen = useBreakpoint(breakPoints.md);
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
    <Container j="fs" mt={24} mb={24} a="fs">
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
        justify="flex-start"
      >
        {
          !editing ? (
            <Fragment>
              <Text t="h5" a="c" c={palettes.primary.main}>
                {contentTextData.title}
              </Text>
              <Text t="body1" a="c">
                {contentTextData.description}
              </Text>
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
      </Item>
    </Container>
  );
};
