import { FC } from 'react';

import { IconButton } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Avatar, Text, Tooltip } from '@/components/Elements';
import { formatDate, getReadTime } from '@/lib/api';

import { PostContent } from '../types';

export const PostInfoBar: FC<{ post: PostContent }> = ({ post }) => {
  const { author_details, created_at, content, id } = post;

  const { readTime } = getReadTime(content);
  const formattedDate = formatDate(created_at);

  return (
    <Flexer a="c" j="sb">
      <Tooltip text={`${author_details.first_name} ${author_details.last_name}`}>
        <Avatar
          size="sm"
          text={author_details.username}
          tooltipText={`${author_details.first_name} ${author_details.last_name}`}
        />
      </Tooltip>
      <Text t={'body1'} s={'0.85rem'} ml={6}>
        {author_details.first_name || author_details.username} {author_details.last_name}
      </Text>
      <Text t={'body1'} s={'0.8rem'} a="r" mr={6}>
        {formattedDate} • {readTime} min read
      </Text>
      <Tooltip text="Bookmark Post">
        <IconButton palette="primary" variant="hover" size="tiny" icon="bookmark_add" />
      </Tooltip>
    </Flexer>
  );
};
