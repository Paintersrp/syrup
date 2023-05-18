import React, { ReactElement } from "react";
import Flexer from "../../framework/Containers/Flexer/Flexer";
import List from "../../framework/Base/List/List";
import ListItem from "../../framework/Base/List/ListItem";
import Page from "../../framework/Containers/Page/Page";
import { Text, TreeNode } from "../../framework/Base";
import { Surface } from "../../framework/Containers";

const WIPPage = (): ReactElement => {
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
      </Flexer>
    </Page>
  );
};

export default WIPPage;
