import React, { FC } from "react";
import "./AppDrawer.css";
import {
  faBusinessTime,
  faAddressCard,
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faUserPlus,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";

import { Flexer } from "../../../Containers";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "../../../Base";

import { ListItemDataType } from "../../../Base/Drawer/components/DrawerContent";
import DrawerFooterLinks from "../../../Base/Drawer/components/DrawerFooterLinks";
import { useSelector } from "react-redux";

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
  const auth: any = useSelector<any>((state) => state.auth);

  const linkListItemData: ListItemDataType[] = [
    { text: "About", to: "/about", icon: faAddressCard, onClick: handleClose },
    { text: "WIP", to: "/WIP", icon: faBusinessTime, onClick: handleClose },
  ];

  const unauthedBottomListItemData: ListItemDataType[] = [
    {
      text: "Login",
      to: "/login",
      icon: faArrowRightToBracket,
      onClick: handleClose,
    },
    {
      text: "Register",
      to: "/register",
      icon: faUserPlus,
      onClick: handleClose,
    },
  ];

  const authedBottomListItemData: ListItemDataType[] = [
    {
      text: "Logout",
      to: "/logout",
      icon: faArrowRightFromBracket,
      onClick: handleClose,
    },
    {
      text: "Profile",
      to: "/profile",
      icon: faIdCard,
      onClick: handleClose,
    },
  ];

  return (
    <Drawer variant={variant} open={open} onClose={handleClose} side={side}>
      <Flexer fd="column" grow style={{ color }}>
        <DrawerHeader title={companyTitle} icon={companyIcon} />
        <Flexer j="space-between" fd="column" grow>
          <DrawerContent
            items={linkListItemData}
            itemClass="drawer-list-item"
          />
          <Flexer fd="column">
            <DrawerFooterLinks
              items={
                auth.is_authenticated
                  ? authedBottomListItemData
                  : unauthedBottomListItemData
              }
              itemClass="drawer-list-item"
            />
            <DrawerFooter title={companyTitle} />
          </Flexer>
        </Flexer>
      </Flexer>
    </Drawer>
  );
};

export default AppDrawer;
