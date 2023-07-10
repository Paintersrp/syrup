/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { Children, CSSProperties, ReactNode } from 'react';
import { css } from '@emotion/react';
import { Icon } from '../Icon/Icon';

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
  style?: CSSProperties;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  separator = 'chevron_right',
  children,
  style,
}) => {
  const items = Children.toArray(children);

  return (
    <ul css={styles.breadcrumbs} style={style}>
      {items.map((item, index) => {
        const needsSeparator = index !== items.length - 1;

        return (
          <li key={index} css={styles.breadcrumb}>
            {item}
            {needsSeparator && <Icon size="18px" icon={separator} css={styles.separators} />}
          </li>
        );
      })}
    </ul>
  );
};
