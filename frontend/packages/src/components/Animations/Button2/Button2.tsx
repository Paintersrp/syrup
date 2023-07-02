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

export interface Button2Props extends BaseProps {
  prop?: any;
}

export const Button2: FC<Button2Props> = ({ prop, ...rest }) => {
  const css = inject(styles);
  return (
    <Base {...rest}>
      <div>Boilerplate</div>
    </Base>
  );
};
