import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React, { FC, MouseEvent } from "react";
import { Flexer } from "../../../Containers";
import Text from "../../Text/Text";
import ListItemWithIcon from "./components/ListItemWithIcon";
import "../List.css";
import ListItemTextOnly from "./components/ListItemTextOnly";

interface ListItemProps {
  text?: string;
  subtext?: string;
  icon?: IconDefinition | null;
  button?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  className?: string;
  iconColor?: string;
  textAlign?: "left" | "right" | "center";
  to?: string;
}

const ListItem: FC<ListItemProps> = ({
  text,
  subtext,
  icon,
  button = false,
  onClick = () => {},
  style,
  className,
  iconColor = "primary",
  textAlign = "left",
  to,
}) => {
  return (
    <div
      className={`list-item ${className}`}
      onClick={onClick}
      style={{ ...style, cursor: button || to ? "pointer" : undefined }}
    >
      {icon ? (
        <ListItemWithIcon
          text={text}
          subtext={subtext}
          icon={icon}
          iconColor={iconColor}
          textAlign={textAlign}
          to={to}
        />
      ) : (
        <ListItemTextOnly
          text={text}
          subtext={subtext}
          textAlign={textAlign}
          to={to}
        />
      )}
    </div>
  );
};

export default ListItem;
