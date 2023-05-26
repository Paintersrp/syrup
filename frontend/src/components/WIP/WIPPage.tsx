import React, { ReactElement, useState } from "react";

import { Surface, Page, Flexer, Carousel } from "../../framework/Containers";
import {
  Text,
  TransferList,
  TreeNode,
  Select,
  Option,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FAB,
} from "../../framework/Base";

import MenuExamples from "../../framework/Base/Menu/components/MenuExamples/MenuExamples";
import Tiers from "../Landing/components/test/Tiers";
import {
  SpeedDial,
  SpeedDialItem,
} from "../../framework/Base/SpeedDial/SpeedDial";

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

  const columns = ["Name", "Age", "Country"];
  const data = [
    { Name: "John Doe", Age: 25, Country: "USA" },
    { Name: "Jane Smith", Age: 30, Country: "Canada" },
    { Name: "Bob Johnson", Age: 35, Country: "UK" },
  ];

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (value: string) => {
    setSelectedValue(value);
    // Do something with the selected value
  };

  const handleItemClick = (label: string) => {
    console.log(`Clicked on "${label}"`);
  };

  return (
    <Page>
      <Flexer j="c" a="c" fd="column">
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
        {/* <MenuExamples /> */}

        <div style={{ marginBottom: 96 }}>
          <Select onChange={handleChange}>
            <Option value="Tacos">Tacos</Option>
            <Option value="Burritos">Burritos</Option>
            <Option value="Enchiladas">Enchiladas</Option>
          </Select>
        </div>

        {/* Carousel */}
        <Carousel autoplay style={{ marginBottom: 96 }}>
          <img
            src="https://source.unsplash.com/1400x901/?service"
            alt="Image 1"
          />
          <img
            src="https://source.unsplash.com/1400x902/?service"
            alt="Image 2"
          />
          <img
            src="https://source.unsplash.com/1400x903/?service"
            alt="Image 3"
          />
          <img
            src="https://source.unsplash.com/1400x900/?service"
            alt="Image 4"
          />
        </Carousel>

        {/* Tiers */}
        <Tiers />

        {/* .. */}

        <Surface maxWidth={1000} j="c" a="c" boxShadow={1} mb={8} py={0} px={0}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell s="1.05rem" fw="bold" key={index}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column, index) => (
                    <TableCell s="0.95rem" key={index}>
                      {row[column]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Surface>
        <FAB
          icon="subject"
          onClick={() => console.log("Hi")}
          style={{ marginRight: 52 }}
        />
        <SpeedDial position="bottom-right" direction="up">
          <SpeedDialItem
            label="Item 1"
            icon="cancel"
            onClick={() => console.log("Item 1 clicked")}
          />
          <SpeedDialItem
            label="Item 2"
            icon="edit"
            onClick={() => console.log("Item 2 clicked")}
          />
          <SpeedDialItem
            label="Item 3"
            icon="launch"
            onClick={() => console.log("Item 3 clicked")}
          />
        </SpeedDial>
      </Flexer>
    </Page>
  );
};

export default WIPPage;
