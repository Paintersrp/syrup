import React, { FC } from "react";

import { Flexer } from "../../../Containers";
import { Divider, List, ListItem } from "../../../Base";

import { palettes } from "../../../../utils/theming/theme";

interface DrawerContentProps {
  handleClose?: () => void;
  itemClass?: string;
  items: ListItemDataType[];
}

export interface ListItemDataType {
  text: string;
  to: string;
  icon?: any;
  onClick?: () => void;
}

const DrawerContent: FC<DrawerContentProps> = ({ items, itemClass }) => {
  return (
    <Flexer fd="column">
      <List j="c" a="c" spacing={2} maxWidth={400} boxShadow={0} px={0}>
        {items.map((item, index) => (
          <ListItem
            key={index}
            className={itemClass}
            text={item.text}
            icon={item.icon}
            iconColor={item.icon ? "secondary" : ""}
            onClick={item.onClick}
            textAlign="center"
            to={item.to}
          />
        ))}
      </List>
      <div style={{ width: "100%" }}>
        <Divider mt={0} color={palettes.primary.hover} />
      </div>
    </Flexer>
  );
};

export default DrawerContent;
