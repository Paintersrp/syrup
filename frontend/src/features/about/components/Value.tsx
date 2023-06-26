import { FC } from 'react';

import { Text } from '@/components/Elements';
import { Icon } from '@/components/Media';
import { Editable, useEditable } from '@/features/editable';
import { defaultColors } from '@/theme';
import { Base, BaseProps } from '@/theme/base';

import { ValueType } from '../types';

interface ValueProps extends BaseProps {
  value: ValueType;
  index: number;
  start: number;
}

export const Value: FC<ValueProps> = ({ value, index, start, ...rest }) => {
  const [editableData, editConfig] = useEditable({
    name: 'value',
    endpoint: 'value/',
    data: value,
    id: value.id,
  });

  return (
    <Editable {...editConfig} {...rest}>
      <Base minw="100%" m="8px 0" className="fade-in">
        <Icon
          size="28px"
          icon={editableData.icon}
          color={index % 2 === start ? 'primary' : 'secondary'}
        />
        <Text s="1rem" fw="500" mt={4} a="c" mb={8}>
          {editableData.title}
        </Text>
      </Base>
    </Editable>
  );
};
