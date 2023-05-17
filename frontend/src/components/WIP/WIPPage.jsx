import React from "react";

import List from "../../framework/Base/List/List";
import ListItem from "../../framework/Base/List/ListItem";
import Page from "../../framework/Base/Containers/Page/Page";
import Tree from "../../framework/Base/BaseTree/BaseTree";
import Flexer from "../../framework/Base/Flexer/Flexer";

const WIPPage = ({}) => {
  return (
    <Page>
      <Flexer j="c" a="c">
        <List
          spacing={2}
          maxWidth={400}
          boxShadow={1}
          mb={2}
          pl={2}
          pt={2}
          px={1.5}
          py={0}
          br={0.5}
        >
          <ListItem
            button
            onClick={() => console.log("1")}
            text="List item 1"
            subtext="This is the subtext"
          />
          <ListItem
            button
            onClick={() => console.log("2")}
            text="List item 2"
            subtext="This is the subtext"
          />
        </List>
      </Flexer>

      <Tree label="Parent" level={0}>
        <Tree label="Child 1" level={1}>
          <Tree label="Grandchild 1" level={2} />
          <Tree label="Grandchild 2" level={2} />
        </Tree>
        <Tree label="Child 2" level={1}>
          <Tree label="Grandchild 3" level={2}></Tree>
        </Tree>
      </Tree>
    </Page>
  );
};

export default WIPPage;
