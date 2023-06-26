import { FC } from 'react';

import { SlideOnScroll } from '@/components/Animation';
import { Flexer } from '@/components/Containers';
import { Text } from '@/components/Elements';
import { Icon } from '@/components/Media';
import { Editable, useEditable } from '@/features/editable';
import { BaseProps } from '@/theme/base';

import { ProcessContent } from '../types';

interface ProcessProps extends BaseProps {
  data: ProcessContent;
  editMode: boolean;
}

export const Process: FC<ProcessProps> = ({ data, editMode, ...rest }) => {
  const [editableData, editConfig] = useEditable({
    name: 'process',
    data: data,
    id: data.id,
    endpoint: 'process/',
    enableDelete: true,
    editMenuPosition: 'bottom',
    formSettings: {
      width: 325,
    },
  });

  return (
    <SlideOnScroll from="below">
      <Editable {...editConfig} {...rest}>
        <Flexer fd="column" j="c" a="c" mt={12} {...rest}>
          <Icon icon={editableData.icon} color="secondary" size="28px" />
          <Text t="h4" a="c" mt={8} s="1.5rem" fw={700}>
            {editableData.title}
          </Text>
          <Text t="body1" mt={4} a="c" s="0.95rem" fw={500}>
            {editableData.description}
          </Text>
        </Flexer>
      </Editable>
    </SlideOnScroll>
  );
};
