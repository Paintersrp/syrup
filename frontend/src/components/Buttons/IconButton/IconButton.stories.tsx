import { Meta, StoryFn } from '@storybook/react';

import IconButton, { IconButtonProps } from './IconButton';

const meta: Meta = {
  title: 'Components/IconButton',
  component: IconButton,
};

export default meta;

const Template: StoryFn<IconButtonProps> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'lg',
  fontSize: '1rem',
  shade: 'main',
  color: 'primary',
  invertColors: false,
  onClick: () => {
    console.log('IconButton clicked');
  },
  material: 'check', // Add an appropriate icon definition here
};

export const WithMaterialIcon = Template.bind({});
WithMaterialIcon.args = {
  size: 'lg',
  fontSize: '1rem',
  shade: 'main',
  color: 'primary',
  invertColors: false,
  onClick: () => {
    console.log('IconButton clicked');
  },
  material: 'add_circle', // Add an appropriate material icon name here
};
