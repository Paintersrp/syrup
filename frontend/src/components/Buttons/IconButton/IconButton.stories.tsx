import { Meta, StoryFn } from '@storybook/react';

import { IconButton, IconButtonProps } from './IconButton';

const meta: Meta = {
  title: 'Components/IconButton',
  component: IconButton,
};

export default meta;

const Template: StoryFn<IconButtonProps> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'lg',
  onClick: () => {
    console.log('IconButton clicked');
  },
  icon: 'check', // Add an appropriate icon definition here
};

export const WithMaterialIcon = Template.bind({});
WithMaterialIcon.args = {
  size: 'lg',
  onClick: () => {
    console.log('IconButton clicked');
  },
  icon: 'add_circle', // Add an appropriate material icon name here
};
