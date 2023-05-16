import React, { useState } from "react";
import PropTypes from "prop-types";

const Tree = ({ label, children, level = 0 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const renderChildren = () => {
    if (!expanded) return null;

    return (
      <ul style={{ marginLeft: `${20 * (level + 1)}px` }}>
        {React.Children.map(children, (child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div
        onClick={toggleExpansion}
        style={{ cursor: "pointer", fontWeight: "bold" }}
      >
        {expanded ? "[-]" : "[+]"} {label}
      </div>
      {renderChildren()}
    </div>
  );
};

Tree.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node,
  level: PropTypes.number,
};

export default Tree;
