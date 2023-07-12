import { Meta, StoryFn } from '@storybook/react';
import { Placeholder1, Placeholder1Props } from './Placeholder1';

export default {
  title: 'Components/Placeholder1',
  component: Placeholder1,
} as Meta;

const Template: StoryFn<Placeholder1Props> = (args) => <Placeholder1 {...args} />;

export const Dynamic = Template.bind({});
