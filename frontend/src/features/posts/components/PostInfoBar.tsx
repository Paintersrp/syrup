import { FC } from 'react';

import { IconButton } from '@/components/Buttons';
import { Flexer } from '@/components/Containers';
import { Text, Tooltip } from '@/components/Elements';
import { formatDate, getReadTime } from '@/lib/api';

import { PostContent } from '../types';
import { colors } from '@/theme/common';

export const PostInfoBar: FC<{ post: PostContent }> = ({ post }) => {
  const { author, author_details, created_at, content, id } = post;

  const { wordCount, readTime } = getReadTime(content);
  const formattedDate = formatDate(created_at);

  return (
    <Flexer a="c" j="sb">
      <Tooltip text={`${author_details.first_name} ${author_details.last_name}`}>
        {/* Avatar Encapsulate */}
        <div className="avatar-p-s">
          <Text c="white" a="c">
            {author_details.first_name.charAt(0).toUpperCase() ||
              author_details.username.charAt(0).toUpperCase()}
          </Text>
        </div>
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
