import React, { FC, MouseEvent } from "react";
import "./List.css";

interface ListItemProps {
  text?: string;
  subtext?: string;
  icon?: JSX.Element | null;
  button?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const ListItem: FC<ListItemProps> = ({
  text,
  subtext,
  icon,
  button = false,
  onClick = () => {},
}) => {
  return (
    <div
      className="list-item"
      onClick={onClick}
      style={{ cursor: button ? "pointer" : undefined }}
    >
      {icon && <span className="list-item-icon">{icon}</span>}
      <div className="list-item-text">
        <h2 style={{ textAlign: "left" }}>{text}</h2>
        {subtext && <p>{subtext}</p>}
      </div>
    </div>
  );
};

export default ListItem;
