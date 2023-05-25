import React, { useEffect, useState } from "react";
import "./Values.css";

import { Text } from "../../../../framework/Base";
import { Container, Flexer, Item } from "../../../../framework/Containers";
import Value from "./components/Value";

export default function Values({ valuesData }) {
  console.log(valuesData);
  const [loading, setLoading] = useState(true);
  const [rowOne, setRowOne] = useState(null);
  const [rowTwo, setRowTwo] = useState(null);

  useEffect(() => {
    const half = Math.ceil(valuesData.length / 2);
    const row1 = [];
    const row2 = [];

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
        Edit/Admin
        {/* {editMode && <AdminButton tooltipText="Values" link="value" />} */}
      </Flexer>

      <Flexer j="sb" fd="row" className="fade-in">
        <Flexer fd="column">
          {rowOne.map((value, index) => (
            <Value value={value} index={index} start={0} />
          ))}
        </Flexer>
        <Flexer fd="column">
          {rowTwo.map((value, index) => (
            <Value value={value} index={index} start={1} />
          ))}
        </Flexer>
      </Flexer>
    </div>
  );
}
