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
  key: value,
  key: value
};

const styles = (theme: ExtendedTheme) => ({
  root: (prop: any) =>
    css({
      property: value,
    }),
  container: css({
    property: value,
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
