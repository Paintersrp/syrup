import React, { ReactNode } from 'react';
import './Breadcrumbs.css';
import { Icon } from '../../Media';

interface BreadcrumbsProps {
  separator?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  separator = 'chevron_right',
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
            <Icon size="0.7rem" icon={separator} className="breadcrumb-separator" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
