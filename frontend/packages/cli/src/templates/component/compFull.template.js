/**
 * @description
 * Returns the template for generating a full component file.
 *
 * @param {string} componentName - The name of the component.
 * @returns {string} - The full component template.
 */
export const ComponentFullTemplate = (componentName) =>
  `
import { FC } from 'react';
import { css } from '@emotion/react';

import { Base, BaseProps } from 'sy-core/theme/base';
import { ExtendedTheme } from 'sy-core/theme/types';
import { inject } from 'sy-core/theme/utils';
import { GenericMapping } from 'sy-core/types';

const Mapping: GenericMapping = {
  key1: "value1",
  key2: "value2"
};

const styles = (theme: ExtendedTheme) => ({
  root: (prop: any) =>
    css({
      opacity: 1,
    }),
  container: css({
    opacity: 1,
  })
});

export interface ${componentName}Props extends BaseProps {
  prop?: any;
}

export const ${componentName}: FC<${componentName}Props> = ({ prop, ...rest }) => {
  const css = inject(styles)
  return (
    <Base {...rest}>
      <div>Boilerplate</div>
    </Base>
  );
};
`;
