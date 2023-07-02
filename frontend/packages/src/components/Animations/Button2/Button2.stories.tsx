import { Meta, StoryFn } from '@storybook/react';
import { Button2, Button2Props } from './Button2';

export default {
  title: 'Components/Button2',
  component: Button2,
} as Meta;

const Template: StoryFn<Button2Props> = (args) => <Button2 {...args} />;

export const Dynamic = Template.bind({});
