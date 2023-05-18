import React, { FC, ReactNode, MouseEvent } from "react";
import { Drawer, DrawerHead } from "../../../Base";

interface AppDrawerProps {
  open?: boolean;
  handleClose?: () => void;
  variant?: "standard" | "permanent" | "persistent";
  side?: "left" | "right";
  color?: string;
  companyIcon?: string | undefined;
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
        <h2>My Drawer</h2>
        <p>This is the content of my drawer.</p>
      </div>
    </Drawer>
  );
};

export default AppDrawer;
