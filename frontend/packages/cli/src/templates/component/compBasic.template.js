/**
 * @description
 * Returns the template for generating a basic component.
 *
 * @param {string} componentName - The name of the component.
 * @returns {string} - The component basic template.
 */
export const ComponentBasicTemplate = (componentName) =>
  `
import { FC } from 'react';

import { BaseProps } from '@/theme/base';

interface Props extends BaseProps {}

export const ${componentName}: FC<Props> = ({ ...rest }) => {
  return (
    <div>hello</div>
  );
};
`;
