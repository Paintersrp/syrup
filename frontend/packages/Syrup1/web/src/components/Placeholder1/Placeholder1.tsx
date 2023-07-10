import { FC } from 'react';
import { css } from '@emotion/react';

import { Base, BaseProps } from 'sy-core/theme/base';
import { ExtendedTheme } from 'sy-core/theme/types';
import { inject } from 'sy-core/theme/utils';
import { GenericMapping } from 'sy-core/types';

const Mapping: GenericMapping = {
  key1: 'value1',
  key2: 'value2',
};

const styles = (theme: ExtendedTheme) => ({
  root: (prop: any) =>
    css({
      opacity: 1,
    }),
  container: css({
    opacity: 1,
  }),
});

export interface Placeholder1Props extends BaseProps {
  prop?: any;
}

export const Placeholder1: FC<Placeholder1Props> = ({ prop, ...rest }) => {
  const css = inject(styles);
  return (
    <Base {...rest}>
      <div>Boilerplate</div>
    </Base>
  );
};
