import React, { FC } from "react";

import { Flexer } from "../../../Containers";
import { Divider, List, ListHeader, ListItem } from "../../../Base";

import { palettes } from "../../../../utils/theming/theme";
import { ListItemDataType } from "./DrawerContent";

interface DrawerFooterLinksProps {
  handleClose?: () => void;
  itemClass?: string;
  items: ListItemDataType[];
}

const DrawerFooterLinks: FC<DrawerFooterLinksProps> = ({
  items,
  itemClass,
}) => {
  return (
    <Flexer fd="column">
      <div style={{ width: "100%" }}>
        <Divider mt={0} color={palettes.primary.hover} />
      </div>
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
    </Flexer>
  );
};

export default DrawerFooterLinks;
