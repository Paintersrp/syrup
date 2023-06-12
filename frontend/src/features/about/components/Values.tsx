import React, { useEffect, useState } from 'react';

import { ButtonBar } from '@/components/Built';
import { Flexer } from '@/components/Containers';
import { Base, BaseProps, Text } from '@/components/Elements';

import { ValueType } from '../types';
import { Value } from './Value';
import './css/Values.css';

interface ValuesProps extends BaseProps {
  valuesData: ValueType[];
  editMode: boolean;
}

export const Values: React.FC<ValuesProps> = ({ valuesData, editMode, ...rest }) => {
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
    return null;
  }

  return (
    <Base className="values-root" {...rest}>
      <Flexer j="sb" className="values-container">
        <Text t="h3">Core Values</Text>
        {editMode && <ButtonBar adminLink="About" tooltipPosition="top" text="Values" />}
      </Flexer>

      <Flexer j="sb" fd="row" className="fade-in" mt={0} mb={32}>
        <Flexer fd="column" j="fs">
          {rowOne &&
            rowOne.map((value, index) => (
              <Value key={value.id} value={value} index={index} start={0} editMode={editMode} />
            ))}
        </Flexer>
        <Flexer fd="column" j="fs">
          {rowTwo &&
            rowTwo.map((value, index) => (
              <Value key={value.id} value={value} index={index} start={1} editMode={editMode} />
            ))}
        </Flexer>
      </Flexer>
    </Base>
  );
};
