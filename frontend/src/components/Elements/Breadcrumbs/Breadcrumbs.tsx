import React, { ReactNode } from 'react';
import { css } from '@emotion/react';

import { Icon } from '../../Media';

const styles = {
  breadcrumbs: css({
    listStyleType: 'none',
  }),
  breadcrumb: css({
    display: 'flex',
    alignItems: 'center',
  }),
  separators: css({
    margin: '0 0.5rem',
  }),
};

interface BreadcrumbsProps {
  separator?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  separator = 'chevron_right',
  children,
  style,
}) => {
  const items = React.Children.toArray(children);

  return (
    <ul css={styles.breadcrumbs} style={style}>
      {items.map((item, index) => (
        <li key={index} css={styles.breadcrumb}>
          {item}
          {index !== items.length - 1 && (
            <Icon size="18px" icon={separator} css={styles.separators} />
          )}
        </li>
      ))}
    </ul>
  );
};
