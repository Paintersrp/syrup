import React, { ReactNode } from "react";
import "./Breadcrumbs.css";

import {
  faChevronRight,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import Icon from "../Icon/Icon";

interface BreadcrumbsProps {
  separator?: IconDefinition;
  children: ReactNode;
  style?: React.CSSProperties;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  separator = faChevronRight,
  children,
  style,
}) => {
  const items = React.Children.toArray(children);

  return (
    <ul className="breadcrumb" style={style}>
      {items.map((item, index) => (
        <li key={index} className="breadcrumb-item">
          {item}
          {index !== items.length - 1 && (
            <Icon
              size="0.7rem"
              icon={separator}
              className="breadcrumb-separator"
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
