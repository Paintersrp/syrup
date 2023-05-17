import React from "react";
import PropTypes from "prop-types";
import "./List.css";

const ListItem = ({ text, subtext, icon, button, onClick }) => {
  return (
    <div
      className="list-item"
      onClick={onClick}
      style={{ cursor: button ? "pointer" : null }}
    >
      {icon && <span className="list-item-icon">{icon}</span>}
      <div className="list-item-text">
        <h2 style={{ textAlign: "left" }}>{text}</h2>
        {subtext && <p>{subtext}</p>}
      </div>
    </div>
  );
};

ListItem.propTypes = {
  text: PropTypes.string,
  subtext: PropTypes.string,
  icon: PropTypes.object,
  button: PropTypes.bool,
  onClick: PropTypes.func,
};

ListItem.defaultProps = {
  text: undefined,
  subtext: undefined,
  icon: null,
  button: false,
  onClick: () => {},
};

export default ListItem;
