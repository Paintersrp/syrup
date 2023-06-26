import { Meta, StoryFn } from '@storybook/react';
import Sidebar, { SidebarProps } from './Sidebar';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
} as Meta;

const Template: StoryFn<SidebarProps> = (args) => <Sidebar {...args}>Test</Sidebar>;

export const Dynamic = Template.bind({});
