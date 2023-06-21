import React, { ReactNode } from 'react';
import { css } from '@emotion/react';

import { Icon } from '../../Media';

const cx = {
  breadcrumbs: css({
    listStyleType: 'none',
    display: 'flex',
    fontSize: '1rem',
  }),
  breadcrumb: css({
    display: 'flex',
    alignItems: 'center',
  }),
  separator: css({
    margin: '0 0.5rem',
  }),
};

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
    <ul css={cx.breadcrumbs} style={style}>
      {items.map((item, index) => (
        <li key={index} css={cx.breadcrumb}>
          {item}
          {index !== items.length - 1 && <Icon size="18px" icon={separator} css={cx.separator} />}
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
