import React from "react";
import {
  ActionButton,
  Divider,
  Text,
  Tooltip,
} from "../../../../../../framework/Base";
import { Flexer } from "../../../../../../framework/Containers";

import { palettes } from "../../../../../../theme";
import { Data } from "../../../../Tracker";

const exampleIncome = [
  { name: "Example Income 1", type: "One-Time", amount: "100" },
  { name: "Example Income 2", type: "Recurring", amount: "200" },
];
const exampleExpenses = [
  { name: "Example Expense 1", type: "Recurring", amount: "35" },
  { name: "Example Expense 2", type: "One-Time", amount: "82" },
  { name: "Example Expense 3", type: "Recurring", amount: "35" },
  { name: "Example Expense 4", type: "One-Time", amount: "82" },
  { name: "Example Expense 5", type: "Recurring", amount: "35" },
  { name: "Example Expense 6", type: "One-Time", amount: "82" },
];

interface ItemActionProps {
  text: string;
  type: "edit" | "cancel";
  color: string;
}

const ItemAction: React.FC<ItemActionProps> = ({ text, type, color }) => {
  return (
    <span style={{ marginLeft: type === "edit" ? 8 : 0 }}>
      <Tooltip text={text}>
        <ActionButton
          fontSize="1.1rem"
          size="t"
          type={type}
          color="#f5f5f5"
          style={{ boxShadow: "none" }}
          iconStyle={{ color: color }}
        />
      </Tooltip>
    </span>
  );
};

interface ItemProps {
  index: number;
  item: Data;
  divider: boolean;
}

const Item: React.FC<ItemProps> = ({ index, item, divider }) => {
  return (
    <>
      <Flexer key={index} j="sb" mt={4}>
        <Text t="body1" a="l">
          {item.name}
        </Text>
        <Flexer>
          <Text t="body1" a="r">
            {item.type}
          </Text>
          <Text t="body1" a="r">
            ${item.amount}
          </Text>
        </Flexer>
        <ItemAction text="Edit" type="edit" color={palettes.success.main} />
        <ItemAction text="Delete" type="cancel" color={palettes.error.main} />
      </Flexer>
      {divider && (
        <div style={{ width: "100%" }}>
          <Divider />
        </div>
      )}
    </>
  );
};

interface ItemReportProps {
  dataArray: Data[];
  headerText: string;
}

const ItemReport: React.FC<ItemReportProps> = ({ dataArray, headerText }) => {
  let exampleItems: any;

  if (headerText === "Incomes") {
    exampleItems = exampleIncome;
  } else {
    exampleItems = exampleExpenses;
  }

  return (
    <Flexer a="fs">
      <Flexer fd="column" pl={0} mt={2} mb={2}>
        <Flexer key="legend" j="sb">
          <Text t="body1" a="l">
            {headerText}
          </Text>
          <Flexer>
            <Text t="body1" a="r" mr={30}>
              Type
            </Text>
            <Text t="body1" a="r" mr={55}>
              Amount
            </Text>
          </Flexer>
        </Flexer>
        <div style={{ width: "100%" }}>
          <Divider />
        </div>

        {dataArray.length > 1 ? (
          <>
            {dataArray.map((item, index) => (
              <Item
                key={index}
                index={index}
                item={item}
                divider={index !== dataArray.length - 1}
              />
            ))}
          </>
        ) : (
          <>
            {exampleItems.map((item, index) => (
              <Item
                key={index}
                index={index}
                item={item}
                divider={index !== exampleItems.length - 1}
              />
            ))}
          </>
        )}
      </Flexer>
    </Flexer>
  );
};

export default ItemReport;
