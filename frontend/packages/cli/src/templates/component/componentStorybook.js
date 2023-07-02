/**
 * @description
 * Returns the template for generating component stories in Storybook.
 *
 * @param {string} componentName - The name of the component.
 * @returns {string} - The component stories template.
 */
export const ComponentStorybookTemplate = (componentName) =>
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
