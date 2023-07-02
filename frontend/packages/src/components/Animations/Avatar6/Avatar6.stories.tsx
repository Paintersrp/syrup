import { Meta, StoryFn } from '@storybook/react';
import { Avatar6, Avatar6Props } from './Avatar6';

export default {
  title: 'Components/Avatar6',
  component: Avatar6,
} as Meta;

const Template: StoryFn<Avatar6Props> = (args) => <Avatar6 {...args} />;

export const Dynamic = Template.bind({});
