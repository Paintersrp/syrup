import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import clsx from 'clsx';

import { FC } from 'react';

export const Link: FC<LinkProps> = ({ className, children, ...props }) => {
  const theme: any = useTheme();

  return (
    <RouterLink
      css={{
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
