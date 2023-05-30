import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AppDrawer.css";
import {
  faBusinessTime,
  faAddressCard,
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faUserPlus,
  faIdCard,
  faHome,
  faWrench,
  faEdit,
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
import { LogoutUser } from "../../../../utils";

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
  const dispatch = useDispatch();
  const auth: any = useSelector<any>((state) => state.auth);
  const editmode: any = useSelector<any>((state) => state.editMode);

  const handleEditClick = () => {
    if (editmode.editMode) {
      dispatch({ type: "TOGGLE_EDITMODE_OFF" });
    } else {
      dispatch({ type: "TOGGLE_EDITMODE_ON" });
    }
    handleClose();
  };

  const handleLogout = () => {
    LogoutUser();
    handleClose();
  };

  const linkListItemData: ListItemDataType[] = [
    { text: "Home", to: "/", icon: faHome, onClick: handleClose },
    { text: "About", to: "/about", icon: faAddressCard, onClick: handleClose },
    { text: "WIP", to: "/WIP", icon: faBusinessTime, onClick: handleClose },
  ];

  const unauthedBottomListItemData: ListItemDataType[] = [
    {
      text: "Register",
      to: "/register",
      icon: faUserPlus,
      onClick: handleClose,
    },
    {
      text: "Login",
      to: "/login",
      icon: faArrowRightToBracket,
      onClick: handleClose,
    },
  ];

  const authedBottomListItemData: ListItemDataType[] = [
    {
      text: "Edit Mode",
      to: "",
      icon: faEdit,
      onClick: handleEditClick,
    },
    {
      text: "Admin",
      to: "/admin",
      icon: faWrench,
      onClick: handleClose,
    },
    {
      text: "Profile",
      to: "/profile",
      icon: faIdCard,
      onClick: handleClose,
    },
    {
      text: "Logout",
      to: "/logout",
      icon: faArrowRightFromBracket,
      onClick: handleLogout,
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
