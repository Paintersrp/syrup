import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';

import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';

const styles = (theme: ExtendedTheme) => ({
  root: (open: boolean) =>
    css({
      color: theme.light,
      backgroundColor: theme.primary,
      boxShadow: theme.shadows[1],
      padding: theme.sp(2, 4),
      display: 'flex',
      alignItems: 'flex-start',
      transition: 'border-radius 500ms cubic-bezier(0.645, 0.045, 0.355, 1)',
      borderRadius: 5,
      borderBottomRightRadius: !open ? 5 : 0,
      borderBottomLeftRadius: !open ? 5 : 0,
    }),
});

interface AdminCardHeaderProps {
  isOpen: boolean;
  children: ReactNode;
}

export const AdminCardHeader: FC<AdminCardHeaderProps> = ({ isOpen, children }) => {
  const css = inject(styles);

  return <div css={css.root(isOpen)}>{children}</div>;
};
