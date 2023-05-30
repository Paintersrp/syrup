import React, { useEffect, useState } from "react";
import "./Values.css";

import { Text } from "../../../../framework/Base";
import { Flexer } from "../../../../framework/Containers";
import { ButtonBar } from "../../../../framework/Prebuilt";
import { Value } from "./components";

export interface ValueType {
  id: number;
  title: string;
  icon: string;
}
interface ValuesProps {
  valuesData: ValueType[];
  editMode: boolean;
}

const Values: React.FC<ValuesProps> = ({ valuesData, editMode }) => {
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
    <div className="values-root">
      <Flexer j="sb" className="values-container">
        <Text t="h3">Core Values</Text>
        {editMode && (
          <ButtonBar adminLink="About" tooltipPosition="top" text="Values" />
        )}
      </Flexer>

      <Flexer j="sb" fd="row" className="fade-in">
        <Flexer fd="column">
          {rowOne &&
            rowOne.map((value, index) => (
              <Value
                key={value.id}
                value={value}
                index={index}
                start={0}
                editMode={editMode}
              />
            ))}
        </Flexer>
        <Flexer fd="column" mt={32} mb={32}>
          {rowTwo &&
            rowTwo.map((value, index) => (
              <Value
                key={value.id}
                value={value}
                index={index}
                start={1}
                editMode={editMode}
              />
            ))}
        </Flexer>
      </Flexer>
    </div>
  );
};

export default Values;
