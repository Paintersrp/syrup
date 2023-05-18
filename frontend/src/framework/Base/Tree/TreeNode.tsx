import React, { useState, ReactNode, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Tree.css";

interface TreeNodeProps {
  label: string;
  children?: ReactNode;
  startOpen?: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  label,
  children,
  startOpen = false,
}) => {
  const [expanded, setExpanded] = useState(startOpen);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    setExpanded(startOpen);
  }, [startOpen]);

  const toggleExpansion = () => {
    setExpanded(!expanded);
    setAnimate(true);
  };

  const renderChildren = () => {
    if (!expanded) return null;

    return (
      <ul className={`tree-node-children ${animate ? "animate" : ""}`}>
        {React.Children.map(children, (child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="tree-node">
      <div
        className={`tree-node-label ${expanded ? "expanded" : ""}`}
        onClick={toggleExpansion}
      >
        <FontAwesomeIcon
          icon={expanded ? faChevronDown : faChevronRight}
          className="tree-node-icon"
          fontSize="0.75rem"
        />
        {label}
      </div>
      {renderChildren()}
    </div>
  );
};

export default TreeNode;
