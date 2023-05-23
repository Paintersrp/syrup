import React, { ReactNode } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import "./MenuItem.css";

import Icon from "../../../Icon/Icon";
import { Flexer } from "../../../../Containers";

interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: IconDefinition;
  isActive?: boolean;
  textAlign?: "left" | "right" | "center";
  iconColor?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
  icon,
  isActive = false,
  textAlign = "left",
  iconColor = "primary",
}) => {
  const menuItemClassName = `menu-item ${isActive ? "active" : ""}`;

  return (
    <div className={menuItemClassName} onClick={onClick}>
      {icon ? (
        <Flexer j="sb">
          <span
            className="menu-item-text"
            style={{
              order: textAlign === "right" ? 2 : 1,
              textAlign: textAlign,
            }}
          >
            {children}
          </span>
          <Icon
            size="1rem"
            color={iconColor || "primary"}
            icon={icon}
            style={{ order: textAlign === "right" ? 1 : 2 }}
            mr={textAlign !== "right" ? 0 : 12}
            ml={textAlign !== "right" ? 12 : 0}
          />
        </Flexer>
      ) : (
        <span className="menu-item-text" style={{ textAlign: textAlign }}>
          {children}
        </span>
      )}
    </div>
  );
};

export default MenuItem;
