import React from "react";
import "./Summary.css";

import Divider from "../../../../framework/Base/Divider/Divider";
import Flexer from "../../../../framework/Containers/Flexer/Flexer";
import Section from "../../../../framework/Containers/Section/Section";
import Text from "../../../../framework/Base/Text/Text";
import { Data } from "../../Tracker";

interface SummaryLineProps {
  text: string;
  value: number | string;
}

interface SummaryItemProps {
  header: string;
  data: Data[];
}

interface SummaryProps {
  incomes: Data[];
  expenses: Data[];
}

const calculateTotal = (items: Data[], type: string) => {
  return items
    .filter((item) => item.type === type)
    .reduce((total, item) => {
      return total + item.amount;
    }, 0);
};

const SummaryLine: React.FC<SummaryLineProps> = ({ text, value }) => {
  return (
    <Flexer j="sb" a="c">
      <Text t="body1" a="l" mt={4} mb={4}>
        {text}
      </Text>
      <Text t="body1" a="r">
        ${value}
      </Text>
    </Flexer>
  );
};

const SummaryItem: React.FC<SummaryItemProps> = ({ header, data }) => {
  return (
    <div className="summary-category">
      <Text t="h4" mb={2}>
        {header}
      </Text>
      <Divider />
      <SummaryLine text="One Time:" value={calculateTotal(data, "One-Time")} />
      <Divider />
      <SummaryLine
        text="Recurring:"
        value={calculateTotal(data, "Recurring")}
      />
      <Divider />
      <SummaryLine
        text="Total:"
        value={`${
          calculateTotal(data, "One-Time") + calculateTotal(data, "Recurring")
        }`}
      />
      <Divider />
    </div>
  );
};

const Summary: React.FC<SummaryProps> = ({ incomes, expenses }) => {
  return (
    <Section
      maxWidth={1000}
      boxShadow={1}
      br={1}
      pl={2}
      pr={2}
      mt={3}
      pt={0}
      pad={2}
      header="Summary"
      divider
      gutter
    >
      <Flexer j="sb">
        <SummaryItem header="Income" data={incomes} />
        <SummaryItem header="Expenses" data={expenses} />
      </Flexer>
      <div style={{ width: "100%" }}>
        <Divider ml={16} mr={16} mt={16} />
      </div>
      <div className="summary-total">
        <Text t="h5" a="l" mt={4} mb={4} style={{ fontWeight: 500 }}>
          Remaining Balance:
        </Text>
        <Text t="h5" a="r" className="summary-balance">
          $
          {calculateTotal(incomes, "One-Time") +
            calculateTotal(incomes, "Recurring") -
            calculateTotal(expenses, "One-Time") -
            calculateTotal(expenses, "Recurring")}
        </Text>
      </div>
      <div style={{ width: "100%" }}>
        <Divider ml={16} mr={16} />
      </div>
    </Section>
  );
};

export default Summary;
