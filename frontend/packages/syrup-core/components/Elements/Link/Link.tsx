/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';

import React, { FC } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import clsx from 'clsx';

export const Link: FC<LinkProps> = ({ className, children, ...props }) => {
  const theme: any = useTheme();

  return (
    <RouterLink
      css={{
        zIndex: '1 !important',
        color: theme.info,
        width: 'auto',
        '&:hover': {
          color: theme.infoLight,
        },
      }}
      className={clsx(className)}
      {...props}
    >
      {children}
    </RouterLink>
  );
};
