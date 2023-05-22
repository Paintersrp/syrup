import React, { ReactElement, useRef, useState } from "react";

import {
  Button,
  Text,
  TransferList,
  TreeNode,
  Menu,
  MenuItem,
  List,
  ListItem,
  Select,
  Option,
} from "../../framework/Base";

import { Surface, Page, Flexer } from "../../framework/Containers";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import MenuExamples from "../../framework/Base/Menu/components/MenuExamples/MenuExamples";

const WIPPage = (): ReactElement => {
  const leftItems = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
    { id: "4", name: "Item 4" },
  ];

  const rightItems = [
    { id: "5", name: "Item 5" },
    { id: "6", name: "Item 6" },
    { id: "7", name: "Item 7" },
  ];

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
    // Do something with the selected value
  };

  return (
    <Page>
      <Flexer j="c" a="c" fd="column">
        <List
          j="c"
          a="c"
          spacing={2}
          maxWidth={400}
          boxShadow={1}
          mt={2}
          mb={1}
          px={1.5}
          py={0}
        >
          <ListItem text="List item 1" subtext="This is the subtext" />
          <ListItem
            button
            onClick={() => console.log("2")}
            text="List item 2"
            subtext="This is the subtext"
          />
        </List>
        <Surface
          j="c"
          a="c"
          maxWidth={400}
          minHeight={100}
          boxShadow={1}
          px={1.5}
          py={1.5}
          mt={1}
          mb={2}
        >
          <TreeNode label="Parent" startOpen>
            <Text a="l" t="h6" style={{ fontWeight: 400 }}>
              Text Node Parent 1-1
            </Text>
            <TreeNode label="Child 1">
              <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                Text Node Child 1-1
              </Text>
              <TreeNode label="Grandchild 1">
                <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                  Text Node Grandchild 1-1
                </Text>
                <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                  Text Node Grandchild 1-2
                </Text>
              </TreeNode>
              <TreeNode label="Grandchild 2">
                <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                  Text Node Grandchild 2-1
                </Text>
              </TreeNode>
            </TreeNode>
            <TreeNode label="Child 2">
              <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                Text Node Child 2-1
              </Text>
              <TreeNode label="Grandchild 3">
                <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                  Text Node Grandchild 3-1
                </Text>
                <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                  Text Node Grandchild 3-2
                </Text>
                <Text a="l" t="h6" style={{ fontWeight: 400 }}>
                  Text Node Grandchild 3-3
                </Text>
              </TreeNode>
            </TreeNode>
          </TreeNode>
        </Surface>

        <TransferList leftItems={leftItems} rightItems={rightItems} />

        <MenuExamples />
        <div style={{ marginBottom: 96 }}>
          <Select onChange={handleChange}>
            <Option value="Tacos">Tacos</Option>
            <Option value="Burritos">Burritos</Option>
            <Option value="Enchiladas">Enchiladas</Option>
          </Select>
        </div>
      </Flexer>
    </Page>
  );
};

export default WIPPage;
