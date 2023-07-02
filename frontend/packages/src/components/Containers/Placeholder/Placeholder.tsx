import { FC } from 'react';
import { css } from '@emotion/react';

import { Base, BaseProps } from '@/theme/base';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';
import { GenericMapping } from '@/types';

const Mapping: GenericMapping = {
  key: value,
  key: value,
};

const styles = (theme: ExtendedTheme) => ({
  root: (prop: any) =>
    css({
      property: value,
    }),
  container: css({
    property: value,
  }),
});

export interface PlaceholderProps extends BaseProps {
  prop?: any;
}

export const Placeholder: FC<PlaceholderProps> = ({ prop, ...rest }) => {
  const css = inject(styles);
  return (
    <Base {...rest}>
      <div>Boilerplate</div>
    </Base>
  );
};
