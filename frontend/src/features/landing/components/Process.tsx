import { FC, useState } from 'react';

import { SlideOnScroll } from '@/components/Animation';
import { Flexer } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { Icon } from '@/components/Media';
import { Editable } from '@/features/editable';
import { BaseProps } from '@/theme/base';

import { ProcessContent } from '../types';

interface ProcessProps extends BaseProps {
  data: ProcessContent;
  editMode: boolean;
}

export const Process: FC<ProcessProps> = ({ data, editMode, ...rest }) => {
  const [featureData, setFeatureData] = useState(data);

  const updateProcess = (updatedProcess: typeof featureData) => {
    setFeatureData(updatedProcess);
  };

  const editConfig = {
    name: 'process',
    data: featureData,
    endpoint: `process/${featureData.id}/`,
    editMenuPosition: 'bottom',
    onUpdate: updateProcess,
    id: featureData.id,
    formSettings: {
      width: 325,
    },
    ...rest,
  };

  return (
    <SlideOnScroll from="below">
      <Editable {...editConfig}>
        <Flexer fd="column" j="c" a="c" mt={12} {...rest}>
          <Icon icon={featureData.icon} color="secondary" size="28px" />
          <Text t="h4" a="c" mt={8} s="1.5rem" fw={700}>
            {featureData.title}
          </Text>
          <Text t="body1" mt={4} a="c" s="0.95rem" fw={500}>
            {featureData.description}
          </Text>
        </Flexer>
      </Editable>
    </SlideOnScroll>
  );
};
