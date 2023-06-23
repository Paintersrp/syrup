import React, { useState, ReactNode, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Tree.css';

import { Base, BaseProps } from '@/theme/base';

interface TreeNodeProps extends BaseProps {
  label: string;
  children?: ReactNode;
  startOpen?: boolean;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  label,
  children,
  startOpen = false,
  ...rest
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
      <ul className={`tree-node-children ${animate ? 'animate' : ''}`}>
        {React.Children.map(children, (child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
    );
  };

  return (
    <Base className="tree-node" {...rest}>
      <div className={`tree-node-label ${expanded ? 'expanded' : ''}`} onClick={toggleExpansion}>
        <FontAwesomeIcon
          icon={expanded ? faChevronDown : faChevronRight}
          className="tree-node-icon"
          fontSize="0.75rem"
        />
        {label}
      </div>
      {renderChildren()}
    </Base>
  );
};
