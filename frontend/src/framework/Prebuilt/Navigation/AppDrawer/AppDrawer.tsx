import React, { FC } from "react";
import { Divider, Drawer, DrawerHead, List, ListItem } from "../../../Base";
import {
  faCoins,
  faEdit,
  faCancel,
  faBold,
  faBorderStyle,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import "./AppDrawer.css";
import { palettes } from "../../../../theme";

interface AppDrawerProps {
  open?: boolean;
  handleClose?: () => void;
  variant?: "standard" | "permanent" | "persistent";
  side?: "left" | "right";
  color?: string;
  companyIcon?: string | undefined | any;
  companyTitle?: string | undefined;
}

const AppDrawer: FC<AppDrawerProps> = ({
  open = false,
  handleClose = () => {},
  variant = "standard",
  side = "left",
  color = "#F5F5F5",
  companyIcon = undefined,
  companyTitle = undefined,
}) => {
  return (
    <Drawer variant={variant} open={open} onClose={handleClose} side={side}>
      <div style={{ color }}>
        <DrawerHead title={companyTitle} icon={companyIcon} />
        <List j="c" a="c" spacing={0} maxWidth={400} boxShadow={0} px={0}>
          <ListItem
            button
            text="List item 1"
            className="drawer-list-item"
            icon={faEdit}
            iconColor="secondary"
            onClick={handleClose}
          />

          <ListItem
            button
            text="List item 2"
            className="drawer-list-item"
            onClick={handleClose}
          />
        </List>
        <div style={{ width: "100%" }}>
          <Divider mt={0} color={palettes.primary.hover} />
        </div>
      </div>
    </Drawer>
  );
};

export default AppDrawer;
