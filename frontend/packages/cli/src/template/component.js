//*****************************************************************/
//*****************************************************************/
//*****************************************************************/

const ComponentStoriesTemplate = (componentName) =>
  `
import { Meta, StoryFn } from '@storybook/react';
import { ${componentName}, ${componentName}Props } from './${componentName}';

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
} as Meta;

const Template: StoryFn<${componentName}Props> = (args) => (
  <${componentName} {...args} /> 
);

export const Dynamic = Template.bind({});
`;

//*****************************************************************/
//*****************************************************************/
//*****************************************************************/

const ComponentTestTemplate = (componentName) =>
  `
import React from 'react';
import { render } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders without errors', () => {
    render(<${componentName} />);
    // Add your assertions here
  });
});
`;

//*****************************************************************/
//*****************************************************************/
//*****************************************************************/

const ComponentFullTemplate = (componentName) =>
  `
import { FC } from 'react';
import { css } from '@emotion/react';

import { Base, BaseProps } from '@/theme/base';
import { ExtendedTheme } from '@/theme/types';
import { inject } from '@/theme/utils';
import { GenericMapping } from '@/types';

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

//*****************************************************************/
//*****************************************************************/
//*****************************************************************/

export { ComponentStoriesTemplate, ComponentTestTemplate, ComponentFullTemplate };
