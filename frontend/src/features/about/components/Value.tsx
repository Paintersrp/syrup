import { FC, useEffect, useState } from 'react';

import { Text } from '@/components/Elements';
import { Base, BaseProps } from '@/theme/base';
import { Icon } from '@/components/Media';

import { ValueType } from '../types';
import { colors } from '@/theme/common';
import { Editable } from '@/features/editable';

interface ValueProps extends BaseProps {
  value: ValueType;
  index: number;
  start: number;
}

export const Value: FC<ValueProps> = ({ value, index, start, ...rest }) => {
  const [valueData, setValueData] = useState<ValueType>(value);

  useEffect(() => {
    setValueData(value);
  }, [value]);

  const updateValue = (updateValue: ValueType) => {
    setValueData(updateValue);
  };

  const editConfig = {
    name: 'value',
    id: valueData.id,
    data: valueData,
    endpoint: 'value/',
    onUpdate: updateValue,
    enableDelete: true,
    fade: true,
    ...rest,
  };

  return (
    <Editable {...editConfig}>
      <Base minw="100%" m="8px 0" className="fade-in">
        <Icon
          size="28px"
          icon={valueData.icon}
          css={{ color: index % 2 === start ? colors.primary.main : colors.secondary.main }}
        />
        <Text s="1rem" fw="500" mt={4} a="c" mb={8}>
          {valueData.title}
        </Text>
      </Base>
    </Editable>
  );
};
