import { FC, useEffect, useState } from 'react';

import { ButtonBar } from '@/components/Built';
import { Flexer } from '@/components/Containers';
import { Loading, Text } from '@/components/Elements';
import { Base, BaseProps } from '@/theme/base';

import { ValueType } from '../types';
import { Value } from './Value';
import { useEditModeStore } from '@/stores/editmode';

interface ValuesProps extends BaseProps {
  valuesData: ValueType[];
}

export const Values: FC<ValuesProps> = ({ valuesData, ...rest }) => {
  const { editMode } = useEditModeStore();
  const [loading, setLoading] = useState(true);
  const [rowOne, setRowOne] = useState<ValueType[] | null>(null);
  const [rowTwo, setRowTwo] = useState<ValueType[] | null>(null);

  useEffect(() => {
    const half = Math.ceil(valuesData.length / 2);
    const row1: ValueType[] = [];
    const row2: ValueType[] = [];

    for (let i = 0; i < valuesData.length; i++) {
      if (i < half) {
        row1.push(valuesData[i]);
      } else {
        row2.push(valuesData[i]);
      }
    }

    setRowOne(row1);
    setRowTwo(row2);
    setLoading(false);
  }, [valuesData]);

  if (loading) {
    return <Loading load={true} />;
  }

  return (
    <Base mb={32} {...rest}>
      <Flexer j="sb" mb={12} pb={4} css={{ borderBottom: '1px solid #222' }}>
        <Text t="h3" fw="bold">
          Core Values
        </Text>
        {editMode && <ButtonBar adminLink="About" tooltipPosition="top" text="Values" />}
      </Flexer>

      <Flexer j="sb" fd="row" className="fade-in" mt={0} mb={32}>
        <Flexer fd="column" j="fs">
          {rowOne &&
            rowOne.map((value, index) => (
              <Value key={value.id} value={value} index={index} start={0} />
            ))}
        </Flexer>
        <Flexer fd="column" j="fs">
          {rowTwo &&
            rowTwo.map((value, index) => (
              <Value key={value.id} value={value} index={index} start={1} />
            ))}
        </Flexer>
      </Flexer>
    </Base>
  );
};
