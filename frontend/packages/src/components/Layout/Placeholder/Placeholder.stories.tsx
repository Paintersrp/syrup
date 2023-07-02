import { Meta, StoryFn } from '@storybook/react';
import { Placeholder, PlaceholderProps } from './Placeholder';

export default {
  title: 'Components/Placeholder',
  component: Placeholder,
} as Meta;

const Template: StoryFn<PlaceholderProps> = (args) => <Placeholder {...args} />;

export const Dynamic = Template.bind({});
