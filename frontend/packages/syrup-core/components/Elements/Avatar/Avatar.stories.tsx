import { Meta, StoryFn } from '@storybook/react';
import { Flexer } from '../../Containers';
import { Avatar, AvatarProps } from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
} as Meta;

const Template: StoryFn<AvatarProps> = (args) => (
  <Flexer j="c" a="c" grow>
    <div>
      <Avatar {...args} />
    </div>
  </Flexer>
);

export const Dynamic = Template.bind({});
