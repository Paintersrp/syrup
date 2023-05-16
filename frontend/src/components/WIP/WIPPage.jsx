import React from "react";

import List from "../../framework/Base/List/List";
import ListItem from "../../framework/Base/List/ListItem";
import Page from "../../framework/Base/Containers/Page/Page";
import Tree from "../../framework/Base/BaseTree/BaseTree";

const WIPPage = ({}) => {
  return (
    <Page>
      <List>
        <ListItem
          primary="List item 1"
          secondary="This is the secondary text"
        />
        <ListItem
          primary="List item 1"
          secondary="This is the secondary text"
        />
      </List>
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
