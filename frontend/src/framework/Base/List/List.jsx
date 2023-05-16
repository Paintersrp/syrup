import React from "react";
import ListItem from "./ListItem";
import "./List.css";

const List = ({ children }) => {
  return (
    <div className="list">
      {React.Children.map(children, (child) => {
        if (child.type !== ListItem) {
          console.warn(
            `Invalid child '${child.type.name}' passed to List component`
          );
          return child;
        }
        return child;
      })}
    </div>
  );
};

export default List;
