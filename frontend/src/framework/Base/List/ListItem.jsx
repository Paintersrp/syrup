import React from "react";
import "./List.css";

const ListItem = ({ primary, secondary, icon }) => {
  return (
    <div className="list-item">
      {icon && <span className="list-item-icon">{icon}</span>}
      <div className="list-item-text">
        <h2 style={{ textAlign: "left" }}>{primary}</h2>
        <p>{secondary}</p>
      </div>
    </div>
  );
};

export default ListItem;
