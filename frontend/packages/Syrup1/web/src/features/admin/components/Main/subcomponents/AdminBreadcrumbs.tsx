import { FC, ReactNode } from 'react';
import { css } from '@emotion/react';

import { inject } from '@/theme/utils';
import { Flexer } from '@/components/Containers';
import { Breadcrumbs, Text } from '@/components/Elements';
import { ExtendedTheme } from '@/theme/types';
import { useBreakpoint } from '@/hooks';

const styles = (theme: ExtendedTheme) => ({
  breadcrumb: css({
    borderRight: '1px solid #666666',
    marginRight: 16,
    paddingRight: 16,
  }),
});
interface AdminBreadcrumbProps {
  title: string;
  children: ReactNode;
}

export const AdminBreadcrumbs: FC<AdminBreadcrumbProps> = ({ title, children }) => {
  const css = inject(styles);
  const isSmallScreen = useBreakpoint('sm');

  return (
    <Flexer a="c">
      {!isSmallScreen && (
        <Text w="auto" t="h3" css={css.breadcrumb}>
          {title}
        </Text>
      )}
      <Breadcrumbs aria-label="breadcrumb" style={{ display: 'flex' }}>
        {children}
      </Breadcrumbs>
    </Flexer>
  );
};
